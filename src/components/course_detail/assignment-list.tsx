import { AssignmentType } from "@/types/assignment/assignment";
import React from "react";
import { MdAssignment } from "react-icons/md";

interface AssignmentsListProps {
  assignments: AssignmentType[] | null;
  onAssignmentClick: (assignment: AssignmentType) => void;
}

const AssignmentsList: React.FC<AssignmentsListProps> = ({ assignments, onAssignmentClick }) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[40em]">
      {assignments?.length === 0 ? (
        <p>There are no assignments yet.</p>
      ) : (
        assignments?.map((assignment, idx) => (
          <button
            key={idx}
            className="border-2 bg-white border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center text-left"
            onClick={() => onAssignmentClick(assignment)} // Handle click
          >
            <div className="p-2 bg-blue-500 rounded-full">
              <MdAssignment size={23} color="white" />
            </div>
            <div>
              <h3 className="font-bold">{assignment.title}</h3>
              <small className="block">Due: {new Date(assignment.due).toLocaleDateString()}</small>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default AssignmentsList;
