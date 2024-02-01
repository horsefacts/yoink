import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET() {
  const flag = (await kv.get("flag")) as string;
  const yoinks = (await kv.get("yoinks")) as string;

  let cursor = 0;
  let userKeys = [];

  do {
    const res = await kv.scan(cursor, { match: "yoinks:*", count: 2500 });
    cursor = res[0];
    userKeys.push(...res[1]);
  } while (cursor !== 0);
  const yoinkCounts = await kv.mget(userKeys);
  const leaderboard = userKeys
    .map((key, i) => [key.split(":")[1], yoinkCounts[i]] as [string, number])
    .sort((a, b) => b[1] - a[1]);
  return NextResponse.json({ flag, yoinks, leaderboard });
}
