"use client";
import { getRedis } from "@/lib/redis";
import { GetDataWithSWR, GetTimedDataWithSWR } from "@/lib/swr";
import { useEffect, useState } from "react";

const ClientComponent = () => {
  interface RedisData {
    id: string;
    redisValue: string;
  }

  // const {
  //   data: data,
  //   error: error,
  //   isLoading: isLoading,
  // } = GetDataWithSWR("https://jsonplaceholder.typicode.com/todos/2");

  // TODO: The link should be composed from the local env variable

  interface TimedData {
    redisValue: {
      data: string;
      time: number;
    };
  }

  const {
    data: swrTimedData,
    error: swrError,
    isLoading: swrIsLoading,
  } = GetDataWithSWR("https://jsonplaceholder.typicode.com/todos/5");

  const {
    data: dataApiRedis,
    error: errorApiRedis,
    isLoading: isLoadingRedis,
  } = GetDataWithSWR("http://localhost:3000/api/user?id=Testing%20ID");
  console.log("dataApiRedis", dataApiRedis);

  //
  //
  //
  //

  const [fetchTime, setFetchTime] = useState(0);
  const [fetchRedisTime, setFetchRedisTime] = useState(0);

  useEffect(() => {
    if (swrIsLoading) {
      const startTime = Date.now();
      setFetchTime(startTime);

      return () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        setFetchTime(duration);
      };
    }

    return () => {
      setFetchTime(0);
    };
  }, [swrIsLoading]);

  useEffect(() => {
    if (isLoadingRedis) {
      const redisStartTime = Date.now();
      setFetchRedisTime(redisStartTime);

      return () => {
        const redisEndTime = Date.now();
        const duration = redisEndTime - redisStartTime;
        setFetchRedisTime(duration);
      };
    }

    return () => {
      setFetchRedisTime(0);
    };
  }, [isLoadingRedis]);

  //
  //
  //
  //
  //

  return (
    <div className="bg-stone-500 dark:bg-stone-700 p-10">
      <p>I am inside ClientComponent</p>
      <p>
        [{fetchTime}] time in ms | SWR value:{" "}
        {swrTimedData ? swrTimedData.title : "Zilch, nada, nothing"}
      </p>
      <p>
        [{dataApiRedis?.redisValue?.redisFetchTime}] time in ms [
        {fetchRedisTime}] | SWR value from Redis [
        {dataApiRedis?.redisValue?.data}]
      </p>
      <p>
        SWR Redis value: {dataApiRedis ? dataApiRedis.id : "Nothing fetched"}
      </p>
    </div>
  );
};

export default ClientComponent;
