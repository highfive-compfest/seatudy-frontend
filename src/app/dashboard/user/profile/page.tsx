"use client";

import { ChangePw } from "@/components/dashboard/user/change-password";
import { EditProfile } from "@/components/dashboard/user/edit-profile";
import { reqOTP } from "@/services/auth";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const [isPending, setPending] = useState(false);
  const [user, setUser] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const userString: any = sessionStorage.getItem("user");
    const data = JSON.parse(userString);
    setUser(data);
  }, []);

  const accToken = getCookie("authToken") as any;
  const refreshToken = getCookie("refreshToken") as any;

  const handleClick = async () => {
    setPending(true);
    try {
      await reqOTP(accToken);
      setPending(false);
      router.push("/verify-otp");
    } catch (error: any) {
      const message = error.response.data.message;
      console.log(message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="p-4 pt-24 flex pb-8">
      {/* Sidebar */}
      <aside className="w-72 bg-white text-gray-800 py-6 px-4 rounded-lg shadow-lg border-2 border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Actions</h2>
        <nav className="space-y-4">
          <Link href="/profile" className="block py-2 px-4 rounded-md bg-gray-100  ">
            Profile
          </Link>
          <Link href="/change-password" className="block py-2 px-4 rounded-md bg-gray-100 ">
            Change Password
          </Link>
          <Link href="/edit-profile" className="block py-2 px-4 rounded-md bg-gray-100 ">
            Edit Profile
          </Link>
          <button
            onClick={() => {
              router.push("/logout");
            }}
            className="block w-full text-left py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-500"
          >
            Log Out
          </button>
        </nav>
      </aside>

      {/* Profile Content */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl ml-4 border-2 border-gray-200">
        <h1 className="text-2xl font-bold mb-8 ">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-2 flex justify-center">
            <div className="relative w-40 h-40">
              <Avatar isBordered size="lg" className="transition-transform rounded-full object-cover scale-150 shadow-lg" src={user?.image_url || ""} />
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
        <div className="flex gap-2 justify-center mt-4">
            <EditProfile/>
            <ChangePw/>
        </div>
      </div>
    </section>
  );
};

export default Profile;
