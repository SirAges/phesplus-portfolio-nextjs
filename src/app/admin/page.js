import AdminDashboard from "@components/customComps/AdminDashboard";
import AdminForms from "@components/customComps/AdminForms";
import TabsPages from "@components/customComps/TabsPages";
import { cn } from "@lib/utils";

const page = () => {
  return (
    <div className="h-screen">
      <TabsPages />

      <div
        className={cn(
          "pb-5 pt-2 px-2 flex-1 w-full flex md:space-x-2 justify-center"
        )}
      >
        <AdminForms />
        <AdminDashboard />
      </div>
    </div>
  );
};
export default page;
