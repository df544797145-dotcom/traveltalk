# 보안 가이드

## API 키 관리

⚠️ **중요**: Google Cloud API 키는 클라이언트 사이드에 노출되면 안 됩니다.

### 현재 상태
- API 키가 `config.js`에 하드코딩되어 있습니다 (개발/테스트 목적)
- 프로덕션 환경에서는 반드시 백엔드 프록시를 통해 사용해야 합니다

### 보안 개선 방법

#### 1. 환경 변수 사용 (권장)
백엔드 서버에서 환경 변수로 API 키를 관리하세요:

```bash
# .env 파일 생성
GOOGLE_API_KEY=AIzaSyB3Zu32iSRysm3FWBmNv-54R98mvxR176E
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

#### 2. 서비스 계정 키 사용 (가장 안전)
Google Cloud Console에서 서비스 계정 키를 생성하고 사용하세요:

1. Google Cloud Console → IAM & Admin → Service Accounts
2. 서비스 계정 생성
3. JSON 키 다운로드
4. `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수에 경로 설정

#### 3. API 키 제한 설정
Google Cloud Console에서 API 키에 제한을 설정하세요:

- **애플리케이션 제한**: HTTP 리퍼러(웹사이트) 제한
- **API 제한**: Speech-to-Text, Text-to-Speech만 허용

### 백엔드 프록시 사용

현재 `backend_example.js`는 예제 코드입니다. 실제 사용 시:

1. 백엔드 서버 실행
2. 클라이언트는 `/api/transcribe`, `/api/synthesize` 엔드포인트 호출
3. 백엔드에서 Google Cloud API 호출
4. 결과를 클라이언트에 반환

### 체크리스트

- [ ] API 키를 환경 변수로 이동
- [ ] `.env` 파일을 `.gitignore`에 추가
- [ ] API 키에 제한 설정 (Google Cloud Console)
- [ ] 백엔드 프록시 구현 및 테스트
- [ ] 클라이언트 사이드에서 API 키 제거


