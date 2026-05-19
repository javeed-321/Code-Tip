import { Lato } from "next/font/google";
import MarkdownEditor from "./markdown-editor/MarkdownEditor";

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
