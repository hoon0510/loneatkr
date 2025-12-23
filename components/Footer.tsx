import Link from 'next/link';

/**
 * Footer 컴포넌트 - 다크 테마
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* 로고 및 설명 */}
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="text-xl font-bold text-primary hover:text-accent transition-colors"
                        >
                            🍽️ 로닛
                        </Link>
                        <p className="text-muted text-sm mt-2">
                            혼밥/혼술 큐레이션 플랫폼
                        </p>
                    </div>

                    {/* 링크 */}
                    <div className="flex gap-6 text-sm text-muted">
                        <Link
                            href="/about"
                            className="hover:text-primary transition-colors"
                        >
                            소개
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-primary transition-colors"
                        >
                            개인정보처리방침
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-primary transition-colors"
                        >
                            이용약관
                        </Link>
                    </div>
                </div>

                {/* 저작권 */}
                <div className="mt-8 pt-6 border-t border-border text-center text-muted text-sm">
                    <p>© {currentYear} 로닛(loneat.kr). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
