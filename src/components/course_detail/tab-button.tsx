import React from "react";

interface TabButtonsProps {
  activeTab: "materials" | "assignments";
  setActiveTab: React.Dispatch<React.SetStateAction<"materials" | "assignments">>;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 border-b-2 mb-4">
      <button className={`py-2 px-4 font-semibold ${activeTab === "materials" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("materials")}>
        Materials
      </button>
      <button className={`py-2 px-4 font-semibold ${activeTab === "assignments" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`} onClick={() => setActiveTab("assignments")}>
        Assignments
      </button>
    </div>
  );
};

export default TabButtons;
