// Example Node.js/Express backend for Google Cloud API integration
// This is a reference implementation - you'll need to install:
// npm install express multer @google-cloud/speech @google-cloud/text-to-speech dotenv

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { SpeechClient } = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Google Cloud clients
// API 키는 환경 변수에서 가져옵니다 (GOOGLE_API_KEY 또는 GOOGLE_APPLICATION_CREDENTIALS)
// 환경 변수 설정 예시:
//   GOOGLE_API_KEY=AIzaSyB3Zu32iSRysm3FWBmNv-54R98mvxR176E
//   또는
//   GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
//
// 참고: 현재 API 키는 config.js에 설정되어 있습니다.
// 백엔드를 사용하는 경우 환경 변수로 설정하거나 아래 코드를 수정하세요.

// API 키는 환경 변수에서 가져옵니다
// 서비스 계정 키를 사용하는 경우 (권장)
// GOOGLE_APPLICATION_CREDENTIALS 환경 변수에 서비스 계정 JSON 파일 경로를 설정하세요
// 또는 API 키를 사용하는 경우 GOOGLE_API_KEY 환경 변수를 설정하세요

// API 키 직접 설정 (개발/테스트용)
// 프로덕션에서는 환경 변수 사용 권장
const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyB3Zu32iSRysm3FWBmNv-54R98mvxR176E';

let speechClient, ttsClient;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  // 서비스 계정 키 파일 사용 (권장)
  speechClient = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
  ttsClient = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
} else if (API_KEY) {
  // API 키를 사용하여 클라이언트 초기화
  // 참고: @google-cloud/speech와 @google-cloud/text-to-speech는 서비스 계정 키를 권장합니다
  // API 키만으로는 제한적이므로, 가능하면 서비스 계정 키를 사용하세요
  console.log('⚠️ API 키를 사용합니다. 서비스 계정 키 사용을 권장합니다.');
  speechClient = new SpeechClient({
    apiKey: API_KEY
  });
  ttsClient = new textToSpeech.TextToSpeechClient({
    apiKey: API_KEY
  });
} else {
  // 환경 변수에서 자동으로 인증 정보를 찾습니다
  speechClient = new SpeechClient();
  ttsClient = new textToSpeech.TextToSpeechClient();
}

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  next();
});

// Speech-to-Text endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioBytes = req.file.buffer.toString('base64');
    const languageCode = req.body.languageCode || 'en-US';

    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'WEBM_OPUS', // Adjust based on your audio format
        sampleRateHertz: 48000,
        languageCode: languageCode,
        alternativeLanguageCodes: ['ko-KR'],
      },
    };

    const [response] = await speechClient.recognize(request);
    const transcript = response.results
      .map(result => result.alternatives[0].transcript)
      .join(' ');

    res.json({ transcript });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

// Text-to-Speech endpoint
app.post('/api/synthesize', express.json(), async (req, res) => {
  try {
    const { text, languageCode, voiceName, ssmlGender } = req.body;

    const request = {
      input: { text },
      voice: {
        languageCode: languageCode || 'en-US',
        name: voiceName || 'en-US-Neural2-D',
        ssmlGender: ssmlGender || 'NEUTRAL',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (error) {
    console.error('Synthesis error:', error);
    res.status(500).json({ error: 'Speech synthesis failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});


