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

    let syncing = false;

    const sync = (source: HTMLElement, target: HTMLElement) => {
      if (syncing) { syncing = false; return; }
      const sourceMax = source.scrollHeight - source.clientHeight;
      const targetMax = target.scrollHeight - target.clientHeight;
      if (sourceMax <= 0 || targetMax <= 0) return;
      syncing = true;
      target.scrollTop = (source.scrollTop / sourceMax) * targetMax;
    };

    // Wait for Toast UI to render its inner scroller
    const timer = setTimeout(() => {
      const left = container.querySelector<HTMLElement>(leftSelector);
      if (!left) return;

      const onLeftScroll = () => sync(left, right);
      const onRightScroll = () => sync(right, left);

      left.addEventListener("scroll", onLeftScroll);
      right.addEventListener("scroll", onRightScroll);
    }, 500);

    return () => clearTimeout(timer);
  }, [leftContainerRef, rightElRef, leftSelector, enabled]);
}