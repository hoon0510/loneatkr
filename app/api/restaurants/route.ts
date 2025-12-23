import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

/**
 * GET /api/restaurants
 * 
 * 맛집 목록을 조회합니다.
 * Query Parameters:
 * - sido: 시/도 필터
 * - sigungu: 시/군/구 필터
 * - q: 검색어 (이름, 설명, 주소에서 검색)
 * - editorCertified: 에디터 인증만 필터
 * - page: 페이지 번호 (기본값: 1)
 * - limit: 페이지당 항목 수 (기본값: 12)
 */
export async function GET(request: NextRequest) {
    try {
        // 데이터베이스 연결
        await connectToDatabase();

        // Query Parameters 파싱
        const { searchParams } = new URL(request.url);
        const sido = searchParams.get('sido');
        const sigungu = searchParams.get('sigungu');
        const search = searchParams.get('q');
        const editorCertified = searchParams.get('editorCertified');
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '12', 10);

        // 필터 조건 생성
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        // 지역 필터
        if (sido) {
            filter['region.sido'] = sido;
        }
        if (sigungu) {
            filter['region.sigungu'] = sigungu;
        }

        // 에디터 인증 필터
        if (editorCertified === 'true') {
            filter.isEditorCertified = true;
        }

        // 검색어 필터 (이름, 설명, 주소에서 검색)
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } },
            ];
        }

        // 정렬: 에디터 인증 먼저, 그 다음 최신순
        const sort = { isEditorCertified: -1, createdAt: -1 };

        // 페이지네이션
        const skip = (page - 1) * limit;

        // 쿼리 실행
        const [restaurants, total] = await Promise.all([
            Restaurant.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),
            Restaurant.countDocuments(filter),
        ]);

        // 에디터 인증 맛집 수
        const editorCertifiedCount = await Restaurant.countDocuments({
            ...filter,
            isEditorCertified: true,
        });

        // 페이지네이션 정보
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        return NextResponse.json({
            success: true,
            data: {
                restaurants: restaurants.map((r) => ({
                    ...r,
                    id: r._id.toString(),
                    _id: undefined,
                })),
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNext,
                    hasPrev,
                },
                stats: {
                    total,
                    editorCertified: editorCertifiedCount,
                },
            },
        });
    } catch (error) {
        console.error('맛집 목록 조회 실패:', error);
        return NextResponse.json(
            {
                success: false,
                error: '맛집 목록을 불러오는데 실패했습니다.',
            },
            { status: 500 }
        );
    }
}
