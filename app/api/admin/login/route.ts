import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { comparePassword, generateToken } from '@/lib/auth';

/**
 * POST /api/admin/login
 * 
 * 관리자 로그인
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // 입력 검증
        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: '사용자명과 비밀번호를 입력해주세요.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // 관리자 조회 (passwordHash 포함)
        const admin = await Admin.findOne({ username }).select('+passwordHash').lean();

        if (!admin) {
            return NextResponse.json(
                { success: false, error: '사용자명 또는 비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }

        // 비밀번호 확인
        const isValid = await comparePassword(password, admin.passwordHash);

        if (!isValid) {
            return NextResponse.json(
                { success: false, error: '사용자명 또는 비밀번호가 올바르지 않습니다.' },
                { status: 401 }
            );
        }

        // JWT 토큰 생성
        const token = generateToken(admin._id.toString(), admin.username);

        // 응답 생성 및 쿠키 설정
        const response = NextResponse.json({
            success: true,
            data: {
                token,
                user: {
                    id: admin._id.toString(),
                    username: admin.username,
                },
            },
        });

        // httpOnly 쿠키로 토큰 저장
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7일
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('로그인 실패:', error);
        return NextResponse.json(
            { success: false, error: '로그인 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
