"use client"
import { MaterialType } from "@/types/material/material-courseid";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useMaterials } from "./material";
import { getMaterialById, updateMaterial } from "@/services/material";
import { getCookie } from "cookies-next";
import { Spinner } from "@nextui-org/spinner";

interface Type {
    materiActive : MaterialType|undefined;
}
export const EditMaterial = ({materiActive}:Type) => {

    const accToken = getCookie("authToken") as string;

    
    const {isEdit, setEdit, getMaterials}:any = useMaterials()

    const [isPending, setPending] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    useEffect(()=>{
        if (materiActive) {
            setFormData({
                title: materiActive.title || "",
                description: materiActive.description || "",
            })
        }
    },[materiActive])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        if (materiActive) {
            setPending(true)
            event.preventDefault()
            try {
                const form = new FormData();
                form.append('title', formData.title);
                form.append('description', formData.description);
                await updateMaterial(materiActive.id, form, accToken)
                getMaterials()
                setEdit(false)
            } catch (error:any) {
                console.error(error.response)
            } finally {
                setPending(false)
            }
        }
    }

    return (
        <div className={`${isEdit?"block":"hidden"} fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex`}>
            <form onSubmit={handleSubmit} className="bg-white w-[40rem] p-4 rounded-lg flex flex-col gap-4 m-auto">
                <input
                    name="title"
                    required
                    onChange={handleChange}
                    value={formData.title} 
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" 
                    placeholder="Title" 
                    type="text"/>
                <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={6} 
                    placeholder="Description" 
                    className="resize-none block border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"/>
                {!isPending&&<button onClick={()=>setEdit(false)} type="button" className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                    Cancel
                </button>}
                {isPending?<div className="justify-center flex"><Spinner/></div>:<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Save
                </button>}
            </form>
        </div>
    )
};
