import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";

export async function GET() {
  return new ImageResponse(
    (
      <Card>
        <h1 style={{ color: "#dc2626", fontSize: 96, margin: 0 }}>Yoink!</h1>
        <h1 style={{ fontSize: 64, margin: 0 }}>On Demand</h1>
        <div style={{ display: "flex" }}>
          Yoink anywhere, at any time.{" "}
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
