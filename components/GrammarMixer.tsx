import React, { useMemo, useState } from 'react';
import { combineWordAndCase, getTamilCaseSuffix } from '../utils/tamilGrammar';
import { Noun } from '../types';

interface GrammarMixerProps {
  nouns: Noun[];
}

const CASES = [
  { label: 'முதல் (1st: Subject)', value: 'first', challengeSuffix: 'பெயர்' },
  { label: 'இரண்டாம் (2nd: ஐ)', value: 'ai', challengeSuffix: 'ஐ' },
  { label: 'மூன்றாம் (3rd: ஆல்)', value: 'aal', challengeSuffix: 'ஆல்' },
  { label: 'மூன்றாம் (3rd: ஓடு, உடன்)', value: 'odu', challengeSuffix: 'ஓடு' },
  { label: 'நான்காம் (4th: கு)', value: 'ku', challengeSuffix: 'கு' },
  { label: 'ஐந்தாம் (5th: இன், இருந்து)', value: 'in', challengeSuffix: 'இன்' },
  { label: 'ஆறாம் (6th: அது, உடைய)', value: 'adhu', challengeSuffix: 'அது' },
  { label: 'ஏழாம் (7th: இல், இடம்)', value: 'il', challengeSuffix: 'இல்' },
  { label: 'எட்டாம் (8th: விளி)', value: 'vili', challengeSuffix: 'ஏ' },
] as const;

type GrammarCase = (typeof CASES)[number];
type Challenge = { noun: Noun; case: GrammarCase };

const shuffle = <T,>(items: T[]): T[] => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const buildChallengeOptions = (noun: Noun, selectedCase: GrammarCase): string[] => {
  const correct = combineWordAndCase(noun.value, selectedCase.value);
  const options = new Set<string>([correct]);
  const alternateCases = shuffle(CASES.filter(c => c.value !== 'first' && c.value !== selectedCase.value));

  for (const alternateCase of alternateCases) {
    options.add(combineWordAndCase(noun.value, alternateCase.value));
    if (options.size >= 4) break;
  }

  if (options.size < 4) {
    options.add(noun.value);
  }

  return shuffle(Array.from(options).slice(0, 4));
};

