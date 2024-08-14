"use client";
import Navbar from "@/components/common/main-navbar";
import React, { useState, useEffect } from "react";
import { topUpWallet, fetchBalance, fetchMidtransTransactions } from "../../services/wallet";
import { MidtransTransaction } from "@/types/wallet/wallet";
import Footer from "@/components/common/main-footer";
import { getCookie } from "cookies-next";

const predefinedAmounts = [50000, 100000, 200000, 500000];

const TopUpPage = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<MidtransTransaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userBalance = await fetchBalance(token);
        setBalance(userBalance);

        const result = await fetchMidtransTransactions(1, 5, token);
        setTransactions(result.transactions);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [token]);

  const handlePredefinedAmountClick = (value: number) => {
    setAmount(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await topUpWallet({ amount: Number(amount) }, token);

      const { message, payload } = response;

      if (message === "TOP_UP_REQUEST_SUCCESS" && payload?.redirect_url) {
        window.location.href = payload.redirect_url;
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError("Failed to top up wallet.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      const result = await fetchMidtransTransactions(page, 5, token);
      setTransactions(result.transactions);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to fetch transactions.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-24 h-auto flex flex-col space-y-8 pb-8 lg:bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 mb-6 lg:mb-0 border border-gray-300">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800">Your Balance</h3>
              <p className="text-3xl font-bold text-blue-700">{balance !== null ? `Rp${balance.toLocaleString()}` : "Loading..."}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Transaction History</h3>
              <ul className="space-y-4">
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center text-gray-800">
                      <span className="text-sm">{new Date(transaction.created_at).toLocaleDateString()}</span>
                      <span className={`font-semibold ${transaction.status === "success" ? "text-blue-600" : "text-red-600"}`}>
                        Rp{transaction.amount.toLocaleString()} - {transaction.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex-1 border border-gray-300">
            <h2 className="text-2xl font-semibold mb-6 text-center">Top Up Balance</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
                  Amount
                </label>
                <div className="flex flex-col space-y-4 mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {predefinedAmounts.map((predefinedAmount) => (
                      <button
                        key={predefinedAmount}
                        type="button"
                        className={`px-4 py-2 text-sm border border-gray-300 rounded-md ${
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
                    min="0"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading}>
                {loading ? "Processing..." : "Continue to MidTrans"}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TopUpPage;
