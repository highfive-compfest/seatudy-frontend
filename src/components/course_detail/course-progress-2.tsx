import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Course } from "@/types/course/course";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import { getCookie } from "cookies-next";
import { Material } from "@/types/material/material-courseid";
import { getMaterialByCourse } from "@/services/material";
import { MdBook } from "react-icons/md";
import { Dialog } from "@headlessui/react";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseProgress2: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [instructor, setInstructor] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
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

  const [materials, setMaterials] = useState<Material[] | null>(null);

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const res = await getMaterialByCourse(courseDetail.id);
        setMaterials(res.payload);
      } catch (error: any) {
        console.error(error.response);
        setError("Failed to fetch materials.");
      }
    };
    getMaterials();
  }, [courseDetail.id]);

  const handleMaterialClick = (material: Material) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const markAsDone = async (materialId: string) => {
    try {
      console.log(`Marking material ${materialId} as done`);
    } catch (error) {
      console.error("Failed to mark material as done:", error);
    }
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

      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 flex flex-col h-[42em] px-8 py-6 rounded-lg shadow mt-4">
        <h2 className="font-semibold text-2xl">Materials</h2>
        <div className="mt-2 flex flex-col gap-4 overflow-y-auto">
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
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-60">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="bg-white rounded-xl p-8 w-2xl mx-auto z-10 shadow-xl">
                <Dialog.Title className="text-2xl font-semibold mb-6 border-b pb-3">{selectedMaterial.title}</Dialog.Title>
                <p className="text-base mb-6">{selectedMaterial.description}</p>

                {selectedMaterial.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Attachments</h3>
                    <ul className="list-disc pl-6">
                      {selectedMaterial.attachments.map((attachment) => (
                        <li key={attachment.id} className="mb-2">
                          <a href={attachment.url} className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
                            {attachment.description}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-medium font-semibold mb-3">Additional Information</h3>
                  <p className="text-sm text-gray-700">Created At: {new Date(selectedMaterial.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-700">Updated At: {new Date(selectedMaterial.updated_at).toLocaleDateString()}</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={() => markAsDone(selectedMaterial.id)} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150 mr-32">
                    Mark as Done
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CourseProgress2;
