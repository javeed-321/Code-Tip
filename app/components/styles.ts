export const styles = `
/* ============================================================
 * Layout
 * ============================================================ */
.md-demo {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 32px);
  font-family: sans-serif;
  padding: 16px;
  gap: 12px;
}

.md-demo .split {
  display: flex;
  flex: 1;
  gap: 16px;
  overflow: hidden;
}

.md-demo .pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.md-demo .label {
  display: none;   /* hide "Markdown" / "Preview" headings */
}

.md-demo .editor-box {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  overflow: auto;
  background: #fff;
}

/* ============================================================
 * TOAST UI — hide preview surfaces, dark toolbar, light body
 * ============================================================ */

/* Hide everything preview-related */
.md-demo .toastui-editor-md-tab-container,
.md-demo .toastui-editor-md-preview,
.md-demo .toastui-editor-md-splitter,
.md-demo .toastui-editor-md-vertical-style-toggle,
.md-demo .toastui-editor-mode-switch {
  display: none !important;
}

/* Let the markdown editor area take the full width once preview is gone */
.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor-md-container .toastui-editor {
  width: 100% !important;
  max-width: none !important;
}

/* Dark toolbar */
.md-demo .toastui-editor-toolbar,
.md-demo .toastui-editor-defaultUI-toolbar {
  background-color: #2d2d2d;
  border-bottom: 1px solid #1a1a1a;
}

.md-demo .toastui-editor-toolbar-divider {
  background-color: #555;
}

/* Light icons on dark toolbar */
.md-demo .toastui-editor-toolbar-icons {
  filter: invert(0.85) brightness(1.15);
  background-color: transparent;
  border: none;
}

.md-demo .toastui-editor-toolbar-icons:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.md-demo .toastui-editor-toolbar-icons:disabled {
  filter: invert(0.4);
}

/* Light editor body */
.md-demo .toastui-editor-defaultUI {
  border: none;
  border-radius: 0;
}

.md-demo .toastui-editor-md-container,
.md-demo .toastui-editor .ProseMirror {
  background: #ffffff;
  color: #1f2937;
}

/* Slightly tinted preview pane (Tiptap) so the two panes read as different */
.md-demo .tiptap-output {
  background: #f9fafb;
}

/* ============================================================
 * Tiptap rendered output
 * ============================================================ */
.tiptap-output .ProseMirror { outline: none; min-height: 100%; }

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

.tiptap-output code {
  background: #f3f4f6;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: ui-monospace, Menlo, monospace;
  font-size: 0.9em;
}

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
.tiptap-output [data-type="inline-math"] {
  background: #f1f5f9;
  padding: 2px 4px;
  border-radius: 3px;
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
`;