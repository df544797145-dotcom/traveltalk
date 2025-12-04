const politeWeights = new Map([
  ["could you", 0.18],
  ["could i", 0.17],
  ["would you", 0.15],
  ["would it be possible", 0.2],
  ["please", 0.2],
  ["excuse me", 0.18],
  ["may i", 0.16],
  ["i'd like", 0.1],
  ["i would like", 0.12],
  ["if you don't mind", 0.18],
  ["would you mind", 0.18],
  ["thank you", 0.14],
  ["thanks", 0.08],
  ["pardon me", 0.16],
  ["could you help", 0.18],
  ["can you please", 0.16],
  ["speak more slowly", 0.12],
]);

const abruptWeights = new Map([
  ["give me", 0.25],
  ["i need", 0.18],
  ["i want", 0.15],
  ["now", 0.15],
  ["hurry", 0.2],
  ["what's taking", 0.22],
  ["why haven't", 0.18],
  ["this is ridiculous", 0.3],
  ["this is unacceptable", 0.3],
  ["listen", 0.1],
]);

const harshPattern = /(!{2,}|[A-Z]{3,})/;
const imperativeStarters = new Set(["give", "get", "bring", "find", "tell"]);

const sceneLibrary = [
  // 호텔 시나리오
  {
    type: "hotel_check_in",
    category: "hotel",
    title: "Late Night Check-in",
    complication: "The system temporarily lost your reservation number.",
    objectives: [
      "Clarify the spelling of your reservation politely.",
      "Ask for a temporary room while the records are located.",
    ],
    npc: {
      name: "Sienna, Front Desk Specialist",
      temperament: "Exhausted yet empathetic. Responds well to calm guests.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20female%20hotel%20receptionist%20smiling%20warmly%20wearing%20navy%20uniform%20high%20quality%20photorealistic%20portrait%20soft%20lighting",
      portrait:
        "https://image.pollinations.ai/prompt=full%20body%20professional%20hotel%20staff%20woman%20standing%20behind%20luxury%20marble%20front%20desk%20elegant%20posture%20cinematic%20lighting%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=luxury%20hotel%20lobby%20interior%20night%20time%20ambient%20warm%20lighting%20elegant%20furniture%20marble%20floors%20cinematic%20atmosphere%20photorealistic%20detailed",
    },
  },
  {
    type: "hotel_check_in",
    category: "hotel",
    title: "Unexpected Resort Fee",
    complication: "A resort fee was added without prior notice.",
    objectives: [
      "Ask for an explanation about the fee respectfully.",
      "Negotiate a waiver or discount without sounding demanding.",
    ],
    npc: {
      name: "Noah, Junior Desk Agent",
      temperament: "Rule-abiding but flexible for courteous guests.",
      avatar:
        "https://image.pollinations.ai/prompt=young%20professional%20male%20hotel%20receptionist%20friendly%20smile%20short%20neat%20hair%20business%20attire%20photorealistic%20portrait%20natural%20lighting",
      portrait:
        "https://image.pollinations.ai/prompt=professional%20male%20hotel%20associate%20standing%20confidently%20holding%20tablet%20business%20casual%20attire%20modern%20hotel%20setting%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=bright%20modern%20luxury%20hotel%20reception%20desk%20contemporary%20design%20natural%20daylight%20elegant%20interior%20photorealistic%20detailed",
    },
  },
  {
    type: "hotel_check_in",
    category: "hotel",
    title: "Room Preference Miscommunication",
    complication: "Your preferred room type is unavailable due to maintenance.",
    objectives: [
      "Request an upgrade politely while showing flexibility.",
      "Ensure the room meets your quiet and accessibility needs.",
    ],
    npc: {
      name: "Maya, Guest Relations Lead",
      temperament: "Empathetic and attentive to respectful travelers.",
      avatar:
        "https://image.pollinations.ai/prompt=confident%20professional%20female%20guest%20relations%20manager%20warm%20smile%20elegant%20appearance%20photorealistic%20portrait%20professional%20lighting",
      portrait:
        "https://image.pollinations.ai/prompt=professional%20female%20guest%20relations%20manager%20standing%20elegantly%20holding%20clipboard%20business%20attire%20confident%20posture%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=quiet%20luxury%20hotel%20corridor%20suite%20entrance%20soft%20ambient%20lighting%20elegant%20carpet%20wood%20paneling%20cinematic%20atmosphere%20photorealistic",
    },
  },
  {
    type: "hotel_service",
    category: "hotel",
    title: "Room Service Request",
    complication: "Your room service order arrived with the wrong items.",
    objectives: [
      "Politely explain the mistake without sounding frustrated.",
      "Request the correct items to be delivered promptly.",
    ],
    npc: {
      name: "James, Room Service Attendant",
      temperament: "Apologetic and eager to fix mistakes for polite guests.",
      avatar:
        "https://image.pollinations.ai/prompt=friendly%20male%20hotel%20room%20service%20attendant%20apologetic%20expression%20uniform%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=hotel%20room%20service%20attendant%20standing%20with%20service%20cart%20in%20hotel%20corridor%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=luxury%20hotel%20room%20interior%20elegant%20furniture%20warm%20lighting%20photorealistic%20detailed",
    },
  },
  // 공항 시나리오
  {
    type: "airport_security",
    category: "airport",
    title: "Security Line Delay",
    complication: "An item in your bag triggers a secondary inspection.",
    objectives: [
      "Ask what caused the alert without sounding accusatory.",
      "Request a faster resolution if you are late for boarding.",
    ],
    npc: {
      name: "Officer Carter",
      temperament: "Firm but responsive to respectful tones.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20tsa%20security%20officer%20portrait%20friendly%20yet%20authoritative%20uniform%20photorealistic%20natural%20expression",
      portrait:
        "https://image.pollinations.ai/prompt=airport%20security%20officer%20standing%20at%20checkpoint%20professional%20posture%20uniform%20airport%20background%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=busy%20airport%20security%20checkpoint%20lane%20modern%20airport%20interior%20bright%20lighting%20travelers%20in%20background%20cinematic%20photorealistic",
    },
  },
  {
    type: "airport_checkin",
    category: "airport",
    title: "Overweight Luggage",
    complication: "Your checked bag exceeds the weight limit by 3kg.",
    objectives: [
      "Ask about options to resolve the weight issue politely.",
      "Request information about fees or repacking options.",
    ],
    npc: {
      name: "Sarah, Check-in Agent",
      temperament: "Helpful and understanding, appreciates patient travelers.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20female%20airline%20check-in%20agent%20friendly%20smile%20uniform%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=airline%20check-in%20counter%20agent%20standing%20behind%20desk%20airport%20terminal%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=modern%20airport%20check-in%20area%20busy%20terminal%20bright%20lighting%20travelers%20photorealistic",
    },
  },
  {
    type: "airport_gate",
    category: "airport",
    title: "Gate Change Notification",
    complication: "Your flight gate changed and you're not sure where the new gate is.",
    objectives: [
      "Ask for directions to the new gate clearly and politely.",
      "Confirm the boarding time hasn't changed.",
    ],
    npc: {
      name: "Michael, Gate Agent",
      temperament: "Busy but helpful to travelers who ask nicely.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20male%20airport%20gate%20agent%20helpful%20expression%20uniform%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=airport%20gate%20agent%20standing%20at%20boarding%20gate%20airport%20terminal%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=airport%20gate%20area%20boarding%20area%20aircraft%20visible%20through%20windows%20photorealistic",
    },
  },
  // 식당 시나리오
  {
    type: "restaurant_reservation",
    category: "restaurant",
    title: "Reservation Confusion",
    complication: "The restaurant doesn't have your reservation in their system.",
    objectives: [
      "Politely explain when you made the reservation.",
      "Ask if there's availability or if you can wait for a table.",
    ],
    npc: {
      name: "Emma, Hostess",
      temperament: "Friendly and accommodating to polite guests.",
      avatar:
        "https://image.pollinations.ai/prompt=friendly%20female%20restaurant%20hostess%20warm%20smile%20elegant%20attire%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=restaurant%20hostess%20standing%20at%20reception%20desk%20elegant%20restaurant%20interior%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=elegant%20restaurant%20interior%20ambient%20lighting%20tables%20dining%20atmosphere%20photorealistic%20detailed",
    },
  },
  {
    type: "restaurant_order",
    category: "restaurant",
    title: "Special Dietary Request",
    complication: "You have food allergies and need to modify the menu items.",
    objectives: [
      "Explain your dietary restrictions clearly and politely.",
      "Ask about ingredient substitutions or alternatives.",
    ],
    npc: {
      name: "Chef Marco",
      temperament: "Knowledgeable and willing to accommodate respectful requests.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20chef%20portrait%20friendly%20expression%20chef%20hat%20photorealistic",
      portrait:
        "https://image.pollinations.ai/prompt=chef%20standing%20in%20restaurant%20kitchen%20professional%20attire%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=upscale%20restaurant%20dining%20room%20elegant%20atmosphere%20warm%20lighting%20photorealistic",
    },
  },
  {
    type: "restaurant_complaint",
    category: "restaurant",
    title: "Wrong Order Delivered",
    complication: "The waiter brought you a different dish than what you ordered.",
    objectives: [
      "Politely point out the mistake without sounding angry.",
      "Request the correct dish while being understanding.",
    ],
    npc: {
      name: "Lucas, Waiter",
      temperament: "Apologetic and quick to fix mistakes for understanding customers.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20waiter%20apologetic%20expression%20restaurant%20uniform%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=waiter%20standing%20at%20restaurant%20table%20professional%20service%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=fine%20dining%20restaurant%20interior%20elegant%20tables%20ambient%20lighting%20photorealistic",
    },
  },
  // 쇼핑 시나리오
  {
    type: "shopping_return",
    category: "shopping",
    title: "Return Without Receipt",
    complication: "You want to return an item but lost the receipt.",
    objectives: [
      "Politely explain your situation and ask about return options.",
      "Request alternative solutions like store credit or exchange.",
    ],
    npc: {
      name: "Olivia, Store Manager",
      temperament: "Reasonable and helpful to customers who ask nicely.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20female%20store%20manager%20friendly%20smile%20business%20attire%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=store%20manager%20standing%20at%20customer%20service%20counter%20retail%20store%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=modern%20retail%20store%20interior%20bright%20lighting%20shopping%20atmosphere%20photorealistic",
    },
  },
  {
    type: "shopping_size",
    category: "shopping",
    title: "Size Exchange Request",
    complication: "The item you bought doesn't fit and you need a different size.",
    objectives: [
      "Politely request an exchange for a different size.",
      "Ask about availability and return policy.",
    ],
    npc: {
      name: "David, Sales Associate",
      temperament: "Helpful and patient with polite customers.",
      avatar:
        "https://image.pollinations.ai/prompt=friendly%20male%20retail%20sales%20associate%20helpful%20expression%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=sales%20associate%20standing%20in%20clothing%20store%20helping%20customer%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=fashion%20retail%20store%20interior%20clothing%20racks%20bright%20lighting%20photorealistic",
    },
  },
  // 택시/교통 시나리오
  {
    type: "taxi_ride",
    category: "transportation",
    title: "Taxi Route Disagreement",
    complication: "The taxi driver is taking a longer route than necessary.",
    objectives: [
      "Politely ask about the route without sounding accusatory.",
      "Request to take a more direct path if possible.",
    ],
    npc: {
      name: "Ahmed, Taxi Driver",
      temperament: "Friendly but may be defensive, responds well to respectful communication.",
      avatar:
        "https://image.pollinations.ai/prompt=friendly%20taxi%20driver%20portrait%20smiling%20photorealistic",
      portrait:
        "https://image.pollinations.ai/prompt=taxi%20driver%20sitting%20in%20taxi%20vehicle%20interior%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=city%20street%20view%20from%20taxi%20window%20urban%20traffic%20photorealistic",
    },
  },
  {
    type: "public_transit",
    category: "transportation",
    title: "Lost on Public Transit",
    complication: "You're not sure which stop to get off at for your destination.",
    objectives: [
      "Politely ask for directions to your destination.",
      "Request help understanding the transit map or schedule.",
    ],
    npc: {
      name: "Sophia, Transit Staff",
      temperament: "Helpful and knowledgeable about the transit system.",
      avatar:
        "https://image.pollinations.ai/prompt=friendly%20female%20transit%20staff%20helpful%20expression%20uniform%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=transit%20station%20staff%20standing%20at%20information%20booth%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=modern%20subway%20station%20interior%20bright%20lighting%20platform%20photorealistic",
    },
  },
  // 관광/정보 시나리오
  {
    type: "tourist_info",
    category: "tourism",
    title: "Tourist Information Center",
    complication: "You need recommendations for local attractions but don't know where to start.",
    objectives: [
      "Politely ask for recommendations based on your interests.",
      "Request a map or directions to suggested places.",
    ],
    npc: {
      name: "Elena, City Guide",
      temperament: "Helpful but juggling several travelers at once.",
      avatar:
        "https://image.pollinations.ai/prompt=knowledgeable%20friendly%20city%20guide%20woman%20smiling%20helpful%20expression%20photorealistic%20portrait%20warm%20lighting",
      portrait:
        "https://image.pollinations.ai/prompt=information%20desk%20attendant%20standing%20helpfully%20holding%20map%20pointing%20friendly%20gesture%20train%20station%20background%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=crowded%20modern%20train%20station%20information%20desk%20area%20travelers%20in%20motion%20bright%20interior%20lighting%20cinematic%20photorealistic",
    },
  },
  {
    type: "museum_tour",
    category: "tourism",
    title: "Museum Ticket Inquiry",
    complication: "You're not sure which ticket package to purchase for the museum.",
    objectives: [
      "Politely ask about different ticket options and their benefits.",
      "Request recommendations based on your available time.",
    ],
    npc: {
      name: "Isabella, Museum Staff",
      temperament: "Knowledgeable and eager to help visitors have a good experience.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20museum%20staff%20woman%20friendly%20smile%20photorealistic%20portrait",
      portrait:
        "https://image.pollinations.ai/prompt=museum%20ticket%20counter%20staff%20standing%20behind%20desk%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=museum%20lobby%20interior%20elegant%20architecture%20art%20exhibits%20visible%20photorealistic",
    },
  },
  // 비즈니스 시나리오
  {
    type: "business_meeting",
    category: "business",
    title: "Overseas Vendor Negotiation",
    complication: "A late shipment risks your retail launch date and you must renegotiate terms.",
    objectives: [
      "Open the meeting with courteous small talk before raising the issue.",
      "Request expedited shipping or partial compensation without sounding accusatory.",
      "Confirm next steps and express appreciation to maintain the relationship.",
    ],
    npc: {
      name: "Director Han, Logistics Lead",
      temperament: "Professional, focused on mutual respect and clear proposals.",
      avatar:
        "https://image.pollinations.ai/prompt=professional%20asian%20businesswoman%20executive%20portrait%20elegant%20suit%20confident%20expression%20photorealistic%20professional%20lighting",
      portrait:
        "https://image.pollinations.ai/prompt=business%20meeting%20executive%20woman%20standing%20confidently%20in%20modern%20boardroom%20professional%20attire%20photorealistic%20detailed",
      background:
        "https://image.pollinations.ai/prompt=high-rise%20boardroom%20night%20view%20global%20city%20skyline%20elegant%20modern%20interior%20professional%20lighting%20cinematic%20photorealistic",
    },
  },
];

