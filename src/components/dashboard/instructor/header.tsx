"use client";
import { getUserById } from "@/services/user";
import { Course } from "@/types/course/course";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeaderCourse = ({ course }: { course: Course | undefined }) => {
  const [dataUser, setDataUser] = useState<any>();

  useEffect(() => {
    if (course) {
      const fetchUserId = async () => {
        try {
          const res = await getUserById(course.instructor_id);
          setDataUser(res.payload);
        } catch (error: any) {
          console.log(error.response);
        }
      };
      fetchUserId();
      console.log(course)
    }
  }, [course]);

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
      <div className="w-full h-fit md:h-[20rem] overflow-hidden relative">
          {course && <Image 
            src={course.image_url} 
            alt="Hero" 
            priority={true} 
            style={{ objectFit : "cover" }}
            width={2000}
            height={2000}
            className="w-full max-h-[20rem]" />}
          <div className="absolute inset-0 flex justify-between flex-col p-6 bg-[rgba(0,0,50,0.4)]">
            <div className="flex gap-4 items-center">
              <Avatar isBordered className="w-[4rem] h-[4rem]" src={dataUser?.image_url} />
              <div className="text-white">
                <h2 className="text-xl font-semibold">{dataUser?.name}</h2>
                <h3 className="font-medium">{dataUser?.role}</h3>
              </div>
            </div>
            <h1 className="font-bold text-3xl text-white">{course?.title}</h1>
          </div>
      </div>
      <div className="p-4">
        <h1 className="font-bold text-xl">Description</h1>
        <p>{course?.description}</p>
        <h1 className="font-bold text-xl mt-2">Syllabus</h1>
        {course && <Link className="text-blue-500 underline" href={course.syllabus_url}>Download</Link>}
        <div className="flex gap-4 mt-4">
            {course && <p>Create at : {new Date(course.updated_at).toLocaleDateString()}</p>}
            {course && <p>Update at : {new Date(course.updated_at).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};
