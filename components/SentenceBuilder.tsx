import React, { useState, useMemo, useRef } from 'react';
import { formTamilSentence } from '../services/geminiService';
import { combineWordAndCase } from '../utils/tamilGrammar';
import { Noun } from '../types';

// --- Types ---

type WordType = 'subject' | 'object' | 'verb' | 'time' | 'conjunction' | 'adjective';

interface SentencePart {
  id: string;
  rootWord: string;
  displayWord: string;
  english: string;
  type: WordType;
  caseEnding?: string; // e.g., 'ai', 'ku'
  tense?: string; // e.g., 'past', 'present', 'future'
}

interface WordDef {
  ta: string;
  en: string;
  type: WordType;
}

// --- Constants ---

const CASE_OPTIONS = [
  { label: 'No Change (Subject)', value: 'first', desc: 'Subject' },
  { label: 'ஐ (Ai - Object)', value: 'ai', desc: 'Accusative' },
  { label: 'ஆல் (Aal - By)', value: 'aal', desc: 'Instrumental' },
  { label: 'ஓடு (Odu - With)', value: 'odu', desc: 'Sociative' },
  { label: 'கு (Ku - To)', value: 'ku', desc: 'Dative' },
  { label: 'இன் (In - From)', value: 'in', desc: 'Genitive' },
  { label: 'அது (Adhu - Of)', value: 'adhu', desc: 'Possessive' },
  { label: 'இல் (Il - At/In)', value: 'il', desc: 'Locative' },
];

const TENSE_OPTIONS = [
  { label: 'Past (இறந்த காலம்)', value: 'past', desc: 'Happened' },
  { label: 'Present (நிகழ் காலம்)', value: 'present', desc: 'Happening' },
  { label: 'Future (எதிர்காலம்)', value: 'future', desc: 'Will Happen' },
];

