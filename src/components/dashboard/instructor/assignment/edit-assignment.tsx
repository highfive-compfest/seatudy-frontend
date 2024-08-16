"use client"
import { MaterialType } from "@/types/material/material-courseid";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { getMaterialById, updateMaterial } from "@/services/material";
import { getCookie } from "cookies-next";
import { AssignmentsContextType, AssignmentType } from "@/types/assignment/assignment";
import { useAssignments } from "./assignment";
import { updateAssignment } from "@/services/assignment";
import { Spinner } from "@nextui-org/spinner";

interface Type {
    assignmentActive : AssignmentType|undefined;
}
export const EditAssignment = ({assignmentActive}:Type) => {
    
    const {setEdit, getAssignments, accToken}:any = useAssignments()
    const [isPending, setPending] = useState(false)
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due:""
    });

    const convertToLocalDatetime = (isoDate: string): string => {
        const date = new Date(isoDate);
    
        // Get the local time offset and format the datetime for 'datetime-local' input
        const localDatetime = date.toISOString().slice(0, 16);
    
        return localDatetime;
    };

    useEffect(()=>{
        if (assignmentActive) {
            setFormData({
                title: assignmentActive.title || "",
                description: assignmentActive.description || "",
                due: convertToLocalDatetime(assignmentActive.due) || "",
            })
        }
    },[assignmentActive])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        if (assignmentActive) {
            event.preventDefault()
            setPending(true)
            try {
                const dueISO = new Date(formData.due).toISOString()
                const updatedFormData = {
                    ...formData,
                    due: dueISO,
                };
                await updateAssignment(assignmentActive.id, updatedFormData, accToken)
                getAssignments()
                setEdit(false)
            } catch (error:any) {
                console.error(error.response)
            } finally {
                setPending(false)
            }
        }
    }
    return (
        <div className={`fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex`}>
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
                <div>
                    <label className="text-gray-400" htmlFor="due">Due</label>
                    <input
                        required
                        onChange={handleChange}
                        id="due"
                        type="datetime-local"
                        name="due"
                        value={formData.due}
                        className="block w-full border-2 outline-none p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        />
                </div>
                {!isPending&&<button onClick={()=>setEdit(false)} type="button" className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300">
                    Cancel
                </button>}
                {isPending?<div className="flex justify-center"><Spinner/></div>:<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    Save
                </button>}
            </form>
        </div>
    )
};