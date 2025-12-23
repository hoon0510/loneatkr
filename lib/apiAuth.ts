import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * API 인증 미들웨어 유틸리티
 * 
 * 관리자 API 라우트에서 인증을 확인합니다.
 */
export function verifyAdminAuth(request: NextRequest): { isValid: boolean; error?: NextResponse } {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
        return {
            isValid: false,
            error: NextResponse.json(
                { success: false, error: '인증이 필요합니다.' },
                { status: 401 }
            ),
        };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return {
            isValid: false,
            error: NextResponse.json(
                { success: false, error: '유효하지 않은 토큰입니다.' },
                { status: 401 }
            ),
        };
    }

    return { isValid: true };
}
