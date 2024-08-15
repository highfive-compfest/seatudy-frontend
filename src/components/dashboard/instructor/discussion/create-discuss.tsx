"use client"
import React, { useState } from "react";
import { createDiscussion } from "@/services/discussion";
import { useDiscussions } from "./discussion";

export const DiscusInstrucForm = () => {

    const {courseId, getDiscussions, accToken}:any = useDiscussions()

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        course_id: courseId,
      });

    const [info, setInfo] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const res = await createDiscussion(formData.course_id, formData.title, formData.content, accToken)
            setInfo(res.message)
            await getDiscussions()
            const target = event.target as HTMLFormElement
            target.reset();
        } catch (error:any) {
            console.error(error.response)
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Start a New Discussion</h2>
                <input
                    name="title"
                    required
                    onChange={handleChange} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" 
                    placeholder="Title" 
                    type="text"/>
                <textarea
                    name="content"
                    required
                    onChange={handleChange}
                    rows={6} 
                    placeholder="describe the topic in detail" 
                    className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                <p>{info.toLowerCase().replace(/_/g, ' ')}</p>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Create Discussion
                </button>
            </form>
        </div>
    )
};