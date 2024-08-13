"use client"
import { createMaterial } from "@/services/material";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMaterials } from "./material";

export const MaterialForm = () => {

    const {courseId, getMaterials}:any = useMaterials()

    const router = useRouter()

    const accToken = getCookie("authToken") as string;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
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

    // const handleDescriptionChange = (index: number, value: string) => {
    //     const newDescriptions = [...formData.attachmentDescriptions];
    //     newDescriptions[index] = value;
    //     setFormData({
    //       ...formData,
    //       attachmentDescriptions: newDescriptions,
    //     });
    //   };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const form = new FormData();
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('course_id', formData.course_id);
        
            // formData.attachments.forEach((file, index) => {
            //   form.append(`attachments[${index}][file]`, file);
            //   form.append(`attachments[${index}][description]`, formData.attachmentDescriptions[index]);
            // });
            const res = await createMaterial(form, accToken)
            setInfo(res.message)
            await getMaterials()
            const target = event.target as HTMLFormElement
            target.reset();
        } catch (error:any) {
            console.error(error.response)
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
                <h2 className="font-semibold text-xl">Create Material</h2>
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
                {/* <h2 className="font-semibold text-xl">Attachment</h2>
                <div className="w-full mt-4 md:mt-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachment file</label>
                    <input
                        multiple
                        
                        onChange={handleChange}
                        type="file"
                        name="syllabus"
                        accept=".pdf,.doc,.docx,.bmp"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    />
                </div> */}
                {/* {formData.attachments.map((_, index) => (
                <div key={index}>
                    <textarea  
                        value={formData.attachmentDescriptions[index] || ''}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        rows={4} 
                        placeholder="Description Attachment" 
                        className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                </div>
                ))} */}
                <p>{info}</p>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Create Material
                </button>
            </form>
        </div>
    )
};
