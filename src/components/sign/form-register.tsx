"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Submit } from "./button";
import { registerUser } from "@/services/auth";

export function FormRegister() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [isPending, setPending] = useState(false);

  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      await registerUser(data);
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
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
      <h2 className="text-3xl mt-10 mb-5 text-center font-bold">Register</h2>
      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
        type="text"
      />
      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        minLength={8}
      />
      <Submit isPending={isPending} name="Register" />
      {isPending && <div className="loader animate-spin bg-slate-900 w-12 h-12 rounded-full m-auto my-4"></div>}
      <p className="text-sm mt-6 text-center">
        Already have an account?{" "}
        <Link className="text-blue-700 font-medium hover:underline" href="/login">
          Log In
        </Link>
      </p>
    </form>
  );
}
