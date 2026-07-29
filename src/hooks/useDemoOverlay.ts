"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAppOrigin } from "@/lib/marketing/url";

const APP_ORIGIN = getAppOrigin();
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("data-demo-focus-guard") &&
      element.getClientRects().length > 0,
  );
}

/** True when the app iframe has navigated back onto the marketing origin. */
export function iframeOnOurOrigin(
  frame: HTMLIFrameElement | null,
): boolean {
  try {
    return frame?.contentWindow?.location.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Shared immersive-demo lifecycle.
 *
 * The overlay owns one history entry, so browser Back exits the demo. It also
 * supports Escape, the app's `akt-demo-exit` message, and the app navigating
 * its iframe back onto the marketing origin.
 */
export function useDemoOverlay() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusBeforeOpenRef = useRef<HTMLElement | null>(null);
  const historyEntryPushed = useRef(false);

  const restoreFocus = useCallback(() => {
    const focusTarget = triggerRef.current ?? focusBeforeOpenRef.current;
    window.requestAnimationFrame(() => {
      if (focusTarget?.isConnected) {
        focusTarget.focus();
      }
    });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);

    if (historyEntryPushed.current) {
      historyEntryPushed.current = false;
      window.history.back();
    }

    restoreFocus();
  }, [restoreFocus]);

  const openOverlay = useCallback(() => {
    focusBeforeOpenRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    window.history.pushState({ aktDemo: true }, "");
    historyEntryPushed.current = true;
    setOverlayOpen(true);
  }, []);

  const handleFrameLoad = useCallback(() => {
    if (iframeOnOurOrigin(frameRef.current)) {
      closeOverlay();
    }
  }, [closeOverlay]);

  useEffect(() => {
    if (!overlayOpen) return;

    const onPopState = () => {
      historyEntryPushed.current = false;
      setOverlayOpen(false);
      restoreFocus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      const focusable = focusableElements(dialog);
      const first = focusable[0];
      const last = focusable.at(-1);
      const active = document.activeElement;

      if (!dialog || !first || !last) {
        event.preventDefault();
        dialog?.focus();
        return;
      }
      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin === APP_ORIGIN &&
        event.source === frameRef.current?.contentWindow &&
        event.data?.type === "akt-demo-exit"
      ) {
        closeOverlay();
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("message", onMessage);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      const first = focusableElements(dialogRef.current)[0];
      (first ?? dialogRef.current)?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("message", onMessage);
      document.body.style.overflow = previousOverflow;
    };
  }, [overlayOpen, closeOverlay, restoreFocus]);

  return {
    closeOverlay,
    dialogRef,
    frameRef,
    handleFrameLoad,
    openOverlay,
    overlayOpen,
    triggerRef,
  };
}
