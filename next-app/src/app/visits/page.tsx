"use client";

import React from "react";
import IncrementButton from "./IncrementButton";
import { GetDataWithSWR } from "@/lib/swr";

type Props = {};

const Visits = (props: Props) => {
  const {
    data: dataApiRedis,
    error: errorApiRedis,
    isLoading: isLoadingRedis,
  } = GetDataWithSWR(
    `${
      process.env.BNS_INGRESS_URL_NEXT_APP_0
        ? "https://" + process.env.BNS_INGRESS_URL_NEXT_APP_0
        : "http://localhost:3000/"
    }api/counter?id=TestingCounter`
  );
  console.log("dataApiRedis", dataApiRedis);

  return (
    <div className="m-4">
      <h1>
        Total Visits:{" "}
        {isLoadingRedis ? "Getting data..." : dataApiRedis?.redisValue}
      </h1>
      <p>Play with the visits counter.</p>
      <IncrementButton />
    </div>
  );
};

export default Visits;
