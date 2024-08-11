export interface ReviewResponse {
  message: string;
  payload: {
    id: string;
  };
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  feedback: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewsResponse {
  message: string;
  payload: {
    data: Review[];
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
