import MaxWidthWrapper from "@components/customComps/MaxWidthWrapper";
import AllProjects from "@components/customComps/AllProjects";
import { getAllProjects } from "@lib/sanityActions";

const page = () => {
  return (
    <MaxWidthWrapper className={"py-5"}>
      <h1 className="text-2xl text-primary font-medium my-3">
        My Design Projects
      </h1>
      <AllProjects />
    </MaxWidthWrapper>
  );
};
export default page;
