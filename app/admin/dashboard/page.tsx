'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components';

/**
 * 관리자 대시보드 페이지
 */
export default function AdminDashboardPage() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    /**
     * 로그아웃 처리
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

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 헤더 */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-primary">
                            관리자 대시보드
                        </h1>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="px-4 py-2 bg-card border border-border rounded-lg text-muted hover:text-primary transition-colors disabled:opacity-50"
                        >
                            {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
                        </button>
                    </div>

                    {/* 메뉴 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 맛집 관리 */}
                        <Link
                            href="/admin/restaurants"
                            className="p-6 bg-card rounded-xl border border-border hover:border-accent transition-colors group"
                        >
                            <div className="text-3xl mb-4">🍽️</div>
                            <h2 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                맛집 관리
                            </h2>
                            <p className="text-muted text-sm mt-2">
                                맛집 목록 보기, 추가, 수정, 삭제
                            </p>
                        </Link>

                        {/* 맛집 등록 */}
                        <Link
                            href="/admin/restaurants/new"
                            className="p-6 bg-card rounded-xl border border-border hover:border-accent transition-colors group"
                        >
                            <div className="text-3xl mb-4">➕</div>
                            <h2 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                새 맛집 등록
                            </h2>
                            <p className="text-muted text-sm mt-2">
                                새로운 혼밥/혼술 스팟 등록
                            </p>
                        </Link>

                        {/* 통계 */}
                        <Link
                            href="/admin/stats"
                            className="p-6 bg-card rounded-xl border border-border hover:border-accent transition-colors group"
                        >
                            <div className="text-3xl mb-4">📊</div>
                            <h2 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                통계
                            </h2>
                            <p className="text-muted text-sm mt-2">
                                방문자, 투표, 맛집 통계 확인
                            </p>
                        </Link>
                    </div>

                    {/* 빠른 통계 */}
                    <div className="mt-12">
                        <h2 className="text-lg font-bold text-primary mb-4">빠른 통계</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-card rounded-xl border border-border text-center">
                                <p className="text-2xl font-bold text-accent">-</p>
                                <p className="text-sm text-muted mt-1">총 맛집</p>
                            </div>
                            <div className="p-4 bg-card rounded-xl border border-border text-center">
                                <p className="text-2xl font-bold text-accent">-</p>
                                <p className="text-sm text-muted mt-1">에디터 인증</p>
                            </div>
                            <div className="p-4 bg-card rounded-xl border border-border text-center">
                                <p className="text-2xl font-bold text-accent">-</p>
                                <p className="text-sm text-muted mt-1">총 투표</p>
                            </div>
                            <div className="p-4 bg-card rounded-xl border border-border text-center">
                                <p className="text-2xl font-bold text-accent">-</p>
                                <p className="text-sm text-muted mt-1">이번 달 등록</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
