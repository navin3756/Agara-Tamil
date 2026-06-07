const tamilCharacters = /[\u0B80-\u0BFF]/;
const tamilPunctuation = /[.!?।]$/;

const encouragements = [
  'Nice work!',
  'You are getting stronger at Tamil!',
  'Great effort!',
  'Good thinking!',
];

const storySeeds = [
  {
    tamil: 'ஒரு சிறிய பூனை தோட்டத்தில் விளையாடியது. அது ஒரு சிவப்பு பூவை பார்த்தது. பூனை மெதுவாக அருகில் சென்றது. பூவின் மணம் மிகவும் இனிமையாக இருந்தது. பூனை மகிழ்ச்சியாக வீட்டிற்கு திரும்பியது.',
    english: 'A small cat played in the garden. It saw a red flower. The cat slowly went near it. The flower smelled very sweet. The cat happily returned home.',
  },
  {
    tamil: 'ஒரு மாணவன் காலையில் பள்ளிக்கு சென்றான். அவன் தமிழ் புத்தகத்தை திறந்தான். ஆசிரியர் ஒரு புதிய சொல்லை கற்றுக்கொடுத்தார். மாணவன் அந்த சொல்லை அழகாக எழுதினான். அவன் மிகவும் மகிழ்ந்தான்.',
    english: 'A student went to school in the morning. He opened his Tamil book. The teacher taught a new word. The student wrote that word beautifully. He felt very happy.',
  },
  {
    tamil: 'ஒரு சிறிய பறவை மரத்தில் அமர்ந்தது. அது இனிமையாக பாடியது. குழந்தைகள் அந்த பாடலை கேட்டார்கள். அவர்கள் பறவைக்கு தண்ணீர் வைத்தார்கள். பறவை மகிழ்ச்சியாக பறந்து சென்றது.',
    english: 'A small bird sat on a tree. It sang sweetly. Children listened to the song. They kept water for the bird. The bird happily flew away.',
  },
];

const hashText = (value: string) => {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
};

const cleanText = (value: string) => value.trim().replace(/\s+/g, ' ');

const pickEncouragement = (seed: string) => encouragements[hashText(seed) % encouragements.length];

export const checkSentenceWithGemini = async (sentence: string): Promise<string> => {
  const cleaned = cleanText(sentence);
  if (!cleaned) return 'Try writing one Tamil sentence, then check it again.';
  if (!tamilCharacters.test(cleaned)) return 'Try using Tamil letters so Agara can help you practice.';

  const words = cleaned.split(' ').filter(Boolean);
  if (words.length < 2) return 'Good start! Add one more word to make it a fuller sentence.';
  if (!tamilPunctuation.test(cleaned)) return `${pickEncouragement(cleaned)} Add a full stop at the end to finish the sentence.`;

  return `${pickEncouragement(cleaned)} Your sentence has Tamil letters, clear word spacing, and ending punctuation.`;
};

export const formTamilSentence = async (words: string[]): Promise<string> => {
  const cleanedWords = words.map(cleanText).filter(Boolean);
  if (cleanedWords.length === 0) return 'ஒரு தமிழ் சொல்லை தேர்வு செய்.';

  const sentence = cleanedWords.join(' ');
  return tamilPunctuation.test(sentence) ? sentence : `${sentence}.`;
};

export const generateStoryPrompt = async (): Promise<string> => {
  const prompts = [
    'தமிழில் 5 வரிகளில் உங்கள் குடும்பத்தைப் பற்றி எழுதுங்கள். In English: Write five Tamil lines about your family.',
    'தமிழில் உங்கள் பிடித்த விலங்கைப் பற்றி ஒரு சிறிய கதை எழுதுங்கள். In English: Write a short Tamil story about your favorite animal.',
    'தமிழில் பள்ளியில் நடந்த ஒரு மகிழ்ச்சியான நாளைப் பற்றி எழுதுங்கள். In English: Write about a happy day at school in Tamil.',
    'தமிழில் ஒரு மரம், ஒரு பறவை, ஒரு நண்பன் ஆகியவற்றை வைத்து ஒரு கதை எழுதுங்கள். In English: Write a story using a tree, a bird, and a friend.',
  ];
  return prompts[Math.floor(Date.now() / 86_400_000) % prompts.length];
};

export const generateSimpleStory = async (topic: string): Promise<{ tamil: string; english: string }> => {
  const cleanedTopic = cleanText(topic);
  if (cleanedTopic && tamilCharacters.test(cleanedTopic)) {
    return {
      tamil: `${cleanedTopic} நல்ல சொல். ${cleanedTopic} பற்றி நான் இன்று எழுதுகிறேன். ${cleanedTopic} என் தமிழ் பயிற்சிக்கு உதவுகிறது. நான் அந்த சொல்லை தெளிவாக படிக்கிறேன். நான் தினமும் புதிய தமிழ் சொற்களை கற்கிறேன்.`,
      english: `${cleanedTopic} is a good word. I am writing about ${cleanedTopic} today. ${cleanedTopic} helps my Tamil practice. I read that word clearly. I learn new Tamil words every day.`,
    };
  }

  return storySeeds[hashText(cleanedTopic || 'agara') % storySeeds.length];
};

export const generateTamilSpeech = async (text?: string): Promise<string | null> => {
  void text;
  // No backend is required. Components fall back to the device/browser Tamil speech engine.
  return null;
};
