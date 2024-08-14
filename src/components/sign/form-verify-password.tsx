"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Submit } from "./button";
import { useRouter, useSearchParams } from "next/navigation";
import { useData } from "@/context/reset-password";
import { verifyPasswordReset } from "@/services/auth";
import { VerifyPasswordResetRequest } from "@/types/sign/verify-password";

export const FormVerifyPasswordReset: React.FC = () => {
  const searchParams = useSearchParams();
  const { data, setData } = useData();
  const [info, setInfo] = useState("");
  const [isPending, setPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email) {
      setData((prevData) => ({ ...prevData, email }));
    }
    if (token) {
      setData((prevData) => ({ ...prevData, token }));
    }
  }, [searchParams, setData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name in data) {
      setData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      console.error(`Unknown field: ${name}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setInfo("");

    try {
      const request: VerifyPasswordResetRequest = {
        email: data.email,
        token: data.token,
        new_password: data.newPassword,
      };
      const response = await verifyPasswordReset(request);
      alert(response.message);
      router.push("/login");
    } catch (error) {
      setInfo("Failed to reset your password. Please try again later.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="bg-white max-w-md mx-auto p-6 rounded-lg md:shadow-md" onSubmit={handleSubmit}>
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </Link>
      </div>
      <h2 className="text-3xl mt-10 mb-5 text-center font-bold">Reset Your Password</h2>
      <p className="text-center text-gray-600 mt-4 mb-8">
        You are about to reset your password for the account associated with <strong>{data.email}</strong>. Please enter your new password below.
      </p>

      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="newPassword"
        onChange={handleChange}
        placeholder="New Password"
        type="password"
        value={data.newPassword}
      />

      <Submit isPending={isPending} name="Reset Password" />
      <p className="text-center text-red-500 mt-4 text-sm">{info}</p>
      <p className="text-sm mt-6 text-center">
        Remembered your password?{" "}
        <Link className="text-blue-700 font-medium hover:underline" href="login">
          Log In
        </Link>
      </p>
    </form>
  );
};
