"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// Hero animation: 180vh (snappier scroll-to-video), video phase: 200vh additional
const HERO_SCROLL_VH = 180;
const VIDEO_SCROLL_VH = 200;
const TOTAL_SCROLL_VH = HERO_SCROLL_VH + VIDEO_SCROLL_VH;

export function HeroFrames({
  children,
  onProgress,
  onVideoPhase,
  onTransform,
}: {
  children?: React.ReactNode;
  onProgress?: (p: number) => void;
  onVideoPhase?: (inVideoPhase: boolean) => void;
  onTransform?: (t: { x: number; y: number; s: number }) => void;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  // We generated 8s at 30fps => 240 frames
  const frameCount = 240;

  const frames = React.useMemo(() => {
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

  const warmWindow = React.useCallback(
    (idx: number) => {
      const start = clamp(idx - 10, 0, frameCount - 1);
      const end = clamp(idx + 20, 0, frameCount - 1);
      for (let i = start; i <= end; i++) {
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

      const iw = img.naturalWidth || 720;
      const ih = img.naturalHeight || 1280;

      // Portrait viewports (mobile): cover-fit. Landscape (desktop): contain-fit.
      const isLandscape = w > h;
      const s = isLandscape ? Math.min(w / iw, h / ih) : Math.max(w / iw, h / ih);
      const rw = iw * s;
      const rh = ih * s;

      const x = (w - rw) / 2;
      // Less upward bias on desktop since phone fits within viewport
      const yBias = isLandscape ? 0.06 : 0.14;
      const y = (h - rh) / 2 - rh * yBias;

      onTransform?.({ x: x / dpr, y: y / dpr, s: s / dpr });

      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, x, y, rw, rh);
    },
    [frames]
  );

  React.useEffect(() => {
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

    const metrics = { start: 0, heroEnd: 1, totalEnd: 1 };
    const recompute = () => {
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      metrics.start = top;
      const heroScrollPx = (HERO_SCROLL_VH / 100) * vh - vh;
      metrics.heroEnd = top + Math.max(1, heroScrollPx);
      metrics.totalEnd = top + Math.max(1, rect.height - vh);
    };

    recompute();
    const t = window.setTimeout(recompute, 60);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const y = window.scrollY;

        // Hero progress (0-1 over HERO_SCROLL_VH)
        const heroDenom = Math.max(1, metrics.heroEnd - metrics.start);
        const heroP = clamp((y - metrics.start) / heroDenom, 0, 1);
        onProgress?.(heroP);

        // Video phase: past hero animation, before section scrolls away
        const inVideoPhase = y > metrics.heroEnd && y <= metrics.totalEnd;
        onVideoPhase?.(inVideoPhase);

        // Hero animation frames
        const eased = heroP < 0.5 ? 2 * heroP * heroP : 1 - Math.pow(-2 * heroP + 2, 2) / 2;
        const idx = clamp(Math.floor(eased * (frameCount - 1) + 0.6), 0, frameCount - 1);

        warmWindow(idx);
        draw(idx);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      recompute();
      onScroll();
    });

    onScroll();

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [draw, warmWindow]);

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${TOTAL_SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "34vh",
            background:
              "linear-gradient(to bottom, rgba(6,7,12,0) 0%, rgba(6,7,12,.42) 30%, rgba(6,7,12,.86) 78%, rgba(6,7,12,1) 100%)",
            backdropFilter: "blur(18px)",
          }}
          aria-hidden
        />

        {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
      </div>
    </div>
  );
}
