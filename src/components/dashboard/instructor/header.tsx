"use client"
import { getUserById } from "@/services/user"
import { Course } from "@/types/course/course"
import { Avatar } from "@nextui-org/avatar"
import Image from "next/image"
import { useEffect, useState } from "react"

export const HeaderCourse = ({course}:{course : Course|undefined}) => {

    const [dataUser, setDataUser] = useState<any>()

    useEffect(()=>{
        if (course) {
            const fetchUserId = async () => {
                try {
                    const res = await getUserById(course.instructor_id)
                    setDataUser(res.payload)
                } catch (error:any) {
                    console.log(error.response)
                }
            }
            fetchUserId()
        }
    },[course])

    return (
        <div className="bg-white w-fit md:w-full shadow-lg h-fit md:h-[20rem] rounded-lg overflow-hidden mb-6 flex flex-wrap">
            <div 
                className="h-full max-w-[40rem] bg-no-repeat bg-cover bg-black"
                // style={{ backgroundImage : `url("${"https://sea-study-bucket.s3.ap-southeast-2.amazonaws.com/course%2Fimage%2F0191373f-c301-75c4-b383-34676aeaf3cb.hayley-kim-studios-sRSRuxkOuzI-unsplash.jpg"})` }}
                >
                {course && <Image 
                    src={course.image_url}
                    alt="Hero"
                    width={450}
                    height={450}
                    priority={true}
                    className="max-h-[20rem]"
                />}
            </div>
            <div className="flex flex-col shrink-0 justify-center p-4">
                <Avatar className="w-[10rem] h-[10rem]" src={dataUser?.image_url}/>
                <h1 className="font-bold text-3xl">{course?.title}</h1>
                <h2 className="font-medium text-xl">{dataUser?.name}</h2>
                <p>{course?.description}</p>
            </div>
        </div>
    )
}