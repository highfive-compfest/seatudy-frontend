import React, { useState } from "react";
import { updateUser } from "@/services/user";
import { UserPayload } from "@/types/user/user";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface EditProfileProps {
  user: UserPayload | null;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [editedUser, setEditedUser] = useState<Omit<UserPayload, "id" | "email" | "role" | "created_at" | "updated_at">>({
    name: user?.name || "",
    image_url: user?.image_url || "",
    is_email_verified: user?.is_email_verified || "false",
  });
  const [previewImage, setPreviewImage] = useState<string>(editedUser.image_url || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const accToken = getCookie("authToken") as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prevState) => ({ ...prevState, image_url: reader.result as string }));
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setImageFile(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("User data is not available.");
      return;
    }
    if (!accToken) {
      alert("Authentication token is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUser(accToken, user.id, editedUser.name || user.name, imageFile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl md:ml-4 border-2 border-gray-200">
      <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2 flex justify-center items-center flex-col">
          <div className="relative w-24 h-24">
            <input type="file" name="image_url" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            <img
              className="object-cover shadow-lg cursor-pointer transition-transform transform hover:scale-105 z-0"
              src={previewImage || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt="Profile Avatar"
              style={{ clipPath: "circle(50%)" }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">Click to change profile picture</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" value={user?.email || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 sm:text-sm" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <input type="text" value={user?.role || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 sm:text-sm" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Created at</label>
          <input type="text" value={user?.created_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 sm:text-sm" readOnly />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Updated at</label>
          <input type="text" value={user?.updated_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-500 sm:text-sm" readOnly />
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-6">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 shadow-sm" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
