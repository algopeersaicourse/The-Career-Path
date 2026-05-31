
import React, { useState, useMemo } from 'react';
import { TalentArchetype, Career } from './types';
import { GHANAIAN_CAREERS, DAILY_PROVERBS } from './constants';
import CareerCard from './components/CareerCard';
import ChatInterface from './components/ChatInterface';
import TalentQuiz from './components/TalentQuiz';
import CareerDetail from './components/CareerDetail';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'quiz' | 'result' | 'careers' | 'chat'>('home');
  const [userArchetype, setUserArchetype] = useState<TalentArchetype | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  // Logic to select a daily proverb based on the current date
  const dailyProverb = useMemo(() => {
    const today = new Date();
    // Use the day of the year to pick a proverb consistently for the day
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % DAILY_PROVERBS.length;
    return DAILY_PROVERBS[index];
  }, []);

  const handleQuizComplete = (archetype: TalentArchetype) => {
    setUserArchetype(archetype);
    setView('result');
  };

  const NavItem = ({ label, target, active }: { label: string, target: typeof view, active: boolean }) => (
    <button 
      onClick={() => setView(target)}
      className={`px-4 py-2 rounded-lg transition-all text-sm font-bold ${
        active ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
      }`}
    >
      {label}
    </button>
  );

  const studentAvatars = [
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&q=80&w=100&h=100",
    "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=100&h=100"
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full ghana-gradient -z-10 pointer-events-none"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-yellow-200 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-[80] bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => setView('home')}>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-black italic text-xl">C</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none">THE CAREER</h1>
              <span className="text-[10px] font-black text-green-700 tracking-[0.2em] uppercase">Path • Ghana</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2">
            <NavItem label="Home" target="home" active={view === 'home'} />
            <NavItem label="Discoveries" target="careers" active={view === 'careers'} />
            <NavItem label="AI Counselor" target="chat" active={view === 'chat'} />
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button 
              onClick={() => setView('quiz')}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm shadow-md transition-all active:scale-95"
            >
              Talent Quiz
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Detail Overlay */}
      {selectedCareer && (
        <CareerDetail 
          career={selectedCareer} 
          onClose={() => setSelectedCareer(null)} 
        />
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-16">
        
        {view === 'home' && (
          <div className="space-y-24">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border border-green-100 shadow-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Modern Ghanaian Careers</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight">
                  Design your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-yellow-500 to-red-600">own legacy.</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  The Career Path helps Ghanaian students navigate the future. Explore 50+ professions, discover your inner talents, and find the right university to start your journey.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <button 
                    onClick={() => setView('careers')}
                    className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 active:scale-95"
                  >
                    Explore Professions
                  </button>
                  <button 
                    onClick={() => setView('chat')}
                    className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:border-slate-800 transition-all active:scale-95"
                  >
                    Talk to AI Guide
                  </button>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-6 pt-6">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((src, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={src} className="w-full h-full object-cover" alt="Student Avatar" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-slate-500">
                    <span className="text-slate-900">5,000+</span> Ghanaian students guided
                  </p>
                </div>
              </div>
              <div className="flex-1 relative w-full">
                <div className="relative aspect-square md:aspect-auto md:h-[500px] w-full bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
                   <img 
                    src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover" 
                    alt="Young professional in Ghana" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-700">
                    <p className="text-white font-black text-xl italic leading-tight animate-in fade-in slide-in-from-bottom-2 duration-1000">
                      "{dailyProverb.text}"
                    </p>
                    <p className="text-white/60 text-sm mt-2 font-bold uppercase tracking-widest">— {dailyProverb.author}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Discoveries */}
            <section className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-slate-900 tracking-tight">Profession Discoveries</h3>
                   <p className="text-slate-500 font-medium">Click on any career to learn about entry requirements and salaries in Ghana.</p>
                </div>
                <button 
                  onClick={() => setView('careers')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-black text-sm transition-all"
                >
                  See All Careers
                </button>
              </div>
              <div className="profession-grid">
                {GHANAIAN_CAREERS.slice(0, 8).map(career => (
                  <CareerCard 
                    key={career.id} 
                    career={career} 
                    onClick={(c) => setSelectedCareer(c)}
                  />
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center text-white space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-[80px]"></div>
               
               <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Don't know where to start?</h3>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                 Take our 2-minute talent discovery quiz to see which career archetypes best match your unique personality and skills.
               </p>
               <button 
                 onClick={() => setView('quiz')}
                 className="bg-yellow-400 text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-yellow-400/20"
               >
                 Take Discovery Quiz
               </button>
            </section>
          </div>
        )}

        {view === 'quiz' && (
          <div className="py-8">
            <TalentQuiz onComplete={handleQuizComplete} />
          </div>
        )}

        {view === 'result' && (
          <div className="max-w-3xl mx-auto text-center space-y-10 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden animate-in zoom-in duration-500">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>
            <div className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center mx-auto text-5xl shadow-2xl shadow-yellow-200 ring-8 ring-yellow-50">
              🏆
            </div>
            <div className="space-y-4">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Discovery Complete</h2>
              <h3 className="text-5xl font-black text-slate-900">You are <span className="text-green-600">{userArchetype}</span></h3>
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                Your natural strengths align perfectly with high-impact roles in {userArchetype === 'The Builder' ? 'infrastructure and tech' : 'leadership and creativity'}. Let's see your matches.
              </p>
            </div>
            <div className="pt-6 flex flex-col md:flex-row justify-center gap-4">
              <button 
                onClick={() => setView('careers')}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-slate-200"
              >
                View Recommended Paths
              </button>
              <button 
                onClick={() => setView('chat')}
                className="bg-green-700 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-green-100"
              >
                Personalized AI Session
              </button>
            </div>
          </div>
        )}

        {view === 'careers' && (
          <div className="space-y-16">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">Profession Library</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Explore the most relevant and high-paying professions in Ghana today. We've compiled details on entry requirements and top local universities for each path.
              </p>
            </div>
            <div className="profession-grid">
              {GHANAIAN_CAREERS.map(career => (
                <CareerCard 
                  key={career.id} 
                  career={career} 
                  onClick={(c) => setSelectedCareer(c)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'chat' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">AI Career Counselor</h2>
              <p className="text-slate-500 text-lg font-medium">
                Ask about BECE/WASSCE grades, choosing the right university, or searching for internship opportunities in Accra, Kumasi, and beyond.
              </p>
            </div>
            <ChatInterface />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-black italic">C</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter">THE CAREER PATH</h1>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              We are on a mission to ensure every Ghanaian student finds their purpose and builds a prosperous career that contributes to national development.
            </p>
            <div className="flex space-x-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                  <span className="text-xs">FB</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                  <span className="text-xs">X</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                  <span className="text-xs">IG</span>
               </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-yellow-400">Navigation</h4>
            <ul className="text-slate-400 text-sm space-y-3 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('home')}>Home</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('quiz')}>Talent Quiz</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('careers')}>Profession Library</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setView('chat')}>AI Counselor</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-yellow-400">Higher Ed Partners</h4>
            <ul className="text-slate-400 text-sm space-y-3 font-medium">
              <li className="hover:text-white transition-colors">University of Ghana</li>
              <li className="hover:text-white transition-colors">KNUST</li>
              <li className="hover:text-white transition-colors">Ashesi University</li>
              <li className="hover:text-white transition-colors">UCC</li>
              <li className="hover:text-white transition-colors">GCTU</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-yellow-400">Stay Updated</h4>
            <p className="text-slate-400 text-xs mb-4">Get the latest career trends and scholarship updates in Ghana.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-xl text-xs px-4 py-2 w-full focus:ring-1 focus:ring-yellow-400" />
              <button className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-xl text-xs font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} The Career Path Project</span>
          <div className="flex space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accra, Ghana</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
