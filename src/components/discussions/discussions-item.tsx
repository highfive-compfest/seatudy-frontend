import { Discussion, Reply } from "@/types/discussion/discussion";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import ReplyForm from "@/components/discussions/reply-form";
import { getRepliesByDiscussionId, createReply, deleteReply, updateReply } from "@/services/discussion";
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
  const [editingReply, setEditingReply] = useState<Reply | null>(null);
  const [editReplyMessage, setEditReplyMessage] = useState<string>("");

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

  useEffect(() => {
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
        await fetchReplies();
      } catch (error) {
        alert("Error sending reply: " + error);
      }
    }
  };

  const handleEditReply = (updatedReply: Reply) => {
    setReplies(replies.map((reply) => (reply.id === updatedReply.id ? updatedReply : reply)));
  };

  const handleUpdateReply = async () => {
    if (editingReply && editReplyMessage.trim()) {
      try {
        const authToken = getCookie("authToken") as string;
        await updateReply(editingReply.id, editReplyMessage, authToken);
        setReplies(replies.map((reply) => (reply.id === editingReply.id ? { ...reply, content: editReplyMessage } : reply)));
        setEditingReply(null);
        setEditReplyMessage("");
        alert("Reply updated successfully");
        await fetchReplies();
      } catch (error) {
        alert("Error updating reply: " + error);
      }
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      const authToken = getCookie("authToken") as string;
      await deleteReply(replyId, authToken);
      setReplies(replies.filter((reply) => reply.id !== replyId));
      alert("Reply deleted successfully");
      await fetchReplies(); // Refresh replies
    } catch (error) {
      console.error("Error deleting reply:", error);
      alert("Error deleting reply: " + error);
    }
  };

  if (!user) return null;

  return (
    <li className={`flex flex-col items-start w-auto space-y-4 p-4 rounded-lg shadow border-2 ${message.user_id === getCookie("userId") ? "bg-blue-100 text-blue-800 self-end border-blue-500" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
      <div className="flex items-start space-x-4 w-full">
        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${message.user_id === getCookie("userId") ? "border-blue-300" : "border-gray-300"}`}>
          <img src={user.image_url || "/default-avatar.png"} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <strong className="text-xl mr-2">{user.name}</strong>
            <span className="text-xs text-gray-500">{new Date(message.created_at).toLocaleDateString()}</span>
          </div>
          <p className="text-medium font-bold">{message.title}</p>
          <p className="text-sm mb-2">{message.content}</p>
          {message.user_id === getCookie("userId") && (
            <div className="flex space-x-3">
              <button onClick={() => handleEdit(message)} className="text-blue-600 text-xs hover:underline focus:outline-none">
                Edit
              </button>
              <button onClick={() => handleDelete(message.id)} className="text-blue-600 text-xs hover:underline focus:outline-none">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <button onClick={() => setShowReplies(!showReplies)} className="text-blue-600 text-xs hover:underline focus:outline-none">
        {showReplies ? "Hide" : "Show"} Replies ({replies.length})
      </button>
      {showReplies && (
        <ul className="pl-8 w-full space-y-4">
          {replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} user={user} handleEdit={(updatedReply) => handleEditReply(updatedReply)} handleDelete={handleDeleteReply} />
          ))}
          <ReplyForm replyMessage={localReplyMessage} setReplyMessage={setLocalReplyMessage} handleSendMessage={handleSendReply} />
        </ul>
      )}
    </li>
  );
};

export default DiscussionItem;
