import { Discussion } from "@/types/discussion/discussion";
import DiscussionItem from "./discussions-item";

interface DiscussionListProps {
  messages: Discussion[];
  handleReply: (messageId: string) => void;
  handleEdit: (message: Discussion) => void;
  handleDelete: (messageId: string) => void;
  replyToMessageId: string | null;
  setReplyMessage: React.Dispatch<React.SetStateAction<string>>;
  replyMessage: string;
}

const DiscussionList: React.FC<DiscussionListProps> = ({ messages, handleReply, handleEdit, handleDelete, replyToMessageId, setReplyMessage, replyMessage }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-20">
      <ul className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No discussions available. Be the first to start a conversation!</p>
        ) : (
          messages.map((message) => (
            <DiscussionItem
              key={message.id}
              message={message}
              handleReply={handleReply}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              replyToMessageId={replyToMessageId}
              setReplyMessage={setReplyMessage}
              replyMessage={replyMessage}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default DiscussionList;
