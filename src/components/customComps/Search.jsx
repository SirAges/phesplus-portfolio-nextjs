"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@hooks/DataContext";
import { searchProject } from "@lib/sanityActions";
import Image from "next/image";
import { Separator } from "@components/ui/separator";
import Link from "next/link";
import { urlForImage } from "../../../sanity/lib/image";
import NoProjectFound from "./NoProjectFound";
import Loading from "./Loading";
const Search = () => {
  const { searchTerm } = useContext(DataContext);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchprojects = async () => {
      try {
        setLoading(true);
        if (searchTerm) {
          const data = await searchProject(searchTerm);
          console.log(data);
          if (data.length) {
            setProjects(data);
          }
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchprojects();
  }, [searchTerm]);
  let content;
  content = (
    <>
      <h1 className="text-4xl mb-5 ">
        You searched for <span className="text-primary">{searchTerm}</span>
      </h1>
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 ">
        {projects?.map((p) => (
          <Link
            key={p._id}
            href={"/dashboard/projects/123"}
            className=" flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 bg-gray-200">
              <div className="relative flex md:hidden h-24 w-24 ">
                <Image
                  className="object-cover object-center "
                  fill
                  referrerPolicy="no-referrer"
                  src={urlForImage(p?.images[0]?.asset?.url)}
                  alt={p.title}
                />
              </div>
              <div className="flex max-w-[16rem]  h-24 flex-col justify-between">
                <h1 className="text-primary text-xl font-medium">{p.title}</h1>
                <p className=" truncate w-full  text-gray-500">
                  {p.description}
                </p>
                <p className="font-medium text-gray-500">{p.category}</p>
                <p className="flex font-medium text-gray-500">
                  Worth{" "}
                  <p className="text-primary">
                    {" "}
                    {Array(p.price.toString().length).fill("$")}
                  </p>
                </p>
              </div>
            </div>
            <Separator />
          </Link>
        ))}
      </div>
    </>
  );
  if (loading) return <Loading text={"Fetching Search Results..."} />;
  if (!projects.length)
    return (
      <NoProjectFound
        text={
          searchTerm
            ? `No search result for ${searchTerm}`
            : "Your Search is Empty"
        }
        link={""}
      />
    );

  return content;
};
export default Search;
