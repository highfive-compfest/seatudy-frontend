"use client";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Submit } from "./button";

export function FormRegister() {
  const [info, setInfo] = useState("");
  const [data, setData] = useState({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  }

  return (
    <form onSubmit={() => console.log(data)}>
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
      />
      <p className="text-sm mb-4 font-bold">{info}</p>
      <Submit name="Register" />
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
