import { deleteMateriAttach, getMaterialAttachById } from "@/services/material";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useMaterialAttach } from "@/context/material-attach";
import { useAssignAttach } from "@/context/assignment-attach";
import { EditAssignAttach } from "./form-edit";

export const ActionBtnAssignAttach = ({attachId}:{attachId:string}) => {

    const {getAssign, accToken, isActive, setActive, setAttachActive}:any = useAssignAttach()

    const deleteAttach = async () => {
        try {
            await deleteMateriAttach(accToken, attachId)
            await getAssign()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    const editAttach = async () => {
        const res = await getMaterialAttachById(attachId)
        setAttachActive(res.payload)
        setActive("edit")
    }

    return (
        <>
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
                    <DropdownItem onClick={editAttach} startContent={<FiEdit/>} key="edit">Edit</DropdownItem>
                    <DropdownItem onClick={deleteAttach} startContent={<FaRegTrashAlt/>} key="delete" className="text-danger" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {isActive === "edit" && <EditAssignAttach/>}
        </>
    )
};