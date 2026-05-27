import { DictationWord, Thirukkural, WeeklySyllabus, Noun, ProjectDef, WeeklyTask } from './types';

export const PROJECTS: ProjectDef[] = [
  {
    id: 1,
    title: "Project 1 (Test 1)",
    topic: "நீ சென்று வந்த மறக்க முடியாத இடம் (A place you visited and cannot forget) / உனக்குக் கிடைத்த அன்பளிப்பு (A gift you received)",
    startWeek: 1,
    dueWeek: 4,
    minSentences: 10,
    requirements: [
      "Minimum 10 Sentences (Grade 4 Page 8)",
      "Must include 3 pictures/drawings",
      "Must be on a project board or chart paper",
      "Oral presentation in class (15 marks)",
      "Information & Headings (6 marks)",
      "Grammar & Handwriting (5 marks)",
      "Diagrams & Photos (4 marks)"
    ]
  },
  {
    id: 2,
    title: "Project 2 (Test 4)",
    topic: "நீ சமைத்த உணவு (Food you cooked) / உனக்குப் பிடித்த தோழன்/தோழி (Your favorite friend)",
    startWeek: 12,
    dueWeek: 16,
    minSentences: 15,
    requirements: [
      "Minimum 15 Sentences (Grade 4 Page 8)",
      "Must include at least 3 pictures",
      "MUST be Handwritten (Marks reduced if typed)",
      "Oral presentation in class (15 marks)",
      "Handwritten Content (5 marks)",
      "Photos/Drawings (4 marks)"
    ]
  }
];

export const CONVERSATION_TOPICS = [
  { id: 1, title: 'Introduction', content: 'உன்னைப் பற்றி அறிமுகம் செய்து கொள்ளலாம் (Name, Grade, School, favorite flower/fruit/color).' },
  { id: 2, title: 'Bicycle riding', content: 'நீ முதல் முதலாக மிதிவண்டி ஓட்டிப் பழகியதை பற்றி பேசலாம்.' },
  { id: 3, title: 'Family Village', content: 'ஊரில் உள்ள உறவினர்களிடம் அவர்களின் ஊர் பற்றியும், சிறப்பைப் பற்றியும் பேசலாம்.' },
  { id: 4, title: 'Pongal Festival', content: 'உனக்குப் பிடித்த அல்லது நீ கொண்டாடிய பண்டிகை (Pongal) பற்றி பேசலாம்.' },
  { id: 5, title: 'Traditional Food', content: 'பாரம்பரிய உணவு ஒன்றை வீட்டில் உள்ளவர்களுடன் சேர்ந்து சமைத்த அனுபவம்.' },
  { id: 6, title: 'Famous Town', content: 'தமிழ்நாட்டில் உள்ள புகழ் பெற்ற ஊர் பற்றி பேசலாம்.' },
  { id: 7, title: 'Train/Flight Journey', content: 'முதன் முதலில் பயணித்த ரயில் அல்லது விமானப் பயணம் பற்றி பேசலாம்.' },
  { id: 8, title: 'Nature Scene', content: 'நான் பார்த்து மிகவும் ரசித்த இயற்கைக் காட்சியைப் பற்றி பேசலாம்.' },
  { id: 9, title: 'Tamil Learning', content: 'நீ ஏன் தமிழ் கற்கிறாய்? உன்னுடைய கருத்துக்கள் பற்றி பேசலாம்.' },
  { id: 10, title: 'School Experience', content: 'உன் பள்ளியைப் பற்றிப் பேசலாம்.' }
];

