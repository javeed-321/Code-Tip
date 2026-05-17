"use client";

import { useEffect, type RefObject } from "react";

/**
 * Keeps two scroll containers in proportional sync.
 *
 * The "left" element is looked up via `leftSelector` inside `leftContainerRef`,
 * because some libraries (e.g. Toast UI) build their scrollable element
 * asynchronously after their parent mounts. The hook retries for up to
 * 60 animation frames until the element appears.
 *
 * @param leftContainerRef parent that contains the left scroller
 * @param rightElRef       the right scroller itself
 * @param leftSelector     CSS selector used to find the left scroller
 * @param enabled          gate so the hook only attaches when ready
 */
export function useScrollSync(
  leftContainerRef: RefObject<HTMLElement | null>,
  rightElRef: RefObject<HTMLElement | null>,
  leftSelector: string,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const leftContainer = leftContainerRef.current;
    const rightEl = rightElRef.current;
    if (!leftContainer) return;

    let leftEl: HTMLElement | null = null;
    let isSyncing = false;
    let rafId = 0;

    const syncLeftToRight = () => {
      if (!leftEl || !rightEl) return;
      if (isSyncing) {
        isSyncing = false;
        return;
      }
      const leftMax = leftEl.scrollHeight - leftEl.clientHeight;
      const rightMax = rightEl.scrollHeight - rightEl.clientHeight;
      if (leftMax <= 0 || rightMax <= 0) return;
      const ratio = leftEl.scrollTop / leftMax;
      isSyncing = true;
      rightEl.scrollTop = ratio * rightMax;
    };

    const syncRightToLeft = () => {
      if (!leftEl || !rightEl) return;
      if (isSyncing) {
        isSyncing = false;
        return;
      }
      const leftMax = leftEl.scrollHeight - leftEl.clientHeight;
      const rightMax = rightEl.scrollHeight - rightEl.clientHeight;
      if (leftMax <= 0 || rightMax <= 0) return;
      const ratio = rightEl.scrollTop / rightMax;
      isSyncing = true;
      leftEl.scrollTop = ratio * leftMax;
    };

    let tries = 0;
    const attach = () => {
      leftEl = leftContainer.querySelector<HTMLElement>(leftSelector);
      if (!leftEl) {
        if (tries++ < 60) rafId = requestAnimationFrame(attach);
        return;
      }
      leftEl.addEventListener("scroll", syncLeftToRight, { passive: true });
      rightEl?.addEventListener("scroll", syncRightToLeft, { passive: true });
    };
    attach();

    return () => {
      cancelAnimationFrame(rafId);
      leftEl?.removeEventListener("scroll", syncLeftToRight);
      rightEl?.removeEventListener("scroll", syncRightToLeft);
    };
  }, [leftContainerRef, rightElRef, leftSelector, enabled]);
}
