import React, { useState, useEffect, useRef } from 'react';
import { DICTATION_WORDS } from '../constants';
import { generateTamilSpeech } from '../services/geminiService';

interface DictationDojoProps {
  week: number;
}

const DictationDojo: React.FC<DictationDojoProps> = ({ week }) => {
  const activeWords = React.useMemo(() => {
    const w = DICTATION_WORDS.filter(word => word.week === week);
    return w.length > 0 ? w : DICTATION_WORDS.filter(word => word.week === 1);
  }, [week]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const nextWord = () => {
    if (currentIndex < activeWords.length - 1) {
        setCurrentIndex(prev => prev + 1);
    } else {
        setIsComplete(true);
    }
  };

  if (isComplete) {
      return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 font-sans h-full flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Week {week} Words Complete!</h2>
              <p className="text-gray-500 mb-6">You've mastered all {activeWords.length} dictation words for this week.</p>
              <button 
                onClick={() => { setIsComplete(false); setCurrentIndex(0); }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                  Practice Again
              </button>
          </div>
      )
  }

  const currentWord = activeWords[currentIndex];
  if (!currentWord) return <div>No words loaded.</div>;

  return (
    <WordGame 
        key={`${week}-${currentIndex}`}
        word={currentWord}
        currentIndex={currentIndex}
        totalWords={activeWords.length}
        week={week}
        onNext={nextWord}
    />
  );
};

interface WordGameProps {
    word: { tamil: string; english: string; visualPrompt?: string };
    currentIndex: number;
    totalWords: number;
    week: number;
    onNext: () => void;
}

const WordGame: React.FC<WordGameProps> = ({ word, currentIndex, totalWords, week, onNext }) => {
  const imageUrl = word.visualPrompt 
    ? `https://loremflickr.com/400/300/${encodeURIComponent(word.visualPrompt)}`
    : `https://loremflickr.com/400/300/${encodeURIComponent(word.english)}`;
  const [scrambledLetters, setScrambledLetters] = useState<string[]>(() => {
    const letters = word.tamil.split('');
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Audio Context for TTS playback
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch { /* ignore */ }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const resetLevel = () => {
    const letters = word.tamil.split('');
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setScrambledLetters(shuffled);
    setSelectedLetters([]);
    setIsCorrect(null);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (isCorrect) return;

    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    const newScrambled = [...scrambledLetters];
    newScrambled.splice(index, 1);
    setScrambledLetters(newScrambled);

    const formedWord = newSelected.join('');
    if (formedWord === word.tamil) {
      setIsCorrect(true);
      playSound(formedWord);
    } else if (formedWord.length === word.tamil.length) {
      setIsCorrect(false);
    }
  };

  const handleBackspace = () => {
    if (selectedLetters.length === 0 || isCorrect === true) return;
    const lastLetter = selectedLetters[selectedLetters.length - 1];
    setSelectedLetters(selectedLetters.slice(0, -1));
    setScrambledLetters([...scrambledLetters, lastLetter]);
    setIsCorrect(null);
  };

  const playSound = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);

    try {
        const audioBase64 = await generateTamilSpeech(text);
        if (audioBase64) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (!audioContextRef.current) audioContextRef.current = new AudioContextClass();
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') await ctx.resume();

            const binaryString = atob(audioBase64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
            
            const dataInt16 = new Int16Array(bytes.buffer);
            const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
            const channelData = buffer.getChannelData(0);
            for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

            const source = ctx.createBufferSource();
            sourceRef.current = source;
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.onended = () => setIsPlaying(false);
            source.start(0);
            return;
        }
    } catch (error) {
        console.error(error);
    }

    if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ta-IN';
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
    } else {
        setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans h-full">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
         <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">🧠</div>
         <div>
            <h2 className="text-lg font-semibold text-gray-800">Dictation Dojo</h2>
            <p className="text-sm text-gray-500">Unscramble the words for Week {week}!</p>
         </div>
         <div className="ml-auto bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
             {currentIndex + 1} / {totalWords}
         </div>
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center">
         {word.visualPrompt && (
             <div className="mb-6 w-full max-w-sm overflow-hidden rounded-2xl border-4 border-slate-100 shadow-sm">
                 <img 
                    src={imageUrl} 
                    alt={word.english} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                 />
             </div>
         )}
         <button 
            onClick={() => playSound(word.tamil)}
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 shadow-lg transition-all ${isPlaying ? 'bg-orange-100 text-orange-600 scale-110' : 'bg-orange-500 text-white hover:bg-orange-600 hover:-translate-y-1'}`}
         >
            {isPlaying ? (
                <span className="animate-pulse text-3xl">🔊</span>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )}
         </button>

         <div className={`w-full min-h-[80px] border-2 rounded-xl flex items-center justify-center gap-2 mb-8 p-4 bg-slate-50 transition-colors ${
             isCorrect === true ? 'border-green-400 bg-green-50' : 
             isCorrect === false ? 'border-red-400 bg-red-50' : 'border-slate-300'
         }`}>
             {selectedLetters.length === 0 && <span className="text-gray-400 italic text-sm">Tap letters below to build word...</span>}
             {selectedLetters.map((char, i) => (
                 <span key={i} className="text-3xl font-bold text-slate-800 animate-fade-in">{char}</span>
             ))}
         </div>

         <div className="flex flex-wrap justify-center gap-3 mb-10 min-h-[100px]">
             {scrambledLetters.map((char, i) => (
                 <button
                    key={`${char}-${i}`}
                    onClick={() => handleLetterClick(char, i)}
                    className="w-14 h-14 bg-white border-2 border-slate-200 border-b-4 rounded-lg text-2xl font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:-translate-y-1 active:border-b-2 active:translate-y-0.5 transition-all shadow-sm"
                 >
                     {char}
                 </button>
             ))}
         </div>

         <div className="flex gap-4 w-full justify-center">
            <button 
                onClick={handleBackspace}
                disabled={selectedLetters.length === 0 || isCorrect === true}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 disabled:opacity-50"
            >
                ⌫ Back
            </button>
            
            {isCorrect === true && (
                <button 
                    onClick={onNext}
                    className="px-8 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 shadow-lg animate-bounce"
                >
                    Next Word →
                </button>
            )}

            {isCorrect === false && (
                <button 
                    onClick={resetLevel}
                    className="px-6 py-3 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200"
                >
                    Try Again
                </button>
            )}
         </div>

         <div className="mt-8 text-center">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Meaning</span>
             <p className="text-gray-600 font-medium">{word.english}</p>
         </div>
      </div>
    </div>
  );
};

export default DictationDojo;