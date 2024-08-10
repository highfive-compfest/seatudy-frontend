export interface TopUpRequest {
  amount: number;
}

export interface TopUpResponse {
  message: string;
  payload: {
    redirect_url: string;
  };
}

export interface FetchBalanceResponse {
  message: string;
  payload: {
    balance: number;
  };
}

export interface MidtransTransaction {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface FetchMidtransTransactionsResponse {
  message: string;
  payload: {
    data: MidtransTransaction[];
    pagination: {
      total_data: number;
      current_page: number;
      total_page: number;
      per_page: number;
      next_page: number | null;
      prev_page: number | null;
    };
  };
}
