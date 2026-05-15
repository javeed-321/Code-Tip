
export const styles = `
/* ============================================================
 * Layout
 * ============================================================ */
.md-demo {
  display: flex;
  flex-direction: column;
  height: 100vh;
font-family: var(--font-lato), Lato, "Helvetica Neue", Helvetica, sans-serif;
padding: 1px;
  gap: 1px;
}

.md-demo .split {
  display: flex;
  flex: 1;
  gap: 1px;
  overflow: hidden;
}

.md-demo .pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  min-height: 0;
}

.md-demo .label {
  display: none;
}

.md-demo .editor-box {
  flex: 1;
  border: 1px solid #d6d9dd;
  border-radius: 6px;
  padding: 12px;
  overflow: auto;
  background: #fff;
  min-height: 0;
}


/* Tablets and below: stack the panes vertically */
@media (max-width: 768px) {
  .md-demo {
    padding: 8px;
    gap: 8px;
    height: calc(100dvh - 16px);
  }

  .md-demo .split {
    flex-direction: column;
    gap: 8px;
  }

  /* Each pane gets a fixed share of the vertical space */
  .md-demo .pane {
    flex: 1 1 0;
    min-height: 250px;
  }

  /* Hide TipTap-side images that blow out the layout */
  .tiptap-output iframe,
  .tiptap-output img {
    max-width: 100%;
    height: auto;
  }

  /* Toast UI toolbar can overflow — let it scroll horizontally */
  .md-demo .toastui-editor-defaultUI-toolbar {
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
  }

  
}





/* ============================================================
 * TOAST UI — preview hiding, body, layout
 * ============================================================ */
.md-demo .toastui-editor-md-container .ProseMirror {
  font-size: 15px;
  line-height: 1.7;
  padding: 16px 20px;
}

.md-demo .toastui-editor-md-tab-container,
.md-demo .toastui-editor-md-preview,
.md-demo .toastui-editor-md-splitter,
.md-demo .toastui-editor-md-vertical-style-toggle,
.md-demo .toastui-editor-mode-switch {
  display: none !important ;
}

.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor-md-container .toastui-editor {
  width: 100% !important;
  max-width: none !important;
}

.md-demo .toastui-editor-defaultUI {
  border: none;
  border-radius: 0;
}

.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor .ProseMirror {
  background: #ffffff;
  color: #1f2937;
}

/* ============================================================
 * TOAST UI toolbar — compact, no selected/active highlight
 * ============================================================ */
.md-demo .toastui-editor-toolbar,
.md-demo .toastui-editor-defaultUI-toolbar {
  background: linear-gradient(to bottom, #2f2f33, #1e1e22);
  border-bottom: 1px solid #0a0a0a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  padding: 5px 8px;
}

.md-demo .toastui-editor-toolbar-group {
  padding: 0 3px;
}

.md-demo .toastui-editor-toolbar-icons {
  width: 26px;
  height: 26px;
  margin: 0 1px;
  padding: 4px;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  filter: invert(1) brightness(1.05);
  opacity: 0.85;
  transition: background-color 0.15s ease, opacity 0.15s ease, transform 0.1s ease;
}

.md-demo .toastui-editor-toolbar-icons:hover {
  background-color: rgba(255, 255, 255, 0.12);
  opacity: 1;
  transform: translateY(-1px);
}

.md-demo .toastui-editor-toolbar-icons:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.md-demo .toastui-editor-toolbar-divider {
  width: 1px;
  height: 18px;
  margin: 0 6px;
  background-color: rgba(255, 255, 255, 0.18);
  align-self: center;
}

/* Hide non-essential icons */
.md-demo .toastui-editor-toolbar-icons.hrline,
.md-demo .toastui-editor-toolbar-icons.task-list,
.md-demo .toastui-editor-toolbar-icons.indent,
.md-demo .toastui-editor-toolbar-icons.outdent,
.md-demo .toastui-editor-toolbar-icons.image,
.md-demo .toastui-editor-toolbar-icons.code {
  display: none;
}

.md-demo .toastui-editor-toolbar-icons.active,
.md-demo .toastui-editor-toolbar-icons.checked,
.md-demo .toastui-editor-toolbar-icons[aria-pressed="true"] {
  background-color: transparent !important;
  filter: invert(1) brightness(1.05) !important;
  opacity: 0.85 !important;
  border: none !important;
  box-shadow: none !important;
}
/* ============================================================
 * Right pane — background only
 * ============================================================ */
.md-demo .tiptap-output {
  background: #f8f6f6;
  min-height: 90%;
}

/* ============================================================
 * Tiptap rendered output
 * ============================================================ */
.tiptap-output .ProseMirror { outline: none; min-height: 100%; 
    font-size: 15px;
}

.tiptap-output h1 { font-size: 1.8rem; font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; }
.tiptap-output p { margin: 0.5em 0; line-height: 1.6; }

.tiptap-output ul,
.tiptap-output ol { padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-output ul { list-style: disc; }
.tiptap-output ol { list-style: decimal; }

.tiptap-output strong { font-weight: 700; }
.tiptap-output em { font-style: italic; }

.tiptap-output a {
  color: #2563eb;
  text-decoration: underline;
}

.tiptap-output blockquote {
  border-left: 3px solid #d1d5db;
  margin: 0.5em 0;
  padding: 0.2em 0.8em;
  color: #4b5563;
}

// .tiptap-output code {
//   background: #f3f4f6;
//   padding: 2px 5px;
//   border-radius: 3px;
//   font-family: ui-monospace, Menlo, monospace;
//   font-size: 0.9em;
// }

.tiptap-output pre {
  background: #1f2937;
  color: #f3f4f6;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.8em 0;
}

.tiptap-output pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

.tiptap-output img {
  max-width: 100%;
  border-radius: 4px;
  margin: 0.5em 0;
}

/* Task list */
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
.tiptap-output ul[data-type="taskList"] li > div { flex: 1; }

/* Tables */
.tiptap-output table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.5em 0;
}
.tiptap-output table td,
.tiptap-output table th {
  border: 1px solid #d1d5db;
  padding: 6px 10px;
}
.tiptap-output table th {
  background: #f9fafb;
  font-weight: 600;
}

/* Mention */
.tiptap-output .mention {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

/* Math */
.tiptap-output [data-type="block-math"] {
  margin: 1rem 0;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 4px;
  text-align: center;
}

/* Iframe (YouTube / Twitch) */
.tiptap-output iframe {
  max-width: 100%;
  border: none;
  border-radius: 6px;
  margin: 0.5em 0;
}

/* Details */
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

/* Highlight */
.tiptap-output mark {
  background: #fef08a;
  padding: 0 2px;
  border-radius: 2px;
}

.md-demo .status-bar {
  display: flex;
  
  gap: 16px;
  padding: 6px 12px;
  font-size: 12px;
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.md-demo .status-bar span:first-child {
  font-weight: 600;
  color: #374151;
}
`;




// Button	Class
// Bold	.bold
// Italic	.italic
// Strikethrough	.strike
// Heading	.heading
// Horizontal rule	.hrline
// Blockquote	.quote
// Bullet list	.bullet-list
// Ordered list	.ordered-list
// Task list	.task-list
// Indent / Outdent	.indent, .outdent
// Table	.table
// Image	.image
// Link	.link
// Inline code	.code
// Code block	.codeblock