"use client";

import { ChangePw } from "@/components/dashboard/user/change-password";
import { EditProfile } from "@/components/dashboard/user/edit-profile";
import { reqOTP } from "@/services/auth";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { getCookie } from "cookies-next";
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
    <section className="pt-[7rem] ml-10 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar */}
          <div className="col-span-2 flex justify-center">
            <div className="relative w-32 h-32">
              <Avatar isBordered size="lg" className="transition-transform rounded-full object-cove scale-150" src={user?.image_url || ""} />
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={user?.name || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center">
              <input type="email" value={user?.email || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
              {user?.is_email_verified ? (
                <div className="ml-2 bg-green-400 px-4 py-1 rounded-md text-white text-sm">Verified</div>
              ) : isPending ? (
                <Spinner className="ml-2" />
              ) : (
                <button className="ml-2 bg-blue-400 px-4 py-1 rounded-md text-white text-sm" onClick={handleClick}>
                  Verify
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" value={user?.role || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Account Status</label>
            <input type="text" value={user?.is_email_verified ? "Verified" : "Not verified"} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Created at</label>
            <input type="text" value={user?.created_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Updated at</label>
            <input type="text" value={user?.updated_at || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" readOnly />
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
