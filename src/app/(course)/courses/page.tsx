import Navbar from "@/components/common/Navbar";
import Courses from "@/pages/Courses";
import React from "react";

const CoursesPage = () => {
  fetch('course')
  return (
    <>
      <Navbar />
      <Courses />
    </>
  );
};

export default CoursesPage;
