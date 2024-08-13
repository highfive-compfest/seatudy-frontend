"use client"
import { getMaterialByCourse } from "@/services/material";
import { useEffect, useState } from "react";
// import { Material } from "@/types/material/material-courseid";
import { FaBook } from "react-icons/fa6";
import { MdBook } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ActionButton } from "./action";
import { useMaterials } from "./material";
import { MaterialsContextType, MaterialType } from "@/types/material/material-courseid";


export const GetMaterials = () => {
    const {materials}:any = useMaterials()

    const [materiActive, setMateriActive] = useState<MaterialType>()
    
    const pathname = usePathname()
1
    return (
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
            <h2 className="font-semibold text-2xl">Materials</h2>
            <div className="mt-2 flex flex-col gap-4">{materials?.length === 0? <p>there are no materials yet.</p>:
                materials?.map((materi:MaterialType, idx:number)=>{
                    const options: Intl.DateTimeFormatOptions = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false, // Ubah ke true untuk format 12-jam
                        timeZone: 'UTC' // Ganti dengan zona waktu yang sesuai jika perlu
                      };
                    
                    const created = new Date(materi.created_at).toLocaleDateString(undefined, options);
                    const updated = new Date(materi.updated_at).toLocaleDateString(undefined, options);
                    const createdDate = new Date(materi.created_at).toLocaleDateString();
                    const updatedDate = new Date(materi.updated_at).toLocaleDateString();
                    
                    return(
                        <div key={idx} className="relative">
                            <Link href={`${pathname}/${materi.id}`} className="hover:bg-gray-200 border-2 border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center">
                                <div className="p-2 bg-blue-500 rounded-full w-fit"><MdBook size={26} color="white"/></div>
                                <div>
                                    <h3 className="font-bold">{materi.title}</h3>
                                    <small className="block">{
                                        created !== updated?
                                        `${updatedDate} (updated)`:
                                        createdDate
                                    }</small>
                                </div>
                            </Link>
                            <ActionButton materiActive={materiActive} setMateriActive={setMateriActive} materiId={materi.id}/>
                        </div>
                    )
                })
            }</div>
        </div>
    )
};
