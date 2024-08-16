import { Course } from "@/types/course/course";
import { Spinner } from "@nextui-org/spinner";
import React, { useState, ChangeEvent } from "react";

interface CourseFormProps {
  onSubmit: (formData: FormData) => void;
  onPreview: (course: Course) => void;
  values: any;
  isSubmitting : boolean;
  text : {
    tittle : string;
    button : string
  }
}

const CreateCourse: React.FC<CourseFormProps> = ({ onSubmit, onPreview, values, isSubmitting, text }) => {
  const defaultCategory = "Web Development";
  const defaultDifficulty = "beginner";

  const [formData, setFormData] = useState({
    title: values?.title || "",
    description: values?.description || "",
    price: values?.price || "",
    difficulty: values?.difficulty || "beginner",
    category: values?.category || "Programming",
    image: null as File | null,
    syllabus: null as File | null,
  });

  const categories = [
    "Web Development",
    "Game Development",
    "Cloud Computing",
    "Data Science & Analytics",
    "Programming Languages",
    "Cybersecurity",
    "Mobile App Development",
    "Database Management",
    "Software Development",
    "DevOps & Automation",
    "Networking",
    "AI & Machine Learning",
    "Internet of Things (IoT)",
    "Blockchain & Cryptocurrency",
    "Augmented Reality (AR) & Virtual Reality (VR)",
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("difficulty", formData.difficulty || defaultDifficulty);
    form.append("category", formData.category || defaultCategory);
    if (formData.image) form.append("image", formData.image);
    if (formData.syllabus) form.append("syllabus", formData.syllabus);
    const target = e.target as HTMLFormElement
    target.reset()
    onSubmit(form);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    const previewData: Course = {
      id: "",
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      image_url: formData.image ? URL.createObjectURL(formData.image) : "",
      syllabus_url: formData.syllabus ? URL.createObjectURL(formData.syllabus) : "",
      instructor_id: "",
      difficulty: formData.difficulty || defaultDifficulty,
      category: formData.category || defaultCategory,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      rating: 0,
      review_count: 0,
      materials: [],
      assignments: [],
    };
    onPreview(previewData);
  };

  return (
    <section className="bg-white p-10 rounded-lg shadow-lg border-2 border-gray-200 w-full h-auto md:max-w-3xl">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">{text.tittle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-col">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mt-4 ml-0"
            required
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
              min="0" // Prevents negative values
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>

          <div className="w-full mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mt-4 md:mt-0"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="w-full mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>
          <div className="w-full mt-4 md:mt-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Syllabus</label>
            <input
              type="file"
              name="syllabus"
              accept=".pdf,.doc,.docx,.bmp"
              onChange={handleFileChange}
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              required
            />
          </div>
        </div>
        <button type="button" onClick={handlePreview} className="w-full border-2 border-blue-600 text-blue-600 p-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
          Preview
        </button>
        {isSubmitting?<div className="flex justify-center"><Spinner/></div>:<button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
          {text.button}
        </button>}
      </form>
    </section>
  );
};

export default CreateCourse;
