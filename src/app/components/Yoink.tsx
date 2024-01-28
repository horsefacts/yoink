"use client";
import { useEffect, useState } from "react";

export default function Yoink() {
  const [flag, setFlag] = useState();

  useEffect(() => {
    const getFlag = async () => {
      const res = await fetch("/api/flag", { cache: "no-store" });
      const { flag } = await res.json();
      setFlag(flag);
    };
    getFlag();
  }, []);

  return (
    <div>
      <h1 className="text-8xl font-bold">Yoink!</h1>
      {flag && <p className="text-2xl">{flag} has the flag 🚩</p>}
    </div>
  );
}
