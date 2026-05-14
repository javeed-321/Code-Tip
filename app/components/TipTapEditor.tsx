// "use client";

// import "katex/dist/katex.min.css";

// import { useState, useRef } from "react";
// import { createBlockMarkdownSpec, Node } from "@tiptap/core";
// import {
//   EditorContent,
//   NodeViewContent,
//   NodeViewWrapper,
//   ReactNodeViewRenderer,
//   useEditor,
// } from "@tiptap/react";
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

// import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
// import { markdown as cmMarkdown } from "@codemirror/lang-markdown";
// import { history, historyKeymap, undo, redo } from "@codemirror/commands";
// import { keymap } from "@codemirror/view";

// import { mdContent } from "./content";

// // ---------- Custom React node (for :::react directive) ----------
// const CustomReactComponent = ({ node }: any) => (
//   <NodeViewWrapper className="custom-react-node">
//     <div
//       style={{
//         border: "2px solid #3b82f6",
//         borderRadius: 8,
//         padding: 16,
//         margin: "8px 0",
//         backgroundColor: "#eff6ff",
//       }}
//     >
//       <h4 style={{ margin: "0 0 8px", color: "#1e40af" }}>Custom React Component</h4>
//       <p style={{ margin: 0, color: "#374151" }}>
//         {node.attrs.content || "This is a custom React node view!"}
//       </p>
//       <NodeViewContent />
//     </div>
//   </NodeViewWrapper>
// );

// const CustomReactNode = Node.create({
//   name: "customReactNode",
//   group: "block",
//   content: "block+",
//   addAttributes() {
//     return {
//       content: { default: "This is a custom React node view!" },
//     };
//   },
//   parseHTML() {
//     return [{ tag: 'div[data-type="custom-react-node"]' }];
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ["div", { "data-type": "custom-react-node", ...HTMLAttributes }, 0];
//   },
//   addNodeView() {
//     return ReactNodeViewRenderer(CustomReactComponent);
//   },
//   markdownTokenName: "customReactNode",
//   ...createBlockMarkdownSpec({
//     nodeName: "customReactNode",
//     name: "react",
//   }),
// });

// // ---------- Styles ----------
// const styles = `
// .md-demo { display: flex; flex-direction: column; height: calc(100vh - 32px); font-family: sans-serif; padding: 16px; gap: 12px; }
// .md-demo .toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
// .md-demo .toolbar button {
//   padding: 6px 12px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 14px;
// }
// .md-demo .toolbar button:hover { background: #f9fafb; }
// .md-demo .toolbar button:disabled { opacity: 0.5; cursor: not-allowed; }
// .md-demo .split { display: flex; flex: 1; gap: 16px; overflow: hidden; }
// .md-demo .pane { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
// .md-demo .label { font-weight: 600; font-size: 14px; color: #374151; }
// .md-demo .editor-box {
//   flex: 1; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; overflow: auto; background: #fff;
// }
// .md-demo .error {
//   background: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 14px;
// }

// /* Editor content styling */
// .tiptap-output .ProseMirror { outline: none; min-height: 100%; }
// .tiptap-output h1 { font-size: 1.8rem; font-weight: 700; margin: 0.6em 0 0.3em; }
// .tiptap-output h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0 0.3em; }
// .tiptap-output h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; }
// .tiptap-output p { margin: 0.5em 0; line-height: 1.6; }
// .tiptap-output ul, .tiptap-output ol { padding-left: 1.5em; margin: 0.5em 0; }
// .tiptap-output ul { list-style: disc; }
// .tiptap-output ol { list-style: decimal; }
// .tiptap-output strong { font-weight: 700; }
// .tiptap-output em { font-style: italic; }
// .tiptap-output a { color: #2563eb; text-decoration: underline; }
// .tiptap-output blockquote {
//   border-left: 3px solid #d1d5db; margin: 0.5em 0; padding: 0.2em 0.8em; color: #4b5563;
// }
// .tiptap-output code {
//   background: #f3f4f6; padding: 2px 5px; border-radius: 3px;
//   font-family: ui-monospace, Menlo, monospace; font-size: 0.9em;
// }
// .tiptap-output pre {
//   background: #1f2937; color: #f3f4f6;
//   padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.8em 0;
// }
// .tiptap-output pre code { background: transparent; color: inherit; padding: 0; }
// .tiptap-output img { max-width: 100%; border-radius: 4px; margin: 0.5em 0; }

