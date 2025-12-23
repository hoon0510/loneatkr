import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

/**
 * GET /api/group-spots
 * 
 * 같이 가는 가게 목록 조회
 */
export async function GET() {
    try {
        await connectToDatabase();

        const restaurants = await Restaurant.find({ isGroupSpot: true })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: {
                restaurants: restaurants.map((r) => ({
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...(r as any),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    id: (r as any)._id.toString(),
                    _id: undefined,
                })),
                total: restaurants.length,
            },
        });
    } catch (error) {
        console.error('같이 가는 가게 조회 실패:', error);
        return NextResponse.json(
            { success: false, error: '같이 가는 가게를 불러오는데 실패했습니다.' },
            { status: 500 }
        );
    }
}
