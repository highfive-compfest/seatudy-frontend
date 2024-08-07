import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {
    const token = getCookie('authToken', { req: request });
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/verify-otp']
};