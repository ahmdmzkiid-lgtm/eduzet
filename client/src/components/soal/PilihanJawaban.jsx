import React from 'react';
import MathText from '../MathText';

const PilihanJawaban = ({ choices, selectedChoiceId, onSelect, showFeedback }) => {
  return (
    <div className="space-y-3 mt-6">
      {choices.map((choice) => {
        const isSelected = selectedChoiceId === choice.id;
        const isCorrect = choice.is_correct;
        
        // Determine border and background colors based on state
        let stateClasses = "border-slate-700 hover:border-accent-blue hover:bg-slate-800/50";
        let labelBg = "bg-slate-800 text-slate-300";
        
        if (showFeedback) {
          if (isCorrect) {
            stateClasses = "border-accent-emerald bg-emerald-500/5";
            labelBg = "bg-accent-emerald text-white";
          } else if (isSelected && !isCorrect) {
            stateClasses = "border-accent-red bg-red-500/5";
            labelBg = "bg-accent-red text-white";
          } else {
            stateClasses = "border-slate-800 opacity-50";
          }
        } else if (isSelected) {
          stateClasses = "border-accent-blue bg-blue-500/5 ring-1 ring-accent-blue";
          labelBg = "bg-accent-blue text-white";
        }

        return (
          <button
            key={choice.id}
            onClick={() => !showFeedback && onSelect(choice.id)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start space-x-4 ${stateClasses}`}
          >
            <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${labelBg}`}>
              {choice.label}
            </span>
            <MathText className="flex-1 mt-1 text-slate-200 leading-relaxed" text={choice.content || ''} />
            
            {showFeedback && isCorrect && (
              <svg className="shrink-0 w-6 h-6 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {showFeedback && isSelected && !isCorrect && (
              <svg className="shrink-0 w-6 h-6 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PilihanJawaban;