// /* Task list */
// .tiptap-output ul[data-type="taskList"] { list-style: none; padding-left: 0; }
// .tiptap-output ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 8px; }
// .tiptap-output ul[data-type="taskList"] li > label { flex-shrink: 0; margin-top: 4px; }
// .tiptap-output ul[data-type="taskList"] li > div { flex: 1; }

// /* Table */
// .tiptap-output table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
// .tiptap-output table td, .tiptap-output table th { border: 1px solid #d1d5db; padding: 6px 10px; }
// .tiptap-output table th { background: #f9fafb; font-weight: 600; }

// /* Mention */
// .tiptap-output .mention {
//   background: #e0e7ff; color: #3730a3; padding: 2px 6px;
//   border-radius: 4px; font-weight: 500;
// }

// /* Math */
// .tiptap-output [data-type="block-math"] {
//   margin: 1rem 0; padding: 0.5rem; background: #f8fafc; border-radius: 4px; text-align: center;
// }
// .tiptap-output [data-type="inline-math"] {
//   background: #f1f5f9; padding: 2px 4px; border-radius: 3px;
// }

// /* Iframe (YouTube/Twitch) */
// .tiptap-output iframe { max-width: 100%; border: none; border-radius: 6px; margin: 0.5em 0; }

// /* Details */
// .tiptap-output details { margin: 0.5em 0; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; }
// .tiptap-output details summary { cursor: pointer; font-weight: 600; }

// /* Highlight */
// .tiptap-output mark { background: #fef08a; padding: 0 2px; border-radius: 2px; }
// `;

// // ---------- Component ----------
// export default function MarkdownEditor() {
//   const [markdownInput, setMarkdownInput] = useState(mdContent);
//   const [error, setError] = useState<string | null>(null);
//   const editorRef = useRef<ReactCodeMirrorRef>(null);

//   const editor = useEditor({
//     extensions: [
//       Markdown,
//       StarterKit,
//       Details,
//       DetailsSummary,
//       DetailsContent,
//       TaskList,
//       TaskItem.configure({ nested: true }),
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
//       Mention.configure({
//         HTMLAttributes: { class: "mention" },
//         suggestions: [
//           {
//             char: "@",
//             items: ({ query }: { query: string }) =>
//               [
//                 "Lea Thompson", "Cyndi Lauper", "Tom Cruise", "Madonna",
//                 "Jerry Hall", "Joan Collins", "Winona Ryder", "Christina Applegate",
//               ]
//                 .filter((i) => i.toLowerCase().startsWith(query.toLowerCase()))
//                 .slice(0, 5),
//           },
//           {
//             char: "#",
//             items: ({ query }: { query: string }) =>
//               [
//                 "bug", "feature", "enhancement", "documentation",
//                 "help-wanted", "priority-high", "priority-low",
//               ]
//                 .filter((i) => i.toLowerCase().startsWith(query.toLowerCase()))
//                 .slice(0, 5),
//           },
//         ],
//       } as any),
//       Mathematics,
//       CustomReactNode,
//     ],
//     content: '# Markdown Test\n\nClick **"Parse Markdown"** to load content from the left panel.',
//     contentType: "markdown",
//     editable: true,
//     immediatelyRender: false,
//   });

//   const parseMarkdown = () => {
//     if (!editor) {
//       setError("Editor not ready");
//       return;
//     }
//     try {
//       setError(null);
//       editor.commands.setContent(markdownInput, { contentType: "markdown" });
//     } catch (err) {
//       setError(`Error parsing markdown: ${err instanceof Error ? err.message : String(err)}`);
//     }
//   };

