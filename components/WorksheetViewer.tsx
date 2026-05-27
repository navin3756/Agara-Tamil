
import React, { useState } from 'react';
import { Worksheet, WorksheetItem } from '../types';

interface WorksheetViewerProps {
  worksheet: Worksheet;
}

const WorksheetViewer: React.FC<WorksheetViewerProps> = ({ worksheet }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      <div className="bg-indigo-50 p-6 border-b border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-900">{worksheet.title}</h2>
        <p className="text-indigo-600 text-sm mt-1">{worksheet.topic}</p>
      </div>
      
      <div className="p-6 space-y-8">
        {worksheet.questions.map((q, idx) => (
          <div key={q.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">
              Exercise {idx + 1}
            </span>
            <QuestionRenderer question={q} />
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestionRenderer: React.FC<{ question: WorksheetItem }> = ({ question }) => {
  // --- Sub-components for specific question types ---

  const MatchGame = ({ pairs }: { pairs: { left: string; right: string }[] }) => {
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [matches, setMatches] = useState<Record<string, string>>({});
    
    // Shuffle right side for display
    const [rightSide] = useState(() => [...pairs].map(p => p.right).sort(() => Math.random() - 0.5));

    const handleLeftClick = (item: string) => {
      if (matches[item]) return; // Already matched
      setSelectedLeft(item);
    };

    const handleRightClick = (item: string) => {
      if (!selectedLeft) return;
      // Check correctness
      const correctPair = pairs.find(p => p.left === selectedLeft);
      if (correctPair && correctPair.right === item) {
        setMatches(prev => ({ ...prev, [selectedLeft]: item }));
        setSelectedLeft(null);
      } else {
        // Wrong match visual cue could go here
        setSelectedLeft(null);
        alert("Try again!");
      }
    };

    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          {pairs.map((p) => (
            <button
              key={p.left}
              onClick={() => handleLeftClick(p.left)}
              disabled={!!matches[p.left]}
              className={`w-full p-3 rounded border text-left font-medium transition-all ${
                matches[p.left] 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : selectedLeft === p.left 
                    ? 'bg-blue-50 border-blue-400 text-blue-700 ring-2 ring-blue-100' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rightSide.map((item) => {
            const isMatched = Object.values(matches).includes(item);
            return (
              <button
                key={item}
                onClick={() => handleRightClick(item)}
                disabled={isMatched}
                className={`w-full p-3 rounded border text-right font-medium transition-all ${
                  isMatched
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const FillBlank = ({ text, answer, options }: { text: string, answer: string, options?: string[] }) => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'neutral' | 'correct' | 'wrong'>('neutral');

    const check = () => {
      if (input.trim() === answer) setStatus('correct');
      else setStatus('wrong');
    };

    const parts = text.split('___');

    return (
      <div className="flex flex-col items-start gap-3">
        <div className="text-lg leading-loose text-gray-800">
          {parts[0]}
          {options ? (
             <select 
               className={`mx-2 border-b-2 outline-none font-bold bg-transparent py-1 px-2 ${status === 'correct' ? 'border-green-500 text-green-700' : 'border-gray-300'}`}
               onChange={(e) => { setInput(e.target.value); setStatus('neutral'); }}
               value={input}
             >
               <option value="">Select...</option>
               {options.map(o => <option key={o} value={o}>{o}</option>)}
             </select>
          ) : (
             <input
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setStatus('neutral'); }}
                className={`mx-2 border-b-2 outline-none font-bold bg-transparent text-center w-32 py-1 ${status === 'correct' ? 'border-green-500 text-green-700' : 'border-gray-300'}`}
                placeholder="?"
             />
          )}
          {parts[1]}
        </div>
        
        <button 
          onClick={check}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            status === 'correct' 
              ? 'bg-green-100 text-green-700 cursor-default' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {status === 'correct' ? 'Correct! 🎉' : status === 'wrong' ? 'Try Again ❌' : 'Check'}
        </button>
      </div>
    );
  };

  const ClassificationGame = ({ categories, items }: { categories: string[], items: {text: string, categoryIndex: number}[] }) => {
    const [assignments, setAssignments] = useState<Record<string, number>>({});

    const assign = (item: string, catIndex: number) => {
        setAssignments(prev => ({...prev, [item]: catIndex}));
    };

    return (
        <div className="space-y-6">
            {/* Buckets */}
            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                    <div key={idx} className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 min-h-[150px]">
                        <h4 className="font-bold text-slate-500 text-center mb-4 uppercase text-xs tracking-wider">{cat}</h4>
                        <div className="space-y-2">
                            {items.filter(i => assignments[i.text] === idx).map(item => (
                                <div key={item.text} className="bg-white border border-slate-200 p-2 rounded shadow-sm text-center font-medium animate-fade-in">
                                    {item.text}
                                    <button onClick={() => {
                                        const newA = {...assignments};
                                        delete newA[item.text];
                                        setAssignments(newA);
                                    }} className="ml-2 text-red-400 hover:text-red-600">×</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Unassigned Items */}
            <div className="flex flex-wrap gap-2 justify-center bg-gray-50 p-4 rounded-lg">
                {items.filter(i => assignments[i.text] === undefined).map(item => (
                    <div key={item.text} className="relative group">
                        <div className="bg-white border border-indigo-200 text-indigo-800 px-4 py-2 rounded-full font-bold shadow-sm cursor-grab active:cursor-grabbing">
                            {item.text}
                        </div>
                        {/* Hover Menu for simple interaction instead of complex DnD */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-slate-800 text-white rounded overflow-hidden shadow-xl z-10">
                            {categories.map((cat, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => assign(item.text, idx)}
                                    className="px-3 py-2 text-xs hover:bg-slate-700 whitespace-nowrap border-r border-slate-600 last:border-0"
                                >
                                    To {cat.split('(')[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {items.filter(i => assignments[i.text] === undefined).length === 0 && (
                    <div className="text-gray-400 italic text-sm">All items classified!</div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div>
      <h3 className="text-md font-bold text-gray-800 mb-4">{question.instruction}</h3>
      
      {question.type === 'match' && <MatchGame pairs={(question as Extract<WorksheetItem, { type: 'match' }>).pairs} />}
      
      {question.type === 'fill_blank' && (
        <FillBlank 
            text={(question as Extract<WorksheetItem, { type: 'fill_blank' }>).text} 
            answer={(question as Extract<WorksheetItem, { type: 'fill_blank' }>).answer} 
            options={(question as Extract<WorksheetItem, { type: 'fill_blank' }>).options}
        />
      )}

      {question.type === 'classify' && (
          <ClassificationGame 
            categories={(question as Extract<WorksheetItem, { type: 'classify' }>).categories}
            items={(question as Extract<WorksheetItem, { type: 'classify' }>).items}
          />
      )}

      {question.type === 'passage' && (
          <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl leading-relaxed text-gray-800 font-serif text-lg">
                  <h4 className="font-bold text-orange-800 mb-2">{(question as Extract<WorksheetItem, { type: 'passage' }>).passageTitle}</h4>
                  <p>{(question as Extract<WorksheetItem, { type: 'passage' }>).passageText}</p>
              </div>
              <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                  {(question as Extract<WorksheetItem, { type: 'passage' }>).subQuestions.map((sq) => (
                      <div key={sq.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-bold text-gray-600 mb-2">{sq.instruction}</p>
                          <FillBlank text={sq.text} answer={sq.answer} />
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default WorksheetViewer;
