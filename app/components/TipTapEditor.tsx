"use client";
import {
  EditorContent, useEditor,
  StarterKit, Markdown, Details, DetailsContent, DetailsSummary,
  Highlight, Image, TaskItem, TaskList, Mathematics, Mention,
  TableKit, Twitch, Youtube, CodeBlockLowlight,
  common, createLowlight,
} from "../components/imports/tiptap-imports";

import "katex/dist/katex.min.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "highlight.js/styles/github-dark.css"; // pick any hljs theme
const lowlight = createLowlight(common); // ~35 common languages
// or: createLowlight({ js, ts, python, rust, ... }) for a smaller bundle

// Tiptap
import "../components/styles/response.css";
import "../components/styles/styles.css";
import "../components/styles/toolbar.css"
import "../components/styles/tiptap.css";
import "../components/styles/styles.css"
import "../components/styles/toast.css"
import "../components/styles/status-bar.css"
import { exportHtml, exportPdf } from "../lib/export";
import { useMarkdownDoc } from "../hooks/useMarkdownDoc";
import { useScrollSync } from "../hooks/useScrollSync";
import Toolbar from "./Toolbar";

// Toast UI loads only in the browser
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);

import { mdContent } from "./content";

export default function MarkdownEditor() {
  // --- Document state (load + autosave handled by the hook) ---
  const { text, setText, hydrated, saveStatus } = useMarkdownDoc(mdContent);

  // --- Local UI state ---
  const [cursor, setCursor] = useState({ line: 1, col: 0 });
  const [previewStats, setPreviewStats] = useState({
    chars: 0,
    words: 0,
    paragraphs: 0,
  });
  const [tuiReady, setTuiReady] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // --- Refs ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tuiRef = useRef<any>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  // --- Tiptap (preview only) ---
  const editor = useEditor({
    extensions: [
      Markdown,
      StarterKit,
      Details, DetailsSummary, DetailsContent,
      TaskList, TaskItem.configure({ nested: true }),
      Youtube.configure({ inline: false, width: 480, height: 320 }),
      Image,
      TableKit,
      Highlight,
      Mention,
      Mathematics,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" }),
    ],
    content: "",
    contentType: "markdown",
    editable: false,
    immediatelyRender: false,
  });

  // --- Derived markdown stats ---
  function computeMdStats(text: string) {
    const bytes = new Blob([text]).size;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    return { bytes, words, lines };
  }

  const mdStats = computeMdStats(text);


  // --- Pull markdown out of Toast UI on every change ---
  const handleChange = () => {
    const md = tuiRef.current?.getInstance()?.getMarkdown() ?? "";
    setText(md);
    console.log(editor?.getHTML());
  };

  // --- Debounced: Toast UI text → Tiptap preview ---
  useEffect(() => {
    if (!editor) return;
    const id = setTimeout(() => {
      try {
        editor.commands.setContent(text, { contentType: "markdown" });

      } catch {
        /* ignore */
        console.log("Failed to set Tiptap content — probably invalid markdown:", { text });
      }
    }, 25);

    return () => clearTimeout(id);
  }, [text, editor]);

  // --- Toast UI caret → Ln/Col  ---
  useEffect(() => {
    if (!tuiReady) return;
    const inst = tuiRef.current?.getInstance();
    if (!inst) return;

    const updateCursor = () => {
      try {
        const sel = inst.getSelection();
        // markdown mode: [[startLine, startCol], [endLine, endCol]]
        // if (Array.isArray(sel?.[0])) {
        const [line, col] = sel[0];
        setCursor({ line, col });
        // }
      } catch {
        console.log("Failed to get cursor position from Toast UI — probably due to timing issues with selectionchange events")
        /* ignore */
      }
    };

    // Toast UI's own events (work for typing, not always for clicks/arrows)
    inst.on("caretChange", updateCursor);
    inst.on("focus", updateCursor);
    inst.on("change", updateCursor);

    // Native event — fires reliably on every cursor move
    document.addEventListener("selectionchange", updateCursor);

    updateCursor();

    return () => {
      inst.off("caretChange", updateCursor);
      inst.off("focus", updateCursor);
      inst.off("change", updateCursor);
      document.removeEventListener("selectionchange", updateCursor);
    };
  }, [tuiReady]);


  // --- Tiptap content → preview stats ---
  useEffect(() => {
    if (!editor) return;

    const compute = () => {
      const plain = editor.getText();
      const chars = plain.length;
      const words = plain.trim() ? plain.trim().split(/\s+/).length : 0;
      const paragraphs = editor.state.doc.content.childCount;
      setPreviewStats({ chars, words, paragraphs });
    };

    editor.on("update", compute);
    compute();

    return () => {
      editor.off("update", compute);
    };
  }, [editor]);

  // --- Apply Toast UI's dark theme when darkMode flips ---
  // Toast UI's dark stylesheet (imported above) keys off `.toastui-editor-dark`
  // on the root. We add/remove that class whenever React state changes.
  useEffect(() => {
    const root = document.querySelector(".toastui-editor-defaultUI");
    if (root) root.classList.toggle("toastui-editor-dark", darkMode);
  }, [darkMode, tuiReady]);

  // --- Synchronized proportional scrolling (left ↔ right) ---
  useScrollSync(leftPaneRef, rightBoxRef, ".editor-box-left", hydrated);

  useEffect(() => {
    const inst = tuiRef.current?.getInstance();
    if (!inst) return;

    // Find the ProseMirror editing surfaces (both markdown and wysiwyg) and disable spellcheck
    const editors = document.querySelectorAll<HTMLElement>(
      ".toastui-editor .ProseMirror"
    );
    editors.forEach((el) => {
      el.setAttribute("spellcheck", "false");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocomplete", "off");
    });
  }, [text]);

  if (!hydrated) {
    return <div className="md-demo">Loading…</div>;
  }

  // Run any Toast UI command from a custom button. Focuses first so the
  // change is applied at the editor's cursor.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exec = (cmd: string, payload?: Record<string, any>) => {
    const inst = tuiRef.current?.getInstance();
    if (!inst) return;
    inst.focus();
    inst.exec(cmd, payload);
  };



  return (
    <div className="md-demo">
      <Toolbar
        exec={exec}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((p) => !p)}
        onExportHtml={() =>
          editor && exportHtml({ html: editor.getHTML(), title: "document" })
        }
        onExportPdf={() =>
          editor && exportPdf({ html: editor.getHTML(), title: "document" })
        }
      />
      <div className="split">
        {/* Left — Toast UI markdown editor */}

        <div ref={leftPaneRef} className={`pane ${darkMode ? "pane-dark" : ""}`}>
          <div className="label">Source</div>
          <div className="editor-box editor-box-left"
            style={{ background: darkMode ? "#121212" : "#f8f8fc" }}
          >
            <Editor
              ref={tuiRef}
              initialValue={text}
              height="100%"
              minHeight="200px"
              previewStyle="tab"
              onLoad={() => setTuiReady(true)}
   
              initialEditType="markdown"
              useCommandShortcut={true}
              hideModeSwitch={true}
              onChange={handleChange}
            />
          </div>

          <div className={`status-bar ${darkMode ? "status-bar-darkmode" : ""}`}>
            <span>Markdown</span>
            <span>{mdStats.bytes} bytes</span>
            <span>{mdStats.words} words</span>
            <span>{mdStats.lines} lines</span>
            <span>Ln {cursor.line}, Col {cursor.col}</span>
            <span>{saveStatus === "saving" ? "Saving…" : "Saved"}</span>
          </div>
        </div>

        {/* Right — Tiptap rendered preview */}
        <div className="pane">
          <div ref={rightBoxRef} className={`editor-box tiptap-output ${darkMode ? "tiptap-dark" : ""}`}
          >
            {editor && <EditorContent editor={editor} />}
          </div>
          <div className={`status-bar ${darkMode ? "status-bar-darkmode" : ""}`}>
            <span>HTML</span>
            <span>{previewStats.chars} characters</span>
            <span>{previewStats.words} words</span>
            <span>{previewStats.paragraphs} paragraphs</span>
          </div>
        </div>
      </div>
    </div>
  );
}