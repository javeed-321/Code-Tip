"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import "katex/dist/katex.min.css";

import { useEffect, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import katex from "katex";
import mermaid from "mermaid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TuiRef = React.RefObject<any>;

const sampleMarkdown = `# Toast UI with Math & Diagrams

## KaTeX math

Inline math isn't built-in here, but block math works via the \`$$latex\` syntax:

$$latex
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}\\,dt
$$

$$latex
e^{i\\pi} + 1 = 0
$$

## Mermaid diagrams

Use a fenced code block with the \`mermaid\` language:

\`\`\`mermaid
graph LR
A[Start] --> B{Decision}
B -->|Yes| C[Continue]
B -->|No| D[Stop]
C --> E[End]
D --> E
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob
Bob -->> Alice: Hi Alice!
\`\`\`

## Regular markdown still works

Like **bold**, *italic*, [links](https://example.com), and \`code\`.
`;

const styles = `
.toast-stackedit {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.toast-stackedit .toastui-editor-defaultUI {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 0;
  overflow: hidden;
}

/* Toolbar styling (your existing StackEdit-style rules) */
.toast-stackedit .toastui-editor-toolbar,
.toast-stackedit .toastui-editor-defaultUI-toolbar {
  display: flex;
  align-items: center;
  gap: 22px;
  height: 44px;
  padding: 0 18px;
  background: linear-gradient(to bottom, #2a2a2e, #1c1c1f);
  border: none !important;
  box-shadow: none !important;
}

.toast-stackedit .toastui-editor-toolbar-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.toast-stackedit .toastui-editor-toolbar-icons {
  width: 28px;
  height: 28px;
  padding: 5px;
  margin: 0;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  filter: brightness(0) invert(1);
  opacity: 0.72;
  transition: opacity 0.15s, background-color 0.15s;
}

.toast-stackedit .toastui-editor-toolbar-icons:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.08);
}

.toast-stackedit .toastui-editor-toolbar-divider { display: none; }

/* Math + Mermaid rendered blocks */
.toast-stackedit .math-block {
  margin: 1em 0;
  padding: 12px;
  background: #f8fafc;
  border-radius: 4px;
  text-align: center;
  overflow-x: auto;
}

.toast-stackedit .mermaid {
  margin: 1em 0;
  padding: 12px;
  background: #fff;
  text-align: center;
  overflow-x: auto;
}

.toast-stackedit .toastui-editor-md-preview {
  background: #f8f8f8;
}
`;

export default function ToastUIWithPreview() {
  const editorRef: TuiRef = useRef(null);

  // Initialise Mermaid once
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
  }, []);

  // Re-run Mermaid whenever the preview content updates
// Initialise Mermaid once
useEffect(() => {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
  });
}, []);

// Re-render Mermaid blocks whenever the preview updates
useEffect(() => {
  const inst = editorRef.current?.getInstance();
  if (!inst) return;

  let counter = 0;

  const renderAll = async () => {
    const nodes = document.querySelectorAll<HTMLElement>(
      ".toast-stackedit .toastui-editor-md-preview .mermaid:not([data-processed])"
    );

    for (const el of Array.from(nodes)) {
      const source = (el.textContent || "").trim();
      if (!source) continue;

      // Mark BEFORE rendering so we don't loop on re-render
      el.setAttribute("data-processed", "true");

      try {
        const id = `mermaid-svg-${Date.now()}-${counter++}`;
        const { svg } = await mermaid.render(id, source);
        el.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render error:", err);
        el.innerHTML = `<pre style="color:#b91c1c;background:#fef2f2;padding:8px;border-radius:4px;white-space:pre-wrap;">Mermaid error: ${
          err instanceof Error ? err.message : String(err)
        }</pre>`;
      }
    }
  };

  const schedule = () => {
    // Defer to next frame so Toast UI has finished writing the new HTML
    requestAnimationFrame(() => {
      void renderAll();
    });
  };

  inst.on("change", schedule);
  schedule(); // initial pass

  return () => {
    inst.off("change", schedule);
  };
}, []);

  return (
    <div className="toast-stackedit">
      <style>{styles}</style>

      <Editor
        ref={editorRef}
        initialValue={sampleMarkdown}
        height="100%"
        previewStyle="vertical"
        initialEditType="markdown"
        useCommandShortcut={true}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["ul", "ol", "task"],
          ["quote", "code", "codeblock"],
          ["table", "link", "image"],
        ]}
        customHTMLRenderer={{
          // Render $$latex ... $$ blocks with KaTeX
          latex(node: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            try {
              const html = katex.renderToString(node.literal || "", {
                throwOnError: false,
                displayMode: true,
              });
              return [
                { type: "openTag", tagName: "div", outerNewLine: true, classNames: ["math-block"] },
                { type: "html", content: html },
                { type: "closeTag", tagName: "div", outerNewLine: true },
              ];
            } catch {
              return [{ type: "text", content: node.literal || "" }];
            }
          },
          // Intercept ```mermaid code blocks; let other code blocks fall through
          codeBlock(node: any, context: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            const info = (node.info || "").trim().toLowerCase();
            if (info === "mermaid") {
              return [
                { type: "openTag", tagName: "div", outerNewLine: true, classNames: ["mermaid"] },
                { type: "text", content: node.literal || "" },
                { type: "closeTag", tagName: "div", outerNewLine: true },
              ];
            }
            return context.origin();
          },
        }}
      />
    </div>
  );
}