import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Confirm Purchase</h3>
        <p className="text-gray-700 mb-4">Are you sure you want to purchase this course? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg">
            Cancel
          </button>
          <button onClick={onConfirm} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
