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
"use client";

import "katex/dist/katex.min.css";

import { useState, useRef, useEffect } from "react";
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

import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { markdown as cmMarkdown } from "@codemirror/lang-markdown";
import { history, historyKeymap, undo, redo } from "@codemirror/commands";
import { keymap } from "@codemirror/view";

import { mdContent } from "./content";
import {
  Heading1, Heading2, Heading3,
  Bold, Italic, Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered,
} from "lucide-react";







// ---------- Styles ----------
const styles = `
.md-demo { display: flex; flex-direction: column; height: calc(100vh - 32px); font-family: sans-serif; padding: 16px; gap: 12px; }
.md-demo .toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.md-demo .toolbar button {
  padding: 6px 12px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-size: 14px;
}
.md-demo .toolbar button:hover { background: #f9fafb; }
.md-demo .toolbar button:disabled { opacity: 0.5; cursor: not-allowed; }
.md-demo .split { display: flex; flex: 1; gap: 16px; overflow: hidden; }
.md-demo .pane { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.md-demo .label { font-weight: 600; font-size: 14px; color: #374151; }
.md-demo .editor-box {
  flex: 1; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; overflow: auto; background: #fff;
}
.md-demo .error {
  background: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 8px 12px; border-radius: 6px; font-size: 14px;
}

/* Editor content styling */
.tiptap-output .ProseMirror { outline: none; min-height: 100%; }
.tiptap-output h1 { font-size: 1.8rem; font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h2 { font-size: 1.4rem; font-weight: 700; margin: 0.6em 0 0.3em; }
.tiptap-output h3 { font-size: 1.15rem; font-weight: 600; margin: 0.5em 0 0.3em; }
.tiptap-output p { margin: 0.5em 0; line-height: 1.6; }
.tiptap-output ul, .tiptap-output ol { padding-left: 1.5em; margin: 0.5em 0; }
.tiptap-output ul { list-style: disc; }
.tiptap-output ol { list-style: decimal; }
.tiptap-output strong { font-weight: 700; }
.tiptap-output em { font-style: italic; }
.tiptap-output a { color: #2563eb; text-decoration: underline; }
.tiptap-output blockquote {
  border-left: 3px solid #d1d5db; margin: 0.5em 0; padding: 0.2em 0.8em; color: #4b5563;
}
.tiptap-output code {
  background: #f3f4f6; padding: 2px 5px; border-radius: 3px;
  font-family: ui-monospace, Menlo, monospace; font-size: 0.9em;
}
.tiptap-output pre {
  background: #1f2937; color: #f3f4f6;
  padding: 12px; border-radius: 6px; overflow-x: auto; margin: 0.8em 0;
}
.tiptap-output pre code { background: transparent; color: inherit; padding: 0; }
.tiptap-output img { max-width: 100%; border-radius: 4px; margin: 0.5em 0; }

/* Task list */
.tiptap-output ul[data-type="taskList"] { list-style: none; padding-left: 0; }
.tiptap-output ul[data-type="taskList"] li { display: flex; align-items: flex-start; gap: 8px; }
.tiptap-output ul[data-type="taskList"] li > label { flex-shrink: 0; margin-top: 4px; }
.tiptap-output ul[data-type="taskList"] li > div { flex: 1; }

/* Table */
.tiptap-output table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
.tiptap-output table td, .tiptap-output table th { border: 1px solid #d1d5db; padding: 6px 10px; }
.tiptap-output table th { background: #f9fafb; font-weight: 600; }

/* Mention */
.tiptap-output .mention {
  background: #e0e7ff; color: #3730a3; padding: 2px 6px;
  border-radius: 4px; font-weight: 500;
}

/* Math */
.tiptap-output [data-type="block-math"] {
  margin: 1rem 0; padding: 0.5rem; background: #f8fafc; border-radius: 4px; text-align: center;
}
.tiptap-output [data-type="inline-math"] {
  background: #f1f5f9; padding: 2px 4px; border-radius: 3px;
}

/* Iframe (YouTube/Twitch) */
.tiptap-output iframe { max-width: 100%; border: none; border-radius: 6px; margin: 0.5em 0; }

/* Details */
.tiptap-output details { margin: 0.5em 0; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; }
.tiptap-output details summary { cursor: pointer; font-weight: 600; }

/* Highlight */
.tiptap-output mark { background: #fef08a; padding: 0 2px; border-radius: 2px; }
`;

