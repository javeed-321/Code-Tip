import MarkdownEditor from "./features/markdown-editor/MarkdownEditor";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});
export default function Home() {
  return (
    <MarkdownEditor />
  );
}
