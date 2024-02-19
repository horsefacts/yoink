import { ImageResponse } from "next/og";
import { join } from "path";
import * as fs from "fs";

const interRegPath = join(process.cwd(), "public/Inter-Regular.ttf");
let interReg = fs.readFileSync(interRegPath);

const interBoldPath = join(process.cwd(), "public/Inter-Bold.ttf");
let interBold = fs.readFileSync(interBoldPath);

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        fontSize: 24,
      }}
    >
      <h1>
        <img
          width="48"
          height="48"
          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/2728.png"
          style={{ fontWeight: '800', verticalAlign: 'middle', marginRight: '12px' }}
        />
        Yoink Jubilee!
        <img
          width="48"
          height="48"
          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.0.3/72x72/1f6a9.png"
          style={{ verticalAlign: 'middle', marginLeft: '12px' }}
        />
      </h1>
      <div>All Yoinks Reset.</div>
      <div>All Debts Forgiven.</div>
      <div style={{ display: 'flex' }}>
        The Game Is Changing...
      </div>
    </div>,
    {
      width: 600,
      height: 315,
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
    }
  );
}
