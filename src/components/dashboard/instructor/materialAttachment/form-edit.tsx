"use client"
import { useMaterials } from "@/app/dashboard/instructor/manage/[idCourse]/[idMaterial]/page";
import { updateMaterialAttach } from "@/services/material";
import { useEffect, useState } from "react";

export const EditMateriAttach = () => {

    const {getMateri, accToken, isActive, setActive, attachActive}:any = useMaterials()

    const [formValue, setFormValue] = useState({
        file: null as File | null,
        filePreview: "",
        description: "",
    });

    useEffect(()=>{
        if (attachActive) {
            setFormValue({
                file: null as File | null,
                filePreview: attachActive.file,
                description: attachActive.description || "",
            })
        }
    },[attachActive])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, files } = event.target as HTMLInputElement;
        if (name === "file" && files) {
            setFormValue({
                ...formValue,
                file: files[0], // Get the first file selected
            });
        } else {
            setFormValue({
                ...formValue,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (event : React.FormEvent) => {
        event.preventDefault()
        try {
            const form = new FormData();
            if (formValue.file) {
                form.append('file', formValue.file);
            } else {
                console.error("No file selected");
                return;
            }
            form.append('description', formValue.description);
            await updateMaterialAttach(attachActive.id, form, accToken);
            setActive("")
            getMateri()
        } catch (error:any) {
            console.error(error.response)
        }
    }

    return (
        <div className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex`}>
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
                    value={formValue.description}
                    placeholder="Description" 
                    className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                <button onClick={()=>setActive("")} type="button" className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                    Cancel
                </button>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Save
                </button>
            </form>
        </div>
    )
};
