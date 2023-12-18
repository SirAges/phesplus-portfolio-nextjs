"use client";
import { Search } from "lucide-react";
import { Button } from "@components/ui/button";
import { useContext } from "react";
import { DataContext } from "@hooks/DataContext";
import { cn } from "@lib/utils";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useContext(DataContext);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const handleSearch = () => {
    if (!pathname.includes("search")) {
      setSearchTerm(searchText);
      router.push("/dashboard/search");
      setSearchText("");
    }

    if (!searchText) {
      toast.error("Search input is empty");
    }

    setSearchTerm(searchText);
    setSearchText("");
    router.refresh();
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={"flex items-center w-2/5 drop-shadow-md h-10  "}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
        className={
          "h-10 outline-none px-3 placeholder:text-sm  rounded-l-md w-full bg-white/88 "
        }
      />
      <Button
        variant="ghost"
        className={cn("flex items-center rounded-l-none h-10 px-3 text-white")}
      >
        <Search onClick={handleSearch} />
      </Button>
    </form>
  );
};
export default SearchInput;
