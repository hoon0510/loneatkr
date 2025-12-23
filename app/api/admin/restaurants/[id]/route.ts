import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import { verifyAdminAuth } from '@/lib/apiAuth';
import mongoose from 'mongoose';

/**
 * GET /api/admin/restaurants/[id]
 * 
 * 단일 맛집 조회 (관리자용)
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 ID입니다.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const restaurant = await Restaurant.findById(id).lean();

        if (!restaurant) {
            return NextResponse.json(
                { success: false, error: '맛집을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                ...restaurant,
                id: restaurant._id.toString(),
                _id: undefined,
            },
        });
    } catch (error) {
        console.error('맛집 조회 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 정보를 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/admin/restaurants/[id]
 * 
 * 맛집 수정
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const { id } = await params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 ID입니다.' },
                { status: 400 }
            );
        }

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

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            {
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
            },
            { new: true, lean: true }
        );

        if (!restaurant) {
            return NextResponse.json(
                { success: false, error: '맛집을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = restaurant as any;
        return NextResponse.json({
            success: true,
            data: {
                ...doc,
                id: doc._id.toString(),
                _id: undefined,
            },
            message: '맛집이 수정되었습니다.',
        });
    } catch (error) {
        console.error('맛집 수정 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 수정에 실패했습니다.' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/admin/restaurants/[id]
 * 
 * 맛집 삭제
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 ID입니다.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return NextResponse.json(
                { success: false, error: '맛집을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: '맛집이 삭제되었습니다.',
        });
    } catch (error) {
        console.error('맛집 삭제 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 삭제에 실패했습니다.' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/admin/restaurants/[id]
 * 
 * 맛집 부분 수정 (isGroupSpot 토글 등)
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const auth = verifyAdminAuth(request);
    if (!auth.isValid) return auth.error;

    try {
        const { id } = await params;
        const body = await request.json();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 ID입니다.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, lean: true }
        );

        if (!restaurant) {
            return NextResponse.json(
                { success: false, error: '맛집을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = restaurant as any;
        return NextResponse.json({
            success: true,
            data: {
                ...doc,
                id: doc._id.toString(),
                _id: undefined,
            },
        });
    } catch (error) {
        console.error('맛집 수정 실패:', error);
        return NextResponse.json(
            { success: false, error: '맛집 수정에 실패했습니다.' },
            { status: 500 }
        );
    }
}
