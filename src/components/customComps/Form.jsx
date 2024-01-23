import { buttonVariants } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import TextareaAutosize from "react-textarea-autosize";

import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { uploadImage } from "@lib/sanityActions";
import { cn } from "@lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@components/ui/dropdown-menu";
import { DownloadCloud, Loader, RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const Form = ({
  formValues,
  values,
  setValues,
  chooseCategory,
  onSubmit,
  trigger,
  category,
  subCategory,
  register,
  handleSubmit,
  errors,
  submitting,
  formTitle,
  formDescription,
}) => {
  const [loadingImage, setLoadingImage] = useState();
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

  const deleteImage = (i) => {
    const newImages = values.images?.filter((item) => item !== i);
    setValues((prev) => ({
      ...prev,
      images: newImages,
    }));
  };
  return (
    <div className="flex items-center lg:w-1/3 w-full justify-center h-full">
      <Card className="flex flex-col flex-1 items-center py-2">
        <CardHeader className={"w-full"}>
          <CardTitle className="text-primary">{formTitle}</CardTitle>
          <CardDescription className="capitalize font-medium text-gray-500 flex justify-between items-center ">
            <h1> {formDescription}</h1>
            <RefreshCcw
              title={"undo to create"}
              onClick={() =>
                setValues((prev) => ({ ...prev, action: "create" }))
              }
              className="text-primary w-6 h-6 cursor-pointer"
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full space-y-3">
          <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {formValues.map(({ id, type, label, image, ...props }) => (
              <div>
                {id !== "notes" && id !== "images" ? (
                  <>
                    <Label disabled={loadingImage} className={""} htmlFor={id}>
                      {label}
                    </Label>
                    <Input
                      disabled={loadingImage}
                      className={`text-black ${
                        errors[id] ? "focus-visible:ring-red-500" : "text-black"
                      }`}
                      {...register(id)}
                      props={props}
                      id={id}
                      action={(e) => onHandleInputs(e)}
                      value={values[id]}
                      type={type}
                    />
                  </>
                ) : id === "notes" ? (
                  <>
                    <Label disabled={loadingImage} className={""} htmlFor={id}>
                      <h1 className="flex flex-col items-center">
                        <p> Click here to add</p> <DownloadCloud />
                      </h1>
                    </Label>
                    <TextareaAutosize
                      id={id}
                      {...props}
                      onChange={onHandleInputs}
                      value={values[id]}
                      type={type}
                      minRows={4}
                      maxRows={10}
                      className={cn(
                        " flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                    />
                  </>
                ) : id === "images" ? (
                  <div className="w-full h-44 flex items-center  justify-center px-2 py-1 rounded-md bg-gray-200">
                    {loadingImage ? (
                      <div className="absolute z-20 w-full h-full flex flex-col justify-center items-center space-y-3 text-primary m-auto ">
                        <Loader size={34} className="animate-spin" />
                        <p className="">Loading Images...</p>
                      </div>
                    ) : values.images.length ? (
                      <div className="relative grid grid-cols-4 gap-1 w-full h-full overflow-hidden">
                        {values?.images?.map((i, index) => (
                          <div
                            key={i?._id}
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
                        disabled={loadingImage}
                        className={"flex flex-col items-center"}
                        htmlFor={id}
                      >
                        <h1 className="flex flex-col items-center">
                          <p> Click here to add</p> <DownloadCloud />
                        </h1>
                      </Label>
                    )}
                  </div>
                ) : null}
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

          {subCategory && (
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
          )}

          <button
            disabled={submitting}
            onClick={onSubmit}
            className={cn(buttonVariants(), "w-full mt-3")}
            type="submit"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
export default Form;
