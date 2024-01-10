"use client";
import { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
