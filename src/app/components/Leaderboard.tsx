import React, { useMemo } from "react";
import { Stats } from "./Yoink";
import { formatCompact, formatHuman } from "@/lib/formatDuration";

export default function Leaderboard({ data }: { data: Stats }) {
  const { leaderboard, lens, farcaster } = useMemo(() => {
    const users = Object.keys(data.users).map((userId) => {
      const username = data.users[userId];
      const yoinks = data.userYoinks[userId] || 0;
      const times = data.userTimes[userId] || 0;
      const color = userId.startsWith("farcaster")
        ? "text-fc-purple"
        : userId.startsWith("lens")
          ? "text-lens-pink"
          : "text-black";
      const url = userId.startsWith("farcaster")
        ? `https://warpcast.com/${username}`
        : `https://hey.xyz/u/${username}`;
      return { userId, username, yoinks, times, color, url };
    });

    const leaderboard = users.sort((a, b) => b.times - a.times);
    const lens = data.userTimes["platform:lens"];
    const farcaster = data.userTimes["platform:farcaster"];
    return { leaderboard, lens, farcaster };
  }, [data]);

  return (
    <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-32">
      <h2 className="text-4xl font-semibold mb-4">
        Leaderboard (updates every 30 minutes)
      </h2>
      <div className="text-2xl">
        <p>
          <span className="text-fc-purple">Warpcast</span> has held the flag for{" "}
          {formatHuman(farcaster.toString())}
        </p>
        <p>
          <span className="text-lens-pink">Hey</span> has held the flag for{" "}
          {formatHuman(lens.toString())}
        </p>
      </div>
      <div className="overflow-x-auto text-xl mt-4">
        <table className="w-full text-center border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                Rank
              </th>
              <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                User
              </th>
              <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                Time
              </th>
              <th className="border border-gray-300 px-2 py-2 text-gray-600 sm:px-4 sm:py-2 sm:text-base">
                Yoinks
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(
              ({ username, times, yoinks, color, url }, index) => (
                <tr key={username}>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2">
                    {index + 1}
                  </td>
                  <td
                    className={`border border-gray-300 px-2 py-2 sm:px-4 sm:py-2 ${color}`}
                  >
                    <a href={url} target="_blank" className="hover:underline">
                      {username}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2">
                    {formatCompact(times)}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 sm:px-4 sm:py-2">
                    {yoinks}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
