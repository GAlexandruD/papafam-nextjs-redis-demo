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
  console.log(id); // This will log "test12345"

  const res = await getRedis("testKey");

  console.log("blabla", id);

  return new Response(`Hello World! ${res ? res : "Nuttin' here"}`, {
    status: 200,
    // headers: {
    //   "content-type": "text/plain",
    // },
  });

  //   let user: User | undefined = JSON.parse(
  //     (await getRedis(id as string)) || "null"
  //   );

  //   console.log("user", user);

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
