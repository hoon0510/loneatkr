import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import mongoose from 'mongoose';

/**
 * POST /api/vote
 * 
 * 맛집에 투표합니다.
 * Body: { restaurantId: string, voteType: 'oj' | 'noj' }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { restaurantId, voteType } = body;

        // 입력 검증
        if (!restaurantId || !voteType) {
            return NextResponse.json(
                { success: false, error: '필수 파라미터가 누락되었습니다.' },
                { status: 400 }
            );
        }

        if (voteType !== 'oj' && voteType !== 'noj') {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 투표 유형입니다.' },
                { status: 400 }
            );
        }

        // ObjectId 유효성 검사
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return NextResponse.json(
                { success: false, error: '유효하지 않은 맛집 ID입니다.' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // 투표 카운트 업데이트
        const updateField = voteType === 'oj' ? 'ojCount' : 'nojCount';
        const restaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { $inc: { [updateField]: 1 } },
            { new: true, lean: true }
        );

        if (!restaurant) {
            return NextResponse.json(
                { success: false, error: '맛집을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                ojCount: restaurant.ojCount,
                nojCount: restaurant.nojCount,
            },
            message: '투표가 완료되었습니다.',
        });
    } catch (error) {
        console.error('투표 처리 실패:', error);
        return NextResponse.json(
            { success: false, error: '투표 처리에 실패했습니다.' },
            { status: 500 }
        );
    }
}
