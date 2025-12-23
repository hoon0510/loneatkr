/**
 * 글로벌 로딩 페이지
 */
export default function Loading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-border border-t-accent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted">로딩 중...</p>
            </div>
        </div>
    );
}
