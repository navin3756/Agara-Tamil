import React, { useState } from 'react';

interface LandingPageProps {
  onStart: (grade: string) => void;
  onReadArticle: () => void;
}

const GRADES = ['KG', '1', '2', '3', '4', '5', '6', '7', '8'];

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onReadArticle }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('4');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white pb-16 pt-16 sm:pb-24 lg:pb-32">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
             <button 
               onClick={onReadArticle}
               className="rounded-full px-4 py-1.5 text-sm font-bold leading-6 text-orange-600 ring-1 ring-orange-900/10 hover:ring-orange-900/20 bg-white shadow-sm transition-all hover:scale-105"
             >
                🎉 Trending: How Arjun fell in love with Tamil →
             </button>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Master Tamil with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Agara (அகர)</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 mb-10">
            Struggling with homework? Confused by Grammar? <br/>
            Join kids using our smart Sentence Lab, Phonetics Dojo, and Kural Studio to build Tamil confidence!
          </p>

          {/* Grade Selector */}
          <div className="max-w-xl mx-auto mb-10 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 mt-2">Select Grade Level</p>
            <div className="flex flex-wrap justify-center gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${
                    selectedGrade === g 
                      ? 'bg-blue-600 text-white shadow-lg scale-110' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-x-6">
            <button
              onClick={() => onStart(selectedGrade)}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-xl font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 ring-4 ring-blue-50"
            >
              🚀 Start My Adventure
            </button>
          </div>

          {/* Floating Letters */}
          <div className="mt-16 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="animate-bounce w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-3xl font-bold text-orange-500 border-2 border-orange-100">அ</div>
             <div className="animate-bounce delay-100 w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-3xl font-bold text-blue-500 border-2 border-blue-100">ஆ</div>
             <div className="animate-bounce delay-200 w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-3xl font-bold text-green-500 border-2 border-green-100">இ</div>
             <div className="animate-bounce delay-300 w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-3xl font-bold text-purple-500 border-2 border-purple-100">ஈ</div>
          </div>
        </div>
      </div>

      {/* Features Grid for Kids */}
      <div className="py-24 bg-indigo-50 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-bold leading-7 text-indigo-600 uppercase tracking-wide">For Super Students</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Learning doesn't have to be boring
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-md border border-indigo-100 hover:shadow-xl transition-shadow">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  🧪
                </div>
                <dt className="text-xl font-bold leading-7 text-gray-900">
                  Magical Sentence Lab
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto mt-2">
                    Drag and drop words to build sentences. Agara checks your grammar and explains why it works.
                  </p>
                </dd>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-md border border-indigo-100 hover:shadow-xl transition-shadow">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
                  🗣️
                </div>
                <dt className="text-xl font-bold leading-7 text-gray-900">
                  Phonetics Dojo
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto mt-2">
                    Confused by 'ல' vs 'ள'? Hear the difference and practice until you sound like a pro news reader.
                  </p>
                </dd>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-md border border-indigo-100 hover:shadow-xl transition-shadow">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
                  🎤
                </div>
                <dt className="text-xl font-bold leading-7 text-gray-900">
                  Kural Studio
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto mt-2">
                    Record yourself reciting Thirukkural. Understand word-by-word meanings to memorize faster.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Parents Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                        Dear Parents, <br/>
                        <span className="text-blue-600">We've got your back.</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Helping your child with Tamil homework shouldn't be a struggle. We align with standard curriculums for all grade levels.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</span>
                            <span className="text-gray-700 font-medium">Weekly Syllabus Tracker</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</span>
                            <span className="text-gray-700 font-medium">Project Deadlines & Rubrics Dashboard</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</span>
                            <span className="text-gray-700 font-medium">Grammar rules explained in English</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</span>
                            <span className="text-gray-700 font-medium">Progress bars for weekly checklists</span>
                        </li>
                    </ul>
                    <div className="mt-10">
                        <button onClick={() => onStart('4')} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2">
                            Explore the Dashboard <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
                <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-orange-100 rounded-3xl transform rotate-3"></div>
                     <div className="relative bg-white border border-gray-100 rounded-3xl shadow-xl p-8">
                         {/* Mock UI for parent visual */}
                         <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                             <div className="font-bold text-gray-800">Weekly Progress</div>
                             <div className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Week 18</div>
                         </div>
                         <div className="space-y-4">
                             <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-green-500 w-3/4"></div>
                             </div>
                             <div className="flex justify-between text-sm text-gray-500">
                                 <span>Tasks Completed</span>
                                 <span className="font-bold text-gray-800">3/4</span>
                             </div>
                             <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-4">
                                 <div className="flex items-center gap-3 mb-2">
                                     <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">🏆</div>
                                     <div className="text-sm font-bold text-gray-700">Project 1 Status</div>
                                 </div>
                                 <div className="text-xs text-gray-500 pl-11">Due in 2 weeks. Draft is ready for review.</div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
         <div className="mx-auto max-w-7xl px-6 text-center">
             <div className="text-white font-bold text-2xl mb-4">Agara Tamil</div>
             <p className="text-slate-400 text-sm">
                 Made with ❤️ for the Tamil Community. <br/>
                 Not affiliated officially with International Tamil Academy, but designed to support its curriculum.
             </p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
