import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import { UserContext } from "@/context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEATUDY.",
  description: "Developed by Team High Five - SEA ACADEMY COMPFEST 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <NextUIProvider><UserContext>{children}</UserContext></NextUIProvider>
      </body>
    </html>
  );
}
