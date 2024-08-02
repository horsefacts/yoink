import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export const revalidate = 86400;

export async function GET() {
  const flag = await redis.hgetall("flag");
  const { holderId, yoinkedAt } = flag;
  const yoinks = await redis.get("yoinks") ?? "0";
  const userYoinksArray = await redis.zrevrange(
    "userYoinks",
    0,
    -1,
    "WITHSCORES"
  );
  const userTimesArray = await redis.zrange("userTimes", 0, -1, "WITHSCORES");
  const users = await redis.hgetall("users");


  const arrayToObject = (arr: string[]) => {
    let obj: Record<string, number> = {};
    for (let i = 0; i < arr.length; i += 2) {
      obj[arr[i]] = parseInt(arr[i + 1]);
    }
    return obj;
  };

  const userYoinks = arrayToObject(userYoinksArray);
  const userTimes = arrayToObject(userTimesArray);

    if (holderId && yoinkedAt) {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - parseInt(yoinkedAt, 10)) / 1000);
        userTimes[holderId] = (userTimes[holderId] || 0) + elapsedTime;
        const [platform] = holderId.split(":");
        userTimes[`platform:${platform}`] = (userTimes[`platform:${platform}`] || 0) + elapsedTime;
    }

  return NextResponse.json({ flag: {...flag, yoinkedAt: parseInt(yoinkedAt) }, yoinks: parseInt(yoinks), userYoinks, userTimes, users });
}
