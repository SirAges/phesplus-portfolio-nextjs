import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { AlertOctagon, BookMarkedIcon } from "lucide-react";
import Link from "next/link";

const NoProjectFound = ({ text, link }) => {
  return (
    <div className="flex flex-col space-y-5 items-center w-full justify-center bg-white">
      <h1 className="text-primary font-medium text-6xl capitalize">{text}</h1>
      <h1 className="text-gray-300 ">Check your network</h1>
      <AlertOctagon strokeWidth={1} className="h-32 w-32 text-destructive" />
      <Link href={link} className={cn(buttonVariants())}>
        Try Again
      </Link>
    </div>
  );
};
export default NoProjectFound;
