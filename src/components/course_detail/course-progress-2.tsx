import React, { useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { getUserById } from "@/services/user";
import { getMaterialByCourse } from "@/services/material";
import { getAssignmentByCourse } from "@/services/assignment";
import { getCookie } from "cookies-next";
import { UserPayload } from "@/types/user/user";
import { MaterialType } from "@/types/material/material-courseid";
import InstructorInfo from "./instructor-info";
import MaterialsList from "./material-list";
import AssignmentsList from "./assignment-list";
import MaterialDetailsModal from "./material-detail-modal";
import TabButtons from "./tab-button";
import AssignmentDetailsModal from "./assignment-modal";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseProgress2: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [instructor, setInstructor] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
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
        const res = await getAssignmentByCourse(courseDetail.id, accToken);
        setAssignments(res.payload);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch assignments.");
      }
    };
    getAssignments();
  }, [courseDetail.id, accToken]);

  const handleMaterialClick = (material: MaterialType) => {
    setSelectedMaterial(material);
    setIsModalOpen(true);
  };

  const handleAssignmentClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsAssignmentModalOpen(true);
  };

  const markAssignmentAsDone = async (assignmentId: string) => {
    try {
      console.log(`Marking assignment ${assignmentId} as done`);
    } catch (error) {
      console.error("Failed to mark assignment as done:", error);
    }
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
      <InstructorInfo instructor={instructor} />

      <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 flex flex-col px-8 py-4 rounded-lg shadow mt-4">
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "materials" && <MaterialsList materials={materials} onMaterialClick={handleMaterialClick} />}

        {activeTab === "assignments" && <AssignmentsList assignments={assignments} onAssignmentClick={handleAssignmentClick} />}
      </div>

      {isModalOpen && selectedMaterial && <MaterialDetailsModal material={selectedMaterial} onClose={() => setIsModalOpen(false)} markAsDone={markAsDone} />}
      {isAssignmentModalOpen && selectedAssignment && <AssignmentDetailsModal assignment={selectedAssignment} onClose={() => setIsAssignmentModalOpen(false)} markAsDone={markAssignmentAsDone} />}
    </div>
  );
};

export default CourseProgress2;
