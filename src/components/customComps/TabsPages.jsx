"use client";
import { buttonVariants } from "@components/ui/button";
import { DataContext } from "@hooks/DataContext";
import { cn } from "@lib/utils";
import { Box, Briefcase, LucideMenuSquare, MenuSquare } from "lucide-react";
import { useContext } from "react";

const TabsPages = () => {
  const { setFormToggle, setMainToggle } = useContext(DataContext);

  const onToggles = (clicked) => {
    if (clicked === "project") {
      setMainToggle((prev) => ({
        catlist: false,
        quotelist: false,
        projectlist: false,
      }));
      setFormToggle((prev) => ({
        quoteform: false,
        projectform: !prev.projectform,
      }));
    }
    if (clicked === "quote") {
      setMainToggle((prev) => ({
        catlist: false,
        quotelist: false,
        projectlist: false,
      }));
      setFormToggle((prev) => ({
        projectform: false,
        quoteform: !prev.quoteform,
      }));
    }

    if (clicked === "projectlist") {
      setFormToggle((prev) => ({ projectform: false, quoteform: false }));
      setMainToggle((prev) => ({
        catlist: false,
        quotelist: false,
        projectlist: true,
      }));
    }
    if (clicked === "quotelist") {
      setFormToggle((prev) => ({ projectform: false, quoteform: false }));

      setMainToggle((prev) => ({
        catlist: false,
        projectlist: false,
        quotelist: true,
      }));
    }
    if (clicked === "catlist") {
      setFormToggle((prev) => ({ projectform: false, quoteform: false }));
      setMainToggle((prev) => ({
        quotelist: false,
        projectlist: false,
        catlist: true,
      }));
    }
  };
  return (
    <div className="w-full bg-background sticky flex top-0 shadow-md z-20">
      <div
        className={cn(
          "w-full flex-col-reverse gap-y-3 md:flex-row px-4 py-2 items-center md:justify-between justify-center rounded-b-md "
        )}
      >
        <div className="flex items-center justify-between space-x-3">
          <span
            onClick={() => onToggles("project")}
            className={cn(
              buttonVariants(),
              "bg-primary w-24 h-full cursor-pointer"
            )}
          >
            Project Form
          </span>
          <span
            onClick={() => onToggles("quote")}
            className={cn(
              buttonVariants(),
              "bg-primary w-24 h-full cursor-pointer"
            )}
          >
            Quotes Form
          </span>
        </div>
        <div
          className={cn(
            "flex items-center justify-between md:hidden space-x-4 "
          )}
        >
          <span className="flex space-x-2 ">
            <Box
              onClick={() => onToggles("projectlist")}
              className="h-6 w-6 text-primary cursor-pointer"
            />
            <p className="text-gray-600 font-medium">Projects</p>
          </span>
          <span className="flex space-x-2">
            <Briefcase
              onClick={() => onToggles("quotelist")}
              className="h-6 w-6 text-primary cursor-pointer"
            />
            <p className="text-gray-600 font-medium">Quotes</p>
          </span>
          <span className="flex space-x-2 ">
            <LucideMenuSquare
              onClick={() => onToggles("catlist")}
              className="h-6 w-6 text-primary cursor-pointer"
            />
            <p className="text-gray-600 font-medium">Categories</p>
          </span>
        </div>
      </div>
    </div>
  );
};
export default TabsPages;
