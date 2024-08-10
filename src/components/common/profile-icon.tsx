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
    router.replace("/login");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar isBordered as="button" className="transition-transform" src={user?.image_url || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem textValue="Profile" as="a" href={`/dashboard/${user?.role}/profile`} key="profile" startContent={<IoMdPerson />}>
          <span>My Profile</span>
        </DropdownItem>
        <DropdownItem textValue="Dashboard" as="a" href={`/dashboard/${user?.role}/${user?.role === "student" ? "courses" : "manage"}`} key="dashboard" startContent={<MdSpaceDashboard />}>
          <span>Dashboard</span>
        </DropdownItem>
        <DropdownItem textValue="Top Up" as="a" href="/topup" key="topup" startContent={<FaMoneyBill />}>
          <span>Balance</span>
        </DropdownItem>
        <DropdownItem textValue="Log Out" onClick={logOut} key="logout" color="danger" startContent={<MdLogout />}>
          <span>Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
