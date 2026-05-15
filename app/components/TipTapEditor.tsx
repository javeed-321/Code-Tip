"use client";

import "katex/dist/katex.min.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useState, useRef, useEffect } from "react";

// Tiptap
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Mathematics } from "@tiptap/extension-mathematics";
import { Mention } from "@tiptap/extension-mention";
import { TableKit } from "@tiptap/extension-table";
import { Twitch } from "@tiptap/extension-twitch";
import { Youtube } from "@tiptap/extension-youtube";

// TOAST UI Editor
import { Editor } from "@toast-ui/react-editor";

import { mdContent } from "./content";
import { styles } from "./styles";

export default function MarkdownEditor() {
  const [closeRightPane, setCloseRightPane] = useState(false);

  const [text, setText] = useState(mdContent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tuiRef = useRef<any>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  // Tiptap (preview only — editable false)
  const editor = useEditor({
    extensions: [
      Markdown,
      StarterKit,
      Details, DetailsSummary, DetailsContent,
      TaskList, TaskItem.configure({ nested: true }),
      Youtube.configure({ inline: false, width: 480, height: 320 }),
      Twitch.configure({
        inline: false,
        width: 480,
        height: 320,
        parent: typeof window !== "undefined" ? window.location.hostname : "localhost",
      }),
      Image,
      TableKit,
      Highlight,
      Mention,
      Mathematics,
    ],
    content: "",
    contentType: "markdown",
    editable: false,
    immediatelyRender: false,
  });

  // Debounced sync: TOAST UI text -> Tiptap preview
  useEffect(() => {
    if (!editor) return;
    const id = setTimeout(() => {
      try {
        editor.commands.setContent(text, { contentType: "markdown" });
      } catch {
        /* ignore */
      }
    }, 150);
    return () => clearTimeout(id);
  }, [text, editor]);

  // Synchronized scrolling between TOAST UI (left) and Tiptap (right)


  // Pull current markdown out of TOAST UI on every change
  const handleChange = () => {
    const md = tuiRef.current?.getInstance()?.getMarkdown() ?? "";
    setText(md);
  };
  // --- Status bar state ---
  const [cursor, setCursor] = useState({ line: 1, col: 0 });
  const [previewStats, setPreviewStats] = useState({
    chars: 0,
    words: 0,
    paragraphs: 0,
  });

  // Derived markdown stats — recomputed whenever `text` changes
  const mdStats = (() => {
    const bytes = new Blob([text]).size;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    // console.log("Recomputing markdown stats:", { bytes, words, lines });
    return { bytes, words, lines };
  })();

  // Subscribe to Toast UI caretChange for live Ln/Col
  useEffect(() => {
    const inst = tuiRef.current?.getInstance();
    if (!inst) return;

    const onCaret = () => {
      try {
        const sel = inst.getSelection();
        // In markdown mode: [[startLine, startCol], [endLine, endCol]]
        if (Array.isArray(sel?.[0])) {
          const [line, col] = sel[0];
          console.log("Caret changed:", { line, col })
          setCursor({ line, col });
        }
      } catch {
        /* ignore */
      }
    };

    inst.on("caretChange", onCaret);
    inst.on("focus", onCaret);
    onCaret(); // initial

    return () => {
      inst.off("caretChange", onCaret);
      inst.off("focus", onCaret);
    };
  }, []);

  // Subscribe to TipTap updates for preview stats
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
    compute(); // initial

    return () => {
      editor.off("update", compute);
    };
  }, [editor]);
  return (
    <div className="md-demo">
      <style>{styles}</style>

      <div className="split">
        {/* Left — TOAST UI editor */}
        <div ref={leftPaneRef} className="pane">
          <div className="label">Markdown</div>
          <div className="editor-box" style={{ padding: 0, overflow: "hidden" }}>
            <Editor
              ref={tuiRef}
              initialValue={text}
              height="100%"
              minHeight="200px"
              previewStyle="tab"
              initialEditType="markdown"
              useCommandShortcut={true}
              hideModeSwitch={true}
              onChange={handleChange}
            />


          </div>
          <div>
            <button onClick={() => {
              setCloseRightPane((prev) => !prev)
              console.log("Toggling right pane, now closeRightPane =", closeRightPane)
            }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right"><circle cx="15" cy="12" r="3" /><rect width="20" height="14" x="2" y="5" rx="7" /></svg></button>
          </div>
          <div className="status-bar">
            <span>Markdown</span><br />
            <span>{mdStats.bytes} {"   "} bytes</span>
            <span>{mdStats.words} {"   "}words</span>
            <span>{mdStats.lines} {"   "}lines</span>
            <span>Ln {cursor.line}, Col {"   "}{cursor.col}</span>
          </div>
        </div>

        {/* Right — Tiptap rendered output */}
        {closeRightPane ? null : (<div className="pane">
          <div className="label">Preview</div>

          <div ref={rightBoxRef} className="editor-box tiptap-output">

            {editor && <EditorContent editor={editor} />}
          </div>
          <div className="status-bar">
            <span>HTML</span>
            <span>{previewStats.chars} characters</span>
            <span>{previewStats.words} words</span>
            <span>{previewStats.paragraphs} paragraphs</span>
          </div>
        </div>)}

      </div>
    </div>
  );
}