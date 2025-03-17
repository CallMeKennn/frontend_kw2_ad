import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
     const { pathname } = req.nextUrl;

     if (pathname === '/') {
          return NextResponse.redirect(new URL('/auth/login', req.url));
     }

     //Cần đổi access token sang cookie
     // if (true && pathname.startsWith('/auth/login')) {
     //      return NextResponse.redirect(new URL('/create-form', req.url)); // Điều hướng đến trang chính
     // }

     return NextResponse.next();
}

export const config = {
     matcher: ['/', '/auth/login'],
};
