import React from "react";

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
    <div className="bg-blue-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-2 mt-8">Explore Courses</h1>
      <p className="text-center mb-8">Our most popular course subjects</p>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 py-y">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-[24em]">
              <div className="relative" style={{ height: "12em" }}>
                <img src={course.image} alt={course.title} className="rounded-t-lg absolute inset-0 w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold mt-4">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span>
                  Ages <strong>{course.age}</strong>
                </span>
                <span>
                  Duration <strong>{course.duration}</strong>
                </span>
                <span>
                  Price <strong>{course.price}</strong>
                </span>
              </div>
              <button className="mt-4 text-blue-500 underline">Show more &rarr;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
