import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import {
  getSSLHubRpcClient,
  Message,
  UserDataType,
} from "@farcaster/hub-nodejs";

const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

export async function POST(req: NextRequest) {
  const {
    trustedData: { messageBytes },
  } = await req.json();
  const frameMessage = Message.decode(Buffer.from(messageBytes, "hex"));
  const validateResult = await hubClient.validateMessage(frameMessage);
  if (validateResult.isOk() && validateResult.value.valid) {
    const validMessage = validateResult.value.message;
    const fid = validMessage?.data?.fid ?? 0;

    let urlBuffer = validMessage?.data?.frameActionBody?.url ?? [];
    const urlString = Buffer.from(urlBuffer).toString("utf-8");
    if (!urlString.startsWith(process.env["HOST"] ?? "")) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const userDataResult = await hubClient.getUserDataByFid({ fid });
    if (userDataResult.isOk()) {
      const userData = userDataResult.value;
      let name = `FID #${fid}`;
      for (const message of userData.messages) {
        if (message?.data?.userDataBody?.type === UserDataType.USERNAME) {
          name = message.data.userDataBody.value;
          break;
        }
      }
      const flag = (await kv.get("flag")) as string;
      const key = `yoinks:${name}`;
      if (name.toString() !== flag.toString()) {
        await kv.set("flag", name);
        await kv.decr("yoinks");
        await kv.decr(key);
      }

      const imageUrl = `${process.env["HOST"]}/api/images/yoink?date=${Date.now()}&name=${name}`;
      return new NextResponse(
        `<!DOCTYPE html>
      <html>
        <head>
          <title>Yoinked!</title>
          <meta property="og:title" content="Yoinked!" />
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
        }
      );
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const GET = POST;
