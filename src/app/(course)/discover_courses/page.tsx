"use client";
import CourseCard from "@/components/common/course-card";
import Hero from "@/components/discover_courses/discover-hero";
import Navbar from "@/components/common/main-navbar";
import React, { useEffect, useState, useCallback } from "react";
import Footer from "@/components/common/main-footer";
import { getCoursesByCategory, getCoursesByDifficulty, getCoursesByRating, getPopularCourses } from "../../../services/course";
import { Course } from "@/types/course/course";

const DiscoverCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("beginner");
  const [sortOrder, setSortOrder] = useState<"lowest" | "highest">("lowest");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [coursesPerPage] = useState(10);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const popularCoursesData = await getPopularCourses();
        setPopularCourses(popularCoursesData.payload.courses);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchPopularCourses();
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      let fetchedCourses: Course[] = [];

      if (selectedCategory) {
        const categoryCoursesData = await getCoursesByCategory(selectedCategory, currentPage, coursesPerPage);
        fetchedCourses = categoryCoursesData.payload.courses;
        setTotalPages(categoryCoursesData.payload.pagination.total_page);
      } else {
        const difficultyCoursesData = await getCoursesByDifficulty(currentPage, coursesPerPage, selectedDifficulty);
        const difficultyCourses = difficultyCoursesData.payload.courses;

        const ratingCoursesData = await getCoursesByRating(currentPage, coursesPerPage, sortOrder);
        const ratingCourses = ratingCoursesData.payload.courses;

        fetchedCourses = difficultyCourses.filter((course) => ratingCourses.some((ratedCourse) => ratedCourse.id === course.id));

        setTotalPages(ratingCoursesData.payload.pagination.total_page);
      }

      fetchedCourses.sort((a, b) => {
        if (sortOrder === "lowest") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });

      setCourses(fetchedCourses);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedDifficulty, sortOrder, currentPage, coursesPerPage]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const chunkArray = (array: Course[], size: number) => {
    const result: Course[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const coursesInLayers = chunkArray(courses, 5);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "lowest" | "highest");
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <Hero courses={courses} onTabChange={setSelectedCategory} />

      <div className="mt-4 mb-12">
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

            <div className="flex flex-col md:flex-row items-center mb-4 px-4 mt-6 ml-5">
              <label htmlFor="difficulty" className="mr-4">
                Difficulty:
              </label>
              <select id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>

              <label htmlFor="sortOrder" className="ml-4 mr-4 mt-3 md:mt-0">
                Sort by:
              </label>
              <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="px-4 py-2 border rounded-lg w-full md:w-auto">
                <option value="lowest">Lowest Rating</option>
                <option value="highest">Highest Rating</option>
              </select>
            </div>

            <div className="overflow-x-auto scrollbar-hide mb-12 mt-4">
              <h2 className="text-2xl font-bold mb-4 ml-9">Other Courses</h2>
              <div className="flex flex-col gap-4 px-4 mx-4">
                {courses.length > 0 ? (
                  coursesInLayers.map((layer, layerIndex) => (
                    <div key={layerIndex} className="flex space-x-4 overflow-x-auto mb-4 scrollbar-hide">
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
            <h2 className="text-2xl font-bold mb-4">{`${selectedCategory}`}</h2>
            {courses.length > 0 ? (
              <div className="flex space-x-4 overflow-x-auto">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-gray-700">No courses found for the selected category. Please try a different category.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DiscoverCoursesPage;
