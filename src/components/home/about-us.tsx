"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

const AboutUs = () => {
  const handlePlayButtonClick = () => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  };

  return (
    <div className="h-auto w-full bg-white py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-center items-center p-8 h-full w-full">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Find Your Course That Makes Bright Future</h1>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies at diam magnis faucibus et faucibus gravida. malesuada fauci bus iaculis eu. Fusce est, consectetur tempor penatibus sed. Ut dolor, vulputate quam nec aliquam
            aliquam nisl. Auctor eros, iaculis quam nisi,
          </p>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et hendrerit euismod fusce sit.</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Learn More</button>
        </div>

        <div className="relative mt-8 md:mt-0 md:ml-8 w-full md:w-1/2 lg:w-2/5 px-2 md:px-0">
          <img className="w-full h-auto rounded-lg" src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?cs=srgb&dl=pexels-lilartsy-1925536.jpg&fm=jpg" alt="Course Image" />
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black hover:bg-blue-400 bg-opacity-50 rounded-full p-4" onClick={handlePlayButtonClick}>
            <FaPlay className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
