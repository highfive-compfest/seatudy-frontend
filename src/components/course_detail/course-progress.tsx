"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Course } from "@/types/course/course";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import { getCookie } from "cookies-next";
import { getMaterialByCourse } from "@/services/material";
import { MdBook } from "react-icons/md";
import { Dialog } from "@headlessui/react";
import { MaterialType } from "@/types/material/material-courseid";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseProgress: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [instructor, setInstructor] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const instructorData = await getUserById(courseDetail.instructor_id);
        setInstructor(instructorData.payload);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch instructor data.");
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [accToken, courseDetail.instructor_id]);

  const [materials, setMaterials] = useState<MaterialType[]>();

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const res = await getMaterialByCourse(courseDetail.id);
        console.log(res.payload);
        setMaterials(res.payload);
      } catch (error: any) {
        console.error(error.response);
      }
    };
    getMaterials();
  }, [courseDetail.id]);

  const handleMaterialClick = (material: MaterialType) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full lg:w-9/10">
      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-auto px-8 py-4 rounded-lg shadow mt-4">
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

      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-[34em] px-8 py-6 rounded-lg shadow mt-4">
        <h2 className="font-semibold text-2xl">Materials</h2>
        <div className="mt-2 flex flex-col gap-4">
          {materials?.length === 0 ? (
            <p>There are no materials yet.</p>
          ) : (
            materials?.map((materi, idx) => {
              const createdDate = new Date(materi.created_at).toLocaleDateString();
              const updatedDate = new Date(materi.updated_at).toLocaleDateString();

              return (
                <button onClick={() => handleMaterialClick(materi)} className="border-2 bg-white border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center text-left" key={idx}>
                  <div className="p-2 bg-blue-500 rounded-full w-fit">
                    <MdBook size={23} color="white" />
                  </div>
                  <div>
                    <h3 className="font-bold">{materi.title}</h3>
                    <small className="block">{createdDate !== updatedDate ? `${updatedDate} (updated)` : createdDate}</small>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {isModalOpen && selectedMaterial && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="bg-white rounded-lg p-6 max-w-lg mx-auto z-10 shadow-lg">
                <Dialog.Title className="font-bold text-xl mb-4">{selectedMaterial.title}</Dialog.Title>
                <p className="text-justify">{selectedMaterial.description}</p>
                <p className="mt-4 text-sm text-blue-600">Buy the course to gain full access to all materials</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CourseProgress;
