import { Redis } from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "redis",
});

export const getRedis = async (key: string) => {
  try {
    const data = await redis.get(key);
    return data ? data : undefined;
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

// export const setRedis = async (key: string, value: any) => {
//   redis.set(key, "testValue", (err, result) => {
//     if (err) {
//       console.error(`Error writing data to Redis:, ${err}`);
//     } else {
//       console.log(`Successfully wrote data to Redis:, ${result}`);
//     }
//   });
// };

export default redis;
