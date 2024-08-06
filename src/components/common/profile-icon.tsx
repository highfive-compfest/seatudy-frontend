import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const ProfileIcon = () => {

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
            <span>6000</span>
        </DropdownItem>
        <DropdownItem textValue="Profile" as="a" href="/profile" key="profile" startContent={<IoMdPerson />}>
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
