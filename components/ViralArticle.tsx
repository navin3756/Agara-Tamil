import React from 'react';

interface ViralArticleProps {
  onBack: () => void;
}

const ViralArticle: React.FC<ViralArticleProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-200">
      {/* Article Header */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-800 flex items-center gap-2 font-medium transition-colors"
          >
            <span className="text-xl">←</span> Back to App
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">அ</div>
            <span className="font-bold text-gray-800">Agara News</span>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Education Tech</span>
          <span className="text-gray-400 text-sm">April 2, 2026 • 6 min read</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
          How a 9-Year-Old "Hated" Tamil Until He Found This App: The Agara Story
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 mb-12 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <img 
            src="https://picsum.photos/seed/author/100/100" 
            alt="Author" 
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="font-bold text-gray-900">Ananya Krishnan</div>
            <div className="text-sm text-gray-500">Education Specialist & Parent</div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-1 scale-[1.02] opacity-10 group-hover:rotate-0 transition-transform duration-500"></div>
          <img 
            src="https://picsum.photos/seed/kids-learning/1200/800" 
            alt="Kid using Agara" 
            className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[16/10]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 max-w-[200px] hidden sm:block">
            <p className="text-xs font-bold text-gray-800 italic">"I finally understand why 'ல' and 'ள' sound different!" — Arjun, Grade 4</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium italic">
            "I don't want to do my Tamil homework. It's too hard. I don't understand the grammar."
          </p>
          
          <p className="mb-6">
            If you're a parent of a child learning Tamil in the diaspora, you've heard this before. For 9-year-old Arjun, Tamil class was the highlight of his week—but for all the wrong reasons. It was a source of frustration, tears, and a growing sense of disconnection from his heritage.
          </p>

          <p className="mb-6">
            But three weeks ago, everything changed. Arjun didn't just start doing his homework; he started <strong>enjoying</strong> it. The secret? A new AI-powered companion called <strong>Agara (அகர)</strong>.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The "Boring" Problem</h2>
          <p className="mb-6">
            Traditional Tamil learning often relies on rote memorization and heavy textbooks. For kids raised in an English-speaking environment, the complex grammar rules (Vethrumai Urupu) and subtle phonetic differences feel like an impossible mountain to climb.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-8 my-10 rounded-r-2xl">
            <p className="text-orange-900 font-bold text-xl mb-2">"It felt like a chore. Now it feels like a game."</p>
            <p className="text-orange-700 text-sm">— Meera, Arjun's Mother</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Enter the Sentence Lab</h2>
          <p className="mb-6">
            Agara's standout feature is the <strong>Sentence Lab</strong>. Instead of staring at a blank page, kids use an AI-powered drag-and-drop interface. When they make a mistake—like putting the verb in the wrong place—the "AI Teacher" doesn't just mark it wrong. It explains, in simple English, <em>why</em> the grammar needs to change.
          </p>

          <p className="mb-6">
            "It's like having a tutor sitting right next to him 24/7," says Meera. "He's learning the SOV (Subject-Object-Verb) structure naturally, without even realizing he's studying grammar."
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Mastering the 'Mayangoli'</h2>
          <p className="mb-6">
            One of the biggest hurdles for Tamil learners is phonetics—specifically the 'Mayangoli' letters like ல, ள, and ழ. Agara's <strong>Phonetics Dojo</strong> uses high-fidelity text-to-speech to let kids hear the subtle differences. They can record themselves, compare their pronunciation, and earn badges as they improve.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why It's Going Viral</h2>
          <p className="mb-6">
            Parents are sharing screenshots of their kids' progress bars on WhatsApp and LinkedIn. Why? Because Agara solves the "Parent's Dilemma": wanting your child to be fluent in their mother tongue but lacking the tools to help them effectively at home.
          </p>

          <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">10,000+</h3>
              <p className="text-blue-100 text-sm uppercase font-bold tracking-wider">Active Students</p>
            </div>
            <div className="bg-green-600 text-white p-8 rounded-3xl shadow-xl">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">4.9/5</h3>
              <p className="text-green-100 text-sm uppercase font-bold tracking-wider">Parent Rating</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future of Heritage Learning</h2>
          <p className="mb-6">
            Agara isn't just an app; it's a movement to keep the world's oldest living language alive in the hearts of the next generation. By combining cutting-edge AI with a deep respect for Tamil culture, it's proving that heritage learning can be as exciting as any video game.
          </p>

          <div className="mt-16 p-10 bg-slate-900 rounded-[40px] text-center text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to start your child's journey?</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Join the Agara community today and watch your child fall in love with Tamil.</p>
            <button 
              onClick={onBack}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/20"
            >
              Launch Agara Now
            </button>
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-gray-500 font-medium">Share this story:</div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">in</button>
            <button className="w-12 h-12 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-100 transition-colors">𝕏</button>
            <button className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors">WA</button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 Agara Tamil Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ViralArticle;
