"use client";
import ProjectForm from "./ProjectForm";
import QuoteForm from "./QuoteForm";
import { DataContext } from "@hooks/DataContext";
import { useContext } from "react";
const AdminForms = () => {
  const { formToggle } = useContext(DataContext);

  if (formToggle.projectform) return <ProjectForm />;
  if (formToggle.quoteform) return <QuoteForm />;
};
export default AdminForms;
