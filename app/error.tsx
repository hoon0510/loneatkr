'use client';

import { useEffect } from 'react';

/**
 * 글로벌 에러 페이지
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-6xl mb-4">😵</h1>
                <h2 className="text-2xl font-bold text-primary mb-4">
                    문제가 발생했습니다
                </h2>
                <p className="text-muted mb-8">
                    페이지를 불러오는 중 오류가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-colors"
                    >
                        다시 시도
                    </button>
                    <a
                        href="/"
                        className="px-6 py-3 bg-card border border-border text-primary rounded-xl font-medium hover:bg-border transition-colors"
                    >
                        홈으로 가기
                    </a>
                </div>
            </div>
        </div>
    );
}
