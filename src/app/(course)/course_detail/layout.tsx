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
      <div className="container pt-24 px-2 lg:px-8 bg-gradient-to-br from-blue-100 to-blue-50">
        <Suspense fallback={<></>}>{children}</Suspense>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
