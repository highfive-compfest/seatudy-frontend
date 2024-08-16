import { Discussion } from "@/types/discussion/discussion";

interface DiscussionFormProps {
  newMessage: string;
  title: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isInputVisible: boolean;
  toggleInputVisibility: () => void;
  selectedMessage: Discussion | null;
}

const DiscussionForm: React.FC<DiscussionFormProps> = ({ newMessage, title, setNewMessage, setTitle, handleSendMessage, isInputVisible, toggleInputVisibility, selectedMessage }) => {
  return (
    isInputVisible && (
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex flex-col space-y-2 shadow-lg">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a title..." />
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type a message..." rows={4} />
        <div className="flex w-full space-x-2">
          <button onClick={handleSendMessage} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            {selectedMessage ? "Update" : "Send"}
          </button>
          <button onClick={toggleInputVisibility} className="flex-2 bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300">
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default DiscussionForm;
