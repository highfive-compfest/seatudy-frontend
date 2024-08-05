import React from "react";
import { Hero } from "@/components/sign/hero";

export default function AuthLayout({ children }:{ children: React.ReactNode }) {
    return (
            <section className="lg:grid lg:grid-cols-2 flex py-4 lc:py-0 lc:h-screen justify-center lg:justify-items-center items-center">
                <Hero/>
                <div className="bg-blue-200 w-full h-full flex">
                    { children }
                </div>
            </section>
    );
  }