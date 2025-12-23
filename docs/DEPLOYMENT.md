# 로닛 배포 가이드

이 문서는 로닛을 Vercel에 배포하는 방법을 안내합니다.

## 목차

1. [사전 준비](#사전-준비)
2. [Vercel 배포](#vercel-배포)
3. [환경 변수 설정](#환경-변수-설정)
4. [도메인 설정](#도메인-설정)
5. [배포 후 확인](#배포-후-확인)

---

## 사전 준비

### 필수 사항

- [x] GitHub 저장소에 코드 푸시 완료
- [x] MongoDB Atlas 클러스터 생성 및 설정
- [x] 환경 변수 값 준비 (MONGODB_URI, JWT_SECRET)
- [x] Vercel 계정 (vercel.com)

### MongoDB Atlas 프로덕션 설정

1. Network Access에서 Vercel IP 허용:
   - 0.0.0.0/0 (모든 IP 허용) 또는
   - Vercel의 출구 IP 목록 확인하여 추가

2. 프로덕션용 데이터베이스 사용자 생성

---

## Vercel 배포

### 1. 프로젝트 연결

1. [Vercel](https://vercel.com) 로그인
2. **Add New** > **Project**
3. **Import Git Repository** > GitHub 연결
4. `hoon0510/loneatkr` 저장소 선택
5. **Import** 클릭

### 2. 프로젝트 설정

- **Framework Preset**: Next.js ✅
- **Root Directory**: ./
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: .next (기본값)
- **Install Command**: `npm install` (기본값)

### 3. 환경 변수 설정

**Settings** > **Environment Variables**에서 다음 추가:

| Variable | Value | Environment |
|----------|-------|-------------|
| `MONGODB_URI` | mongodb+srv://... | Production |
| `JWT_SECRET` | (64자 이상 랜덤 문자열) | Production |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | (네이버 클라이언트 ID) | Production |
| `NEXT_PUBLIC_SITE_URL` | https://loneat.kr | Production |

### 4. 배포

1. **Deploy** 클릭
2. 빌드 로그 확인
3. 배포 완료 후 프리뷰 URL 확인

---

## 도메인 설정

### Vercel 도메인 연결

1. **Settings** > **Domains**
2. **Add** 클릭
3. `loneat.kr` 입력
4. DNS 설정 안내 따르기

### DNS 레코드 설정

도메인 제공업체에서 다음 레코드 추가:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

또는 A 레코드:

```
Type: A
Name: @
Value: 76.76.19.19
```

---

## 배포 후 확인

### 기능 테스트 체크리스트

- [ ] 홈페이지 정상 로딩
- [ ] 맛집 목록 페이지 (/list)
- [ ] 같이 가는 가게 페이지 (/group-spots)
- [ ] 상세 페이지 (/detail/[id])
- [ ] 관리자 로그인 (/admin/login)
- [ ] 관리자 대시보드 (/admin/dashboard)
- [ ] 맛집 등록/수정/삭제
- [ ] 이미지 업로드
- [ ] 투표 기능

### 성능 확인

1. [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) 실행
2. 목표 점수:
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### 모니터링

1. Vercel Analytics 활성화
2. 에러 로그 확인 (Vercel Dashboard > Logs)

---

## 이미지 업로드 설정

### Vercel에서 이미지 업로드

Vercel은 서버리스이므로 로컬 파일 저장이 영구적이지 않습니다.

**옵션 1: Vercel Blob Storage** (권장)
- Vercel Dashboard > Storage > Create Database > Blob

**옵션 2: 외부 스토리지**
- AWS S3
- Cloudinary
- Supabase Storage

---

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 테스트
npm run build
```

### 환경 변수 오류

1. Vercel Dashboard > Settings > Environment Variables 확인
2. 변수 이름/값 정확히 입력되었는지 확인
3. 재배포 필요

### MongoDB 연결 오류

1. MongoDB Atlas Network Access에서 0.0.0.0/0 허용
2. 연결 문자열 형식 확인
3. 비밀번호 특수문자 URL 인코딩

### 404 오류

1. 동적 라우트 설정 확인
2. middleware.ts 설정 확인
