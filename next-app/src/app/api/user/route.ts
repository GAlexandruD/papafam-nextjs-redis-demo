// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

type User = {
  name: string;
  address: string;
  telephone: string;
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

  const res = await getRedis("testKey");
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

  //   if (!user) {
  //     user = {
  //       name: "User Name",
  //       address: "User's Address",
  //       telephone: "User's Phone",
  //     };
  //     await setRedis(id as string, user);
  //   }

  //   res.status(200).json(user);
  // };

  // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (req.method === "GET") {
  //     await GET(req, res);
  //   } else {
  //     res.status(405).end();
  //   }
};