// Comprehensive Grade 4 Word List aligned with handbook (pages 120-123)
export const DICTATION_WORDS: DictationWord[] = [
  // Week 1-3: Intro words
  { week: 1, tamil: 'வணக்கம்', english: 'Greeting/Hello', visualPrompt: 'வணக்கம் கூறும் சிறுவன்' },
  { week: 1, tamil: 'ஆசிரியர்', english: 'Teacher', visualPrompt: 'ஆசிரியர் பாடம் கற்பிக்கிறார்' },
  { week: 1, tamil: 'மாணவர்', english: 'Student', visualPrompt: 'மாணவன் படிக்கிறான்' },
  { week: 2, tamil: 'அம்மா', english: 'Mother', visualPrompt: 'அன்பான அம்மா' },
  { week: 2, tamil: 'அப்பா', english: 'Father', visualPrompt: 'அன்பான அப்பா' },
  { week: 3, tamil: 'குடும்பம்', english: 'Family', visualPrompt: 'மகிழ்ச்சியான குடும்பம்' },
  { week: 3, tamil: 'பெற்றோர்', english: 'Parents', visualPrompt: 'பெற்றோர்கள்' },

  // Week 5-8: Prep for Test 2 (from page 120)
  { week: 5, tamil: 'பிறந்தநாள்', english: 'Birthday', visualPrompt: 'பிறந்தநாள் கேக்' },
  { week: 5, tamil: 'அணிந்தான்', english: 'wore', visualPrompt: 'சட்டை அணிகிறான்' },
  { week: 5, tamil: 'மகிழ்ச்சி', english: 'Happiness', visualPrompt: 'மகிழ்ச்சியான முகம்' },
  { week: 5, tamil: 'வெற்றி', english: 'Victory', visualPrompt: 'வெற்றிக் கோப்பை' },
  { week: 6, tamil: 'புதுச்சட்டை', english: 'New shirt', visualPrompt: 'புதுச் சட்டை' },
  { week: 6, tamil: 'நேற்று', english: 'Yesterday', visualPrompt: 'காலண்டர் நேற்று' },
  { week: 6, tamil: 'தேநீர்', english: 'Tea', visualPrompt: 'சூடான தேநீர்' },
  { week: 6, tamil: 'தொலைக்காட்சி', english: 'Television', visualPrompt: 'தொலைக்காட்சி பெட்டி' },
  { week: 7, tamil: 'புத்தகம்', english: 'Book', visualPrompt: 'புத்தகம் அடுக்கி வைத்தல்' },
  { week: 7, tamil: 'நண்பர்கள்', english: 'Friends', visualPrompt: 'நண்பர்கள் விளையாடுகிறார்கள்' },
  { week: 7, tamil: 'அருகில்', english: 'Near', visualPrompt: 'அருகில் இருப்பவர்' },
  { week: 7, tamil: 'இன்பமாக', english: 'Happily', visualPrompt: 'இன்பமாக இருத்தல்' },
  { week: 8, tamil: 'கால்பந்து', english: 'soccer', visualPrompt: 'கால்பந்து விளையாட்டு' },
  { week: 8, tamil: 'திடல்', english: 'Field', visualPrompt: 'விளையாட்டுத் திடல்' },
  { week: 8, tamil: 'நடனம்', english: 'Dance', visualPrompt: 'நடனம் ஆடும் பெண்' },
  { week: 8, tamil: 'உடற்பயிற்சி', english: 'Exercise', visualPrompt: 'யோகா உடற்பயிற்சி' },
  { week: 8, tamil: 'நடக்கிறார்', english: 'Walking', visualPrompt: 'முதியவர் நடக்கிறார்' },

  // Week 9-12: Prep for Test 3 (from page 120-121)
  { week: 9, tamil: 'களைப்பு', english: 'Tiredness', visualPrompt: 'களைப்பான முகம்' },
  { week: 9, tamil: 'நீச்சல் குளம்', english: 'Swimming pool', visualPrompt: 'நீச்சல் குளம்' },
  { week: 10, tamil: 'மிதவை', english: 'Float', visualPrompt: 'தண்ணீரில் மிதவை' },
  { week: 10, tamil: 'விரைவு உணவகம்', english: 'Fast food restaurant', visualPrompt: 'உணவகம்' },
  { week: 11, tamil: 'விலங்கியல் பூங்கா', english: 'Zoo', visualPrompt: 'மிருகக்காட்சி சாலை' },
  { week: 11, tamil: 'உறக்கம்', english: 'Sleep', visualPrompt: 'குழந்தை உறக்கம்' },
  { week: 12, tamil: 'கனமான', english: 'Heavy', visualPrompt: 'கனமான மூட்டை' },
  { week: 12, tamil: 'புகைப்படம்', english: 'photo', visualPrompt: 'புகைப்படம் எடுத்தல்' },
  { week: 12, tamil: 'விடுமுறை', english: 'Holiday', visualPrompt: 'சுற்றுலா விடுமுறை' },
  { week: 12, tamil: 'நூலகம்', english: 'Library', visualPrompt: 'பெரிய நூலகம்' },

  // Week 17-20: Prep for Test 5 (from page 121)
  { week: 17, tamil: 'காடு', english: 'Forest', visualPrompt: 'அடர்ந்த காடு' },
  { week: 17, tamil: 'வேடன்', english: 'Hunter', visualPrompt: 'வேடன் அம்பு' },
  { week: 17, tamil: 'அணில்', english: 'Squirrel', visualPrompt: 'அணில் பழம் தின்னும்' },
  { week: 17, tamil: 'வலை', english: 'Net', visualPrompt: 'மீன் வலை' },
  { week: 18, tamil: 'குறி', english: 'Aim', visualPrompt: 'வில் அம்பு குறி' },
  { week: 18, tamil: 'புறா', english: 'Pigeon', visualPrompt: 'வெள்ளைப் புறா' },
  { week: 18, tamil: 'நெருப்பு', english: 'Fire', visualPrompt: 'எரியும் நெருப்பு' },
  { week: 18, tamil: 'உதவி', english: 'Help', visualPrompt: 'பிறருக்கு உதவி' },
  { week: 19, tamil: 'ஒலி', english: 'Sound', visualPrompt: 'சத்தம் ஒலிபெருக்கி' },
  { week: 19, tamil: 'தை மாதம்', english: 'Tamil month', visualPrompt: 'தை மாதம் பொங்கல்' },
  { week: 19, tamil: 'கோலம்', english: 'Rangoli', visualPrompt: 'வண்ணக் கோலம்' },
  { week: 19, tamil: 'பானை', english: 'Pot', visualPrompt: 'மண் பானை' },
  { week: 20, tamil: 'சூரியன்', english: 'Sun', visualPrompt: 'சூரியன் உதயமாவது' },
  { week: 20, tamil: 'கரும்பு', english: 'sugarcane', visualPrompt: 'இனிப்புக் கரும்பு' },
  { week: 20, tamil: 'நெல்', english: 'paddy', visualPrompt: 'நெல் வயல்' },

  // Week 21-24: Prep for Test 6 (from page 122)
  { week: 21, tamil: 'மஞ்சள்', english: 'yellow/turmeric', visualPrompt: 'மஞ்சள் பொடி' },
  { week: 21, tamil: 'கூட்டமாக', english: 'crowded', visualPrompt: 'மனிதர்கள் கூட்டம்' },
  { week: 21, tamil: 'மகிழ்ச்சி', english: 'Happy', visualPrompt: 'மகிழ்ச்சியான வாழ்க்கை' },
  { week: 22, tamil: 'துரத்தினர்', english: 'chased', visualPrompt: 'நாய் துரத்துதல்' },
  { week: 22, tamil: 'வண்ண வண்ண', english: 'colorful', visualPrompt: 'வண்ண வண்ண மலர்கள்' },
  { week: 22, tamil: 'மணல்வீடு', english: 'sand house', visualPrompt: 'மணல் வீடு கடற்கரை' },
  { week: 23, tamil: 'கடற்கரை', english: 'sea shore', visualPrompt: 'அழகான கடற்கரை' },
  { week: 23, tamil: 'சிப்பிகள்', english: 'shells', visualPrompt: 'கடல் சிப்பிகள்' },
  { week: 24, tamil: 'மணல்வாரி', english: 'shovel', visualPrompt: 'மணல் வாரி கருவி' },

  // Week 25-28: Prep for Test 7 (from page 122)
  { week: 25, tamil: 'உழவர் விழா', english: 'Farmer’s Festival', visualPrompt: 'உழவர் திருநாள் பொங்கல்' },
  { week: 25, tamil: 'சர்க்கரை', english: 'Sugar', visualPrompt: 'வெள்ளை சர்க்கரை' },
  { week: 25, tamil: 'அரிசி', english: 'Rice', visualPrompt: 'அரிசி மூட்டை' },
  { week: 26, tamil: 'வண்ணம்', english: 'Color', visualPrompt: 'வானவில் வண்ணங்கள்' },
  { week: 26, tamil: 'மறக்காமல்', english: 'without forgetting', visualPrompt: 'நினைவில் வைத்தல்' },
  { week: 26, tamil: 'காய்கறி', english: 'vegetable', visualPrompt: 'பசுமையான காய்கறிகள்' },
  { week: 27, tamil: 'சந்தை', english: 'market', visualPrompt: 'காய்கறி சந்தை' },
  { week: 27, tamil: 'எல்லாரும்', english: 'everyone', visualPrompt: 'அனைவரும் ஒன்றாக' },
  { week: 27, tamil: 'சுவையாக', english: 'tasty', visualPrompt: 'சுவையான உணவு' },
  { week: 28, tamil: 'அதிகமாக', english: 'more / a lot', visualPrompt: 'அதிகமான பொருட்கள்' },

  // Week 29-32: Prep for Test 8 (from page 123)
  { week: 29, tamil: 'போட்டி', english: 'Contest / Competition', visualPrompt: 'விளையாட்டுப் போட்டி' },
  { week: 29, tamil: 'மாறுவேடம்', english: 'Disguise / Costume', visualPrompt: 'மாறுவேடப் போட்டி' },
  { week: 30, tamil: 'பயிற்சி', english: 'Exercise / Practice', visualPrompt: 'தீவிர பயிற்சி' },
  { week: 30, tamil: 'புலவர்', english: 'poet', visualPrompt: 'திருவள்ளுவர் புலவர்' },
  { week: 31, tamil: 'நூற்றாண்டு', english: 'century', visualPrompt: 'நூற்றாண்டு விழா' },
  { week: 31, tamil: 'நூல்', english: 'book', visualPrompt: 'நூல்கள் அடுக்கி வைத்தல்' },
  { week: 32, tamil: 'உலகம்', english: 'World', visualPrompt: 'உலக உருண்டை' }
];

