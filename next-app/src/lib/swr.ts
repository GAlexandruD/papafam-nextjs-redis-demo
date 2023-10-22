// "use client";
import redis from "@/lib/redis";
import { Console } from "console";
import useSWR, { SWRResponse } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const GetDataWithSWR = (
  link: string = "https://jsonplaceholder.typicode.com/todos/1"
) => {
  const { data, error } = useSWR(link, fetcher);

  console.log("data in swr.ts is: ", data);
  return { data, error, isLoading: !data && !error };
};

const timedFetcher = async (url: string) => {
  const startTime = Date.now();
  const response = await fetch(url);
  const data = await response.json();
  const endTime = Date.now();
  const fetchTime = endTime - startTime;
  return { fetchTime, data };
};

export const GetTimedDataWithSWR = (
  link: string = "https://jsonplaceholder.typicode.com/todos/1"
) => {
  const { data: timedData, error } = useSWR(link, timedFetcher);
  console.log("MMMMMMMMMMMMMMMMMMM: ", { timedData }, error);
  return { timedData, error, isLoading: !timedData && !error };
};

// export const GetTimedDataWithSWR = (
//   link: string = "https://jsonplaceholder.typicode.com/todos/1"
// ) => {
//   const { data: timedData, error: timedError } = useSWR(link, timedFetcher);
//   console.log("timedData_swr.ts", timedData, timedError);

//   // The returned data:data  will be an object containing objects with the data and the time it took to get the data from the server
//   return { timedData, timedError, isLoading: !timedData && !timedError };
// };

// This function does not run as intended, because it measure the time it takes to run the function, not the time it takes to get the data from the server (because of the way swr is working)
// export const TimedGetDataWithSWR = (
//   link: string = "https://jsonplaceholder.typicode.com/todos/9"
// ) => {
//   const startTime = new Date().getTime();
//   const start = performance.now();
//   console.log("startTime", startTime);
//   // wait 3 seconds
//   setTimeout(() => console.log("3 seconds have passed"), 3000);
//   const { data, error, isValidating } = useSWR(link, fetcher);
//   const endTime = new Date().getTime();
//   const end = performance.now();
//   console.log("endTime", endTime);
//   const time2 = endTime - startTime;
//   const time = end - start;
//   // console.log("data_swr.ts", data, error);
//   console.log("time", time);
//   console.log("time2", time2);
//   return { data, error, time, isLoading: !data && !error && !isValidating };
// };

// export const GetDataWithSWRRedis = (key: string = "testKey") => {
//   const { data, error } = useSWR(key, fetcherRedis);
//   console.log("redis_swr.ts", data, error);
//   return { data, error, isLoading: !data && !error };
// };
