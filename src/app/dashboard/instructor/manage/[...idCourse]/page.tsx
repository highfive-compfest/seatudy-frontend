"use client"
import { getCourseById } from "@/services/course";
import { getSegment } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Manage = () => {

    const navs = ["Material", "Reviews", "Edit"]

    const [course, setCourse] = useState()
    const [activeSection, setActiveSection] = useState("Material");

    const pathname = usePathname();
    const id = getSegment(pathname, 4)
    
    useEffect(()=>{
        const fetchCourseId = async () => {
            try {
                const data = await getCourseById(id)
                console.log(data.payload)
                setCourse(course)
            } catch (error:any) {
                console.log(error.response)
            }
        }
        fetchCourseId()
    },[])

    return (
        <section className="w-full p-4 pt-28 w-full">
            <nav className="py-6 px-4 bg-white rounded-lg shadow-md flex gap-2">
            {navs.map((content, idx)=>(
                <button
                    key={idx} 
                    onClick={() => setActiveSection(content)}
                    className={`block w-fit text-left py-2 px-4 rounded-md ${activeSection === content? "bg-gray-300" : "bg-gray-100"}`}
                    >
                        {content}
                </button>
            ))}
           <button className="block w-fit text-left py-2 px-4 rounded-md bg-red-500 text-white">
            Delete
           </button>
            </nav>
            <div>tes</div>
        </section>
    )
}

export default Manage