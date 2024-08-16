"use client";
import CourseCard from "@/components/common/course-card";
import { Course } from "@/types/course/course";
import { useState, useEffect } from "react";
import { getInstructorCourse } from "../../../../services/course";
import { getCookie } from "cookies-next";
import { Spinner } from "@nextui-org/spinner";

const ITEMS_PER_PAGE = 9;

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const accToken = getCookie("authToken") as string;
  const userId = getCookie("userId") as string;

  useEffect(() => {
    const fetchCourses = async () => {
      setPending(true);
      try {
        const data = await getInstructorCourse(accToken, userId, currentPage, ITEMS_PER_PAGE);
        setCourses(data.payload.courses);
        setTotalPages(data.payload.pagination.total_page);
      } catch (error: any) {
        setError(error as Error);
        console.log(error.response);
      } finally {
        setPending(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="pt-[7rem] pb-12">
      <h1 className="text-2xl font-bold">Manage Your Courses</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-start pb-8">
        {isPending && <Spinner/>}
        {courses.length > 0 ? courses.map((course) => <CourseCard key={course.id} course={course} />) : <p>No courses found.</p>}
      </div>

      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors duration-300"
          >
            Previous
          </button>
          <span className="text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
