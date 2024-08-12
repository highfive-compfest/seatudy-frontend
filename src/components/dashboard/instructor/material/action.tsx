"use client"
import { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { deleteMaterial } from "@/services/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const ActionButton = ({materiId}:{materiId:string}) => {

    const router = useRouter()

    const accToken = getCookie("authToken") as string;

    const handleClick = async () => {
        try {
            await deleteMaterial(accToken, materiId)
            location.reload()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    return (
        <div className="absolute right-4 top-0 bottom-0 h-full flex items-center">
            <Dropdown>
                <DropdownTrigger className="outline-none">
                    <button className="h-fit p-2 hover:bg-gray-200 rounded-full">
                        <HiOutlineDotsVertical size={20}/>
                    </button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Action event example" 
                    variant="flat"
                >
                    <DropdownItem startContent={<FiEdit/>} key="edit">Edit</DropdownItem>
                    <DropdownItem startContent={<FaRegTrashAlt/>} onClick={handleClick} key="delete" className="text-danger" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
};
