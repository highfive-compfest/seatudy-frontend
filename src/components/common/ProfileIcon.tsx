import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";

export const ProfileIcon = () => {
    return (
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="topup" startContent={<FaMoneyBill/>}>
                        <Link href="/topup">   
                                <span>6000</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="profile" startContent={<IoMdPerson/>}>
                        <Link href="/profile">
                                <span>My Profile</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="dashboard" startContent={<MdSpaceDashboard/>}>
                        <Link href="/dashboard/user/courses">
                                <span>Dashboard</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" startContent={<MdLogout/>}>                          
                            <span>Log Out</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
    )
};