const state = {
  scenario: null,
  pcsmHistory: [],
  negativeMoments: [],
  recognition: null,
  recording: {
    active: false,
    mediaRecorder: null,
    chunks: [],
    transcript: "",
  },
};

// Utilities
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function calculatePCSM(text) {
  if (!text || !text.trim()) {
    return 0;
  }
  const base = 0.5;
  let score = base;
  const lowered = text.toLowerCase();

  politeWeights.forEach((weight, phrase) => {
    if (lowered.includes(phrase)) {
      score += weight;
    }
  });

  abruptWeights.forEach((weight, phrase) => {
    if (lowered.includes(phrase)) {
      score -= weight;
    }
  });

  const tokens = lowered.split(/\b/).map((token) => token.trim()).filter(Boolean);
  if (tokens.length > 0 && imperativeStarters.has(tokens[0])) {
    score -= 0.18;
  }

  if (lowered.endsWith("please")) {
    score += 0.08;
  }

  if (lowered.startsWith("please") || lowered.startsWith("excuse me") || lowered.startsWith("pardon me")) {
    score += 0.12;
  }

  if (text.includes("?") && !lowered.startsWith("why") && !lowered.startsWith("how come")) {
    score += 0.05;
  }

  if (harshPattern.test(text)) {
    score -= 0.12;
  }

  const normalized = clamp(score, 0, 1);
  return parseFloat(normalized.toFixed(3));
}

