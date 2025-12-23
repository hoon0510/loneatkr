import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import { verifyAdminAuth } from '@/lib/apiAuth';

/**
 * POST /api/admin/restaurants
 * 
 * 새 맛집 등록 (관리자 전용)
 */
export async function POST(request: NextRequest) {
    // 인증 확인
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const body = await request.json();
        const {
            name,
            address,
            region,
            description,
            phone,
            businessHours,
            latitude,
            longitude,
            images,
            isEditorCertified,
            editorComment,
            isGroupSpot,
        } = body;

        // 필수 필드 검증
        if (!name || !address || !region?.sido || !region?.sigungu) {
            return NextResponse.json(
                { success: false, error: '필수 항목을 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // 맛집 생성
        const restaurant = await Restaurant.create({
            name,
            address,
            region,
            description: description || '',
            phone: phone || '',
            businessHours: businessHours || '',
            latitude: latitude || null,
            longitude: longitude || null,
            images: images || [],
            isEditorCertified: isEditorCertified || false,
            editorComment: editorComment || '',
            isGroupSpot: isGroupSpot || false,
            ojCount: 0,
            nojCount: 0,
        });

        return NextResponse.json({
            success: true,
            data: {
                id: restaurant._id.toString(),
                ...restaurant.toObject(),
            },
            message: '맛집이 등록되었습니다.',
        });
    } catch (error) {
        console.error('맛집 등록 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 등록에 실패했습니다.' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/admin/restaurants
 * 
 * 관리자용 맛집 목록 조회
 */
export async function GET(request: NextRequest) {
    // 인증 확인
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        await connectToDatabase();

        const restaurants = await Restaurant.find()
            .sort({ createdAt: -1 })
            .lean();

        // 통계 계산
        const stats = {
            total: restaurants.length,
            editorCertified: restaurants.filter(r => r.isEditorCertified).length,
            totalOj: restaurants.reduce((sum, r) => sum + r.ojCount, 0),
            totalNoj: restaurants.reduce((sum, r) => sum + r.nojCount, 0),
        };

        return NextResponse.json({
            success: true,
            data: {
                restaurants: restaurants.map(r => ({
                    ...r,
                    id: r._id.toString(),
                    _id: undefined,
                })),
                stats,
            },
        });
    } catch (error) {
        console.error('맛집 목록 조회 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 목록을 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}
