import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import mongoose from 'mongoose';

/**
 * GET /api/restaurants/[id]
 * 
 * 단일 맛집 정보를 조회합니다.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // ObjectId 유효성 검사
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
