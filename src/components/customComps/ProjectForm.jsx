"use client";
import { buttonVariants } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import TextareaAutosize from "react-textarea-autosize";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  createProject,
  getAllCategory,
  getAllSubCategory,
  uploadImage,
} from "@lib/sanityActions";
import { useState, useEffect } from "react";
import { cn } from "@lib/utils";
import toast, { useToasterStore } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DownloadCloud, Loader, X } from "lucide-react";
import Image from "next/image";
const ProjectForm = () => {
  const validator = z.object({
    title: z.string().min(3, { message: "must be more than 3 characters" }),
    country: z.string().min(3, { message: "must be more than 3 characters" }),
    budget: z.number(),
    notes: z.string().min(8, { message: "must be more than 8 characters" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validator),
  });

  const { user } = useKindeBrowserClient();
  const [trigger, setTrigger] = useState({
    cat: "",
    sub: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const { toasts } = useToasterStore();

  useEffect(() => {
    const abortController = new AbortController();

    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation

    return () => {
      abortController.abort();
    };
  }, [toasts]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategory = async () => {
      try {
        const data = await getAllCategory();
        const subdata = await getAllSubCategory();
        if (
          data === null ||
          data === undefined ||
          subdata === null ||
          subdata === undefined
        ) {
          return toast.error("No category");
        } else {
          setCategory(data);
          setSubCategory(subdata);
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      }
    };

    fetchCategory();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, []);

  const [values, setValues] = useState({
    title: "",
    country: "",
    category: "",
    subCategory: "",
    budget: 0,
    images: [],
    notes: "",
  });
  const formValues = [
    {
      id: "title",
      name: "title",
      type: "text",
      placeholder: "What do you need",
      label: "Title",
    },
    {
      id: "country",
      name: "country",
      type: "text",
      placeholder: "country",
      label: "Country",
    },
    {
      id: "budget",
      name: "budget",
      type: "number",
      placeholder: "budget",
      label: "Budget",
    },
    {
      id: "images",
      name: "images",
      multiple: true,
      accept: "image/*",
      type: "file",
      placeholder: "images",
      label: "Images",
    },
    {
      id: "notes",
      name: "notes",
      type: "text",
      placeholder: "notes",
      label: "Notes",
    },
  ];
  const deleteImage = (i) => {
    const newImages = values.images?.filter((item) => item !== i);
    setValues((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const onHandleInputs = (e) => {
    if (e.target.name === "images") {
      const fileList = e.target.files;
      const imageArray = Array.from(fileList);

      imageArray?.forEach(async (image) => {
        try {
          setLoadingImage(true);
          const { type, name } = image;
          const document = await uploadImage(image, type, name);
          setValues((prev) => ({
            ...prev,
            images: [...prev?.images, document?.url],
          }));
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingImage(false);
        }
      });
    } else {
      setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const chooseCategory = (item, type) => {
    if (type === "cat") {
      setValues((prev) => ({ ...prev, category: item._id }));
      setTrigger((prev) => ({ ...prev, cat: item.category }));
    } else {
      setValues((prev) => ({ ...prev, subCategory: item._id }));
      setTrigger((prev) => ({ ...prev, sub: item.subCategory }));
    }
  };
  const onSubmit = () => {
    if (values.title.length === 0) {
      toast.error("Please Add Your Title");
    } else if (values.category.length === 0) {
      toast.error("Please Choose Your Category");
    } else if (values.subCategory.length === 0) {
      toast.error("Please Choose Your Sub Category");
    } else if (values.budget.length === 0) {
      toast.error("Please Add A Budget");
    } else if (values.images.length === 0) {
      toast.error("Please Add An Image");
    } else if (values.notes.length === 0) {
      toast.error("Drop A Note To Help Us Understand Your Needs");
    } else {
      const mutate = createProject(values, user);
    }
  };
  return (
    <>
      <div className="flex  items-center md:w-1/2 justify-center h-full w-full">
        <Card className="flex flex-col flex-1 items-center py-2">
          <CardHeader className={"w-full"}>
            <CardTitle className="text-primary">Quotation Form</CardTitle>
            <CardDescription>
              Get a Project That Will Get Your Design Project Rolling
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full space-y-3">
            <form
              className="w-full space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {formValues.map(({ id, type, label, ...props }) => (
                <div key={id}>
                  <div
                    className={`${
                      id === "images"
                        ? "w-full h-44 flex items-center  justify-center px-2 py-1 rounded-md bg-gray-200"
                        : null
                    }`}
                  >
                    {loadingImage && id === "images" ? (
                      <div className="absolute z-20 w-full h-full flex flex-col justify-center items-center space-y-3 text-primary m-auto ">
                        <Loader size={34} className="animate-spin" />
                        <p className="">Loading Images...</p>
                      </div>
                    ) : values.images.length && id === "images" ? (
                      <div className="relative grid grid-cols-4 gap-1 w-full h-full overflow-hidden">
                        {values.images.map((i, index) => (
                          <div
                            key={i._id}
                            className="flex justify-center items-center w-full h-24 relative group "
                          >
                            <Image
                              className="w-full  object-cover"
                              fill
                              referrerPolicy="no-referrer"
                              src={i}
                              alt={`image ${index}`}
                            />
                            <X
                              onClick={() => deleteImage(i)}
                              size={24}
                              className="absolute mx-auto text-white rounded-sm bg-primary lg:hidden lg:group-hover:flex"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Label
                        className={`${
                          id === "images" ? " flex flex-col items-center" : ""
                        }`}
                        htmlFor={id}
                      >
                        {id === "images" ? (
                          <h1 className="flex flex-col items-center">
                            <p> Click here to add</p> <DownloadCloud />
                          </h1>
                        ) : (
                          label
                        )}

                        <br />
                      </Label>
                    )}
                  </div>

                  {id === "notes" ? (
                    <TextareaAutosize
                      id={id}
                      {...props}
                      onChange={onHandleInputs}
                      value={id !== "images" && values[id]}
                      type={type}
                      minRows={4}
                      maxRows={10}
                      className={cn(
                        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                    />
                  ) : (
                    <Input
                      className={`${
                        errors[id] ? "focus-visible:ring-red-500" : ""
                      } ${id === "images" ? "hidden" : ""}`}
                      {...register(id)}
                      props={props}
                      id={id}
                      action={onHandleInputs}
                      value={id !== "images" && values[id]}
                      type={type}
                    />
                  )}
                </div>
              ))}
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={
                  "border border-input bg-background px-3 py-2 rounded-md w-full cursor-pointer"
                }
              >
                {trigger.cat ? trigger.cat : "Category"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {category?.map((c) => (
                  <>
                    <DropdownMenuItem onClick={() => chooseCategory(c, "cat")}>
                      {c.category}
                    </DropdownMenuItem>
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={
                  "border border-input bg-background px-3 py-2 focus-visible:outline-none  rounded-md w-full cursor-pointer"
                }
              >
                {trigger.sub ? trigger.sub : "Sub Category"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {subCategory?.map((c) => (
                  <>
                    <DropdownMenuItem onClick={() => chooseCategory(c, "sub")}>
                      {c.subCategory}
                    </DropdownMenuItem>
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={onSubmit}
              className={cn(buttonVariants(), "w-full mt-3")}
              type="submit"
            >
              Submit
            </button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ProjectForm;
