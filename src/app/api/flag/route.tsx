import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export const revalidate = 600;

export async function GET() {
  const flag = await redis.hgetall("flag");
  return NextResponse.json(flag);
}
