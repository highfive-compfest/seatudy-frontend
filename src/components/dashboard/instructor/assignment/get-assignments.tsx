"use client"
import { getMaterialByCourse } from "@/services/material";
import { useEffect, useState } from "react";
// import { Material } from "@/types/material/material-courseid";
import { FaBook } from "react-icons/fa6";
import { MdBook } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAssignments } from "./assignment";
import { AssignmentType } from "@/types/assignment/assignment";


export const GetAssignments = () => {
    const {assignments}:any = useAssignments()

    const [assignmentActive, setAssignmentActive] = useState<AssignmentType>()
    
    const pathname = usePathname()
1
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
                    
                    const created = new Date(assignment.created_at).toLocaleDateString(undefined, options);
                    const updated = new Date(assignment.updated_at).toLocaleDateString(undefined, options);
                    const createdDate = new Date(assignment.created_at).toLocaleDateString();
                    const updatedDate = new Date(assignment.updated_at).toLocaleDateString();
                    
                    return(
                        <div key={idx} className="relative">
                            <Link href={`${pathname}/${assignment.id}`} className="hover:bg-gray-200 border-2 border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center">
                                <div className="p-2 bg-blue-500 rounded-full w-fit"><MdBook size={26} color="white"/></div>
                                <div>
                                    <h3 className="font-bold">{assignment.title}</h3>
                                    <small className="block">{
                                        created !== updated?
                                        `${updatedDate} (updated)`:
                                        createdDate
                                    }</small>
                                </div>
                            </Link>
                            {/* <ActionButton materiActive={materiActive} setMateriActive={setMateriActive} materiId={materi.id}/> */}
                        </div>
                    )
                })
            }</div>
        </div>
    )
};