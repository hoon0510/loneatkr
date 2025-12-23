# 롤백 가이드

배포 문제 발생 시 이전 버전으로 롤백하는 방법입니다.

---

## Vercel 롤백

### 방법 1: Vercel Dashboard에서 롤백

1. Vercel Dashboard → 프로젝트 선택
2. **Deployments** 탭 클릭
3. 이전 성공한 배포 찾기
4. 해당 배포의 `...` 메뉴 클릭
5. **"Promote to Production"** 선택
6. 확인 후 롤백 완료

### 방법 2: Git 롤백

```bash
# 이전 커밋으로 되돌리기
git revert HEAD
git push origin main

# 또는 특정 커밋으로 하드 리셋 (주의!)
git reset --hard <commit-hash>
git push origin main --force
```

---

## 배포 로그 확인

### Vercel 로그
1. Vercel Dashboard → 프로젝트
2. **Deployments** → 문제 배포 선택
3. **Build Logs** 탭에서 에러 확인

### 런타임 로그
1. Vercel Dashboard → 프로젝트
2. **Logs** 탭
3. 필터: Error, Warning

---

## 일반적인 문제 및 해결

### 빌드 실패

**환경 변수 누락**
```
Error: 환경 변수 MONGODB_URI가 설정되지 않았습니다
```
→ Vercel Settings → Environment Variables 확인

**TypeScript 오류**
```
Type error: ...
```
→ 로컬에서 `npm run build` 실행하여 오류 수정

### 런타임 에러

**MongoDB 연결 실패**
```
MongoServerError: bad auth
```
→ MONGODB_URI 비밀번호 확인

**API 500 에러**
→ Vercel Logs에서 상세 에러 확인

### 도메인 문제

**SSL 인증서 오류**
→ DNS 설정 확인 후 1-2시간 대기

**404 에러**
→ 도메인 설정 및 리다이렉트 규칙 확인

---

## 긴급 연락처

- Vercel Status: https://status.vercel.com
- MongoDB Status: https://status.mongodb.com

---

## 롤백 체크리스트

- [ ] 문제 배포 식별
- [ ] 정상 작동 버전 확인
- [ ] 롤백 실행
- [ ] 사이트 정상 작동 확인
- [ ] 근본 원인 분석
- [ ] 수정 후 재배포
