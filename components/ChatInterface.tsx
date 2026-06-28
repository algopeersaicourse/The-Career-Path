
import React, { useState, useEffect, useRef } from 'react';
import { CareerChatService } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery, onClearInitialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatServiceRef = useRef<CareerChatService | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lazy initialize service synchronously so it is ready immediately
  if (!chatServiceRef.current) {
    chatServiceRef.current = new CareerChatService();
  }

  useEffect(() => {
    // Welcome message if not loaded
    if (messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: "Hi there! 👋 Welcome to The Career Path Ghana!\n\nI am your ChatGPT-powered AI Career Counselor. I'm here to help you navigate your academic journey, discover modern high-growth professions, and plan your professional legacy in Ghana.\n\nFeel free to ask me anything about college courses, career paths, top-tier universities, or industry insights. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || !chatServiceRef.current) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) {
      setInput('');
    }
    setIsTyping(true);

    try {
      const result = await chatServiceRef.current.sendMessage(textToSend);
      const modelMessage: ChatMessage = {
        role: 'model',
        text: result.text,
        timestamp: new Date(),
        sources: result.sources
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (initialQuery && chatServiceRef.current) {
      handleSend(initialQuery);
      onClearInitialQuery?.();
    }
  }, [initialQuery]);

  return (
    <div className="flex flex-col h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 p-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Career Counselor" 
              className="w-12 h-12 rounded-2xl object-cover shadow-inner border border-white/10"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-white font-black tracking-tight">The Career Counselor</h2>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">AI Professional Guide</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
           </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-[1.5rem] p-5 shadow-sm transition-all ${
              m.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{m.text}</p>
              
              {/* Added: Display grounding sources from Google Search */}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100/50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Sources & References:</p>
                  <div className="flex flex-wrap gap-2">
                    {m.sources.map((source: any, sIdx: number) => {
                      const web = source.web;
                      if (!web) return null;
                      return (
                        <a 
                          key={sIdx}
                          href={web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[10px] px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
                            m.role === 'user' 
                              ? 'bg-white/10 hover:bg-white/20 text-white' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span className="truncate max-w-[150px]">{web.title || 'Source'}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <span className="text-[10px] font-bold opacity-30 mt-3 block uppercase tracking-tighter">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-5 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex space-x-3 items-center"
        >
          <div className="flex-1 bg-slate-100 rounded-2xl flex items-center px-4 focus-within:ring-2 focus-within:ring-slate-900 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about careers in Ghana..."
              className="w-full py-4 bg-transparent border-none text-sm outline-none font-medium placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-slate-900 text-white w-14 h-14 rounded-2xl font-black flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-90 shadow-xl shadow-slate-200"
          >
            <svg className="w-6 h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
