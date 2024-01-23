"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  createCategory,
  createSubCategory,
  deleteDoc,
} from "@lib/sanityActions";
import {
  ArrowRight,
  Circle,
  Edit3,
  Expand,
  Link,
  Loader,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast, { useToasterStore } from "react-hot-toast";
import { urlForImage } from "../../../sanity/lib/image";
import { ScrollArea } from "@components/ui/scroll-area";
import { DataContext } from "@hooks/DataContext";
import { cn } from "@lib/utils";

const AdminDashboard = () => {
  const [sending, setSending] = useState(false);
  const [sendingName, setSendingName] = useState("");

  const [deleting, setDeletingCat] = useState(false);
  const [deletingIdx, setDeletingIdx] = useState(null);

  const [mainCat, setMainCat] = useState({ id: "", category: "" });
  const [catInputs, setCatInputs] = useState({
    category: "",
    subCategory: "",
  });
  const statusConst = ["pending", "processing", "fulfiled"];

  const { toasts } = useToasterStore();
  const {
    mainToggle,
    formToggle,
    qOthers,
    setQOthers,
    setProjectValues,
    setQuoteValues,
    category,
    subCategory,
    projects,
    quotes,
    setRefetch,
  } = useContext(DataContext);

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
  const handleDelete = async (id) => {
    try {
      setDeletingIdx(id);
      setDeletingCat(true);
      const mutate = await deleteDoc(id);
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("item deleted");
      setRefetch((prev) => !prev);
      setDeletingCat(false);
      setDeletingIdx(null);
    }
  };
  const onAddCat = async (type) => {
    if (type === "cat") {
      setSendingName("cat");
      if (catInputs.category.length < 2) {
        return toast.error(
          "Enter a Sub Category to add minimum of 2 characters"
        );
      }

      try {
        setSending(true);
        const mutate = await createCategory(catInputs.category);
        if (mutate === null || mutate === undefined)
          return toast.error("An error occured");
        toast.success("Category Created");
      } catch (err) {
        toast.error(`An error occured try again \n Message: ${err.message}`);
      } finally {
        setRefetch((prev) => !prev);
        setSending(false);
        setSendingName("");
      }
    }

    if (type === "sub") {
      setSendingName("sub");
      if (catInputs.subCategory.length < 2) {
        return toast.error(
          "Enter a Sub Category to add minimum of 2 characters"
        );
      }

      try {
        setSending(true);
        const mutate = await createSubCategory(
          catInputs.subCategory,
          mainCat.id
        );
        if (mutate === null || mutate === undefined)
          return toast.error("An error occured");
        toast.success("Sub Category Created");

        setCatInputs({
          category: "",
          subCategory: "",
        });
      } catch (err) {
        toast.error(`An error occured try again \n Message: ${err.message}`);
      } finally {
        setRefetch((prev) => !prev);
        setSending(false);
        setSendingName("");
      }
    }
  };

  const editItem = async (item, clicked) => {
    if (clicked === "project") {
      setProjectValues({ ...item, action: "edit" });
    }
    if (clicked === "quote") {
      setQuoteValues({ ...item, action: "edit" });
    }
  };

  return (
    <>
      <div className="space-y-3 flex-1 ">
        {/* {mainToggle.projectlist && null} */}

        <Card
          id="project"
          className={cn("md:flex flex-col ", {
            hidden: !mainToggle.projectlist,
            flex:
              !formToggle.projectform &&
              !formToggle.quoteform &&
              !mainToggle.quotelist &&
              !mainToggle.catlist,
          })}
        >
          <CardHeader
            className={"flex flex-row w-full items-center justify-between"}
          >
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Projects desc</CardDescription>
            </div>
            <div className="w-fit h-full flex items-center justify-center">
              <Circle className="w-16 h-16 text-primary" />
              <h1 className="absolute text-xl text-destructive font-medium">
                {projects?.length}
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className={cn("md:h-[40vh] h-[calc(100vh-8rem)]")}>
              <div className="space-y-2">
                {projects?.map((p) => (
                  <Card key={p._id}>
                    <CardContent
                      className={"flex items-center justify-between "}
                    >
                      <div
                        className={"flex items-center justify-start space-x-4 "}
                      >
                        <div className="relative w-10 h-10 ">
                          <Image
                            className="object-cover object-center rounded-sm"
                            fill
                            referrerPolicy="no-referrer"
                            src={urlForImage(p.images[0])}
                            alt={p.title}
                          />
                        </div>

                        <CardTitle className="text-md">{p.title}</CardTitle>
                      </div>
                      <div className="flex space-x-3">
                        <Edit3
                          onClick={() => editItem(p, "project")}
                          className="w-5 h-5 p-1 text-primary bg-muted rounded-full"
                        />
                        {deleting && deletingIdx === p._id ? (
                          <Loader className="w-5 h-5 p-1 animate-spin text-destructive  " />
                        ) : (
                          <X
                            onClick={() => handleDelete(p._id)}
                            className="w-5 h-5 p-1   text-white   rounded-full bg-destructive"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* {mainToggle.quotelist && null} */}

        <Card
          id="quote"
          className={cn("md:flex", { hidden: !mainToggle.quotelist })}
        >
          <CardHeader
            className={"flex flex-row w-full items-center justify-between"}
          >
            <div>
              <CardTitle>Quote</CardTitle>
              <CardDescription>Quote desc</CardDescription>
            </div>
            <div className="w-fit h-fit flex items-center justify-center">
              <Circle className="w-16 h-16 text-primary" />
              <h1 className="absolute text-xl text-destructive font-medium">
                {quotes?.length}
              </h1>
            </div>
          </CardHeader>
          <CardContent className={"w-full"}>
            <ScrollArea className={cn("md:h-[40vh] h-[calc(100vh-8rem)]")}>
              <div className="space-y-2">
                {quotes?.map((q) => (
                  <Card key={q._id}>
                    <CardContent
                      className={"flex items-center justify-between "}
                    >
                      <div
                        className={"flex items-center justify-start space-x-4 "}
                      >
                        <h1 className="text-gray-400 "></h1>
                        <CardTitle className="text-4xl text-gray-600"></CardTitle>
                      </div>
                      <div className="flex space-x-3">
                        <DropdownMenu className="relative">
                          <DropdownMenuTrigger asChild>
                            {qOthers.status}
                          </DropdownMenuTrigger>

                          <DropdownMenuContent>
                            {statusConst.map((s) => (
                              <>
                                <DropdownMenuItem className="flex items-center justify-between">
                                  <h1
                                    onClick={setQOthers((prev) => ({
                                      ...prev,
                                      status: s,
                                    }))}
                                  >
                                    {s}
                                  </h1>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Edit3
                          onClick={() => editItem(q, "quote")}
                          className="w-5 h-5 p-1 text-primary bg-muted rounded-full"
                        />
                        {deleting && deletingIdx === q._id ? (
                          <Loader className="w-5 h-5 p-1 animate-spin text-destructive  " />
                        ) : (
                          <X
                            onClick={() => handleDelete(q._id)}
                            className="w-5 h-5 p-1   text-white   rounded-full bg-destructive"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* {mainToggle.catlist && null} */}

      <div
        className={cn(
          "md:flex w-full md:w-60 p-1  flex-col space-y-2 md:bg-muted rounded-md sticky top-0 md:min-h-[calc(100vh-5rem)]",
          { hidden: !mainToggle.catlist }
        )}
      >
        <Card id="category">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Categories description</CardDescription>

            <Label>Add Categories</Label>
            <div className="relative h-fit flex items-center">
              <Input
                disabled={sendingName === "cat"}
                type="text"
                value={catInputs.category}
                action={(e) =>
                  setCatInputs((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="Add Category"
                className="placeholder:text-md place pr-8"
              />
              {sending && sendingName === "cat" ? (
                <Loader className="w-6 h-6 animate-spin text-primary  " />
              ) : (
                <ArrowRight
                  onClick={() => onAddCat("cat")}
                  strokeWidth={2}
                  className="absolute h-6 w-6 p-1  text-primary bg-muted rounded-full right-1 cursor-pointer"
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <DropdownMenu className="relative">
              <div className="flex justify-between items-center">
                <h1 className="font-medium">Category List</h1>
                <DropdownMenuTrigger asChild>
                  <Expand className="text-primary cursor-pointer w-6 h-6 bg-muted rounded-full p-1" />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                {category.map((c) => (
                  <>
                    <DropdownMenuItem className="flex items-center justify-between">
                      {" "}
                      <span>{c.category}</span>{" "}
                      {deleting && deletingIdx === c._id ? (
                        <Loader className="w-3 h-3 animate-spin text-destructive  " />
                      ) : (
                        <X
                          onClick={() => handleDelete(c._id)}
                          className="w-3 h-3  text-white  rounded-full bg-destructive"
                        />
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        <Card id="subCategory">
          <CardHeader>
            <CardTitle>Sub Categories</CardTitle>
            <CardDescription>Sub Categories description</CardDescription>

            <Label>Add Sub Categories</Label>
            <div className="relative h-fit flex items-center">
              <Input
                disabled={sendingName === "sub"}
                type="text"
                value={catInputs.subCategory}
                action={(e) =>
                  setCatInputs((prev) => ({
                    ...prev,
                    subCategory: e.target.value,
                  }))
                }
                placeholder="Add Category"
                className="placeholder:text-md place pr-8"
              />
              {sending && sendingName === "sub" ? (
                <Loader className="w-6 h-6 animate-spin text-primary  " />
              ) : (
                <ArrowRight
                  onClick={() => onAddCat("sub")}
                  strokeWidth={2}
                  className="absolute h-6 w-6 p-1  text-primary bg-muted rounded-full right-1 cursor-pointer"
                />
              )}
            </div>
            <DropdownMenu className="relative">
              <div className="flex justify-between items-center">
                <h1 className="font-medium">
                  {mainCat.category ? mainCat.category : "Link Main Category"}
                </h1>
                <DropdownMenuTrigger asChild>
                  <Link className="text-primary cursor-pointer w-6 h-6 bg-muted rounded-full p-1" />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                {category.map((c) => (
                  <>
                    {" "}
                    <DropdownMenuItem
                      key={c._id}
                      onClick={() =>
                        setMainCat({ id: c._id, category: c.category })
                      }
                    >
                      {c.category}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <DropdownMenu className="relative">
              <div className="flex justify-between items-center">
                <h1 className="font-medium">Sub Category List</h1>
                <DropdownMenuTrigger asChild>
                  <Expand className="text-primary cursor-pointer w-6 h-6 bg-muted rounded-full p-1" />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                {subCategory.map((c) => (
                  <>
                    {" "}
                    <DropdownMenuItem
                      key={c._id}
                      className={
                        "flex text-sm whitespace-nowrap space-x-2 justify-between items-center"
                      }
                    >
                      <span className=" capitalize ">{c.subCategory}</span>
                      <span className="text-primary capitalize font-medium">
                        {c.category}
                      </span>
                      {deleting && deletingIdx === c._id ? (
                        <Loader className="w-3 h-3 animate-spin text-destructive  " />
                      ) : (
                        <X
                          onClick={() => handleDelete(c._id)}
                          className="w-3 h-3  text-white  rounded-full bg-destructive"
                        />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default AdminDashboard;
