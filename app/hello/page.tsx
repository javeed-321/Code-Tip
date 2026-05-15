"use client";

import dynamic from "next/dynamic";

// Load the editor ONLY in the browser, not during SSR
// (Toast UI references `Element` at module load, which crashes Node prerender)
const ToastUIWithPreview = dynamic(() => import("./ToastUIWithPreview"), {
  ssr: false,
});

export default function Page() {
  return <ToastUIWithPreview />;
}