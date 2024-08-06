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
  const [info, setInfo] = useState("")
  const [isPending, setPending] = useState(false)

  const { setUser } = useUser()

  const router = useRouter()

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    try {
      const res = await axios.post("http://35.219.85.172:8080/v1/auth/login", data)
      const accToken = res.data.payload.access_token
      if (res.status === 200) {
        setCookie('authToken', accToken, { path: '/', maxAge: 60 * 60 * 24 })
        setUser(res.data.payload)
        router.push("dashboard/user/courses")
        setPending(false)
      }
      if (res.status === 401) {
        setInfo("Email or Password Incorrect")
        return
      }
     } catch (error:any) {
        const status = error.response.status
        if (status === 401) {
          setInfo("Email or Password Incorrect")
        }
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
      <h2 className="text-3xl my-10 text-center font-bold">Log In</h2>
      <input required className="border-2 text-lg py-1 px-4 border-solid border-black rounded-full placeholder-black outline-none block my-4 font-bold w-full" name="email" onChange={handleChange} placeholder="Email" type="email" />
      <input
        required
        className="border-2 py-1 px-4 border-solid border-black rounded-full placeholder-black outline-none block my-4 text-lg font-bold w-full"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        minLength={8}
      />
      <p className="ml-2 font-medium mb-4 text-red-500">{info}</p>
      <Submit isPending={isPending} name="Log In"/>
      <p className="text-sm mt-6 text-center">
        don&apos;t have an account?{" "}
        <Link className="text-blue-700 font-black" href="register">
          Register
        </Link>
      </p>
    </form>
  );
}
