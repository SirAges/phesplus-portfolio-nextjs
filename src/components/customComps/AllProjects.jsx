"use client";
import { getAllProjects } from "@lib/sanityActions";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import NoProjectFound from "./NoProjectFound";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";
import Loading from "./Loading";
const AllProjects = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [projects, setProjects] = useState([]);

  if (pathname === "/dashboard") {
  }
  useEffect(() => {
    const abortController = new AbortController();
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProjects(start, end);
        if (data === null || data === undefined) {
          setEnd((prev) => prev - 8);
        }
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, [start, end]);
  const previousProjects = () => {
    setStart((prev) => prev - 8);
    setEnd((prev) => prev - 8);
    router.refresh();
  };
  const nextProjects = () => {
    setStart((prev) => prev + 8);
    setEnd((prev) => prev + 8);
    router.refresh();
  };
  if (loading) return <Loading text={"Fetching Projects"} />;
  // if (projects?.length === 0)
  //   return (
  //     <NoProjectFound
  //       text={" Sorry We are not unable to fetch project"}
  //       link={"/dashboard"}
  //     />
  //   );
  return (
    <div className=" w-full flex flex-col items-center ">
      <div className="grid w-full flex-1 gap-3 grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4">
        {projects?.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
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
