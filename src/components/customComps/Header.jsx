import Link from "next/link";
import Auth from "./Auth";
import SearchInput from "./SearchInput";
import { PenTool } from "lucide-react";

const Header = () => {
  return (
    <div className="sticky top-0 z-50">
      <nav
        className={
          "flex justify-between px-3 bg-primary items-center h-14 drop-shadow-md "
        }
      >
        <Link
          href="/dashboard"
          className="text-white flex items-center space-x-2 "
        >
          <PenTool size={24} className="rotate-180" />
          <p className="font-medium hidden md:flex">Design School</p>
        </Link>
        <SearchInput />
        <Auth />
      </nav>
    </div>
  );
};
export default Header;
