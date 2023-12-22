"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  createQuote,
  getAllCategory,
  getAllSubCategory,
} from "@lib/sanityActions";
import { useState, useEffect } from "react";

import toast, { useToasterStore } from "react-hot-toast";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Form from "./Form";

const QuoteForm = () => {
  const { user } = useKindeBrowserClient();

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

  const [trigger, setTrigger] = useState({
    cat: "",
    sub: "",
  });
  const [submitting, setSubmitting] = useState(false);
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

  const chooseCategory = (item, type) => {
    if (type === "cat") {
      setValues((prev) => ({ ...prev, category: item._id }));
      setTrigger((prev) => ({ ...prev, cat: item.category }));
    } else {
      setValues((prev) => ({ ...prev, subCategory: item._id }));
      setTrigger((prev) => ({ ...prev, sub: item.subCategory }));
    }
  };
  const onSubmit = async () => {
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
      try {
        setSubmitting(true);
        const mutate = await createQuote(values, user);
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
        toast.success("Quote Submitted Successfully");
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
        subCategory={subCategory}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        submitting={submitting}
      />
    </>
  );
};
export default QuoteForm;