function determineEmotion(pcsm) {
  if (pcsm > 0.7) return "Friendly";
  if (pcsm < 0.3) return "Annoyed";
  return "Neutral";
}

function generateNpcResponse(emotion, scenario) {
  const { complication, npc } = scenario;
  let responseText;
  switch (emotion) {
    case "Friendly":
      responseText = `${npc.name}이(가) 따뜻하게 미소를 지으며 말합니다. "I'd be glad to help you! ${complication} Let's work through this together. How can I assist you?"`;
      break;
    case "Annoyed":
      responseText = `${npc.name}이(가) 한숨을 쉬며 말합니다. "I need you to speak more respectfully, please. ${complication} This is already challenging, so let's take it step by step."`;
      break;
    default:
      responseText = `${npc.name}이(가) 중립적인 태도로 말합니다. "I can help you with ${complication}. Please tell me specifically what you need."`;
  }
  
  // Generate speech audio using Google Cloud Text-to-Speech (requires backend)
  speakNpcResponse(responseText, emotion);
  
  return responseText;
}

async function speakNpcResponse(text, emotion) {
  // Extract the spoken dialogue (text within quotes)
  const match = text.match(/"([^"]+)"/);
  if (!match) return;
  
  const dialogue = match[1];
  
  try {
    // Google Cloud Text-to-Speech를 백엔드 프록시를 통해 호출 시도
    try {
      const response = await fetch('http://localhost:3000/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: dialogue,
          languageCode: GOOGLE_API_CONFIG.textToSpeech.languageCode,
          voiceName: GOOGLE_API_CONFIG.textToSpeech.voiceName,
          ssmlGender: GOOGLE_API_CONFIG.textToSpeech.ssmlGender
        })
      });
      
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log('✅ Google Cloud Text-to-Speech 사용');
        return;
      }
    } catch (backendError) {
      console.warn('⚠️ 백엔드 서버가 실행되지 않았습니다. Web Speech API를 사용합니다.');
    }
    
    // Fallback to Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(dialogue);
      utterance.lang = 'en-US';
      utterance.rate = emotion === 'Annoyed' ? 0.9 : emotion === 'Friendly' ? 1.1 : 1.0;
      utterance.pitch = emotion === 'Friendly' ? 1.1 : emotion === 'Annoyed' ? 0.9 : 1.0;
      window.speechSynthesis.speak(utterance);
      console.log('✅ Web Speech API 사용');
    }
  } catch (error) {
    console.error('Text-to-Speech error:', error);
  }
}

