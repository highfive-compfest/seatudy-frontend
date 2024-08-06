"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { Submit } from "./button";

export const FormForgotPassword = () => {
  const [data, setData] = useState({});
  const [info, setInfo] = useState("");
  const [isPending, setPending] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <>
      <form className="bg-white max-w-md mx-auto p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-black">
            <span className="text-blue-600">SEA</span>TUDY.
          </Link>
        </div>
        <h2 className="text-3xl mt-10 mb-5 text-center font-bold">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">Please enter your email address to reset your password.</p>
        <input
          required
          className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <p className="text-center text-red-500 mb-4">{info}</p>
        <Submit isPending={isPending} name="Reset Password" />
        <p className="text-sm mt-6 text-center">
          Remembered your password?{" "}
          <Link className="text-blue-700 font-medium hover:underline" href="login">
            Log In
          </Link>
        </p>
      </form>
    </>
  );
};
