import React from "react";
import { MdBook } from "react-icons/md";
import { MaterialType } from "@/types/material/material-courseid";

interface MaterialsListProps {
  materials: MaterialType[] | null;
  onMaterialClick: (material: MaterialType) => void;
}

const MaterialsList: React.FC<MaterialsListProps> = ({ materials, onMaterialClick }) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[40em]">
      {materials?.length === 0 ? (
        <p>There are no materials yet.</p>
      ) : (
        materials?.map((materi, idx) => {
          const createdDate = new Date(materi.created_at).toLocaleDateString();
          const updatedDate = new Date(materi.updated_at).toLocaleDateString();

          return (
            <button onClick={() => onMaterialClick(materi)} className="border-2 bg-white border-gray-200 px-4 py-3 rounded-lg flex gap-2 items-center text-left" key={idx}>
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
  );
};

export default MaterialsList;
