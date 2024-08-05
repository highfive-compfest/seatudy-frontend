"use client";
import { Submit } from "@/components/sign/button";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function FormLogin() {
  const [info, setInfo] = useState("");
  const [data, setData] = useState({});
  const router = useRouter()

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    router.push("dashboard/user/courses")
  }

  return (
    <form className="bg-white h-fit m-auto p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </Link>
      </div>
      <h2 className="text-3xl my-10 text-center font-bold">Log In</h2>
      <input required className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-black outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email" />
      <input
        required
        className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-black outline-none block my-4 text-lg font-bold w-full"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />
      <p className="text-sm mb-4 font-bold">{info}</p>
      <Submit name="Log In" />
      <p className="text-sm mt-6 text-center">
        don&apos;t have an account?{" "}
        <Link className="text-blue-700 font-black" href="register">
          Register
        </Link>
      </p>
    </form>
  );
}
