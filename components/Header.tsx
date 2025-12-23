'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Header 컴포넌트 - 다크 테마
 */
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* 로고 */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-primary font-bold text-xl hover:text-accent transition-colors"
                        aria-label="로닛 홈으로 이동"
                    >
                        <span className="text-accent">🍽️</span>
                        <span>로닛</span>
                    </Link>

                    {/* 데스크톱 네비게이션 */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-muted hover:text-primary font-medium transition-colors"
                        >
                            홈
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted hover:text-primary font-medium transition-colors"
                        >
                            소개
                        </Link>
                    </div>

                    {/* 모바일 햄버거 버튼 */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg text-muted hover:bg-card transition-colors"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-label="메뉴 열기"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* 모바일 메뉴 */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-muted hover:text-primary font-medium transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                홈
                            </Link>
                            <Link
                                href="/about"
                                className="text-muted hover:text-primary font-medium transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                소개
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
