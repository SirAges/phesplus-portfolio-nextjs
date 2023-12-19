import MaxWidthWrapper from "@components/customComps/MaxWidthWrapper";
import Project from "@components/customComps/Project";

const page = ({ params }) => {
  const id = params.id;
  return (
    <MaxWidthWrapper>
      <Project id={id} />
    </MaxWidthWrapper>
  );
};
export default page;
