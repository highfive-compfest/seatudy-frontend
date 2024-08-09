import { Course } from "@/types/course/course";

export const getSegment = (pathname : string, index : number) => {
    const parts = pathname.split('/');
    return parts[index]; 
};

export const dummyCourse: Course = {
    id: "dummy-id",
    title: "Sample Course Title",
    description: "This is a sample course description to demonstrate the CourseCard layout.",
    price: 10000,
    image_url: "https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg",
    syllabus_url: "",
    instructor_id: "dummy-instructor-id",
    difficulty: "Beginner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };