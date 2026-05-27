import React, { useMemo } from 'react';
import GradingSystem from './GradingSystem';
import { PROJECTS } from '../constants';
import { ProjectDef } from '../types';

interface ProjectAssistantProps {
  week: number;
}

const ProjectAssistant: React.FC<ProjectAssistantProps> = ({ week }) => {
  
  const { activeProjects, upcomingProjects, pastProjects } = useMemo(() => {
    const active: ProjectDef[] = [];
    const upcoming: ProjectDef[] = [];
    const past: ProjectDef[] = [];

    PROJECTS.forEach(project => {
        // Active: From start week until 1 week after due date (for late submission window)
        if (week >= project.startWeek && week <= project.dueWeek + 1) {
            active.push(project);
        } else if (week < project.startWeek) {
            upcoming.push(project);
        } else {
            past.push(project);
        }
    });

    return { activeProjects: active, upcomingProjects: upcoming, pastProjects: past };
  }, [week]);

  // Logic to determine specific milestone guidance for the current week
  const getWeeklyMilestone = (project: ProjectDef, currentWeek: number) => {
     if (currentWeek < project.startWeek) return null;
     if (currentWeek > project.dueWeek) return "Project submission window closed.";
     
     const weekOffset = currentWeek - project.startWeek;
     const totalDuration = project.dueWeek - project.startWeek;
     
     if (weekOffset === 0) return "🎯 Kickoff: Choose your specific topic and start brainstorming vocabulary.";
     if (weekOffset < totalDuration / 2) return "📝 Drafting: Write your first 5-8 sentences. Focus on subject-verb agreement.";
     if (weekOffset === totalDuration - 2) return "🔍 Review: Check your draft for grammar errors (Case Endings).";
     if (weekOffset === totalDuration - 1) return "✨ Final Polish: Add pictures and practice reading aloud.";
     if (currentWeek === project.dueWeek) return "📤 Submission: Submit your project to the teacher this week!";
     
     return "Continue working on your project milestones.";
  };

  const getStatusLabel = (project: ProjectDef, currentWeek: number) => {
      if (currentWeek < project.startWeek) return 'Upcoming';
      if (currentWeek === project.dueWeek) return 'Due This Week';
      if (currentWeek === project.dueWeek + 1) return 'Grace Period';
      if (currentWeek > project.dueWeek) return 'Closed';
      return 'Active';
  };

  return (
    <div className="space-y-8">
      {/* Handbook & Resources Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold flex items-center gap-2">
             📚 Grade 4 Student Handbook
           </h2>
           <p className="text-blue-100 text-sm mt-1">Official ITA Curriculum Guide & Project Rubrics</p>
        </div>
        <button 
          onClick={() => alert("Please contact your ITA School Admin or Teacher to receive the official 'Grade4_Students_Handbook_2025_1.pdf'.")}
          className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-bold text-sm shadow hover:bg-blue-50 transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="bg-slate-100 p-2 rounded text-xl text-slate-600">🎨</div>
          <div>
              <h2 className="text-lg font-semibold text-gray-800">Project Dashboard</h2>
              <p className="text-sm text-gray-500">Timeline for Week {week}</p>
          </div>
        </div>
        
        <div className="space-y-8">
            {/* 1. Active Projects Section */}
            {activeProjects.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-green-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Current Focus
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        {activeProjects.map(project => {
                            const milestone = getWeeklyMilestone(project, week);
                            const status = getStatusLabel(project, week);
                            return (
                                <div key={project.id} className="border border-blue-200 bg-blue-50/30 rounded-lg p-5 shadow-sm ring-1 ring-blue-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-xl">{project.title}</h3>
                                            <p className="text-indigo-600 font-medium whitespace-pre-line">{project.topic}</p>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                                <span>📅 Due: Week {project.dueWeek}</span>
                                                <span className={`${status === 'Grace Period' ? 'text-red-500 font-bold' : ''}`}>
                                                    Status: {status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {milestone && (
                                        <div className="mb-5 bg-white border border-yellow-200 p-4 rounded-lg flex gap-3 items-start shadow-sm">
                                            <span className="text-2xl">👉</span>
                                            <div>
                                                <span className="text-xs font-bold text-yellow-800 uppercase block mb-1">Week {week} Goal</span>
                                                <p className="text-base text-gray-800 font-medium">{milestone}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t border-blue-100 pt-4">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Grading Rubric (Handbook Page 8)</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                            {project.requirements.map((req, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    {req}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-100 text-xs text-yellow-800">
                                            <strong>Late Submission Policy:</strong> Submitted 1 week late = 75% Marks only. Submitted 2+ weeks late = 0 Marks (Page 8).
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 2. No Active Projects (Final Revision State) */}
            {activeProjects.length === 0 && week > 24 && (
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-8 text-center">
                    <div className="text-4xl mb-3">🎓</div>
                    <h3 className="text-xl font-bold text-purple-900 mb-2">Projects Completed!</h3>
                    <p className="text-purple-700 max-w-lg mx-auto">
                        Great job completing all the projects for the year. Use this time to revise your vocabulary and grammar for the final assessment.
                    </p>
                </div>
            )}

            {/* 3. Upcoming Projects Section */}
            {upcomingProjects.length > 0 && (
                <div className="space-y-3 opacity-75 hover:opacity-100 transition-opacity">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Upcoming</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {upcomingProjects.map(project => (
                            <div key={project.id} className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-gray-600">{project.title}</h4>
                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Starts Week {project.startWeek}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 truncate">{project.topic}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. Past Projects Section (Collapsed/Compact) */}
            {pastProjects.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Completed / History</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {pastProjects.map(project => (
                            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100 text-gray-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">✓</div>
                                    <div>
                                        <span className="font-bold text-sm block">{project.title}</span>
                                        <span className="text-xs">Ended Week {project.dueWeek}</span>
                                    </div>
                                </div>
                                <div className="text-xs font-medium bg-gray-200 px-2 py-1 rounded">Closed</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Grading System embedded below projects */}
      <GradingSystem key={week} week={week} />
    </div>
  );
};

export default ProjectAssistant;