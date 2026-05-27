import React, { useState } from 'react';

interface GradingSystemProps {
    week: number;
}

type SubmissionStatus = 'ontime' | 'late_1' | 'late_2';

const GradingSystem: React.FC<GradingSystemProps> = ({ week }) => {
  const [hwScore, setHwScore] = useState<number>(10);
  const [participation, setParticipation] = useState<number>(10);
  const [attendance, setAttendance] = useState<number>(10);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('ontime');

  const calculateTotal = () => {
    // Basic Sum based on Handbook Page 6 (Attendance 10, HW 10, Participation 10)
    let total = hwScore + participation + attendance;
    
    // Policy Rules (Handbook Page 8/10):
    if (submissionStatus === 'late_2') {
      return 0;
    }

    if (submissionStatus === 'late_1') {
      total = total * 0.75;
    }

    return Math.round(total * 10) / 10;
  };

  const total = calculateTotal();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-indigo-300">
      <div className="flex justify-between items-start mb-4">
        <div>
            <h2 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                🏆 Evaluation Metric
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Grade 4 • Handbook Page 6</p>
        </div>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">Week {week}</span>
      </div>
      
      <div className="space-y-6">
        {/* Sliders */}
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Homework (10% - Page 6)</label>
            <div className="flex items-center gap-3">
                <input 
                    type="range" min="0" max="10" 
                    value={hwScore} onChange={(e) => setHwScore(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    disabled={submissionStatus === 'late_2'}
                />
                <div className="text-right font-bold text-indigo-500 w-8">{hwScore}</div>
            </div>
            </div>

            <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Participation & Reading (10% - Page 6)</label>
            <div className="flex items-center gap-3">
                <input 
                    type="range" min="0" max="10" 
                    value={participation} onChange={(e) => setParticipation(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    disabled={submissionStatus === 'late_2'}
                />
                <div className="text-right font-bold text-indigo-500 w-8">{participation}</div>
            </div>
            </div>

            <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Attendance (10% - Page 6)</label>
            <div className="flex items-center gap-3">
                <input 
                    type="range" min="0" max="10" 
                    value={attendance} onChange={(e) => setAttendance(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    disabled={submissionStatus === 'late_2'}
                />
                <div className="text-right font-bold text-indigo-500 w-8">{attendance}</div>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 italic italic">Note: 32 full classes = Perfect Attendance Trophy!</p>
            </div>
        </div>

        {/* Submission Status */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <label className="block text-xs font-bold uppercase text-slate-500 mb-3 tracking-wider">Submission Timing Policy</label>
          <div className="space-y-2">
             <label className="flex items-center gap-3 p-2 rounded hover:bg-white border border-transparent hover:border-slate-100 cursor-pointer">
                <input 
                    type="radio" 
                    name="status" 
                    checked={submissionStatus === 'ontime'}
                    onChange={() => setSubmissionStatus('ontime')}
                    className="w-4 h-4 text-indigo-600"
                />
                <div className="text-sm">
                    <span className="font-bold text-gray-800 block">On Time / Absent on Due Date</span>
                    <span className="text-gray-500 text-xs">Full credit eligible. Presented next week if absent.</span>
                </div>
             </label>

             <label className="flex items-center gap-3 p-2 rounded hover:bg-white border border-transparent hover:border-slate-100 cursor-pointer">
                <input 
                    type="radio" 
                    name="status" 
                    checked={submissionStatus === 'late_1'}
                    onChange={() => setSubmissionStatus('late_1')}
                    className="w-4 h-4 text-orange-500"
                />
                <div className="text-sm">
                    <span className="font-bold text-orange-700 block">1 Week Late</span>
                    <span className="text-orange-600 text-xs">Maximum grade capped at 75%.</span>
                </div>
             </label>

             <label className="flex items-center gap-3 p-2 rounded hover:bg-white border border-transparent hover:border-slate-100 cursor-pointer">
                <input 
                    type="radio" 
                    name="status" 
                    checked={submissionStatus === 'late_2'}
                    onChange={() => setSubmissionStatus('late_2')}
                    className="w-4 h-4 text-red-600"
                />
                <div className="text-sm">
                    <span className="font-bold text-red-700 block">2+ Weeks Late</span>
                    <span className="text-red-600 text-xs">Work will not be graded (0%).</span>
                </div>
             </label>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-gray-100 flex justify-between items-center">
          <span className="text-gray-500 font-medium">Week {week} Total Score</span>
          <div className="text-right">
             <span className={`text-3xl font-extrabold ${submissionStatus === 'late_2' ? 'text-red-500' : 'text-indigo-600'}`}>{total}</span>
             <span className="text-gray-400 text-xl font-medium"> / 30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingSystem;