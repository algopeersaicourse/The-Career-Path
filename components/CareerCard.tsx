
import React from 'react';
import { Career } from '../types';

interface CareerCardProps {
  career: Career;
  onClick?: (career: Career) => void;
}

const CareerCard: React.FC<CareerCardProps> = ({ career, onClick }) => {
  return (
    <div 
      onClick={() => onClick?.(career)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group cursor-pointer active:scale-[0.98]"
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={career.image} 
          alt={career.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-xs font-bold uppercase tracking-wider">Discover More →</span>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
           <span className="px-2 py-1 text-[10px] font-bold bg-white/90 backdrop-blur text-slate-900 rounded-lg shadow-sm">
            {career.sector}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-slate-800 group-hover:text-green-700 transition-colors">{career.title}</h3>
        <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">{career.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400">Growth</span>
            <span className={`text-xs font-bold ${
              career.growthPotential === 'High' ? 'text-blue-600' : 'text-slate-600'
            }`}>
              {career.growthPotential}
            </span>
          </div>
          <button className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
