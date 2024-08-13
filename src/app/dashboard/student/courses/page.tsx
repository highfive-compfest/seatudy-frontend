"use client";
import CourseCard from "@/components/common/course-card";
import { Course } from "@/types/course/course";
import { useState, useEffect } from "react";
import { getBoughtCourse } from "../../../../services/course";
import { getCookie } from "cookies-next";

const Courses = () => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(9);

  const accToken = getCookie("authToken") as string;

  const fetchCourses = async () => {
    setPending(true);
    try {
      const data = await getBoughtCourse(accToken, 1, 9999);

      if (data.payload && Array.isArray(data.payload)) {
        setAllCourses(data.payload);
        setTotalPages(Math.ceil(data.payload.length / pageSize));
        setDisplayedCourses(data.payload.slice(0, pageSize));
      } else {
        setAllCourses([]);
        setDisplayedCourses([]);
        alert("No courses found.");
      }
    } catch (error: any) {
      setError(error as Error);
      console.log(error.response);
      alert("Error: " + error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [accToken]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCourses(allCourses.slice(startIndex, endIndex));
  }, [currentPage, allCourses]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="pt-[7rem]">
      <h1 className="text-2xl font-bold">Start Learning Now!</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-start pb-8">
        {isPending && <p>Loading...</p>}
        {displayedCourses.length > 0 ? displayedCourses.map((course) => <CourseCard key={course.id} course={course} />) : <p>No courses found.</p>}
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
          <span className="self-center text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
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