const GrammarMixer: React.FC<GrammarMixerProps> = ({ nouns }) => {
  const [mode, setMode] = useState<'practice' | 'challenge'>('practice');

  // Practice Mode State
  const [selectedNoun, setSelectedNoun] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<string>('');

  // Practice Mode: Auto-calculate result
  const result = useMemo(() => {
    if (selectedNoun && selectedCase) {
      return combineWordAndCase(selectedNoun, selectedCase);
    }
    return null;
  }, [selectedNoun, selectedCase]);

  // Challenge Mode State
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [challengeOptions, setChallengeOptions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [challengeResult, setChallengeResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  // Challenge Mode: Start Game
  const startChallenge = () => {
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      if (!randomNoun) return;

      // Avoid 'first' case for challenge as it's too easy (no change)
      const validCases = CASES.filter(c => c.value !== 'first');
      const randomCase = validCases[Math.floor(Math.random() * validCases.length)];

      setChallenge({ noun: randomNoun, case: randomCase });
      setChallengeOptions(buildChallengeOptions(randomNoun, randomCase));
      setUserAnswer('');
      setChallengeResult(null);
  };

  const checkAnswer = (selectedCombined: string) => {
      if (!challenge) return;

      setUserAnswer(selectedCombined);
      const correct = combineWordAndCase(challenge.noun.value, challenge.case.value);
      if (selectedCombined === correct) {
          setChallengeResult('correct');
          setScore(s => s + 10);
      } else {
          setChallengeResult('wrong');
      }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
         <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">⚖️</div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Grammar Mixer</h2>
                <p className="text-sm text-gray-500">Master Case Endings (Vethrumai Urupu)</p>
            </div>
         </div>
         <div className="flex bg-gray-100 p-1 rounded-lg">
             <button
                onClick={() => setMode('practice')}
                className={`px-3 py-1 text-sm font-bold rounded-md transition-all ${mode === 'practice' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
             >
                 Practice
             </button>
             <button
                onClick={() => { setMode('challenge'); startChallenge(); }}
                className={`px-3 py-1 text-sm font-bold rounded-md transition-all ${mode === 'challenge' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
             >
                 Challenge
             </button>
         </div>
      </div>

      {mode === 'practice' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Noun Selection */}
            <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Word</h3>
            <div className="flex flex-col gap-2">
                {nouns.map((noun) => (
                <button
                    key={noun.value}
                    onClick={() => setSelectedNoun(noun.value)}
                    className={`px-4 py-3 rounded border text-left transition-all flex justify-between items-center text-sm ${
                    selectedNoun === noun.value
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                >
                    <span>{noun.label}</span>
                    {selectedNoun === noun.value && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                </button>
                ))}
            </div>
            </div>

            {/* Case Selection */}
            <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Case Ending</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CASES.map((c) => (
                <button
                    key={c.value}
                    onClick={() => setSelectedCase(c.value)}
                    className={`px-3 py-2 rounded border text-sm transition-all text-left ${
                    selectedCase === c.value
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                >
                    {c.label}
                </button>
                ))}
            </div>
            </div>

            {/* Result Section */}
            <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100">
            <div className={`rounded-lg p-6 text-center transition-all ${
                result
                ? 'bg-slate-50 border border-slate-200'
                : 'bg-gray-50 border border-dashed border-gray-300'
            }`}>
                {result ? (
                <div className="animate-fade-in">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Combined Output</div>
                    <div className="text-3xl font-bold text-slate-800 mb-2">
                    {result}
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded border border-gray-200 text-sm text-slate-600 font-medium shadow-sm">
                    <span>{selectedNoun}</span>
                    <span className="text-slate-300">+</span>
                    <span>{getTamilCaseSuffix(selectedCase)}</span>
                    </div>
                </div>
                ) : (
                <div className="text-gray-400 py-4 flex flex-col items-center justify-center h-full">
                    <span className="text-2xl mb-2 opacity-50">⌨️</span>
                    <span className="text-sm">Select both a word and a case to view the result</span>
                </div>
                )}
            </div>
            </div>
        </div>
      ) : (
          <div className="text-center py-6">
              <div className="flex justify-between items-center mb-6 px-4">
                  <div className="text-sm font-bold text-gray-500">Challenge Mode</div>
                  <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">Score: {score}</div>
              </div>

              {challenge && (
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <p className="text-gray-500 mb-2 text-sm uppercase tracking-wide font-bold">Combine these:</p>
                        <div className="flex items-center justify-center gap-4 text-2xl font-bold text-slate-800">
                            <span className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">{challenge.noun.value}</span>
                            <span className="text-gray-300">+</span>
                            <span className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">{challenge.case.challengeSuffix}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                        {challengeOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => checkAnswer(opt)}
                                disabled={!!challengeResult}
                                className={`p-4 rounded-xl border-2 text-lg font-bold transition-all ${
                                    challengeResult && opt === combineWordAndCase(challenge.noun.value, challenge.case.value)
                                     ? 'bg-green-500 text-white border-green-600'
                                     : challengeResult && userAnswer === opt
                                        ? 'bg-red-100 text-red-600 border-red-200'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-md'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {challengeResult && (
                        <div className="animate-fade-in">
                            {challengeResult === 'correct' ? (
                                <div className="text-green-600 font-bold mb-4">✨ Correct! Great job!</div>
                            ) : (
                                <div className="text-red-500 font-bold mb-4">
                                    Oops! The correct answer is {combineWordAndCase(challenge.noun.value, challenge.case.value)}
                                </div>
                            )}
                            <button
                                onClick={startChallenge}
                                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700"
                            >
                                Next Challenge →
                            </button>
                        </div>
                    )}
                </div>
              )}
          </div>
      )}
    </div>
  );
};

export default GrammarMixer;
