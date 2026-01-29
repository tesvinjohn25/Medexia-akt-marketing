"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function HeroFrames({
  children,
}: {
  children?: React.ReactNode;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  // We generated 8s at 30fps => 240 frames
  const frameCount = 240;

  const frames = React.useMemo(() => {
    // Important: use window.Image in the client; avoids SSR/prerender `Image is not defined`.
    const ImgCtor = (typeof window !== "undefined" ? window.Image : null) as any;
    const arr: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img: HTMLImageElement = ImgCtor ? new ImgCtor() : ({} as any);
      const id = String(i).padStart(4, "0");
      (img as any).src = `/hero/frames/frame_${id}.jpg`;
      arr.push(img);
    }
    return arr;
  }, []);

  // Preload a small window around current frame to keep it snappy.
  const warmWindow = React.useCallback(
    (idx: number) => {
      const start = clamp(idx - 10, 0, frameCount - 1);
      const end = clamp(idx + 20, 0, frameCount - 1);
      for (let i = start; i <= end; i++) {
        // accessing src triggers browser fetch cache
        void frames[i]!.src;
      }
    },
    [frames]
  );

  const draw = React.useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = frames[idx];
      if (!img) return;

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // contain fit (keep full image visible)
      const iw = img.naturalWidth || 720;
      const ih = img.naturalHeight || 1280;
      const s = Math.min(w / iw, h / ih);
      const rw = iw * s;
      const rh = ih * s;
      const x = (w - rw) / 2;
      const y = (h - rh) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, x, y, rw, rh);
    },
    [frames]
  );

  React.useEffect(() => {
    // Render first frame as soon as it's ready.
    const first = frames[0];
    if (!first) return;
    const onLoad = () => draw(0);
    if (first.complete) onLoad();
    else first.addEventListener("load", onLoad, { once: true });
    return () => first.removeEventListener("load", onLoad);
  }, [frames, draw]);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const r = wrap.getBoundingClientRect();
        const vh = window.innerHeight;

        // scroll progress through this section
        const total = r.height - vh;
        const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;

        // premium: ease in/out
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const idx = clamp(Math.round(eased * (frameCount - 1)), 0, frameCount - 1);

        warmWindow(idx);
        draw(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [draw, warmWindow]);

  return (
    <div ref={wrapRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
      </div>
    </div>
  );
}
