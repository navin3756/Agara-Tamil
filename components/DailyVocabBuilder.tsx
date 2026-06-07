import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DICTATION_WORDS } from '../constants';
import confetti from 'canvas-confetti';
import { generateSimpleStory, generateTamilSpeech } from '../services/geminiService';
import { useAuth } from './authContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

const DailyVocabBuilder: React.FC = () => {
  const { user } = useAuth();
  
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [lastPlayedFullDate, setLastPlayedDate] = useState<string | null>(null);
  
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [exampleSentence, setExampleSentence] = useState<{ta: string, en: string} | null>(null);
  const [isLoadingSentence, setIsLoadingSentence] = useState(false);
  
  // LocalStorage generic effect
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem('vocab_learned');
      if (saved) setLearnedWords(JSON.parse(saved));
      const savedStreak = localStorage.getItem('vocab_streak');
      if (savedStreak) setStreak(Number(savedStreak));
      const savedDate = localStorage.getItem('vocab_last_played');
      if (savedDate) setLastPlayedDate(savedDate);
    }
  }, [user]);

  // Sync with Firestore if logged in
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setLearnedWords(data.learnedWords || []);
            setStreak(data.streak || 0);
            setLastPlayedDate(data.lastPlayedDate || null);
          } else {
            // Document doesn't exist, create it with defaults
            await setDoc(docRef, {
                userId: user.uid,
                streak: 0,
                learnedWords: [],
                lastPlayedDate: null
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      }
    };
    fetchData();
  }, [user]);

  const saveToFirestore = async (newStreak: number, newLastPlayed: string | null, newLearned: string[]) => {
    if (user) {
        try {
            await setDoc(doc(db, 'users', user.uid), {
                userId: user.uid,
                streak: newStreak,
                lastPlayedDate: newLastPlayed,
                learnedWords: newLearned
            }, { merge: true });
        } catch (error) {
            handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
        }
    }
  };

  const saveLearned = (words: string[]) => {
    setLearnedWords(words);
    if (!user) localStorage.setItem('vocab_learned', JSON.stringify(words));
  };

  const updateStreakAndSave = (words: string[]) => {
    const today = new Date().toDateString();
    let newStreak = streak;
    
    if (lastPlayedFullDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastPlayedFullDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      setStreak(newStreak);
      setLastPlayedDate(today);
      if (!user) {
          localStorage.setItem('vocab_streak', newStreak.toString());
          localStorage.setItem('vocab_last_played', today);
      }
    }
    
    saveToFirestore(newStreak, today, words);
  };

  // Find the next unlearned word. If all learned, cycle back.
  useEffect(() => {
    if (learnedWords.length > 0) {
      const nextIndex = DICTATION_WORDS.findIndex(w => !learnedWords.includes(w.tamil));
      if (nextIndex !== -1 && nextIndex !== currentWordIndex) {
        setCurrentWordIndex(nextIndex);
      }
    }
  }, [learnedWords, currentWordIndex]);

  const currentWord = DICTATION_WORDS[currentWordIndex];

  const playAudio = async () => {
    if (!currentWord || isLoadingAudio) return;
    setIsLoadingAudio(true);
    try {
      const audioBase64 = await generateTamilSpeech(currentWord.tamil);
      if (audioBase64) {
        const audioUrl = `data:audio/mp3;base64,${audioBase64}`;
        const audioElement = new Audio(audioUrl);
        audioElement.play();
      } else {
        throw new Error('No generated audio returned');
      }
    } catch (e) {
      console.error(e);
      // Fallback to simpler TTS
      const utterance = new SpeechSynthesisUtterance(currentWord.tamil);
      utterance.lang = 'ta-IN';
      window.speechSynthesis.speak(utterance);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const generateSentence = async () => {
    if (!currentWord || isLoadingSentence) return;
    setIsLoadingSentence(true);
    try {
      const data = await generateSimpleStory(`A single interesting sentence using the word "${currentWord.tamil}"`);
      if (data.tamil) {
        setExampleSentence({ ta: data.tamil, en: data.english });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingSentence(false);
    }
  };

  const markLearned = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    const newWords = [...learnedWords, currentWord.tamil];
    saveLearned(newWords);
    updateStreakAndSave(newWords);
    nextWord();
  };

  const nextWord = () => {
    setIsFlipped(false);
    setExampleSentence(null);
    let nextIdx = currentWordIndex + 1;
    if (nextIdx >= DICTATION_WORDS.length) nextIdx = 0;
    setCurrentWordIndex(nextIdx);
  };

  if (!currentWord) return null;

  const imageUrl = currentWord.visualPrompt 
    ? `https://loremflickr.com/400/300/${encodeURIComponent(currentWord.visualPrompt)}`
    : `https://loremflickr.com/400/300/${encodeURIComponent(currentWord.english)}`;

  return (
    <div className="bg-slate-50 py-8 px-4 rounded-xl border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            🧠 Vocab Builder
          </h2>
          <p className="text-sm text-slate-500">Learn new words daily, listen, and conquer!</p>
          {!user && (
            <p className="text-xs text-orange-500 mt-1 font-medium">Please sign in to sync your streak to the cloud. Progress is currently saved locally.</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Streak</div>
              <div className="font-bold text-orange-500 text-lg leading-none">{streak} Days</div>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Mastered</div>
              <div className="font-bold text-indigo-500 text-lg leading-none">{learnedWords.length}/{DICTATION_WORDS.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Progress Bar inside the card area view */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            <span>Progress</span>
            <span>{Math.round((learnedWords.length / DICTATION_WORDS.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-1000"
              style={{ width: `${(learnedWords.length / DICTATION_WORDS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Word Card */}
        <div 
          className="relative min-h-[400px] w-full"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="w-full h-full absolute inset-0 preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border-b-4 border-indigo-100 flex flex-col items-center justify-center p-8">
              <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-6">Tap to flip & learn</span>
              
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 mb-6 shadow-inherit">
                 <img src={imageUrl} alt="word hint" className="w-full h-full object-cover" />
              </div>

              <h3 className="text-5xl font-bold tracking-tight text-gray-800 mb-6 text-center">
                {currentWord.tamil}
              </h3>

              <button 
                onClick={(e) => { e.stopPropagation(); playAudio(); }}
                disabled={isLoadingAudio}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isLoadingAudio ? 'bg-indigo-100 text-indigo-400 animate-pulse' : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 shadow-md'}`}
              >
                {isLoadingAudio ? '...' : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v18l-9-6H1V9h2l9-6zM15 12c0-1.5-.8-2.8-2-3.5v7c1.2-.7 2-2 2-3.5zm2 5V7c2.4 1.2 4 3.9 4 5s-1.6 3.8-4 5z"/></svg>
                )}
              </button>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white flex flex-col pt-12"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{currentWord.tamil}</h3>
                <p className="text-indigo-100 text-xl font-medium tracking-wide">{currentWord.english}</p>
              </div>

              <div className="flex justify-center mb-8">
                <button 
                  onClick={(e) => { e.stopPropagation(); playAudio(); }}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v18l-9-6H1V9h2l9-6zM15 12c0-1.5-.8-2.8-2-3.5v7c1.2-.7 2-2 2-3.5zm2 5V7c2.4 1.2 4 3.9 4 5s-1.6 3.8-4 5z"/></svg>
                </button>
              </div>

              <div className="bg-white/10 rounded-xl p-4 flex-grow mb-6 overflow-y-auto">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Example Sentence</h4>
                {exampleSentence ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{exampleSentence.ta}</p>
                    <p className="text-xs text-indigo-100/80 italic">{exampleSentence.en}</p>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); generateSentence(); }}
                    disabled={isLoadingSentence}
                    className="text-xs w-full py-2 bg-white/10 hover:bg-white/20 rounded font-medium transition-colors"
                  >
                    {isLoadingSentence ? 'Generating...' : '✨ Generate AI Sentence'}
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); nextWord(); }}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-colors"
                >
                  Skip for now
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); markLearned(); }}
                  className="flex-1 py-3 px-4 rounded-xl bg-green-500 hover:bg-green-400 font-bold text-sm transition-colors shadow-lg"
                >
                  Got it! 🎉
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Required CSS additions for 3D flip */}
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}} />
    </div>
  );
};

export default DailyVocabBuilder;
