import { getStudentProgres } from "@/services/course";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const ProgresBar = ({studentId, courseId}:{studentId:string, courseId:string}) => {
    const [value, setValue] = useState(0)
    const accToken = getCookie("authToken") as string

    useEffect(()=>{
        const getProgress = async () => {
            try {
                const res = await getStudentProgres(courseId, studentId, accToken)
                setValue(res.payload)
                console.log(res.payload)
            } catch (error:any) {
                console.error(error.response)
            }
        }
        getProgress()
    },[studentId])

    return (
        <div className="flex gap-1 mt-1">
            <div className="bg-gray-300 h-4 rounded-full overflow-hidden w-full">
                <div className={`bg-blue-500 h-full w-[${value.toString()}%]`}></div>
            </div>
            <small>{value}%</small>
        </div>
    )
};
