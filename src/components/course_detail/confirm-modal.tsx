import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Purchase</h3>
        <p className="text-base text-gray-700 mb-6">Are you sure you want to purchase this course? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-150">
            Cancel
          </button>
          <button onClick={onConfirm} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
