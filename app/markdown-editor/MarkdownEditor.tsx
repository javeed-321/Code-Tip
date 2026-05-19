"use client";

// Third-party CSS (loaded once)
import "katex/dist/katex.min.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "highlight.js/styles/github-dark.css";

// Feature-owned CSS
import "./styles/response.css";
import "./styles/styles.css";
import "./styles/toolbar.css";
import "./styles/tiptap.css";
import "./styles/toast.css";
import "./styles/status-bar.css";

import { useState, useRef, useEffect } from "react";

// App-wide
import { exportHtml, exportPdf } from "./lib/export";
import { useMarkdownDoc } from "./hooks/useMarkdownDoc";
import { useScrollSync } from "./hooks/useScrollSync";

// Feature-local
import Toolbar from "./components/Toolbar";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import { mdContent } from "./lib/content";
import { getMarkdownStats } from "./lib/markdown-stats";
import { makeExec } from "./lib/toastui-commands";
import { usePreviewEditor } from "./hooks/usePreviewEditor";
import { useToastUICursor } from "./hooks/useToastUICursor";
import { useDisableSpellcheck } from "./hooks/useDisableSpellcheck";
import { usePreviewStats } from "./hooks/usePreviewStats";
import { useTiptapMirror } from "./hooks/useTiptapMirror";

function useToastUITheme(darkMode: boolean, ready: boolean) {
  
}

export default function MarkdownEditor() {
  // Document state (load + autosave handled by the hook)
  const { text, setText, hydrated, saveStatus } = useMarkdownDoc(mdContent);

  // UI state
  const [tuiReady, setTuiReady] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Refs
  const tuiRef = useRef<any>(null);
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  // Derived state via hooks
  const cursor = useToastUICursor(tuiRef, tuiReady);
  const editor = usePreviewEditor();
  const previewStats = usePreviewStats(editor);
  const mdStats = getMarkdownStats(text);

  // Side effects
  useTiptapMirror(editor, text);
  useToastUITheme(darkMode, tuiReady);
  // useDisableSpellcheck(text);
  useScrollSync(leftPaneRef, rightBoxRef, ".editor-box-left", hydrated);

  useEffect(() => {
  }, [darkMode, tuiReady]);


  // Pull markdown out of Toast UI on every change
  const handleChange = () => {
    const md = tuiRef.current?.getInstance()?.getMarkdown() ?? "";
    setText(md);
  };

  // Toast UI command runner used by the toolbar
  const exec = makeExec(tuiRef);

  if (!hydrated) {
    return <div className="md-demo">Loading…</div>;
  }

  const toggleTheme = () =>{
    console.log("Toggling theme, darkMode is now:", !darkMode);
    const root = document.querySelector(".toastui-editor-defaultUI");
    if (root) root.classList.toggle("toastui-editor-dark", !darkMode);
        setDarkMode((p) => !p);


  }



  return (
    <div className="md-demo">
      <Toolbar
        exec={exec}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onExportHtml={() =>
          editor && exportHtml({ html: editor.getHTML(), title: "document" })
        }
        onExportPdf={() =>
          editor && exportPdf({ html: editor.getHTML(), title: "document" })
        }
      />
      <div className="split">
        <EditorPane
          ref={leftPaneRef}
          tuiRef={tuiRef}
          text={text}
          darkMode={darkMode}
          onChange={handleChange}
          onLoad={() => setTuiReady(true)}
          stats={mdStats}
          cursor={cursor}
          saveStatus={saveStatus}
        />
        <PreviewPane
          ref={rightBoxRef}
          editor={editor}
          darkMode={darkMode}
          stats={previewStats}
        />
      </div>
    </div>
  );
}
