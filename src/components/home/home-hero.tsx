"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBook, FaChalkboardTeacher, FaStar } from "react-icons/fa";

type CounterValues = {
  courses: number;
  instructors: number;
  successStories: number;
};

const Hero: React.FC = () => {
  const [counterValues, setCounterValues] = useState<CounterValues>({
    courses: 0,
    instructors: 0,
    successStories: 0,
  });

  useEffect(() => {
    const animateNumber = (key: keyof CounterValues, endValue: number, duration: number) => {
      let start = 0;
      const stepTime = Math.abs(Math.floor(duration / endValue));
      const timer = setInterval(() => {
        start += 1;
        setCounterValues((prev) => ({
          ...prev,
          [key]: start,
        }));
        if (start === endValue) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    animateNumber("courses", 1400, 2000);
    animateNumber("instructors", 1100, 2000);
    animateNumber("successStories", 800, 2000);
  }, []);

  return (
    <>
      <div className="relative bg-cover bg-center h-screen blur-animation wiggle-bg" style={{ backgroundImage: "url('https://miro.medium.com/v2/resize:fit:8000/1*7iBUzC4UvwNi8agIsCrZ7w.png')" }}>
        <a className="absolute bottom-0 left-0 p-4 text-white text-xs z-10 hover:underline" href="https://medium.com/flutter/flutter-whats-next-on-the-web-e0454bff964">
          Courtesy: Flutter Engage by Google
        </a>
        <div className="relative flex items-center justify-center h-full bg-black/20 blur-animation">
          <div className="text-center text-white px-4 scale-animation">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
              Discover Your Path to Knowledge
            </h1>
            <p className="text-m m:text-l lg:text-xl mb-8" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
              Join thousands of learners who are expanding their horizons with our expert-led online courses. Learn at your own pace and achieve your goals.
            </p>

            <Link href="/discover_courses">
              <button className="bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600 border-white text-white font-bold py-3 px-6 rounded-full">Start Learning</button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="hidden md:flex bg-blue-500 md:mx-32 lg:mx-64 mb-0s md:mb-8 md:rounded-lg absolute bottom-0 left-0 right-0 p-4 md:bg-white text-black justify-around shadow-md fade-animation">
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaBook className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.courses}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Online Courses</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaChalkboardTeacher className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.instructors}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Expert Instructors</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaStar className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.successStories}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Success Stories</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex md:hidden bg-blue-500 md:mx-32 lg:mx-64 mb-0s md:mb-8 md:rounded-lg p-4 md:bg-white text-black justify-around shadow-md fade-animation">
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaBook className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.courses}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Online Courses</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaChalkboardTeacher className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.instructors}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Expert Instructors</p>
          </div>
          <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-95">
            <FaStar className="h-6 w-6 text-white md:text-blue-500 mb-2" />
            <p className="text-white md:text-black text-xl font-bold">{counterValues.successStories}+</p>
            <p className="text-white text-sm md:text-l md:text-blue-500">Success Stories</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