export const THIRUKKURALS: Thirukkural[] = [
  {
    id: 1,
    kural: [
      "கற்க கசடறக் கற்பவை கற்றபின்",
      "நிற்க அதற்குத் தக."
    ],
    meaning: "கல்வியைக் குறையில்லாமல் கற்க வேண்டும். கற்றபின் அதற்குப் பொருத்தமாக நடந்து கொள்ள வேண்டும். (Learn flawlessly, then act according to it.)",
    wordMeanings: [
        { word: "கற்க", meaning: "Learn" },
        { word: "கசடற", meaning: "Flawlessly" },
        { word: "கற்பவை", meaning: "Worthy things" },
        { word: "கற்றபின்", meaning: "After learning" },
        { word: "நிற்க", meaning: "Act/Live by" },
        { word: "அதற்குத் தக", meaning: "According to it" }
    ]
  },
  {
    id: 2,
    kural: [
      "உடுக்கை இழந்தவன் கைபோல ஆங்கே",
      "இடுக்கண் களைவதாம் நட்பு."
    ],
    meaning: "ஒருவன் உடுக்கும் உடை நழுவும் போது, அவன் கை எவ்வாறு வேகமாகச் சென்று சரி செய்கிறதோ, அவ்வாறு நண்பர் துன்பப்படும் போது சென்று சரி செய்வதே உண்மையான நட்பு. (True friendship is immediate help).",
    wordMeanings: [
        { word: "உடுக்கை", meaning: "Garment" },
        { word: "இழந்தவன்", meaning: "One who lost (slipping)" },
        { word: "கைபோல", meaning: "Like the hand" },
        { word: "இடுக்கண்", meaning: "Distress" },
        { word: "களைவதாம்", meaning: "Removing" },
        { word: "நட்பு", meaning: "Friendship" }
    ]
  },
  {
    id: 3,
    kural: [
      "இன்னா செய்தாரை ஒறுத்தல் அவர்நாண",
      "நன்னயம் செய்து விடல்."
    ],
    meaning: "நமக்குத் தீமை செய்தவரைத் தண்டிப்பது, அவர் வெட்கப்படும்படி அவருக்கு நன்மை செய்தலே ஆகும். (Punish evil with kindness).",
    wordMeanings: [
        { word: "இன்னா", meaning: "Harm" },
        { word: "செய்தாரை", meaning: "Those who did" },
        { word: "ஒறுத்தல்", meaning: "Punishing" },
        { word: "அவர்நாண", meaning: "To make them ashamed" },
        { word: "நன்னயம்", meaning: "Goodness" },
        { word: "செய்து விடல்", meaning: "By doing" }
    ]
  },
  {
    id: 4,
    kural: [
      "நன்றி மறப்பது நன்றன்று நன்றல்லது",
      "அன்றே மறப்பது நன்று"
    ],
    meaning: "ஒருவர் செய்த நன்மையை மறப்பது நல்லது அல்ல, அவர் செய்த தீமையை அன்றே மறப்பது நல்லது. (Forget wrongs, remember gratitude).",
    wordMeanings: [
        { word: "நன்றி", meaning: "Gratitude" },
        { word: "மறப்பது", meaning: "Forgetting" },
        { word: "நன்றன்று", meaning: "Is not good" },
        { word: "நன்றல்லது", meaning: "Wrong deeds" },
        { word: "அன்றே", meaning: "That very day" },
        { word: "நன்று", meaning: "Is good" }
    ]
  },
  {
    id: 5,
    kural: [
      "ஈன்ற பொழுதின் பெரிதுவக்கும் தன்மகனைச்",
      "சான்றோன் எனக்கேட்ட தாய்."
    ],
    meaning: "நல்ல மகனைப் பெற்றெடுத்தவள் என்று ஊரார் பாராட்டும் பொழுது, அவனைப் பெற்றபொழுது அடைந்த மகிழ்ச்சியைவிட அதிக மகிழ்ச்சியை அந்தத் தாய் அடைவாள். (Mother's pride).",
    wordMeanings: [
        { word: "ஈன்ற", meaning: "Giving birth" },
        { word: "பொழுதின்", meaning: "Than the time" },
        { word: "பெரிதுவக்கும்", meaning: "Rejoice greatly" },
        { word: "தன்மகனை", meaning: "Her son" },
        { word: "சான்றோன்", meaning: "Wise/Noble man" },
        { word: "எனக்கேட்ட", meaning: "When heard" },
        { word: "தாய்", meaning: "Mother" }
    ]
  }
];

