"use client";
import Footer from "@/components/common/main-footer";
import { HeaderUser } from "@/components/dashboard/user/header";
import { NavUser } from "@/components/dashboard/user/nav";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col h-screen md:bg-gray-100">
      <HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="flex flex-1 overflow-hidden">
        <NavUser isMenuOpen={isMenuOpen} />
        <main className="flex-1 px-4 md:px-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
