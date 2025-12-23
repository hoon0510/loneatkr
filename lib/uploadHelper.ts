import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * 허용된 이미지 타입
 */
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * 최대 파일 크기 (5MB)
 */
const MAX_SIZE = 5 * 1024 * 1024;

/**
 * 고유 파일명 생성
 */
export function generateUniqueFilename(originalName: string): string {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}${ext}`;
}

/**
 * 파일 유효성 검사
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: '허용되지 않는 파일 형식입니다. (jpg, png, webp만 허용)' };
    }

    if (file.size > MAX_SIZE) {
        return { valid: false, error: '파일 크기가 5MB를 초과합니다.' };
    }

    return { valid: true };
}

/**
 * 이미지 저장
 */
export async function saveImage(file: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'restaurants');

    // 디렉토리 생성
    await mkdir(uploadDir, { recursive: true });

    const filename = generateUniqueFilename(file.name);
    const filepath = path.join(uploadDir, filename);

    // 파일 저장
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // URL 반환
    return `/uploads/restaurants/${filename}`;
}

/**
 * 여러 이미지 저장
 */
export async function saveImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
        const url = await saveImage(file);
        urls.push(url);
    }

    return urls;
}
