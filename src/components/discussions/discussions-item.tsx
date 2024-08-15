import { Discussion } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";

interface DiscussionItemProps {
  message: Discussion;
  handleReply: (messageId: string) => void;
  handleEdit: (message: Discussion) => void;
  handleDelete: (messageId: string) => void;
  replyToMessageId: string | null;
  setReplyMessage: React.Dispatch<React.SetStateAction<string>>;
  replyMessage: string;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ message, handleReply, handleEdit, handleDelete, replyToMessageId, setReplyMessage, replyMessage }) => {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(message.user_id);
        setUser(userData.payload);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [message.user_id]);

  if (!user) return null;
  return (
    <li className={`flex flex-col items-start space-y-4 p-4 rounded-lg shadow-md ${message.user_id === getCookie("userId") ? "bg-blue-100 text-blue-800 self-end" : "bg-gray-100 text-gray-800"}`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${message.user_id === getCookie("userId") ? "border-blue-300" : "border-gray-300"}`}>
          <img src={user.image_url || "/default-avatar.png"} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <strong className="text-lg mr-2">{user.name}</strong>
            <span className="text-xs text-gray-500">{new Date(message.created_at).toLocaleDateString()}</span>
          </div>
          <p className="text-sm mb-2">{message.content}</p>
          <div className="flex space-x-3">
            <button onClick={() => handleReply(message.id)} className="text-blue-600 text-xs hover:underline focus:outline-none">
              Reply
            </button>
            <button onClick={() => handleEdit(message)} className="text-blue-600 text-xs hover:underline focus:outline-none">
              Edit
            </button>
            <button onClick={() => handleDelete(message.id)} className="text-blue-600 text-xs hover:underline focus:outline-none">
              Delete
            </button>
          </div>
          {replyToMessageId === message.id && (
            <div className="mt-4">
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Type a reply..."
                rows={3}
              />
              <button onClick={() => handleReply(message.id)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Send Reply
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default DiscussionItem;
