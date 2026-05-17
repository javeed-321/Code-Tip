"use client";
import { useEffect, useState } from "react";

export default function CleanupDemo() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 20,margin: 20, border: "1px solid #ccc" }}>
      <button onClick={() => setCount(c => c + 1)}>
        increment count: {count}
      </button>
      <button onClick={() => setShow(s => !s)}>
        {show ? "hide" : "show"} child
      </button>

      {show && <Child count={count} />}
    </div>
  );
}

function Child({ count }: { count: number }) {
  useEffect(() => {
    console.log(`✅ effect ran with count=${count}`);

    return () => {
      console.log(`🧹 cleanup ran for count=${count}`);
    };
  }, [count]);

  return <div>child sees count = {count}</div>;
}
