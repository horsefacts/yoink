"use client";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

interface Stats {
  flag?: string;
  yoinks?: string;
  leaderboard?: [string, number][];
}

export default function Yoink() {
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    const getFlag = async () => {
      const res = await fetch("/api/stats", { cache: "no-store" });
      const _stats = await res.json();
      setStats(_stats);
    };
    getFlag();
  }, []);

  const { flag, yoinks, leaderboard } = stats;

  return (
    <div className="space-y-4">
      <h1 className="text-8xl font-bold">Yoink!</h1>
      {flag && <p className="text-2xl">{flag} has the flag 🚩</p>}
      {yoinks && (
        <p className="text-2xl">The flag has been yoinked {yoinks} times.</p>
      )}
     {leaderboard && <Leaderboard leaderboard={leaderboard ?? []} />}
    </div>
  );
}
