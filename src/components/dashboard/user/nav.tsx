"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBook, FaHistory } from "react-icons/fa";
import { Button } from "@nextui-org/button";

const links = [
  {
    name: "Courses",
    icon: <FaBook size={20} />,
  },
  {
    name: "Histories",
    icon: <FaHistory size={20} />,
  },
];

export const NavUser = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [path, setPath] = useState<string | undefined>(undefined);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 md:ml-4 mt-16 md:mt-28 rounded-lg shadow-lg border-2 border-gray-200 bg-gray-100 ${
        isMenuOpen || isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64  w-80 h-screen pt-6 px-4 bg-white transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`/dashboard/user/${link.name.toLowerCase()}`}
              className={`flex items-center gap-4 px-6 py-3 rounded-lg text-gray-800 transition-colors duration-200
                ${path === `/dashboard/user/${link.name.toLowerCase()}` ? "bg-gray-200 text-gray-800" : "hover:bg-gray-200"} 
                md:text-gray-600 md:hover:bg-gray-300`}
            >
              {link.icon}
              <span className="text-lg font-semibold">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
