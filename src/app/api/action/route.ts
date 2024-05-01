import { NextResponse } from "next/server";

const HOST = process.env["HOST"] || "https://yoink.terminally.online";

export async function GET() {
  return NextResponse.json({
    name: "Yoink On Demand",
    icon: "bookmark",
    description: "Yoink anywhere, at any time.",
    action: {
        type: 'post',
        postUrl: `${HOST}/api/action`
    }
  });
}
