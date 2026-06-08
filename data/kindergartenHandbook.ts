import { WeeklyTask } from '../types';

export interface KindergartenProject {
  id: number;
  title: string;
  topic: string;
  dueWeek: number;
  childAction: string;
  parentGuide: string;
}

export interface KindergartenWeek {
  week: number;
  handbookPages: string;
  focus: string;
  theme: string;
  letters: string[];
  soundFocus: string;
  classwork: string[];
  homework: string[];
  conversation: string;
  projectNote?: string;
  practiceWords: string[];
  skills: string[];
  tasks: WeeklyTask[];
}

export const KINDERGARTEN_PROJECTS: KindergartenProject[] = [
  {
    id: 1,
    title: 'Project 1',
    topic: 'என் உறவினர்கள் (My Relatives)',
    dueWeek: 5,
    childAction: 'Bring a family photo or drawing and name relatives in Tamil.',
    parentGuide: 'Help the child say one simple fact about one relative in spoken Tamil.'
  },
  {
    id: 2,
    title: 'Project 2',
    topic: 'எண்கள் (Numbers)',
    dueWeek: 10,
    childAction: 'Make number flashcards 1-10 and say the numbers in Tamil.',
    parentGuide: 'Use stickers or drawings so the child connects counting with speech.'
  },
  {
    id: 3,
    title: 'Project 3',
    topic: 'காட்டு விலங்குகள் (Wild Animals)',
    dueWeek: 14,
    childAction: 'Show five wild animals using drawings, toys, or pictures.',
    parentGuide: 'Practice two simple Tamil facts about the child\'s favorite animal.'
  },
  {
    id: 4,
    title: 'Project 4',
    topic: 'காய்கறிகளும் அதன் நிறங்களும் (Vegetables and Colors)',
    dueWeek: 21,
    childAction: 'Show vegetables and say their colors in Tamil.',
    parentGuide: 'Practice color words while cooking, shopping, or sorting vegetables.'
  },
  {
    id: 5,
    title: 'Project 5',
    topic: 'வாரத்தின் நாட்கள் (Days of the Week)',
    dueWeek: 28,
    childAction: 'Present days of the week with one Tamil sentence for an activity.',
    parentGuide: 'Connect each day with a real routine: school, class, play, or rest.'
  }
];

const createTasks = (week: number, projectNote?: string): WeeklyTask[] => {
  const tasks: WeeklyTask[] = [
    { id: `kg_w${week}_letters`, label: 'Practice this week\'s letters and sounds', completed: false },
    { id: `kg_w${week}_words`, label: 'Say the weekly words aloud in Tamil', completed: false },
    { id: `kg_w${week}_writing`, label: 'Complete handwriting / exercise-book practice', completed: false },
    { id: `kg_w${week}_speaking`, label: 'Record or rehearse the conversation activity', completed: false }
  ];

  if (projectNote) {
    tasks.push({ id: `kg_w${week}_project`, label: projectNote, completed: false });
  }

  return tasks;
};

const week = (entry: Omit<KindergartenWeek, 'tasks'>): KindergartenWeek => ({
  ...entry,
  tasks: createTasks(entry.week, entry.projectNote)
});

