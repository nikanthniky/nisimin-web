"use client";
import { useEffect } from "react";
// Optional event bridge. Cloudflare Web Analytics records page views; it has no
// supported custom-event API. A configured consent-aware provider may listen here.
export function AnalyticsEvents() {
  useEffect(() => {
    function track(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-track]")
          : null;
      if (target)
        window.dispatchEvent(
          new CustomEvent("nisimin:interaction", {
            detail: {
              name: target.dataset.track,
              path: window.location.pathname,
            },
          }),
        );
    }
    document.addEventListener("click", track);
    return () => document.removeEventListener("click", track);
  }, []);
  return null;
}
