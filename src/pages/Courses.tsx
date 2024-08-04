"use client";
import CourseCard from "@/components/common/CourseCard";
import React from "react";
import { useState } from "react";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("Trending");

  const tabs = ["Trending", "Featured", "Development", "IT & Software", "Design", "Marketing", "Lifestyle", "Music"];

  const courses = [
    {
      id: 1,
      title: "Design Thinking",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
      age: "15+",
      duration: "60 mins",
      price: "100k",
      image: "https://awsimages.detik.net.id/community/media/visual/2023/01/20/design-thinking_169.jpeg?w=1200",
    },
    {
      id: 2,
      title: "Build Mobile App",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
      age: "15+",
      duration: "60 mins",
      price: "100k",
      image: "https://learn.g2.com/hubfs/apple-applications-apps-607812.jpg",
    },
    {
      id: 3,
      title: "Leadership",
      description: "Lorem ipsum dolor amet, consectetur adipiscing elit. Mattis et sed nam sem tellus erat.",
      age: "15+",
      duration: "60 mins",
      price: "100k",
      image: "https://asset.gallup.com/p/CSFCMSEN/742a568e-cef5-48a2-a019-7eb845c43df9.jpg",
    },
    {
      id: 4,
      title: "Advanced Programming",
      description: "Learn advanced programming techniques and best practices for professional development.",
      age: "18+",
      duration: "90 mins",
      price: "150k",
      image: "https://cdn-blog.superprof.com/blog_in/wp-content/uploads/2022/11/programming-language.jpg",
    },
  ];

  return (
    <>
      <header className="flex pt-32 px-6 py-12 flex-col sm:flex-row justify-between items-center mb-8 bg-gradient-to-r from-blue-500 via-teal-500 to-blue-700 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">You can learn yourself</h1>
        <button className="px-4 py-2 bg-white text-blue-500 font-bold rounded text-sm sm:text-base">Explore Now</button>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 mb-8 text-sm sm:text-base">The more that you read, the more things you will know. The more that you learn, the more places you’ll go.</p>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button key={tab} className={`py-2 px-4 rounded-lg text-sm sm:text-base ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide mb-12">
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 w-[0.2em]"></div>
          {courses.map((course, key) => (
            <CourseCard course={course} />
          ))}
          <div className="flex-shrink-0 w-[1em]"></div>
        </div>
      </div>
    </>
  );
};

export default Courses;