function generateFeedback(text, pcsm, emotion) {
  const trimmed = text.trim();
  const suggestions = [];
  if (!trimmed) {
    suggestions.push("Try sharing a complete sentence so I can understand your request.");
  }
  if (trimmed && !/[.!?]$/.test(trimmed)) {
    suggestions.push("Add punctuation at the end to signal whether you're asking or stating.");
  }
  if (!/please/i.test(trimmed)) {
    suggestions.push("Consider appending 'please' to soften the request.");
  }
  if (!/\b(could|would|may)\b/i.test(trimmed)) {
    suggestions.push("Try starting with 'Could you...' or 'Would you...' for a polite tone.");
  }
  if (trimmed.split(/\s+/).length <= 3) {
    suggestions.push("Expand the sentence with a bit more context to avoid sounding abrupt.");
  }

  const linguistic = suggestions.length
    ? suggestions.join(" ")
    : "Great phrasing—clear, polite, and easy to respond to.";

  let attitudinal;
  if (emotion === "Friendly") {
    attitudinal =
      "The clerk felt respected and responded enthusiastically. Keeping gentle openers and 'please' will continue to earn goodwill.";
  } else if (emotion === "Annoyed") {
    attitudinal =
      "The clerk perceived your tone as demanding. Try 'Excuse me, could you...' and add 'please' to show consideration.";
  } else {
    attitudinal =
      "Your tone came across as neutral. A small courtesy phrase like 'pardon me' or 'would you mind' could bring a warmer response.";
  }

  return { linguistic, attitudinal };
}

function logInteraction({ text, pcsm, emotion, feedback, response }) {
  state.pcsmHistory.push(pcsm);
  if (emotion === "Annoyed") {
    state.negativeMoments.push(text);
  }
  const chatLog = document.querySelector(".chat-log");
  const userBubble = document.createElement("div");
  userBubble.className = "message user";
  userBubble.textContent = text;
  const aiBubble = document.createElement("div");
  aiBubble.className = "message ai";
  aiBubble.textContent = response;

  chatLog.appendChild(userBubble);
  chatLog.appendChild(aiBubble);
  chatLog.scrollTop = chatLog.scrollHeight;

  // 평가 결과 표시 강화
  const pcsmValue = document.querySelector(".pcsm-value");
  const pcsmProgress = document.querySelector(".pcsm-progress");
  pcsmValue.textContent = pcsm.toFixed(2);
  pcsmProgress.style.transform = `scaleX(${pcsm})`;
  
  // PCSM 값에 따른 색상 변경
  pcsmValue.className = "pcsm-value";
  if (pcsm >= 0.7) {
    pcsmValue.classList.add("pcsm-high");
  } else if (pcsm < 0.3) {
    pcsmValue.classList.add("pcsm-low");
  } else {
    pcsmValue.classList.add("pcsm-medium");
  }

  const emotionBadge = document.querySelector(".npc-emotion");
  emotionBadge.dataset.emotion = emotion;
  emotionBadge.textContent = `AI Emotion • ${emotion}`;
  
  // 감정에 따른 캐릭터 애니메이션
  const characterFigure = document.querySelector(".character-figure");
  characterFigure.classList.remove("emotion-friendly", "emotion-annoyed", "emotion-neutral");
  characterFigure.classList.add(`emotion-${emotion.toLowerCase()}`);

  // 피드백 표시 (애니메이션 추가)
  const linguisticFeedback = document.querySelector(".feedback-linguistic");
  const attitudinalFeedback = document.querySelector(".feedback-attitudinal");
  
  linguisticFeedback.textContent = feedback.linguistic;
  attitudinalFeedback.textContent = feedback.attitudinal;
  
  // 피드백 카드에 애니메이션 효과
  const feedbackCards = document.querySelectorAll(".feedback-card");
  feedbackCards.forEach(card => {
    card.classList.remove("feedback-pulse");
    setTimeout(() => {
      card.classList.add("feedback-pulse");
    }, 10);
  });

  // 평가 결과 요약 표시
  showEvaluationSummary({ pcsm, emotion, feedback });

  const logList = document.querySelector(".negative-log");
  logList.innerHTML = "";
  state.negativeMoments.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    logList.appendChild(li);
  });
}

function showEvaluationSummary({ pcsm, emotion, feedback }) {
  // 평가 요약을 표시할 요소가 없으면 생성
  let summaryElement = document.querySelector(".evaluation-summary");
  if (!summaryElement) {
    summaryElement = document.createElement("div");
    summaryElement.className = "evaluation-summary";
    const feedbackSection = document.querySelector(".feedback");
    feedbackSection.insertBefore(summaryElement, feedbackSection.firstChild);
  }
  
  const grade = pcsm >= 0.7 ? "Excellent" : pcsm >= 0.5 ? "Good" : pcsm >= 0.3 ? "Fair" : "Needs Improvement";
  const gradeEmoji = pcsm >= 0.7 ? "⭐" : pcsm >= 0.5 ? "✓" : pcsm >= 0.3 ? "⚠" : "✗";
  
  summaryElement.innerHTML = `
    <div class="evaluation-header">
      <h3>📊 평가 결과</h3>
      <div class="evaluation-grade grade-${grade.toLowerCase().replace(' ', '-')}">
        ${gradeEmoji} ${grade}
      </div>
    </div>
    <div class="evaluation-details">
      <div class="evaluation-score">
        <span>공손함 점수 (PCSM):</span>
        <strong class="score-${pcsm >= 0.7 ? 'high' : pcsm < 0.3 ? 'low' : 'medium'}">${pcsm.toFixed(2)}</strong>
      </div>
      <div class="evaluation-emotion">
        <span>AI 반응:</span>
        <strong class="emotion-${emotion.toLowerCase()}">${emotion}</strong>
      </div>
    </div>
  `;
  
  summaryElement.classList.remove("summary-fade-in");
  setTimeout(() => {
    summaryElement.classList.add("summary-fade-in");
  }, 10);
}

