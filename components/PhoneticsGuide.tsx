import React, { useState, useRef, useEffect } from 'react';
import { PHONETICS_PAIRS } from '../constants';
import { generateTamilSpeech } from '../services/geminiService';

interface PhoneticsGuideProps {
  focusId: string;
}

const PhoneticsGuide: React.FC<PhoneticsGuideProps> = ({ focusId }) => {
  const activePair = PHONETICS_PAIRS.find(p => p.id === focusId) || PHONETICS_PAIRS[0];
  const [loadingLetter, setLoadingLetter] = useState<string | null>(null);
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCache = useRef<Record<string, string>>({}); // Cache for audio data

  // Cleanup on unmount
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

  // Helper to decode Base64 string
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Helper to process PCM data into AudioBuffer
  const decodeAudioData = (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
    numChannels: number = 1,
  ): AudioBuffer => {
    // Ensure data length is even for Int16Array
    let adjustedData = data;
    if (data.byteLength % 2 !== 0) {
      adjustedData = data.slice(0, data.byteLength - 1);
    }

    const dataInt16 = new Int16Array(adjustedData.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
        // Convert Int16 to Float32 [-1.0, 1.0]
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
  };

  const playSound = async (letter: string) => {
    // Prevent re-triggering while loading same letter
    if (loadingLetter === letter) return;

    // 1. Stop any currently playing audio immediately
    if (sourceRef.current) {
        try { sourceRef.current.stop(); } catch { /* ignore */ }
        sourceRef.current = null;
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    setPlayingLetter(null);

    // 2. Check Cache first
    let audioBase64 = audioCache.current[letter];

    // 3. Fetch if not in cache
    if (!audioBase64) {
        setLoadingLetter(letter);
        try {
            const fetchedAudio = await generateTamilSpeech(letter);
            if (fetchedAudio) {
                audioBase64 = fetchedAudio;
                audioCache.current[letter] = audioBase64;
            }
        } catch (error) {
            console.error("Fetch failed", error);
        }
        setLoadingLetter(null);
    }

    // 4. Play Audio
    if (audioBase64) {
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            
            // Initialize AudioContext without forcing sampleRate, letting the browser decide the hardware rate.
            // We specify the source sample rate (24000) when creating the buffer later.
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContextClass();
            }
            const ctx = audioContextRef.current;
            
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            const pcmData = decode(audioBase64);
            const audioBuffer = decodeAudioData(pcmData, ctx, 24000); // 24kHz is the model output rate
            
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.onended = () => {
                setPlayingLetter(prev => (prev === letter ? null : prev));
            };

            sourceRef.current = source;
            setPlayingLetter(letter); // Start visual animation
            source.start(0);
        } catch (error) {
            console.error("Playback failed", error);
        }
    } else {
        // Fallback to browser synthesis
        if ('speechSynthesis' in window) {
            setPlayingLetter(letter);
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'ta-IN'; 
            utterance.rate = 0.7; 
            utterance.onend = () => setPlayingLetter(null);
            window.speechSynthesis.speak(utterance);
        }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans h-full">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
         <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">🗣️</div>
         <div>
            <h2 className="text-lg font-semibold text-gray-800">Phonetics Lab</h2>
            <p className="text-sm text-gray-500">Weekly Focus: Accurate pronunciation of {activePair.group}</p>
         </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex flex-col items-center justify-center text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Character Distinction</h3>
        
        <p className="text-xs text-gray-400 mb-6 italic">(Click on a letter to hear the sound)</p>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {activePair.letters.map((letter) => {
            const isLoading = loadingLetter === letter;
            const isPlaying = playingLetter === letter;
            
            return (
                <button 
                    key={letter} 
                    onClick={() => playSound(letter)}
                    disabled={isLoading}
                    className="group relative focus:outline-none disabled:cursor-wait"
                    aria-label={`Play sound for ${letter}`}
                >
                <div className={`w-24 h-24 flex items-center justify-center bg-white rounded-xl shadow-sm border text-5xl font-bold transition-all duration-200
                    ${isPlaying ? 'border-blue-500 text-blue-600 scale-105 shadow-md ring-4 ring-blue-100' : 'border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-500 hover:-translate-y-1'}
                    ${isLoading ? 'opacity-80' : ''}
                `}>
                    {isLoading ? (
                        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        letter
                    )}
                </div>
                
                {/* Sound Wave Animation (Only when playing) */}
                {isPlaying && (
                    <div className="absolute -inset-2 rounded-xl border-2 border-blue-400 opacity-0 animate-ping pointer-events-none"></div>
                )}
                
                {/* Static Decoration when not playing */}
                {!isPlaying && !isLoading && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full group-hover:bg-blue-300 transition-colors"></div>
                )}
                
                {/* Icon Overlay */}
                <div className={`absolute -top-3 -right-3 bg-blue-100 text-blue-600 rounded-full p-1.5 shadow-sm transition-all duration-300 ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
                    {isPlaying ? (
                        <div className="flex gap-0.5 items-end h-3 w-3 justify-center pb-0.5">
                            <div className="w-0.5 bg-blue-600 h-1 animate-[bounce_0.6s_infinite]"></div>
                            <div className="w-0.5 bg-blue-600 h-2 animate-[bounce_0.6s_infinite_0.1s]"></div>
                            <div className="w-0.5 bg-blue-600 h-1.5 animate-[bounce_0.6s_infinite_0.2s]"></div>
                        </div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    )}
                </div>
                </button>
            );
          })}
        </div>

        <div className="max-w-md w-full bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm text-left">
           <h4 className="text-sm font-bold text-slate-800 mb-1">Pronunciation Tip</h4>
           <p className="text-slate-600 text-sm">{activePair.tips}</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneticsGuide;