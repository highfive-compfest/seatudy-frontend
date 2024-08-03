"use client";
import React from "react";
import { useState } from "react";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("Trending");

  const tabs = ["Trending", "Featured", "Development", "IT & Software", "Design", "Marketing", "Lifestyle", "Music"];

  const courses = [
    { title: "The Ultimate Beginners Guide to Skincare", author: "Noah Oliver", price: 298.44, rating: 5.0, image: "/path/to/image1.jpg", tag: "New" },
    { title: "Discovering Science: Science Writing", author: "Amelia Ava", price: 233.34, rating: 4.0, image: "/path/to/image2.jpg", tag: "Best Seller" },
    { title: "Learn to Read - Stories for Kids", author: "James William", price: 232.13, rating: 3.0, image: "/path/to/image3.jpg", tag: "Best Seller" },
    // Add more courses as needed
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-8">
          <h1 className="text-4xl font-bold">You can learn yourself</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Explore Now</button>
        </header>
        <p className="text-gray-700 mb-8">The more that you read, the more things you will know. The more that you learn, the more places you’ll go.</p>

        <div className="mb-8">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button key={tab} className={`py-2 px-4 ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={course.image} alt={course.title} width={500} height={300} />
              <div className="p-4">
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-gray-700">by {course.author}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">${course.price}</span>
                  <span className="text-yellow-500">{course.rating} ⭐</span>
                </div>
                {course.tag && <span className="inline-block mt-4 bg-green-200 text-green-700 px-2 py-1 text-xs rounded">{course.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
