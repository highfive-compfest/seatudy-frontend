"use client"
import { getAllUserBuyCourse } from "@/services/course"
import { UserPayload } from "@/types/user/user"
import { Avatar } from "@nextui-org/avatar"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { ProgresBar } from "./progress"

export const StudentEnroll = ({courseId}:{courseId:string}) => {
    const accToken = getCookie("authToken") as string;
    const [students, setStudents] = useState<UserPayload[]>()

    useEffect(()=>{
        const getStudents = async () => {
            try {
                const res = await getAllUserBuyCourse(courseId, accToken)
                setStudents(res.payload)
            } catch (error:any) {
                console.log(error.response)
            }
        }
        getStudents()
    },[courseId])

    return (
        <div className="min-h-[20rem]">
            <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <h2>You have : {students?.length} student</h2>
                <div className="flex gap-4 mt-4">
                {students?.length===0?<p>You don&apos;t have any students yet.</p>:students&&students.map((student, idx)=>(
                    <div key={idx} className="p-4 bg-gray-200 rounded-lg shadow-md w-full max-w-[20rem]">
                        <div className="flex items-center gap-2 border-black border-b-2 pb-2">
                            <Avatar src={student.image_url} isBordered/>
                            <div>
                                <h3 className="truncate">{student.name}</h3>
                                <small className="truncate">{student.email}</small>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span>progress</span>
                            <ProgresBar courseId={courseId} studentId={student.id}/>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}