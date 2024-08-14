"use client"
import { getMaterialByCourse } from "@/services/material";
import { useEffect, useState } from "react";
// import { Material } from "@/types/material/material-courseid";
import { FaBook, FaClipboardList } from "react-icons/fa";
import { MdBook } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAssignments } from "./assignment";
import { AssignmentType } from "@/types/assignment/assignment";
import { BsClipboard, BsClipboard2Fill, BsClipboard2MinusFill, BsClipboardFill } from "react-icons/bs";
import { getTimeNow } from "@/utils/utils";
import { ActionAssignButton } from "./action";


export const GetAssignments = () => {
    const {assignments}:any = useAssignments()

    const [assignmentActive, setAssignmentActive] = useState<AssignmentType>()
    
    const pathname = usePathname()

    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
            <h2 className="font-semibold text-2xl">Assignments</h2>
            <div className="mt-2 flex flex-col gap-4">{assignments?.length === 0? <p>there are no assignments yet.</p>:
                assignments?.map((assignment:AssignmentType, idx:number)=>{
                    const options: Intl.DateTimeFormatOptions = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false, // Ubah ke true untuk format 12-jam
                        timeZone: 'UTC' // Ganti dengan zona waktu yang sesuai jika perlu
                      };
                    
                    const due = new Date(assignment.due).toLocaleDateString();
                    const hour = new Date(assignment.due).getHours();
                    const menute = new Date(assignment.due).getMinutes();
                    
                    return(
                        <div key={idx} className="relative">
                            <Link href={`${pathname}/${assignment.id}`} className="hover:bg-gray-200 border-2 border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center">
                                <div className="p-2 bg-blue-500 rounded-full w-fit"><BsClipboard2Fill size={26} color="white"/></div>
                                <div>
                                    <h3 className="font-bold">{assignment.title}</h3>
                                    <small className="block">Due {
                                        `${due} - ${hour}:${menute}`
                                    }</small>
                                </div>
                            </Link>
                            <ActionAssignButton assignmentActive={assignmentActive} assignmentId={assignment.id} setAssignmentActive={setAssignmentActive}/>
                        </div>
                    )
                })
            }</div>
        </div>
    )
};