import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import React from "react";

interface User {
  image_url?: string;
  name?: string;
  email?: string;
  is_email_verified?: boolean;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

interface ProfileProps {
  user: User | null;
  isPending: boolean;
  handleClick: () => void;
}

const ShowProfile: React.FC<ProfileProps> = ({ user, isPending, handleClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl ml-4 border-2 border-gray-200">
      <h1 className="text-2xl font-bold mb-8 ">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2 flex justify-center">
          <div className="relative w-24 h-24">
            <img
              className="object-cover shadow-lg cursor-pointer transition-transform transform hover:scale-105 z-0"
              src={user?.image_url || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt="Profile Avatar"
              style={{ clipPath: "circle(50%)" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" value={user?.name || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <div className="flex items-center">
            <input type="email" value={user?.email || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
            {user?.is_email_verified ? (
              <div className="ml-2 bg-green-500 px-4 py-1 rounded-md text-white text-sm">Verified</div>
            ) : isPending ? (
              <Spinner className="ml-2" />
            ) : (
              <button className="ml-2 bg-blue-500 px-4 py-1 rounded-md text-white text-sm hover:bg-blue-400" onClick={handleClick}>
                Verify
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <input type="text" value={user?.role || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Account Status</label>
          <input type="text" value={user?.is_email_verified ? "Verified" : "Not verified"} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Created at</label>
          <input type="text" value={user?.created_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Updated at</label>
          <input type="text" value={user?.updated_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" readOnly />
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-4"></div>
    </div>
  );
};

export default ShowProfile;
