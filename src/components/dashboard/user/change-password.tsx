import { changePassword } from "@/services/auth";
import { ChangePasswordRequest } from "@/types/sign/change-password";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { getCookie } from "cookies-next";
import React, { useState, ChangeEvent } from "react";

export const ChangePassword = () => {
  const accToken = getCookie("authToken") as any;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [info, setInfo] = useState<string>("");
  const [isPending, setPending] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "current_password") setCurrentPassword(value);
    if (name === "new_password") setNewPassword(value);
    if (name === "confirm_password") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setInfo("New passwords do not match.");
      return;
    }
    setPending(true);
    try {
      const request: ChangePasswordRequest = {
        old_password: currentPassword,
        new_password: newPassword,
      };
      const res = await changePassword(request, accToken);
      setInfo(res.message);
    } catch (error: any) {
      const message = error.response.data.message;
      setInfo(message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl ml-4 border-2 border-gray-200">
      <h1 className="text-2xl font-bold mb-8">Change Password</h1>

      {info && <div className={`mb-4 p-4 ${info.startsWith("New") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} rounded-md`}>{info}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-600">Current Password</label>
          <input type="password" name="current_password" value={currentPassword} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input type="password" name="new_password" value={newPassword} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
          <input type="password" name="confirm_password" value={confirmPassword} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
        </div>

        <div className="flex gap-2 justify-center mt-6">
          {!isPending ? (
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 shadow-sm">
              Change Password
            </button>
          ) : (
            <Spinner />
          )}
        </div>
      </form>
    </div>
  );
};
