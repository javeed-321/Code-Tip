"use client";

import { forwardRef } from "react";
import { EditorContent } from "@tiptap/react";

type PreviewPaneProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: any | null;
  darkMode: boolean;
  stats: { chars: number; words: number; paragraphs: number };
};

// Right side of the split: Tiptap rendered preview + its status bar.
const PreviewPane = forwardRef<HTMLDivElement, PreviewPaneProps>(function PreviewPane(
  { editor, darkMode, stats },
  ref
) {
  return (
    <div className="pane">
      <div
        ref={ref}
        className={`editor-box tiptap-output ${darkMode ? "tiptap-dark" : ""}`}
      >
        {editor && <EditorContent editor={editor} />}
      </div>

      <div className={`status-bar ${darkMode ? "status-bar-darkmode" : ""}`}>
 <span>HTML</span>
        <span>{stats.chars} characters</span>
        <span>{stats.words} words</span>
        <span>{stats.paragraphs} paragraphs</span>
    </div>
    </div>
  );
});

export default PreviewPane;
