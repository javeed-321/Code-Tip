import {
  EditorContent, useEditor,
  StarterKit, Markdown, Details, DetailsContent, DetailsSummary,
  Highlight, Image, TaskItem, TaskList, Mathematics, Mention,
  TableKit, Twitch, Youtube, CodeBlockLowlight,
  common, createLowlight,
} from "../imports/tiptap-imports";
const lowlight = createLowlight(common); // ~35 common languages

export  const editor = useEditor({
    extensions: [
      Markdown,
      StarterKit,
      Details, DetailsSummary, DetailsContent,
      TaskList, TaskItem.configure({ nested: true }),
      Youtube.configure({ inline: false, width: 480, height: 320 }),
      // Twitch.configure({
      //   inline: false,
      //   width: 480,
      //   height: 320,
      //   parent: typeof window !== "undefined" ? window.location.hostname : "localhost",
      // }),
      Image,
      TableKit,
      Highlight,
      Mention,
      Mathematics,
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "plaintext" }),
    ],
    content: "",
    contentType: "markdown",
    editable: false,
    immediatelyRender: false,
  });