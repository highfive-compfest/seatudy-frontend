"use client";
import React, { useState, useEffect } from "react";
import { Submit } from "./button";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { reqOTP, verifyEmail } from "@/services/auth";
import { deleteCookie, getCookie } from "cookies-next";
import { getMe } from "@/services/user";

export const FormVerify = () => {
  const [otp, setOtp] = useState("");
  const [info, setInfo] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isPending, setPending] = useState(false);
  const [isVerified, setVerified] = useState(false);

  const accToken = getCookie("authToken") as any;

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userData = await getMe(accToken);
        setEmail(userData.payload.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data. Please try again.");
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      await verifyEmail(otp, accToken);
      setPending(false);
      deleteCookie("authToken");
      deleteCookie("refreshToken");
      deleteCookie("userId");
      deleteCookie("userRole");
      setVerified(true);
    } catch (error: any) {
      const message = error.response.data.message;
      alert(message);
    } finally {
      setPending(false);
    }
  };

  const handleClick = async () => {
    setPending(true);
    try {
      await reqOTP(accToken);
      setInfo("The OTP has been resent to your email.");
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred";
      alert(message);
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
      <h2 className="text-3xl my-10 text-center font-bold">Email Verification</h2>
      {isVerified ? (
        <p className="text-center text-gray-600 mt-4 mb-8">Your email has been successfully verified!</p>
      ) : (
        <p className="text-center text-gray-600 mt-4 mb-8">
          We&apos;ve sent an OTP to <strong>{isEmail}</strong>. Please enter the code below
        </p>
      )}
      {!isVerified && (
        <OtpInput
          inputStyle={{ border: "solid", borderColor: "#d1d5db", width: "100%", height: "4rem", marginLeft: "4px", marginRight: "4px" }}
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="text-gray-300">-</span>}
          renderInput={(props: any) => <input {...props} />}
        />
      )}
      {!isVerified && <p className="text-center text-red-500 mb-4">{info}</p>}
      {!isVerified && <Submit isPending={isPending} name="Verify" />}
      {isVerified ? (
        <p className="text-sm mt-6 text-center">
          Please{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            log in
          </Link>
          {" "}again.
        </p>
      ) : (
        <p className="text-sm mt-6 text-center">
          Don&apos;t receive code?{" "}
          <button type="button" disabled={isPending} onClick={handleClick} className="text-blue-600 font-medium hover:underline">
            Resend
          </button>
        </p>
      )}
    </form>
  );
};
