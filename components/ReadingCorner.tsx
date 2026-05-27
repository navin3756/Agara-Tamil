import React, { useState } from 'react';
import { generateSimpleStory } from '../services/geminiService';

interface ReadingCornerProps {
  topic: string;
}

const ReadingCorner: React.FC<ReadingCornerProps> = ({ topic }) => {
  const [story, setStory] = useState<{ tamil: string, english: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setStory(null);
    setShowTranslation(false);
    const result = await generateSimpleStory(topic);
    setStory(result);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
         <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">📖</div>
         <div>
            <h2 className="text-lg font-semibold text-gray-800">Reading Corner</h2>
            <p className="text-sm text-gray-500">AI-Generated stories based on this week's topic: <strong>{topic}</strong></p>
         </div>
      </div>

      {!story && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="text-6xl mb-4 opacity-20">🤖</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Ready for a Story?</h3>
            <p className="text-gray-500 max-w-sm mb-8">
                I can write a brand new, easy-to-read Tamil story just for you about "{topic}".
            </p>
            <button 
                onClick={handleGenerate}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
                ✨ Write Me a Story!
            </button>
        </div>
      )}

      {loading && (
          <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-indigo-600 font-bold animate-pulse">Thinking of a creative story...</p>
          </div>
      )}

      {story && (
          <div className="flex-1 animate-fade-in">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 shadow-sm mb-6 relative">
                  <div className="absolute -top-3 -left-3 bg-white text-orange-500 border border-orange-100 rounded-full p-2 shadow-sm">
                      📝
                  </div>
                  <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-loose text-center">
                      {story.tamil}
                  </p>
              </div>

              <div className="flex justify-center mb-6">
                  <button 
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-2"
                  >
                      {showTranslation ? 'Hide Translation' : 'Show English Translation'}
                  </button>
              </div>

              {showTranslation && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-gray-600 italic animate-fade-in">
                      {story.english}
                  </div>
              )}

              <div className="mt-auto pt-8 flex justify-center">
                   <button 
                    onClick={handleGenerate}
                    className="text-gray-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                   >
                       🔄 Generate a Different Story
                   </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default ReadingCorner;