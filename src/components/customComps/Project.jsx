"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { getProject } from "@lib/sanityActions";
import { cn } from "@lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Project = ({ id }) => {
  const [project, setProject] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchProject = async () => {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProject();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, [id]);
  return (
    <>
      {project.map((p) => (
        <div key={p_id} className="w-full space-y-3">
          <div className="flex flex-col space-y-4 ">
            <div className="relative h-[calc(100vh-10rem)]">
              <Image
                className="object-cover object-center"
                fill
                src={p.images[0].asset.url}
                alt="project"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-primary font-medium capitalize text-2xl">
                Project Images
              </h1>
              <div className="flex space-x-3">
                {p.images
                  .filter((f) => f.asset.url !== p.images[0].asset.url)
                  .map((i, index) => (
                    <AlertDialog key={index}>
                      <AlertDialogTrigger asChild>
                        <div
                          key={i.asset.url}
                          className="cursor-pointer h-32 w-32 relative"
                        >
                          <Image
                            className="object-cover object-center rounded-md"
                            fill
                            src={i.asset.url}
                            alt={i.asset.url}
                            referrerPolicy="no-referrer"
                          />{" "}
                        </div>
                      </AlertDialogTrigger>

                      <AlertDialogContent
                        className={cn(
                          "flex flex-col w-[calc(100vw-10rem)] h-[calc(100vh-10rem)] "
                        )}
                      >
                        <AlertDialogHeader>
                          <div
                            className={"flex items-center justify-between h-14"}
                          >
                            <AlertDialogCancel
                              className={cn(" text-primary")}
                              asChild
                            >
                              <X size={24} />
                            </AlertDialogCancel>
                            <AlertDialogTitle className="text-primary font-medium capitalize text-2xl">
                              A Better View
                            </AlertDialogTitle>
                          </div>
                        </AlertDialogHeader>
                        <div
                          key={i.asset.url}
                          className="w-full flex-1 relative"
                        >
                          <Image
                            className="object-cover object-center rounded-md"
                            fill
                            src={i.asset.url}
                            alt={i.asset.url}
                            referrerPolicy="no-referrer"
                          />{" "}
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  ))}
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h1 className="text-2xl capitalize text-primary">{p.title}</h1>
            <p className="text-gray-500">{p.description}</p>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex flex-col px-4 py-2 space-y-3">
                <span className=" flex space-x-2">
                  <p className="font-regular text-gray-700 "> Category:</p>
                  <p className="font-medium text-primary">{p.category}</p>
                </span>
                <span className=" flex space-x-2">
                  <p className="font-regular text-gray-700 "> Sub Category:</p>
                  <p className="font-medium text-primary">minimalist</p>
                </span>
                <span className=" flex space-x-2">
                  <p className="font-regular text-gray-700 "> Worth:</p>
                  <p className="font-medium text-primary ">$$</p>
                </span>
              </div>
              <Link href="/dashboard/getquote" className={cn(buttonVariants())}>
                Get Quote
              </Link>
            </div>
            <Separator />
          </div>
        </div>
      ))}
    </>
  );
};
export default Project;
