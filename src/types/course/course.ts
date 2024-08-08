export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  syllabus_url: string;
  instructor_id: string;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

export interface CoursesResponse {
  message: string;
  payload: Course[];
}
