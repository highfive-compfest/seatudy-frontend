import React from "react";
import { Dialog } from "@headlessui/react";
import { FaFileImage, FaFilePdf, FaFileWord } from "react-icons/fa6";
import { MaterialType } from "@/types/material/material-courseid";

interface MaterialDetailsModalProps {
  material: MaterialType;
  onClose: () => void;
  markAsDone: (materialId: string) => Promise<void>;
}

const MaterialModal: React.FC<MaterialDetailsModalProps> = ({ material, onClose, markAsDone }) => {
  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl mx-auto z-10 shadow-lg">
            <Dialog.Title className="text-2xl font-semibold mb-4 border-b-2 pb-2 text-gray-800">{material.title}</Dialog.Title>
            <p className="text-base mb-4 text-gray-600 text-justify">{material.description}</p>

            {material.attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Attachments</h3>
                <ul className="list-none space-y-3">
                  {material.attachments.map((attachment) => (
                    <li key={attachment.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {attachment.url.endsWith(".pdf") && <FaFilePdf className="w-6 h-6 text-red-600" />}
                        {attachment.url.endsWith(".doc") && <FaFileWord className="w-6 h-6 text-blue-600" />}
                        {(attachment.url.endsWith(".jpg") || attachment.url.endsWith(".png")) && <FaFileImage className="w-6 h-6 text-green-600" />}
                      </div>
                      <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {attachment.description}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button className="py-2 px-4 rounded-lg bg-red-500 text-white" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MaterialModal;
