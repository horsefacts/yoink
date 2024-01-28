import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const postUrl = `${process.env["HOST"]}/api/yoink`;
  const imageUrl = `${process.env["HOST"]}/api/images/flag?date=${Date.now()}`;

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Yoinked!</title>
          <meta property="og:title" content="Yoink!" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:button:1" content="Yoink!" />
        </head>
        <body>Yoink</body>
      </html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}

export const GET = POST;
