"use client";
import CourseInfo from "@/components/course_detail/CourseInfo";
import CourseProgress from "@/components/course_detail/CourseProgress";

const courseDetailDummy = {
  title: "Project Management Processes",
  instructor: {
    name: "Prof. John Breaker",
    title: "PM Expert",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  description: [
    "A project management methodology is a set of principles and practices that guide how to manage a project from start to finish. It includes various processes, techniques, and tools that ensure the project meets its objectives efficiently and effectively. Understanding these methodologies is crucial for successful project management and helps teams stay on track and within budget.",
    "Project management is so important to organizations and teams because it provides a structured approach to planning, executing, and closing projects. Effective project management helps in resource allocation, risk management, and stakeholder communication. It ensures that project goals are met, deadlines are adhered to, and any issues are promptly addressed. By mastering project management processes, you can enhance productivity and drive better outcomes for your projects.",
    "In this course, you'll dive into different project management frameworks, including Agile, Waterfall, and Scrum. You'll learn about the key stages of a project lifecycle, from initiation and planning to execution, monitoring, and closure. Additionally, the course covers essential tools and techniques for managing project schedules, budgets, and team dynamics. By the end of the course, you'll be equipped with practical skills and knowledge to manage projects effectively and contribute to your organization's success.",
  ],
  imageUrl: "https://media.graphassets.com/6ciyrxFdTcm36fQRrAlW",
  chapters: Array.from({ length: 12 }, (_, i) => i + 1),
};

const CourseDetail = () => {
  return (
    <>
      <div className="container mx-auto pt-24 px-8 pb-32">
        <div className="breadcrumb text-gray-600 text-sm mb-4">
          <a href="#" className="hover:underline">
            My Courses
          </a>{" "}
          &gt;
          <a href="#" className="hover:underline">
            {" "}
            <span> Management</span>
          </a>{" "}
          &gt;
          <span> {courseDetailDummy.title}</span>
        </div>

        <div className="flex flex-col md:flex-row">
          <CourseInfo courseDetail={courseDetailDummy} />
          <CourseProgress courseDetail={courseDetailDummy} />
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
