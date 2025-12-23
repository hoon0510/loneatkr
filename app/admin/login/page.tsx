'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * 관리자 로그인 페이지
 */
export default function AdminLoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * 로그인 처리
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                // 로그인 성공
                router.push('/admin/dashboard');
            } else {
                setError(data.error || '로그인에 실패했습니다.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('서버와 연결할 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* 로고 */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-primary">
                            <span className="text-accent">🍽️</span> 로닛
                        </h1>
                    </Link>
                    <p className="text-muted mt-2">관리자 로그인</p>
                </div>

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-8">
                    {/* 에러 메시지 */}
                    {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
                            {error}
                        </div>
                    )}

                    {/* 사용자명 */}
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-sm font-medium text-primary mb-2">
                            사용자명
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="admin"
                            required
                            autoComplete="username"
                            disabled={isLoading}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                로그인 중...
                            </>
                        ) : (
                            '로그인'
                        )}
                    </button>

                    {/* 홈으로 */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-muted hover:text-primary transition-colors">
                            ← 홈으로 돌아가기
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
