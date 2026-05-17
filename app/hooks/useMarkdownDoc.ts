"use client";

import { useEffect, useState } from "react";
import { loadCurrentDoc, saveCurrentDoc } from "../lib/db";

const AUTOSAVE_DEBOUNCE_MS = 100;

export type SaveStatus = "saved" | "saving";

/**
 * Loads the saved document from IndexedDB on mount and autosaves it
 * (debounced) on every change. Falls back to `fallback` if there is
 * nothing stored yet.
 *
 * Returns: { text, setText, hydrated, saveStatus }
 *   - text:       current Markdown string
 *   - setText:    update the document
 *   - hydrated:   true once the initial load has completed
 *   - saveStatus: "saving" while a write is pending, "saved" otherwise
 */
export function useMarkdownDoc(fallback: string) {
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  // Load on first mount.
  useEffect(() => {
    let cancelled = false;
    loadCurrentDoc()
      .then((stored) => {
        if (cancelled) return;
        setText(stored ?? fallback);
        setHydrated(true);
      })
      .catch((err) => {
        console.error("Failed to load doc:", err);
        setText(fallback);
        setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, [fallback]);

  // Debounced autosave. Skips the very first render so we don't overwrite
  // a real saved doc with an empty string before hydration completes.
  useEffect(() => {
    if (!hydrated) return;
    setSaveStatus("saving");
    const id = setTimeout(() => {
      saveCurrentDoc(text)
        .then(() => setSaveStatus("saved"))
        .catch((err) => console.error("Autosave failed:", err));
    }, AUTOSAVE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [text, hydrated]);

  return { text, setText, hydrated, saveStatus };
}
