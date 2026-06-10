"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Generic reveal-on-scroll wrapper so server components can give their
 * children the staggered r-up / r-blur entrance without becoming client
 * components themselves. Children opt in with reveal classes + --i.
 */
export function RevealGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-group ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