// Expanded Word Banks for better variety
const EXTENDED_WORD_BANK: Record<string, WordDef[]> = {
  subjects: [
    // Pronouns
    { ta: 'நான்', en: 'I', type: 'subject' },
    { ta: 'நாங்கள்', en: 'We', type: 'subject' },
    { ta: 'நீ', en: 'You', type: 'subject' },
    { ta: 'அவன்', en: 'He', type: 'subject' },
    { ta: 'அவள்', en: 'She', type: 'subject' },
    { ta: 'அவர்கள்', en: 'They', type: 'subject' },
    { ta: 'அது', en: 'It', type: 'subject' },
    // Common People/Roles
    { ta: 'ஆசிரியர்', en: 'Teacher', type: 'subject' },
    { ta: 'அம்மா', en: 'Mother', type: 'subject' },
    { ta: 'அப்பா', en: 'Father', type: 'subject' },
    { ta: 'நண்பன்', en: 'Friend (M)', type: 'subject' },
    { ta: 'தோழி', en: 'Friend (F)', type: 'subject' },
    // Animals
    { ta: 'நாய்', en: 'Dog', type: 'subject' },
    { ta: 'பூனை', en: 'Cat', type: 'subject' },
  ],
  adjectives: [
    { ta: 'அழகான', en: 'Beautiful', type: 'adjective' },
    { ta: 'பெரிய', en: 'Big', type: 'adjective' },
    { ta: 'சிறிய', en: 'Small', type: 'adjective' },
    { ta: 'வேகமான', en: 'Fast', type: 'adjective' },
    { ta: 'புதிய', en: 'New', type: 'adjective' },
    { ta: 'பழைய', en: 'Old', type: 'adjective' },
    { ta: 'உயரமான', en: 'Tall', type: 'adjective' },
    { ta: 'நீளமான', en: 'Long', type: 'adjective' },
    { ta: 'நல்ல', en: 'Good', type: 'adjective' },
    { ta: 'கெட்ட', en: 'Bad', type: 'adjective' },
    { ta: 'பச்சை', en: 'Green', type: 'adjective' },
    { ta: 'சிவப்பு', en: 'Red', type: 'adjective' },
  ],
  time: [
    // Time
    { ta: 'நேற்று', en: 'Yesterday', type: 'time' },
    { ta: 'இன்று', en: 'Today', type: 'time' },
    { ta: 'நாளை', en: 'Tomorrow', type: 'time' },
    { ta: 'இப்போது', en: 'Now', type: 'time' },
    { ta: 'காலையில்', en: 'In morning', type: 'time' },
    { ta: 'மாலையில்', en: 'In evening', type: 'time' },
    // Places (often function as locative context)
    { ta: 'பள்ளியில்', en: 'At School', type: 'time' },
    { ta: 'வீட்டில்', en: 'At Home', type: 'time' },
    { ta: 'கடையில்', en: 'At Shop', type: 'time' },
    { ta: 'பூங்காவில்', en: 'In Park', type: 'time' },
    { ta: 'கோவிலில்', en: 'In Temple', type: 'time' },
  ],
  verbs: [
    // Common Actions
    { ta: 'படி', en: 'Read', type: 'verb' },
    { ta: 'எழுது', en: 'Write', type: 'verb' },
    { ta: 'செல்', en: 'Go', type: 'verb' },
    { ta: 'வா', en: 'Come', type: 'verb' },
    { ta: 'பார்', en: 'See/Look', type: 'verb' },
    { ta: 'கேள்', en: 'Ask/Hear', type: 'verb' },
    { ta: 'பேசு', en: 'Speak', type: 'verb' },
    // Physical Actions
    { ta: 'விளையாடு', en: 'Play', type: 'verb' },
    { ta: 'ஓடு', en: 'Run', type: 'verb' },
    { ta: 'நட', en: 'Walk', type: 'verb' },
    { ta: 'நில்', en: 'Stand', type: 'verb' },
    { ta: 'தூங்கு', en: 'Sleep', type: 'verb' },
    { ta: 'சாப்பிடு', en: 'Eat', type: 'verb' },
    { ta: 'குடி', en: 'Drink', type: 'verb' },
    // Transactional
    { ta: 'கொடு', en: 'Give', type: 'verb' },
    { ta: 'வாங்கு', en: 'Buy/Get', type: 'verb' },
    { ta: 'எடு', en: 'Take', type: 'verb' },
  ],
  conjunctions: [
    { ta: 'மற்றும்', en: 'And', type: 'conjunction' },
    { ta: 'ஆனால்', en: 'But', type: 'conjunction' },
    { ta: 'ஏனெனில்', en: 'Because', type: 'conjunction' },
    { ta: 'அதனால்', en: 'So', type: 'conjunction' },
    { ta: 'பிறகு', en: 'Then/After', type: 'conjunction' },
    { ta: 'அல்லது', en: 'Or', type: 'conjunction' },
    { ta: 'உடன்', en: 'With', type: 'conjunction' },
  ]
};

// --- Helper Components ---

