
import { Worksheet } from '../types';

export const WORKSHEETS: Worksheet[] = [
  // --- Grade 4 Week 21 Worksheet (Beach) ---
  {
    id: 'ws_g4_w21_beach',
    title: 'Grade 4 - Week 21 (கடற்கரை)',
    topic: 'Vocabulary & Sentences',
    minWeek: 21,
    maxWeek: 21,
    questions: [
      {
        id: 'q1_beach_match',
        type: 'match',
        instruction: '6.10 கோடிட்டுப் பொருத்தமாக இணைக்க (Match appropriately)',
        pairs: [
          { left: 'கடற்கரை', right: 'Sea shore' },
          { left: 'சிப்பிகள்', right: 'Shells' },
          { left: 'மணல்வாரி', right: 'Shovel' },
          { left: 'மணல்வீடு', right: 'Sand house' }
        ]
      },
      {
        id: 'q2_beach_sent',
        type: 'fill_blank',
        instruction: 'வாக்கியம் அமை: மணல்வீடு (Use in a sentence)',
        text: 'நான் நேற்று கடற்கரையில் என் அப்பாவுடன் ___ கட்டி விளையாடினேன்.',
        answer: 'மணல்வீடு'
      }
    ]
  },
  // --- Grade 4 Week 22 Worksheet (Gender & Tenses) ---
  {
    id: 'ws_g4_w22_grammar',
    title: 'Grade 4 - Week 22 (இலக்கணம்)',
    topic: 'Grammar',
    minWeek: 22,
    maxWeek: 22,
    questions: [
      {
        id: 'q1_gender_match',
        type: 'match',
        instruction: '6.12 ஆண்பால் - பெண்பால் (Match Gender)',
        pairs: [
          { left: 'அரசன்', right: 'அரசி' },
          { left: 'மாணவன்', right: 'மாணவி' },
          { left: 'சிறுவன்', right: 'சிறுமி' },
          { left: 'அவன்', right: 'அவள்' }
        ]
      }
    ]
  },
  // --- Grade 4 Week 1 Worksheet (Family) ---
  {
    id: 'ws_g4_w1_family',
    title: 'Grade 4 - Week 1 (குடும்பம்)',
    topic: 'Vocabulary & Case Endings',
    minWeek: 1,
    maxWeek: 1,
    questions: [
      {
        id: 'q1_family_match',
        type: 'match',
        instruction: '1.2 படத்தைப் பார்த்துப் பெயர் எழுதுக (Match English to Tamil)',
        pairs: [
          { left: 'Mother', right: 'அம்மா' },
          { left: 'Father', right: 'அப்பா' },
          { left: 'Brother', right: 'அண்ணன்' },
          { left: 'Sister', right: 'அக்கா' }
        ]
      },
      {
        id: 'q2_case2_fill',
        type: 'fill_blank',
        instruction: '2nd Case Ending (ஐ): நான் ___ பார்த்தேன். (அம்மா / அம்மாவை)',
        text: 'நான் ___ பார்த்தேன்.',
        answer: 'அம்மாவை',
        options: ['அம்மா', 'அம்மாவை']
      }
    ]
  },

  // --- Grade 4 Week 2 Worksheet (Gender) ---
  {
    id: 'ws_g4_w2_gender',
    title: 'Grade 4 - Week 2 (ஆண்பால் - பெண்பால்)',
    topic: 'Grammar',
    minWeek: 2,
    maxWeek: 2,
    questions: [
      {
        id: 'q1_gender_match',
        type: 'match',
        instruction: 'Match Masculine to Feminine (ஆண்பால் - பெண்பால்)',
        pairs: [
          { left: 'அண்ணன்', right: 'அண்ணி' },
          { left: 'தம்பி', right: 'தங்கை' },
          { left: 'தாத்தா', right: 'பாட்டி' },
          { left: 'மாமா', right: 'அத்தை' }
        ]
      }
    ]
  },
  // --- Grade 4 Week 3 Worksheet (Vacation) ---
  {
    id: 'ws_g4_w3_vacation',
    title: 'Grade 4 - Week 3 (விடுமுறை)',
    topic: 'Vocabulary & Case Endings',
    minWeek: 3,
    maxWeek: 3,
    questions: [
      {
        id: 'q1_opp_match',
        type: 'match',
        instruction: 'எதிர்ச்சொற்கள் (Opposites)',
        pairs: [
          { left: 'இன்பம்', right: 'துன்பம்' },
          { left: 'மகிழ்ச்சி', right: 'கவலை' },
          { left: 'வெற்றி', right: 'தோல்வி' }
        ]
      },
      {
        id: 'q2_case4_fill',
        type: 'fill_blank',
        instruction: '4th Case Ending (கு): நான் ___ சென்றேன். (கடை / கடைக்கு)',
        text: 'நான் ___ சென்றேன்.',
        answer: 'கடைக்கு',
        options: ['கடை', 'கடைக்கு']
      }
    ]
  },
  // --- Grade 4 Week 5 Worksheet (Park/Hobby) ---
  {
    id: 'ws_g4_w5_park',
    title: 'Grade 4 - Week 5 (பூங்கா)',
    topic: 'Vocabulary & Present Tense',
    minWeek: 5,
    maxWeek: 5,
    questions: [
      {
        id: 'q1_park_match',
        type: 'match',
        instruction: 'Match English to Tamil',
        pairs: [
          { left: 'Birthday', right: 'பிறந்தநாள்' },
          { left: 'Happiness', right: 'மகிழ்ச்சி' },
          { left: 'Victory', right: 'வெற்றி' },
          { left: 'Field', right: 'திடல்' }
        ]
      },
      {
        id: 'q2_present_fill',
        type: 'fill_blank',
        instruction: 'Present Tense (நிகழ்காலம்): அவன் பாடம் ___. (படித்தான் / படிக்கிறான்)',
        text: 'அவன் பாடம் ___.',
        answer: 'படிக்கிறான்',
        options: ['படித்தான்', 'படிக்கிறான்']
      }
    ]
  },
  // --- Grade 4 Week 6 Worksheet (Present Tense & 6th Case) ---
  {
    id: 'ws_g4_w6_grammar',
    title: 'Grade 4 - Week 6 (இலக்கணம்)',
    topic: 'Grammar',
    minWeek: 6,
    maxWeek: 6,
    questions: [
      {
        id: 'q1_case6_match',
        type: 'match',
        instruction: '6th Case Ending (அது/உடைய): Match appropriately',
        pairs: [
          { left: 'எனது', right: 'My' },
          { left: 'உனது', right: 'Your' },
          { left: 'அவனுடைய', right: 'His' },
          { left: 'அவளுடைய', right: 'Her' }
        ]
      }
    ]
  },
  // --- Grade 4 Week 7 Worksheet (Gender & 7th Case) ---
  {
    id: 'ws_g4_w7_gender',
    title: 'Grade 4 - Week 7 (ஆண்பால் - பெண்பால்)',
    topic: 'Grammar',
    minWeek: 7,
    maxWeek: 7,
    questions: [
      {
        id: 'q1_gender_classify',
        type: 'classify',
        instruction: 'Sort by Gender (வகைப்படுத்துக)',
        categories: ['ஆண்பால் (Male)', 'பெண்பால் (Female)'],
        items: [
          { text: 'அரசன்', categoryIndex: 0 },
          { text: 'அரசி', categoryIndex: 1 },
          { text: 'மாணவன்', categoryIndex: 0 },
          { text: 'மாணவி', categoryIndex: 1 },
          { text: 'சிறுவன்', categoryIndex: 0 },
          { text: 'சிறுமி', categoryIndex: 1 }
        ]
      }
    ]
  },
  // --- Grade 4 Week 9 Worksheet (Elephant & 8th Case) ---
  {
    id: 'ws_g4_w9_elephant',
    title: 'Grade 4 - Week 9 (யானை)',
    topic: 'Vocabulary & 8th Case',
    minWeek: 9,
    maxWeek: 9,
    questions: [
      {
        id: 'q1_elephant_match',
        type: 'match',
        instruction: 'Match English to Tamil',
        pairs: [
          { left: 'Elephant', right: 'யானை' },
          { left: 'Trunk', right: 'தும்பிக்கை' },
          { left: 'Tusk', right: 'தந்தம்' },
          { left: 'Forest', right: 'காடு' }
        ]
      }
    ]
  },
  // --- Grade 4 Week 14 Worksheet (Zoo & Past Tense) ---
  {
    id: 'ws_g4_w14_zoo',
    title: 'Grade 4 - Week 14 (விலங்கியல் பூங்கா)',
    topic: 'Vocabulary & Past Tense',
    minWeek: 14,
    maxWeek: 14,
    questions: [
      {
        id: 'q1_past_fill',
        type: 'fill_blank',
        instruction: 'Past Tense (இறந்தகாலம்): நேற்று நான் பூங்காவிற்கு ___. (சென்றேன் / செல்கிறேன்)',
        text: 'நேற்று நான் பூங்காவிற்கு ___.',
        answer: 'சென்றேன்',
        options: ['சென்றேன்', 'செல்கிறேன்']
      }
    ]
  },
  // --- Grade 4 Week 17 Worksheet (Pongal) ---
  {
    id: 'ws_g4_w17_pongal',
    title: 'Grade 4 - Week 17 (பொங்கல்)',
    topic: 'Culture & Vocabulary',
    minWeek: 17,
    maxWeek: 17,
    questions: [
      {
        id: 'q1_pongal_match',
        type: 'match',
        instruction: 'Match Pongal related words',
        pairs: [
          { left: 'Sun', right: 'சூரியன்' },
          { left: 'Sugarcane', right: 'கரும்பு' },
          { left: 'Pot', right: 'பானை' },
          { left: 'Rangoli', right: 'கோலம்' }
        ]
      }
    ]
  },
  // --- Grade 4 Week 18 Worksheet (Future Tense) ---
  {
    id: 'ws_g4_w18_future',
    title: 'Grade 4 - Week 18 (எதிர்காலம்)',
    topic: 'Grammar',
    minWeek: 18,
    maxWeek: 18,
    questions: [
      {
        id: 'q1_future_fill',
        type: 'fill_blank',
        instruction: 'Future Tense (எதிர்காலம்): நாளை மழை ___. (பெய்தது / பெய்யும்)',
        text: 'நாளை மழை ___.',
        answer: 'பெய்யும்',
        options: ['பெய்தது', 'பெய்யும்']
      }
    ]
  },
  // --- Grade 4 Week 26 Worksheet (Grocery Store) ---
  {
    id: 'ws_g4_w26_grocery',
    title: 'Grade 4 - Week 26 (மளிகைக் கடை)',
    topic: 'Vocabulary',
    minWeek: 26,
    maxWeek: 26,
    questions: [
      {
        id: 'q1_grocery_match',
        type: 'match',
        instruction: 'Match English to Tamil',
        pairs: [
          { left: 'Sugar', right: 'சர்க்கரை' },
          { left: 'Rice', right: 'அரிசி' },
          { left: 'Vegetable', right: 'காய்கறி' },
          { left: 'Market', right: 'சந்தை' }
        ]
      }
    ]
  },
  {
    id: 'ws_4_vocab',
    title: 'Vocabulary & Letters (சொற்கள்)',
    topic: 'Vocabulary',
    minWeek: 7,
    maxWeek: 8,
    questions: [
      {
        id: 'q1_vocab_fill',
        type: 'fill_blank',
        instruction: 'Fill in the missing letter: ப__ளி (School)',
        text: 'ப__ளி',
        answer: 'ள்'
      },
      {
        id: 'q2_vocab_match',
        type: 'match',
        instruction: 'Match English to Tamil',
        pairs: [
          { left: 'Tomato', right: 'தக்காளி' },
          { left: 'Potato', right: 'உருளைக்கிழங்கு' },
          { left: 'Banana', right: 'வாழைப்பழம்' },
          { left: 'Book', right: 'புத்தகம்' }
        ]
      }
    ]
  },

  // --- Weeks 9-12: Opposites & Sentences ---
  {
    id: 'ws_5_opposites',
    title: 'Opposites (எதிர்ச்சொற்கள்)',
    topic: 'Vocabulary',
    minWeek: 9,
    maxWeek: 10,
    questions: [
      {
        id: 'q1_opp_match',
        type: 'match',
        instruction: 'Match Opposites (எதிர்ச்சொல்)',
        pairs: [
          { left: 'பெரிய', right: 'சிறிய' },
          { left: 'மேலே', right: 'கீழே' },
          { left: 'உள்ளே', right: 'வெளியே' },
          { left: 'இன்பம்', right: 'துன்பம்' },
          { left: 'இரவு', right: 'பகல்' },
          { left: 'வேகமாக', right: 'மெதுவாக' }
        ]
      },
      {
        id: 'q2_opp_fill',
        type: 'fill_blank',
        instruction: 'Complete the opposite: காலை x ___',
        text: 'காலை x ___',
        answer: 'மாலை'
      }
    ]
  },
  {
    id: 'ws_6_sentences',
    title: 'Sentence Formation (வாக்கியம்)',
    topic: 'Grammar',
    minWeek: 11,
    maxWeek: 12,
    questions: [
      {
        id: 'q1_sent_fill',
        type: 'fill_blank',
        instruction: 'Choose correct word: நான் ___ சென்றேன். (கடைக்கு / கடையால்)',
        text: 'நான் ___ சென்றேன்.',
        answer: 'கடைக்கு',
        options: ['கடைக்கு', 'கடையால்']
      },
      {
        id: 'q2_sent_fill',
        type: 'fill_blank',
        instruction: 'Choose correct word: கிளி ___ தின்றது. (பழம் / பழத்தை)',
        text: 'கிளி ___ தின்றது.',
        answer: 'பழம்',
        options: ['பழம்', 'பழத்தை']
      }
    ]
  },

  // --- Weeks 13-16: Case Endings ---
  {
    id: 'ws_7_case_1',
    title: 'Case Endings - Part 1 (வேற்றுமை உருபு)',
    topic: 'Grammar',
    minWeek: 13,
    maxWeek: 14,
    questions: [
      {
        id: 'q1_case_match',
        type: 'match',
        instruction: 'Match Word + Case',
        pairs: [
          { left: 'சிங்கம் + ஐ', right: 'சிங்கத்தை' },
          { left: 'மரம் + இல்', right: 'மரத்தில்' },
          { left: 'வீடு + கு', right: 'வீட்டிற்கு' },
          { left: 'கத்தி + ஆல்', right: 'கத்தியால்' }
        ]
      },
      {
        id: 'q2_case_fill',
        type: 'fill_blank',
        instruction: 'வேலன் ___ வாங்கினான். (பரிசு / பரிசால்)',
        text: 'வேலன் ___ வாங்கினான்.',
        answer: 'பரிசு',
        options: ['பரிசு', 'பரிசால்']
      }
    ]
  },
  {
    id: 'ws_8_case_2',
    title: 'Case Endings - Part 2 (வேற்றுமை உருபு)',
    topic: 'Grammar',
    minWeek: 15,
    maxWeek: 16,
    questions: [
      {
        id: 'q1_case_fill',
        type: 'fill_blank',
        instruction: 'மதி ___ வரைந்தாள். (ஓவியத்தின் / ஓவியத்தை)',
        text: 'மதி ___ வரைந்தாள்.',
        answer: 'ஓவியத்தை',
        options: ['ஓவியத்தின்', 'ஓவியத்தை']
      },
      {
        id: 'q2_case_fill',
        type: 'fill_blank',
        instruction: 'நேற்று அகிலன் ___ சென்றான். (காட்டில் / காட்டிற்கு)',
        text: 'நேற்று அகிலன் ___ சென்றான்.',
        answer: 'காட்டிற்கு',
        options: ['காட்டில்', 'காட்டிற்கு']
      },
      {
        id: 'q3_case_fill',
        type: 'fill_blank',
        instruction: 'தேங்காய் தென்னை ___ விழுந்தது. (மரத்தால் / மரத்திலிருந்து)',
        text: 'தேங்காய் தென்னை ___ விழுந்தது.',
        answer: 'மரத்திலிருந்து',
        options: ['மரத்தால்', 'மரத்திலிருந்து']
      }
    ]
  },

  // --- Weeks 17-20: Tenses ---
  {
    id: 'ws_9_tenses_1',
    title: 'Tenses - Part 1 (காலங்கள்)',
    topic: 'Grammar',
    minWeek: 17,
    maxWeek: 18,
    questions: [
      {
        id: 'q1_tense_match',
        type: 'match',
        instruction: 'Match Time with Verb',
        pairs: [
          { left: 'நேற்று (Yesterday)', right: 'வந்தேன் (Came)' },
          { left: 'இன்று (Today)', right: 'வருகிறேன் (Coming)' },
          { left: 'நாளை (Tomorrow)', right: 'வருவேன் (Will Come)' }
        ]
      },
      {
        id: 'q2_tense_classify',
        type: 'classify',
        instruction: 'Sort verbs by Tense',
        categories: ['இறந்தகாலம் (Past)', 'நிகழ்காலம் (Present)', 'எதிர்காலம் (Future)'],
        items: [
          { text: 'பாடினாள்', categoryIndex: 0 },
          { text: 'செய்கிறான்', categoryIndex: 1 },
          { text: 'பாடுவான்', categoryIndex: 2 },
          { text: 'ஓடினான்', categoryIndex: 0 },
          { text: 'நடக்கின்றன', categoryIndex: 1 }
        ]
      }
    ]
  },
  {
    id: 'ws_10_tenses_2',
    title: 'Tenses - Part 2 (காலங்கள்)',
    topic: 'Grammar',
    minWeek: 19,
    maxWeek: 20,
    questions: [
      {
        id: 'q1_tense_fill',
        type: 'fill_blank',
        instruction: 'அண்ணன் பாடம் ___ (படி / நிகழ்காலம்)',
        text: 'அண்ணன் பாடம் ___',
        answer: 'படிக்கிறான்',
        options: ['படிக்கிறான்', 'படித்தான்', 'படிப்பான்']
      },
      {
        id: 'q2_tense_fill',
        type: 'fill_blank',
        instruction: 'மாடுகள் வண்டி ___ (இழு / எதிர்காலம்)',
        text: 'மாடுகள் வண்டி ___',
        answer: 'இழுக்கும்',
        options: ['இழுத்தது', 'இழுக்கிறது', 'இழுக்கும்']
      },
      {
        id: 'q3_tense_fill',
        type: 'fill_blank',
        instruction: 'கமலா கவிதை ___ (எழுது / இறந்தகாலம்)',
        text: 'கமலா கவிதை ___',
        answer: 'எழுதினாள்',
        options: ['எழுதுவாள்', 'எழுதுகிறாள்', 'எழுதினாள்']
      }
    ]
  },

  // --- Weeks 21-24: Person (Moovidam) ---
  {
    id: 'ws_11_person',
    title: 'Person: 1st, 2nd, 3rd (மூவிடப்பெயர்)',
    topic: 'Grammar',
    minWeek: 21,
    maxWeek: 22,
    questions: [
      {
        id: 'q1_person_classify',
        type: 'classify',
        instruction: 'Sort by Person',
        categories: ['தன்மை (1st)', 'முன்னிலை (2nd)', 'படர்க்கை (3rd)'],
        items: [
          { text: 'நான் (I)', categoryIndex: 0 },
          { text: 'நாங்கள் (We)', categoryIndex: 0 },
          { text: 'நீ (You)', categoryIndex: 1 },
          { text: 'நீங்கள் (You all)', categoryIndex: 1 },
          { text: 'அவன் (He)', categoryIndex: 2 },
          { text: 'அவள் (She)', categoryIndex: 2 }
        ]
      },
      {
        id: 'q2_person_fill',
        type: 'fill_blank',
        instruction: '___ கடைக்குச் சென்றேன். (நீ / நான்)',
        text: '___ கடைக்குச் சென்றேன்.',
        answer: 'நான்',
        options: ['நீ', 'நான்']
      }
    ]
  },
  {
    id: 'ws_12_pronouns',
    title: 'Pronouns & Verbs (பெயர்ச்சொல் - வினைச்சொல்)',
    topic: 'Grammar',
    minWeek: 23,
    maxWeek: 24,
    questions: [
      {
        id: 'q1_pro_match',
        type: 'match',
        instruction: 'Match Subject to Verb',
        pairs: [
          { left: 'நான்', right: 'ஓடினேன்' },
          { left: 'நீ', right: 'ஓடினாய்' },
          { left: 'அவன்', right: 'ஓடினான்' },
          { left: 'அவள்', right: 'ஓடினாள்' },
          { left: 'அவர்கள்', right: 'ஓடினார்கள்' }
        ]
      }
    ]
  },

  // --- Weeks 25-32: Reading Comprehension ---
  {
    id: 'ws_13_reading_1',
    title: 'Reading: Tamil New Year (தமிழ் புத்தாண்டு)',
    topic: 'Reading',
    minWeek: 25,
    maxWeek: 28,
    questions: [
      {
        id: 'q1_passage',
        type: 'passage',
        instruction: 'Read the passage and answer.',
        passageTitle: 'தமிழ் புத்தாண்டு',
        passageText: 'சித்திரை மாதம் முதல் தமிழ் வருடப் பிறப்புக் கொண்டாடப்படுகிறது. அன்று மீராவின் அம்மா முருங்கைக்காய்ச் சாம்பார் சமைத்தார். அதனுடன் முட்டைக்கோசு பொரியலும், கீரை மசியலும் செய்திருந்தார். மீராவுக்குப் பிடித்த அப்பளமும், வடை, பாயசமும் இருந்தன.',
        subQuestions: [
          {
            id: 'pq1',
            type: 'fill_blank',
            instruction: 'தமிழ் வருடப் பிறப்பு எந்த மாதம் கொண்டாடப்படுகிறது?',
            text: 'மாதம்: ___',
            answer: 'சித்திரை'
          },
          {
            id: 'pq2',
            type: 'fill_blank',
            instruction: 'அம்மா என்ன குழம்பு வைத்தார்?',
            text: 'குழம்பு: ___',
            answer: 'சாம்பார்'
          }
        ]
      }
    ]
  },
  {
    id: 'ws_14_reading_2',
    title: 'Reading: The Zoo (விலங்கியல் பூங்கா)',
    topic: 'Reading',
    minWeek: 29,
    maxWeek: 32,
    questions: [
      {
        id: 'q2_passage',
        type: 'passage',
        instruction: 'Read and answer.',
        passageTitle: 'விலங்கியல் பூங்கா',
        passageText: 'நான் விலங்கியல் பூங்காவுக்கு என் மாமாவுடன் சென்றேன். அங்கே பல விலங்குகளைப் பார்த்தேன். யானை, புலி, சிங்கம், கரடி ஆகியவற்றை கண்டேன். குரங்குகள் மரத்தில் தாவி விளையாடின. எனக்கு மிகவும் மகிழ்ச்சியாக இருந்தது.',
        subQuestions: [
          {
            id: 'pq1',
            type: 'fill_blank',
            instruction: 'நான் யாருடன் பூங்காவுக்குச் சென்றேன்?',
            text: 'விடை: ___',
            answer: 'மாமாவுடன்'
          },
          {
            id: 'pq2',
            type: 'fill_blank',
            instruction: 'எந்த விலங்கு மரத்தில் தாவியது?',
            text: 'விடை: ___',
            answer: 'குரங்கு'
          }
        ]
      }
    ]
  }
];

