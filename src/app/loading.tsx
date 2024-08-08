import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col gap-4">
      <div className="text-4xl font-bold text-black">
        <span className="text-blue-600">SEA</span>TUDY.
      </div>
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
