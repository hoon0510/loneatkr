'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer, SearchBar, RegionSelector } from '@/components';

/**
 * 홈페이지 컴포넌트
 * 
 * 로닛 플랫폼의 메인 랜딩 페이지입니다.
 * 심플한 디자인으로 핵심 기능에 집중합니다.
 */
export default function HomePage() {
  const router = useRouter();

  // 검색 상태 관리
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');

  /**
   * 검색 실행
   */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedSido) params.set('sido', selectedSido);
    if (selectedSigungu) params.set('sigungu', selectedSigungu);
    if (searchKeyword) params.set('q', searchKeyword);

    const queryString = params.toString();
    router.push(`/list${queryString ? `?${queryString}` : ''}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center" onKeyDown={handleKeyDown}>
          {/* 메인 타이틀 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-12 leading-tight animate-fade-in">
            오늘 당신의 고독함은
            <br />
            <span className="text-accent">얼마짜리</span>인가요?
          </h1>

          {/* 검색 영역 */}
          <div className="space-y-4 animate-fade-in-up">
            {/* 지역 선택 */}
            <RegionSelector
              sido={selectedSido}
              sigungu={selectedSigungu}
              onSidoChange={setSelectedSido}
              onSigunguChange={setSelectedSigungu}
            />

            {/* 키워드 검색 */}
            <SearchBar
              value={searchKeyword}
              onChange={setSearchKeyword}
              placeholder="가게 이름, 메뉴로 검색"
            />

            {/* 검색 버튼 */}
            <button
              onClick={handleSearch}
              className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all"
            >
              찾아보기
            </button>
          </div>

          {/* 간단한 설명 */}
          <p className="mt-12 text-muted text-sm animate-fade-in animate-delay-300">
            에디터 인증 · 사용자 투표 · 혼밥/혼술 전용
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
