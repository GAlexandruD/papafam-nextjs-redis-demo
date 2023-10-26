// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getRedis, setRedis, saddRedis, scardRedis } from "@/lib/redis";

type User = {
  name: string;
  address: string;
  telephone: string;
};

export const POST = async (req: Request) => {
  // Run the saddRedis function with the current timestamp
  await saddRedis("counter", Date.now().toString());

  // Return a response to indicate success
  return new Response("Successfully added timestamp to Redis", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url); // "https://example.com/?id=test12345"
  const id = searchParams.get("id"); // "id" is the parameter key
  console.log("Id from url is:", id);

  // If no ID provided, return 400
  if (!id) {
    return new Response("Id not provided", {
      status: 400,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
  }

  const res = await scardRedis("counter");
  const responseBody = {
    id,
    redisValue: res ? res : "Nuttin' here",
  };

  return new Response(JSON.stringify(id ? responseBody : "Id not provided"), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
