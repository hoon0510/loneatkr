# 🚀 배포 단계별 가이드

loneat.kr 프로덕션 배포를 위한 상세 가이드입니다.

---

## 1단계: MongoDB Atlas 설정

### 클러스터 생성
- [ ] https://mongodb.com/cloud/atlas 가입
- [ ] "Build a Database" 클릭
- [ ] M0 Free Tier 선택
- [ ] AWS, Seoul 리전 선택 (가장 가까움)
- [ ] 클러스터 이름: `loneat-production`

### 사용자 생성
- [ ] Database Access → Add New Database User
- [ ] 사용자명: `loneat_admin`
- [ ] 비밀번호: (강력한 비밀번호 생성)
- [ ] Role: Atlas Admin

### 네트워크 설정
- [ ] Network Access → Add IP Address
- [ ] "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] 또는 Vercel IP만 허용 (보안 강화)

### 연결 문자열 복사
- [ ] Clusters → Connect → Drivers
- [ ] 연결 문자열 복사
- [ ] `<password>` 를 실제 비밀번호로 교체
- [ ] `/loneat` 데이터베이스 이름 추가

예시:
```
mongodb+srv://loneat_admin:YOUR_PASSWORD@loneat-production.xxxxx.mongodb.net/loneat?retryWrites=true&w=majority
```

---

## 2단계: Vercel 프로젝트 생성

### GitHub 연결
- [ ] https://vercel.com 로그인
- [ ] "Add New" → "Project"
- [ ] GitHub 저장소 선택: `hoon0510/loneatkr`
- [ ] "Import" 클릭

### 프로젝트 설정
- [ ] Framework Preset: **Next.js** ✅
- [ ] Root Directory: `./` (기본값)
- [ ] Build Command: `npm run build` (기본값)
- [ ] Install Command: `npm install` (기본값)

---

## 3단계: 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables

| 변수명 | 값 | Environment |
|--------|-----|-------------|
| `MONGODB_URI` | mongodb+srv://... | Production, Preview |
| `JWT_SECRET` | (64자 이상 랜덤 문자열) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | https://loneat.kr | Production |

### JWT Secret 생성 방법
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 4단계: 첫 배포

### 배포 시작
- [ ] 환경 변수 설정 완료 확인
- [ ] "Deploy" 버튼 클릭
- [ ] 빌드 로그 모니터링

### 빌드 확인
- [ ] ✅ Installing dependencies...
- [ ] ✅ Building application...
- [ ] ✅ Collecting page data...
- [ ] ✅ Generating static pages...
- [ ] ✅ Finalizing build...

### 프리뷰 확인
- [ ] 생성된 프리뷰 URL 접속
- [ ] 기본 페이지 작동 확인

---

## 5단계: 도메인 연결 (loneat.kr)

### Vercel에서 도메인 추가
- [ ] Project Settings → Domains
- [ ] `loneat.kr` 입력 → Add

### DNS 설정

**옵션 A: CNAME (권장)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**옵션 B: A Record**
```
Type: A
Name: @
Value: 76.76.19.19
```

**www 서브도메인**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL 확인
- [ ] Vercel에서 자동 SSL 발급 확인
- [ ] https://loneat.kr 접속 테스트

---

## 6단계: 관리자 계정 생성

### Vercel CLI 사용 (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel link

# 프로덕션 환경에서 스크립트 실행
vercel env pull .env.local
npm run create-admin
```

### 또는 MongoDB Compass 직접 사용
1. MongoDB Compass 설치
2. 연결 문자열로 접속
3. `admins` 컬렉션에 직접 추가

기본 로그인:
- 사용자명: `admin`
- 비밀번호: `admin123` (반드시 변경!)

---

## 7단계: 배포 후 검증

### 기능 테스트
- [ ] 홈페이지 (/)
- [ ] 맛집 목록 (/list)
- [ ] 같이 가는 가게 (/group-spots)
- [ ] 맛집 상세 페이지
- [ ] 관리자 로그인 (/admin/login)
- [ ] 관리자 대시보드 (/admin/dashboard)
- [ ] 맛집 추가/수정/삭제
- [ ] 이미지 업로드
- [ ] 투표 기능 (ㅇㅈ/ㄴㅇㅈ)

### 반응형 테스트
- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크톱 (1280px+)

### SEO 확인
- [ ] /sitemap.xml 접근
- [ ] /robots.txt 접근
- [ ] Open Graph 태그 확인

### 성능 테스트
- [ ] Lighthouse 점수 확인
- [ ] Core Web Vitals 확인

---

## 🎉 배포 완료!

축하합니다! loneat.kr이 성공적으로 배포되었습니다.

### 다음 단계
1. 샘플 데이터 추가 (`npm run seed`)
2. 실제 맛집 데이터 입력
3. Vercel Analytics 활성화
4. 사용자 피드백 수집
