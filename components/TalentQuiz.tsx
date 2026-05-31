
import React, { useState } from 'react';
import { TalentArchetype } from '../types';
import { QUIZ_QUESTIONS } from '../constants';

interface TalentQuizProps {
  onComplete: (archetype: TalentArchetype) => void;
}

const TalentQuiz: React.FC<TalentQuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<TalentArchetype[]>([]);

  const handleSelect = (archetype: TalentArchetype) => {
    const newAnswers = [...answers, archetype];
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      // Logic for final result: most frequent archetype
      const counts: Record<string, number> = {};
      newAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);
      const winningArchetype = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as TalentArchetype;
      onComplete(winningArchetype);
    }
  };

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
          <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 leading-tight">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt.archetype)}
            className="w-full p-4 text-left border-2 border-slate-100 rounded-xl hover:border-slate-800 hover:bg-slate-50 transition-all flex items-center group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-4 group-hover:bg-slate-800 group-hover:text-white font-bold text-sm transition-colors">
              {String.fromCharCode(65 + idx)}
            </div>
            <span className="text-slate-700 font-medium">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TalentQuiz;
