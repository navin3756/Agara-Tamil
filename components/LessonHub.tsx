
import React, { useState } from 'react';
import { WeeklySyllabus } from '../types';
import GrammarMixer from './GrammarMixer';
import SentenceBuilder from './SentenceBuilder';
import KuralPlayer from './KuralPlayer';
import PhoneticsGuide from './PhoneticsGuide';
import ProjectAssistant from './ProjectAssistant';
import DictationDojo from './DictationDojo';
import ReadingCorner from './ReadingCorner';
import WorksheetViewer from './WorksheetViewer';
import ConversationDojo from './ConversationDojo';
import DailyVocabBuilder from './DailyVocabBuilder';
import { WORKSHEETS } from '../data/worksheets';

interface LessonHubProps {
  currentWeek: number;
  syllabus: WeeklySyllabus[];
  onToggle: (weekId: number, taskId: string) => void;
}

type Tab = 'plan' | 'grammar' | 'worksheets' | 'homework' | 'kural' | 'phonetics' | 'projects' | 'dictation' | 'reading' | 'conversation' | 'vocab';

const LessonHub: React.FC<LessonHubProps> = ({ currentWeek, syllabus, onToggle }) => {
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [activeWorksheetId, setActiveWorksheetId] = useState<string | null>(null);

  const currentWeekData = syllabus.find(s => s.week === currentWeek);

  if (!currentWeekData) {
    return <div className="text-center py-20 text-gray-500">Syllabus not found for Week {currentWeek}.</div>;
  }

  const completedCount = currentWeekData.tasks.filter(t => t.completed).length;
  const totalCount = currentWeekData.tasks.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Filter worksheets based on week range
  const relevantWorksheets = WORKSHEETS.filter(
    ws => currentWeek >= ws.minWeek && currentWeek <= ws.maxWeek
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'plan':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="bg-slate-800 rounded-lg p-8 text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Week {currentWeek}</h2>
                <h3 className="text-xl font-medium opacity-80 border-t border-slate-600 pt-2 inline-block mt-2">
                  {currentWeekData.topic}
                </h3>
             </div>

             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
               <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h4 className="font-bold text-gray-800 flex items-center gap-2">
                   📋 Weekly Checklist
                 </h4>
                 <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                    {completedCount}/{totalCount} Done
                 </span>
               </div>
               
               {/* Progress Bar */}
               <div className="h-1.5 w-full bg-gray-100">
                 <div 
                   className="h-full bg-green-500 transition-all duration-500 ease-out" 
                   style={{ width: `${progressPercentage}%` }}
                 ></div>
               </div>

               <div className="p-4 space-y-3">
                {currentWeekData.tasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => onToggle(currentWeek, task.id)}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                      task.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border mr-4 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-green-600 border-green-600' : 'border-gray-400 bg-white'
                    }`}>
                      {task.completed && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <span className={`font-medium text-base ${task.completed ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                      {task.label}
                    </span>
                  </div>
                ))}
               </div>
             </div>

             {currentWeekData.youtubeLinks && currentWeekData.youtubeLinks.length > 0 && (
               <div className="bg-red-50 rounded-lg border border-red-100 p-6">
                 <h4 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                   🎥 YouTube Resources
                 </h4>
                 <div className="space-y-3">
                   {currentWeekData.youtubeLinks.map((link, index) => (
                     <a 
                       key={index} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center p-3 bg-white rounded border border-red-200 hover:border-red-400 hover:shadow-sm transition-all text-red-700 font-medium"
                     >
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        {link.title}
                     </a>
                   ))}
                 </div>
               </div>
             )}
          </div>
        );
      case 'grammar':
        return <div className="animate-fade-in"><GrammarMixer key={currentWeek} nouns={currentWeekData.grammarWords} /></div>;
      case 'worksheets':
        return (
            <div className="animate-fade-in space-y-6">
                {!activeWorksheetId ? (
                    <div>
                        {relevantWorksheets.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relevantWorksheets.map(ws => (
                                    <button
                                        key={ws.id}
                                        onClick={() => setActiveWorksheetId(ws.id)}
                                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all text-left group"
                                    >
                                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{ws.topic}</div>
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 mb-1">{ws.title}</h3>
                                        <p className="text-sm text-gray-500">{ws.questions.length} Exercises</p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                                <p className="text-xl mb-2">👋 No specific worksheets for Week {currentWeek}</p>
                                <p className="text-sm">Try reviewing previous weeks or focusing on Reading!</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <button 
                            onClick={() => setActiveWorksheetId(null)}
                            className="mb-4 text-sm font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1"
                        >
                            ← Back to List
                        </button>
                        <WorksheetViewer worksheet={WORKSHEETS.find(w => w.id === activeWorksheetId)!} />
                    </div>
                )}
            </div>
        );
      case 'homework':
        return <div className="animate-fade-in"><SentenceBuilder key={currentWeek} week={currentWeek} vocab={currentWeekData.grammarWords} /></div>;
      case 'kural':
        return <div className="animate-fade-in"><KuralPlayer key={currentWeek} kuralId={currentWeekData.kuralId} week={currentWeek} /></div>;
      case 'phonetics':
        return <div className="animate-fade-in"><PhoneticsGuide key={currentWeek} focusId={currentWeekData.phoneticFocus} /></div>;
      case 'projects':
        return <div className="animate-fade-in"><ProjectAssistant key={currentWeek} week={currentWeek} /></div>;
      case 'dictation':
        return <div className="animate-fade-in"><DictationDojo key={currentWeek} week={currentWeek} /></div>;
      case 'reading':
        return <div className="animate-fade-in"><ReadingCorner key={currentWeek} topic={currentWeekData.topic} /></div>;
      case 'conversation':
        return <div className="animate-fade-in"><ConversationDojo /></div>;
      case 'vocab':
        return <div className="animate-fade-in"><DailyVocabBuilder /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-1 gap-1 mb-6 border-b border-gray-200 custom-scrollbar">
        <TabButton id="plan" label="Overview" active={activeTab} onClick={setActiveTab} />
        <TabButton id="vocab" label="Vocab Daily" active={activeTab} onClick={setActiveTab} />
        <TabButton id="grammar" label="Grammar" active={activeTab} onClick={setActiveTab} />
        <TabButton id="worksheets" label="Worksheets" active={activeTab} onClick={setActiveTab} />
        <TabButton id="homework" label="Sentence" active={activeTab} onClick={setActiveTab} />
        <TabButton id="dictation" label="Dictation" active={activeTab} onClick={setActiveTab} />
        <TabButton id="reading" label="Reading" active={activeTab} onClick={setActiveTab} />
        <TabButton id="conversation" label="Speaking" active={activeTab} onClick={setActiveTab} />
        <TabButton id="kural" label="Kural" active={activeTab} onClick={setActiveTab} />
        <TabButton id="phonetics" label="Phonetics" active={activeTab} onClick={setActiveTab} />
        <TabButton id="projects" label="Projects" active={activeTab} onClick={setActiveTab} />
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
};

const TabButton = ({ id, label, active, onClick }: { id: Tab, label: string, active: Tab, onClick: (t: Tab) => void }) => {
  const isActive = active === id;
  
  return (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-3 transition-all whitespace-nowrap text-sm font-medium border-b-2 rounded-t-md hover:bg-gray-50 flex-shrink-0 ${
        isActive 
          ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
          : 'border-transparent text-gray-500'
      }`}
    >
      {label}
    </button>
  );
};

export default LessonHub;
