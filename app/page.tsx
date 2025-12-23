'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Header,
  Footer,
  SearchBar,
  RegionSelector,
  RestaurantCard,
  EditorBadge
} from '@/components';

/**
 * 홈페이지 컴포넌트
 * 
 * 로닛 플랫폼의 메인 랜딩 페이지입니다.
 * - 히어로 섹션: 플랫폼 소개
 * - 검색 섹션: 지역 및 키워드 검색
 * - 추천 맛집 섹션: 에디터 인증 맛집
 * - CTA 섹션: 회원가입 유도
 */
export default function HomePage() {
  const router = useRouter();

  // 검색 상태 관리
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');

  /**
   * 검색 실행
   * 선택된 지역과 키워드로 목록 페이지로 이동
   */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (selectedSido) params.set('sido', selectedSido);
    if (selectedSigungu) params.set('sigungu', selectedSigungu);
    if (searchKeyword) params.set('q', searchKeyword);

    const queryString = params.toString();
    router.push(`/list${queryString ? `?${queryString}` : ''}`);
  };

  /**
   * 엔터 키 검색
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 샘플 추천 맛집 데이터 (나중에 API로 대체)
  const featuredRestaurants = [
    {
      id: '1',
      name: '혼밥카츠',
      address: '서울 강남구 테헤란로 123',
      image: '',
      ojCount: 156,
      nojCount: 12,
      isEditorCertified: true,
      editorComment: '1인석 배치가 완벽한 돈까스 맛집',
    },
    {
      id: '2',
      name: '고독한 라멘',
      address: '서울 마포구 홍대입구역 근처',
      image: '',
      ojCount: 89,
      nojCount: 8,
      isEditorCertified: true,
      editorComment: '늦은 밤 혼술하기 좋은 이자카야',
    },
    {
      id: '3',
      name: '솔로 초밥',
      address: '서울 서초구 강남대로 456',
      image: '',
      ojCount: 234,
      nojCount: 23,
      isEditorCertified: true,
      editorComment: '카운터석에서 즐기는 오마카세',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-primary via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center animate-fade-in">
              {/* 메인 타이틀 */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-accent">로닛</span>
              </h1>

              {/* 서브타이틀 */}
              <p className="text-xl md:text-2xl font-medium mb-4 text-gray-200">
                혼자 먹고 마시는 당신을 위한
              </p>
              <p className="text-2xl md:text-3xl font-bold mb-8">
                믿을 수 있는 장소
              </p>

              {/* 설명 */}
              <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
                전문 에디터가 직접 검증하고, 수많은 혼밥러/혼술러가 인정한
                <br className="hidden md:block" />
                진짜 혼자 가기 좋은 식당과 술집을 만나보세요.
              </p>

              {/* 배지 */}
              <div className="flex justify-center gap-4 mb-8 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                  ✅ 에디터 직접 검증
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                  👍 사용자 투표 시스템
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                  🍽️ 1인석 완비 맛집
                </span>
              </div>
            </div>
          </div>

          {/* 웨이브 구분선 */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="#F9FAFB"
              />
            </svg>
          </div>
        </section>

        {/* 검색 섹션 */}
        <section className="bg-background py-12 md:py-16" onKeyDown={handleKeyDown}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-20 relative z-10 animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-6">
                혼밥/혼술 스팟 찾기
              </h2>

              {/* 지역 선택 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역 선택
                </label>
                <RegionSelector
                  sido={selectedSido}
                  sigungu={selectedSigungu}
                  onSidoChange={setSelectedSido}
                  onSigunguChange={setSelectedSigungu}
                />
              </div>

              {/* 키워드 검색 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  키워드 검색
                </label>
                <SearchBar
                  value={searchKeyword}
                  onChange={setSearchKeyword}
                  placeholder="가게 이름, 메뉴, 분위기로 검색"
                />
              </div>

              {/* 검색 버튼 */}
              <button
                onClick={handleSearch}
                className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all btn-hover"
              >
                맛집 찾기
              </button>
            </div>
          </div>
        </section>

        {/* 추천 맛집 섹션 */}
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <EditorBadge />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                에디터 추천 맛집
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                로닛 에디터가 직접 방문하고 검증한 혼밥/혼술 스팟입니다.
                <br />
                1인석 배치, 분위기, 맛까지 꼼꼼하게 체크했습니다.
              </p>
            </div>

            {/* 맛집 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RestaurantCard {...restaurant} />
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            <div className="text-center mt-12">
              <button
                onClick={() => router.push('/list?editorCertified=true')}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                에디터 인증 맛집 더보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
              왜 로닛인가요?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 특징 1 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  에디터 직접 검증
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  전문 에디터가 직접 방문하여 1인석 배치, 분위기, 서비스를 꼼꼼하게 확인합니다.
                </p>
              </div>

              {/* 특징 2 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">👍</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  ㅇㅈ/ㄴㅇㅈ 투표
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  실제 혼밥러/혼술러의 솔직한 투표로 검증된 맛집만 추천합니다.
                </p>
              </div>

              {/* 특징 3 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  지역별 큐레이션
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  서울, 경기, 부산 등 전국 주요 지역의 혼밥/혼술 스팟을 찾아보세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-accent to-orange-500 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              나만의 혼밥/혼술 스팟을 공유하세요
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              알고 있는 좋은 장소가 있다면 다른 혼밥러/혼술러에게 알려주세요.
              <br />
              함께 만들어가는 믿을 수 있는 맛집 정보입니다.
            </p>
            <button
              onClick={() => router.push('/submit')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-bold rounded-xl hover:bg-gray-100 transition-all btn-hover"
            >
              맛집 제보하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
