"use client";
import { useState, useTransition } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [tableNumber, setTableNumber] = useState(1);

  const [isPending, startTransition] = useTransition();

  function handleChange(e:any) {
    const value = e.target.value;

    // Update input instantly
    setText(value);

    // Update heavy table in background
    startTransition(() => {
      setTableNumber(Number(value));
    });
  }

  return (
    <div>
      <h2>Multiplication Table</h2>

      <input
        type="number"
        placeholder="Enter a number"
        value={text}
        onChange={handleChange}
      />

      {isPending && <p>Loading table...</p>}

      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            {tableNumber} × {i + 1} = {tableNumber * (i + 1)}
          </p>
        ))}
      </div>
    </div>
  );
}