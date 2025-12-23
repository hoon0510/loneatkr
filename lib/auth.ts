import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * JWT 비밀키
 */
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

/**
 * 비밀번호 해싱
 * @param password 평문 비밀번호
 * @returns 해싱된 비밀번호
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

/**
 * 비밀번호 비교
 * @param password 평문 비밀번호
 * @param hash 해싱된 비밀번호
 * @returns 일치 여부
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

/**
 * JWT 토큰 생성
 * @param userId 사용자 ID
 * @param username 사용자명
 * @returns JWT 토큰
 */
export function generateToken(userId: string, username: string): string {
    return jwt.sign(
        { userId, username },
        JWT_SECRET,
        { expiresIn: 60 * 60 * 24 * 7 } // 7 days in seconds
    );
}

/**
 * JWT 토큰 검증
 * @param token JWT 토큰
 * @returns 디코딩된 페이로드 또는 null
 */
export function verifyToken(token: string): { userId: string; username: string } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
        return decoded;
    } catch {
        return null;
    }
}

/**
 * 쿠키에서 토큰 추출
 * @param cookieHeader Cookie 헤더 문자열
 * @returns 토큰 또는 null
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    return cookies['admin_token'] || null;
}
