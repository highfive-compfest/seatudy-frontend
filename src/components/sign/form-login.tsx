"use client";
import { Submit } from "@/components/sign/button";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginUser } from "../../services/auth";

export function FormLogin() {
  const [data, setData] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [info, setInfo] = useState<string>("");
  const [isPending, setPending] = useState<boolean>(false);

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
      const response = await loginUser(data);
      const access_token = response.payload?.access_token;
      const refresh_token = response.payload?.refresh_token;
      const user_role = response.payload?.user.role;
      const user_id = response.payload?.user.id;
      const user = response.payload?.user;

      if (access_token) {
        setCookie("authToken", access_token, { path: "/" });
        setCookie("refreshToken", refresh_token, { path: "/" });
        setCookie("userRole", user_role, { path: "/" });
        setCookie("userId", user_id, { path: "/" });
        sessionStorage.setItem("user", JSON.stringify(user));

        if (user_role === "student") {
          router.push("dashboard/student/courses");
        } else {
          router.push("dashboard/instructor/profile");
        }
        alert(response.message);
      } else {
        alert("Login failed");
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 401) {
        alert("Email or Password Incorrect");
      } else {
        alert("An error occurred");
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
