
export enum CaseEnding {
  FIRST = 'முதல் (First)',
  SECOND = 'இரண்டாம் (Ai)',
  THIRD_AAL = 'மூன்றாம் (Aal)',
  THIRD_ODU = 'மூன்றாம் (Odu)',
  FOURTH = 'நான்காம் (Ku)',
  FIFTH_IL = 'ஐந்தாம் (Il - From)',
  SIXTH = 'ஆறாம் (Adhu)',
  SEVENTH = 'ஏழாம் (Il - In)',
  EIGHTH = 'எட்டாம் (Vili)'
}

export interface Noun {
  label: string;
  value: string;
  type: string; // 'm' | 'du' | 'ru' | 'i' | 'y' etc.
}

export interface DictationWord {
  tamil: string;
  english: string;
  week: number;
  visualPrompt?: string;
}

export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface Thirukkural {
  id: number;
  kural: string[];
  meaning: string;
  wordMeanings?: WordMeaning[];
}

export interface GradeEntry {
  week: number;
  homework: number;
  participation: number;
  attendance: number;
  isLate: boolean;
}

export interface ProjectDef {
  id: number;
  title: string;
  topic: string;
  startWeek: number;
  dueWeek: number;
  minSentences: number;
  requirements: string[];
}

export interface WeeklyTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface WeeklySyllabus {
  week: number;
  topic: string;
  tasks: WeeklyTask[];
  grammarWords: Noun[];
  kuralId: number; // ID of the Kural to study this week
  phoneticFocus: string; // Key for phonetics group
  youtubeLinks?: { title: string; url: string }[];
}

// Worksheet Types
export type QuestionType = 'fill_blank' | 'match' | 'classify' | 'mcq' | 'passage';

export interface BaseQuestion {
  id: string;
  instruction: string;
  type: QuestionType;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  text: string; // "கப்பல் நீரில் மிதந்தது. {answer} நீரில் மிதந்தன."
  answer: string;
  options?: string[]; // Optional dropdown options
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: { left: string; right: string }[];
}

export interface ClassifyQuestion extends BaseQuestion {
  type: 'classify';
  categories: string[];
  items: { text: string; categoryIndex: number }[];
}

export interface PassageQuestion extends BaseQuestion {
  type: 'passage';
  passageTitle: string;
  passageText: string;
  subQuestions: FillBlankQuestion[]; // Reusing fill blank logic for Q&A
}

export type WorksheetItem = FillBlankQuestion | MatchQuestion | ClassifyQuestion | PassageQuestion;

export interface Worksheet {
  id: string;
  title: string;
  topic: string;
  minWeek: number; // New field to schedule worksheet
  maxWeek: number; // New field to schedule worksheet
  questions: WorksheetItem[];
}
