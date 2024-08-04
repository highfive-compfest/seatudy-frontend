import CourseCard from "@/components/common/CourseCard";

const Courses = () => {

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
      <section className="pt-[7rem] md:pl-[17rem] overflow-auto">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
            {courses.map((course, idx)=>(
                <CourseCard key={idx} course={course}/>
            ))}
        </div>
      </section>
    )
}

export default Courses