"use client";

import { useEffect } from "react";

// Disables spellcheck and autocorrect on Toast UI's ProseMirror surfaces.
// Re-runs whenever `text` changes because Toast UI may rebuild the DOM.
export function useDisableSpellcheck(text: string) {
  useEffect(() => {
    const editors = document.querySelectorAll<HTMLElement>(
      ".toastui-editor .ProseMirror"
    );
    editors.forEach((el) => {
      el.setAttribute("spellcheck", "false");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocomplete", "off");
    });
  }, [text]);
}
