import Link from "next/link";
import React from "react";
import CourseCard from "../common/CourseCard";

const Explore = () => {
  // Dummy data
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
    <div className="bg-blue-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-2 mt-8">Explore Courses</h1>
      <p className="text-center mb-8">Our most popular course subjects</p>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 w-[1em]"></div>

          {courses.map((course) => (
            <CourseCard course={course} />
          ))}

          <div className="bg-blue-200 p-6 rounded-lg shadow-lg flex-shrink-0 w-[14em] flex items-center justify-center">
            <Link href="/courses">
              <button className="text-blue-600 font-bold text-lg">See All Courses &rarr;</button>
            </Link>
          </div>

          <div className="flex-shrink-0 w-[1em]"></div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
