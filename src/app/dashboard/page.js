import AllProjects from "@components/customComps/AllProjects";
import HeroBanner from "@components/customComps/HeroBanner";
import MaxWidthWrapper from "@components/customComps/MaxWidthWrapper";

const Dashboard = () => {
  return (
    <>
      <HeroBanner />
      <MaxWidthWrapper>
        <AllProjects />
      </MaxWidthWrapper>
    </>
  );
};
export default Dashboard;
