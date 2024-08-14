"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getMe } from "@/services/user";
import { UserPayload } from "@/types/user/user";

export const ProfileIcon = () => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const router = useRouter();
  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accToken) {
        console.error("No authentication token found.");
        alert("No authentication token found. Please log in again.");
        router.push("/login");
        return;
      }

      try {
        const userData = await getMe(accToken);
        setUser(userData.payload);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data. Please try again.");
      }
    };

    fetchUserData();
  }, [accToken, router]);

  const logOut = () => {
    deleteCookie("authToken");
    deleteCookie("refreshToken");
    deleteCookie("userId");
    deleteCookie("userRole");
    alert("Logout successful");
    router.replace("/login");
  };

  const getDropdownItems = (role: string | undefined) => {
    switch (role) {
      case "instructor":
        return [
          {
            textValue: "Profile",
            href: `/dashboard/${role}/profile`,
            icon: <IoMdPerson />,
            label: "My Profile",
          },
          {
            textValue: "Dashboard",
            href: `/dashboard/${role}/manage`,
            icon: <MdSpaceDashboard />,
            label: "Dashboard",
          },
          {
            textValue: "Log Out",
            onClick: logOut,
            icon: <MdLogout />,
            label: "Log Out",
            color: "danger",
          },
        ];
      case "student":
        return [
          {
            textValue: "Profile",
            href: `/dashboard/${role}/profile`,
            icon: <IoMdPerson />,
            label: "My Profile",
          },
          {
            textValue: "Dashboard",
            href: `/dashboard/${role}/courses`,
            icon: <MdSpaceDashboard />,
            label: "Dashboard",
          },
          {
            textValue: "Top Up",
            href: "/topup",
            icon: <FaMoneyBill />,
            label: "Balance",
          },
          {
            textValue: "Log Out",
            onClick: logOut,
            icon: <MdLogout />,
            label: "Log Out",
            color: "danger",
          },
        ];
      default:
        return [
          {
            textValue: "Profile",
            href: "/dashboard/profile",
            icon: <IoMdPerson />,
            label: "My Profile",
          },
          {
            textValue: "Log Out",
            onClick: logOut,
            icon: <MdLogout />,
            label: "Log Out",
            color: "danger",
          },
        ];
    }
  };

  const dropdownItems = getDropdownItems(user?.role);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar isBordered as="button" className="transition-transform" src={user?.image_url || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {dropdownItems.map((item, index) => (
          <DropdownItem key={index} textValue={item.textValue} as={item.href ? "a" : undefined} href={item.href} onClick={item.onClick} startContent={item.icon}>
            <span>{item.label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