export const PHONETICS_PAIRS = [
  { 
    id: 'nn', 
    group: 'Mayangoli: Na-Nna-Na (ந-ண-ன)', 
    letters: ['ந', 'ண', 'ன'], 
    tips: 'ண (Munnizhi): Roll tongue deep back (Page 19). ந (Dental): Tip of tongue to teeth. ன (Iradizhi): Tip of tongue to roof ridge.' 
  },
  { 
    id: 'lz', 
    group: 'Mayangoli: La-Lla-Zha (ல-ள-ழ)', 
    letters: ['ல', 'ள', 'ழ'], 
    tips: 'ல: Tip of tongue to upper teeth. ள: Tongue to roof of mouth. ழ: Special "Zha" - curl tongue deep back without touching the roof (Page 19/21).' 
  },
  { 
    id: 'rr', 
    group: 'Mayangoli: Ra-Rra (ர-ற)', 
    letters: ['ர', 'ற'], 
    tips: 'ர: Soft Ra - roll tongue slightly. ற: Hard Rra - press tongue firmly against the roof (Page 22).' 
  },
  { id: 'vallinam', group: 'Vallinam (Hard Consonants)', letters: ['க', 'ச', 'ட', 'த', 'ப', 'ற'], tips: 'Strong sounds originating from the chest (Page 19).' },
  { id: 'mellinam', group: 'Mellinam (Soft/Nasal)', letters: ['ங', 'ஞ', 'ண', 'ந', 'ம', 'ன'], tips: 'Gentle sounds originating from the nose.' },
  { id: 'idaiyinam', group: 'Idaiyinam (Medium)', letters: ['ய', 'ர', 'ல', 'வ', 'ழ', 'ள'], tips: 'Medium sounds originating from the throat.' }
];

