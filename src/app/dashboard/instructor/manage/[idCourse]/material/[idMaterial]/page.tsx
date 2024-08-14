"use client"
import { ActionBtnAttach } from "@/components/dashboard/instructor/materialAttachment/action"
import { AddMateriAttach } from "@/components/dashboard/instructor/materialAttachment/add-attachment"
import { MaterialProvider } from "@/context/material-attach"
import { getMaterialById } from "@/services/material"
import { MateriAttach } from "@/types/material/materi-attach"
import { MaterialType } from "@/types/material/material-courseid"
import { getExtFile, getSegment } from "@/utils/utils"
import { getCookie } from "cookies-next"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { FaFile, FaPlus } from "react-icons/fa6"
import { MdBook } from "react-icons/md"

const MaterialPage = () => {
  const accToken = getCookie("authToken") as string;
  const [materi, setMateri] = useState<MaterialType>();
  const [isActive, setActive] = useState("");
  const pathname = usePathname();
  const materiId = getSegment(pathname, 6);
  const [attachActive, setAttachActive] = useState<MateriAttach>()

  const getMateri = async () => {
    const res = await getMaterialById(materiId);
    setMateri(res.payload);
  };

    useEffect(()=>{
        getMateri()
    },[])

    if (materi) return (
        <MaterialProvider value={{getMateri, isActive, setActive, accToken, materiId, attachActive,setAttachActive}}>
            <section className="p-4 mt-28 max-w-[53rem] mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex items-center gap-4 border-black pb-4 border-b-2">
                    <div className="p-2 bg-blue-500 rounded-full w-fit"><MdBook size={26} color="white"/></div>
                    <div>
                        <h1 className="font-bold text-3xl">{materi.title}</h1>
                        <small>created at {new Date(materi.created_at).toLocaleDateString()}</small>
                        <small className="block">update at {new Date(materi.updated_at).toLocaleDateString()}</small>
                    </div>
                </div>
                <div className="border-black pb-4 border-b-2">
                    <h2 className="mt-4 mb-1 text-xl font-bold">Description</h2>
                    <p className="text-justify">{materi.description}</p>
                </div>
                <h2 className="mt-4 mb-1 text-xl font-bold">Attachments</h2>
                <AddMateriAttach/>
                <div className="flex flex-col gap-3">
                    {materi.attachments.length === 0?<p>there are no attachments yet.</p>:
                        materi.attachments.map((content, idx)=>{
                            const extFile = getExtFile(content.url)
                            return (
                                <div className="border-2 p-4" key={idx}>
                                    <div className="flex justify-between">
                                        <Link className="p-4 rounded-lg bg-gray-200 w-fit text-blue-600 flex flex-col items-center gap-2" href={content.url}>
                                                <FaFile size={30}/>
                                                <small>file .{extFile}</small>
                                        </Link>
                                        <ActionBtnAttach attachId={content.id}/>
                                    </div>
                                    <p className="mt-2">{content.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </MaterialProvider>
    )
}

export default MaterialPage;
