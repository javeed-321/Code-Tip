"use client";

import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TiptapEditor = any;

// Tracks characters / words / paragraphs of the Tiptap preview document.
export function usePreviewStats(editor: TiptapEditor | null) {
  const [stats, setStats] = useState({ chars: 0, words: 0, paragraphs: 0 });

  useEffect(() => {
    if (!editor) return;

    const compute = () => {
      const plain = editor.getText();
      const chars = plain.length;
      const words = plain.trim() ? plain.trim().split(/\s+/).length : 0;
      const paragraphs = editor.state.doc.content.childCount;
      setStats({ chars, words, paragraphs });
    };

    editor.on("update", compute);
    compute();

    return () => {
      editor.off("update", compute);
    };
  }, [editor]);

  return stats;
}
