"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

/**
 * The "audio sea" — a GPU particle field behind the hero. Thousands of
 * points ride layered travelling waves in the brand palette, ripple
 * around the pointer, and calm down as the hero scrolls away: the
 * 90-hour audio library as a living waveform.
 *
 * Budgets and fallbacks:
 * - All displacement happens in the vertex shader; the CPU only updates
 *   four uniforms per frame.
 * - Device pixel ratio is capped at 2, and the grid is roughly halved
 *   on small screens.
 * - Rendering pauses when the hero is offscreen or the tab is hidden.
 * - prefers-reduced-motion (or any WebGL failure) renders nothing —
 *   the hero's existing static backdrop stands on its own.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uScroll;
  uniform float uDpr;
  uniform vec2 uPointer;
  attribute float aRand;
  varying float vAmp;
  varying float vFade;
  varying float vX;

  void main() {
    vec3 p = position;
    float t = uTime;

    float amp =
        sin(p.x * 0.9 + t * 0.7) * 0.32
      + sin(p.z * 1.4 - t * 0.55) * 0.22
      + sin((p.x + p.z) * 2.2 + t * 1.1) * 0.12
      + sin(p.x * 3.7 - t * 1.6) * 0.05 * (0.5 + aRand);

    float d = distance(p.xz, uPointer);
    amp += exp(-d * d * 0.55) * sin(t * 3.0 - d * 4.0) * 0.55;

    float calm = 1.0 - uScroll * 0.55;
    p.y = amp * calm * uIntro - (1.0 - uIntro) * 1.6 - uScroll * 0.8;

    vAmp = amp;
    vX = position.x;

    float fx = smoothstep(7.0, 5.0, abs(position.x));
    float fz = smoothstep(4.0, 2.4, abs(position.z + 2.0));
    vFade = fx * fz * uIntro;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.6 + (amp * 0.5 + 0.5) * 2.6) * uDpr;
    gl_PointSize = size * (3.4 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying float vAmp;
  varying float vFade;
  varying float vX;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.05, length(c));
    vec3 iris = vec3(0.427, 0.416, 0.910);
    vec3 violet = vec3(0.608, 0.420, 1.0);
    vec3 pink = vec3(0.925, 0.282, 0.600);
    float m = smoothstep(-0.6, 0.8, vAmp);
    vec3 col = mix(iris, violet, smoothstep(-7.0, 7.0, vX));
    col = mix(col, pink, m * 0.45);
    col += vec3(0.10) * m;
    float alpha = disc * vFade * (0.35 + 0.5 * m);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function HeroWaveField() {
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
      return; // no WebGL: the static hero backdrop is the fallback
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 40);
    camera.position.set(0, 1.6, 4.4);
    camera.lookAt(0, -0.2, -1);

    // Grid: x ∈ [-7, 7], z ∈ [-6, 2]; roughly halved on phones.
    const small = window.innerWidth < 768;
    const cols = small ? 110 : 160;
    const rows = small ? 60 : 90;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i * 3] = (c / (cols - 1)) * 14 - 7;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (rows - 1)) * 8 - 6;
        rands[i] = Math.random();
        i++;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uScroll: { value: 0 },
      uDpr: { value: dpr },
      uPointer: { value: new THREE.Vector2(0, -2) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geometry, material));

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // The sea rises into place.
    const intro = gsap.to(uniforms.uIntro, {
      value: 1,
      duration: 1.8,
      ease: "power3.out",
      delay: 0.15,
    });

    // Calm + sink as the hero leaves the viewport.
    const section = host.closest("section") ?? host;
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        uniforms.uScroll.value = self.progress;
      },
    });

    // Pointer ripple target in grid coordinates; eased in the loop.
    const target = new THREE.Vector2(0, -2);
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.height === 0) return;
      target.set(
        ((e.clientX - r.left) / r.width - 0.5) * 14,
        ((e.clientY - r.top) / r.height) * 8 - 6
      );
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Render only while visible.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!onScreen || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointer.value.lerp(target, 0.06);
      camera.position.x +=
        ((target.x / 14) * 0.5 - camera.position.x) * 0.04;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      st.kill();
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
      style={{
        maskImage:
          "linear-gradient(180deg, black 0%, black 72%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, black 0%, black 72%, transparent 100%)",
      }}
    />
  );
}
