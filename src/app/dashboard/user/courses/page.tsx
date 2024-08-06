import CourseCard from "@/components/common/course-card";
import { courses } from "@/types/dummy/CourseDummy";

const Courses = () => {
  return (
    <section className="pt-[7rem] md:pl-[17rem] overflow-auto">
      <h1 className="text-2xl font-bold">Courses</h1>
      <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
        {courses.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
