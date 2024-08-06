"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { Submit } from "./button";

export const FormVerifyPasswordReset: React.FC = () => {
  const [data, setData] = useState<{ email: string; newPassword: string }>({ email: "loremipsum@gmail.com", newPassword: "" });
  const [info, setInfo] = useState("");
  const [isPending, setPending] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <form className="bg-white max-w-md mx-auto p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </Link>
      </div>
      <h2 className="text-3xl mt-10 mb-5 text-center font-bold">Verify Password Reset</h2>
      <p className="text-center text-gray-600 mt-4 mb-8">
        Are you sure you want to change your email to <strong>{data.email}</strong> using the new password?
      </p>

      <Submit isPending={isPending} name="Verify" />
      <p className="text-center text-red-500 mt-4 text-sm">{info}</p>
      <p className="text-sm mt-6 text-center">
        Dont want to change your password?{" "}
        <Link className="text-blue-700 font-medium hover:underline" href="login">
          Log In
        </Link>
      </p>
    </form>
  );
};
