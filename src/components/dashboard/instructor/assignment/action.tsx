"use client"
import { Dispatch, SetStateAction, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MaterialType } from "@/types/material/material-courseid";
import { deleteAssignment, getAssignmentById } from "@/services/assignment";
import { useAssignments } from "./assignment";
import { AssignmentType } from "@/types/assignment/assignment";
import { EditAssignment } from "./edit-assignment";

interface Type {
    assignmentId : string;
    assignmentActive : AssignmentType|undefined;
    setAssignmentActive : Dispatch<SetStateAction<AssignmentType|undefined>>;
}

export const ActionAssignButton = ({assignmentId, assignmentActive, setAssignmentActive}:Type) => {
    const {getAssignments, setEdit, isEdit, accToken}:any = useAssignments()

    const handleClick = async () => {
        try {
            await deleteAssignment(accToken, assignmentId)
            await getAssignments()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    const getAssignment = async () => {
        const res = await getAssignmentById(assignmentId, accToken)
        setAssignmentActive(res.payload)
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
                        <DropdownItem onClick={getAssignment} startContent={<FiEdit/>} key="edit">Edit</DropdownItem>
                        <DropdownItem startContent={<FaRegTrashAlt/>} onClick={handleClick} key="delete" className="text-danger" color="danger">
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {isEdit && <EditAssignment assignmentActive={assignmentActive}/>}
        </>
    )
};