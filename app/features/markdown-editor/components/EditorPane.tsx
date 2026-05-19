"use client";

import { forwardRef, type Ref } from "react";
import type { SaveStatus } from "../../../hooks/useMarkdownDoc";
import dynamic from "next/dynamic";

type EditorPaneProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tuiRef: Ref<any>;
  text: string;
  darkMode: boolean;
  onChange: () => void;
  onLoad: () => void;
  stats: { bytes: number; words: number; lines: number };
  cursor: { line: number; col: number };
  saveStatus: SaveStatus;
};

const ToastEditor = dynamic(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);

// Left side of the split: Toast UI markdown editor + its status bar.
const EditorPane = forwardRef<HTMLDivElement, EditorPaneProps>(function EditorPane(
  { tuiRef, text, darkMode, onChange, onLoad, stats, cursor, saveStatus },
  ref
) {
  return (
    <div ref={ref} className={`pane ${darkMode ? "pane-dark" : ""}`}>
      <div className="label">Source</div>
      <div
        className="editor-box editor-box-left"
        style={{ background: darkMode ? "#121212" : "#f8f8fc" }}
      >
        <ToastEditor
          ref={tuiRef}
          initialValue={text}
          height="100%"
          minHeight="200px"
          previewStyle="tab"
          onLoad={onLoad}
          initialEditType="markdown"
          useCommandShortcut={true}
          hideModeSwitch={true}
          onChange={onChange}
        />
      </div>

      <div className={`status-bar ${darkMode ? "status-bar-darkmode" : ""}`}>
        <span>Markdown</span>
        <span>{stats.bytes} bytes</span>
        <span>{stats.words} words</span>
        <span>{stats.lines} lines</span>
        <span>Ln {cursor.line}, Col {cursor.col}</span>
        <span>{saveStatus === "saving" ? "Saving…" : "Saved"}</span>
      </div>
    </div>
  );
});

export default EditorPane;
