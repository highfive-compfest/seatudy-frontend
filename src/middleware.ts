import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(request: NextRequest) {
  const authToken = getCookie("authToken", { req: request });
  const refreshToken = getCookie("refreshToken", { req: request });
  const userRole = getCookie("userRole", { req: request });
  const userId = getCookie("userId", { req: request });
  const pathname = request.nextUrl.pathname;

  if (!authToken || !refreshToken || !userRole || !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const studentRestrictedPaths = [
    "/dashboard/instructor/create",
    "/dashboard/instructor/manage",
    "/dashboard/instructor/profile",
    "/payout"
  ];

  const instructorRestrictedPaths = [
    "/dashboard/student/courses",
    "/dashboard/student/histories",
    "/dashboard/student/profile",
    "/topup",
    "/topup/finish"
  ];

  if (userRole === "student" && studentRestrictedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard/student/courses", request.url));
  }

  if (userRole === "instructor" && instructorRestrictedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard/instructor/manage", request.url));
  }

  if (userRole === "instructor" && pathname.startsWith("/topup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/verify-otp", "/topup", "/payout", "/topup/finish"],
};
