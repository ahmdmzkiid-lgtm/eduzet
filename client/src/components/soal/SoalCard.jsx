import React from 'react';
import Badge from '../ui/Badge';
import MathText from '../MathText';
import ZoomableImage from '../ui/ZoomableImage';

const SoalCard = ({ question, index, onBookmarkToggle, isBookmarked }) => {
  if (!question) return null;

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center font-bold">
            {index || 1}
          </span>
          <Badge variant={
            question.difficulty === 'easy' ? 'success' :
            question.difficulty === 'medium' ? 'warning' : 'danger'
          }>
            {question.difficulty.toUpperCase()}
          </Badge>
        </div>
        
        <button 
          onClick={() => onBookmarkToggle(question.id)}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked 
              ? 'text-accent-amber bg-amber-500/10 hover:bg-amber-500/20' 
              : 'text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white'
          }`}
          title="Bookmark this question"
        >
          <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div className="prose prose-invert max-w-none mb-8">
        {question.image_url && question.image_position === 'before' && (
          <ZoomableImage src={question.image_url} alt="Question image" className="mb-4 rounded-lg max-h-64 object-contain" />
        )}
        <MathText className="text-lg leading-relaxed text-slate-200" text={question.content || ''} />
        {question.image_url && question.image_position !== 'before' && (
          <ZoomableImage src={question.image_url} alt="Question image" className="mt-4 rounded-lg max-h-64 object-contain" />
        )}
      </div>
    </div>
  );
};

export default SoalCard;
