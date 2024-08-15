interface ReplyFormProps {
  replyMessage: string;
  setReplyMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ replyMessage, setReplyMessage, handleSendMessage }) => {
  return (
    <div className="mt-2">
      <textarea
        value={replyMessage}
        onChange={(e) => setReplyMessage(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Type a reply..."
        rows={2}
      />
      <button onClick={handleSendMessage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
        Send Reply
      </button>
    </div>
  );
};

export default ReplyForm;
