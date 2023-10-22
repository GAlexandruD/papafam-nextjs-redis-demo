import { Redis } from "ioredis";

// TODO: Host should be in loaded from the env file. For remote developing is 'redis'
const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

export const getRedis = async (key: string) => {
  try {
    const start = Date.now();
    const data = await redis.get(key);
    const end = Date.now();
    const redisFetchTime = end - start;
    return { data, redisFetchTime };
  } catch (error) {
    console.error(`Error getting data from Redis: ${error}`);
    return undefined;
  }
};

export const setRedis = async (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    await redis.set(key, data);
    return true;
  } catch (error) {
    console.error(`Error writing data to Redis: ${error}`);
    return false;
  }
};

export default redis;
