import { FetchBalanceResponse, FetchMidtransTransactionsResponse, MidtransTransaction, TopUpRequest, TopUpResponse } from "@/types/wallet/wallet";
import { axiosInstance } from "./api-config";

export const topUpWallet = async (data: TopUpRequest, token: string): Promise<TopUpResponse> => {
  try {
    const response = await axiosInstance.post<TopUpResponse>("wallets/top-up", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error topping up wallet:", error);
    throw error;
  }
};

export const fetchBalance = async (token: string): Promise<number> => {
  try {
    const response = await axiosInstance.get<FetchBalanceResponse>("wallets/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.message === "GET_BALANCE_SUCCESS") {
      return response.data.payload.balance;
    } else {
      throw new Error("Failed to fetch balance.");
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const fetchMidtransTransactions = async (page: number, limit: number, token: string): Promise<{ transactions: MidtransTransaction[]; totalPages: number }> => {
  try {
    const response = await axiosInstance.get<FetchMidtransTransactionsResponse>(`wallets/midtrans-transactions?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.message === "GET_MIDTRANS_TRANSACTIONS_SUCCESS") {
      return {
        transactions: response.data.payload.data,
        totalPages: response.data.payload.pagination.total_page,
      };
    } else {
      throw new Error("Failed to fetch transactions.");
    }
  } catch (error) {
    console.error("Error fetching Midtrans transactions:", error);
    throw error;
  }
};
