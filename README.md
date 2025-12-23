# 로닛 (loneat.kr)

혼술/혼밥 큐레이션 플랫폼

## 프로젝트 소개

로닛은 혼자 식사하거나 술을 즐기는 사람들을 위한 맛집 큐레이션 서비스입니다.
전문 에디터 큐레이션과 사용자 투표를 통한 이중 검증 시스템으로 
신뢰할 수 있는 혼밥/혼술 스팟을 추천합니다.

## 기술 스택

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: MongoDB (Mongoose)
- **Authentication**: JWT, bcryptjs
- **Deployment**: Vercel

## 프로젝트 구조

```
/app          - Next.js App Router 페이지
/components   - 재사용 가능한 UI 컴포넌트
/lib          - 유틸리티 함수 및 설정
/models       - MongoDB 모델 스키마
/types        - TypeScript 타입 정의
/public       - 정적 파일
```

## 시작하기

```bash
# 프로젝트 클론
git clone https://github.com/hoon0510/loneatkr.git
cd loneatkr

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어 실제 값으로 수정

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 환경 변수

`.env.local.example` 파일을 참고하여 `.env.local` 파일을 생성하세요:

- `MONGODB_URI` - MongoDB 연결 문자열
- `JWT_SECRET` - JWT 인증 비밀키
- `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` - 네이버 지도 API 클라이언트 ID

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 라이선스

MIT License
