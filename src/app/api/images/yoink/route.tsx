import { NextResponse } from "next/server";
import satori from "satori";
import sharp from "sharp";
import { join } from "path";
import * as fs from "fs";

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);

export async function GET() {
  const svg = await satori(
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: 50,
        lineHeight: 1.2,
        fontSize: 24,
        color: "black",
      }}
    >
      <h1>Yoink!</h1>
      <div style={{ display: "flex" }}>
        You have the flag{" "}
        <img
          width="32"
          height="32"
          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/1f6a9.png"
        />
      </div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: "Inter",
          data: interReg,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );

  const img = await sharp(Buffer.from(svg))
    .resize(1200)
    .toFormat("png")
    .toBuffer();
  return new NextResponse(img, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "max-age=10",
    },
  });
}
