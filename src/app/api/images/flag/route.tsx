import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";
import redis from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  const { holderName, holderPlatform } = await redis.hgetall("flag");
  const yoinks = await redis.get("yoinks");

  const color = holderPlatform === "farcaster" ? "#8a63d2" : "#fb3a5d";

  return new ImageResponse(
    (
      <Card>
        <h1
          style={{
            color,
            fontSize: 72,
          }}
        >
          {holderName}
        </h1>
        <div style={{ display: "flex" }}>
          Has the flag{" "}
          <img
            width="32"
            height="32"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/1f6a9.png"
            alt="flag"
          />
        </div>
        <div style={{ display: "flex", marginTop: "12" }}>
          The flag has been yoinked {yoinks} times.
        </div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    },
  );
}
