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
  return (
    <div className="space-y-4">
        <h1 className="text-8xl font-bold">✨ Yoink Jubilee! 🚩</h1>
      <div className="mt-4 text-4xl">
        <p>All Yoinks Reset.</p>
        <p>All Debts Forgiven.</p>
        <p>The Game Is Changing...</p>
      </div>
      <div className="mt-4 text-xl">
        <p>
          Yoink{" "}
          <a
            className="text-red-500 underline"
            href="https://warpcast.com/horsefacts.eth/0x80dd1ea4"
            target="_blank"
          >
            here
          </a>{" "}
          on Warpcast.
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
    </div>
  );
}
