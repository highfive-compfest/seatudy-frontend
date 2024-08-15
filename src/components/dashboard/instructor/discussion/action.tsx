"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MaterialType } from "@/types/material/material-courseid";
import { useDiscussions } from "./discussion";
import { deleteDiscussion } from "@/services/discussion";
import { Discussion } from "@/types/discussion/discussion";
import { EditDiscus } from "./edit-discus";

interface Type {
  discusId: string;
  materiActive: MaterialType | undefined;
  setMateriActive: Dispatch<SetStateAction<MaterialType | undefined>>;
}

export const ActionDiscusButton = ({ discusId }: { discusId: string }) => {
  const { getDiscussions, setEdit, accToken }: any = useDiscussions();
  const [discusActive, setDiscusActive] = useState<Discussion>();

  const handleClick = async () => {
    try {
      await deleteDiscussion(discusId, accToken);
      await getDiscussions();
    } catch (error: any) {
      console.error(error.response);
    }
  };

  const getDiscus = async () => {
    // const res = await getDiscusById(discusId);
    // setDiscusActive(res.payload);
    setEdit(true);
  };

  return (
    <>
      <div className="absolute right-4 top-4 flex items-center">
        <Dropdown>
          <DropdownTrigger className="outline-none">
            <button className="h-fit p-2 hover:bg-gray-200 rounded-full">
              <HiOutlineDotsVertical size={20} />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Action event example" variant="flat">
            <DropdownItem onClick={getDiscus} startContent={<FiEdit />} key="edit">
              Edit
            </DropdownItem>
            <DropdownItem startContent={<FaRegTrashAlt />} onClick={handleClick} key="delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {discusActive && <EditDiscus discusActive={discusActive} />}
    </>
  );
};
