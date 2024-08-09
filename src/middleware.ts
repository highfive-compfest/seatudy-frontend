import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
    const authToken = getCookie('authToken', { req: request });
    const refreshToken = getCookie('refreshToken', { req: request });
    const userRole = getCookie('userRole', { req: request });
    const pathname = request.nextUrl.pathname;
    
    if (!authToken || !refreshToken || !userRole) return NextResponse.redirect(new URL('/login', request.url));

    switch (userRole) {
      case "student":
        if (pathname.startsWith("/dashboard/instructor/create") || pathname.startsWith("/dashboard/instructor/manage") || pathname.startsWith("/dashboard/instructor/profile")) {
          return NextResponse.redirect(new URL("/dashboard/student/courses", request.url));
        }
        break;
      case "instructor":
        if (pathname.startsWith("/dashboard/student/courses") || pathname.startsWith("/dashboard/student/histories") || pathname.startsWith("/dashboard/student/profile")) {
          return NextResponse.redirect(new URL("/dashboard/instructor/manage", request.url));
        }
        break;
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/verify-otp']
};