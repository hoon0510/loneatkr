'use client';

import { useEffect, useState } from 'react';
import { Header, Footer, RestaurantCard, LoadingSpinner } from '@/components';

/**
 * 맛집 데이터 타입
 */
interface Restaurant {
    id: string;
    name: string;
    address: string;
    images: string[];
    ojCount: number;
    nojCount: number;
    isEditorCertified: boolean;
    editorComment?: string;
}

/**
 * 같이 가는 가게 페이지
 */
export default function GroupSpotsPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroupSpots = async () => {
            try {
                const response = await fetch('/api/group-spots');
                const data = await response.json();

                if (data.success) {
                    setRestaurants(data.data.restaurants);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupSpots();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 페이지 헤더 */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            같이 가는 가게
                        </h1>
                        <p className="text-muted text-lg mb-6">
                            혼자보다 함께 가기 좋은 장소들
                        </p>

                        {/* 설명 */}
                        <div className="inline-block p-4 bg-card rounded-xl border border-border text-left max-w-xl">
                            <p className="text-sm text-muted">
                                💡 <span className="text-primary font-medium">같이 가는 가게</span>란?
                                <br />
                                혼밥/혼술 전문이 아니지만 분위기 좋고 맛있어서
                                함께 방문하기 좋은 장소입니다.
                            </p>
                        </div>
                    </div>

                    {/* 결과 개수 */}
                    {!isLoading && !error && (
                        <p className="text-muted mb-6">
                            총 <strong className="text-primary">{restaurants.length}</strong>개의 같이 가는 가게
                        </p>
                    )}

                    {/* 로딩 */}
                    {isLoading && (
                        <div className="flex justify-center py-20">
                            <LoadingSpinner size="lg" />
                        </div>
                    )}

                    {/* 에러 */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-error mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}

                    {/* 빈 상태 */}
                    {!isLoading && !error && restaurants.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-4">👥</p>
                            <p className="text-muted mb-2">아직 등록된 같이 가는 가게가 없습니다</p>
                            <p className="text-sm text-muted">곧 좋은 장소들이 추가될 예정입니다</p>
                        </div>
                    )}

                    {/* 맛집 그리드 */}
                    {!isLoading && !error && restaurants.length > 0 && (
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
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
