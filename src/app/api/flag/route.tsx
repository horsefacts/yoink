import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  const flag = (await kv.get("flag")) as string;
  return NextResponse.json({ flag });
}
