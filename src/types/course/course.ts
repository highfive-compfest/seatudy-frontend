export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  review_count: number;
  image_url: string;
  syllabus_url: string;
  instructor_id: string;
  difficulty: string;
  materials: any[];
  created_at: string;
  updated_at: string;
  category: string;
}

export interface Pagination {
  total_data: number;
  current_page: number;
  total_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface CoursesResponse {
  message: string;
  payload: {
    courses: Course[];
    pagination: Pagination;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  review_count: number;
  image_url: string;
  syllabus_url: string;
  instructor_id: string;
  difficulty: string;
  materials: any[];
  assignments: any[];
  updated_at: string;
}

export interface CourseProgress {
  course: Course;
  progress: number;
}

export interface CourseResponse2 {
  message: string;
  payload: CourseProgress[];
}

export interface getCoursesIdResponse {
  message: string;
  payload: Course;
}

export interface DeleteCourseResponse {
  message: string;
  payload: null;
}