// 이미지 로드 헬퍼 함수 (개선된 버전)
function loadImageWithFallback(imgElement, imageUrl, fallbackUrl, onSuccess, onError) {
  if (!imgElement) {
    console.error("이미지 요소가 없습니다.");
    return;
  }
  
  let loaded = false;
  const timeout = setTimeout(() => {
    if (!loaded) {
      console.warn(`⏱️ 이미지 로드 타임아웃 (5초): ${imageUrl}`);
      loaded = true;
      if (onError) onError();
      if (fallbackUrl) {
        if (imgElement.tagName === "IMG") {
          imgElement.src = fallbackUrl;
        } else if (imgElement.style) {
          imgElement.style.backgroundImage = `url(${fallbackUrl})`;
        }
      }
    }
  }, 5000); // 5초 타임아웃

  const tempImg = new Image();
  tempImg.crossOrigin = "anonymous";
  
  tempImg.onload = () => {
    if (loaded) return; // 이미 타임아웃이나 에러 처리됨
    loaded = true;
    clearTimeout(timeout);
    console.log(`✅ 이미지 로드 성공: ${imageUrl}`);
    if (onSuccess) onSuccess();
    if (imgElement) {
      if (imgElement.tagName === "IMG") {
        imgElement.src = imageUrl;
        // 이미지가 확실히 표시되도록
        imgElement.style.display = "block";
        imgElement.style.opacity = "1";
      } else if (imgElement.style) {
        imgElement.style.backgroundImage = `url(${imageUrl})`;
      }
    }
  };
  
  tempImg.onerror = () => {
    if (loaded) return; // 이미 타임아웃 처리됨
    loaded = true;
    clearTimeout(timeout);
    console.warn(`❌ 이미지 로드 실패: ${imageUrl}, 대체 이미지 사용`);
    if (onError) onError();
    if (fallbackUrl) {
      if (imgElement.tagName === "IMG") {
        imgElement.src = fallbackUrl;
        imgElement.style.display = "block";
      } else if (imgElement.style) {
        imgElement.style.backgroundImage = `url(${fallbackUrl})`;
      }
    }
  };
  
  // 이미지 로드 시작
  try {
    console.log(`🔄 이미지 로드 시도: ${imageUrl}`);
    tempImg.src = imageUrl;
  } catch (error) {
    console.error("이미지 소스 설정 오류:", error);
    loaded = true;
    clearTimeout(timeout);
    if (onError) onError();
    if (fallbackUrl) {
      if (imgElement.tagName === "IMG") {
        imgElement.src = fallbackUrl;
        imgElement.style.display = "block";
      } else if (imgElement.style) {
        imgElement.style.backgroundImage = `url(${fallbackUrl})`;
      }
    }
  }
}

function updateScenarioView() {
  const scenario = state.scenario;
  if (!scenario) {
    console.error("시나리오가 없습니다.");
    return;
  }
  
  console.log("시나리오 뷰 업데이트 시작:", scenario.title);
  console.log("시나리오 카테고리:", scenario.category);
  console.log("NPC 정보:", scenario.npc);
  
  // 텍스트 정보 업데이트
  const titleEl = document.querySelector(".scenario-title");
  const complicationEl = document.querySelector(".scenario-complication");
  const npcNameEl = document.querySelector(".npc-name");
  const npcTemperamentEl = document.querySelector(".npc-temperament");
  
  if (titleEl) titleEl.textContent = scenario.title;
  if (complicationEl) complicationEl.textContent = scenario.complication;
  if (npcNameEl) npcNameEl.textContent = scenario.npc.name;
  if (npcTemperamentEl) npcTemperamentEl.textContent = scenario.npc.temperament;
  
  // 아바타 이미지 로드 (에러 처리 및 타임아웃 포함)
  const avatarElement = document.querySelector(".npc-avatar");
  if (avatarElement) {
    const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(scenario.npc.name.split(',')[0])}&background=3557b3&color=fff&size=128`;
    
    // 먼저 대체 이미지로 표시
    avatarElement.style.backgroundImage = `url(${avatarFallback})`;
    
    if (scenario.npc.avatar) {
      loadImageWithFallback(
        avatarElement,
        scenario.npc.avatar,
        avatarFallback,
        () => console.log("✅ 아바타 이미지 로드 성공"),
        () => console.log("⚠️ 아바타 이미지 로드 실패, 대체 이미지 사용")
      );
    }
  }
  
  // 캐릭터 이미지 로드 (에러 처리 및 타임아웃 포함)
  const characterImage = document.querySelector(".character-figure img");
  if (characterImage) {
    const portraitUrl = scenario.npc.portrait || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop";
    
    // 카테고리별 캐릭터 대체 이미지 (더 큰 크기)
    let characterFallback = "";
    if (scenario.category === "airport") {
      characterFallback = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop&q=80";
    } else if (scenario.category === "restaurant") {
      characterFallback = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop&q=80";
    } else if (scenario.category === "transportation") {
      characterFallback = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop&q=80";
    } else {
      characterFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(scenario.npc.name.split(',')[0])}&background=3557b3&color=fff&size=800&bold=true`;
    }
    
    // 즉시 대체 이미지로 표시 (빈 화면 방지)
    characterImage.src = characterFallback;
    characterImage.alt = `${scenario.npc.name} portrait`;
    characterImage.style.display = "block";
    characterImage.style.visibility = "visible";
    characterImage.style.opacity = "1";
    characterImage.style.width = "100%";
    characterImage.style.height = "100%";
    characterImage.style.objectFit = "cover";
    characterImage.style.objectPosition = "center bottom";
    characterImage.style.transition = "opacity 0.3s ease";
    
    console.log("👤 캐릭터 이미지 로드 시작:", portraitUrl);
    console.log("📋 카테고리:", scenario.category);
    console.log("🔄 대체 이미지 즉시 표시:", characterFallback);
    
    // 원본 이미지 로드 시도
    loadImageWithFallback(
      characterImage,
      portraitUrl,
      characterFallback,
      () => {
        characterImage.alt = `${scenario.npc.name} portrait`;
        characterImage.style.opacity = "1";
        characterImage.style.display = "block";
        characterImage.style.visibility = "visible";
        console.log("✅ 캐릭터 이미지 로드 성공 - 공항 직원 표시됨");
      },
      () => {
        characterImage.alt = "Character portrait (placeholder)";
        // 대체 이미지는 이미 표시되어 있음
        characterImage.style.opacity = "1";
        characterImage.style.display = "block";
        characterImage.style.visibility = "visible";
        console.log("✅ 대체 캐릭터 이미지 사용 중");
      }
    );
  } else {
    console.error("캐릭터 이미지 요소를 찾을 수 없습니다.");
  }
  
  // 배경 이미지 로드 (에러 처리 및 타임아웃 포함)
  const backgroundImage = document.querySelector(".scene-viewport img");
  if (backgroundImage) {
    const viewport = backgroundImage.closest(".scene-viewport");
    
    // 카테고리별 대체 배경 이미지 (Unsplash 사용)
    let categoryFallback = "";
    if (scenario.category === "airport") {
      categoryFallback = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop&q=80";
    } else if (scenario.category === "restaurant") {
      categoryFallback = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&q=80";
    } else if (scenario.category === "transportation") {
      categoryFallback = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop&q=80";
    } else {
      categoryFallback = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80";
    }
    
    const backgroundFallback = categoryFallback;
    
    // 즉시 대체 이미지로 표시 (빈 화면 방지)
    backgroundImage.src = backgroundFallback;
    backgroundImage.style.display = "block";
    backgroundImage.style.opacity = "1";
    backgroundImage.style.visibility = "visible";
    backgroundImage.style.width = "100%";
    backgroundImage.style.height = "100%";
    backgroundImage.style.objectFit = "cover";
    backgroundImage.style.objectPosition = "center center";
    backgroundImage.style.transition = "opacity 0.3s ease";
    
    // 그라데이션 배경은 이미지 뒤에만
    if (viewport) {
      viewport.style.background = `linear-gradient(135deg, rgba(26, 43, 77, 0.2) 0%, rgba(45, 74, 122, 0.1) 50%, rgba(26, 43, 77, 0.2) 100%)`;
    }
    
    console.log("🖼️ 배경 이미지 로드 시작:", scenario.npc.background);
    console.log("📋 카테고리:", scenario.category);
    console.log("🔄 대체 배경 이미지 즉시 표시:", backgroundFallback);
    
    // 배경 이미지 강제 로드
    loadImageWithFallback(
      backgroundImage,
      scenario.npc.background,
      backgroundFallback,
      () => {
        backgroundImage.style.display = "block";
        backgroundImage.style.opacity = "1";
        backgroundImage.style.visibility = "visible";
        if (viewport) {
          viewport.style.background = "";
          viewport.classList.add("has-background");
        }
        console.log("✅ 배경 이미지 로드 성공 - 공항 배경 표시됨");
      },
      () => {
        // 대체 이미지는 이미 표시되어 있음
        backgroundImage.style.display = "block";
        backgroundImage.style.opacity = "1";
        backgroundImage.style.visibility = "visible";
        if (viewport) {
          viewport.style.background = "";
          viewport.classList.add("has-background");
        }
        console.log("✅ 대체 배경 이미지 사용 중");
      }
    );
  } else {
    console.error("배경 이미지 요소를 찾을 수 없습니다.");
  }
  
  console.log("시나리오 뷰 업데이트 완료");

  const objectivesWrap = document.querySelector(".objectives");
  objectivesWrap.innerHTML = "";
  scenario.objectives.forEach((objective) => {
    const item = document.createElement("div");
    item.className = "objective";
    item.textContent = objective;
    objectivesWrap.appendChild(item);
  });
}

