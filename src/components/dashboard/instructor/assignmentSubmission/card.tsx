"use client"
import { updateGrade } from "@/services/submission";
import { getUserById } from "@/services/user";
import { SubmissionType } from "@/types/submission/submission";
import { UserPayload } from "@/types/user/user";
import { getExtFile, optionsDate } from "@/utils/utils";
import { Avatar } from "@nextui-org/avatar";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { FaFile } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

export const CardSubmission = ({submission, getSubmissions}:{submission: SubmissionType, getSubmissions: ()=>void}) => {

    const accToken = getCookie("authToken") as string;

    const [student, setStudent] = useState<UserPayload>()
    const [grade, setGrade] = useState<string>(submission.grade)
    const [isActive, setActive] = useState("")

    useEffect(()=>{
        const getStudent = async () => {
            const res = await getUserById(submission.user_id)
            setStudent(res.payload)
        }
        getStudent()
    },[submission])

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setGrade(event.target.value)
    }

    const handleActive = () => {
        if (isActive === submission.id) {
            setActive("")
        } else {
            setActive(submission.id)
        }
    }

    const handleSubmit = async (event:FormEvent) => {
        try {
            event.preventDefault()
            const newGrade = parseFloat(grade)
            const res = await updateGrade(submission.id,newGrade, accToken)
            getSubmissions()
            console.log(res)
        } catch (error:any) {
            console.error(error.response)
        }
    }

    const created = new Date(submission.created_at).toLocaleDateString(undefined, optionsDate);
    const updated = new Date(submission.updated_at).toLocaleDateString(undefined, optionsDate);
    const createdDate = new Date(submission.created_at).toLocaleDateString();
    const updatedDate = new Date(submission.updated_at).toLocaleDateString();

    return (
        <div className="bg-gray-200 py-2 px-4 rounded-lg">
            {student && <button onClick={handleActive} className="flex gap-4 items-center justify-between w-full">
                <div className="flex gap-4 items-center">
                    <Avatar isBordered src={student.image_url}/>
                    <div>
                        <h3 className="text-md font-bold w-fit">{student.name}</h3>
                        <small className="block w-fit">{
                            created !== updated?
                            `${updatedDate} (updated)`:
                            createdDate
                        }</small>
                    </div>
                </div>
                <IoIosArrowBack className={`${isActive===submission.id?"-rotate-90":"rotate-0"} duration-250`} size={20}/>
            </button>}
            <div className={`${isActive===submission.id?"h-fit mb-2":"h-0"} overflow-hidden border-t-1 mt-4 border-black`}>
                {submission.attachments.map((attach, idx)=>{
                    const extFile = getExtFile(attach.url)
                    return (
                        <div key={idx}>
                            <Link className="p-4 rounded-lg bg-gray-200 w-fit text-blue-600 flex flex-col items-center gap-2" href={attach.url}>
                                <FaFile size={30}/>
                                <small>file .{extFile}</small>
                            </Link>
                            <p>{submission.content}</p>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={handleSubmit} className={`${isActive===submission.id?"border-t-1":"border-t-0"} border-black pt-2`}>
                <label htmlFor="grade">Grade : </label>
                <input 
                    className="w-12 outline-none appearance-none bg-inherit border-black border-b-2" 
                    id="grade" 
                    value={grade} 
                    min={0} 
                    max={100} 
                    onChange={handleChange} 
                    type="number"/>
                <label htmlFor="grade">/100</label>
            </form>
        </div>
    )
};