//   const extractMarkdown = () => {
//     if (!editor) return;
//     try {
//       const md = editor.getMarkdown();
//       setMarkdownInput(md);
//     } catch {
//       setMarkdownInput(editor.getText());
//     }
//   };

//   const runUndo = () => {
//     const view = editorRef.current?.view;
//     if (view) undo(view);
//   };

//   const runRedo = () => {
//     const view = editorRef.current?.view;
//     if (view) redo(view);
//   };

//   return (
//     <div className="md-demo">
//       <style>{styles}</style>

//       <div className="toolbar">
//         <button onClick={parseMarkdown} disabled={!editor || !markdownInput.trim()}>
//           Parse Markdown →
//         </button>
//         <button onClick={extractMarkdown} disabled={!editor}>
//           ← Extract Markdown
//         </button>
//         <span style={{ width: 1, height: 24, background: "#e5e7eb" }} />
//         <button onClick={runUndo}>Undo (left)</button>
//         <button onClick={runRedo}>Redo (left)</button>
//         <span style={{ width: 1, height: 24, background: "#e5e7eb" }} />
//         <button onClick={() => editor?.commands.toggleBold()}>Bold</button>
//         <button onClick={() => editor?.commands.toggleItalic()}>Italic</button>
//         <button onClick={() => editor?.commands.toggleHighlight()}>Highlight</button>
//       </div>

//       {error && <div className="error">{error}</div>}

//       <div className="split">
//         <div className="pane">
//           <div className="label">Markdown Input</div>
//           <div className="editor-box" style={{ padding: 0 }}>
//             <CodeMirror
//               ref={editorRef}
//               value={markdownInput}
//               height="100%"
//               extensions={[cmMarkdown(), history(), keymap.of(historyKeymap)]}
//               onChange={setMarkdownInput}
//             />
//           </div>
//         </div>

//         <div className="pane">
//           <div className="label">Tiptap Editor (rendered output)</div>
//           <div className="editor-box tiptap-output">
//             {editor ? <EditorContent editor={editor} /> : <div>Loading editor…</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import "katex/dist/katex.min.css";

// import { useState, useRef, useEffect } from "react";
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

// import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
// import { markdown as cmMarkdown } from "@codemirror/lang-markdown";
// import { history, historyKeymap } from "@codemirror/commands";
// import { EditorView, keymap } from "@codemirror/view";
// import { Prec } from "@codemirror/state";

// import { Bold, Italic, Type, Link as LinkIcon, List, ListOrdered } from "lucide-react";

// import { mdContent } from "./content";
// import { styles } from "./styles";

// /* ---------- CodeMirror helpers (toolbar actions) ---------- */

// function toggleWrap(view: EditorView, delim: string) {
//   const { state } = view;
//   const { from, to } = state.selection.main;
//   const d = delim.length;
//   const selected = state.sliceDoc(from, to);
//   const before = state.sliceDoc(Math.max(0, from - d), from);
//   const after = state.sliceDoc(to, Math.min(state.doc.length, to + d));

//   if (from === to) {
//     // Empty selection: do nothing
//   } else if (
//     selected.startsWith(delim) &&
//     selected.endsWith(delim) &&
//     selected.length >= d * 2
//   ) {
//     const inner = selected.slice(d, -d);
//     view.dispatch({
//       changes: { from, to, insert: inner },
//       selection: { anchor: from, head: from + inner.length },
//     });
//   } else if (before === delim && after === delim) {
//     view.dispatch({
//       changes: { from: from - d, to: to + d, insert: selected },
//       selection: { anchor: from - d, head: from - d + selected.length },
//     });
//   } else {
//     view.dispatch({
//       changes: { from, to, insert: delim + selected + delim },
//       selection: { anchor: from + d, head: from + d + selected.length },
//     });
//   }
//   view.focus();
// }

// function toggleBulletList(view: EditorView) {
//   const { state } = view;
//   const { from, to } = state.selection.main;