function chooseScenario(scenarioIndex = null) {
  if (scenarioIndex !== null && scenarioIndex >= 0 && scenarioIndex < sceneLibrary.length) {
    state.scenario = sceneLibrary[scenarioIndex];
    console.log("✅ 시나리오 선택됨:", state.scenario.title);
  } else {
    state.scenario = sceneLibrary[Math.floor(Math.random() * sceneLibrary.length)];
    console.log("✅ 랜덤 시나리오 선택됨:", state.scenario.title);
  }
  
  // 시나리오 뷰 업데이트 (이미지 포함) - 한 번만 호출
  updateScenarioView();
  
  // 이미지가 제대로 로드되었는지 확인 (이미지가 사라지지 않도록)
  setTimeout(() => {
    const characterImg = document.querySelector(".character-figure img");
    const backgroundImg = document.querySelector(".scene-viewport img");
    
    if (characterImg) {
      console.log("📸 캐릭터 이미지 상태 확인:");
      console.log("  - src:", characterImg.src);
      console.log("  - 완료:", characterImg.complete);
      console.log("  - display:", window.getComputedStyle(characterImg).display);
      console.log("  - opacity:", window.getComputedStyle(characterImg).opacity);
      
      // 이미지가 보이도록 강제 설정
      if (characterImg.complete && characterImg.src) {
        characterImg.style.display = "block";
        characterImg.style.opacity = "1";
        characterImg.style.visibility = "visible";
      }
    }
    
    if (backgroundImg) {
      console.log("🖼️ 배경 이미지 상태 확인:");
      console.log("  - src:", backgroundImg.src);
      console.log("  - 완료:", backgroundImg.complete);
      console.log("  - display:", window.getComputedStyle(backgroundImg).display);
      console.log("  - opacity:", window.getComputedStyle(backgroundImg).opacity);
      
      // 이미지가 보이도록 강제 설정
      if (backgroundImg.complete && backgroundImg.src) {
        backgroundImg.style.display = "block";
        backgroundImg.style.opacity = "1";
        backgroundImg.style.visibility = "visible";
      }
    }
  }, 1000);
  const chatLog = document.querySelector(".chat-log");
  if (chatLog) {
    chatLog.innerHTML = "";
    const intro = document.createElement("div");
    intro.className = "message ai";
    intro.innerHTML = `
      <div style="margin-bottom: 8px;"><strong>${state.scenario.npc.name}</strong>이(가) 말합니다:</div>
      <div>"${state.scenario.complication}"</div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.9em; color: var(--muted);">
        💡 <strong>학습 목표:</strong> 공손한 표현을 사용하여 목표를 달성하세요.
      </div>
    `;
    chatLog.appendChild(intro);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  document.querySelector(".negative-log").innerHTML = "";
  state.pcsmHistory = [];
  state.negativeMoments = [];
  document.querySelector(".pcsm-value").textContent = "0.00";
  document.querySelector(".pcsm-value").className = "pcsm-value";
  document.querySelector(".pcsm-progress").style.transform = "scaleX(0.2)";
  const emotionBadge = document.querySelector(".npc-emotion");
  emotionBadge.dataset.emotion = "Neutral";
  emotionBadge.textContent = "AI Emotion • Neutral";
  
  // 평가 요약 제거
  const summaryElement = document.querySelector(".evaluation-summary");
  if (summaryElement) {
    summaryElement.remove();
  }
  
  // 캐릭터 애니메이션 초기화
  const characterFigure = document.querySelector(".character-figure");
  characterFigure.classList.remove("emotion-friendly", "emotion-annoyed", "emotion-neutral");
  characterFigure.classList.add("emotion-neutral");
}


// Audio Recording + Speech Recognition
async function toggleRecording() {
  if (state.recording.active) {
    stopRecording();
    return;
  }
  const recordButton = document.querySelector(".btn-record");
  const transcriptElement = document.querySelector(".recording-transcript");
  const feedbackElement = document.querySelector(".recording-feedback");
  
  try {
    // 마이크 권한 요청
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    state.recording.mediaRecorder = mediaRecorder;
    state.recording.chunks = [];
    state.recording.transcript = "";

    // 초기화
    if (transcriptElement) {
      transcriptElement.textContent = "녹음 중... 말씀해주세요.";
      transcriptElement.style.color = "var(--muted)";
    }
    if (feedbackElement) {
      feedbackElement.innerHTML = "";
      feedbackElement.style.display = "none";
    }

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        state.recording.chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(state.recording.chunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      const player = document.querySelector(".recording-playback");
      if (player) {
        player.src = audioUrl;
        player.classList.remove("hidden");
      }

      // Try Google Cloud transcription if Web Speech API didn't capture transcript
      if (!state.recording.transcript || state.recording.transcript.trim() === "") {
        const googleTranscript = await transcribeWithGoogleCloud(blob);
        if (googleTranscript) {
          state.recording.transcript = googleTranscript;
          if (transcriptElement) {
            transcriptElement.textContent = googleTranscript;
            transcriptElement.style.color = "var(--text)";
          }
        } else {
          if (transcriptElement) {
            transcriptElement.textContent = "음성 인식에 실패했습니다. 텍스트를 직접 입력하거나 다시 녹음해주세요.";
            transcriptElement.style.color = "var(--warning)";
          }
        }
      } else {
        if (transcriptElement) {
          transcriptElement.style.color = "var(--text)";
        }
      }
    };

    mediaRecorder.start();
    state.recording.active = true;
    recordButton.classList.add("recording");
    recordButton.textContent = "⏹ 녹음 중지";
    startSpeechRecognition();
  } catch (error) {
    console.error("녹음 시작 오류:", error);
    let errorMessage = "마이크 접근에 실패했습니다.";
    if (error.name === "NotAllowedError") {
      errorMessage = "마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.";
    } else if (error.name === "NotFoundError") {
      errorMessage = "마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요.";
    }
    alert(errorMessage);
    if (transcriptElement) {
      transcriptElement.textContent = errorMessage;
      transcriptElement.style.color = "var(--danger)";
    }
  }
}

function stopRecording() {
  if (!state.recording.active) return;
  state.recording.mediaRecorder.stop();
  state.recording.active = false;
  const recordButton = document.querySelector(".btn-record");
  recordButton.classList.remove("recording");
  recordButton.textContent = "🎙️ 말하기 녹음";
  stopSpeechRecognition();
}

async function transcribeWithGoogleCloud(audioBlob) {
  // Note: Google Cloud Speech-to-Text requires server-side proxy due to CORS
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('languageCode', GOOGLE_API_CONFIG.speechToText.languageCode);
    
    // 백엔드 프록시를 통해 호출 (백엔드 서버가 실행 중이어야 함)
    // 백엔드 서버를 시작하려면: node backend_example.js
    const response = await fetch('http://localhost:3000/api/transcribe', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Google Cloud Speech-to-Text 성공:', data.transcript);
      return data.transcript;
    } else {
      console.warn('⚠️ 백엔드 서버가 실행되지 않았습니다. Web Speech API를 사용합니다.');
      return null;
    }
  } catch (error) {
    // 백엔드 서버가 없으면 Web Speech API 사용
    console.warn('⚠️ Google Cloud Speech-to-Text 사용 불가 (백엔드 서버 필요):', error.message);
    return null;
  }
}

