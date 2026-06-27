"use client";

import {
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import { flushLandingEvent, trackLandingEvent } from "@/lib/marketing/events";

interface TrackedExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  flushTimeoutMs?: number;
}

export function TrackedExternalLink({
  href,
  eventName,
  eventProperties = {},
  flushTimeoutMs = 700,
  onClick,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: TrackedExternalLinkProps) {
  const openingRef = useRef(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const properties = {
      ...eventProperties,
      href,
    };
    const shouldFlushBeforeOpening =
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      target === "_blank";

    if (!shouldFlushBeforeOpening) {
      trackLandingEvent(eventName, properties);
      return;
    }

    const popup = window.open("about:blank", "_blank");
    if (!popup) {
      trackLandingEvent(eventName, properties);
      return;
    }

    event.preventDefault();
    if (openingRef.current) {
      popup.close();
      return;
    }
    openingRef.current = true;

    try {
      popup.opener = null;
    } catch {
      // Some browsers disallow writing opener on a new browsing context.
    }

    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, flushTimeoutMs);
    });

    void Promise.race([flushLandingEvent(eventName, properties), timeout])
      .finally(() => {
        popup.location.href = href;
        popup.focus();
        openingRef.current = false;
      });
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
