// "use client";

// import { useState, useRef, useEffect } from "react";
// import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
// import { markdown } from "@codemirror/lang-markdown";
// import { history, historyKeymap, undo, redo } from "@codemirror/commands";
// import { keymap } from "@codemirror/view";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Youtube from "@tiptap/extension-youtube";
// import TaskList from "@tiptap/extension-task-list";
// import TaskItem from "@tiptap/extension-task-item";
// import Link from "@tiptap/extension-link";
// import { Markdown } from "tiptap-markdown";

// const initialDoc = `# Markdown Demo

// This editor renders **images**, _task lists_, and **YouTube videos** from markdown.

// ## Images

// Standard markdown image syntax works:

// ![Mountain view](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600)

// ## Task list

// - [ ] Buy groceries
// - [x] Write the blog post
// - [ ] Ship the feature
//   - [x] Sub-task done
//   - [ ] Sub-task pending

// ## Video (via iframe)

// <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" frameborder="0" allowfullscreen></iframe>

// ## Code block

// \`\`\`js
// console.log("hello world");
// \`\`\`

// ## Blockquote

// > Markdown is plain text with a few rules.
// `;

// const previewStyles = `
// .tiptap-preview .ProseMirror { outline: none; }
// .tiptap-preview h1 { font-size: 1.8rem; font-weight: 700; margin: 0.6em 0 0.3em; }
// .tiptap-preview h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0 0.3em; }
// .tiptap-preview h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; }
// .tiptap-preview p  { margin: 0.5em 0; line-height: 1.6; }
// .tiptap-preview ul, .tiptap-preview ol { padding-left: 1.5em; margin: 0.5em 0; }
// .tiptap-preview ul { list-style: disc; }
// .tiptap-preview ol { list-style: decimal; }
// .tiptap-preview li { margin: 0.2em 0; }
// .tiptap-preview strong { font-weight: 700; }
// .tiptap-preview em { font-style: italic; }
// .tiptap-preview a { color: #2563eb; text-decoration: underline; }
// .tiptap-preview blockquote {
//   border-left: 3px solid #d1d5db;
//   margin: 0.5em 0; padding: 0.2em 0.8em; color: #4b5563;
// }
// .tiptap-preview code {
//   background: #f3f4f6; padding: 2px 5px; border-radius: 3px;
//   font-family: ui-monospace, Menlo, monospace; font-size: 0.9em;
// }
// .tiptap-preview pre {
//   background: #1f2937; color: #f3f4f6;
//   padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.8em 0;
// }
// .tiptap-preview pre code { background: transparent; color: inherit; padding: 0; }

// /* Images */
// .tiptap-preview img {
//   max-width: 100%; height: auto;
//   border-radius: 6px; margin: 0.5em 0;
// }

// /* Task list */
// .tiptap-preview ul[data-type="taskList"] {
//   list-style: none; padding-left: 0;
// }
// .tiptap-preview ul[data-type="taskList"] li {
//   display: flex; align-items: flex-start; gap: 8px;
// }
// .tiptap-preview ul[data-type="taskList"] li > label {
//   flex-shrink: 0; margin-top: 4px; user-select: none;
// }
// .tiptap-preview ul[data-type="taskList"] li > div { flex: 1; }
// .tiptap-preview ul[data-type="taskList"] input[type="checkbox"] {
//   width: 16px; height: 16px; cursor: default;
// }

// /* YouTube iframe */
// .tiptap-preview iframe,
// .tiptap-preview div[data-youtube-video] iframe {
//   width: 100%;
//   aspect-ratio: 16 / 9;
//   height: auto;
//   border: none;
//   border-radius: 6px;
//   margin: 0.5em 0;
// }
// `;

// export default function MarkdownEditor() {
//   const [value, setValue] = useState(initialDoc);
//   const editorRef = useRef<ReactCodeMirrorRef>(null);

//   const previewEditor = useEditor({
//     extensions: [
//       StarterKit,
//       Image,
//       Youtube.configure({
//         controls: true,
//         nocookie: true,
//       }),
//       TaskList,
//       TaskItem.configure({ nested: true }),
//       Link.configure({ openOnClick: false, autolink: true }),
//       Markdown.configure({
//         html: true,      // ← critical: allows <iframe> HTML in markdown
//         breaks: true,
//         linkify: true,
//       }),
//     ],
//     content: value,
//     editable: false,
//     immediatelyRender: false,
//   });

//   useEffect(() => {
//     if (!previewEditor) return;
//     const current = previewEditor.storage.markdown?.getMarkdown?.() ?? "";
//     if (current !== value) {
//       previewEditor.commands.setContent(value);
//     }
//   }, [value, previewEditor]);

//   const runUndo = () => {
//     const view = editorRef.current?.view;
//     if (view) undo(view);
//   };

//   const runRedo = () => {
//     const view = editorRef.current?.view;
//     if (view) redo(view);
//   };

//   return (
//     <div style={{ fontFamily: "sans-serif", padding: 16 }}>
//       <style>{previewStyles}</style>

//       <div style={{ marginBottom: 8, display: "flex", gap: 8 }}>
//         <button onClick={runUndo}>Undo</button>
//         <button onClick={runRedo}>Redo</button>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <div>
//           <h4 style={{ margin: "0 0 8px" }}>Markdown source</h4>
//           <CodeMirror
//             ref={editorRef}
//             value={value}
//             height="500px"
//             extensions={[markdown(), history(), keymap.of(historyKeymap)]}
//             onChange={setValue}
//           />
//         </div>

//         <div>
//           <h4 style={{ margin: "0 0 8px" }}>Preview</h4>
//           <div
//             className="tiptap-preview"
//             style={{
//               height: "500px",
//               overflow: "auto",
//               border: "1px solid #ddd",
//               borderRadius: 6,
//               padding: 12,
//               background: "#fff",
//             }}
//           >
//             <EditorContent editor={previewEditor} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }