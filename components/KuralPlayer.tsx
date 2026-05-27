import React, { useState, useRef } from 'react';
import { THIRUKKURALS } from '../constants';

interface KuralPlayerProps {
  kuralId: number;
}

const KuralPlayer: React.FC<KuralPlayerProps> = ({ kuralId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Find the assigned Kural or default to first
  const activeKural = THIRUKKURALS.find(k => k.id === kuralId) || THIRUKKURALS[0];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is needed for Kural practice!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
         <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">🎤</div>
         <div>
            <h2 className="text-lg font-semibold text-gray-800">Thirukkural Recitation</h2>
            <p className="text-sm text-gray-500">Weekly Goal: Memorize and record Kural #{activeKural.id}</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Kural Display Card */}
        <div className="flex-1 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center relative overflow-hidden">
             <div className="absolute top-4 right-4 text-slate-200 text-6xl font-serif opacity-20">❝</div>
             
             <div className="font-serif text-xl md:text-2xl text-slate-800 leading-loose mb-6 relative z-10">
              {activeKural.kural.map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
            
            <div className="inline-block bg-white border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 font-medium italic shadow-sm">
              "{activeKural.meaning}"
            </div>
          </div>

          {/* Word Meanings Section */}
          {activeKural.wordMeanings && activeKural.wordMeanings.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
               <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Word-by-Word Meaning</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeKural.wordMeanings.map((wm, i) => (
                    <div key={i} className="flex flex-col bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-bold text-slate-800 text-sm">{wm.word}</span>
                        <span className="text-xs text-slate-500">{wm.meaning}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Recording Controls */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white border border-dashed border-gray-300 rounded-xl p-6 h-fit">
           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Voice Recorder</h3>
           
           <div className="mb-6">
             {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="group relative flex items-center justify-center w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-all hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="absolute -bottom-8 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Start Recording</span>
                </button>
             ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center justify-center w-16 h-16 bg-slate-800 hover:bg-black rounded-full shadow-md animate-pulse transition-all"
                >
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </button>
             )}
           </div>

           {isRecording && <p className="text-sm text-red-500 font-medium animate-pulse mb-4">● Recording in progress...</p>}

           {audioURL && (
            <div className="w-full animate-fade-in">
               <div className="bg-slate-50 p-3 rounded border border-slate-200 mb-2">
                 <audio src={audioURL} controls className="w-full h-8" />
               </div>
               <div className="flex items-center gap-2 justify-center text-xs text-green-600 font-medium bg-green-50 py-1 px-3 rounded-full border border-green-100">
                  <span>✓ Recorded Successfully</span>
               </div>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default KuralPlayer;