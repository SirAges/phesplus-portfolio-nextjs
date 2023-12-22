"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getAllCategory, getAllSubCategory } from "@lib/sanityActions";
import { useState, useEffect } from "react";

import toast, { useToasterStore } from "react-hot-toast";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Form from "./Form";
const ProjectForm = () => {
  const [loading, setLoading] = useState(false);

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
          return toast.error("No category");
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

  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    category: "",
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
      id: "description",
      name: "description",
      type: "text",
      placeholder: "description",
      label: "Description",
    },
    {
      id: "price",
      name: "price",
      type: "number",
      placeholder: "price",
      label: "Price",
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
      id: "category",
      name: "category",
      type: "text",
      placeholder: "category",
      label: "Category",
    },
  ];

  const chooseCategory = (item, type) => {
    if (type === "cat") {
      setValues((prev) => ({ ...prev, category: item._id }));
      setTrigger((prev) => ({ ...prev, cat: item.category }));
    }
  };
  const onSubmit = async () => {
    if (values.title.length === 0) {
      toast.error("Please Add Your title");
    } else if (values.description.length === 0) {
      toast.error("Please Choose Your description");
    } else if (values.price.length === 0) {
      toast.error("Please Choose Your Sub price");
    } else if (values.images.length === 0) {
      toast.error("Please Add A images");
    } else if (values.category.length === 0) {
      toast.error("Please Add An category");
    } else {
      try {
        setLoading(true);
        const mutate = await createQuote(values, user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Form
        formValues={formValues}
        values={values}
        setValues={setValues}
        chooseCategory={chooseCategory}
        onSubmit={onSubmit}
        trigger={trigger}
        category={category}
        subCategory={null}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};
export default ProjectForm;
