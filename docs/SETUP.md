# 로닛 설정 가이드

이 문서는 로닛 프로젝트의 초기 설정 방법을 안내합니다.

## 목차

1. [MongoDB Atlas 설정](#mongodb-atlas-설정)
2. [Naver Maps API 설정](#naver-maps-api-설정)
3. [환경 변수 설정](#환경-변수-설정)
4. [관리자 계정 생성](#관리자-계정-생성)
5. [샘플 데이터 추가](#샘플-데이터-추가)

---

## MongoDB Atlas 설정

### 1. 계정 생성 및 클러스터 만들기

1. [MongoDB Atlas](https://mongodb.com/cloud/atlas) 접속
2. **무료 계정 생성** (Sign Up)
3. 새 프로젝트 생성
4. **Build a Database** 클릭
5. **M0 Free** 선택 (무료)
6. 클라우드 제공자: AWS, 리전: 가까운 지역 선택
7. 클러스터 이름 입력 (예: loneat-cluster)
8. **Create** 클릭

### 2. 데이터베이스 사용자 생성

1. 왼쪽 메뉴 > **Database Access**
2. **Add New Database User**
3. Authentication Method: Password
4. 사용자명과 비밀번호 입력 (반드시 기록!)
5. Built-in Role: **Atlas Admin** 선택
6. **Add User** 클릭

### 3. 네트워크 접근 설정

1. 왼쪽 메뉴 > **Network Access**
2. **Add IP Address**
3. **Allow Access from Anywhere** 클릭 (0.0.0.0/0)
4. 또는 특정 IP만 허용 (보안 강화)
5. **Confirm** 클릭

### 4. 연결 문자열 가져오기

1. 왼쪽 메뉴 > **Database Deployments**
2. 클러스터 옆 **Connect** 클릭
3. **Drivers** 선택
4. 연결 문자열 복사:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
5. `<username>`, `<password>` 부분을 실제 값으로 교체
6. 끝에 `/loneat` 추가 (데이터베이스 이름)

---

## Naver Maps API 설정

### 1. 네이버 클라우드 플랫폼 가입

1. [네이버 클라우드 플랫폼](https://console.ncloud.com) 접속
2. 회원가입 또는 로그인

### 2. Application 등록

1. 콘솔 > **AI·NAVER API** 메뉴
2. **Application 등록**
3. 앱 이름: loneat
4. Service 선택: **Web Dynamic Map**
5. 웹 서비스 URL: `http://localhost:3000`, `https://loneat.kr`
6. **등록** 클릭

### 3. Client ID 복사

1. 등록된 Application 클릭
2. **Client ID** 복사
3. 환경 변수에 추가

---

## 환경 변수 설정

### 1. 환경 변수 파일 생성

```bash
# 프로젝트 루트에서
cp .env.local.example .env.local
```

### 2. 값 입력

`.env.local` 파일을 열고 각 값을 입력:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/loneat?retryWrites=true&w=majority
JWT_SECRET=your_64_character_random_string
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_client_id
```

### 3. JWT Secret 생성

```bash
# Node.js 사용
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 또는 OpenSSL 사용
openssl rand -hex 64
```

---

## 관리자 계정 생성

```bash
# 환경 변수 설정 후 실행
npm run create-admin
```

기본 로그인 정보:
- 사용자명: `admin`
- 비밀번호: `admin123`

⚠️ **프로덕션에서는 반드시 비밀번호를 변경하세요!**

---

## 샘플 데이터 추가

```bash
# 개발용 샘플 데이터 추가
npm run seed
```

이 명령어는 5-10개의 샘플 맛집 데이터를 추가합니다.

---

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 문제 해결

### MongoDB 연결 오류

```
MongoServerError: bad auth
```
→ 사용자명/비밀번호 확인, 특수문자 URL 인코딩 필요

### Network Access 오류

```
MongoNetworkError: connect ETIMEDOUT
```
→ MongoDB Atlas에서 IP 화이트리스트 확인

### 빌드 오류

```bash
npm run build
```
→ TypeScript 오류 확인, 환경 변수 설정 확인
