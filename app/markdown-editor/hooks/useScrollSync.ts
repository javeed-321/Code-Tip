// "use client";

// import { useEffect, type RefObject } from "react";

// export function useScrollSync(
//   leftContainerRef: RefObject<HTMLElement | null>,
//   rightElRef: RefObject<HTMLElement | null>,
//   leftSelector: string,
//   enabled = true,
// ) {
//   useEffect(() => {
//     if (!enabled) return;

//     const container = leftContainerRef.current;
//     const right = rightElRef.current;
//     if (!container || !right) return;

//     let syncing = false;

//     const sync = (source: HTMLElement, target: HTMLElement) => {
//       if (syncing) { syncing = false; return; }
//       const sourceMax = source.scrollHeight - source.clientHeight;
//       const targetMax = target.scrollHeight - target.clientHeight;
//       if (sourceMax <= 0 || targetMax <= 0) return;
//       syncing = true;
//       target.scrollTop = (source.scrollTop / sourceMax) * targetMax;
//     };

//     // Wait for Toast UI to render its inner scroller
//     const timer = setTimeout(() => {
//       const left = container.querySelector<HTMLElement>(leftSelector);
//       if (!left) return;

//       const onLeftScroll = () => sync(left, right);
//       const onRightScroll = () => sync(right, left);

//       left.addEventListener("scroll", onLeftScroll);
//       right.addEventListener("scroll", onRightScroll);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [leftContainerRef, rightElRef, leftSelector, enabled]);
// }

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
    let left: HTMLElement | null = null;
    let rafId: number;
    let tries = 0;

    const sync = (source: HTMLElement, target: HTMLElement) => {
      if (syncing) { syncing = false; return; }
      const sourceMax = source.scrollHeight - source.clientHeight;
      const targetMax = target.scrollHeight - target.clientHeight;
      if (sourceMax <= 0 || targetMax <= 0) return;
      syncing = true;
      target.scrollTop = (source.scrollTop / sourceMax) * targetMax;
    };

    const onLeftScroll = () => sync(left!, right);
    const onRightScroll = () => sync(right, left!);

    const attach = () => {
      left = container.querySelector<HTMLElement>(leftSelector);
      if (!left) {
        if (tries++ < 60) rafId = requestAnimationFrame(attach);
        return;
      }
      left.addEventListener("scroll", onLeftScroll);
      right.addEventListener("scroll", onRightScroll);
      // Initial sync: align the right to the left right now, so the user
      // doesn't see a jump on their first scroll after the preview appears.
      sync(left, right);
    };

    attach();

    return () => {
      cancelAnimationFrame(rafId);
      left?.removeEventListener("scroll", onLeftScroll);
      right.removeEventListener("scroll", onRightScroll);
    };
  }, [leftContainerRef, rightElRef, leftSelector, enabled]);
}