import { Metadata } from "next";
import Yoink from "@/app/components/Yoink";

const HOST = process.env["HOST"] ?? "https://yoink.terminally.online";

const postUrl = `${HOST}/api/start`;

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${HOST}/api/images/start?date=${Date.now()}`;
  return {
    title: "Yoink",
    description: "yoink!",
    openGraph: {
      title: "Yoink",
      images: [imageUrl],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": imageUrl,
      "fc:frame:post_url": postUrl,
      "fc:frame:button:1": "🏆 Leaderboard",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": HOST,
      "fc:frame:button:2": "🚩 Start",
      "hey:portal": "vLatest",
      "hey:portal:image": imageUrl,
      "hey:portal:post_url": postUrl,
      "hey:portal:button:1": "🏆 Leaderboard",
      "hey:portal:button:1:type": "link",
      "hey:portal:button:1:target": HOST,
      "hey:portal:button:2": "🚩 Start",
      "hey:portal:button:2:type": "submit",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col text-center lg:p-16">
      <Yoink />
    </main>
  );
}
