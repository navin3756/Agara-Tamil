import React, { useState } from 'react';
import LessonHub from './components/LessonHub';
import LandingPage from './components/LandingPage';
import ViralArticle from './components/ViralArticle';
import DailyReminder from './components/DailyReminder';
import { getWeeklySyllabus } from './constants';
import { useAuth } from './components/authContext';

const App: React.FC = () => {
  // State to manage view: 'landing', 'app', or 'article'
  const [view, setView] = useState<'landing' | 'app' | 'article'>('landing');
  
  // App State
  const [gradeLevel, setGradeLevel] = useState<string>("4");
  const [currentWeek, setCurrentWeek] = useState<number>(22);
  const [syllabus, setSyllabus] = useState(getWeeklySyllabus());
  
  const { user, signIn, signOut, authAvailable } = useAuth();

  const toggleTask = (weekId: number, taskId: string) => {
    setSyllabus(prev => prev.map(week => 
      week.week === weekId 
        ? {
            ...week,
            tasks: week.tasks.map(task => 
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : week
    ));
  };

  const handleStart = (selectedGrade: string) => {
    setGradeLevel(selectedGrade);
    setView('app');
    window.scrollTo(0, 0);
  };

  const handleReadArticle = () => {
    setView('article');
    window.scrollTo(0, 0);
  };

  // 1. Landing View
  if (view === 'landing') {
    return <LandingPage onStart={handleStart} onReadArticle={handleReadArticle} />;
  }

  // 2. Article View
  if (view === 'article') {
    return <ViralArticle onBack={() => setView('landing')} />;
  }

  // 3. Main App View
  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans text-gray-800">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo area */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
              <div className="bg-orange-500 w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                அ
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800 leading-tight">Agara (அகர)</h1>
                <p className="text-[10px] text-gray-500 font-bold -mt-1 tracking-wide uppercase">
                  {gradeLevel === 'KG' ? 'Kindergarten' : `Grade ${gradeLevel}`} Companion
                </p>
              </div>
            </div>

            {/* Week Selector */}
            <div className="flex items-center gap-2 bg-yellow-50 py-1.5 px-4 rounded-full border border-yellow-200">
              <label htmlFor="week-select" className="text-sm font-bold text-yellow-800 uppercase tracking-wide text-xs">Week</label>
              <select 
                id="week-select"
                value={currentWeek} 
                onChange={(e) => setCurrentWeek(Number(e.target.value))}
                className="bg-transparent text-gray-800 text-lg font-bold outline-none cursor-pointer border-none p-0 focus:ring-0 w-16"
              >
                {[...Array(32)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800">{user.displayName}</span>
                    <button onClick={signOut} className="text-xs text-gray-500 hover:text-red-500">Sign Out</button>
                  </div>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 border border-orange-200">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
              ) : authAvailable ? (
                <button 
                  onClick={signIn}
                  className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-gray-800 transition shadow hover:-translate-y-0.5"
                >
                  Sign In
                </button>
              ) : (
                <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                  Local mode
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LessonHub 
          currentWeek={currentWeek} 
          syllabus={syllabus} 
          onToggle={toggleTask} 
        />
      </main>
      
      <DailyReminder />
    </div>
  );
};

export default App;
