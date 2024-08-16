"use client"
import React, { useEffect, useState } from "react";
import { createAssignment } from "@/services/assignment";
import { useAssignments } from "./assignment";
import { getTimeNow } from "@/utils/utils";
import { Spinner } from "@nextui-org/spinner";

export const AssignmrntForm = () => {

    const {courseId, getAssignments, accToken}:any = useAssignments()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course_id: courseId,
        due:''
      });

    const [info, setInfo] = useState("")
    const [timeNow, setTimeNow] = useState("")
    const [isPending, setPending] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        setPending(true)
        try {
            event.preventDefault()
            const dueISO = new Date(formData.due).toISOString()
            const updatedFormData = {
                ...formData,
                due: dueISO,
            };
            const res = await createAssignment(updatedFormData, accToken)
            setInfo(res.message)
            await getAssignments()
            const target = event.target as HTMLFormElement
            target.reset();
        } catch (error:any) {
            console.error(error.response)
        } finally {
            setPending(false)
        }
    }

    useEffect(()=>{
        const now = getTimeNow()
        setTimeNow(now)
    },[])

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Create Assignment</h2>
                <input
                    name="title"
                    required
                    onChange={handleChange} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" 
                    placeholder="Title" 
                    type="text"/>
                <textarea
                    name="description"
                    required
                    onChange={handleChange}
                    rows={6} 
                    placeholder="Description" 
                    className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                <div>
                    <label className="text-gray-400" htmlFor="due">Due</label>
                    <input
                        required
                        onChange={handleChange}
                        id="due"
                        type="datetime-local"
                        name="due"
                        min={timeNow}
                        className="block w-full border-2 outline-none p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        />
                </div>
                <p>{info}</p>
                {isPending?<div className="flex justify-center"><Spinner/></div>:<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Create Assignment
                </button>}
            </form>
        </div>
    )
};