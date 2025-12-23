# 로닛 (loneat.kr)

혼밥/혼술 큐레이션 플랫폼 - 혼자 가기 좋은 식당과 술집을 찾아보세요.

![로닛 로고](https://loneat.kr/og-image.png)

## 🍽️ 소개

로닛은 **혼자 먹고 마시는 당신을 위한** 맛집 큐레이션 플랫폼입니다.

- ✅ **에디터 직접 검증**: 전문 에디터가 1인석 배치, 분위기를 확인
- 👍 **ㅇㅈ/ㄴㅇㅈ 투표**: 사용자들의 솔직한 평가
- 📍 **지역별 큐레이션**: 전국 주요 지역의 혼밥/혼술 스팟

---

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/hoon0510/loneatkr.git
cd loneatkr

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어 값 입력

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📚 문서

자세한 설정 및 배포 가이드는 `/docs` 폴더를 참조하세요:

| 문서 | 설명 |
|------|------|
| [SETUP.md](./docs/SETUP.md) | 초기 설정 가이드 (MongoDB, API 키 등) |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Vercel 배포 가이드 |
| [PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md) | 프로덕션 체크리스트 |

---

## 🛠️ 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken, bcryptjs)
- **Deployment**: Vercel

---

## 📂 프로젝트 구조

```
loneatkr/
├── app/                    # Next.js App Router 페이지
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   ├── detail/[id]/       # 맛집 상세 페이지
│   ├── group-spots/       # 같이 가는 가게
│   ├── list/              # 맛집 목록
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸리티 함수
├── models/                # Mongoose 스키마
├── types/                 # TypeScript 타입
├── docs/                  # 문서
└── scripts/               # 스크립트 (시딩, 관리자 생성)
```

---

## 🔧 스크립트

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm start

# 린트
npm run lint

# 관리자 계정 생성
npm run create-admin

# 샘플 데이터 시딩
npm run seed
```

---

## 🌐 환경 변수

| 변수 | 설명 | 필수 |
|------|------|------|
| `MONGODB_URI` | MongoDB 연결 문자열 | ✅ |
| `JWT_SECRET` | JWT 비밀키 (64자 이상) | ✅ |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 네이버 지도 API | ❌ |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | ❌ |

---

## 🔗 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 |
| `/list` | 맛집 목록 (검색/필터) |
| `/detail/[id]` | 맛집 상세 |
| `/group-spots` | 같이 가는 가게 |
| `/admin/login` | 관리자 로그인 |
| `/admin/dashboard` | 관리자 대시보드 |

---

## 📝 개발 워크플로우

1. **기능 개발**: feature 브랜치 생성
2. **커밋**: 컨벤션 따라 커밋 메시지 작성
3. **PR**: main 브랜치로 Pull Request
4. **리뷰**: 코드 리뷰 후 머지
5. **배포**: main 브랜치 푸시 시 자동 배포 (Vercel)

### 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 스타일 변경
refactor: 코드 리팩토링
chore: 기타 변경사항
```

---

## ❓ FAQ

### MongoDB 연결이 안 돼요

1. MongoDB Atlas에서 Network Access 확인 (0.0.0.0/0)
2. 연결 문자열의 사용자명/비밀번호 확인
3. 특수문자가 있으면 URL 인코딩

### 빌드가 실패해요

```bash
npm run build
```
오류 메시지 확인 후 해당 파일 수정

### 이미지 업로드가 안 돼요

Vercel은 서버리스이므로 로컬 파일 저장이 영구적이지 않습니다.
프로덕션에서는 Vercel Blob 또는 외부 스토리지 사용을 권장합니다.

---

## 📄 라이선스

MIT License

---

## 👨‍💻 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by 로닛 팀
