"use client";
import { GetDataWithSWR } from "@/lib/swr";

const ClientComponent = () => {
  interface RedisData {
    id: string;
    redisValue: string;
  }

  const { data: data, error: error } = GetDataWithSWR(
    "https://jsonplaceholder.typicode.com/todos/2"
  );

  const { data: dataApiRedis, error: errorApiRedis } = GetDataWithSWR(
    "https://next-app-7fgzqv.bunnyenv.com/api/user?id=Testing%20ID"
  );

  console.log("swr_from_clientComponent.tsx", data, error);

  return (
    <div className="bg-stone-500 dark:bg-stone-700 p-10">
      <p>I am inside ClientComponent</p>
      <p>SWR value: {data ? data.title : "Zilch, nada, nothing"}</p>
      <p>
        SWR Redis value: {dataApiRedis ? dataApiRedis.id : "Nothing fetched"}
      </p>
    </div>
  );
};

export default ClientComponent;
