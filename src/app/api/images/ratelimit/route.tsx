import { ImageResponse } from "next/og";
import Card from "@/app/components/Card";

export async function GET() {
  return new ImageResponse(
    (
      <Card>
        <h1 style={{ fontSize: 96 }}>Slow Down!</h1>
        <div>You&apos;re yoinking too fast.</div>
        <div>You can yoink the flag once a minute.</div>
      </Card>
    ),
    {
      width: 800,
      height: 420,
    },
  );
}
