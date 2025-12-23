# 변경 로그 (Changelog)

모든 주요 변경 사항이 이 파일에 기록됩니다.

---

## [1.0.0] - 2025-12-23

### 🎉 초기 릴리스

혼밥/혼술 큐레이션 플랫폼 **로닛(loneat.kr)** 첫 번째 프로덕션 릴리스.

### ✨ 주요 기능

#### 공개 페이지
- **홈페이지**: 미니멀한 검색 중심 디자인
- **맛집 목록**: 지역/키워드 필터링, 페이지네이션
- **맛집 상세**: 이미지 갤러리, 투표, 지도 (준비중)
- **같이 가는 가게**: 그룹 스팟 전용 페이지

#### 관리자 기능
- **인증 시스템**: JWT 기반 로그인/로그아웃
- **대시보드**: 통계 카드, 맛집 목록 테이블
- **CRUD**: 맛집 추가/수정/삭제
- **이미지 업로드**: 다중 이미지 지원

#### UI/UX
- **다크 테마**: 전체 다크 모드 적용
- **반응형 디자인**: 모바일/태블릿/데스크톱
- **한국어 UI**: 모든 텍스트 한국어화
- **에러 처리**: 404, 에러 페이지, 로딩 상태

#### 개발자 도구
- **문서화**: SETUP, DEPLOYMENT, CHECKLIST
- **스크립트**: create-admin, seed
- **SEO**: sitemap, robots.txt

### 🛠️ 기술 스택
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- MongoDB (Mongoose)
- JWT Authentication

### 📦 API 엔드포인트
- `GET /api/restaurants` - 맛집 목록
- `GET /api/restaurants/[id]` - 맛집 상세
- `GET /api/group-spots` - 같이 가는 가게
- `POST /api/vote` - 투표
- `POST /api/admin/login` - 관리자 로그인
- `POST /api/admin/logout` - 관리자 로그아웃
- `GET/POST /api/admin/restaurants` - 관리자 맛집 목록/생성
- `GET/PUT/PATCH/DELETE /api/admin/restaurants/[id]` - 관리자 맛집 CRUD
- `POST /api/admin/upload` - 이미지 업로드

### ⚠️ 알려진 제한 사항
- 네이버 지도 API 미연동 (플레이스홀더만 표시)
- 이미지 저장 로컬 전용 (Vercel에서 영구 저장 안됨)
- 비밀번호 변경 기능 없음

### 🔜 다음 버전 예정
- 네이버 지도 API 연동
- 외부 이미지 스토리지 연동 (Vercel Blob)
- 비밀번호 변경 기능
- 사용자 리뷰 시스템

---

## 버전 형식

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다.

- **MAJOR**: 호환되지 않는 API 변경
- **MINOR**: 하위 호환되는 기능 추가
- **PATCH**: 하위 호환되는 버그 수정
