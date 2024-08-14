import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

interface CustomAlertProps {
  message: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center items-center fixed top-8 transform -translate-x-1/2 w-screen z-[9999]"
    >
      <div className="flex flex-row items-center bg-blue-100 text-blue-600 border border-blue-200 rounded-full shadow-lg py-2 px-3 box-border">
        <p className="text-medium font-semibold line-clamp-1">{message}</p>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600 text-white border-none rounded-full px-4 py-2 text-base cursor-pointer transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </motion.div>,
    document.body
  );
};

export const useAlert = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => {
    (window as any).alert = showAlert;
  }, []);

  const alertComponent = alertMessage ? createPortal(<CustomAlert message={alertMessage} />, document.body) : null;

  return { showAlert, alertComponent };
};
