"use client";
import Navbar from "@/components/common/main-navbar";
import React, { useState, useEffect } from "react";
import { fetchBalance } from "../../services/wallet";
import Footer from "@/components/common/main-footer";

const Page = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userBalance = await fetchBalance(token);
        setBalance(userBalance || 0);
      } catch (err) {
        setError("Failed to fetch balance.");
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-24 h-auto flex flex-col space-y-8 pb-8 lg:bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 mb-6 lg:mb-0 border border-gray-300">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Balance</h3>
              <p className="text-3xl font-bold text-blue-700 mb-4">{balance !== null ? `Rp${balance.toLocaleString()}` : "Loading..."}</p>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <div className="mt-6 text-gray-600">
                <p className="text-lg mb-2">To cash out your balance, please contact us via WhatsApp:</p>
                <a href="https://wa.me/1234567890" className="text-blue-600 hover:underline text-lg font-semibold">
                  +62 123 456 7890
                </a>
                <p className="text-xs mt-6">
                  For more information, please review our{" "}
                  <a href="#" className="text-blue-600 hover:underline font-semibold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline font-semibold">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
