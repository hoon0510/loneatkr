import Link from 'next/link';

/**
 * 404 Not Found 페이지
 */
export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
                <h2 className="text-2xl font-bold text-primary mb-4">
                    페이지를 찾을 수 없습니다
                </h2>
                <p className="text-muted mb-8">
                    요청하신 페이지가 존재하지 않거나
                    <br />
                    이동되었을 수 있습니다.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-colors"
                    >
                        홈으로 가기
                    </Link>
                    <Link
                        href="/list"
                        className="px-6 py-3 bg-card border border-border text-primary rounded-xl font-medium hover:bg-border transition-colors"
                    >
                        맛집 찾기
                    </Link>
                </div>
            </div>
        </div>
    );
}
