'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer, EditorBadge, VoteButton, LoadingSpinner } from '@/components';

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
    phone?: string;
    businessHours?: string;
    images: string[];
    latitude?: number;
    longitude?: number;
    isEditorCertified: boolean;
    editorComment?: string;
    ojCount: number;
    nojCount: number;
    isGroupSpot: boolean;
    createdAt: string;
}

/**
 * 맛집 상세 페이지
 */
export default function DetailPage() {
    const params = useParams();
    const router = useRouter();
    const restaurantId = params.id as string;

    // 데이터 상태
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 이미지 갤러리 상태
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // 투표 상태
    const [hasVoted, setHasVoted] = useState(false);
    const [votedType, setVotedType] = useState<'oj' | 'noj' | null>(null);
    const [voteLoading, setVoteLoading] = useState(false);

    /**
     * 맛집 정보 가져오기
     */
    const fetchRestaurant = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/restaurants/${restaurantId}`);
            const data = await response.json();

            if (data.success && data.data) {
                setRestaurant(data.data);
            } else {
                setError(data.error || '맛집 정보를 불러올 수 없습니다.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('서버와 연결할 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [restaurantId]);

    // 초기 로드
    useEffect(() => {
        if (restaurantId) {
            fetchRestaurant();

            // localStorage에서 투표 여부 확인
            const savedVote = localStorage.getItem(`voted_${restaurantId}`);
            if (savedVote) {
                setHasVoted(true);
                setVotedType(savedVote as 'oj' | 'noj');
            }
        }
    }, [restaurantId, fetchRestaurant]);

    /**
     * 투표 처리
     */
    const handleVote = async (type: 'oj' | 'noj') => {
        if (hasVoted || voteLoading) return;

        setVoteLoading(true);
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    restaurantId,
                    voteType: type,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // 투표 기록 저장
                localStorage.setItem(`voted_${restaurantId}`, type);
                setHasVoted(true);
                setVotedType(type);

                // 카운트 업데이트
                if (restaurant) {
                    setRestaurant({
                        ...restaurant,
                        ojCount: data.data.ojCount,
                        nojCount: data.data.nojCount,
                    });
                }
            } else {
                alert(data.error || '투표에 실패했습니다.');
            }
        } catch (err) {
            console.error('Vote error:', err);
            alert('투표 처리 중 오류가 발생했습니다.');
        } finally {
            setVoteLoading(false);
        }
    };

    /**
     * 주소 복사
     */
    const copyAddress = async () => {
        if (restaurant?.address) {
            await navigator.clipboard.writeText(restaurant.address);
            alert('주소가 복사되었습니다.');
        }
    };

    /**
     * 공유하기
     */
    const handleShare = async () => {
        if (navigator.share && restaurant) {
            try {
                await navigator.share({
                    title: `${restaurant.name} - 로닛`,
                    text: restaurant.editorComment || restaurant.description || '혼밥/혼술 추천 맛집',
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다.');
        }
    };

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </main>
                <Footer />
            </div>
        );
    }

    // 에러 상태
    if (error || !restaurant) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-4xl mb-4">😢</p>
                        <p className="text-error mb-4">{error || '맛집을 찾을 수 없습니다.'}</p>
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                        >
                            뒤로 가기
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 뒤로 가기 */}
                    <Link
                        href="/list"
                        className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        목록으로
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 이미지 갤러리 */}
                        <div className="space-y-4">
                            {/* 메인 이미지 */}
                            <div className="relative aspect-[4/3] bg-card rounded-xl overflow-hidden">
                                {restaurant.images.length > 0 ? (
                                    <Image
                                        src={restaurant.images[selectedImageIndex]}
                                        alt={restaurant.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}

                                {/* 에디터 배지 */}
                                {restaurant.isEditorCertified && (
                                    <div className="absolute top-4 left-4">
                                        <EditorBadge />
                                    </div>
                                )}
                            </div>

                            {/* 썸네일 스트립 */}
                            {restaurant.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {restaurant.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'border-accent' : 'border-transparent'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${restaurant.name} 이미지 ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 정보 영역 */}
                        <div className="space-y-6">
                            {/* 이름 및 배지 */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {restaurant.isEditorCertified && (
                                        <span className="text-accent text-sm font-medium">에디터 인증</span>
                                    )}
                                    {restaurant.isGroupSpot && (
                                        <span className="text-muted text-sm">같이 가는 가게</span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-primary">{restaurant.name}</h1>
                            </div>

                            {/* 에디터 코멘트 */}
                            {restaurant.editorComment && (
                                <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                                    <p className="text-accent italic">&ldquo;{restaurant.editorComment}&rdquo;</p>
                                </div>
                            )}

                            {/* 기본 정보 */}
                            <div className="space-y-4">
                                {/* 주소 */}
                                <div className="flex items-start gap-3">
                                    <span className="text-muted">📍</span>
                                    <div className="flex-1">
                                        <p className="text-primary">{restaurant.address}</p>
                                        <button
                                            onClick={copyAddress}
                                            className="text-sm text-accent hover:underline mt-1"
                                        >
                                            주소 복사
                                        </button>
                                    </div>
                                </div>

                                {/* 전화번호 */}
                                {restaurant.phone && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-muted">📞</span>
                                        <a
                                            href={`tel:${restaurant.phone}`}
                                            className="text-primary hover:text-accent transition-colors"
                                        >
                                            {restaurant.phone}
                                        </a>
                                    </div>
                                )}

                                {/* 영업시간 */}
                                {restaurant.businessHours && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-muted">🕐</span>
                                        <p className="text-primary">{restaurant.businessHours}</p>
                                    </div>
                                )}
                            </div>

                            {/* 설명 */}
                            {restaurant.description && (
                                <div className="pt-4 border-t border-border">
                                    <h2 className="text-lg font-bold text-primary mb-3">소개</h2>
                                    <p className="text-muted leading-relaxed">{restaurant.description}</p>
                                </div>
                            )}

                            {/* 지도 영역 */}
                            <div className="pt-4 border-t border-border">
                                <h2 className="text-lg font-bold text-primary mb-3">위치</h2>
                                {/* TODO: Naver Maps API integration needed */}
                                <div className="aspect-video bg-card rounded-xl flex items-center justify-center border border-border">
                                    {restaurant.latitude && restaurant.longitude ? (
                                        <div className="text-center text-muted">
                                            <p className="mb-2">🗺️ 지도 준비 중</p>
                                            <p className="text-xs">
                                                위도: {restaurant.latitude.toFixed(6)}, 경도: {restaurant.longitude.toFixed(6)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-muted">위치 정보가 없습니다</p>
                                    )}
                                </div>
                            </div>

                            {/* 투표 */}
                            <div className="pt-4 border-t border-border">
                                <h2 className="text-lg font-bold text-primary mb-3">
                                    이 가게 어때요?
                                </h2>
                                <VoteButton
                                    ojCount={restaurant.ojCount}
                                    nojCount={restaurant.nojCount}
                                    onVote={handleVote}
                                    disabled={hasVoted || voteLoading}
                                    votedType={votedType}
                                />
                            </div>

                            {/* 공유 버튼 */}
                            <button
                                onClick={handleShare}
                                className="w-full py-3 bg-card border border-border rounded-xl text-primary hover:bg-border transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                공유하기
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
