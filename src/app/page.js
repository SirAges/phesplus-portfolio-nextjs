import Loading from "@components/customComps/Loading";
import { redirect } from "next/navigation";

const HomePage = () => {
  redirect("/dashboard");
  return <Loading />;
};
export default HomePage;
