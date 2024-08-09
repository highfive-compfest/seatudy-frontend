"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Course } from "@/types/course/course";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import { getCookie } from "cookies-next";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseProgress: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [instructor, setInstructor] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const instructorData = await getUserById(accToken, courseDetail.instructor_id);
        setInstructor(instructorData.payload);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch instructor data.");
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [accToken, courseDetail.instructor_id]);

  return (
    <div className="flex flex-col w-full lg:w-9/10">
      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-auto px-8 py-4 rounded-lg shadow mt-14">
        <div className="flex h-full items-center">
          <div className="mr-4">
            <img
              src={instructor?.image_url || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt="Instructor profile"
              className="w-16 h-16 rounded-full border border-gray-300"
            />
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800">{instructor?.name || "Not found"}</p>
            <p className="text-gray-500 text-sm">{instructor?.role || "No Role Available"}</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-full px-8 py-6 rounded-lg shadow mt-4">
        <h1>Materials and Asignment would be here...</h1>
      </div>
    </div>
  );
};

export default CourseProgress;