function startSpeechRecognition() {
  // Try Google Cloud Speech-to-Text first (requires backend)
  // Fallback to Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Web Speech API not available. Google Cloud requires backend integration.');
    const transcriptElement = document.querySelector(".recording-transcript");
    if (transcriptElement) {
      transcriptElement.textContent = "음성 인식이 지원되지 않는 브라우저입니다. Chrome 또는 Edge를 사용해주세요.";
      transcriptElement.style.color = "var(--warning)";
    }
    return;
  }
  
  try {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + " ";
        } else {
          transcript += event.results[i][0].transcript;
        }
      }
      state.recording.transcript = transcript.trim();
      const transcriptElement = document.querySelector(".recording-transcript");
      if (transcriptElement) {
        transcriptElement.textContent = state.recording.transcript || "말씀해주세요...";
        transcriptElement.style.color = state.recording.transcript ? "var(--text)" : "var(--muted)";
      }
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      const transcriptElement = document.querySelector(".recording-transcript");
      if (transcriptElement) {
        if (event.error === "no-speech") {
          transcriptElement.textContent = "음성이 감지되지 않았습니다. 다시 말씀해주세요.";
        } else if (event.error === "not-allowed") {
          transcriptElement.textContent = "마이크 권한이 필요합니다. 브라우저 설정을 확인해주세요.";
        } else {
          transcriptElement.textContent = `음성 인식 오류: ${event.error}`;
        }
        transcriptElement.style.color = "var(--warning)";
      }
    };
    
    recognition.onend = () => {
      // 녹음이 활성화되어 있으면 다시 시작
      if (state.recording.active) {
        try {
          recognition.start();
        } catch (e) {
          console.warn("Speech recognition restart failed:", e);
        }
      }
    };

    recognition.start();
    state.recognition = recognition;
  } catch (error) {
    console.error("Speech recognition initialization error:", error);
    const transcriptElement = document.querySelector(".recording-transcript");
    if (transcriptElement) {
      transcriptElement.textContent = "음성 인식을 시작할 수 없습니다.";
      transcriptElement.style.color = "var(--danger)";
    }
  }
}

function stopSpeechRecognition() {
  if (state.recognition) {
    state.recognition.stop();
    state.recognition = null;
  }
}

