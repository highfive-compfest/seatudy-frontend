import { NavUser } from "@/components/dashboard/user/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavUser/>
      {children}
    </>
  )
}