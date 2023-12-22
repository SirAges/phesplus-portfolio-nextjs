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
  getAllCategory,
  getAllProjects,
  getAllSubCategory,
} from "@lib/sanityActions";
import {
  ArrowRight,
  Circle,
  CircleSlash,
  Edit,
  Edit2,
  Edit2Icon,
  Edit3,
  Expand,
  Link,
  Loader,
  Pi,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { useToasterStore } from "react-hot-toast";
import { urlForImage } from "../../../sanity/lib/image";
import { ScrollArea } from "@components/ui/scroll-area";

const AdminDashboard = () => {
  const [sending, setSending] = useState(false);
  const [sendingName, setSendingName] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [deleting, setDeletingCat] = useState(false);
  const [deletingIdx, setDeletingIdx] = useState(null);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [mainCat, setMainCat] = useState({ id: "", category: "" });
  const [catInputs, setCatInputs] = useState({
    category: "",
    subCategory: "",
  });

  const router = useRouter();
  const { toasts } = useToasterStore();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategory = async () => {
      try {
        const data = await getAllCategory();
        const subdata = await getAllSubCategory();
        const projectdata = await getAllProjects(0, 15);
        if (
          data === null ||
          data === undefined ||
          subdata === null ||
          subdata === undefined ||
          data === undefined ||
          projectdata === null ||
          projectdata === undefined
        ) {
          return toast.error("Un able to fetch some data");
        } else {
          setCategory(data);
          setSubCategory(subdata);
          setProjects(projectdata);
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
  }, [refetch]);
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
  return (
    <div className="w-full flex space-x-2 relative ">
      <div className="flex-1">
        <Card id="project">
          <CardHeader>
            <div className={"flex items-center justify-between"}>
              <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Projects desc</CardDescription>
              </div>
              <div className="w-fit h-fit flex items-center justify-center">
                <Circle className="w-16 h-16 text-primary" />
                <h1 className="absolute text-xl text-destructive font-medium">
                  {projects?.length}
                </h1>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="max-h-52">
            <CardContent className="space-y-2">
              {projects?.map((p) => (
                <Card key={p._id}>
                  <CardContent className={"flex items-center justify-between "}>
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
                        onClick={() => editItem(p._id, "project")}
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
            </CardContent>
          </ScrollArea>
        </Card>
      </div>

      <div className="w-60 p-1 flex flex-col space-y-2 bg-muted sticky top0 min-h-[calc(100vh-5rem)]">
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
    </div>
  );
};
export default AdminDashboard;
