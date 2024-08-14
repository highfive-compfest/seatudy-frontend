"use client"
import { ActionBtnAssignAttach } from "@/components/dashboard/instructor/assignmentAttachment/action"
import { AddAssignAttach } from "@/components/dashboard/instructor/assignmentAttachment/add-attachment"
import { ActionBtnAttach } from "@/components/dashboard/instructor/materialAttachment/action"
import { AddMateriAttach } from "@/components/dashboard/instructor/materialAttachment/add-attachment"
import { AssignProvider } from "@/context/assignment-attach"
import { MaterialProvider } from "@/context/material-attach"
import { getAssignmentById } from "@/services/assignment"
import { getMaterialById } from "@/services/material"
import { AssignmentType } from "@/types/assignment/assignment"
import { MateriAttach } from "@/types/material/materi-attach"
import { MaterialType } from "@/types/material/material-courseid"
import { getExtFile, getSegment } from "@/utils/utils"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BsClipboard2Fill } from "react-icons/bs"
import { FaFile } from "react-icons/fa6"
import { MdBook } from "react-icons/md"

const MaterialPage = () => {
  const accToken = getCookie("authToken") as string;
  const [assignment, setAssignment] = useState<AssignmentType>();
  const [isActive, setActive] = useState("");
  const pathname = usePathname();
  const assignmentId = getSegment(pathname, 6);
  const [attachActive, setAttachActive] = useState<MateriAttach>()

  const getAssign = async () => {
    const res = await getAssignmentById(assignmentId, accToken);
    setAssignment(res.payload);
  };

    useEffect(()=>{
        getAssign()
    },[])
    
    useEffect(()=>{
        console.log(assignment)
    },[assignment])

    if (assignment) return (
        <AssignProvider value={{getAssign, isActive, setActive, accToken, assignmentId, attachActive, setAttachActive}}>
            <section className="p-4 mt-28 max-w-[53rem] mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex items-center gap-4 border-black pb-4 border-b-2">
                    <div className="p-2 bg-blue-500 rounded-full w-fit"><BsClipboard2Fill size={26} color="white"/></div>
                    <div>
                        <h1 className="font-bold text-3xl">{assignment.title}</h1>
                        <small>created at {new Date(assignment.created_at).toLocaleDateString()}</small>
                        <small className="block">update at {new Date(assignment.updated_at).toLocaleDateString()}</small>
                        <small className="block">due {
                            `${new Date(assignment.due).toLocaleDateString()} - ${new Date(assignment.due).getHours()}:${new Date(assignment.due).getMinutes()}`
                        }</small>
                    </div>
                </div>
                <div className="border-black pb-4 border-b-2">
                    <h2 className="mt-4 mb-1 text-xl font-bold">Description</h2>
                    <p className="text-justify">{assignment.description}</p>
                </div>
                <h2 className="mt-4 mb-1 text-xl font-bold">Attachments</h2>
                <AddAssignAttach/>
                <div className="flex flex-col gap-3">
                    {assignment.attachments.length === 0?<p>there are no attachments yet.</p>:
                        assignment.attachments.map((content, idx)=>{
                            const extFile = getExtFile(content.url)
                            return (
                                <div className="border-2 p-4" key={idx}>
                                    <div className="flex justify-between">
                                        <Link className="p-4 rounded-lg bg-gray-200 w-fit text-blue-600 flex flex-col items-center gap-2" href={content.url}>
                                                <FaFile size={30}/>
                                                <small>file .{extFile}</small>
                                        </Link>
                                        <ActionBtnAssignAttach attachId={content.id}/>
                                    </div>
                                    <p className="mt-2">{content.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </AssignProvider>
    )
}

export default MaterialPage;