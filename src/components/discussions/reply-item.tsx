import { useState } from "react";
import { Reply } from "@/types/discussion/discussion";
import { UserPayload } from "@/types/user/user";
import { getCookie } from "cookies-next";

interface ReplyItemProps {
  reply: Reply;
  user: UserPayload;
  handleEdit: (reply: Reply) => void;
  handleDelete: (replyId: string) => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ reply, user, handleEdit, handleDelete }) => {
  const currentUserId = getCookie("userId");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const handleUpdate = () => {
    handleEdit({ ...reply, content: editContent });
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col items-start p-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
      <div className="flex items-start space-x-2 w-full">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <img src={user.image_url || "/default-avatar.png"} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <strong className="text-sm">{user.name}</strong>
          <p className="text-xs text-gray-600">{new Date(reply.created_at).toLocaleDateString()}</p>
          {isEditing ? (
            <div className="mt-1">
              <textarea className="p-2 border border-gray-300 rounded-lg w-full" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <div className="flex space-x-2 mt-1">
                <button onClick={handleUpdate} className="text-blue-600 text-xs hover:underline focus:outline-none">
                  Update
                </button>
                <button onClick={() => setIsEditing(false)} className="text-blue-600 text-xs hover:underline focus:outline-none">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm mt-1">{reply.content}</p>
              {reply.user_id === currentUserId && (
                <div className="flex space-x-3 mt-1">
                  <button onClick={() => setIsEditing(true)} className="text-blue-600 text-xs hover:underline focus:outline-none">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(reply.id)} className="text-blue-600 text-xs hover:underline focus:outline-none">
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default ReplyItem;
