"use state"
import { useMaterialAttach } from "@/context/material-attach";
import { createMaterialAttach } from "@/services/material";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export const AddMateriAttach = () => {

    const {isActive, setActive, accToken, materiId, getMateri}:any = useMaterialAttach()

    const [formData, setFormData] = useState({
        file: null as File | null,
        description: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, files } = event.target as HTMLInputElement;
        if (name === "file" && files) {
            setFormData({
                ...formData,
                file: files[0], // Get the first file selected
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    
    const handleSubmit = async (event : React.FormEvent) => {
        try {
            event.preventDefault()
            const form = new FormData();
            if (formData.file) {
                form.append('file', formData.file);
            } else {
                console.error("No file selected");
                return;
            }
            form.append('description', formData.description);
            await createMaterialAttach(materiId, form, accToken);
            setActive("")
            getMateri()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    return (
        <>
            <button onClick={()=>setActive("add")} className="bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-1 text-white flex gap-2 items-center my-4">
                <FaPlus/>
                Add
            </button>
            {isActive === "add" && <div className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex`}>
                <form onSubmit={handleSubmit} className="bg-white w-[40rem] p-4 rounded-lg flex flex-col gap-4 m-auto">
                    <input
                        required
                        name="file"
                        onChange={handleChange} 
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" 
                        type="file"/>
                    <textarea
                        required
                        name="description"
                        onChange={handleChange}
                        rows={6} 
                        placeholder="Description" 
                        className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                    <button onClick={()=>setActive("")} type="button" className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                        Cancel
                    </button>
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Add Attachment
                    </button>
                </form>
            </div>}
        </>
    )
};
