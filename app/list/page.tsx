'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Header,
    Footer,
    SearchBar,
    RegionSelector,
    RestaurantCard,
    LoadingSpinner
} from '@/components';

/**
 * 맛집 데이터 타입
 */
interface Restaurant {
    id: string;
    name: string;
    address: string;
    region: {
        sido: string;
        sigungu: string;
    };
    description?: string;
    images: string[];
    ojCount: number;
    nojCount: number;
    isEditorCertified: boolean;
    editorComment?: string;
}

/**
 * API 응답 타입
 */
interface ApiResponse {
    success: boolean;
    data?: {
        restaurants: Restaurant[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        stats: {
            total: number;
            editorCertified: number;
        };
    };
    error?: string;
}

/**
 * 맛집 목록 페이지
 * 
 * 지역 및 키워드로 맛집을 검색하고 필터링합니다.
 */
export default function ListPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 필터 상태
    const [sido, setSido] = useState(searchParams.get('sido') || '');
    const [sigungu, setSigungu] = useState(searchParams.get('sigungu') || '');
    const [searchKeyword, setSearchKeyword] = useState(searchParams.get('q') || '');

    // 데이터 상태
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [stats, setStats] = useState({ total: 0, editorCertified: 0 });
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
    });

    // UI 상태
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * 맛집 목록 가져오기
     */
    const fetchRestaurants = useCallback(async (page: number = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (sido) params.set('sido', sido);
            if (sigungu) params.set('sigungu', sigungu);
            if (searchKeyword) params.set('q', searchKeyword);
            params.set('page', page.toString());

            const response = await fetch(`/api/restaurants?${params.toString()}`);
            const data: ApiResponse = await response.json();

            if (data.success && data.data) {
                setRestaurants(data.data.restaurants);
                setStats(data.data.stats);
                setPagination({
                    page: data.data.pagination.page,
                    totalPages: data.data.pagination.totalPages,
                    hasNext: data.data.pagination.hasNext,
                    hasPrev: data.data.pagination.hasPrev,
                });
            } else {
                setError(data.error || '맛집 목록을 불러오는데 실패했습니다.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('서버와 연결할 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [sido, sigungu, searchKeyword]);

    // 초기 로드 및 필터 변경 시 데이터 가져오기
    useEffect(() => {
        fetchRestaurants(1);
    }, [fetchRestaurants]);

    /**
     * 필터 적용
     */
    const handleApplyFilter = () => {
        const params = new URLSearchParams();
        if (sido) params.set('sido', sido);
        if (sigungu) params.set('sigungu', sigungu);
        if (searchKeyword) params.set('q', searchKeyword);

        router.push(`/list?${params.toString()}`);
        fetchRestaurants(1);
    };

    /**
     * 필터 태그 제거
     */
    const removeFilter = (type: 'region' | 'search') => {
        if (type === 'region') {
            setSido('');
            setSigungu('');
        } else {
            setSearchKeyword('');
        }
    };

    /**
     * 페이지 변경
     */
    const handlePageChange = (newPage: number) => {
        fetchRestaurants(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 활성화된 필터 확인
    const hasActiveFilters = sido || sigungu || searchKeyword;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 페이지 타이틀 */}
                    <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                        혼밥/혼술 스팟 찾기
                    </h1>

                    {/* 필터 영역 */}
                    <div className="bg-card rounded-xl border border-border p-6 mb-8">
                        <div className="space-y-4">
                            {/* 지역 선택 */}
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">
                                    지역
                                </label>
                                <RegionSelector
                                    sido={sido}
                                    sigungu={sigungu}
                                    onSidoChange={setSido}
                                    onSigunguChange={setSigungu}
                                />
                            </div>

                            {/* 검색어 */}
                            <div>
                                <label className="block text-sm font-medium text-muted mb-2">
                                    검색어
                                </label>
                                <SearchBar
                                    value={searchKeyword}
                                    onChange={setSearchKeyword}
                                    placeholder="가게 이름, 메뉴로 검색"
                                />
                            </div>

                            {/* 필터 적용 버튼 */}
                            <button
                                onClick={handleApplyFilter}
                                className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all"
                            >
                                필터 적용
                            </button>
                        </div>

                        {/* 활성 필터 태그 */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                                {(sido || sigungu) && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-background rounded-full text-sm">
                                        <span>📍 {sido} {sigungu}</span>
                                        <button
                                            onClick={() => removeFilter('region')}
                                            className="text-muted hover:text-primary"
                                            aria-label="지역 필터 제거"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                )}
                                {searchKeyword && (
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-background rounded-full text-sm">
                                        <span>🔍 {searchKeyword}</span>
                                        <button
                                            onClick={() => removeFilter('search')}
                                            className="text-muted hover:text-primary"
                                            aria-label="검색어 필터 제거"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 결과 개수 */}
                    {!isLoading && !error && (
                        <div className="flex items-center gap-4 mb-6 text-sm text-muted">
                            <span>총 <strong className="text-primary">{stats.total}</strong>개의 장소</span>
                            {stats.editorCertified > 0 && (
                                <span className="text-accent">
                                    에디터 인증 <strong>{stats.editorCertified}</strong>개
                                </span>
                            )}
                        </div>
                    )}

                    {/* 로딩 상태 */}
                    {isLoading && (
                        <div className="flex justify-center py-20">
                            <LoadingSpinner size="lg" />
                        </div>
                    )}

                    {/* 에러 상태 */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-error mb-4">{error}</p>
                            <button
                                onClick={() => fetchRestaurants(1)}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}

                    {/* 빈 상태 */}
                    {!isLoading && !error && restaurants.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-4">🍽️</p>
                            <p className="text-muted mb-2">검색 결과가 없습니다</p>
                            <p className="text-sm text-muted">다른 조건으로 검색해보세요</p>
                        </div>
                    )}

                    {/* 맛집 그리드 */}
                    {!isLoading && !error && restaurants.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {restaurants.map((restaurant) => (
                                    <RestaurantCard
                                        key={restaurant.id}
                                        id={restaurant.id}
                                        name={restaurant.name}
                                        address={restaurant.address}
                                        image={restaurant.images?.[0]}
                                        ojCount={restaurant.ojCount}
                                        nojCount={restaurant.nojCount}
                                        isEditorCertified={restaurant.isEditorCertified}
                                        editorComment={restaurant.editorComment}
                                    />
                                ))}
                            </div>

                            {/* 페이지네이션 */}
                            {pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <button
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={!pagination.hasPrev}
                                        className="px-4 py-2 bg-card border border-border rounded-lg text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border transition-colors"
                                    >
                                        이전
                                    </button>
                                    <span className="text-muted">
                                        {pagination.page} / {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={!pagination.hasNext}
                                        className="px-4 py-2 bg-card border border-border rounded-lg text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border transition-colors"
                                    >
                                        다음
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
