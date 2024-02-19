import redis from "./redis";

export async function yoinkFlag(id: string, name: string, platform: string) {
  const fullId = `${platform}:${id}`;
  const currentTime = Date.now();
  const flagKey = "flag";
  const totalYoinksKey = "yoinks";
  const userYoinksKey = "userYoinks";
  const userTimesKey = "userTimes";
  const usersKey = "users";
  const rateLimitKey = `rateLimits`;
  const platformKey = `platform:${platform}`;

  const { holderId, holderPlatform, yoinkedAt } =
    (await redis.hgetall(flagKey)) ?? {};

  if (holderId === fullId) {
    return;
  }

  const lastYoink = await redis.hget(rateLimitKey, fullId);
  if (lastYoink && currentTime - parseInt(lastYoink, 10) < 600000) {
    throw new Error("Rate limit exceeded.");
  }

  if (holderId && yoinkedAt) {
    const yoinkedAtTime = parseInt(yoinkedAt, 10);
    const elapsedTime = (currentTime - yoinkedAtTime) / 1000;

    await redis.zincrby(userTimesKey, elapsedTime, holderId);
    if (holderPlatform) {
      const platformKey = `platform:${holderPlatform}`;
      await redis.zincrby(userTimesKey, elapsedTime, platformKey);
    }
  }

  await redis.hset(usersKey, fullId, name);
  await redis.hmset(flagKey, {
    holderId: fullId,
    holderName: name,
    holderPlatform: platform,
    yoinkedAt: currentTime,
  });
  await redis.incr(totalYoinksKey);
  await redis.zincrby(userYoinksKey, 1, fullId);
  await redis.zincrby(userYoinksKey, 1, platformKey);
  await redis.hset(rateLimitKey, fullId, currentTime.toString());
  await redis.expire(rateLimitKey, 600);
}