const TypeBadge = ({ type }: { type: WordType }) => {
  const labels: Record<WordType, string> = {
    subject: 'எழுவாய் (Subject)',
    object: 'செயப்படுபொருள் (Object)',
    verb: 'பயனிலை (Verb/Predicate)',
    time: 'காலம் (Time)',
    conjunction: 'இணைப்பு (Connector)',
    adjective: 'அடைமொழி (Adjective)'
  };
  const colors: Record<WordType, string> = {
    subject: 'bg-blue-100 text-blue-700',
    object: 'bg-purple-100 text-purple-700',
    verb: 'bg-green-100 text-green-700',
    time: 'bg-orange-100 text-orange-700',
    conjunction: 'bg-pink-100 text-pink-700',
    adjective: 'bg-yellow-100 text-yellow-700'
  };
  return (
    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded whitespace-nowrap ${colors[type]}`}>
      {labels[type]}
    </span>
  );
};

// --- Main Component ---

interface SentenceBuilderProps {
  week: number;
  vocab: Noun[];
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ week, vocab }) => {
  const [parts, setParts] = useState<SentencePart[]>([]);
  const [activeTab, setActiveTab] = useState<keyof typeof EXTENDED_WORD_BANK | 'vocab'>('vocab');
  const [formedSentence, setFormedSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const idCounter = useRef(0);

  // Dynamic Vocab for the week
  const weekVocab: WordDef[] = useMemo(() => {
    return vocab.map(v => ({
      ta: v.value,
      en: v.label.split('(')[1]?.replace(')', '') || v.label,
      type: 'object' // Week words are primarily objects/nouns
    }));
  }, [vocab]);

  const hasContent = parts.length > 0;

  // -- Actions --

  const addWord = (word: WordDef) => {
    idCounter.current += 1;
    const newPart: SentencePart = {
      id: `part-${idCounter.current}`,
      rootWord: word.ta,
      displayWord: word.ta,
      english: word.en,
      type: word.type,
      caseEnding: 'first'
    };
    setParts([...parts, newPart]);
    setFormedSentence(''); // Clear old result
  };

  const removePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
    if (selectedPartId === id) setSelectedPartId(null);
  };

  const movePart = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === parts.length - 1) return;

    const newParts = [...parts];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    [newParts[index], newParts[targetIndex]] = [newParts[targetIndex], newParts[index]];
    setParts(newParts);
  };

  const updateCase = (partId: string, caseCode: string) => {
    setParts(parts.map(p => {
      if (p.id !== partId) return p;
      return {
        ...p,
        caseEnding: caseCode,
        displayWord: combineWordAndCase(p.rootWord, caseCode)
      };
    }));
    setSelectedPartId(null); // Close menu
  };

  const updateTense = (partId: string, tense: string) => {
    setParts(parts.map(p => {
      if (p.id !== partId) return p;
      return {
        ...p,
        tense: tense,
        // We don't update displayWord here because conjugation is complex; 
        // we let the AI handle it on "Auto-Form".
      };
    }));
    setSelectedPartId(null);
  };

  const handleForm = async () => {
    if (!hasContent) return;
    setLoading(true);
    setFormedSentence('');
    
    // Send root words to AI, attaching instructions for tense if present
    const aiInputs = parts.map(p => {
        if (p.type === 'verb' && p.tense) {
            return `${p.rootWord} (${p.tense} tense)`;
        }
        // Use the display word for nouns so cases are respected if manually set
        return p.displayWord;
    });

    const result = await formTamilSentence(aiInputs);
    
    setFormedSentence(result);
    setLoading(false);
  };

  const clearAll = () => {
    setParts([]);
    setFormedSentence('');
    setSelectedPartId(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      
      {/* 1. Top Section: Staging Area */}
      <div className="p-6 bg-slate-50 border-b border-gray-200 min-h-[280px] flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🧪 Sentence Lab
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tight">Handbook Page 32 • Ezhuvay, Payanilai, Seyappaduporul</p>
          </div>
          <button 
            onClick={clearAll}
            disabled={parts.length === 0}
            className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition-colors disabled:opacity-50"
          >
            Clear All
          </button>
        </div>

        {/* The Sentence Strip */}
        <div className="flex-grow flex flex-wrap items-center content-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-inner mb-4 relative min-h-[120px]">
          {parts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic pointer-events-none">
              Tap words below to add them here...
            </div>
          )}

          {parts.map((part, index) => (
            <div key={part.id} className="relative group">
              {/* Word Chip */}
              <div 
                className={`
                  relative flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 shadow-sm transition-all cursor-pointer select-none
                  ${selectedPartId === part.id ? 'ring-4 ring-blue-100 scale-105 z-20' : 'hover:-translate-y-0.5'}
                  ${part.type === 'subject' ? 'bg-blue-50 border-blue-200 text-blue-900' : ''}
                  ${part.type === 'object' ? 'bg-purple-50 border-purple-200 text-purple-900' : ''}
                  ${part.type === 'verb' ? 'bg-green-50 border-green-200 text-green-900' : ''}
                  ${part.type === 'time' ? 'bg-orange-50 border-orange-200 text-orange-900' : ''}
                  ${part.type === 'conjunction' ? 'bg-pink-50 border-pink-200 text-pink-900' : ''}
                  ${part.type === 'adjective' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : ''}
                `}
                onClick={() => {
                   // Allow manual overrides for specific types
                   if (['subject', 'object', 'verb'].includes(part.type)) {
                      setSelectedPartId(selectedPartId === part.id ? null : part.id);
                   }
                }}
              >
                <span className="text-2xl font-bold mb-0.5">{part.displayWord}</span>
                <span className="text-[11px] opacity-70 font-semibold uppercase tracking-wider">{part.english}</span>
                
                {/* Modifiers Indicators */}
                {part.tense && (
                    <span className="absolute -bottom-2 bg-green-600 text-white text-[9px] px-1.5 rounded-full shadow-sm border border-white">
                        {part.tense}
                    </span>
                )}
                
                {/* Grammar Indicator Dot */}
                {['subject', 'object', 'verb'].includes(part.type) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-[6px] text-slate-500 font-bold">✎</span>
                  </div>
                )}
              </div>

               {/* Configuration Popup */}
               {selectedPartId === part.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in overflow-hidden">
                  <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 border-b border-gray-200">
                    {part.type === 'verb' ? 'Select Tense' : 'Manual Case Override'}
                  </div>
                  <div className="max-h-56 overflow-y-auto custom-scrollbar p-1">
                    {part.type === 'verb' ? (
                        // Verb Tense Options
                        TENSE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => updateTense(part.id, opt.value)}
                                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex justify-between items-center group ${part.tense === opt.value ? 'bg-green-50 text-green-700 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                            >
                                <div>
                                    <span className="block">{opt.label}</span>
                                    <span className="text-[10px] text-gray-400 font-normal group-hover:text-gray-500">{opt.desc}</span>
                                </div>
                                {part.tense === opt.value && <span>✓</span>}
                            </button>
                        ))
                    ) : (
                        // Noun Case Options
                        CASE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => updateCase(part.id, opt.value)}
                                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-50 transition-colors flex justify-between items-center ${part.caseEnding === opt.value ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700'}`}
                            >
                                <span>{opt.label}</span>
                                {part.caseEnding === opt.value && <span>✓</span>}
                            </button>
                        ))
                    )}
                  </div>
                </div>
              )}

              {/* Hover Controls (Remove / Move) */}
              {selectedPartId !== part.id && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white shadow-sm rounded-full px-1 border border-gray-100">
                  <button onClick={() => movePart(index, 'left')} className="p-1 hover:text-blue-600 text-gray-400" disabled={index === 0}>←</button>
                  <button onClick={() => removePart(part.id)} className="p-1 hover:text-red-600 text-gray-400">×</button>
                  <button onClick={() => movePart(index, 'right')} className="p-1 hover:text-blue-600 text-gray-400" disabled={index === parts.length - 1}>→</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex justify-end items-center mt-auto">
          <button
            onClick={handleForm}
            disabled={loading || !hasContent}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? <span className="animate-spin">✨</span> : <span>✨ Auto-Form Sentence</span>}
          </button>
        </div>

        {/* Result Area */}
        {formedSentence && (
          <div className="mt-6 p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-center animate-fade-in shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
             <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">AI Constructed Sentence</p>
             <p className="text-2xl md:text-3xl font-bold text-indigo-900 leading-relaxed">{formedSentence}</p>
          </div>
        )}
      </div>

      {/* 2. Bottom Section: Word Bank */}
      <div className="flex-1 bg-white flex flex-col min-h-0">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'vocab' ? 'border-purple-500 text-purple-700 bg-purple-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            📚 Week {week} Vocab
            <span className="bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded-full text-[10px]">{weekVocab.length}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'subjects' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            👤 Subjects
          </button>

          <button
            onClick={() => setActiveTab('adjectives')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'adjectives' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            🎨 Adjectives
          </button>

          <button
            onClick={() => setActiveTab('verbs')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'verbs' ? 'border-green-500 text-green-700 bg-green-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            ⚡ Verbs
          </button>

          <button
            onClick={() => setActiveTab('time')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'time' ? 'border-orange-500 text-orange-700 bg-orange-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            ⏱️ Time
          </button>

          <button
            onClick={() => setActiveTab('conjunctions')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'conjunctions' ? 'border-pink-500 text-pink-700 bg-pink-50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
          >
            🔗 Connectors
          </button>
        </div>

        {/* Word Grid */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {activeTab === 'vocab' ? (
              weekVocab.length > 0 ? (
                weekVocab.map((w, i) => (
                    <WordButton key={i} word={w} onClick={() => addWord(w)} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-8 italic">No specific vocabulary for this week. Use the other tabs!</div>
              )
            ) : (
              EXTENDED_WORD_BANK[activeTab].map((w, i) => (
                <WordButton key={i} word={w} onClick={() => addWord(w)} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WordButton: React.FC<{ word: WordDef; onClick: () => void }> = ({ word, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all text-left group"
  >
    <div className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-700">{word.ta}</div>
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{word.en}</span>
      <TypeBadge type={word.type} />
    </div>
  </button>
);

export default SentenceBuilder;
