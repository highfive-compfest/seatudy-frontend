"use client";
import Footer from "@/components/common/main-footer";
import { NavInstructor } from "@/components/dashboard/instructor/nav";
import { HeaderUser } from "@/components/dashboard/user/header";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex h-full">
        <NavInstructor isMenuOpen={isMenuOpen} />
        <div className="px-4 md:px-8 w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}
