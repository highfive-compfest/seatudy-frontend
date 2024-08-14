import { getExtFile } from "@/utils/utils";
import { useAssignments } from "../assignment/assignment";
import Link from "next/link";
import { FaFile } from "react-icons/fa6";
import { ActionBtnAssignAttach } from "./action";
import { AssignmentType } from "@/types/assignment/assignment";
import { AddAssignAttach } from "./add-attachment";

export const Attachments = ({assignment}:{assignment:AssignmentType}) => {
    
    return (
        <>
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
        </>
    )
};
