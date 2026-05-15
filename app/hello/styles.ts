export const styles=`
/* ----------------------------------------------------------------------------
   4. Toast UI toolbar — StackEdit-style dark bar with flat white icons
   ---------------------------------------------------------------------------- */
.md-demo .toastui-editor-toolbar,
.md-demo .toastui-editor-defaultUI-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 14px;                    /* space BETWEEN groups */
  height: 48px;
  padding: 0 16px;
  background: linear-gradient(to bottom, #2f2f33, #1e1e22);
  border: none;
  box-shadow: none;             /* no line below the toolbar */
}

/* Each cluster (bold/italic/strike, lists, etc.) */
.md-demo .toastui-editor-toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;                     /* tight spacing WITHIN a group */
  padding: 0;
  margin: 0;
}

/* The icon buttons — flat, white, sharp */
.md-demo .toastui-editor-toolbar-icons {
  width: 32px;
  height: 32px;
  padding: 6px;
  margin: 0;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  /* Convert Toast UI's dark icons into pure white silhouettes */
  filter: brightness(0) invert(1);
  opacity: 0.85;
  transition: opacity 0.15s ease, background-color 0.15s ease;
}

.md-demo .toastui-editor-toolbar-icons:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.10);
}

.md-demo .toastui-editor-toolbar-icons:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* StackEdit uses spacing instead of vertical divider bars */
.md-demo .toastui-editor-toolbar-divider {
  display: none;
}

/* Hide buttons you don't expose to users */
.md-demo .toastui-editor-toolbar-icons.hrline,
.md-demo .toastui-editor-toolbar-icons.indent,
.md-demo .toastui-editor-toolbar-icons.outdent {
  display: none;
}

/* The heading button needs to match the others (Toast UI sizes it bigger by default) */
.md-demo .toastui-editor-toolbar-icons.heading,
.md-demo .toastui-editor-toolbar-icons.heading:hover {
  width: 32px !important;
  height: 32px !important;
  padding: 6px !important;
  margin: 0 !important;
  background-size: 18px 18px !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}

/* Active state — slightly highlighted (StackEdit doesn't really show one,
   but useful for "cursor is in bold text" feedback) */
.md-demo .toastui-editor-toolbar-icons.active,
.md-demo .toastui-editor-toolbar-icons.checked,
.md-demo .toastui-editor-toolbar-icons[aria-pressed="true"] {
  background-color: rgba(255, 255, 255, 0.15) !important;
  opacity: 1 !important;
  filter: brightness(0) invert(1) !important;
}
`