//   const startLine = state.doc.lineAt(from);
//   const endLine = state.doc.lineAt(to);

//   const lines: string[] = [];
//   for (let n = startLine.number; n <= endLine.number; n++) {
//     lines.push(state.doc.line(n).text);
//   }

//   const allBulleted = lines.every((line) => line.startsWith("- "));
//   const newLines = lines.map((line) => {
//     const stripped = line.replace(/^(- |\d+\.\s)/, "");
//     return allBulleted ? stripped : `- ${stripped}`;
//   });

//   const newText = newLines.join("\n");
//   view.dispatch({
//     changes: { from: startLine.from, to: endLine.to, insert: newText },
//     selection: { anchor: startLine.from + newText.length },
//   });
//   view.focus();
// }

// function toggleOrderedList(view: EditorView) {
//   const { state } = view;
//   const { from, to } = state.selection.main;

//   const startLine = state.doc.lineAt(from);
//   const endLine = state.doc.lineAt(to);

//   const lines: string[] = [];
//   for (let n = startLine.number; n <= endLine.number; n++) {
//     lines.push(state.doc.line(n).text);
//   }

//   const allOrdered = lines.every((line) => /^\d+\.\s/.test(line));
//   const newLines = lines.map((line, i) => {
//     const stripped = line.replace(/^(- |\d+\.\s)/, "");
//     return allOrdered ? stripped : `${i + 1}. ${stripped}`;
//   });

//   const newText = newLines.join("\n");
//   view.dispatch({
//     changes: { from: startLine.from, to: endLine.to, insert: newText },
//     selection: { anchor: startLine.from + newText.length },
//   });
//   view.focus();
// }

// function cycleHeading(view: EditorView) {
//   // Paragraph -> H1 -> H2 -> H3 -> Paragraph
//   const { state } = view;
//   const line = state.doc.lineAt(state.selection.main.from);
//   const m = line.text.match(/^(#{1,6})\s+/);
//   const current = m ? m[1].length : 0;
//   const next = current >= 3 ? 0 : current + 1;
//   const body = m ? line.text.slice(m[0].length) : line.text;
//   const replaced = next === 0 ? body : "#".repeat(next) + " " + body;
//   view.dispatch({ changes: { from: line.from, to: line.to, insert: replaced } });
//   view.focus();
// }

// function insertLink(view: EditorView) {
//   const url = window.prompt("URL:", "https://");
//   if (!url) return;
//   const { state } = view;
//   const { from, to } = state.selection.main;
//   const text = state.sliceDoc(from, to) || "link";
//   view.dispatch({ changes: { from, to, insert: `[${text}](${url})` } });
//   view.focus();
// }

// /* ---------- Enter-key handler: continue or exit a list ---------- */

// const continueList = (view: EditorView): boolean => {
//   const { state } = view;
//   const { from, to } = state.selection.main;
//   if (from !== to) return false;

//   const line = state.doc.lineAt(from);

//   // Bullet list (-, *, +)
//   const bullet = line.text.match(/^(\s*)([-*+])\s+(.*)$/);
//   if (bullet) {
//     const [, indent, marker, content] = bullet;
//     if (content.trim() === "") {
//       // Empty item -> exit the list
//       view.dispatch({
//         changes: { from: line.from, to: line.to, insert: "" },
//         selection: { anchor: line.from },
//       });
//       return true;
//     }
//     const insert = `\n${indent}${marker} `;
//     view.dispatch({
//       changes: { from, to, insert },
//       selection: { anchor: from + insert.length },
//     });
//     return true;
//   }

//   // Ordered list (1. 2. 3. ...)
//   const ordered = line.text.match(/^(\s*)(\d+)\.\s+(.*)$/);
//   if (ordered) {
//     const [, indent, numStr, content] = ordered;
//     if (content.trim() === "") {
//       view.dispatch({
//         changes: { from: line.from, to: line.to, insert: "" },
//         selection: { anchor: line.from },
//       });
//       return true;
//     }
//     const next = parseInt(numStr, 10) + 1;
//     const insert = `\n${indent}${next}. `;
//     view.dispatch({
//       changes: { from, to, insert },
//       selection: { anchor: from + insert.length },
//     });
//     return true;
//   }

