import React from "react";

const SuccessStories = () => {
  // Sample data for success stories
  const stories = [
    {
      id: 1,
      name: "John Doe",
      image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
      description: "John transformed his career with our advanced data science courses. He now works as a lead data scientist at a top tech firm.",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://t3.ftcdn.net/jpg/04/60/91/88/360_F_460918802_XVCymFr7MoziFpnInbTDvrlblYhvAOi2.jpg",
      description: "Jane upskilled with our digital marketing classes and launched a successful marketing agency. Her business has grown rapidly.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      image: "https://img.freepik.com/free-photo/portrait-serious-smiling-modern-indian-man-near-office-building_496169-2890.jpg",
      description: "Michael changed his career path through our coding bootcamp. He is now a software engineer working on exciting projects.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Success Stories</h2>
        <p className="text-lg text-center text-gray-800 mb-8">Discover how our students have achieved remarkable success in their careers and lives through our courses.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <img src={story.image} alt={story.name} className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-center text-gray-800 mb-2">{story.name}</h3>
              <p className="text-gray-700 mb-4">{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
