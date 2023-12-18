import { Loader } from "lucide-react";

const Loading = ({ text }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4 first-letter:">
      <Loader strokeWidth={2} className="h-16 w-16 animate-spin text-primary" />
      <h2 className="text-gray-400 text-lg">{text}</h2>
    </div>
  );
};
export default Loading;
