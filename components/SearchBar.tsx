'use client';

import { ChangeEvent } from 'react';

/**
 * SearchBar Props
 */
interface SearchBarProps {
    /** 검색어 */
    value: string;
    /** 검색어 변경 핸들러 */
    onChange: (value: string) => void;
    /** 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 추가 CSS 클래스 */
    className?: string;
}

/**
 * SearchBar 컴포넌트
 * 
 * 가게 이름, 메뉴 등으로 검색할 수 있는 검색 입력 필드입니다.
 */
export default function SearchBar({
    value,
    onChange,
    placeholder = '가게 이름, 메뉴로 검색',
    className = '',
}: SearchBarProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className={`relative ${className}`}>
            {/* 검색 아이콘 */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* 검색 입력 필드 */}
            <input
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                aria-label="검색"
            />

            {/* 지우기 버튼 */}
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="검색어 지우기"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
