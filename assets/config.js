// Google Cloud API Configuration
// ⚠️ SECURITY WARNING: In production, this should be stored server-side
// and accessed via a backend proxy to prevent API key exposure.
// 
// 현재 API 키는 개발/테스트 목적으로만 사용됩니다.
// 프로덕션 환경에서는 반드시 백엔드 프록시를 통해 API를 호출해야 합니다.
const GOOGLE_API_CONFIG = {
  apiKey: 'AIzaSyB3Zu32iSRysm3FWBmNv-54R98mvxR176E',
  speechToText: {
    languageCode: 'en-US',
    alternativeLanguageCodes: ['ko-KR'], // For mixed language support
  },
  textToSpeech: {
    languageCode: 'en-US',
    voiceName: 'en-US-Neural2-D', // Natural-sounding voice
    ssmlGender: 'NEUTRAL',
  },
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GOOGLE_API_CONFIG;
}


