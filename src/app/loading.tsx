import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <div className="flex flex-row items-center">
        <Image src="/seatudy-logo.png" alt="SEA TUDY Logo" className="h-10 w-auto mr-2" width={100} height={100} />
        <div className="text-4xl font-bold text-black">
          {" "}
          <span className="text-blue-600 text-4xl">SEA</span>TUDY.
        </div>
      </div>
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
