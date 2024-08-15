import { Discussion, Reply } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import ReplyForm from "@/components/discussions/reply-form";
import { getRepliesByDiscussionId, createReply, deleteReply } from "@/services/discussion";
import ReplyItem from "@/components/discussions/reply-item";

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
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [localReplyMessage, setLocalReplyMessage] = useState<string>("");

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

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const authToken = getCookie("authToken") as string;
        const data = await getRepliesByDiscussionId(message.id, authToken);
        setReplies(data.payload.data);
      } catch (error) {
        console.error("Error fetching replies:", error);
        alert("Error fetching replies: " + error);
      }
    };

    if (showReplies) {
      fetchReplies();
    }
  }, [showReplies, message.id]);

  const handleSendReply = async () => {
    if (localReplyMessage.trim()) {
      try {
        const authToken = getCookie("authToken") as string;
        await createReply(message.id, localReplyMessage, authToken);
        setLocalReplyMessage("");
        setReplyMessage("");
        setShowReplies(true);
        alert("Reply sent successfully");
      } catch (error) {
        alert("Error sending reply: " + error);
      }
    }
  };

  const handleEditReply = (reply: Reply) => {
    console.log("Editing reply:", reply);
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      const authToken = getCookie("authToken") as string;
      await deleteReply(replyId, authToken);
      setReplies(replies.filter((reply) => reply.id !== replyId));
      alert("Reply deleted successfully");
    } catch (error) {
      console.error("Error deleting reply:", error);
      alert("Error deleting reply: " + error);
    }
  };

  if (!user) return null;

  return (
    <li className={`flex flex-col items-start w-auto space-y-4 p-4 rounded-lg shadow-md ${message.user_id === getCookie("userId") ? "bg-blue-100 text-blue-800 self-end" : "bg-gray-100 text-gray-800"}`}>
      <div className="flex items-start space-x-4 w-full">
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
          {replyToMessageId === message.id && <ReplyForm replyMessage={localReplyMessage} setReplyMessage={setLocalReplyMessage} handleSendMessage={handleSendReply} />}
          <button onClick={() => setShowReplies(!showReplies)} className="mt-2 text-blue-600 text-xs hover:underline focus:outline-none">
            {showReplies ? "Hide Replies" : "Show Replies"}
          </button>
          {showReplies && replies.length > 0 && (
            <ul className="mt-2 space-y-2">
              {replies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} user={user} handleEdit={handleEditReply} handleDelete={handleDeleteReply} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

export default DiscussionItem;
