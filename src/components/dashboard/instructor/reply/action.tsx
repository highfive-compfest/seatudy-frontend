import { deleteMateriAttach, getMaterialAttachById } from "@/services/material";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useReply } from "@/context/reply";
import { deleteReply } from "@/services/discussion";
import { Dispatch, SetStateAction } from "react";

interface Type {
    replyId : string;
    setEdit : Dispatch<SetStateAction<string>>;
}

export const ActionBtnReply = ({replyId, setEdit}:Type) => {

    const {getReplies, accToken, isActive, setActive, setReplyctive}:any = useReply()

    const handleDelete = async () => {
        try {
            await deleteReply(replyId, accToken)
            await getReplies()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    // const editAttach = async () => {
    //     const res = await getMaterialAttachById(attachId)
    //     setAttachActive(res.payload)
    //     setActive("edit")
    // }

    return (
        <>
            <Dropdown>
                <DropdownTrigger className="outline-none">
                    <button className="h-fit p-2 hover:bg-gray-300 rounded-full">
                        <HiOutlineDotsVertical size={20}/>
                    </button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Action event example" 
                    variant="flat"
                >
                    <DropdownItem onClick={()=>setEdit(replyId)} startContent={<FiEdit/>} key="edit">Edit</DropdownItem>
                    <DropdownItem onClick={handleDelete} startContent={<FaRegTrashAlt/>} key="delete" className="text-danger" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
};