import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { AssignmentType } from "@/types/assignment/assignment";
import { createSubmission, getSubmission, updateSubmission, deleteSubmission } from "@/services/submission";
import { getCookie } from "cookies-next";

interface AssignmentDetailsModalProps {
  assignment: AssignmentType | null;
  onClose: () => void;
  markAsDone: (assignmentId: string) => Promise<void>;
}

const AssignmentDetailsModal: React.FC<AssignmentDetailsModalProps> = ({ assignment, onClose, markAsDone }) => {
  const authToken = getCookie("authToken") as string;
  const currentUserId = getCookie("userId") as string;
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userSubmission, setUserSubmission] = useState<any>(null);

  useEffect(() => {
    if (assignment) {
      const fetchSubmission = async () => {
        try {
          const response = await getSubmission(assignment.id);
          const userSub = response.payload.find((sub) => sub.user_id === currentUserId);
          if (userSub) {
            setUserSubmission(userSub);
            setSubmissionText(userSub.content);
          }
        } catch (error) {
          console.error("Error fetching submission details:", error);
        }
      };

      fetchSubmission();
    }
  }, [assignment, currentUserId]);

  if (!assignment) return null;

  const isGraded = userSubmission?.grade != null;
  const isGradeNotZero = userSubmission?.grade !== undefined && userSubmission.grade !== 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubmissionFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmissionText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!assignment) return;
    const formData = new FormData();
    formData.append("content", submissionText);
    if (submissionFile) {
      formData.append("attachments", submissionFile);
    }
    formData.append("assignment_id", assignment.id);

    setLoading(true);

    try {
      let response;
      if (userSubmission) {
        response = await updateSubmission(userSubmission.id, formData, authToken);
      } else {
        response = await createSubmission(formData, authToken);
      }
      alert(response.message);
      onClose();
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userSubmission) return;
    setLoading(true);
    try {
      const response = await deleteSubmission(userSubmission.id, authToken);
      alert(response.message);
      onClose();
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={Boolean(assignment)} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center min-h-screen px-4 py-6">
        <div className="bg-white rounded-3xl p-6 w-full max-w-3xl mx-auto z-10 shadow-xl">
          <Dialog.Title className="text-2xl font-semibold mb-4 border-b-2 pb-2 text-gray-800">{assignment.title}</Dialog.Title>
          <div className="flex flex-row justify-between mb-4">
            <p className="text-base mb-4 text-gray-700">
              <strong>Due Date:</strong> {new Date(assignment.due).toLocaleDateString()}
            </p>

            <p className="text-base mb-4 text-gray-700">
              <strong>Grade:</strong> {userSubmission?.grade ?? "Not graded yet"}
            </p>
          </div>
          <p className="text-base mb-4 text-gray-700">{assignment.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Work</h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="submissionFile">
                Upload File
              </label>
              <input id="submissionFile" type="file" onChange={handleFileChange} className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            {userSubmission && userSubmission.attachments && (
              <div className="mb-4">
                <a href={userSubmission.attachments} download className="text-blue-500 underline">
                  Download Submitted Attachment
                </a>
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700" htmlFor="submissionText">
                Or Type Your Submission
              </label>
              <textarea id="submissionText" rows={4} value={submissionText} onChange={handleTextChange} className="block w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="py-2 px-4 rounded-lg border-2 border-gray-300 text-gray-800 hover:bg-gray-100 transition" onClick={onClose}>
              Close
            </button>
            {!isGradeNotZero && (
              <>
                {!userSubmission ? (
                  <button className={`py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                ) : (
                  <button className={`py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                  </button>
                )}
                {userSubmission && (
                  <button className={`py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AssignmentDetailsModal;
