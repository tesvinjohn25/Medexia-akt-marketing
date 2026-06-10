"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsapClient";

/**
 * A single luminous oscilloscope trace — the voice of the audiobook.
 * One ribbon mesh displaced in the vertex shader: layered travelling
 * sines with a breathing envelope (so it reads as speech, not a screen
 * saver) and a gaussian swell that follows the pointer.
 *
 * The camera is orthographic over [-1,1]² so the trace always spans the
 * full container width with zero layout coupling. Renders nothing under
 * prefers-reduced-motion or if WebGL is unavailable; pauses offscreen.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uPointerX;
  varying float vY;
  varying float vX;

  void main() {
    float x = position.x;
    float t = uTime;

    float wave =
        sin(x * 6.0 + t * 1.35) * 0.50
      + sin(x * 13.0 - t * 2.1) * 0.25
      + sin(x * 23.0 + t * 3.6) * 0.12;

    // breathing envelope — speech-like swells, never flatlining
    float env = 0.45 + 0.55 * (0.5 + 0.5 * sin(t * 0.6 + x * 2.4));

    // the trace leans toward the pointer
    float pd = x - uPointerX;
    wave += exp(-pd * pd * 26.0) * 0.55 * sin(t * 7.0);

    // fade amplitude into the edges so the line lands softly
    float edge = smoothstep(1.0, 0.78, abs(x));

    float y = wave * env * edge * 0.42 * uIntro;

    vY = position.y;
    vX = x;
    gl_Position = vec4(x, y + position.y, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying float vY;
  varying float vX;

  void main() {
    float d = abs(vY);
    float core = exp(-d * 110.0);
    float glow = exp(-d * 11.0) * 0.32;
    vec3 iris = vec3(0.427, 0.416, 0.910);
    vec3 violet = vec3(0.608, 0.420, 1.0);
    vec3 pink = vec3(0.925, 0.282, 0.600);
    vec3 col = mix(iris, violet, smoothstep(-1.0, 0.15, vX));
    col = mix(col, pink, smoothstep(0.2, 1.0, vX));
    float a = (core + glow) * smoothstep(1.0, 0.85, abs(vX));
    if (a < 0.004) discard;
    gl_FragColor = vec4(col * (0.75 + core * 0.7), a);
  }
`;

export default function OscilloscopeWave() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Ribbon: x carries the trace, y carries the glow falloff.
    const geometry = new THREE.PlaneGeometry(2, 1.1, 640, 1);
    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPointerX: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      renderer.setSize(host.clientWidth || 1, host.clientHeight || 1, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const intro = gsap.to(uniforms.uIntro, {
      value: 1,
      duration: 2.2,
      ease: "power2.inOut",
      delay: 0.5,
    });

    let targetX = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!onScreen || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointerX.value +=
        (targetX - uniforms.uPointerX.value) * 0.05;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      intro.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
