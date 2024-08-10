"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { dummyCourse } from "@/utils/utils";
import { getCookie } from "cookies-next";

export const EditCourse = ({course}:{course : Course|undefined}) => {
    const [formData, setFormData] = useState({
        title: course?.title,
        description: course?.description,
        price: course?.price,
        difficulty: course?.difficulty,
    });

    const [previewCourse, setPreviewCourse] = useState<Course>(dummyCourse);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const accToken = getCookie("authToken") as string;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // try {
        //   const token = accToken;
        //   if (!token) {
        //     throw new Error("No authentication token available");
        //   }
        //   const result = await createCourse(formData, token);
        //   alert("Course submitted successfully");
        //   console.log("Course submitted:", result);
        // } catch (error) {
        //   console.error("Error submitting course:", error);
        //   alert("Error submitting course: " + error);
        // } finally {
        //   setIsSubmitting(false);
        // }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
    <section className="bg-white p-10 rounded-lg shadow-lg border-2 border-gray-200 w-full md:max-w-3xl mt-6 mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-col">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mt-4 ml-0"
            required
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <input
            type="number"
            name="price"
            placeholder="Course Price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mt-4 md:mt-0"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
          Create Course
        </button>
      </form>
    </section>
    )
};
