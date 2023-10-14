"use client";
import { GetDataWithSWR } from "@/lib/swr";

const ClientComponent = () => {
  const { data, error } = GetDataWithSWR(
    "https://jsonplaceholder.typicode.com/todos/2"
  );

  console.log("swr_from_clientComponent.tsx", data, error);

  return (
    <div className="bg-stone-500 dark:bg-stone-700 p-10">
      <p>I am inside ClientComponent</p>
      <p>SWR value: {data ? data.title : "Zilch, nada, nothing"}</p>
      <p>SWR Redis value: </p>
    </div>
  );
};

export default ClientComponent;
