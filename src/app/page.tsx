import { Metadata } from "next";
import Yoink from "@/app/components/Yoink";

const postUrl = `${process.env["HOST"]}/api/start`;

export async function generateMetadata(): Promise<Metadata> {
  const imageUrl = `${process.env["HOST"]}/api/images/start?date=${Date.now()}`;
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
      "fc:frame:button:1": "Start",
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col text-center p-16">
      <Yoink />
      <div className="mt-4">
        <p>Click <a className="text-red-500 underline" href="https://warpcast.com/horsefacts.eth/0x80dd1ea4" target="_blank">here</a> to yoink on Warpcast.</p>
        <p>See the code on <a className="text-red-500 underline" href="https://github.com/horsefacts/yoink" target="_blank">GitHub</a></p>
      </div>
    </main>
  );
}
