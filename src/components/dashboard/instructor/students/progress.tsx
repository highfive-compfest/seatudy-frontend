// import { getStudentProgres } from "@/services/course";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const ProgresBar = ({studentId, courseId}:{studentId:string, courseId:string}) => {
    const [value, setValue] = useState(0)
    const [id, setId] = useState("")
    const accToken = getCookie("authToken") as string

    // useEffect(()=>{
    //     const getProgress = async () => {
    //         try {
    //             const res = await getStudentProgres(courseId, studentId, accToken)
    //             setValue(res.payload)
    //             console.log(res.payload)
    //         } catch (error:any) {
    //             console.error(error.response)
    //         }
    //     }
    //     getProgress()
    // },[studentId])

    console.log(value)

    return (
        <div className="flex gap-1">
            <div className="bg-gray-300 h-4 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[20rem]"></div>
            </div>
            <small>{value}%</small>
        </div>
    )
};