const NOUN_POOL: Record<string, Noun[]> = {
  basics: [
    { label: 'அம்மா (Mother)', value: 'அம்மா', type: 'a' },
    { label: 'அப்பா (Father)', value: 'அப்பா', type: 'a' },
    { label: 'பள்ளி (School)', value: 'பள்ளி', type: 'i' },
    { label: 'வீடு (House)', value: 'வீடு', type: 'du' },
    { label: 'பால் (Milk)', value: 'பால்', type: 'l' },
  ],
  nature: [
    { label: 'மரம் (Tree)', value: 'மரம்', type: 'm' },
    { label: 'காடு (Forest)', value: 'காடு', type: 'du' },
    { label: 'ஆறு (River)', value: 'ஆறு', type: 'ru' },
    { label: 'மலை (Mountain)', value: 'மலை', type: 'ai' },
    { label: 'பூ (Flower)', value: 'பூ', type: 'u' },
  ],
  animals: [
    { label: 'நாய் (Dog)', value: 'நாய்', type: 'y' },
    { label: 'பூனை (Cat)', value: 'பூனை', type: 'ai' },
    { label: 'குரங்கு (Monkey)', value: 'குரங்கு', type: 'u' },
    { label: 'மான் (Deer)', value: 'மான்', type: 'n' },
    { label: 'யானை (Elephant)', value: 'யானை', type: 'ai' },
  ],
  objects: [
    { label: 'பந்து (Ball)', value: 'பந்து', type: 'u' },
    { label: 'புத்தகம் (Book)', value: 'புத்தகம்', type: 'm' },
    { label: 'படம் (Picture)', value: 'படம்', type: 'm' },
    { label: 'கண் (Eye)', value: 'கண்', type: 'n' },
    { label: 'கதவு (Door)', value: 'கதவு', type: 'u' },
  ],
  body: [
     { label: 'கண் (Eye)', value: 'கண்', type: 'n' },
     { label: 'கை (Hand)', value: 'கை', type: 'ai' },
     { label: 'கால் (Leg)', value: 'கால்', type: 'l' },
     { label: 'தலை (Head)', value: 'தலை', type: 'ai' },
  ],
  places: [
     { label: 'ஊர் (Town)', value: 'ஊர்', type: 'r' },
     { label: 'கடல் (Sea)', value: 'கடல்', type: 'l' },
     { label: 'குளம் (Pond)', value: 'குளம்', type: 'm' },
     { label: 'நாடு (Country)', value: 'நாடு', type: 'du' },
  ]
};

