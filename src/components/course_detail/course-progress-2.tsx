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
import { FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa6";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseProgress2: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [instructor, setInstructor] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState<MaterialType[] | null>(null);
  const [assignments, setAssignments] = useState<any[] | null>(null);
  const [activeTab, setActiveTab] = useState<"materials" | "assignments">("materials");

  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const instructorData = await getUserById(courseDetail.instructor_id);
        setInstructor(instructorData.payload);
      } catch (error) {
        setError("Failed to fetch instructor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [accToken, courseDetail.instructor_id]);

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const res = await getMaterialByCourse(courseDetail.id);
        setMaterials(res.payload);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch materials.");
      }
    };
    getMaterials();
  }, [courseDetail.id]);

  useEffect(() => {
    const getAssignments = async () => {
      try {
      } catch (error) {
        console.error(error);
        setError("Failed to fetch assignments.");
      }
    };
    getAssignments();
  }, [courseDetail.id]);

  const handleMaterialClick = (material: MaterialType) => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col w-full lg:w-9/10">
      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-auto px-8 py-4 rounded-lg shadow mt-4">
        <div className="flex items-center">
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

      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 flex flex-col px-8 py-4 rounded-lg shadow mt-4">
        <div className="flex space-x-4 border-b-2 mb-4">
          <button className={`py-2 px-4 font-semibold ${activeTab === "materials" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("materials")}>
            Materials
          </button>
          <button className={`py-2 px-4 font-semibold ${activeTab === "assignments" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("assignments")}>
            Assignments
          </button>
        </div>

        {activeTab === "materials" && (
          <div className="flex flex-col gap-4 overflow-y-auto h-[40em]">
            <div className="mt-2 flex flex-col gap-4 overflow-y-auto h-full">
              {materials?.length === 0 ? (
                <p>There are no materials yet.</p>
              ) : (
                materials?.map((materi, idx) => {
                  const createdDate = new Date(materi.created_at).toLocaleDateString();
                  const updatedDate = new Date(materi.updated_at).toLocaleDateString();

                  return (
                    <button onClick={() => handleMaterialClick(materi)} className="border-2 bg-white border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center text-left" key={idx}>
                      <div className="p-2 bg-blue-500 rounded-full">
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
        )}

        {activeTab === "assignments" && (
          <div className="flex flex-col gap-4 overflow-y-auto h-[40em]">
            {assignments?.length === 0 ? (
              <p>There are no assignments yet.</p>
            ) : (
              assignments?.map((assignment, idx) => (
                <div className="border-2 bg-white border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center text-left" key={idx}>
                  <h3 className="font-bold">{assignment.title}</h3>
                  <small className="block">{new Date(assignment.due_date).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {isModalOpen && selectedMaterial && (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md">
            <div className="flex items-center justify-center min-h-screen px-4 py-6">
              <div className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-auto z-10 shadow-lg">
                <Dialog.Title className="text-3xl font-bold mb-6 border-b-2 pb-3 text-gray-800">{selectedMaterial.title}</Dialog.Title>
                <p className="text-lg mb-6 text-gray-600 text-justify">{selectedMaterial.description}</p>

                {selectedMaterial.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-3 text-gray-700">Attachments</h3>
                    <ul className="list-none space-y-4">
                      {selectedMaterial.attachments.map((attachment) => (
                        <li key={attachment.id} className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {attachment.url.endsWith(".pdf") && <FaFilePdf className="w-8 h-8 text-red-600" />}
                            {attachment.url.endsWith(".doc") && <FaFileWord className="w-8 h-8 text-blue-600" />}
                            {(attachment.url.endsWith(".jpg") || attachment.url.endsWith(".png")) && <FaFileImage className="w-8 h-8 text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <a href={attachment.url} className="text-blue-800 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                              {attachment.description}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Additional Information</h3>
                  <p className="text-sm text-gray-600">Created At: {new Date(selectedMaterial.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Updated At: {new Date(selectedMaterial.updated_at).toLocaleDateString()}</p>
                </div>

                <div className="mt-6 flex justify-between space-x-4">
                  <button onClick={() => markAsDone(selectedMaterial.id)} className="px-6 py-3 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-800 transition duration-200">
                    Mark as Done
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition duration-200">
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
