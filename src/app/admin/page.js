import AdminDashboard from "@components/customComps/AdminDashboard";
import MaxWidthWrapper from "@components/customComps/MaxWidthWrapper";
import TabsPages from "@components/customComps/TabsPages";

const page = () => {
  return (
    <>
      <TabsPages />
      <MaxWidthWrapper>
        <AdminDashboard />
      </MaxWidthWrapper>
    </>
  );
};
export default page;
