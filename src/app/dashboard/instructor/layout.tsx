"use client";
import Footer from "@/components/common/main-footer";
import { NavInstructor } from "@/components/dashboard/instructor/course/nav";
import { HeaderUser } from "@/components/dashboard/user/header";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      <HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex flex-1 overflow-hidden">
        <NavInstructor isMenuOpen={isMenuOpen} />
        <main className="flex-1 px-4 md:px-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
