"use client";
import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";

interface Flag {
  yoinkedAt: number;
  holderId: string;
  holderName: string;
  holderPlatform: string;
}

export interface Stats {
  flag: Flag;
  yoinks: number;
  userYoinks: { [key: string]: number };
  userTimes: { [key: string]: number };
  users: { [key: string]: string };
}

export default function Yoink() {
  const [flag, setFlag] = useState<Flag>();
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    const getStats = async () => {
      //let res = await fetch("/api/stats", { next: { revalidate: 1800 } });
      //const _stats = await res.json();
      //setStats(_stats);

      //const res = await fetch("/api/flag", { next: { revalidate: 600 } });
      //const _flag = await res.json();
      //setFlag(_flag);
    };
    getStats();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-8xl font-bold">Yoink!</h1>
      {flag && (
        <p className="text-4xl">
          <span
            className={
              flag.holderPlatform === "farcaster"
                ? "text-fc-purple"
                : "text-lens-pink"
            }
          >
            {flag.holderName}
          </span>{" "}
          has the flag 🚩
        </p>
      )}
      {stats && (
        <p className="text-2xl">
          The flag has been yoinked {stats.yoinks} times.
        </p>
      )}
      <div className="mt-4 text-xl">
        <p>
          Yoink on{" "}
          <a
            className="text-fc-purple underline"
            href="https://warpcast.com/horsefacts.eth/0x2dacf32d"
            target="_blank"
          >
            Warpcast
          </a>{" "}
          or{" "}
          <a
            className="text-lens-pink underline"
            href="https://hey.xyz/posts/0x8cb1-0x05-DA-c4b6aaff"
            target="_blank"
          >
            Hey
          </a>
          .
        </p>
      </div>
      {stats && <Leaderboard data={stats} />}
      <div>
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
    </div>
  );
}
