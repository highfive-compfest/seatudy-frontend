"use client";
import CourseCard from "@/components/common/course-card";
import Hero from "@/components/discover_courses/discover-hero";
import Navbar from "@/components/common/main-navbar";
import React, { useEffect, useState } from "react";
import Footer from "@/components/common/main-footer";
import { getAllCourses, getPopularCourses } from "../../../services/course";
import { Course } from "@/types/course/course";

const DiscoverCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [coursesPerPage] = useState(10);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesData = await getAllCourses(currentPage, coursesPerPage);
        setCourses(allCoursesData.payload.courses);
        setTotalPages(allCoursesData.payload.pagination.total_page);

        const popularCoursesData = await getPopularCourses();
        setPopularCourses(popularCoursesData.payload.courses);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  const filterWords = (text: string, keywords: string[]) => {
    return keywords.some((word) => text.toLowerCase().includes(word.toLowerCase()));
  };

  const filteredCourses = selectedCategory
    ? courses.filter((course) => {
        const keywords = selectedCategory
          .split(" ")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);
        return filterWords(course.title, keywords);
      })
    : courses;

  const currentCourses = filteredCourses;

  const chunkArray = (array: Course[], size: number) => {
    const result: Course[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const coursesInLayers = chunkArray(currentCourses, 5);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Navbar />
      <Hero courses={courses} onTabChange={setSelectedCategory} />

      {selectedCategory === null ? (
        <>
          <section className="overflow-x-auto scrollbar-hide mt-12 px-4">
            <h2 className="text-2xl font-bold mb-4 ml-5">Popular Courses</h2>
            <div className="flex space-x-4">
              <div className="flex-shrink-0 md:w-[0.2em]"></div>
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {popularCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </section>

          <div className="overflow-x-auto scrollbar-hide mb-12 mt-4">
            <h2 className="text-2xl font-bold mb-4 ml-9">Other Courses</h2>
            <div className="flex flex-col gap-4 px-4 mx-4">
              {currentCourses.length > 0 ? (
                coursesInLayers.map((layer, layerIndex) => (
                  <div key={layerIndex} className="flex space-x-4 overflow-x-auto mb-4  scrollbar-hide">
                    {layer.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No courses found for the current page.</p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2">
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2">
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="px-4 mt-12 mb-12 overflow-x-auto scrollbar-hide mx-4">
          <h2 className="text-2xl font-bold mb-4">Filtered Courses</h2>
          {filteredCourses.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No courses found for the selected category. Please try a different category.</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default DiscoverCoursesPage;
