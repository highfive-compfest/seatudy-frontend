"use client";
import { getBoughtCourse } from "@/services/course";
import { getDiscussionsByCourseId, createDiscussion } from "@/services/discussion";
import { CourseProgress } from "@/types/course/course";
import { Discussion } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface DiscussionPageProps {
  courseId: string;
}

const DiscussionPage: React.FC<DiscussionPageProps> = ({ courseId }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Discussion[]>([]);
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false); // State to track course purchase status
  const authToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getDiscussionsByCourseId(courseId, authToken);
        setMessages(response.payload.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchMessages();
  }, [courseId, authToken]);

  useEffect(() => {
    const getBought = async () => {
      try {
        const response = await getBoughtCourse(authToken);
        setCourses(response.payload);
        setHasPurchased(response.payload.some((course) => course.course.id === courseId));
      } catch (error) {
        console.error("Error fetching bought courses:", error);
        alert("Error fetching: " + error);
      }
    };

    getBought();
  }, [authToken, courseId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && title.trim()) {
      try {
        const response = await createDiscussion(courseId, title, newMessage, authToken);
        setNewMessage("");
        setTitle("");
        setError(null);
        setIsInputVisible(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage();
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className="relative border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[100vh] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Discussion Chat</h2>

      <div className="flex-1 overflow-y-auto mb-20">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No discussions available. Be the first to start a conversation!</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className={`flex items-start space-x-4 p-4 rounded-lg ${message.user_id === getCookie("userId") ? "bg-blue-100 text-blue-800 self-end" : "bg-gray-100 text-gray-800"}`}>
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${message.user_id === getCookie("userId") ? "bg-blue-300" : "bg-gray-300"} flex items-center justify-center`}>
                    <span className="text-xl font-bold text-white">{message.user_id[0]}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <strong>{message.user_id}</strong>
                    <span className="text-xs text-gray-500">{message.created_at}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isInputVisible && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex flex-col space-y-2 shadow-lg">
          <input type="text" value={title} onChange={handleTitleChange} className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a title..." />
          <textarea
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            rows={4}
          />
          <div className="flex w-full space-x-2">
            <button onClick={handleSendMessage} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Send
            </button>
            <button onClick={toggleInputVisibility} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              Cancel
            </button>
          </div>
        </div>
      )}

      {!isInputVisible && hasPurchased && (
        <button onClick={toggleInputVisibility} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Add a Discussion +
        </button>
      )}
    </div>
  );
};

export default DiscussionPage;
