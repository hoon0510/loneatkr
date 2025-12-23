import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookie } from '@/lib/auth';

/**
 * 인증이 필요하지 않은 경로
 */
const publicPaths = [
    '/admin/login',
    '/api/admin/login',
];

/**
 * 미들웨어: /admin/* 경로 보호
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /admin 경로가 아니면 통과
    if (!pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // 공개 경로면 통과
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // 쿠키에서 토큰 확인
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
        // 토큰이 없으면 로그인 페이지로 리다이렉트
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 토큰 검증
    const decoded = verifyToken(token);

    if (!decoded) {
        // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.set('admin_token', '', { maxAge: 0 });
        return response;
    }

    // 인증 성공
    return NextResponse.next();
}

/**
 * 미들웨어 적용 경로
 */
export const config = {
    matcher: ['/admin/:path*'],
};
