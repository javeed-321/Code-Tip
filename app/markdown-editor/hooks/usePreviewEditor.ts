"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { default as StarterKit } from "@tiptap/starter-kit";
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
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

// Tiptap editor used as the read-only HTML preview.
export function usePreviewEditor() {
  return useEditor({
    extensions: [
        Markdown,
  StarterKit,
  Details, DetailsSummary, DetailsContent,
  TaskList, TaskItem.configure({ nested: true }),
  Youtube.configure({ inline: false, width: 480, height: 320 }),
  Image,
  TableKit,
  Highlight,
  Mention,
  Mathematics,
  CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" })
    ],
    content: "",
    contentType: "markdown",
    editable: false,
    immediatelyRender: false,
  });
}
