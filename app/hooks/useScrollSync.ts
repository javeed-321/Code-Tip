"use client";

import { useEffect, type RefObject } from "react";

export function useScrollSync(
  leftContainerRef: RefObject<HTMLElement | null>,
  rightElRef: RefObject<HTMLElement | null>,
  leftSelector: string,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const container = leftContainerRef.current;
    const right = rightElRef.current;
    if (!container || !right) return;

    let left: HTMLElement | null = null;
    let syncing = false;

    // Scroll source to the same proportional position on target
    const sync = (source: HTMLElement, target: HTMLElement) => {
      if (syncing) { syncing = false; return; }
      const sourceMax = source.scrollHeight - source.clientHeight;
      const targetMax = target.scrollHeight - target.clientHeight;
      if (sourceMax <= 0 || targetMax <= 0) return;
      syncing = true;
      target.scrollTop = (source.scrollTop / sourceMax) * targetMax;
    };

    const onLeftScroll  = () => left && sync(left, right);
    const onRightScroll = () => left && sync(right, left);

    // Toast UI builds its inner scroller asynchronously — retry until found
    let tries = 0;
    let rafId = 0;
    const attach = () => {
      left = container.querySelector<HTMLElement>(leftSelector);
      if (!left) {
        if (tries++ < 60) rafId = requestAnimationFrame(attach);
        return;
      }
      left.addEventListener("scroll", onLeftScroll);
      right.addEventListener("scroll", onRightScroll);
    };
    attach();

    return () => {
      cancelAnimationFrame(rafId);
      left?.removeEventListener("scroll", onLeftScroll);
      right.removeEventListener("scroll", onRightScroll);
    };
  }, [leftContainerRef, rightElRef, leftSelector, enabled]);
}
