"use client"
import { EditCourse } from "@/components/dashboard/instructor/edit-form";
import { deleteCourseById, getCourseById } from "@/services/course";
import { getSegment } from "@/utils/utils";
import { Spinner } from "@nextui-org/spinner";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { HeaderCourse } from "@/components/dashboard/instructor/header";
import { Material } from "@/components/dashboard/instructor/material";

const Manage = () => {
    const router = useRouter();

    const navs = ["Material", "Reviews", "Edit"]

    const [course, setCourse] = useState<Course>()
    const [isPending, setPending] = useState(false)
    const [activeSection, setActiveSection] = useState("Material");

    const accToken = getCookie("authToken") as string;

    const pathname = usePathname();
    const id = getSegment(pathname, 4)
    
    useEffect(()=>{
        const fetchCourseId = async () => {
            try {
                const data = await getCourseById(id)
                setCourse(data.payload)
            } catch (error:any) {
                console.log(error.response)
            }
        }
        fetchCourseId()
    },[])

    const handleDelete = async () => {
        setPending(true)
        try {
            await deleteCourseById(accToken,id)
            setPending(false)
            router.replace("/dashboard/instructor/manage")
        } catch (error:any) {
            console.log(error.response)
        } finally {
            setPending(false)
        }
    }

    return (
        <section className="p-4 pt-28 w-full">
            <HeaderCourse course={course}/>
            <nav className="py-6 px-4 bg-white rounded-lg shadow-md flex gap-2 overflow-auto">
            {navs.map((content, idx)=>(
                <button
                    key={idx} 
                    onClick={() => setActiveSection(content)}
                    className={`block w-fit text-left py-2 px-4 rounded-md ${activeSection === content? "bg-gray-300" : "bg-gray-100"}`}
                    >
                        {content}
                </button>
            ))}
           {isPending?<Spinner/>:
           (<button onClick={handleDelete} className="block w-fit text-left py-2 px-4 rounded-md bg-red-500 text-white">
                Delete
           </button>)}
            </nav>
            {activeSection === "Edit"?<EditCourse course={course}/>:
            activeSection === "Material"?<Material/>:null
            }
        </section>
    )
}

export default Manage