import { Redis } from "ioredis";

// When project runs in Bunnyshell, the env variables are loaded from the host environment process.env.VARIABLE_NAME
const redis = new Redis({
  port: parseInt(process.env.REDIS_SERVICE_PORT || "6379"),
  host: process.env.redis || "localhost",
});

export const scardRedis = async (setName: string) => {
  try {
    const counter = await redis.scard(setName);
    return counter;
  } catch (error) {
    console.error(`Error getting counter from Redis: ${error}`);
    return undefined;
  }
};

export const saddRedis = async (setName: string, value: any) => {
  try {
    await redis.sadd(setName, value);
    // redis.quit();
    return true;
  } catch (error) {
    console.error(`Error writing sadd to Redis: ${error}`);
    return false;
  }
};

export const getRedis = async (key: string) => {
  try {
    const start = Date.now();
    const data = await redis.get(key);
    const end = Date.now();
    const redisFetchTime = end - start;
    // redis.quit();
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
    // redis.quit();
    return true;
  } catch (error) {
    console.error(`Error writing set to Redis: ${error}`);
    return false;
  }
};

export default redis;
