"use client";
import { getDiscussionsByCourseId, createDiscussion } from "@/services/discussion";
import { Discussion, DiscussionsResponse } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface DiscussionPageProps {
  courseId: string;
}

const DiscussionPage: React.FC<DiscussionPageProps> = ({ courseId }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Discussion[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const authToken = getCookie("authToken") as string;
  const userId = getCookie("userId") as string;

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
    <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[100vh] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Discussion Chat</h2>

      <div className="flex-1 overflow-y-auto">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No discussions available. Be the first to start a conversation!</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className={`flex items-start space-x-4 p-4 rounded-lg ${message.user_id === userId ? "bg-blue-100 text-blue-800 self-end" : "bg-gray-100 text-gray-800"}`}>
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${message.user_id === userId ? "bg-blue-300" : "bg-gray-300"} flex items-center justify-center`}>
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

      {pathname === "/dashboard/student/discussions" && (
        <>
          {!isInputVisible && (
            <button onClick={toggleInputVisibility} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-4">
              Add a Discussion
            </button>
          )}

          {isInputVisible && (
            <div className="flex flex-col space-y-2">
              <input type="text" value={title} onChange={handleTitleChange} className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a title..." />
              <textarea
                value={newMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                rows={4}
              />
              <div className="flex w-full">
                <button onClick={handleSendMessage} className="flex-1  bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mr-2">
                  Send
                </button>
                <button onClick={toggleInputVisibility} className="flex-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {pathname === "/discussions" && (
        <div className="">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-gray-200 py-3 px-6 rounded-lg shadow-lg space-y-4 lg:space-y-0">
            <div className="text-white text-lg font-medium flex flex-row items-center justify-between ">
              <p>Buy this course to gain full access to all discussions</p>
              <button className="py-3 px-6 bg-blue-500 hover:bg-purple-600 text-white font-semibold rounded-lg self-stretch lg:self-auto w-full lg:w-auto text-sm">Buy This Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionPage;
