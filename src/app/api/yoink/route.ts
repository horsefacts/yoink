import { NextRequest, NextResponse } from "next/server";
import {
  getSSLHubRpcClient,
  Message,
  UserDataType,
} from "@farcaster/hub-nodejs";
import { yoinkFlag } from "@/lib/yoinkFlag";
import lens from "@/lib/lens";

const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

const HOST = process.env["HOST"] || "https://yoink.terminally.online";

export async function POST(req: NextRequest) {
  const {
    untrustedData: { profileId },
    trustedData: { messageBytes, url: lensUrl },
  } = await req.json();

  const platform = profileId ? "lens" : "farcaster";

  if (platform === "farcaster") {
    const frameMessage = Message.decode(Buffer.from(messageBytes, "hex"));
    const validateResult = await hubClient.validateMessage(frameMessage);
    if (validateResult.isOk() && validateResult.value.valid) {
      const validMessage = validateResult.value.message;
      const fid = validMessage?.data?.fid ?? 0;

      let urlBuffer = validMessage?.data?.frameActionBody?.url ?? [];
      const urlString = Buffer.from(urlBuffer).toString("utf-8");
      if (!urlString.startsWith(HOST)) {
        return new NextResponse("Unauthorized", { status: 401 });
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

        try {
          await yoinkFlag(fid.toString(), name, platform);
          const id = `${platform}:${fid}`;
          const imageUrl = `${HOST}/api/images/yoink?date=${Date.now()}&id=${id}`;
          return new NextResponse(
            `<!DOCTYPE html>
             <html>
               <head>
                 <title>Yoinked!</title>
                 <meta property="og:title" content="Yoinked!" />
                 <meta property="og:image" content="${imageUrl}" />
                 <meta name="fc:frame" content="vNext" />
                 <meta name="fc:frame:image" content="${imageUrl}" />
                 <meta name="fc:frame:button:1" content="🏆 Leaderboard" />
                 <meta name="fc:frame:button:1:action" content="link" />
                 <meta name="fc:frame:button:1:target" content="${HOST}" />
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
        } catch (e: any) {
          if (e?.message === "Rate limit exceeded.") {
            const imageUrl = `${HOST}/api/images/ratelimit`;
            return new NextResponse(
              `<!DOCTYPE html>
               <html>
                 <head>
                   <title>Slow down!</title>
                   <meta property="og:title" content="Yoinked!" />
                   <meta property="og:image" content="${imageUrl}" />
                   <meta name="fc:frame" content="vNext" />
                   <meta name="fc:frame:image" content="${imageUrl}" />
                   <meta name="fc:frame:button:1" content="🏆 Leaderboard" />
                   <meta name="fc:frame:button:1:action" content="link" />
                   <meta name="fc:frame:button:1:target" content="${HOST}" />
                 </head>
                 <body>Slow down!</body>
               </html>`,
              {
                status: 200,
                headers: {
                  "Content-Type": "text/html",
                },
              },
            );
          } else {
            return new NextResponse("Internal server error", { status: 500 });
          }
        }
      } else {
        return new NextResponse("Internal server error", { status: 500 });
      }
    } else {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } else {
    if (!lensUrl.startsWith(HOST)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await lens.profile.fetch({
      forProfileId: profileId,
    });
    if (res?.handle) {
      const {
        handle: { localName },
      } = res;
      try {
        await yoinkFlag(profileId, localName, platform);
        const id = `${platform}:${profileId}`;
        const postUrl = `${HOST}/api/start`;
        const imageUrl = `${HOST}/api/images/yoink?date=${Date.now()}&id=${id}`;
        return new NextResponse(
          `<!DOCTYPE html>
             <html>
               <head>
                 <title>Yoinked!</title>
                 <meta property="og:title" content="Yoinked!" />
                 <meta property="og:image" content="${imageUrl}" />
                 <meta name="hey:portal" content="vLatest" />
                 <meta name="hey:portal:image" content="${imageUrl}" />
                 <meta name="hey:portal:post_url" content="${postUrl}" />
                 <meta name="hey:portal:button:1" content="🏆 Leaderboard" />
                 <meta name="hey:portal:button:1:type" content="link" />
                 <meta name="hey:portal:button:1:target" content="${HOST}" />
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
      } catch (e: any) {
        if (e?.message === "Rate limit exceeded.") {
          const postUrl = `${HOST}/api/start`;
          const imageUrl = `${HOST}/api/images/ratelimit`;
          return new NextResponse(
            `<!DOCTYPE html>
               <html>
                 <head>
                   <title>Slow down!</title>
                   <meta property="og:title" content="Yoinked!" />
                   <meta property="og:image" content="${imageUrl}" />
                   <meta name="hey:portal" content="vLatest" />
                   <meta name="hey:portal:image" content="${imageUrl}" />
                   <meta name="hey:portal:post_url" content="${postUrl}" />
                   <meta name="hey:portal:button:1" content="🏆 Leaderboard" />
                   <meta name="hey:portal:button:1:type" content="link" />
                   <meta name="hey:portal:button:1:target" content="${HOST}" />
                 </head>
                 <body>Slow down!</body>
               </html>`,
            {
              status: 200,
              headers: {
                "Content-Type": "text/html",
              },
            },
          );
        } else {
          return new NextResponse("Internal server error", { status: 500 });
        }
      }
    }
  }
}

export const GET = POST;
