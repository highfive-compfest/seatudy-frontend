import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="w-full h-full lg:h-screen flex-col justify-center items-center relative bg-cover bg-center hidden lg:flex wiggle-bg"
      style={{
        backgroundImage: "url('https://miro.medium.com/v2/resize:fit:8000/1*7iBUzC4UvwNi8agIsCrZ7w.png')",
      }}
    >
      <a className="absolute bottom-0 left-0 p-4 text-white text-xs z-10 hover:underline" href="https://medium.com/flutter/flutter-whats-next-on-the-web-e0454bff964">
        Courtesy: Flutter Engage by Google
      </a>
      <div className="absolute inset-0 bg-slate-800 opacity-15"></div>

      <div>
        <Link href="/" className="flex items-center">
          <Image src="/seatudy-logo.png" alt="SEA TUDY Logo" className="h-18 w-auto mr-2 z-50" width={256} height={256} />
        </Link>
      </div>

      <h2 className="mt-4 mb-2 text-white font-bold text-2xl md:text-3xl z-10 animate-fadeInUp" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
        Self-Paced Learning Courses Online
      </h2>

      <p className="text-white text-sm z-10 animate-fadeInUp" style={{ textShadow: "4px 4px 12px rgba(0, 0, 0, 0.5)" }}>
        Developed by Team High Five - SEA ACADEMY COMPFEST 16
      </p>
    </section>
  );
}
