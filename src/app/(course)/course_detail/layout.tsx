import React, { ReactNode, Suspense } from "react";
import Navbar from "@/components/common/main-navbar";
import Footer from "@/components/common/main-footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24 px-8">
        <Suspense fallback={<></>}>{children}</Suspense>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
