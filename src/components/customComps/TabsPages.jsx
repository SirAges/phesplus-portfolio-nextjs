import { cn } from "@lib/utils";
import Link from "next/link";

const TabsPages = () => {
  return (
    <div
      className={cn(
        "w-full h-10 bg-muted sticky top-0 flex gap-x-4 items-center justify-evenly"
      )}
    >
      <Link className="bg-primary w-24 h-full" href="#project">
        Projects
      </Link>
      <Link className="bg-primary w-24 h-full" href="#quote">
        Quotes
      </Link>
    </div>
  );
};
export default TabsPages;
