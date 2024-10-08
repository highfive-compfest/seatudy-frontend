"use client"
import { createMaterial } from "@/services/material";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { useMaterials } from "./material";
import { Spinner } from "@nextui-org/spinner";

export const MaterialForm = () => {

    const {courseId, getMaterials}:any = useMaterials()

    const accToken = getCookie("authToken") as string;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course_id: courseId,
      });

    const [info, setInfo] = useState("")
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
            const form = new FormData();
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('course_id', formData.course_id);
            const res = await createMaterial(form, accToken)
            setInfo(res.message)
            await getMaterials()
            const target = event.target as HTMLFormElement
            target.reset();
        } catch (error:any) {
            console.error(error.response)
        } finally {
            setPending(false)
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
                <p>{info}</p>
                {isPending?<div className="justify-center flex"><Spinner/></div>:<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Create Material
                </button>}
            </form>
        </div>
    )
};
