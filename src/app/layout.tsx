"use client";
import { Nunito } from "next/font/google";
import { NextUIProvider } from "@nextui-org/system";
import "./globals.css";
import { useAlert } from "@/components/common/custom-alert";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { alertComponent } = useAlert();

  return (
    <html lang="en">
      <head>
        <title>SEATUDY.</title>
        <meta name="description" content="Developed by Team High Five - SEA ACADEMY COMPFEST 16" />
      </head>
      <body className={`${nunito.className} bg-gray-50`}>
        <NextUIProvider>
          {children}
          {alertComponent}
        </NextUIProvider>
      </body>
    </html>
  );
}
