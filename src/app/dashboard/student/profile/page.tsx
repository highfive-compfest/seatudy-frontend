"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ShowProfile from "../../../../components/dashboard/user/profile";
import { reqOTP } from "@/services/auth";
import EditProfile from "@/components/dashboard/user/edit-profile";
import { ChangePassword } from "@/components/dashboard/user/change-password";
import { getMe } from "@/services/user";
import { UserPayload } from "@/types/user/user";

const Profile = () => {
  const [isPending, setPending] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);
  const [activeSection, setActiveSection] = useState("profile");

  const router = useRouter();
  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accToken) {
        console.error("No authentication token found.");
        alert("No authentication token found. Please log in again.");
        router.push("/login");
        return;
      }

      try {
        const userData = await getMe(accToken);
        setUser(userData.payload);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data. Please try again.");
      }
    };

    fetchUserData();
  }, [accToken, router]);

  const handleClick = async () => {
    setPending(true);
    try {
      await reqOTP(accToken);
      router.push("/verify-otp");
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred";
      alert(message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="p-4 pt-28 flex flex-col md:flex-row pb-8 h-full">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-white text-gray-800 py-6 px-4 rounded-lg shadow-lg border-2 border-gray-200 mb-6 md:mb-0">
        <h2 className="text-xl font-semibold mb-6">Actions</h2>
        <nav className="space-y-4">
          <button onClick={() => setActiveSection("profile")} className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === "profile" ? "bg-gray-300" : "bg-gray-100"}`}>
            Your Profile
          </button>
          <button onClick={() => setActiveSection("editProfile")} className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === "editProfile" ? "bg-gray-300" : "bg-gray-100"}`}>
            Edit Profile
          </button>
          <button onClick={() => setActiveSection("changePassword")} className={`block w-full text-left py-2 px-4 rounded-md ${activeSection === "changePassword" ? "bg-gray-300" : "bg-gray-100"}`}>
            Change Password
          </button>
          <button onClick={() => router.push("/logout")} className="block w-full text-left py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-500">
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {activeSection === "profile" && <ShowProfile user={user} isPending={isPending} handleClick={handleClick} />}
        {activeSection === "editProfile" && <EditProfile user={user} />}
        {activeSection === "changePassword" && <ChangePassword />}
      </div>
    </section>
  );
};

export default Profile;
