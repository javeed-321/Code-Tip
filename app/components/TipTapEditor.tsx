// "use client";

// import "katex/dist/katex.min.css";
// import "@toast-ui/editor/dist/toastui-editor.css";

// import { useState, useRef, useEffect } from "react";
// import dynamic from "next/dynamic";

// import "./styles.css"

// // Tiptap
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Markdown } from "@tiptap/markdown";
// import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details";
// import { Highlight } from "@tiptap/extension-highlight";
// import { Image } from "@tiptap/extension-image";
// import { TaskItem, TaskList } from "@tiptap/extension-list";
// import { Mathematics } from "@tiptap/extension-mathematics";
// import { Mention } from "@tiptap/extension-mention";
// import { TableKit } from "@tiptap/extension-table";
// import { Twitch } from "@tiptap/extension-twitch";
// import { Youtube } from "@tiptap/extension-youtube";

// // TOAST UI Editor — loaded only in the browser (touches `Element` at module load)
// const Editor = dynamic(
//   () => import("@toast-ui/react-editor").then((m) => m.Editor),
//   { ssr: false }
// );

// import { mdContent } from "./content";

// export default function MarkdownEditor() {
//   const topToolbarRef = useRef<HTMLDivElement>(null);
//   const [closeRightPane, setCloseRightPane] = useState(false);

//   const [text, setText] = useState(mdContent);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const tuiRef = useRef<any>(null);
//   const leftPaneRef = useRef<HTMLDivElement>(null);
//   const rightBoxRef = useRef<HTMLDivElement>(null);

//   // Tiptap (preview only — editable false)
//   const editor = useEditor({
//     extensions: [
//       Markdown,
//       StarterKit,
//       Details, DetailsSummary, DetailsContent,
//       TaskList, TaskItem.configure({ nested: true }),
//       Youtube.configure({ inline: false, width: 480, height: 320 }),
//       Twitch.configure({
//         inline: false,
//         width: 480,
//         height: 320,
//         parent: typeof window !== "undefined" ? window.location.hostname : "localhost",
//       }),
//       Image,
//       TableKit,
//       Highlight,
//       Mention,
//       Mathematics,
//     ],
//     content: "",
//     contentType: "markdown",
//     editable: false,
//     immediatelyRender: false,
//   });

//   // Debounced sync: TOAST UI text -> Tiptap preview
//   useEffect(() => {
//     if (!editor) return;
//     const id = setTimeout(() => {
//       try {
//         editor.commands.setContent(text, { contentType: "markdown" });
//       } catch {
//         /* ignore */
//       }
//     }, 150);
//     return () => clearTimeout(id);
//   }, [text, editor]);

//   // Synchronized scrolling between TOAST UI (left) and Tiptap (right)


//   // Pull current markdown out of TOAST UI on every change
//   const handleChange = () => {
//     const md = tuiRef.current?.getInstance()?.getMarkdown() ?? "";
//     setText(md);
//   };
//   // --- Status bar state ---
//   const [cursor, setCursor] = useState({ line: 1, col: 0 });
//   const [previewStats, setPreviewStats] = useState({
//     chars: 0,
//     words: 0,
//     paragraphs: 0,
//   });

//   // Derived markdown stats — recomputed whenever `text` changes
//   const mdStats = (() => {
//     const bytes = new Blob([text]).size;
//     const words = text.trim() ? text.trim().split(/\s+/).length : 0;
//     const lines = text.split("\n").length;
//     // console.log("Recomputing markdown stats:", { bytes, words, lines });
//     return { bytes, words, lines };
//   })();

//   // Subscribe to Toast UI caretChange for live Ln/Col
//   useEffect(() => {
//     const inst = tuiRef.current?.getInstance();
//     if (!inst) return;

//     const onCaret = () => {
//       try {
//         const sel = inst.getSelection();
//         // In markdown mode: [[startLine, startCol], [endLine, endCol]]
//         if (Array.isArray(sel?.[0])) {
//           const [line, col] = sel[0];
//           console.log("Caret changed:", { line, col })
//           setCursor({ line, col });
//         }
//       } catch {
//         /* ignore */
//       }
//     };

//     inst.on("caretChange", onCaret);
//     inst.on("focus", onCaret);
//     onCaret(); // initial

