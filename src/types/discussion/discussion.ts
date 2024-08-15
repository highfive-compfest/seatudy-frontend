export interface Discussion {
  id: string;
  user_id: string;
  course_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Pagination {
  total_data: number;
  current_page: number;
  total_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface DiscusByIdRes {
  message : string;
  payload : Discussion
}

export interface DiscussionsResponse {
  message: string;
  payload: {
    data: Discussion[];
    pagination: Pagination;
  };
}

export interface Reply {
  id: string;
  user_id: string;
  forum_discussion_id: string;
  course_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ReplyPagination {
  total_data: number;
  current_page: number;
  total_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface ReplyResponse {
  message: string;
  payload: {
    data: Reply[];
    pagination: ReplyPagination;
  };
}
