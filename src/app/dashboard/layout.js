import Footer from "@components/customComps/Footer";
import Header from "@components/customComps/Header";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function DashLayout({ children }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col flex-1 ">{children}</div>
      <Footer />
    </section>
  );
}
