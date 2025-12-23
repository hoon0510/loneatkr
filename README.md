# 🍽️ 로닛 (loneat.kr)

> ✅ **Production Ready - v1.0.0**

혼밥/혼술 큐레이션 플랫폼 - 혼자 가기 좋은 식당과 술집을 찾아보세요.

**🔗 Live URL:** [https://loneat.kr](https://loneat.kr)

---

## 📖 소개

로닛은 **혼자 먹고 마시는 당신을 위한** 맛집 큐레이션 플랫폼입니다.

| 특징 | 설명 |
|------|------|
| ✅ **에디터 직접 검증** | 전문 에디터가 1인석 배치, 분위기를 확인 |
| 👍 **ㅇㅈ/ㄴㅇㅈ 투표** | 사용자들의 솔직한 평가 |
| 📍 **지역별 큐레이션** | 전국 주요 지역의 혼밥/혼술 스팟 |
| 👥 **같이 가는 가게** | 여럿이 가기 좋은 장소 별도 분류 |

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

**브라우저:** [http://localhost:3000](http://localhost:3000)

---

## 📚 문서

| 문서 | 설명 |
|------|------|
| [SETUP.md](./docs/SETUP.md) | 초기 설정 (MongoDB, API 키) |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Vercel 배포 가이드 |
| [DEPLOY_STEPS.md](./docs/DEPLOY_STEPS.md) | 단계별 배포 체크리스트 |
| [PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md) | 프로덕션 체크리스트 |
| [ROLLBACK.md](./docs/ROLLBACK.md) | 롤백 가이드 |
| [CHANGELOG.md](./CHANGELOG.md) | 변경 로그 |

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT (jsonwebtoken, bcryptjs) |
| **Deployment** | Vercel |

---

## 📂 프로젝트 구조

```
loneatkr/
├── app/                    # Next.js App Router
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   ├── detail/[id]/       # 맛집 상세
│   ├── group-spots/       # 같이 가는 가게
│   ├── list/              # 맛집 목록
│   ├── error.tsx          # 에러 페이지
│   ├── loading.tsx        # 로딩 페이지
│   ├── not-found.tsx      # 404 페이지
│   ├── robots.ts          # robots.txt
│   ├── sitemap.ts         # sitemap.xml
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 컴포넌트
├── lib/                   # 유틸리티
├── models/                # Mongoose 스키마
├── types/                 # TypeScript 타입
├── docs/                  # 문서
├── scripts/               # 스크립트
└── vercel.json            # Vercel 설정
```

---

## 🔧 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 프로덕션 서버 |
| `npm run lint` | ESLint 검사 |
| `npm run create-admin` | 관리자 계정 생성 |
| `npm run seed` | 샘플 데이터 추가 |

---

## 🌐 환경 변수

| 변수 | 설명 | 필수 |
|------|------|------|
| `MONGODB_URI` | MongoDB 연결 문자열 | ✅ |
| `JWT_SECRET` | JWT 비밀키 (64자+) | ✅ |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 네이버 지도 API | ❌ |
| `NEXT_PUBLIC_SITE_URL` | 사이트 URL | ❌ |

---

## 🔗 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 홈페이지 (검색) |
| `/list` | 맛집 목록 |
| `/detail/[id]` | 맛집 상세 |
| `/group-spots` | 같이 가는 가게 |
| `/admin/login` | 관리자 로그인 |
| `/admin/dashboard` | 관리자 대시보드 |

---

## 📡 API 엔드포인트

### 공개 API
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants` | 맛집 목록 |
| GET | `/api/restaurants/[id]` | 맛집 상세 |
| GET | `/api/group-spots` | 같이 가는 가게 |
| POST | `/api/vote` | 투표 |

### 관리자 API
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/admin/login` | 로그인 |
| POST | `/api/admin/logout` | 로그아웃 |
| GET/POST | `/api/admin/restaurants` | 목록/생성 |
| GET/PUT/PATCH/DELETE | `/api/admin/restaurants/[id]` | CRUD |
| POST | `/api/admin/upload` | 이미지 업로드 |

---

## 📝 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 스타일 변경
refactor: 리팩토링
chore: 기타 변경
```

---

## 🤝 기여하기

1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/Amazing`)
3. Commit Changes (`git commit -m 'feat: Add Amazing'`)
4. Push to Branch (`git push origin feature/Amazing`)
5. Open Pull Request

---

## 📄 라이선스

MIT License

---

## 👨‍💻 Team

Made with ❤️ by 로닛 팀

---

**⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!**
