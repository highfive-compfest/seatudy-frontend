"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const ProfileIcon = () => {

  const router = useRouter();
  const [user, setUser] = useState<any>();
  
  useEffect(() => {
    const userString: any = sessionStorage.getItem("user");
    const data = JSON.parse(userString);
    setUser(data);
  }, []);

  const logOut = () => {
    deleteCookie("authToken");
    deleteCookie("refreshToken");
    router.replace("/login");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar isBordered as="button" className="transition-transform" src={user?.image_url} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem textValue="Top Up" as="a" href="/topup" key="topup" startContent={<FaMoneyBill />}>
          <span>{}</span>
        </DropdownItem>
        <DropdownItem textValue="Profile" as="a" href="/dashboard/user/profile" key="profile" startContent={<IoMdPerson />}>
          <span>My Profile</span>
        </DropdownItem>
        <DropdownItem textValue="Dashboard" as="a" href="/dashboard/user/courses" key="dashboard" startContent={<MdSpaceDashboard />}>
          <span>Dashboard</span>
        </DropdownItem>
        <DropdownItem textValue="Log Out" onClick={logOut} key="logout" color="danger" startContent={<MdLogout />}>
          <span>Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
