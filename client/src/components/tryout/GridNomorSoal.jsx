import React from 'react';

const GridNomorSoal = ({ total, currentIndex, answers, flagged, onSelect }) => {
  // Generate array of numbers
  const numbers = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="glass-card p-5 sticky top-24">
      <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Navigasi Soal</h3>
      
      <div className="grid grid-cols-5 gap-2">
        {numbers.map((index) => {
          const isCurrent = currentIndex === index;
          const isAnswered = !!answers[index];
          const isFlagged = flagged[index];
          
          let bgColor = "bg-slate-800 text-slate-300 border-slate-700"; // Unanswered
          
          if (isFlagged) {
            bgColor = "bg-amber-500 text-white border-amber-600";
          } else if (isAnswered) {
            bgColor = "bg-accent-emerald text-white border-emerald-600";
          }
          
          if (isCurrent) {
            bgColor += " ring-2 ring-white ring-offset-2 ring-offset-bg-primary";
          }

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-full aspect-square flex items-center justify-center rounded border font-medium text-sm transition-all hover:opacity-80 ${bgColor}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></div>
          <span>Belum Dijawab</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="w-3 h-3 rounded bg-accent-emerald"></div>
          <span>Sudah Dijawab</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <div className="w-3 h-3 rounded bg-amber-500"></div>
          <span>Ragu-ragu</span>
        </div>
      </div>
    </div>
  );
};

export default GridNomorSoal;
