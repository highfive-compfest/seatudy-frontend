"use client";
import DiscussionForm from "@/components/discussions/discussions-form";
import DiscussionList from "@/components/discussions/discussions-list";
import { getBoughtCourse } from "@/services/course";
import { getDiscussionsByCourseId, createDiscussion, createReply, updateDiscussion, deleteDiscussion } from "@/services/discussion";
import { CourseProgress } from "@/types/course/course";
import { Discussion } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

interface DiscussionPageProps {
  courseId: string;
}

const DiscussionPage: React.FC<DiscussionPageProps> = ({ courseId }) => {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Discussion[]>([]);
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<Discussion | null>(null);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [hasPurchased, setHasPurchased] = useState<boolean>(false);
  const [replyToMessageId, setReplyToMessageId] = useState<string | null>(null);
  const authToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getDiscussionsByCourseId(courseId, authToken);
        setMessages(response.payload.data);
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
        alert("Error fetching bought courses: " + error);
      }
    };

    getBought();
  }, [authToken, courseId]);

  const handleSendMessage = async () => {
    if (replyToMessageId) {
      if (replyMessage.trim()) {
        try {
          await createReply(replyToMessageId, replyMessage, authToken);
          setReplyMessage("");
          setReplyToMessageId(null);
          alert("Reply sent successfully.");
        } catch (error) {
          console.error("Error sending reply:", error);
          alert("Error sending reply: " + error);
        }
      } else {
        alert("Reply message cannot be empty.");
      }
    } else {
      if (newMessage.trim() && title.trim()) {
        try {
          if (selectedMessage) {
            await updateDiscussion(selectedMessage.id, title, newMessage, authToken);
            setSelectedMessage(null);
            alert("Discussion updated successfully.");
          } else {
            await createDiscussion(courseId, title, newMessage, authToken);
            alert("Discussion created successfully.");
          }
          setNewMessage("");
          setTitle("");
          setIsInputVisible(false);
        } catch (error) {
          console.error("Error sending message:", error);
          alert("Error sending message: " + error);
        }
      } else {
        alert("Title and message cannot be empty.");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleReply = (messageId: string) => {
    setReplyToMessageId(messageId);
    setIsInputVisible(true);
  };

  const handleEdit = (message: Discussion) => {
    setSelectedMessage(message);
    setTitle(message.title);
    setNewMessage(message.content);
    setIsInputVisible(true);
  };

  const handleDelete = async (messageId: string) => {
    try {
      await deleteDiscussion(messageId, authToken);
      setMessages(messages.filter((msg) => msg.id !== messageId));
      alert("Discussion deleted successfully.");
    } catch (error) {
      console.error("Error deleting discussion:", error);
      alert("Error deleting discussion: " + error);
    }
  };

  return (
    <div className="relative border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[100vh] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Discussion Chat</h2>

      <DiscussionList messages={messages} handleReply={handleReply} handleEdit={handleEdit} handleDelete={handleDelete} replyToMessageId={replyToMessageId} setReplyMessage={setReplyMessage} replyMessage={replyMessage} />

      <DiscussionForm
        newMessage={newMessage}
        title={title}
        setNewMessage={setNewMessage}
        setTitle={setTitle}
        handleSendMessage={handleSendMessage}
        isInputVisible={isInputVisible}
        toggleInputVisibility={toggleInputVisibility}
        selectedMessage={selectedMessage}
      />

      {!isInputVisible && hasPurchased && (
        <button onClick={toggleInputVisibility} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Add a Discussion +
        </button>
      )}
    </div>
  );
};

export default DiscussionPage;
