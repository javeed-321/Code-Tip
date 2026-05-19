// Helper for running any Toast UI command from a custom button.
// Focuses the editor first so the command applies at the cursor.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeExec(tuiRef: { current: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (cmd: string, payload?: Record<string, any>) => {
    const inst = tuiRef.current?.getInstance();
    if (!inst) return;
    inst.focus();
    inst.exec(cmd, payload);
  };
}

