"use client";

import { useEffect, useState, type RefObject } from "react";

// Tracks the line/column of the Toast UI editor's caret.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useToastUICursor(tuiRef: RefObject<any>, ready: boolean) {
  const [cursor, setCursor] = useState({ line: 1, col: 0 });

  useEffect(() => {
    if (!ready) return;
    const inst = tuiRef?.current?.getInstance();
    if (!inst) return;

    const updateCursor = () => {
      try {
        const sel = inst.getSelection();
        const [line, col] = sel[0];
        setCursor({ line, col });
      } catch {
        console.log(
          "Failed to get cursor position from Toast UI — probably due to timing issues with selectionchange events"
        );
      }
    };

    inst.on("caretChange", updateCursor);
    // inst.on("focus", updateCursor);
    inst.on("change", updateCursor);
    // document.addEventListener("selectionchange", updateCursor);

    updateCursor();

    return () => {
      // inst.off("caretChange", updateCursor);
      inst.off("focus", updateCursor);
      inst.off("change", updateCursor);
      // document.removeEventListener("selectionchange", updateCursor);
    };
  }, [ready, tuiRef]);

  return cursor;
}
