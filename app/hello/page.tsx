"use client";

import dynamic from "next/dynamic";
import ToastUIWithPreview from "./ToastUIWithPreview";

// Load the editor ONLY in the browser, not during SSR


export default function Page() {
  return <ToastUIWithPreview />;
}