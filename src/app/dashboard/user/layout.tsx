"use client"
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
    <>
      <HeaderUser isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <div className="flex">
        <NavUser isMenuOpen={isMenuOpen}/>
        {children}
      </div>
    </>
  )
}