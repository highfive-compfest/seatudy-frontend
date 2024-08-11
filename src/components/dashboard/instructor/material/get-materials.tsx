"use client"
import { getMaterialByCourse } from "@/services/material";
import { useEffect, useState } from "react";
import { Material } from "@/types/material/material-courseid";
import { FaBook } from "react-icons/fa6";
import { MdBook } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const GetMaterials = ({courseId}:{courseId:string}) => {
    const [materials, setMaterials] = useState<Material[]>()

    const pathname = usePathname()
    console.log(pathname)

    useEffect(()=>{
        const getMaterials = async () => {
            try {
                const res = await getMaterialByCourse(courseId)
                console.log(res.payload)
                setMaterials(res.payload)
            } catch (error:any) {
                console.error(error.response)
            }
        }
        getMaterials()
    },[courseId])
1
    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
            <h2 className="font-semibold text-2xl">Materials</h2>
            <div className="mt-2 flex flex-col gap-4">{materials?.length === 0? <p>there are no materials yet.</p>:
                materials?.map((materi, idx)=>{
                    const createdDate = new Date(materi.created_at).toLocaleDateString();
                    const updatedDate = new Date(materi.updated_at).toLocaleDateString();

                    return(
                        <Link href={`${pathname}/${materi.id}`} className="border-2 border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center" key={idx}>
                            <div className="p-2 bg-blue-500 rounded-full w-fit"><MdBook size={23} color="white"/></div>
                            <div>
                                <h3 className="font-bold">{materi.title}</h3>
                                <small className="block">{
                                    createdDate !== updatedDate?
                                    `${updatedDate} (updated)`:
                                    createdDate
                                }</small>
                            </div>
                        </Link>
                    )
                })
            }</div>
        </div>
    )
};
