"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const ProfileIcon = () => {
  // const [balance, setBalance] = useState<number | null>(null);

  // useEffect(() => {
  //   // Pastikan kode ini hanya dijalankan di sisi browser
  //   if (typeof window !== "undefined") {
  //     const userString = sessionStorage.getItem('user');

  //     if (userString) {
  //       try {
  //         // Parsing userString dan memastikan tipe data balance
  //         const user = JSON.parse(userString);
  //         if (user && typeof user.balance === "number") {
  //           setBalance(user.balance);
  //         } else {
  //           console.warn("Invalid balance data");
  //           setBalance(null);
  //         }
  //       } catch (error) {
  //         console.error("Error parsing user data:", error);
  //         setBalance(null);
  //       }
  //     } else {
  //       console.log("No user data found in sessionStorage");
  //       setBalance(null);
  //     }
  //   }
  // }, [])


  const router = useRouter()

  const logOut = () => {
    deleteCookie("authToken")
    deleteCookie("refreshToken")
    router.replace("/login")
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar isBordered as="button" className="transition-transform" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
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