//     return () => {
//       inst.off("caretChange", onCaret);
//       inst.off("focus", onCaret);
//     };
//   }, []);

//   // Subscribe to TipTap updates for preview stats
//   useEffect(() => {
//     if (!editor) return;

//     const compute = () => {
//       const plain = editor.getText();
//       const chars = plain.length;
//       const words = plain.trim() ? plain.trim().split(/\s+/).length : 0;
//       const paragraphs = editor.state.doc.content.childCount;
//       setPreviewStats({ chars, words, paragraphs });
//     };

//     editor.on("update", compute);
//     compute(); // initial

//     return () => {
//       editor.off("update", compute);
//     };
//   }, [editor]);


// // Synchronized proportional scrolling — left ↔ right (auto-detect scrollers)

  
// // Synchronized scrolling — Toast UI (left) ↔ Tiptap (right)

//   return (
//     <div className="md-demo">
// {/* <div ref={topToolbarRef} className="top-toolbar" /> */}
//       <div className="split">
//         {/* Left — TOAST UI editor */}
//         <div ref={leftPaneRef} className="pane">
//           <div className="label">Markdown</div>
//           <div className="editor-box" style={{ padding: 0, overflow: "hidden" }}>
//             <Editor
//               ref={tuiRef}
//               initialValue={text}
//               height="100%"
//               minHeight="200px"
//               previewStyle="tab"
//               initialEditType="markdown"
//               useCommandShortcut={false}
//               hideModeSwitch={true}
//               onChange={handleChange}
//             />


//           </div>
//           {/* <div>
//             <button onClick={() => {
//               setCloseRightPane((prev) => !prev)
//               console.log("Toggling right pane, now closeRightPane =", closeRightPane)
//             }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right"><circle cx="15" cy="12" r="3" /><rect width="20" height="14" x="2" y="5" rx="7" /></svg></button>
//           </div> */}
//           <div className="status-bar">
//             <span>Markdown</span><br />
//             <span>{mdStats.bytes} {"   "} bytes</span>
//             <span>{mdStats.words} {"   "}words</span>
//             <span>{mdStats.lines} {"   "}lines</span>
//             <span>Ln {cursor.line}, Col {"   "}{cursor.col}</span>
//           </div>
//         </div>

//         {/* Right — Tiptap rendered output */}
//         {closeRightPane ? null : (<div className="pane">
//           <div className="label">Preview</div>

//           <div ref={rightBoxRef} className="editor-box tiptap-output">

//             {editor && <EditorContent editor={editor} />}
//           </div>
//           <div className="status-bar">
//             <span>HTML</span>
//             <span>{previewStats.chars} characters</span>
//             <span>{previewStats.words} words</span>
//             <span>{previewStats.paragraphs} paragraphs</span>
//           </div>
//         </div>)}

//       </div>
//     </div>
//   );
// }
"use client";

import "katex/dist/katex.min.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import "highlight.js/styles/github-dark.css"; // pick any hljs theme

const lowlight = createLowlight(common); // ~35 common languages
// or: createLowlight({ js, ts, python, rust, ... }) for a smaller bundle


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

import "../components/styles/response.css";
import "../components/styles/styles.css";
import "../components/styles/toolbar.css"
import "../components/styles/tiptap.css";
import "../components/styles/styles.css"
import "../components/styles/toast.css"
import "../components/styles/status-bar.css"
import { loadCurrentDoc, saveCurrentDoc } from "../lib/db";
import { exportHtml, exportPdf } from "../lib/export";

// Toast UI loads only in the browser
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);

import { mdContent } from "./content";

