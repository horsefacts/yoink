import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const postUrl = `${process.env["HOST"]}/api/yoink`;
  const imageUrl = `${process.env["HOST"]}/api/images/flag?date=${Date.now()}`;

  const {
    untrustedData: { buttonIndex },
  } = await req.json();

  if (buttonIndex === 1) {
    return NextResponse.redirect("https://yoink.terminally.online", {
      status: 302,
    });
  }

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Yoink!" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:post_url" content="${postUrl}" />
          <meta name="fc:frame:button:1" content="Yoink!" />
          <meta name="hey:portal" content="vLatest" />
          <meta name="hey:portal:image" content="${imageUrl}" />
          <meta name="hey:portal:post_url" content="${postUrl}" />
          <meta name="hey:portal:button:1" content="Yoink!" />
          <meta name="hey:portal:button:1:type" content="submit" />
        </head>
        <body></body>
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
