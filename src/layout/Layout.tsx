import { ReactNode } from "react";
import Header from "components/organisms/Header";
import Footer from "components/organisms/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="smLaptop:pt-[53px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
