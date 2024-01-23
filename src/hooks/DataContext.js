"use client";
import {
  getAllCategory,
  getAllProjects,
  getAllQuotes,
  getAllSubCategory,
  getUser,
} from "@lib/sanityActions";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [userQuotes, setUserQuotes] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState({ state: true, load: "" });
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [formToggle, setFormToggle] = useState({
    quoteform: false,
    projectform: false,
  });
  const [mainToggle, setMainToggle] = useState({
    projectlist: true,
    quotelist: false,
    catlist: false,
  });

  const [projectValues, setProjectValues] = useState({
    title: "",
    description: "",
    link: "",
    price: "",
    images: [],
    category: "",
    action: "create",
  });
  const [quoteValues, setQuoteValues] = useState({
    title: "",
    country: "",
    category: "",
    subCategory: "",
    budget: 0,
    images: [],
    notes: "",
    action: "create",
  });
  const [qOthers, setQOthers] = useState({
    status: "pending",
    paid: false,
  });

  const loadFalse = (load) => {
    setLoading({ state: false, load });
  };
  const loadTrue = (load) => {
    setLoading({ state: true, load });
  };

  const previousProjects = () => {
    setStart((prev) => prev - 8);
    setEnd((prev) => prev - 8);
    router.refresh();
  };
  const nextProjects = () => {
    setStart((prev) => prev + 8);
    setEnd((prev) => prev + 8);
    router.refresh();
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategory = async () => {
      try {
        loadTrue("all");
        const data = await getAllCategory();
        const subdata = await getAllSubCategory();
        const projectdata = await getAllProjects(start, end);
        const quotedata = await getAllQuotes();
        const userdata = await getUser(user.id);
        const userquotedata = await getAllQuotes(user.id);

        if (
          data === null ||
          data === undefined ||
          subdata === null ||
          subdata === undefined ||
          projectdata === null ||
          projectdata === undefined ||
          quotedata === null ||
          quotedata === undefined ||
          projectdata === undefined ||
          userquotedata === null ||
          userquotedata === undefined ||
          userdata === null ||
          userdata === undefined
        ) {
          return toast.error("Unable to fetch some data");
        } else {
          if (data === null || data === undefined) {
            setEnd((prev) => prev - 8);
          }
          setCategory(data);
          setSubCategory(subdata);
          setProjects(projectdata);
          setQuotes(quotedata);
          setUserQuotes(userquotedata);
        }
      } catch (error) {
        console.error("Error fetching category:", error.message);
      } finally {
        loadFalse("");
      }
    };

    fetchCategory();

    return () => {
      // Cancel the ongoing network request
      abortController.abort();
    };
  }, [refetch, start, end]);

  return (
    <DataContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        formToggle,
        setFormToggle,
        mainToggle,
        setMainToggle,
        projectValues,
        setProjectValues,
        quoteValues,
        setQuoteValues,
        quoteValues,
        setQuoteValues,
        qOthers,
        setQOthers,
        category,
        setCategory,
        subCategory,
        setSubCategory,
        projects,
        setProjects,
        quotes,
        setQuotes,
        refetch,
        setRefetch,
        loading,
        setLoading,
        start,
        setStart,
        end,
        setEnd,
        loadFalse,
        loadTrue,
        previousProjects,
        userQuotes,
        nextProjects,
        user,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
