import { Course } from "@/types/course/course";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface CourseInfoProps {
  courses: Course[];
  onTabChange?: (tab: string | null) => void;
}

const tabs = {
  "Web Development": "Web Dev",
  "Game Development": "Game Dev",
  "Cloud Computing": "Cloud Comp",
  "Data Science & Analytics": "Data Science",
  "Programming Languages": "Programming",
  Cybersecurity: "Cybersecurity",
  "Mobile App Development": "Mobile Dev",
  "Database Management": "Database",
  "Software Development": "Software Dev",
  "DevOps & Automation": "DevOps",
  Networking: "Networking",
  "AI & Machine Learning": "AI & ML",
  "Internet of Things (IoT)": "IoT",
  "Blockchain & Cryptocurrency": "Blockchain",
  "Augmented Reality (AR) & Virtual Reality (VR)": "AR & VR",
};

const Hero: React.FC<CourseInfoProps> = ({ courses, onTabChange }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const randomIndex = Math.floor(Math.random() * courses.length);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  const handleTabClick = (tab: string) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
  };

  return (
    <>
      <header className="flex pt-32 px-6 py-12 flex-col sm:flex-row justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-0 text-center md:text-start ">Discover the Best Courses for You</h1>
        <Link href={`course_detail?id=${courses[randomIndex]?.id}`}>
          <button className="px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-bold rounded-full text-sm sm:text-base transition duration-300 ease-in-out">Find Something Cool!</button>
        </Link>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-700 mb-8 text-sm sm:text-base">The more that you read, the more things you will know. The more that you learn, the more places you&apos;ll go.</p>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(tabs).map(([fullName, shortName]) => (
              <button
                key={fullName}
                className={`py-2 px-6 rounded-full text-sm sm:text-base ${activeTab === fullName ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white" : "bg-gray-200 text-gray-700"} transition duration-300 ease-in-out`}
                onClick={() => handleTabClick(fullName)}
              >
                {shortName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
