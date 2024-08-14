import React from "react";
import { UserPayload } from "@/types/user/user";

interface InstructorInfoProps {
  instructor: UserPayload | null;
}

const InstructorInfo: React.FC<InstructorInfoProps> = ({ instructor }) => {
  return (
    <div className="w-full lg:w-9/10 bg-gray-100 border-2 border-gray-200 h-auto px-8 py-4 rounded-lg shadow mt-4">
      <div className="flex items-center">
        <div className="mr-4">
          <img
            src={instructor?.image_url || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt="Instructor profile"
            className="w-16 h-16 rounded-full border border-gray-300"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">{instructor?.name || "Not found"}</p>
          <p className="text-gray-500 text-sm">{instructor?.role || "No Role Available"}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