const getGrammarWordsForWeek = (week: number): Noun[] => {
  if (week <= 3) return NOUN_POOL.basics;
  if (week <= 5) return NOUN_POOL.nature;
  if (week <= 7) return NOUN_POOL.animals;
  if (week <= 9) return NOUN_POOL.body;
  if (week <= 12) return NOUN_POOL.places;
  if (week <= 15) return NOUN_POOL.objects;
  
  const themes = [NOUN_POOL.basics, NOUN_POOL.nature, NOUN_POOL.animals, NOUN_POOL.objects, NOUN_POOL.places];
  return themes[week % 5] || NOUN_POOL.basics;
};

const getHandbookTasks = (week: number): WeeklyTask[] => {
   const tasks: WeeklyTask[] = [
       { id: `w${week}_read`, label: `வாசித்தல் பயிற்சி (Reading Practice) - 15-20 mins`, completed: false },
       { id: `w${week}_dict`, label: `சொல்லிப் பழகுவோம் (Dictation Practice)`, completed: false },
       { id: `w${week}_conv`, label: `உரையாடல் பயிற்சி (Conversation Practice) - 2-4 mins`, completed: false }
   ];

   if (week === 1) {
     tasks.push({ id: 'w1_family', label: 'Student Handbook (SH) Page 38: Lesson: குடும்பம் (Family)', completed: false });
     tasks.push({ id: 'w1_case2', label: 'SH Page 30/38: Grammar: 2nd Case Ending (ஐ)', completed: false });
   }
   if (week === 2) {
     tasks.push({ id: 'w2_gender', label: 'SH Page 44: Grammar: ஆண்பால் - பெண்பால்', completed: false });
     tasks.push({ id: 'w2_case3', label: 'SH Page 26/46: Grammar: 3rd Case Ending (ஆல், ஓடு, உடன்)', completed: false });
   }
   if (week === 3) {
     tasks.push({ id: 'w3_opp', label: 'SH Page 48: Grammar: எதிர்ச்சொற்கள் (Opposites)', completed: false });
     tasks.push({ id: 'w3_case4', label: 'SH Page 27/49: Grammar: 4th Case Ending (கு)', completed: false });
   }
   if (week === 4) {
     tasks.push({ id: 'w4_test1', label: 'Submit Project 1 (SH Page 8/50)', completed: false });
   }
   if (week === 5) {
     tasks.push({ id: 'w5_present', label: 'SH Page 55: Grammar: நிகழ்காலம் (Present Tense)', completed: false });
     tasks.push({ id: 'w5_case5', label: 'SH Page 28/56: Grammar: 5th Case Ending (இன், இல், இருந்து)', completed: false });
   }
   if (week === 6) {
     tasks.push({ id: 'w6_kural1', label: 'SH Page 3/59: Learn Thirukkural 1: கற்க கசடற...', completed: false });
     tasks.push({ id: 'w6_case6', label: 'SH Page 29/60: Grammar: 6th Case Ending (அது, உடைய)', completed: false });
   }
   if (week === 7) {
     tasks.push({ id: 'w7_case7', label: 'SH Page 29/63: Grammar: 7th Case Ending (இல், இடம்)', completed: false });
   }
   if (week === 8) {
     tasks.push({ id: 'w8_test2', label: 'Test 2', completed: false });
   }
   if (week === 9) {
     tasks.push({ id: 'w9_kural2', label: 'Learn Thirukkural 2: உடுக்கை இழந்தவன்...', completed: false });
     tasks.push({ id: 'w9_case8', label: 'Grammar: 8th Case Ending (விளி வேற்றுமை)', completed: false });
   }
   if (week === 12) {
     tasks.push({ id: 'w12_test3', label: 'Test 3 (Term 1 Ends)', completed: false });
   }
   if (week === 14) {
     tasks.push({ id: 'w14_past', label: 'Grammar: இறந்த காலம் (Past Tense)', completed: false });
     tasks.push({ id: 'w14_kural3', label: 'Learn Thirukkural 3: இன்னா செய்தாரை...', completed: false });
   }
   if (week === 16) {
     tasks.push({ id: 'w16_test4', label: 'Test 4: Submit Project 2', completed: false });
   }
   if (week === 18) {
     tasks.push({ id: 'w18_future', label: 'Grammar: எதிர்காலம் (Future Tense)', completed: false });
     tasks.push({ id: 'w18_kural4', label: 'Learn Thirukkural 4: நன்றி மறப்பது...', completed: false });
   }
   if (week === 20) {
     tasks.push({ id: 'w20_test5', label: 'Test 5 (Term 2 Ends)', completed: false });
   }
   if (week === 24) {
     tasks.push({ id: 'w24_test6', label: 'Test 6', completed: false });
   }
   if (week === 26) {
     tasks.push({ id: 'w26_kural5', label: 'Learn Thirukkural 5: ஈன்ற பொழுதின்...', completed: false });
   }
   if (week === 28) {
     tasks.push({ id: 'w28_test7', label: 'Test 7', completed: false });
   }
   if (week === 32) {
     tasks.push({ id: 'w32_test8', label: 'Test 8 (Final Exam)', completed: false });
   }

   return tasks;
};

