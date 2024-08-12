"use client"
import { Dispatch, SetStateAction, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { deleteMaterial, getMaterialById } from "@/services/material";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useMaterials } from "./material";
import { EditMaterial } from "./form-edit-material";
import { MaterialType } from "@/types/material/material-courseid";

interface Type {
    materiId : string;
    materiActive : MaterialType|undefined;
    setMateriActive : Dispatch<SetStateAction<MaterialType|undefined>>;
}

export const ActionButton = ({materiId, materiActive, setMateriActive}:Type) => {
    const {getMaterials, setEdit}:any = useMaterials()

    const accToken = getCookie("authToken") as string;

    const handleClick = async () => {
        try {
            await deleteMaterial(accToken, materiId)
            await getMaterials()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    const getMateri = async () => {
        const res = await getMaterialById(materiId)
        setMateriActive(res.payload)
        setEdit(true)
    }

    return (
        <>
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
                        <DropdownItem  onClick={getMateri} startContent={<FiEdit/>} key="edit">Edit</DropdownItem>
                        <DropdownItem startContent={<FaRegTrashAlt/>} onClick={handleClick} key="delete" className="text-danger" color="danger">
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <EditMaterial materiActive={materiActive}/>
        </>
    )
};
