import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";

export async function GET() {
  return new ImageResponse(
    (
      <Card>
        <h1 style={{ color: "#dc2626", fontSize: 96 }}>Yoink!</h1>
        <div style={{ display: "flex" }}>
          Click to yoink the flag{" "}
          <img
            width="32"
            height="32"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/1f6a9.png"
            alt="flag"
          />
        </div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    },
  );
}