export const getWeeklySyllabus = (): WeeklySyllabus[] => {
  return Array.from({ length: 32 }, (_, i) => {
    const week = i + 1;
    const grammarWords = getGrammarWordsForWeek(week);

    let kuralId = 1;
    if (week >= 9 && week < 14) kuralId = 2;
    if (week >= 14 && week < 18) kuralId = 3;
    if (week >= 18 && week < 26) kuralId = 4;
    if (week >= 26) kuralId = 5;

    let phoneticFocus: string;
    if (week <= 3) {
       if (week === 1) phoneticFocus = 'vallinam';
       else if (week === 2) phoneticFocus = 'mellinam';
       else phoneticFocus = 'idaiyinam';
    } else {
       const rotationIndex = (week - 4) % 6;
       const keys = ['lz', 'rr', 'nn', 'vallinam', 'mellinam', 'idaiyinam'];
       phoneticFocus = keys[rotationIndex];
    }

    let topic = `Week ${week}: ${week % 2 === 0 ? 'Reading & Comprehension' : 'Grammar & Vocabulary'}`;
    
    if (week === 1) topic = "Week 1: குடும்பம் (Family) & 2nd Case Ending";
    if (week === 2) topic = "Week 2: Masculine/Feminine & 3rd Case Ending";
    if (week === 3) topic = "Week 3: Vacation & 4th Case Ending";
    if (week === 4) topic = "Week 4: Test 1 (Project 1)";
    if (week === 5) topic = "Week 5: Park/Hobby & Present Tense";
    if (week === 6) topic = "Week 6: Present Tense & 6th Case Ending";
    if (week === 7) topic = "Week 7: Masculine/Feminine & 7th Case Ending";
    if (week === 8) topic = "Week 8: Test 2";
    if (week === 9) topic = "Week 9: Elephant & 8th Case Ending";
    if (week === 12) topic = "Week 12: Test 3 (Term 1 Ends)";
    if (week === 14) topic = "Week 14: Zoo Safari & Past Tense";
    if (week === 16) topic = "Week 16: Test 4 (Project 2)";
    if (week === 17) topic = "Week 17: பொங்கல் திருநாள் (Pongal)";
    if (week === 18) topic = "Week 18: Future Tense & Kural 4";
    if (week === 20) topic = "Week 20: Test 5 (Term 2 Ends)";
    if (week === 24) topic = "Week 24: Test 6";
    if (week === 26) topic = "Week 26: Grocery Store & Kural 5";
    if (week === 28) topic = "Week 28: Test 7";
    if (week === 32) topic = "Week 32: Test 8 (Final Exam)";

    const youtubeLinks = [];
    if (week === 1) {
      youtubeLinks.push({ title: "En Kudumbam - My Family in Tamil", url: "https://www.youtube.com/watch?v=R9jFkHMB-kQ" });
    } else if (week === 2) {
      youtubeLinks.push({ title: "Grammar: Case Endings Introduction", url: "https://www.youtube.com/watch?v=1T4wT1_D1r4" });
    } else if (week === 6 || week == 14 || week == 18) {
      youtubeLinks.push({ title: "Tamil Tenses (Kalam)", url: "https://www.youtube.com/watch?v=FjMwGik4tks" });
    } else if (week === 17) {
      youtubeLinks.push({ title: "Pongal Festival Story for Kids", url: "https://www.youtube.com/watch?v=hN2yXwGjViw" });
    } else {
      youtubeLinks.push({ title: "Tamil Rhymes & Stories (Weekly Mix)", url: "https://www.youtube.com/watch?v=zZ8cveXXRBg" });
    }

    return {
      week,
      topic,
      grammarWords,
      kuralId,
      phoneticFocus,
      youtubeLinks,
      tasks: getHandbookTasks(week)
    };
  });
};

export const WEEKLY_SYLLABUS = getWeeklySyllabus();
