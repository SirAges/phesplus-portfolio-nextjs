import MaxWidthWrapper from "@components/customComps/MaxWidthWrapper";
import Project from "@components/customComps/Project";
import { getProject } from "@lib/sanityActions";
import { useParams } from "next/navigation";

const page = ({ params }) => {
  const id = params.id;
  return (
    <MaxWidthWrapper>
      <Project id={id} />
    </MaxWidthWrapper>
  );
};
export default page;