export const KINDERGARTEN_WEEKS: KindergartenWeek[] = [
  week({
    week: 1,
    handbookPages: 'KG Handbook pp. 36-37',
    focus: 'Class welcome and relatives',
    theme: 'உறவினர்கள் (Relatives)',
    letters: [],
    soundFocus: 'Names, greetings, and spoken Tamil comfort',
    classwork: ['Meet teacher and classmates', 'Lesson 1: relatives', 'Introduce Project 1'],
    homework: ['Practice Lesson 1', 'Learn mother, father, grandpa, grandma, younger brother', 'Write name in Tamil on the first line'],
    conversation: 'No conversation upload this week; let the child practice saying their name and family words.',
    projectNote: 'Start Project 1: என் உறவினர்கள், due Week 5',
    practiceWords: ['அம்மா', 'அப்பா', 'தாத்தா', 'பாட்டி', 'தம்பி'],
    skills: ['Recognize family words', 'Say one family fact', 'Begin Tamil-name writing']
  }),
  week({
    week: 2,
    handbookPages: 'KG Handbook pp. 38-39',
    focus: 'First vowels and short/long sounds',
    theme: 'உயிர் எழுத்துகள்',
    letters: ['அ', 'ஆ'],
    soundFocus: 'குறில் / நெடில்: clap once for அ and twice for ஆ',
    classwork: ['Review relatives', 'Lessons 2 and 3', 'Introduce short and long vowel sounds'],
    homework: ['Practice Textbook Lessons 2 and 3', 'Exercise Book practice 1', 'Handwriting pages 1-2'],
    conversation: 'No conversation upload this week; practice saying new அ / ஆ words clearly.',
    projectNote: 'Continue Project 1: family photo or drawing',
    practiceWords: ['அம்மா', 'அப்பா', 'அக்கா', 'ஆடு', 'ஆமை'],
    skills: ['Differentiate short and long vowels', 'Write அ and ஆ', 'Say a new Tamil word']
  }),
  week({
    week: 3,
    handbookPages: 'KG Handbook pp. 40-42',
    focus: 'Vowels and pet animals',
    theme: 'வீட்டு விலங்குகள்',
    letters: ['இ', 'ஈ'],
    soundFocus: 'Short இ and long ஈ',
    classwork: ['Lessons 4 and 5', 'Lesson 6: pet animals', 'Animal sound questions'],
    homework: ['Practice இ / ஈ words', 'Learn pet animal names and sounds', 'Exercise Book practice 2 and 3'],
    conversation: 'Use the Animals conversation activity and say a few animal names or sounds in Tamil.',
    projectNote: 'Continue Project 1: prepare to name relatives',
    practiceWords: ['இஞ்சி', 'இனிப்பு', 'இரண்டு', 'ஈ', 'நாய்', 'பூனை', 'பசு'],
    skills: ['Animal vocabulary', 'Question-answer listening', 'Short spoken response']
  }),
  week({
    week: 4,
    handbookPages: 'KG Handbook pp. 43-44',
    focus: 'Vowels, rain song, and review',
    theme: 'மழை / விலங்குகள்',
    letters: ['உ', 'ஊ'],
    soundFocus: 'Short உ and long ஊ',
    classwork: ['Review அ through ஈ', 'Lessons 8 and 9', 'Rain-song vocabulary'],
    homework: ['Learn அ through ஊ', 'Exercise Book practice 4', 'Handwriting pages 5-6'],
    conversation: 'Practice the Animals Session 3 conversation in spoken Tamil.',
    projectNote: 'Finish Project 1 for presentation next week',
    practiceWords: ['உடல்', 'உதடு', 'உணவு', 'உப்பு', 'ஊஞ்சல்'],
    skills: ['Vowel review', 'Rain vocabulary', 'Prepared speaking']
  }),
  week({
    week: 5,
    handbookPages: 'KG Handbook p. 45',
    focus: 'Vowels and first presentation',
    theme: 'எ / ஏ and relatives project',
    letters: ['எ', 'ஏ'],
    soundFocus: 'Short எ and long ஏ',
    classwork: ['Lessons 11 and 12', 'Project 1 presentation', 'Textbook speaking practice 2'],
    homework: ['Practice எ / ஏ words', 'Memorize the assigned animal song', 'Prepare a new Tamil word'],
    conversation: 'Say who is in your family project and one simple fact in Tamil.',
    projectNote: 'Present Project 1: என் உறவினர்கள்',
    practiceWords: ['எலி', 'எறும்பு', 'எட்டு', 'ஏழு', 'ஏணி'],
    skills: ['Presentation confidence', 'Long/short sound review', 'Family vocabulary recall']
  }),
  week({
    week: 6,
    handbookPages: 'KG Handbook pp. 47-48',
    focus: 'ஐ and farm animals',
    theme: 'பண்ணை விலங்குகள்',
    letters: ['ஐ'],
    soundFocus: 'Long vowel ஐ',
    classwork: ['Lesson 13', 'Lesson 26: farm animals', 'Farm animal question practice'],
    homework: ['Practice எ, ஏ, ஐ', 'Learn farm animal names', 'Exercise Book practice 5'],
    conversation: 'Use the farm-animal conversation activity and answer one simple animal question.',
    practiceWords: ['ஐந்து', 'குதிரை', 'பசு', 'ஆடு', 'கோழி', 'வாத்து'],
    skills: ['Farm animal vocabulary', 'Answer guided questions', 'Write ஐ']
  }),
  week({
    week: 7,
    handbookPages: 'KG Handbook pp. 49-50',
    focus: 'ஒ / ஓ and numbers',
    theme: 'எண்கள்',
    letters: ['ஒ', 'ஓ'],
    soundFocus: 'Tap once for ஒ and twice for ஓ',
    classwork: ['Lessons 14 and 15', 'Lesson 10: numbers', 'Introduce Project 2'],
    homework: ['Practice ஒ / ஓ words', 'Learn numbers', 'Exercise Book practice 6'],
    conversation: 'Create small number sentences or a number story from 1-10.',
    projectNote: 'Start Project 2: number flashcards, due Week 10',
    practiceWords: ['ஒன்று', 'ஒன்பது', 'ஓநாய்', 'ஓவியம்', 'ஓடு'],
    skills: ['Number vocabulary', 'Short/long vowel contrast', 'Sequence practice']
  }),
  week({
    week: 8,
    handbookPages: 'KG Handbook pp. 52-53',
    focus: 'ஔ and complete vowel review',
    theme: 'உயிர் எழுத்துகள் review',
    letters: ['ஔ'],
    soundFocus: 'ஔ is a long vowel without a short pair',
    classwork: ['Lesson 17: ஔ', 'Review short and long vowels', 'Textbook speaking practice 3'],
    homework: ['Review அ through ஔ', 'Memorize the assigned Jing song', 'Handwriting page 12'],
    conversation: 'Draw yourself and say one fact about you in Tamil.',
    projectNote: 'Continue Project 2: number flashcards',
    practiceWords: ['ஔவை', 'ஔஷதம்', 'அ', 'ஆ', 'இ', 'ஈ'],
    skills: ['All-vowel recall', 'Self-introduction', 'Song memorization']
  }),
  week({
    week: 9,
    handbookPages: 'KG Handbook pp. 54-55',
    focus: 'Aytham and action words',
    theme: 'செயல்கள்',
    letters: ['ஃ'],
    soundFocus: 'ஃ is ஆய்த எழுத்து, not a vowel',
    classwork: ['Lesson 17: ஃ', 'Lesson 16: actions', 'Review vowels with flashcards'],
    homework: ['Review அ through ஃ', 'Exercise Book practice 8', 'Handwriting page 13'],
    conversation: 'Practice the Jing Session 2 conversation activity.',
    projectNote: 'Finish Project 2 for presentation next week',
    practiceWords: ['ஃ', 'ஓடு', 'குதி', 'தூங்கு', 'படி', 'எழுது'],
    skills: ['Action vocabulary', 'Aytham recognition', 'Movement-based speaking']
  }),
  week({
    week: 10,
    handbookPages: 'KG Handbook pp. 56-57',
    focus: 'Consonants begin',
    theme: 'மெய் எழுத்துகள்',
    letters: ['க்', 'ங்'],
    soundFocus: 'Consonants carry a dot and do not start words alone',
    classwork: ['Introduce 18 consonants', 'Lesson 20: க் and ங்', 'Project 2 presentation'],
    homework: ['Learn க் / ங் words', 'Review action words', 'Handwriting pages 14-15'],
    conversation: 'Play a Tamil action game: say four actions in Tamil.',
    projectNote: 'Present Project 2: எண்கள்',
    practiceWords: ['க்', 'ங்', 'குதி', 'தூங்கு', 'ஓடு'],
    skills: ['Consonant concept', 'Action command game', 'Number presentation']
  }),
  week({
    week: 11,
    handbookPages: 'KG Handbook pp. 58-59',
    focus: 'More consonants and greetings',
    theme: 'வணக்கம் / நண்பர்',
    letters: ['ச்', 'ஞ்'],
    soundFocus: 'Continue consonants with pulli',
    classwork: ['Review க் and ங்', 'Lesson 22: ச் and ஞ்', 'Textbook speaking practice 5'],
    homework: ['Practice consonants க் through ஞ்', 'Complete Exercise Book practice 9', 'Learn the assigned greeting song'],
    conversation: 'Name your peacock friend and say what activity you would do together.',
    practiceWords: ['வணக்கம்', 'ஆசிரியர்', 'பெற்றோர்', 'நண்பர்', 'ச்', 'ஞ்'],
    skills: ['Greeting vocabulary', 'Friendship sentence', 'Song recall']
  }),
  week({
    week: 12,
    handbookPages: 'KG Handbook pp. 60-62',
    focus: 'Consonants and wild animals',
    theme: 'காட்டு விலங்குகள்',
    letters: ['ட்', 'ண்'],
    soundFocus: 'Review consonants க் through ண்',
    classwork: ['Lesson 24', 'Lesson 21: wild animals', 'Introduce Project 3'],
    homework: ['Revise consonants க் through ண்', 'Learn wild animal names', 'Exercise Book practice 10'],
    conversation: 'Answer a simple wild-animal question in spoken Tamil.',
    projectNote: 'Start Project 3: wild animals, due Week 14',
    practiceWords: ['புலி', 'யானை', 'சிங்கம்', 'கரடி', 'மான்', 'ஒட்டகச்சிவிங்கி'],
    skills: ['Wild animal vocabulary', 'Guided Q&A', 'Project planning']
  }),
  week({
    week: 13,
    handbookPages: 'KG Handbook pp. 63-64',
    focus: 'Consonants and colors',
    theme: 'நிறங்கள்',
    letters: ['த்', 'ந்'],
    soundFocus: 'Continue consonant recognition',
    classwork: ['Review wild animals', 'Lesson 25', 'Lesson 32: colors'],
    homework: ['Practice த் / ந் words', 'Exercise Book practice 11', 'Prepare wild-animal project'],
    conversation: 'Use the colors/flowers/fruits conversation prompt and name a color in Tamil.',
    projectNote: 'Finish Project 3 for Week 14',
    practiceWords: ['சிவப்பு', 'மஞ்சள்', 'பச்சை', 'நீலம்', 'வெள்ளை'],
    skills: ['Color vocabulary', 'Consonant writing', 'Project rehearsal']
  }),
  week({
    week: 14,
    handbookPages: 'KG Handbook pp. 65-66',
    focus: 'Consonants and wild-animal presentation',
    theme: 'காட்டு விலங்குகள் project',
    letters: ['ப்', 'ம்'],
    soundFocus: 'Review த் / ந் and learn ப் / ம்',
    classwork: ['Lesson 27', 'Project 3 presentation', 'Week 14 revision'],
    homework: ['Practice ப் / ம் words', 'Exercise Book practice 12', 'Review wild animal questions'],
    conversation: 'Say your favorite wild animal and one simple fact in Tamil.',
    projectNote: 'Present Project 3: காட்டு விலங்குகள்',
    practiceWords: ['புலி', 'யானை', 'கரடி', 'மான்', 'ப்', 'ம்'],
    skills: ['Presentation', 'Animal facts', 'Consonant recall']
  }),
  week({
    week: 15,
    handbookPages: 'KG Handbook pp. 67-68',
    focus: 'Consonants and birds',
    theme: 'பறவைகள்',
    letters: ['ய்', 'ர்'],
    soundFocus: 'Continue pulli consonants',
    classwork: ['Lesson 29', 'Lesson 30: birds', 'Bird question practice'],
    homework: ['Learn bird names', 'Complete Exercise Book practices 12 and 13', 'Practice new letters'],
    conversation: 'Use the birds conversation prompt and say your favorite bird.',
    practiceWords: ['கிளி', 'காகம்', 'மயில்', 'கோழி', 'வாத்து'],
    skills: ['Bird vocabulary', 'Favorite-choice sentence', 'Consonant writing']
  }),
  week({
    week: 16,
    handbookPages: 'KG Handbook pp. 69-70',
    focus: 'Consonants and rhyme',
    theme: 'பச்சைக் கிளியே',
    letters: ['ல்', 'வ்'],
    soundFocus: 'Consonants ல் and வ்',
    classwork: ['Lesson 31', 'Lesson 47 rhyme', 'Textbook speaking practice 6'],
    homework: ['Practice ல் / வ் words', 'Exercise Book practice 14 first parts', 'Practice the rhyme'],
    conversation: 'Use the Birds Session 2 conversation activity.',
    practiceWords: ['கிளி', 'பற', 'வா', 'ல்', 'வ்'],
    skills: ['Rhyme recitation', 'Pronunciation', 'Consonant recognition']
  }),
  week({
    week: 17,
    handbookPages: 'KG Handbook pp. 71-72',
    focus: 'Consonant review and bird theme',
    theme: 'பறவைகள் review',
    letters: ['ழ்', 'ள்'],
    soundFocus: 'Retroflex sounds need careful tongue placement',
    classwork: ['Review bird rhyme', 'Lesson 33', 'Week 17 revision'],
    homework: ['Practice Lesson 33 letters', 'Exercise Book practice 14 remaining parts', 'Say a new Tamil word'],
    conversation: 'Use the Birds Session 3 activity and speak in simple Tamil.',
    practiceWords: ['ழ்', 'ள்', 'பறவை', 'கிளி', 'மயில்'],
    skills: ['Harder sound awareness', 'Bird vocabulary recall', 'Short speaking']
  }),
  week({
    week: 18,
    handbookPages: 'KG Handbook pp. 73-75',
    focus: 'Final consonants and vegetables',
    theme: 'காய்கறிகள்',
    letters: ['ற்', 'ன்'],
    soundFocus: 'Finish the consonant set',
    classwork: ['Lesson 35', 'Lesson 38: vegetables', 'Introduce Project 4'],
    homework: ['Learn vegetable names', 'Exercise Book practice 15', 'Prepare vegetable-color project'],
    conversation: 'Use the vegetables conversation activity and say one vegetable color.',
    projectNote: 'Start Project 4: vegetables and colors, due Week 21',
    practiceWords: ['கத்தரிக்காய்', 'தக்காளி', 'வெண்டைக்காய்', 'கேரட்', 'ற்', 'ன்'],
    skills: ['Vegetable vocabulary', 'Color pairing', 'Consonant completion']
  }),
  week({
    week: 19,
    handbookPages: 'KG Handbook pp. 75-77',
    focus: 'Vowel-consonant formation begins',
    theme: 'அகர வரிசை',
    letters: ['க', 'ங', 'ச'],
    soundFocus: 'Combine consonants with அ to form அகர வரிசை letters',
    classwork: ['Lessons 36 and 37', 'Review vegetables', 'Formation practice'],
    homework: ['Write க / ங / ச formation', 'Exercise Book practices 15 and 16', 'Continue Project 4'],
    conversation: 'Use a vegetable sentence in Tamil.',
    projectNote: 'Continue Project 4: vegetables and colors',
    practiceWords: ['காய்', 'சிவப்பு', 'பச்சை', 'க', 'ங', 'ச'],
    skills: ['Letter formation', 'Vegetable review', 'Writing confidence']
  }),
  week({
    week: 20,
    handbookPages: 'KG Handbook pp. 78-80',
    focus: 'Agaram series and letter categories',
    theme: 'மெய் எழுத்துகளின் வகைகள்',
    letters: ['ஞ', 'ட', 'ண'],
    soundFocus: 'Introduce vallinam, mellinam, and idaiyinam categories',
    classwork: ['Lessons 37 and 39', 'Lesson 48: consonant categories', 'Reading practice'],
    homework: ['Practice ஞ / ட / ண formation', 'Exercise Book practice 16 and 25', 'Review Project 4'],
    conversation: 'Use the vegetables conversation prompt and answer in spoken Tamil.',
    projectNote: 'Project 4 due next week',
    practiceWords: ['ஞ', 'ட', 'ண', 'காய்', 'நிறம்'],
    skills: ['Letter categories', 'Reading readiness', 'Formation chart practice']
  }),
  week({
    week: 21,
    handbookPages: 'KG Handbook pp. 81-82',
    focus: 'More agaram letters and project presentation',
    theme: 'காய்கறிகள் + நிறங்கள்',
    letters: ['த', 'ந', 'ப'],
    soundFocus: 'அகர வரிசை with more consonants',
    classwork: ['Lessons 40 and 43', 'Lesson 48: mellinam review', 'Project 4 presentation'],
    homework: ['Practice த / ந / ப formation', 'Exercise Book practice 17, 18, and 24 parts', 'Bring color items for Week 22'],
    conversation: 'Talk about sharing an item with someone in Tamil.',
    projectNote: 'Present Project 4: காய்கறிகளும் அதன் நிறங்களும்',
    practiceWords: ['தக்காளி', 'நிறம்', 'பச்சை', 'மஞ்சள்', 'த', 'ந', 'ப'],
    skills: ['Project speaking', 'Sharing story', 'Letter formation']
  }),
  week({
    week: 22,
    handbookPages: 'KG Handbook pp. 83-85',
    focus: 'Flowers and medial consonants',
    theme: 'பூக்கள்',
    letters: ['ம', 'ய', 'ர'],
    soundFocus: 'அகர வரிசை and இடையினம் review',
    classwork: ['Lessons 43 and 44', 'Lesson 56: flowers', 'Lesson 50 first part'],
    homework: ['Write next-letter sequences', 'Exercise Book practice 26', 'Learn flower names'],
    conversation: 'Name a flower, its color, and when or where it blooms.',
    practiceWords: ['மல்லிகை', 'ரோஜா', 'தாமரை', 'சூரியகாந்தி', 'ம', 'ய', 'ர'],
    skills: ['Flower vocabulary', 'Sequence recognition', 'Question-answer practice']
  }),
  week({
    week: 23,
    handbookPages: 'KG Handbook pp. 86-88',
    focus: 'Fruits and letter classification',
    theme: 'பழங்கள்',
    letters: ['ல', 'வ', 'ழ'],
    soundFocus: 'Circle vowels, underline consonants, mark vowel-consonants',
    classwork: ['Lessons 45 and 46', 'Lesson 42: fruits', 'Lesson 50 second part'],
    homework: ['Practice ல / வ / ழ formation', 'Classify letters in words', 'Learn fruit names'],
    conversation: 'Say your favorite fruit and why, using simple Tamil.',
    practiceWords: ['ஆப்பிள்', 'ஆரஞ்சு', 'மாம்பழம்', 'வாழைப்பழம்', 'திராட்சை'],
    skills: ['Fruit vocabulary', 'Letter classification', 'Favorite-choice speaking']
  }),
  week({
    week: 24,
    handbookPages: 'KG Handbook pp. 89-91',
    focus: 'Days of the week',
    theme: 'கிழமைகள்',
    letters: ['ள', 'ற', 'ன'],
    soundFocus: 'Finish agaram letters க through ன',
    classwork: ['Lessons 46 and 49', 'Lesson 53: days of the week', 'Introduce Project 5'],
    homework: ['Revise க through ன formations', 'Learn days of the week', 'Exercise Book practices 21 and 22'],
    conversation: 'Use the Days and Numbers conversation activity.',
    projectNote: 'Start Project 5: days of the week, due Week 28',
    practiceWords: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
    skills: ['Weekday sequence', 'Agaram review', 'Routine sentence']
  }),
  week({
    week: 25,
    handbookPages: 'KG Handbook pp. 92-94',
    focus: 'ஆகார வரிசை and body parts',
    theme: 'உடல் உறுப்புகள்',
    letters: ['கா', 'ஙா', 'சா', 'ஞா'],
    soundFocus: 'Combine consonants with ஆ to form long ஆகார வரிசை letters',
    classwork: ['Lesson 51', 'Lesson 58: body parts', 'Textbook speaking practice 10'],
    homework: ['Write ஆகார formation', 'Learn body-part names', 'Handwriting pages 35 and 43'],
    conversation: 'Use the body-parts conversation activity.',
    projectNote: 'Continue Project 5: days of the week',
    practiceWords: ['கண்', 'காது', 'வாய்', 'மூக்கு', 'கை', 'கால்'],
    skills: ['Body-part vocabulary', 'Long sound formation', 'Functional questions']
  }),
  week({
    week: 26,
    handbookPages: 'KG Handbook pp. 95-97',
    focus: 'ஆகார letters and short/long conversion',
    theme: 'குறில் / நெடில் மாற்றம்',
    letters: ['டா', 'ணா', 'தா', 'நா'],
    soundFocus: 'Change short sounds into long sounds in letters and words',
    classwork: ['Lessons 51 and 54', 'Short-to-long conversion', 'Song: ஓடி விளையாடு பாப்பா'],
    homework: ['Practice டா / ணா / தா / நா', 'Learn part of the song', 'Exercise Book practices 27 and 30'],
    conversation: 'Use the body-parts Session 2 activity.',
    projectNote: 'Continue Project 5: due Week 28',
    practiceWords: ['கா', 'தா', 'நா', 'கால்', 'காய்'],
    skills: ['Short/long conversion', 'Song recitation', 'Formation practice']
  }),
  week({
    week: 27,
    handbookPages: 'KG Handbook pp. 98-100',
    focus: 'ஆகார letters and reading review',
    theme: 'திரும்பப் படித்தல்',
    letters: ['பா', 'மா', 'யா', 'ரா'],
    soundFocus: 'Only the first letter changes for many short-to-long word pairs',
    classwork: ['Lesson 54', 'Short/long word conversion', 'Lesson 59 reading sections'],
    homework: ['Practice பா / மா / யா / ரா', 'Read review section 3', 'Exercise Book practice 31'],
    conversation: 'Use the body-parts Session 3 activity.',
    projectNote: 'Finish Project 5 for presentation next week',
    practiceWords: ['பா', 'மா', 'யா', 'ரா', 'அம்மா'],
    skills: ['Reading practice', 'Conversion awareness', 'Project rehearsal']
  }),
  week({
    week: 28,
    handbookPages: 'KG Handbook pp. 101-103',
    focus: 'Final ஆகார letters and days presentation',
    theme: 'வாரத்தின் நாட்கள் project',
    letters: ['லா', 'வா', 'ழா', 'ளா', 'றா', 'னா'],
    soundFocus: 'Classify vowels, consonants, and vowel-consonants',
    classwork: ['Lesson 55', 'Letter classification activity', 'Project 5 presentation'],
    homework: ['Read Lesson 59 sections 5 and 6', 'Classify letters in practice words', 'Exercise Book practice 28'],
    conversation: 'Talk about your favorite game in Tamil.',
    projectNote: 'Present Project 5: வாரத்தின் நாட்கள்',
    practiceWords: ['விளையாட்டு', 'ஞாயிறு', 'சனி', 'லா', 'வா'],
    skills: ['Final project speaking', 'Letter classification', 'Favorite-game conversation']
  }),
  week({
    week: 29,
    handbookPages: 'KG Handbook pp. 104-105',
    focus: 'Reading and final model review',
    theme: 'திரும்பப் படித்தல்',
    letters: ['Review'],
    soundFocus: 'Review short and long sounds in reading',
    classwork: ['Lesson 59 sections 2 and 8', 'Revise vowels and consonants', 'Textbook speaking practice 12'],
    homework: ['Read Lesson 59 section 7', 'Exercise Book practice 29', 'Practice final model paper'],
    conversation: 'Use the Days and Numbers Session 3 activity.',
    practiceWords: ['அ', 'ஆ', 'க', 'கா', 'நாள்'],
    skills: ['Reading fluency', 'Meaning recall', 'Exam readiness']
  }),
  week({
    week: 30,
    handbookPages: 'KG Handbook p. 106',
    focus: 'Final model revision',
    theme: 'மீள்பார்வை',
    letters: ['Review'],
    soundFocus: 'Review all KG letters and sounds',
    classwork: ['Revise final model paper', 'Practice weak areas', 'Teacher-guided review'],
    homework: ['Revise final model paper', 'Read favorite review words', 'Practice letter formation chart'],
    conversation: 'Say three favorite Tamil words from the year.',
    practiceWords: ['அம்மா', 'ஆடு', 'கண்', 'கால்', 'நாள்'],
    skills: ['Review stamina', 'Confidence building', 'Mixed recall']
  }),
  week({
    week: 31,
    handbookPages: 'KG Handbook p. 106',
    focus: 'Final exam preparation',
    theme: 'மீள்பார்வை',
    letters: ['Review'],
    soundFocus: 'Vowels, consonants, and அகர / ஆகார formations',
    classwork: ['Revise final model paper', 'Practice oral responses', 'Review songs and projects'],
    homework: ['Review letters', 'Review weekly vocabulary', 'Sleep early and come confident'],
    conversation: 'Practice a tiny self-introduction and one favorite topic.',
    practiceWords: ['உயிர்', 'மெய்', 'கா', 'பூ', 'விளையாட்டு'],
    skills: ['Final review', 'Oral confidence', 'Calm practice']
  }),
  week({
    week: 32,
    handbookPages: 'KG Handbook p. 106',
    focus: 'Final exam',
    theme: 'ஆண்டு நிறைவு',
    letters: ['Review'],
    soundFocus: 'Celebrate the full KG Tamil journey',
    classwork: ['Final exam', 'Review growth', 'Celebrate completion'],
    homework: ['Read a favorite Tamil word list', 'Keep practicing songs and family words', 'Choose next-year goals'],
    conversation: 'Tell one thing you learned in Tamil this year.',
    practiceWords: ['வணக்கம்', 'நன்றி', 'அம்மா', 'கிளி', 'நாள்'],
    skills: ['Completion', 'Reflection', 'Next-step readiness']
  })
];

export const getKindergartenSyllabus = (): KindergartenWeek[] => KINDERGARTEN_WEEKS.map((item) => ({
  ...item,
  tasks: item.tasks.map((task) => ({ ...task }))
}));
