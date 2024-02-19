import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const imageUrl = `${process.env["HOST"]}/api/images/start?date=${Date.now()}`;


  const {
    untrustedData: { buttonIndex },
  } = await req.json();

  if (buttonIndex === 1) {
    return NextResponse.redirect('https://yoink.terminally.online', {status: 302});
  }

  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Yoinked!</title>
          <meta property="og:title" content="Yoink!" />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="${imageUrl}" />
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