//   // Not on a list line — let CodeMirror handle Enter normally
//   return false;
// };

// const listContinuation = Prec.highest(
//   keymap.of([{ key: "Enter", run: continueList }])
// );

// /* ---------- CodeMirror theme: padding around the editor ---------- */

// const editorPadding = EditorView.theme({
//   "&": { padding: "16px", margin: "3px !important" },
// });

// /* ---------- Component ---------- */

// export default function MarkdownEditor() {
//   const [text, setText] = useState(mdContent);
//   const editorRef = useRef<ReactCodeMirrorRef>(null);

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

//   // Debounced auto-parse: CodeMirror text -> Tiptap preview
//   useEffect(() => {
//     if (!editor) return;
//     const id = setTimeout(() => {
//       try {
//         editor.commands.setContent(text, { contentType: "markdown" });
//       } catch {
//         /* ignore parse errors */
//       }
//     }, 250);
//     return () => clearTimeout(id);
//   }, [text, editor]);

//   // Toolbar helper — fetch the live view and run the action
//   const cmd = (fn: (v: EditorView) => void) => () => {
//     const v = editorRef.current?.view;
//     if (v) fn(v);
//   };

//   return (
//     <div className="md-demo">
//       <style>{styles}</style>

//       <div className="toolbar">
//         <button onClick={cmd((v) => toggleWrap(v, "**"))} title="Bold">
//           <Bold className="size-4" />
//         </button>
//         <button onClick={cmd((v) => toggleWrap(v, "*"))} title="Italic">
//           <Italic className="size-4" />
//         </button>
//         <button onClick={cmd(cycleHeading)} title="Heading">
//           <Type className="size-4" />
//         </button>
//         <button onClick={cmd(insertLink)} title="Link">
//           <LinkIcon className="size-4" />
//         </button>
//         <button onClick={cmd(toggleBulletList)} title="Bullet list">
//           <List className="size-4" />
//         </button>
//         <button onClick={cmd(toggleOrderedList)} title="Ordered list">
//           <ListOrdered className="size-4" />
//         </button>
//       </div>

//       <div className="split">
//         <div className="pane">
//           <div className="label">Markdown</div>
//           <div className="editor-box" style={{ padding: 0 }}>
//             <CodeMirror
//               ref={editorRef}
//               value={text}
//               height="100%"
//               basicSetup={{
//                 lineNumbers: false,
//                 foldGutter: false,
//               }}
//               extensions={[
//                 cmMarkdown(),
//                 history(),
//                 editorPadding,
//                 listContinuation,
//                 keymap.of(historyKeymap),
//               ]}
//               onChange={setText}
//             />
//           </div>
//         </div>

//         <div className="pane">
//           <div className="label">Preview</div>
//           <div className="editor-box tiptap-output">
//             {editor && <EditorContent editor={editor} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
  const [text, setText] = useState(mdContent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tuiRef = useRef<any>(null);

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

  // Pull current markdown out of TOAST UI on every change
  const handleChange = () => {
    const md = tuiRef.current?.getInstance()?.getMarkdown() ?? "";
    setText(md);
  };

  return (
    <div className="md-demo">
      <style>{styles}</style>

      <div className="split">
        {/* Left — TOAST UI editor */}
        <div className="pane">
          <div className="label">Markdown</div>
          <div className="editor-box" style={{ padding: 0, overflow: "hidden" }}>
            <Editor
              ref={tuiRef}
              initialValue={text}
              previewStyle="tab"
              height="100%"
              initialEditType="markdown"
              useCommandShortcut={true}
              hideModeSwitch={true}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right — Tiptap rendered output */}
        <div className="pane">
          <div className="label">Preview</div>
          <div className="editor-box tiptap-output">
            {editor && <EditorContent editor={editor} />}
          </div>
        </div>
      </div>
    </div>
  );
}