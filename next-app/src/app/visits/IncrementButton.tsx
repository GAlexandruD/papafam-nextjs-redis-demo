"use client";
import { saddRedis } from "@/lib/redis";
// import { time } from "console";

import React from "react";

type Props = {};

const IncrementButton = (props: Props) => {
  const increaseCounter = async () => {
    console.log("increaseCounter", Date.now());
    // saddRedis("visits", "1"); //Does not work. Calls to Redis are going through the API.

    try {
      // Make a POST request to your API page
      const response = await fetch("/api/counter", { method: "POST" });

      // Check if the request was successful
      if (response.ok) {
        alert("Counter increased");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <button onClick={increaseCounter} className="w-24 h-10 bg-yellow-800">
      Increment
    </button>
  );
};

export default IncrementButton;
