// "use client";
import redis from "@/lib/redis";
import useSWR, { SWRResponse } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const fetcherRedis = async (key: string) => {
//   const result = await redis.get(key);
//   return result;
// };

export const GetDataWithSWR = (
  link: string = "https://jsonplaceholder.typicode.com/todos/1"
) => {
  const { data, error } = useSWR(link, fetcher);
  console.log("data_swr.ts", data, error);
  return { data, error, isLoading: !data && !error };
};

// export const GetDataWithSWRRedis = (key: string = "testKey") => {
//   const { data, error } = useSWR(key, fetcherRedis);
//   console.log("redis_swr.ts", data, error);
//   return { data, error, isLoading: !data && !error };
// };
