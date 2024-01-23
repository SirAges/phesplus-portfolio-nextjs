"use client";
import { useContext, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import NoProjectFound from "./NoProjectFound";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";
import Loading from "./Loading";
import Masonry from "react-masonry-css";
import { DataContext } from "@hooks/DataContext";
const AllProjects = () => {
  const { projects, loading, start, end, previousProjects, nextProjects } =
    useContext(DataContext);
  const pathname = usePathname();

  if (pathname === "/dashboard") {
  }

  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  if (loading.state) return <Loading text={"Fetching Projects"} />;
  // if (projects?.length === 0)
  //   return (
  //     <NoProjectFound
  //       text={" Sorry We are not unable to fetch project"}
  //       link={"/dashboard"}
  //     />
  //   );
  return (
    <div className=" w-full flex flex-col items-center ">
      <Masonry
        className=" w-full flex gap-2 flex-1"
        breakpointCols={breakpointColumnsObj}
      >
        {projects?.map((p) => (
          <ProjectCard key={p._id} project={p} className="" />
        ))}
      </Masonry>

      {pathname !== "/dashboard" ? (
        <div className="flex space-x-3">
          {start !== 0 && (
            <span
              onClick={() => previousProjects()}
              className={cn(buttonVariants(), "cursor-pointer")}
            >
              Prev
            </span>
          )}
          {end && (
            <span
              onClick={() => nextProjects()}
              className={cn(buttonVariants(), "cursor-pointer")}
            >
              Next
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default AllProjects;
