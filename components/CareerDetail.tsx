
import React from 'react';
import { Career } from '../types';

interface CareerDetailProps {
  career: Career;
  onClose: () => void;
}

const CareerDetail: React.FC<CareerDetailProps> = ({ career, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
        >
          <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-72 relative">
          <img src={career.image} className="w-full h-full object-cover" alt={career.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="px-8 pb-10 -mt-16 relative">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm">
              {career.sector}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{career.title}</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {career.description}
            </p>
          </div>

          {/* Gallery Section */}
          {career.gallery && career.gallery.length > 0 && (
            <div className="mb-10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Inspirational Gallery</h4>
              <div className="grid grid-cols-3 gap-3">
                {career.gallery.map((img, idx) => (
                  <div key={idx} className="h-32 rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:scale-[1.02] transition-transform">
                    <img src={img} className="w-full h-full object-cover" alt={`${career.title} visualization ${idx}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Notes Section */}
          {career.detailedNotes && career.detailedNotes.length > 0 && (
            <div className="mb-10 bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                <span className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-[10px] mr-3">📝</span>
                Professional Insights
              </h4>
              <ul className="space-y-4">
                {career.detailedNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start text-slate-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-4 flex-shrink-0"></span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-100 mb-8">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Education Needed
              </h4>
              <ul className="space-y-2">
                {career.educationNeeded.map((edu, idx) => (
                  <li key={idx} className="flex items-start text-slate-600 text-sm font-medium">
                    <span className="text-green-600 mr-2">✓</span>
                    {edu}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Local Institutions
              </h4>
              <ul className="space-y-2">
                {career.localUniversities.map((uni, idx) => (
                  <li key={idx} className="flex items-start text-slate-600 text-sm font-medium">
                    <span className="text-blue-600 mr-2">•</span>
                    {uni}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900 rounded-2xl gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</h4>
              <p className="text-xl font-bold text-white">{career.growthPotential} Potential in Ghana</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full md:w-auto bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl font-black hover:bg-yellow-500 transition-all shadow-lg active:scale-95"
            >
              Start Chat About This Path
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
