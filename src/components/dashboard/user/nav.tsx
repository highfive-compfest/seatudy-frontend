"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBook, FaHistory } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { FaMessage, FaPerson, FaStar } from "react-icons/fa6";

const links = [
  {
    name: "Courses",
    icon: <FaBook size={20} />,
  },
  {
    name: "Histories",
    icon: <FaHistory size={20} />,
  },
  {
    name: "Reviews",
    icon: <FaStar size={20} />,
  },
  {
    name: "Discussions",
    icon: <FaMessage size={20} />,
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
      className={`fixed top-0 left-0 md:ml-4 mt-16 md:mt-28 rounded-lg shadow-lg border-2 border-gray-200 bg-white text-gray-800"} ${
        isMenuOpen || isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64 w-80 h-screen pt-6 px-4 transition-transform duration-300 z-40`}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`/dashboard/student/${link.name.toLowerCase()}`}
              className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-colors duration-200
                ${path === `/dashboard/student/${link.name.toLowerCase()}` ? "bg-gray-200" : "hover:bg-gray-600"} 
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
