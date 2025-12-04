# Google Cloud API 통합 가이드

## 현재 상태
TravelTalk+는 Google Cloud Speech-to-Text와 Text-to-Speech API를 사용할 수 있도록 구조화되어 있습니다.

## 보안 주의사항
⚠️ **중요**: API 키를 클라이언트 사이드 코드에 직접 노출하면 안전하지 않습니다. 프로덕션 환경에서는 반드시 백엔드 프록시를 통해 API를 호출해야 합니다.

## 백엔드 프록시 구현 필요

### 1. Speech-to-Text 엔드포인트
`/api/transcribe` 엔드포인트를 생성하여:
- 클라이언트로부터 오디오 파일을 받습니다
- 서버에서 Google Cloud Speech-to-Text API를 호출합니다
- 전사된 텍스트를 반환합니다

### 2. Text-to-Speech 엔드포인트
`/api/synthesize` 엔드포인트를 생성하여:
- 클라이언트로부터 텍스트와 음성 설정을 받습니다
- 서버에서 Google Cloud Text-to-Speech API를 호출합니다
- 생성된 오디오 파일을 반환합니다

## 임시 해결책
현재는 Web Speech API (브라우저 내장)를 폴백으로 사용하고 있습니다. 이는 Google Cloud API만큼 정확하지 않지만, 백엔드 없이도 작동합니다.

## 다음 단계
1. Node.js/Express 또는 Python/Flask 백엔드 서버 구축
2. Google Cloud 서비스 계정 키 설정
3. `/api/transcribe` 및 `/api/synthesize` 엔드포인트 구현
4. `web/assets/app.js`의 주석 처리된 fetch 호출 활성화


