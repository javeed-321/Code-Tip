"use client";

import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TiptapEditor = any;

// Debounced: pushes Markdown `text` into the Tiptap preview editor.
export function useTiptapMirror(editor: TiptapEditor | null, text: string) {
  useEffect(() => {
    if (!editor) return;
    const id = setTimeout(() => {
      try {
        editor.commands.setContent(text, { contentType: "markdown" });
      } catch {
        console.log(
          "Failed to set Tiptap content — probably invalid markdown:",
          { text }
        );
      }
    }, 25);

    return () => clearTimeout(id);
  }, [text, editor]);
}
