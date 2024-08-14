"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGear, FaPlus } from "react-icons/fa6";

const links = [
  {
    name: "Manage",
    icon: <FaGear size={20} />,
  },
  {
    name: "Create",
    icon: <FaPlus size={20} />,
  },
];

export const NavInstructor = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  const [path, setPath] = useState<string | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 md:ml-4 mt-16 md:mt-28 rounded-lg shadow-lg border-2 border-gray-200 bg-white text-gray-800} ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:w-64 w-80 h-screen pt-6 px-4 transition-transform duration-300 z-20`}
    >
      <div className="flex flex-col h-full">
        {/* Menu Items */}
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`/dashboard/instructor/${link.name.toLowerCase()}`}
              className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-colors duration-200
                ${path === `/dashboard/instructor/${link.name.toLowerCase()}` ? "bg-gray-200" : "hover:bg-gray-200"} 
                ${isMenuOpen ? "text-gray-200 md:hover:bg-gray-600" : "text-gray-800 md:hover:bg-gray-300"}`}
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
