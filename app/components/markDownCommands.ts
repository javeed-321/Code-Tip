import type { EditorView } from "@codemirror/view";

/**
 * Toggle a markdown wrap delimiter (e.g. "**", "*", "==", "~~", "`")
 * around the current CodeMirror selection.
 *
 * Behaviour:
 *  - No selection between matching delims  ->  remove them
 *  - No selection elsewhere                ->  insert empty wrappers, cursor between
 *  - Selected text already wrapped inside  ->  unwrap
 *  - Selected text with delims just outside ->  unwrap (only if not part of a longer run)
 *  - Otherwise                              ->  wrap
 */


export function toggleWrap(view: EditorView, delim: string) {
  const { state } = view;
  const { from, to } = state.selection.main;
  const d = delim.length;

  // ---------- Empty selection ----------
  if (from === to) {
    const before = state.sliceDoc(Math.max(0, from - d), from);
    const after = state.sliceDoc(to, Math.min(state.doc.length, to + d));

    if (before === delim && after === delim) {
      // Cursor sits between matching delims -> remove them
      view.dispatch({
        changes: { from: from - d, to: to + d, insert: "" },
        selection: { anchor: from - d },
      });
    } else {
      // Insert empty wrappers, place cursor in the middle
      view.dispatch({
        changes: { from, to, insert: delim + delim },
        selection: { anchor: from + d },
      });
    }
    view.focus();
    return;
  }

  // ---------- Selection exists ----------
  const selected = state.sliceDoc(from, to);

  // (a) Selection itself is wrapped -> strip inner delims
  if (
    selected.length >= d * 2 &&
    selected.startsWith(delim) &&
    selected.endsWith(delim)
  ) {
    const inner = selected.slice(d, selected.length - d);
    view.dispatch({
      changes: { from, to, insert: inner },
      selection: { anchor: from, head: from + inner.length },
    });
    view.focus();
    return;
  }

  // (b) Delims sit just outside the selection -> unwrap
  const before = state.sliceDoc(Math.max(0, from - d), from);
  const after = state.sliceDoc(to, Math.min(state.doc.length, to + d));

  // Guard: make sure the delim isn't part of a longer run
  // (so clicking italic inside **hello** wraps to ***hello*** instead of stripping)
  const charBefore = state.sliceDoc(Math.max(0, from - d - 1), from - d);
  const charAfter = state.sliceDoc(to + d, Math.min(state.doc.length, to + d + 1));
  const isStandalone = charBefore !== delim[0] && charAfter !== delim[0];

  if (before === delim && after === delim && isStandalone) {
    view.dispatch({
      changes: { from: from - d, to: to + d, insert: selected },
      selection: { anchor: from - d, head: from - d + selected.length },
    });
    view.focus();
    return;
  }

  // (c) Default -> wrap
  view.dispatch({
    changes: { from, to, insert: delim + selected + delim },
    selection: { anchor: from + d, head: from + d + selected.length },
  });
  view.focus();
}