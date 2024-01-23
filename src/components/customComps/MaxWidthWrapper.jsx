import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full flex flex-col items-center max-w-screen-2xl py-5 px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
