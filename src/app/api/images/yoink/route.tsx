import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import redis from "@/lib/redis";
import Card from "@/app/components/Card";
import { formatHuman } from "@/lib/formatDuration";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") ?? "";
  const [platform] = id.split(":");
  const yoinks = await redis.zscore("userYoinks", id);
  const time = await redis.zscore("userTimes", id);

  const color = platform === "farcaster" ? "#8a63d2" : "#fb3a5d";

  return new ImageResponse(
    (
      <Card>
        <h1 style={{ color, fontSize: 96 }}>Yoink!</h1>
        <div style={{ display: "flex" }}>
          You have the flag{" "}
          <img
            width="32"
            height="32"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/1f6a9.png"
            alt="flag"
          />
        </div>
        <div style={{ display: "flex", marginTop: 12 }}>{yoinks} yoinks</div>
        <div style={{ display: "flex", marginTop: 12 }}>
          Held for {formatHuman(time)}
        </div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    },
  );
}
