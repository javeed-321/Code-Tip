export const mdContent = `# Welcome to the Markdown Demo

This demo showcases **bidirectional** markdown support in Tiptap with extended features.

## Features

- **Bold text** and *italic text*
- \`inline code\` and code blocks
- [Links](https://tiptap.dev)
- Lists and more!

## Task Lists

- [ ] Incomplete task
  - [ ] Nested incomplete task
  - [x] Completed task
- [x] Completed task

### Code

\`\`\`javascript
import { Editor } from '@tiptap/core'
import { StarterKit } from '@tiptap/starter-kit'

const editor = new Editor({
  extensions: [StarterKit],
  content: '<p>Hello World!</p>',
})
\`\`\`

### Details

:::details

:::detailsSummary
What features does Tiptap offer?
:::

:::detailsContent

- Rich Text Editing
- Markdown Support
- Custom Extensions

:::

:::

### YouTube Videos

:::youtube {src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" start="0" width="400" height="300"} :::

### Images

![Random Image](https://unsplash.it/400/600 "Tiptap Editor")

### Mentions

Hey, [@ id="Madonna"], have you seen [@ id="Tom Cruise"]?

### Mathematics

Inline math: $E = mc^2$ and $\\pi r^2$

Block math:

$$
40*5/38
$$

### Custom React Component

:::react {content="This is a custom React node view with fenced syntax!"}

Isn't this great?

:::
`;