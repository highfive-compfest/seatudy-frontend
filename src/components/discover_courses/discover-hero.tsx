import { Course } from "@/types/course/course";
import Link from "next/link";
import React from "react";
import { useState } from "react";

interface CourseInfoProps {
  courses: Course[];
}

const Hero: React.FC<CourseInfoProps> = ({ courses }) => {
  const [activeTab, setActiveTab] = useState("Trending");
  const tabs = ["Trending", "Featured", "Development", "IT & Software", "Design", "Marketing", "Lifestyle", "Music"];
  const randomIndex = Math.floor(Math.random() * courses.length);

  return (
    <>
      <header className="flex pt-32 px-6 py-12 flex-col sm:flex-row justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-0">You can learn yourself</h1>
        <Link href={`course_detail?id=${courses[randomIndex]?.id}`}>
          <button className="px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-bold rounded text-sm sm:text-base">Find Something Cool!</button>
        </Link>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 mb-8 text-sm sm:text-base">The more that you read, the more things you will know. The more that you learn, the more places you&apos;ll go.</p>

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
    </>
  );
};

export default Hero;
