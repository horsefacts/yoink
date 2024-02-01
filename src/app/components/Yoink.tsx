"use client";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

interface Stats {
  flag?: string;
  yoinks?: string;
  leaderboard?: [string, number][];
}

interface Flag {
  flag?: string;
}

export default function Yoink() {
  const [flag, setFlag] = useState<Flag>({});
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    const getStats = async () => {
      let res = await fetch("/api/stats", { next: { revalidate: 1800 } });
      const _stats = await res.json();
      setStats(_stats);

      res = await fetch("/api/flag", { cache: "no-cache" });
      const _flag = await res.json();
      setFlag(_flag);
    };
    getStats();
  }, []);

  const { yoinks, leaderboard } = stats;
  const { flag: username } = flag;

  return (
    <div className="space-y-4">
      <h1 className="text-8xl font-bold">Yoink!</h1>
      {flag && <p className="text-2xl">{username} has the flag 🚩</p>}
      {yoinks && (
        <p className="text-2xl">The flag has been yoinked {yoinks} times.</p>
      )}
      <div className="mt-4">
        <p>
          Click{" "}
          <a
            className="text-red-500 underline"
            href="https://warpcast.com/horsefacts.eth/0x80dd1ea4"
            target="_blank"
          >
            here
          </a>{" "}
          to yoink on Warpcast.
        </p>
        <p>
          See the code on{" "}
          <a
            className="text-red-500 underline"
            href="https://github.com/horsefacts/yoink"
            target="_blank"
          >
            GitHub
          </a>
        </p>
      </div>
      {leaderboard && <Leaderboard leaderboard={leaderboard ?? []} />}
    </div>
  );
}
