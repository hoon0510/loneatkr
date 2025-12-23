import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/apiAuth';
import { validateFile, saveImages } from '@/lib/uploadHelper';

/**
 * POST /api/admin/upload
 * 
 * 이미지 업로드 (관리자 전용)
 */
export async function POST(request: NextRequest) {
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const formData = await request.formData();
        const files = formData.getAll('images') as File[];

        if (files.length === 0) {
            return NextResponse.json(
                { success: false, error: '업로드할 파일이 없습니다.' },
                { status: 400 }
            );
        }

        // 파일 유효성 검사
        for (const file of files) {
            const validation = validateFile(file);
            if (!validation.valid) {
                return NextResponse.json(
                    { success: false, error: validation.error },
                    { status: 400 }
                );
            }
        }

        // 이미지 저장
        const urls = await saveImages(files);

        return NextResponse.json({
            success: true,
            data: { urls },
            message: `${urls.length}개의 이미지가 업로드되었습니다.`,
        });
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        return NextResponse.json(
            { success: false, error: '이미지 업로드에 실패했습니다.' },
            { status: 500 }
        );
    }
}
