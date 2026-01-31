"use client";

import React from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

// Hero animation takes 270vh of scroll, demo takes additional 1000vh
const HERO_SCROLL_VH = 270;
const DEMO_SCROLL_VH = 1000;
const TOTAL_SCROLL_VH = HERO_SCROLL_VH + DEMO_SCROLL_VH;

export function HeroFrames({
  children,
  onProgress,
  onDemoProgress,
  onTransform,
}: {
  children?: React.ReactNode;
  onProgress?: (p: number) => void;
  onDemoProgress?: (p: number) => void;
  onTransform?: (t: { x: number; y: number; s: number }) => void;
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

      // cover fit (fill the viewport — avoids letterboxing / blank bands on mobile)
      const iw = img.naturalWidth || 720;
      const ih = img.naturalHeight || 1280;
      const s = Math.max(w / iw, h / ih);
      const rw = iw * s;
      const rh = ih * s;

      // Bias upward so the phone stays framed (avoid dead space above on tall mobile screens)
      const x = (w - rw) / 2;
      const y = (h - rh) / 2 - rh * 0.14;

      // Expose the image->viewport transform in CSS pixels so overlays can align to the phone screen.
      onTransform?.({ x: x / dpr, y: y / dpr, s: s / dpr });

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

    const metrics = { start: 0, heroEnd: 1, totalEnd: 1 };
    const recompute = () => {
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      metrics.start = top;
      // Hero portion ends after HERO_SCROLL_VH worth of scroll
      const heroScrollPx = (HERO_SCROLL_VH / 100) * vh - vh;
      metrics.heroEnd = top + Math.max(1, heroScrollPx);
      // Total scroll ends at full height
      metrics.totalEnd = top + Math.max(1, rect.height - vh);
    };

    // Compute once on mount + after layout settles (mobile Safari can shift toolbars).
    recompute();
    const t = window.setTimeout(recompute, 60);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const y = window.scrollY;

        // Calculate hero progress (0-1 over first HERO_SCROLL_VH)
        const heroDenom = Math.max(1, metrics.heroEnd - metrics.start);
        const heroP = clamp((y - metrics.start) / heroDenom, 0, 1);
        onProgress?.(heroP);

        // Calculate demo progress (0-1 over remaining scroll after hero)
        const demoStart = metrics.heroEnd;
        const demoDenom = Math.max(1, metrics.totalEnd - demoStart);
        const demoP = clamp((y - demoStart) / demoDenom, 0, 1);
        onDemoProgress?.(demoP);

        // Hero animation: ease in/out, show frames 0-239
        // After hero completes (heroP >= 1), stay on final frame (239)
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
    // Single tall wrapper for both hero and demo scroll
    <div ref={wrapRef} className="relative" style={{ height: `${TOTAL_SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Bottom seam blender: makes the canvas feel like part of the page (not a separate "video window"). */}
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