function evaluateRecording() {
  const transcript = state.recording.transcript.trim();
  if (!transcript) {
    alert("녹음 내용이 인식되지 않았습니다. 텍스트 입력이나 녹음을 다시 시도해 주세요.");
    return;
  }
  
  // 평가 실행
  const pcsm = calculatePCSM(transcript);
  const emotion = determineEmotion(pcsm);
  const feedback = generateFeedback(transcript, pcsm, emotion);
  
  // 결과 표시
  const resultBox = document.querySelector(".recording-feedback");
  if (!resultBox) {
    console.error("녹음 평가 결과 박스를 찾을 수 없습니다.");
    return;
  }
  
  resultBox.innerHTML = `
    <h3>📊 녹음 평가 결과</h3>
    <div style="margin-top: 12px;">
      <p><strong>인식된 텍스트:</strong> "${transcript}"</p>
      <p><strong>공손함 점수 (PCSM):</strong> <span style="color: ${pcsm >= 0.7 ? 'var(--success)' : pcsm < 0.3 ? 'var(--danger)' : 'var(--warning)'}">${pcsm.toFixed(2)}</span></p>
      <p><strong>AI 반응:</strong> <span style="color: ${emotion === 'Friendly' ? 'var(--success)' : emotion === 'Annoyed' ? 'var(--danger)' : 'var(--warning)'}">${emotion}</span></p>
    </div>
    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
      <p><strong>태도 피드백:</strong></p>
      <p style="color: var(--muted); margin-top: 4px;">${feedback.attitudinal}</p>
    </div>
    <div style="margin-top: 12px;">
      <p><strong>언어학적 조언:</strong></p>
      <p style="color: var(--muted); margin-top: 4px;">${feedback.linguistic}</p>
    </div>
  `;
  resultBox.style.display = "block";
  
  // 평가 결과를 채팅 로그에도 추가 (선택사항)
  const chatLog = document.querySelector(".chat-log");
  if (chatLog) {
    const userBubble = document.createElement("div");
    userBubble.className = "message user";
    userBubble.textContent = `[녹음] ${transcript}`;
    chatLog.appendChild(userBubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

// 빠른 시나리오 선택 함수들
function selectAirportScenario() {
  // 공항 시나리오 찾기 (첫 번째 공항 시나리오 사용)
  const airportScenarios = sceneLibrary.filter(s => s.category === "airport");
  if (airportScenarios.length > 0) {
    const index = sceneLibrary.indexOf(airportScenarios[0]);
    console.log("✈️ 공항 시나리오 선택:", airportScenarios[0].title);
    console.log("🖼️ 공항 배경 이미지 URL:", airportScenarios[0].npc.background);
    console.log("👤 공항 직원 이미지 URL:", airportScenarios[0].npc.portrait);
    
    // 시나리오 선택 (이미지가 사라지지 않도록 한 번만 호출)
    chooseScenario(index);
  } else {
    console.error("공항 시나리오를 찾을 수 없습니다.");
  }
}

function selectRestaurantScenario() {
  // 식당 시나리오 찾기 (첫 번째 식당 시나리오 사용)
  const restaurantScenarios = sceneLibrary.filter(s => s.category === "restaurant");
  if (restaurantScenarios.length > 0) {
    const index = sceneLibrary.indexOf(restaurantScenarios[0]);
    console.log("식당 시나리오 선택:", restaurantScenarios[0].title);
    chooseScenario(index);
  }
}

function selectDirectionsScenario() {
  // 길 묻기 시나리오 찾기 (transportation 카테고리)
  const directionsScenarios = sceneLibrary.filter(s => s.category === "transportation");
  if (directionsScenarios.length > 0) {
    const index = sceneLibrary.indexOf(directionsScenarios[0]);
    console.log("길 묻기 시나리오 선택:", directionsScenarios[0].title);
    chooseScenario(index);
  }
}

// Event bindings
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로드 완료, 이벤트 리스너 설정 시작...");
  
  // 초기 시나리오 선택 (공항으로 시작) - 약간의 지연으로 DOM이 완전히 로드된 후 실행
  setTimeout(() => {
    selectAirportScenario();
  }, 100);
  
  // 빠른 시나리오 선택 버튼들
  const airportBtn = document.querySelector(".btn-scenario-airport");
  const restaurantBtn = document.querySelector(".btn-scenario-restaurant");
  const directionsBtn = document.querySelector(".btn-scenario-directions");
  
  if (airportBtn) {
    airportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("공항 버튼 클릭됨");
      selectAirportScenario();
    });
  }
  
  if (restaurantBtn) {
    restaurantBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("식당 버튼 클릭됨");
      selectRestaurantScenario();
    });
  }
  
  if (directionsBtn) {
    directionsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("길 묻기 버튼 클릭됨");
      selectDirectionsScenario();
    });
  }
  
  // 이벤트 위임으로도 처리 (안전장치)
  document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-scenario-airport")) {
      e.preventDefault();
      e.stopPropagation();
      selectAirportScenario();
    } else if (e.target.closest(".btn-scenario-restaurant")) {
      e.preventDefault();
      e.stopPropagation();
      selectRestaurantScenario();
    } else if (e.target.closest(".btn-scenario-directions")) {
      e.preventDefault();
      e.stopPropagation();
      selectDirectionsScenario();
    }
  });
  
  document.querySelector(".dialogue-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const textarea = event.currentTarget.querySelector("textarea");
    const submitButton = event.currentTarget.querySelector("button[type='submit']");
    const userText = textarea.value.trim();
    if (!userText) {
      textarea.focus();
      return;
    }
    
    // 버튼 비활성화 및 로딩 표시
    submitButton.disabled = true;
    submitButton.textContent = "평가 중...";
    
    // 평가 실행
    const pcsm = calculatePCSM(userText);
    const emotion = determineEmotion(pcsm);
    const response = generateNpcResponse(emotion, state.scenario);
    const feedback = generateFeedback(userText, pcsm, emotion);
    
    // 약간의 지연을 두어 평가 과정을 명확히 표시
    await new Promise(resolve => setTimeout(resolve, 500));
    
    logInteraction({ text: userText, pcsm, emotion, feedback, response });
    
    // 버튼 복원
    submitButton.disabled = false;
    submitButton.textContent = "전송 & 평가";
    textarea.value = "";
    textarea.focus();
  });
  // 녹음 버튼
  const recordBtn = document.querySelector(".btn-record");
  if (recordBtn) {
    recordBtn.addEventListener("click", toggleRecording);
  } else {
    console.warn("녹음 버튼을 찾을 수 없습니다.");
  }
  
  // 녹음 평가 버튼
  const evaluateBtn = document.querySelector(".btn-evaluate-recording");
  if (evaluateBtn) {
    evaluateBtn.addEventListener("click", evaluateRecording);
  } else {
    console.warn("녹음 평가 버튼을 찾을 수 없습니다.");
  }
  
  console.log("모든 이벤트 리스너 등록 완료");
});

