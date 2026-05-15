/* ============================================================================
   styles.ts — Toast UI Editor (left) + Tiptap preview (right), split layout
   ----------------------------------------------------------------------------
   DOM layout this stylesheet targets:

     .md-demo                           ← root, fills the viewport
     ├── .top-toolbar                   ← host the Toast UI toolbar is moved
     │                                    into at runtime (spans both panes)
     └── .split                         ← horizontal split container
         ├── .pane (left)               ← Toast UI markdown editor
         │   ├── .editor-box            ← wraps the <Editor /> component
         │   └── .status-bar            ← bytes / words / lines / Ln,Col
         └── .pane (right)              ← Tiptap preview
             ├── .editor-box .tiptap-output  ← wraps <EditorContent />
             └── .status-bar            ← chars / words / paragraphs

   Toast UI toolbar button → CSS class:
     .bold  .italic  .strike  .heading  .hrline  .quote
     .bullet-list  .ordered-list  .task-list  .indent  .outdent
     .table  .image  .link  .code  .codeblock
   ============================================================================ */

export const styles = `

/* ----------------------------------------------------------------------------
   1. Root layout
   Used by: .md-demo wrapper + .split + .pane in MarkdownEditor.tsx
   ---------------------------------------------------------------------------- */
.md-demo {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 1px;
  padding: 0px;
  padding-top: 50px;
  font-family: var(--font-lato), Lato, "Helvetica Neue", Helvetica, sans-serif;
}

.md-demo .split {
  display: flex;
  flex: 1;
  gap: 0px;
}

.md-demo .pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  min-height: 0;
  position:relative;
  
}

/* Pane labels are hidden in current design; kept as accessibility hooks */
.md-demo .label {
  display: none;
}

/* White card that wraps both the editor and the preview content */
.md-demo .editor-box {
  flex: 1;
  min-height: 0;
  padding: 12px;
  background: #efefef;
  border: 0px solid #d6d9dd;
}


/* ----------------------------------------------------------------------------
   2. Top toolbar host
   Used by: <div ref={topToolbarRef} className="top-toolbar" />
   The useEffect in MarkdownEditor.tsx appendChild()s the
   .toastui-editor-toolbar element into this host so it spans both panes.
   ---------------------------------------------------------------------------- */
.top-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  background: #fff;
  border-bottom: 0 solid #dadde6;
}

.top-toolbar .toastui-editor-toolbar {
  border-bottom: none;
}

/* Toast UI's main container drew a top border that's now redundant
   (the toolbar no longer sits on top of it) */
.toastui-editor-main {
  border: none;
}


/* ----------------------------------------------------------------------------
   3. Toast UI editor body — markdown editing surface (left pane)
   Used by: the <Editor /> ProseMirror instance inside .editor-box
   ---------------------------------------------------------------------------- */

/* Editing text */
.md-demo .toastui-editor-md-container .ProseMirror {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.7;
}

/* Hide Toast UI's built-in preview / mode-switch / tab UI
   (we render the preview via Tiptap on the right instead) */
.md-demo .toastui-editor-md-tab-container,
.md-demo .toastui-editor-md-preview,
.md-demo .toastui-editor-md-splitter,
.md-demo .toastui-editor-md-vertical-style-toggle,
.md-demo .toastui-editor-mode-switch {
  display: none !important;
}

/* Stretch markdown container to fill the pane */
.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor-md-container .toastui-editor {
  width: 100% !important;
  max-width: none !important;
}

/* Strip Toast UI's default border — .editor-box already supplies one */
.md-demo .toastui-editor-defaultUI {
  border: none;
  border-radius: 0;
}

.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor .ProseMirror {
  background: #fff;
  color: #1f2937;
}


/* ----------------------------------------------------------------------------
   4. Toast UI toolbar — dark, compact bar at the top of the layout
   Used by: .toastui-editor-toolbar (moved into .top-toolbar at runtime)
   ---------------------------------------------------------------------------- */
.md-demo .toastui-editor-toolbar,
.md-demo .toastui-editor-defaultUI-toolbar {
  padding: 5px 8px;
  background: linear-gradient(to bottom, #2f2f33, #1e1e22);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

/* Each group of related buttons (e.g. bold/italic/strike) */
.md-demo .toastui-editor-toolbar-group {
  padding: 0 3px;
}

/* Individual buttons — bold, italic, heading, etc.
   filter:invert(1) flips Toast UI's dark default icons to white */
.md-demo .toastui-editor-toolbar-icons {
  width: 26px;
  height: 26px;
  margin: 0 1px;
  margin-right:7px;
  margin-left:4px;
  padding: 4px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  filter: invert(1) brightness(4.05);
transition: background-color 0.15s ease, opacity 0.15s ease;
}

.md-demo .toastui-editor-toolbar-icons:hover {
  background-color: rgba(255, 255, 255, 0.12);
  background-color:red;
}

.md-demo .toastui-editor-toolbar-icons:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

/* Thin vertical separator between groups */
.md-demo .toastui-editor-toolbar-divider {
 display:none;
}

/* Buttons hidden from users */
.md-demo .toastui-editor-toolbar-icons.hrline,
.md-demo .toastui-editor-toolbar-icons.indent,
.md-demo .toastui-editor-toolbar-icons.outdent,
.md-demo .toastui-editor-toolbar-icons.image,
.md-demo .toastui-editor-toolbar-icons.code {
  display: none;
}

/* Active state when cursor sits inside a styled node
   (e.g. cursor in bold text → bold button "lights up") */
.md-demo .toastui-editor-toolbar-icons.active,
.md-demo .toastui-editor-toolbar-icons.checked,
.md-demo .toastui-editor-toolbar-icons[aria-pressed="true"] {
  background-color: transparent !important;
  filter: invert(1) brightness(1.05) !important;
  opacity: 0.85 !important;
  border: none !important;
  box-shadow: none !important;
}


/* ----------------------------------------------------------------------------
   5. Right pane — Tiptap rendered preview
   Used by: .editor-box.tiptap-output wrapping <EditorContent editor={editor} />
   Tiptap runs with editable={false}, so this section is purely render styling.
   ---------------------------------------------------------------------------- */

/* Pane background tint */
.md-demo .tiptap-output {
  min-height: 90%;
  background: #f3f3f3;
  overflow: auto;
}

.tiptap-output .ProseMirror {
  min-height: 100%;
  outline: none;
  font-size: 15px;
}

/* --- Typography --- */
.tiptap-output h1 { font-size: 1.8rem;  font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h2 { font-size: 1.4rem;  font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; }
.tiptap-output p  { margin: 0.5em 0; line-height: 1.6; }

.tiptap-output strong { font-weight: 700; }
.tiptap-output em     { font-style: italic; }

.tiptap-output a {
  color: #2563eb;
  text-decoration: underline;
}

/* --- Lists --- */
.tiptap-output ul,
.tiptap-output ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}
.tiptap-output ul { list-style: disc; }
.tiptap-output ol { list-style: decimal; }

/* Task list (checkbox items) */
.tiptap-output ul[data-type="taskList"] {
  list-style: none;
  padding-left: 0;
}
.tiptap-output ul[data-type="taskList"] li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.tiptap-output ul[data-type="taskList"] li > label { flex-shrink: 0; margin-top: 4px; }
.tiptap-output ul[data-type="taskList"] li > div   { flex: 1; }

/* --- Blockquote / code / image --- */
.tiptap-output blockquote {
  margin: 0.5em 0;
  padding: 0.2em 0.8em;
  border-left: 3px solid #d1d5db;
  color: #4b5563;
}

.tiptap-output pre {
  margin: 0.8em 0;
  padding: 12px;
  background: #1f2937;
  color: #f3f4f6;
  border-radius: 6px;
  overflow-x: auto;
}
.tiptap-output pre code {
  padding: 0;
  background: transparent;
  color: inherit;
}

.tiptap-output img {
  max-width: 100%;
  margin: 0.5em 0;
  border-radius: 4px;
}

/* --- Tables --- */
.tiptap-output table {
  width: 100%;
  margin: 0.5em 0;
  border-collapse: collapse;
}
.tiptap-output table td,
.tiptap-output table th {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
}
.tiptap-output table th {
  background: #f9fafb;
  font-weight: 600;
}

/* --- Extension nodes --- */

/* @mentions */
.tiptap-output .mention {
  padding: 2px 6px;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 4px;
  font-weight: 500;
}

/* KaTeX block math */
.tiptap-output [data-type="block-math"] {
  margin: 1rem 0;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
  text-align: center;
}

/* Embedded YouTube / Twitch iframes */
.tiptap-output iframe {
  max-width: 100%;
  margin: 0.5em 0;
  border: none;
  border-radius: 6px;
}

/* <details>/<summary> collapsible blocks */
.tiptap-output details {
  margin: 0.5em 0;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}
.tiptap-output details summary {
  cursor: pointer;
  font-weight: 600;
}

/* Highlight extension */
.tiptap-output mark {
  padding: 0 2px;
  background: #fef08a;
  border-radius: 2px;
}


/* ----------------------------------------------------------------------------
   6. Status bars — bottom strip of each pane
   Used by: <div className="status-bar"> inside both .pane containers
   ---------------------------------------------------------------------------- */
.md-demo .status-bar {
  display: flex;
  gap: 16px;
  padding: 6px 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 6px 6px;
  font-size: 12px;
  color: #6b7280;
}

/* Leading "Markdown" / "HTML" label */
.md-demo .status-bar span:first-child {
  color: #374151;
  font-weight: 600;
}


/* ----------------------------------------------------------------------------
   7. Responsive — tablets & phones (stack panes vertically)
   ---------------------------------------------------------------------------- */
@media (max-width: 768px) {
  .md-demo {
    height: calc(100dvh - 16px);
    padding: 8px;
    gap: 8px;
  }

  .md-demo .split {
    flex-direction: column;
    gap: 8px;
  }

  .md-demo .pane {
    flex: 1 1 0;
    min-height: 250px;
  }

  /* Tiptap embeds & images shouldn't overflow on small screens */
  .tiptap-output iframe,
  .tiptap-output img {
    max-width: 100%;
    height: auto;
  }

  /* Toolbar can scroll horizontally if it doesn't fit */
  .md-demo .toastui-editor-defaultUI-toolbar {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
  }
}

.md-demo .toastui-editor-toolbar,
.md-demo .toastui-editor-defaultUI-toolbar {
  position: fixed;
  top: 2px;
  left: 0;
  right: 0;
  z-index: 100;
  /* keep your existing styling: */
  padding: 5px 8px;
  background: linear-gradient(to bottom, #2f2f33, #1e1e22);
  border:0.5px solid black ;
  border-radius: 5px;
  }

.md-demo {
  padding-top: 51px; /* still need this to reserve space */
}
`;