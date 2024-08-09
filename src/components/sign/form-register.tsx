"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Submit } from "./button";
import { registerUser } from "@/services/auth";
import { Select, SelectItem } from "@nextui-org/select";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

const roles = [
  {
    name : "Student",
    icon : <PiStudentFill/>
  },
  {
    name : "Instructor",
    icon : <FaChalkboardTeacher/>
  },
]

export function FormRegister() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isPending, setPending] = useState(false);
  const [info, setInfo] = useState<string>("");

  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      await registerUser(data);
      router.push("/login");
    } catch (error:any) {
      const status = error.response?.status;
      if (status === 409) {
        setInfo("Email Already Used");
      } else {
        setInfo("An error occurred");
      }
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
      <Select
        items={roles}
        name="role"
        required
        key="role"
        radius="sm"
        label="Role"
        variant="bordered"
        onChange={handleChange}
        classNames={{trigger:"shadow-none", label:"text-gray-400"}}
        renderValue={roles=>{
          return roles.map(role => (
            <div key={role.key} className="flex gap-2 items-center">
              {role.data?.icon}
              {role.data?.name}
            </div>
          ))
        }}
      >
        {(role)=>(<SelectItem textValue={role.name} key={role.name.toLocaleLowerCase()}>
          <div className="flex gap-2 items-center">
            {role.icon}
            {role.name}
          </div>
        </SelectItem>)}
      </Select>
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
      <p className="text-center text-red-500 mb-4">{info}</p>
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
