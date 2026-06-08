import React, { useMemo, useState } from 'react';
import { KINDERGARTEN_PROJECTS, KindergartenWeek } from '../data/kindergartenHandbook';

interface KindergartenHubProps {
  currentWeek: number;
  syllabus: KindergartenWeek[];
  onToggle: (weekId: number, taskId: string) => void;
}

type KgTab = 'overview' | 'letters' | 'homework' | 'speaking' | 'projects';

const KindergartenHub: React.FC<KindergartenHubProps> = ({ currentWeek, syllabus, onToggle }) => {
  const [activeTab, setActiveTab] = useState<KgTab>('overview');
  const currentWeekData = syllabus.find((week) => week.week === currentWeek);

  const nextProject = useMemo(() => (
    KINDERGARTEN_PROJECTS.find((project) => project.dueWeek >= currentWeek) ?? KINDERGARTEN_PROJECTS[KINDERGARTEN_PROJECTS.length - 1]
  ), [currentWeek]);

  if (!currentWeekData) {
    return <div className="text-center py-20 text-gray-500">Kindergarten handbook content not found for Week {currentWeek}.</div>;
  }

  const completedCount = currentWeekData.tasks.filter((task) => task.completed).length;
  const totalCount = currentWeekData.tasks.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const renderList = (items: string[]) => (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl bg-white/80 p-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-orange-100">
          <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-orange-400" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Weekly Checklist</p>
                  <h3 className="text-2xl font-black text-slate-900">Build the week gently</h3>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700 ring-1 ring-green-100">
                  {completedCount}/{totalCount} Done
                </span>
              </div>

              <div className="mb-5 h-2 rounded-full bg-orange-50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="space-y-3">
                {currentWeekData.tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onToggle(currentWeek, task.id)}
                    className={`flex w-full items-center rounded-2xl border p-4 text-left transition-all ${
                      task.completed
                        ? 'border-green-200 bg-green-50 text-green-900'
                        : 'border-orange-100 bg-orange-50/40 text-slate-800 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    <span className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-black ${
                      task.completed ? 'border-green-500 bg-green-500 text-white' : 'border-orange-300 bg-white text-orange-500'
                    }`}>
                      {task.completed ? '✓' : ''}
                    </span>
                    <span className={`text-sm font-bold ${task.completed ? 'line-through decoration-green-500/70' : ''}`}>
                      {task.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <InfoCard title="Handbook Source" tone="amber">
                <p className="text-sm font-semibold text-amber-900">{currentWeekData.handbookPages}</p>
                <p className="mt-2 text-sm text-amber-800">Content is adapted from the Kindergarten Student Handbook into app-friendly practice cards.</p>
              </InfoCard>

              <InfoCard title="Next Project" tone="blue">
                <p className="text-sm font-black text-blue-950">{nextProject.title}: {nextProject.topic}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">Due Week {nextProject.dueWeek}</p>
                <p className="mt-3 text-sm text-blue-900">{nextProject.childAction}</p>
              </InfoCard>
            </aside>
          </div>
        );
      case 'letters':
        return (
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">Letters</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {currentWeekData.letters.map((letter) => (
                  <div key={letter} className="rounded-3xl bg-white/10 p-5 text-center ring-1 ring-white/10">
                    <div className="font-tamil text-5xl font-black leading-none">{letter}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-semibold text-orange-50">{currentWeekData.soundFocus}</p>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Practice Words</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {currentWeekData.practiceWords.map((word) => (
                  <span key={word} className="rounded-2xl bg-orange-50 px-4 py-3 font-tamil text-2xl font-black text-slate-900 ring-1 ring-orange-100">
                    {word}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm font-black text-slate-900">Skills to notice</p>
                {renderList(currentWeekData.skills)}
              </div>
            </section>
          </div>
        );
      case 'homework':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <InfoPanel heading="Class Practice" items={currentWeekData.classwork} />
            <InfoPanel heading="Home Practice" items={currentWeekData.homework} />
          </div>
        );
      case 'speaking':
        return (
          <section className="rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 p-6 shadow-sm ring-1 ring-pink-100">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-pink-500">Conversation Practice</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">One tiny Tamil talk</h3>
            <p className="mt-4 rounded-3xl bg-white p-6 text-lg font-bold leading-8 text-slate-800 shadow-sm ring-1 ring-pink-100">
              {currentWeekData.conversation}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {['Speak slowly', 'Use spoken Tamil', 'Avoid English when possible'].map((tip) => (
                <div key={tip} className="rounded-2xl bg-white/80 p-4 text-sm font-black text-pink-800 ring-1 ring-pink-100">
                  {tip}
                </div>
              ))}
            </div>
          </section>
        );
      case 'projects':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {KINDERGARTEN_PROJECTS.map((project) => {
              const isActive = currentWeek <= project.dueWeek && currentWeek >= project.dueWeek - 4;
              const isDone = currentWeek > project.dueWeek;
              return (
                <article key={project.id} className={`rounded-3xl p-6 shadow-sm ring-1 ${
                  isActive ? 'bg-orange-50 ring-orange-200' : isDone ? 'bg-green-50 ring-green-100' : 'bg-white ring-slate-100'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Due Week {project.dueWeek}</p>
                      <h3 className="mt-2 text-xl font-black text-slate-900">{project.title}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${isDone ? 'bg-green-100 text-green-700' : isActive ? 'bg-orange-200 text-orange-900' : 'bg-slate-100 text-slate-600'}`}>
                      {isDone ? 'Done' : isActive ? 'Active' : 'Upcoming'}
                    </span>
                  </div>
                  <p className="mt-3 font-tamil text-2xl font-black text-slate-900">{project.topic}</p>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">{project.childAction}</p>
                  <p className="mt-3 rounded-2xl bg-white/80 p-4 text-sm font-medium leading-6 text-slate-600 ring-1 ring-white">{project.parentGuide}</p>
                </article>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <section className="mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-amber-400 to-pink-400 p-1 shadow-sm">
        <div className="rounded-[1.85rem] bg-white/92 p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-600">Kindergarten Handbook</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Week {currentWeek}: {currentWeekData.focus}</h2>
              <p className="mt-3 text-lg font-bold text-slate-600">{currentWeekData.theme}</p>
            </div>
            <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-200">Sound Focus</p>
              <p className="mt-1 max-w-xs text-sm font-semibold leading-6">{currentWeekData.soundFocus}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-orange-100 pb-2 custom-scrollbar">
        <KgTabButton id="overview" label="Overview" active={activeTab} onClick={setActiveTab} />
        <KgTabButton id="letters" label="Letters" active={activeTab} onClick={setActiveTab} />
        <KgTabButton id="homework" label="Class & Home" active={activeTab} onClick={setActiveTab} />
        <KgTabButton id="speaking" label="Speaking" active={activeTab} onClick={setActiveTab} />
        <KgTabButton id="projects" label="Projects" active={activeTab} onClick={setActiveTab} />
      </div>

      {renderContent()}
    </div>
  );
};

const KgTabButton = ({ id, label, active, onClick }: { id: KgTab; label: string; active: KgTab; onClick: (tab: KgTab) => void }) => {
  const isActive = active === id;

  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-black transition-all ${
        isActive ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-slate-500 ring-1 ring-orange-100 hover:text-orange-700'
      }`}
    >
      {label}
    </button>
  );
};

const InfoCard = ({ title, tone, children }: { title: string; tone: 'amber' | 'blue'; children: React.ReactNode }) => {
  const styles = tone === 'amber' ? 'bg-amber-50 ring-amber-100' : 'bg-blue-50 ring-blue-100';
  const titleStyles = tone === 'amber' ? 'text-amber-700' : 'text-blue-700';

  return (
    <section className={`rounded-3xl p-5 shadow-sm ring-1 ${styles}`}>
      <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${titleStyles}`}>{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
};

const InfoPanel = ({ heading, items }: { heading: string; items: string[] }) => (
  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-orange-100">
    <h3 className="mb-4 text-xl font-black text-slate-900">{heading}</h3>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="rounded-2xl bg-orange-50/70 p-4 text-sm font-semibold leading-6 text-slate-700 ring-1 ring-orange-100">
          {item}
        </li>
      ))}
    </ul>
  </section>
);

export default KindergartenHub;
