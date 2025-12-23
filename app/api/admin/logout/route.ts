import { NextResponse } from 'next/server';

/**
 * POST /api/admin/logout
 * 
 * 관리자 로그아웃
 */
export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: '로그아웃되었습니다.',
    });

    // 쿠키 삭제
    response.cookies.set('admin_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // 즉시 만료
        path: '/',
    });

    return response;
}
