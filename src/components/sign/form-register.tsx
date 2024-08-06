"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Submit } from "./button";
import axios from "axios";
import { useRouter } from "next/navigation";

export function FormRegister() {
  const [data, setData] = useState({});
  const [isPending, setPending] = useState(false)

  const router = useRouter()

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value, role : "student" }));
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    try {
     const res = await axios.post("http://35.219.85.172:8080/v1/auth/register", data)
     if (res.status == 201) {
      router.push("/login")
      setPending(false)
     }
    } catch (error) {
      console.log(error)
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="bg-white h-fit m-auto p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </Link>
      </div>
      <h2 className="text-3xl my-10 text-center font-bold">Register</h2>
      <input required className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="name" onChange={handleChange} placeholder="Name" type="text" />
      <input required className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email" />
      <input
        required
        className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-slate-900 outline-none block my-4 text-lg font-bold w-full"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        minLength={8}
      />
      <Submit isPending={isPending} name="Register" />
      <div className={`loader animate-spin bg-slate-900 w-12 m-auto`}></div>
      <p className="text-sm mt-6 text-center">
        already have an account?{" "}
        <Link className="text-blue-700 font-black" href="login">
          Log In
        </Link>
      </p>
    </form>
  );
}
