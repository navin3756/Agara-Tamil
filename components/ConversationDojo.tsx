import React, { useState } from 'react';
import { CONVERSATION_TOPICS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const ConversationDojo: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const activeTopic = CONVERSATION_TOPICS.find(t => t.id === selectedId);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 font-sans h-full">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-orange-100 p-2 rounded text-xl text-orange-600">💬</div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Conversation Practice</h2>
                    <p className="text-sm text-gray-500">Pick a handbook topic to practice speaking (Page 124-128)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                {/* Topic List */}
                <div className="md:col-span-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-2">
                        {CONVERSATION_TOPICS.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => setSelectedId(topic.id)}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                                    selectedId === topic.id
                                    ? 'bg-orange-50 border-orange-200 text-orange-700 font-bold shadow-sm'
                                    : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                                }`}
                                id={`topic-btn-${topic.id}`}
                            >
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Practice Area */}
                <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeTopic ? (
                            <motion.div 
                                key={activeTopic.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                                id={`focus-topic-${activeTopic.id}`}
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{activeTopic.title}</h3>
                                    <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                                        {activeTopic.content}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Brainstorming Points</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="bg-white px-4 py-3 rounded-lg border border-slate-100 text-sm italic text-slate-500">
                                            Hint: Practice saying "நான் ..." (I am...) or "என் ..." (My...) for these topics.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50">
                                    <div className="text-4xl mb-4">🎤</div>
                                    <p className="text-sm text-slate-500 text-center max-w-xs">
                                        Practice speaking for 2-4 minutes as required by the logbook (Handbook Page 14).
                                    </p>
                                    <button 
                                        className="mt-6 bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-lg active:scale-95"
                                        onClick={() => alert("Recording feature coming soon! For now, practice with a parent or friend as per handbook instructions.")}
                                        id="record-btn"
                                    >
                                        Start Local Recording
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <div className="text-6xl mb-4">🧘</div>
                                <p>Select a topic to start your practice</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ConversationDojo;
