import React from "react";
import { FaBook, FaChalkboardTeacher, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://study.com/cimages/multimages/16/8a479f0b-398d-4563-917d-e99bed7a109e_study_group.jpeg')" }}>
        <div className="relative flex items-center justify-center h-full bg-black/30">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Self-Paced Learning Courses Online</h1>
            <p className="text-m m:text-l lg:text-xl mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, vestibulum euismod nullam elementum.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Start a course</button>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-blue-500 md:mx-32 lg:mx-64 md:mb-8 md:rounded-lg absolute bottom-0 left-0 right-0 p-4 md:bg-white text-black flex justify-around shadow-md">
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaBook className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">1400+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Online Courses</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaChalkboardTeacher className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">1100+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Expert Instructors</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaStar className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">800+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Success Stories</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
