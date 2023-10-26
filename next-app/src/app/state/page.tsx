import { unstable_serialize } from "swr";
import ClientComponent from "./clientComponent";

type Props = { key: string };

const state = async (key: Props = { key: "testKey" }) => {
  // const testing = await getRedis(key.key);

  // console.log("testing", testing);

  return (
    <div>
      <p>
        State page. Take a look at console logs:{" "}
        {/* {testing ? testing : "Zilch, nada, nothing"} */}
      </p>

      <p>Next is ClientComponent</p>
      <ClientComponent />
    </div>
  );
};

export default state;
