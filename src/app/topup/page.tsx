"use client";
import Navbar from "@/components/common/main-navbar";
import React, { useState } from "react";

const userBalance = 250000;
const transactionHistory = [
  { id: 1, date: "2024-08-05", amount: 100000 },
  { id: 2, date: "2024-08-01", amount: 50000 },
  { id: 3, date: "2024-07-28", amount: 150000 },
];

const predefinedAmounts = [50000, 100000, 200000, 500000];

const TopUpPage = () => {
  const [amount, setAmount] = useState<number | string>("");

  const handlePredefinedAmountClick = (value: number) => {
    setAmount(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-24 h-screen flex flex-col space-y-6 pb-8">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="bg-white shadow rounded-lg p-8 flex-1 mb-6 lg:mb-0 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Your Balance</h3>
              <p className="text-2xl lg:text-3xl font-bold text-blue-700">Rp{userBalance.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 text-center">Transaction History</h3>
              <ul className="space-y-4">
                {transactionHistory.map((transaction) => (
                  <li key={transaction.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center text-gray-800">
                      <span className="text-sm lg:text-base">{transaction.date}</span>
                      <span className="font-semibold text-blue-600">Rp{transaction.amount.toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-8 flex-1 border-2 border-gray-200">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-center">Top Up Balance</h2>
            <form>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
                  Amount
                </label>
                <div className="flex flex-col space-y-4 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {predefinedAmounts.map((predefinedAmount) => (
                      <button
                        key={predefinedAmount}
                        type="button"
                        className={`px-3 py-2 text-sm lg:text-base border border-gray-300 rounded-md ${
                          amount === predefinedAmount ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                        } hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                        onClick={() => handlePredefinedAmountClick(predefinedAmount)}
                      >
                        Rp{predefinedAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    id="custom-amount"
                    name="custom-amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Continue to MidTrans
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpPage;
