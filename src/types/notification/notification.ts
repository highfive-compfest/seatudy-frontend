export interface Notification {
  id: string;
  title: string;
  detail: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  message: string;
  payload: {
    data: Notification[];
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