export default function MarkdownEditor() {
  // --- State ---
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [cursor, setCursor] = useState({ line: 1, col: 0 });
  const [previewStats, setPreviewStats] = useState({
    chars: 0,
    words: 0,
    paragraphs: 0,
  });
  const [tuiReady, setTuiReady] = useState(false);

// Load the saved doc from IndexedDB on first mount.
// Fall back to the demo content if there's nothing stored yet.
useEffect(() => {
  let cancelled = false;
  loadCurrentDoc()
    .then((stored) => {
      if (cancelled) return;
      setText(stored ?? mdContent);
      setHydrated(true);
    })
    .catch((err) => {
      console.error("Failed to load doc:", err);
      setText(mdContent);
      setHydrated(true);
    });
  return () => { cancelled = true; };
}, []);
// Debounced autosave to IndexedDB.
// Skips the very first render (before hydration) so we don't overwrite
// a real saved doc with an empty string.
useEffect(() => {
  if (!hydrated) return;
  setSaveStatus("saving");
  const id = setTimeout(() => {
    saveCurrentDoc(text)
      .then(() => setSaveStatus("saved"))
      .catch((err) => console.error("Autosave failed:", err));
  }, 100);
  return () => clearTimeout(id);
}, [text, hydrated]);

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
      CodeBlockLowlight.configure({ lowlight ,defaultLanguage: "plaintext" }),
    ],
    content: "",
    contentType: "markdown",
    editable: true,
    immediatelyRender: false,
  });

  // --- Derived markdown stats ---
  const mdStats = (() => {
    const bytes = new Blob([text]).size;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split("\n").length;
    return { bytes, words, lines };
  })();

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
      if (Array.isArray(sel?.[0])) {
        const [line, col] = sel[0];
        setCursor({ line, col });
      }
    } catch {
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

  // --- Synchronized proportional scrolling (left ↔ right) ---
  useEffect(() => {
    const leftPane = leftPaneRef.current;
    const rightEl = rightBoxRef.current;
    if (!leftPane) return;

    let leftEl: HTMLElement | null = null;
    let isSyncing = false;
    let rafId = 0;

    const syncLeftToRight = () => {
      if (!leftEl || !rightEl) return;
      if (isSyncing) { isSyncing = false; return; }
      const leftMax = leftEl.scrollHeight - leftEl.clientHeight;
      const rightMax = rightEl.scrollHeight - rightEl.clientHeight;
      if (leftMax <= 0 || rightMax <= 0) return;
      const ratio = leftEl.scrollTop / leftMax;
      isSyncing = true;
      rightEl.scrollTop = ratio * rightMax;
    };

    const syncRightToLeft = () => {
      if (!leftEl || !rightEl) return;
      if (isSyncing) { isSyncing = false; return; }
      const leftMax = leftEl.scrollHeight - leftEl.clientHeight;
      const rightMax = rightEl.scrollHeight - rightEl.clientHeight;
      if (leftMax <= 0 || rightMax <= 0) return;
      const ratio = rightEl.scrollTop / rightMax;
      isSyncing = true;
      leftEl.scrollTop = ratio * leftMax;
    };

    let tries = 0;
    const attach = () => {
  leftEl = leftPane.querySelector<HTMLElement>(".editor-box-left");
  if (!leftEl) {
    if (tries++ < 60) rafId = requestAnimationFrame(attach);
    return;
  }
  leftEl.addEventListener("scroll", syncLeftToRight, { passive: true });
  rightEl?.addEventListener("scroll", syncRightToLeft, { passive: true });
};
    attach();

    return () => {
      cancelAnimationFrame(rafId);
      leftEl?.removeEventListener("scroll", syncLeftToRight);
      rightEl?.removeEventListener("scroll", syncRightToLeft);
    };
  }, [hydrated]);

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

  return (
    <div className="md-demo">
      <div className="split">
        {/* Left — Toast UI markdown editor */}
        <div ref={leftPaneRef} className="pane">
          <div className="label">Markdown</div>
<div className="editor-box editor-box-left" style={{ padding: 0 }}>            <Editor
              ref={tuiRef}
              initialValue={text}
              height="auto"
              minHeight="200px"
              previewStyle="tab"
                onLoad={() => setTuiReady(true)}

              initialEditType="markdown"
              useCommandShortcut={true}
              hideModeSwitch={true}
              onChange={handleChange}
            />
          </div>
          <div className="status-bar">
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
          <div className="label">Preview</div>
          <div ref={rightBoxRef} className="editor-box tiptap-output">
            {editor && <EditorContent editor={editor} />}
          </div>
          <div className="status-bar">
            <span>HTML</span>
            <span>{previewStats.chars} characters</span>
            <span>{previewStats.words} words</span>
            <span>{previewStats.paragraphs} paragraphs</span>
            <button
              type="button"
              className="export-btn"
              onClick={() => editor && exportHtml({ html: editor.getHTML(), title: "document" })}
            >
              Export HTML
            </button>
            <button
              type="button"
              className="export-btn"
              onClick={() => editor && exportPdf({ html: editor.getHTML(), title: "document" })}
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}