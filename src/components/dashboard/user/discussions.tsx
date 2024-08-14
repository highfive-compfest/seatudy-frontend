"use client";
import { usePathname } from "next/navigation";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface Message {
  id: string;
  user: string;
  content: string;
}

interface DiscussionPageProps {
  discussionId: string;
}

const DiscussionPage: React.FC<DiscussionPageProps> = ({ discussionId }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "Alice", content: "Hello everyone!" },
    { id: "2", user: "Bob", content: "Hi Alice! How are you?" },
    { id: "3", user: "Alice", content: "Im good, thanks! Just wanted to discuss our project." },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), user: "You", content: newMessage }]);
      setNewMessage("");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[calc(100vh-12rem)] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Discussion Chat</h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id} className={`p-4 border-2 border-gray-200 rounded-lg ${message.user === "You" ? "bg-blue-100 text-blue-700 ml-4" : "bg-gray-100 text-gray-700 mr-4"}`}>
              <strong>{message.user}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>

      {pathname === "/dashboard/student/discussions" && (
        <div className="mt-4 flex">
          <input type="text" value={newMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} className="flex-1 p-2 border border-gray-300 rounded-l-lg" placeholder="Type a message..." />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-300">
            Send
          </button>
        </div>
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
