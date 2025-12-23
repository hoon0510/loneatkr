# 프로덕션 배포 체크리스트

배포 전 반드시 확인해야 할 사항들입니다.

---

## 환경 설정

- [ ] MongoDB Atlas 클러스터 생성 완료
- [ ] MongoDB 사용자 생성 및 권한 설정
- [ ] MongoDB Network Access 설정 (0.0.0.0/0 또는 Vercel IP)
- [ ] Vercel 환경 변수 설정
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET (64자 이상)
  - [ ] NEXT_PUBLIC_NAVER_MAP_CLIENT_ID
  - [ ] NEXT_PUBLIC_SITE_URL

---

## 관리자 설정

- [ ] 관리자 계정 생성 (`npm run create-admin`)
- [ ] 기본 비밀번호 변경 (admin123 → 강력한 비밀번호)
- [ ] 관리자 로그인 테스트

---

## 데이터 준비

- [ ] 샘플 데이터 추가 (`npm run seed`) - 선택사항
- [ ] 실제 맛집 데이터 입력 시작

---

## 기능 테스트

### 공개 페이지
- [ ] 홈페이지 (/)
- [ ] 맛집 목록 (/list)
- [ ] 같이 가는 가게 (/group-spots)
- [ ] 맛집 상세 (/detail/[id])
- [ ] 지역/키워드 검색 기능
- [ ] 투표 기능 (ㅇㅈ/ㄴㅇㅈ)

### 관리자 페이지
- [ ] 로그인 (/admin/login)
- [ ] 대시보드 (/admin/dashboard)
- [ ] 맛집 등록 (/admin/dashboard/new)
- [ ] 맛집 수정 (/admin/dashboard/edit/[id])
- [ ] 맛집 삭제
- [ ] 이미지 업로드
- [ ] 로그아웃

---

## 반응형 디자인

- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크톱 (1280px+)
- [ ] 네비게이션 메뉴 (햄버거)
- [ ] 그리드 레이아웃

---

## SEO 확인

- [ ] 메타 타이틀 설정
- [ ] 메타 설명 설정
- [ ] Open Graph 태그
- [ ] 파비콘
- [ ] robots.txt (선택)
- [ ] sitemap.xml (선택)

---

## 성능 확인

- [ ] Lighthouse Performance 80+
- [ ] Lighthouse Accessibility 90+
- [ ] Lighthouse Best Practices 90+
- [ ] Lighthouse SEO 90+
- [ ] 이미지 최적화
- [ ] 로딩 속도 3초 이내

---

## 에러 처리

- [ ] 404 페이지 확인
- [ ] 에러 페이지 확인
- [ ] API 에러 응답 확인
- [ ] 로딩 상태 표시

---

## 보안

- [ ] JWT 비밀키 충분히 강력한지 확인
- [ ] 관리자 비밀번호 변경
- [ ] 환경 변수가 Git에 커밋되지 않았는지 확인
- [ ] HTTPS 활성화 (Vercel 기본 제공)

---

## 배포 후

- [ ] 도메인 연결 (loneat.kr)
- [ ] SSL 인증서 확인
- [ ] 모든 페이지 최종 테스트
- [ ] Vercel Analytics 활성화
- [ ] 에러 모니터링 설정

---

## 서명

| 항목 | 확인자 | 날짜 |
|------|--------|------|
| 개발 완료 | | |
| 테스트 완료 | | |
| 배포 완료 | | |
