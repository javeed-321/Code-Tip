"use client"

import { useEffect, useMemo, useState } from "react";

export default function Memo()
{
    const [value, setValue]=useState(0);
    const [input,setInput]=useState("");
    function expensiveTask(num:number)
    {
        console.log("Before Expensive Task")
        for(let i=0; i<1000000000; i++){}
        console.log("After Expensive Task")
        return num*2;
    }
    const result = useMemo(() => expensiveTask(Number(input)),[input])

    // const task=expensiveTask(4);
    useEffect(()=>{
        setValue(value+1);

    },[])
// GOOD — spreads all native <input> props through; fully substitutable

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Input({ label, id, ...inputProps }: InputProps) {
  const inputId =
    id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="field">
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        {...inputProps}
      />
    </div>
  );
}
// Anywhere a plain <input> works, this works too:

    return <>
        <div className="" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh"}}>
            {/* <button onClick={()=> setValue(value+1)}>Increment</button>
            <p>{value}</p>
            <input 
            type="number"
            value={input}
            onChange={(e)=> setInput((e.target.value))}
            placeholder="Enter a number"
            autoFocus
/>
            <p>{result}</p> */}
            <Input label="Email" type="email" placeholder="you@example.com" maxLength={100} />
        <Input type="search" aria-label="Search products" autoFocus />
            </div>

    </>
}

// https://www.youtube.com/watch?v=MSq_DCRxOxw