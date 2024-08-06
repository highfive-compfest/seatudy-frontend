"use client";
import { Submit } from "@/components/sign/button";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/context/user";
import { setCookie } from "cookies-next";

export function FormLogin() {
  const [data, setData] = useState({});
  const [info, setInfo] = useState("");
  const [isPending, setPending] = useState(false);

  const { setUser } = useUser();

  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await axios.post("http://35.219.85.172:8080/v1/auth/login", data);
      const accToken = res.data.payload.access_token;
      if (res.status === 200) {
        setCookie("authToken", accToken, { path: "/", maxAge: 60 * 60 * 24 });
        setUser(res.data.payload);
        router.push("dashboard/user/courses");
        setPending(false);
      }
      if (res.status === 401) {
        setInfo("Email or Password Incorrect");
        return;
      }
    } catch (error: any) {
      const status = error.response.status;
      if (status === 401) {
        setInfo("Email or Password Incorrect");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="bg-white max-w-md mx-auto p-6 rounded-lg md:shadow-md" style={{ height: "fit-content", minHeight: "400px" }} onSubmit={handleSubmit}>
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </Link>
      </div>
      <h2 className="text-3xl my-10 text-center font-bold">Log In</h2>
      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      <input
        required
        className="border text-lg py-2 px-4 border-solid border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 outline-none block my-4 w-full"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        minLength={8}
      />
      <div className="text-right mb-4">
        <Link className="text-blue-600 font-medium hover:underline" href="forgot-password">
          Forgot Password?
        </Link>
      </div>
      <p className="text-center text-red-500 mb-4">{info}</p>
      <Submit isPending={isPending} name="Log In" />
      <p className="text-sm mt-6 text-center">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-600 font-medium hover:underline" href="register">
          Register
        </Link>
      </p>
    </form>
  );
}
