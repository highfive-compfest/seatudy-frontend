"use client";
import Navbar from "@/components/common/main-navbar";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/topup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:bg-gradient-to-br from-blue-200 to-blue-100 p-6">
      <Navbar />
      <h1 className="text-2xl font-semibold text-blue-800 mb-2 scale-up fade-in">Top-up Successful!</h1>
      <p className="text-gray-600 mb-6  scale-up fade-in">Your account has been successfully topped up.</p>
      <button onClick={handleBackToHome} className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 scale-up fade-in">
        Continue
      </button>
    </div>
  );
};

export default Page;
