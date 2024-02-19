import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const flag = await redis.hgetall("flag");
  return NextResponse.json(flag);
}
