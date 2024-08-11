"use client";

import React from "react";

const AboutUs = () => {
  return (
    <div className="h-auto w-full bg-gray-100 py-8 md:py-16">
      <div className="flex flex-col md:flex-row justify-center items-center p-8 h-full w-full">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-4xl font-bold mb-6 text-blue-800">Empowering Your Learning Journey</h1>
          <p className="mb-6 text-gray-700 text-justify">
            At our platform, we believe in providing exceptional educational resources to help you achieve your goals. Our diverse range of courses is designed to fit your learning style, whether you are looking to advance in your career or
            explore new passions.
          </p>
          <p className="mb-6 text-gray-700 text-justify">With expert instructors and a flexible learning environment, you can tailor your education to your needs. Join us and take the first step towards a brighter future.</p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Learn More</button>
        </div>

        <div className="relative mt-8 md:mt-0 md:ml-12 w-full md:w-1/2 lg:w-2/5 px-4 md:px-0">
          <div className="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/-vAOJds0XRw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
