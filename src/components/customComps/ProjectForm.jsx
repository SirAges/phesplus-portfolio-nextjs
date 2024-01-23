"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createProject,
  getAllCategory,
  updateProject,
} from "@lib/sanityActions";
import { useState, useEffect, useContext } from "react";

import toast, { useToasterStore } from "react-hot-toast";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Form from "./Form";
import { DataContext } from "@hooks/DataContext";
export const revalidate = 0;
const ProjectForm = () => {
  const { projectValues, setProjectValues } = useContext(DataContext);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useKindeBrowserClient();

  const validator = z.object({
    title: z.string().min(3, { message: "must be more than 3 characters" }),
    description: z
      .string()
      .min(3, { message: "must be more than 3 characters" }),
    price: z.number(),
    images: z.array().min(1, { message: "must be more than 8 characters" }),
    category: z.string().min(8, { message: "must be more than 8 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validator),
  });

  const [trigger, setTrigger] = useState({
    cat: "",
    sub: "",
  });
  const [category, setCategory] = useState([]);
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
        if (data === null || data === undefined) {
          return toast.error(
            "Unable to fetch product categories check your INTERNET CONNECTION"
          );
        } else {
          setCategory(data);
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

  const formValues = [
    {
      id: "title",
      name: "title",
      type: "text",
      placeholder: "3d Logo Design",
      label: "Title",
    },
    {
      id: "description",
      name: "description",
      type: "text",
      placeholder: "e.g: Ali B logo design",
      label: "Description",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "$200",
      label: "Price",
    },
    {
      id: "link",
      name: "link",
      type: "text",
      placeholder: "e.g: http://example.com",
      label: "Link",
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
  ];

  const chooseCategory = (item, type) => {
    if (type === "cat") {
      setProjectValues((prev) => ({ ...prev, category: item._id }));
      setTrigger((prev) => ({ ...prev, cat: item.category }));
    }
  };
  const onSubmit = async () => {
    if (projectValues.title.length === 0) {
      toast.error("Please Add Your title");
    } else if (projectValues.description.length === 0) {
      toast.error("Please Choose Your description");
    } else if (projectValues.price.length === 0) {
      toast.error("Please Choose Your price");
    } else if (projectValues.images.length === 0) {
      toast.error("Please Add A images");
    } else if (projectValues.category.length === 0) {
      toast.error("Please Add An category");
    } else {
      try {
        setSubmitting(true);
        if (projectValues.action === "create") {
          const mutate = await createProject(projectValues, "Created");
          toast.success("Project Created");
        } else {
          const mutate = await updateProject(projectValues, "Edited");
          setProjectValues({
            title: "",
            description: "",
            link: "",
            price: "",
            images: [],
            category: "",
            action: "create",
          });
        }
        toast.success("Project Edited");
      } catch (error) {
        toast.error(`An error occured \n Message ${error.message}`);
      } finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <Form
      formValues={formValues}
      values={projectValues}
      setValues={setProjectValues}
      chooseCategory={chooseCategory}
      onSubmit={onSubmit}
      submitting={submitting}
      trigger={trigger}
      category={category}
      subCategory={null}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      formTitle={"Project Form"}
      formDescription={
        projectValues.action === "create"
          ? `${projectValues.action} a new Project`
          : `${projectValues.action} your Project`
      }
    />
  );
};
export default ProjectForm;
