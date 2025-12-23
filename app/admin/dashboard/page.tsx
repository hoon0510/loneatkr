'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer, LoadingSpinner, EditorBadge } from '@/components';

/**
 * 맛집 데이터 타입
 */
interface Restaurant {
    id: string;
    name: string;
    address: string;
    region: { sido: string; sigungu: string };
    isEditorCertified: boolean;
    ojCount: number;
    nojCount: number;
    isGroupSpot: boolean;
}

interface Stats {
    total: number;
    editorCertified: number;
    totalOj: number;
    totalNoj: number;
}

/**
 * 관리자 대시보드 페이지
 */
export default function AdminDashboardPage() {
    const router = useRouter();

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, editorCertified: 0, totalOj: 0, totalNoj: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    /**
     * 데이터 로드
     */
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/restaurants');
            const data = await response.json();

            if (data.success) {
                setRestaurants(data.data.restaurants);
                setStats(data.data.stats);
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

    /**
     * 로그아웃
     */
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setIsLoggingOut(false);
        }
    };

    /**
     * 맛집 삭제
     */
    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`"${name}"을(를) 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/restaurants/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (data.success) {
                setRestaurants(prev => prev.filter(r => r.id !== id));
                setStats(prev => ({ ...prev, total: prev.total - 1 }));
            } else {
                alert(data.error || '삭제에 실패했습니다.');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    /**
     * 같이 가는 가게 토글
     */
    const handleToggleGroup = async (id: string, currentValue: boolean) => {
        const action = currentValue ? '혼자 가는 가게' : '같이 가는 가게';
        if (!confirm(`${action}(으)로 변경하시겠습니까?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/restaurants/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isGroupSpot: !currentValue }),
            });
            const data = await response.json();

            if (data.success) {
                setRestaurants(prev =>
                    prev.map(r => r.id === id ? { ...r, isGroupSpot: !currentValue } : r)
                );
            } else {
                alert(data.error || '수정에 실패했습니다.');
            }
        } catch (err) {
            console.error('Toggle error:', err);
            alert('수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            관리자 대시보드
                        </h1>
                        <div className="flex gap-3">
                            <Link
                                href="/admin/dashboard/new"
                                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                + 새 가게 추가
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="px-4 py-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors disabled:opacity-50"
                            >
                                {isLoggingOut ? '...' : '로그아웃'}
                            </button>
                        </div>
                    </div>

                    {/* 통계 카드 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-card rounded-xl border border-border">
                            <p className="text-2xl font-bold text-accent">{stats.total}</p>
                            <p className="text-sm text-muted mt-1">전체 가게</p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                            <p className="text-2xl font-bold text-green-500">{stats.editorCertified}</p>
                            <p className="text-sm text-muted mt-1">에디터 인증</p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                            <p className="text-2xl font-bold text-blue-500">{stats.totalOj}</p>
                            <p className="text-sm text-muted mt-1">총 ㅇㅈ</p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                            <p className="text-2xl font-bold text-red-500">{stats.totalNoj}</p>
                            <p className="text-sm text-muted mt-1">총 ㄴㅇㅈ</p>
                        </div>
                    </div>

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
                                onClick={fetchRestaurants}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                            >
                                다시 시도
                            </button>
                        </div>
                    )}

                    {/* 빈 상태 */}
                    {!isLoading && !error && restaurants.length === 0 && (
                        <div className="text-center py-20 bg-card rounded-xl border border-border">
                            <p className="text-4xl mb-4">🍽️</p>
                            <p className="text-muted mb-4">등록된 가게가 없습니다</p>
                            <Link
                                href="/admin/dashboard/new"
                                className="inline-block px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                            >
                                첫 번째 가게 추가하기
                            </Link>
                        </div>
                    )}

                    {/* 맛집 테이블 (데스크톱) */}
                    {!isLoading && !error && restaurants.length > 0 && (
                        <>
                            <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-background">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted">이름</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-muted">지역</th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-muted">에디터</th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-muted">ㅇㅈ</th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-muted">ㄴㅇㅈ</th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-muted">같이가기</th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-muted">작업</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {restaurants.map((restaurant) => (
                                            <tr key={restaurant.id} className="hover:bg-background/50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <span className="font-medium text-primary">{restaurant.name}</span>
                                                </td>
                                                <td className="px-4 py-3 text-muted text-sm">
                                                    {restaurant.region.sido} {restaurant.region.sigungu}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {restaurant.isEditorCertified && <EditorBadge />}
                                                </td>
                                                <td className="px-4 py-3 text-center text-green-500">{restaurant.ojCount}</td>
                                                <td className="px-4 py-3 text-center text-red-500">{restaurant.nojCount}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleToggleGroup(restaurant.id, restaurant.isGroupSpot)}
                                                        className={`px-2 py-1 rounded text-xs ${restaurant.isGroupSpot
                                                                ? 'bg-blue-500/20 text-blue-400'
                                                                : 'bg-gray-500/20 text-gray-400'
                                                            }`}
                                                    >
                                                        {restaurant.isGroupSpot ? '같이' : '혼자'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/admin/dashboard/edit/${restaurant.id}`}
                                                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm hover:bg-blue-500/30"
                                                        >
                                                            수정
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(restaurant.id, restaurant.name)}
                                                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30"
                                                        >
                                                            삭제
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* 맛집 카드 (모바일) */}
                            <div className="md:hidden space-y-4">
                                {restaurants.map((restaurant) => (
                                    <div key={restaurant.id} className="bg-card rounded-xl border border-border p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-medium text-primary">{restaurant.name}</h3>
                                                <p className="text-muted text-sm">{restaurant.region.sido} {restaurant.region.sigungu}</p>
                                            </div>
                                            {restaurant.isEditorCertified && <EditorBadge />}
                                        </div>
                                        <div className="flex gap-4 text-sm mb-3">
                                            <span className="text-green-500">ㅇㅈ {restaurant.ojCount}</span>
                                            <span className="text-red-500">ㄴㅇㅈ {restaurant.nojCount}</span>
                                            <span className={restaurant.isGroupSpot ? 'text-blue-400' : 'text-gray-400'}>
                                                {restaurant.isGroupSpot ? '같이가기' : '혼자가기'}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/dashboard/edit/${restaurant.id}`}
                                                className="flex-1 text-center px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
                                            >
                                                수정
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(restaurant.id, restaurant.name)}
                                                className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