// ---------- Component ----------
export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState(mdContent);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<ReactCodeMirrorRef>(null);
const [, forceRender] = useState(0);
  const editor = useEditor({
    extensions: [
      Markdown,
      StarterKit,
      Details,
      DetailsSummary,
      DetailsContent,
      TaskList,
      TaskItem.configure({ nested: true }),
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
      Mention.configure({
        HTMLAttributes: { class: "mention" },
        suggestions: [
          {
            char: "@",
            items: ({ query }: { query: string }) =>
              [
                "Lea Thompson", "Cyndi Lauper", "Tom Cruise", "Madonna",
                "Jerry Hall", "Joan Collins", "Winona Ryder", "Christina Applegate",
              ]
                .filter((i) => i.toLowerCase().startsWith(query.toLowerCase()))
                .slice(0, 5),
          },
          {
            char: "#",
            items: ({ query }: { query: string }) =>
              [
                "bug", "feature", "enhancement", "documentation",
                "help-wanted", "priority-high", "priority-low",
              ]
                .filter((i) => i.toLowerCase().startsWith(query.toLowerCase()))
                .slice(0, 5),
          },
        ],
      } as any),
      Mathematics,
    ],
    content: '# Markdown Test\n\nClick **"Parse Markdown"** to load content from the left panel.',
    contentType: "markdown",
    editable: false,
    immediatelyRender: true,
  });

  const parseMarkdown = () => {
    if (!editor) {
      setError("Editor not ready");
      return;
    }
    try {
      setError(null);
      editor.commands.setContent(markdownInput, { contentType: "markdown" });
    } catch (err) {
      setError(`Error parsing markdown: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const extractMarkdown = () => {
    if (!editor) return;
    try {
      const md = editor.getMarkdown();
      setMarkdownInput(md);
    } catch {
      setMarkdownInput(editor.getText());
    }
  };

const wrap = (delim: string) => {
  const view = editorRef.current?.view;
  if (view) toggleWrap(view, delim);
};

useEffect(() => {
  if (!editor) return;

  const timeoutId = setTimeout(() => {
    try {
      setError(null);
      editor.commands.setContent(markdownInput, { contentType: "markdown" });
    } catch (err) {
      setError(`Error parsing markdown: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, 100);

  return () => clearTimeout(timeoutId);
}, [markdownInput, editor]);


//   useEffect(() => {
//     parseMarkdown();
//   }, [markdownInput, editor]);
const view = editorRef.current?.view;
const state = view?.state;

const run = (fn: (v: any) => void) => () => { if (view) fn(view); };

const Options = state ? [
  { icon: <Heading1 className="size-4" />,    onClick: run(v => toggleHeading(v, 1)), pressed: isHeadingActive(state, 1) },
  { icon: <Heading2 className="size-4" />,    onClick: run(v => toggleHeading(v, 2)), pressed: isHeadingActive(state, 2) },
  { icon: <Heading3 className="size-4" />,    onClick: run(v => toggleHeading(v, 3)), pressed: isHeadingActive(state, 3) },
  { icon: <Bold className="size-4" />,        onClick: run(v => toggleWrap(v, "**")),  pressed: isWrapActive(state, "**") },
  { icon: <Italic className="size-4" />,      onClick: run(v => toggleWrap(v, "*")),   pressed: isWrapActive(state, "*") },
  { icon: <Strikethrough className="size-4"/>,onClick: run(v => toggleWrap(v, "~~")),  pressed: isWrapActive(state, "~~") },
  { icon: <AlignLeft className="size-4" />,   onClick: run(v => setAlignment(v, "left")),   pressed: isAlignActive(state, "left") },
  { icon: <AlignCenter className="size-4" />, onClick: run(v => setAlignment(v, "center")), pressed: isAlignActive(state, "center") },
  { icon: <AlignRight className="size-4" />,  onClick: run(v => setAlignment(v, "right")),  pressed: isAlignActive(state, "right") },
  { icon: <List className="size-4" />,        onClick: run(toggleBulletList),  pressed: isBulletActive(state) },
  { icon: <ListOrdered className="size-4" />, onClick: run(toggleOrderedList), pressed: isOrderedActive(state) },
  { icon: <Highlighter className="size-4" />, onClick: run(v => toggleWrap(v, "==")), pressed: isWrapActive(state, "==") },
] : [];

  return (
    <div className="md-demo">
      <style>{styles}</style>

      <div className="toolbar">
        <button onClick={parseMarkdown} disabled={!editor || !markdownInput.trim()}>
          Parse Markdown →
        </button>
        <button onClick={extractMarkdown} disabled={!editor}>
          ← Extract Markdown
        </button>
        <span style={{ width: 1, height: 24, background: "#e5e7eb" }} />
        <span style={{ width: 1, height: 24, background: "#e5e7eb" }} />
<button onClick={() => wrap("**")}>Bold</button>
<button onClick={() => wrap("*")}>Italic</button>
<button onClick={() => wrap("==")}>Highlight</button>  
    </div>

      {error && <div className="error">{error}</div>}

      <div className="split">
        <div className="pane">
          <div className="label">Markdown Input</div>
          <div className="editor-box" style={{ padding: 0 }}>
            <CodeMirror
              ref={editorRef}
              value={markdownInput}
              height="100%"
              extensions={[cmMarkdown()]}
              onChange={setMarkdownInput}
            />
          </div>
        </div>

        <div className="pane">
          <div className="label">Tiptap Editor (rendered output)</div>
          <div className="editor-box tiptap-output">
            {editor ? <EditorContent editor={editor} /> : <div>Loading editor…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}