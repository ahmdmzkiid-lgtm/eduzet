import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import Button from '../ui/Button';

const TryoutHeader = ({ title, durationMinutes, onExpire, onForceSubmit }) => {
  const { formattedTime, isExpired, timeLeft } = useTimer(durationMinutes * 60, onExpire);
  
  // Start automatically (simplified for this component)
  // In a real app, we might wait for the user to click "Start"
  React.useEffect(() => {
    // start is omitted here because we'd need to expose it or handle it at the page level
  }, []);

  const isWarning = timeLeft > 0 && timeLeft <= 5 * 60; // Less than 5 minutes

  return (
    <div className="sticky top-0 z-30 glass-card rounded-none border-x-0 border-t-0 mb-6 p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white truncate">{title}</h2>
          <p className="text-sm text-text-secondary">Simulasi UTBK SNBT</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xl font-bold transition-colors ${
            isExpired ? 'bg-red-500/20 text-red-500' :
            isWarning ? 'bg-amber-500/20 text-amber-500 animate-pulse' :
            'bg-slate-800 text-slate-200'
          }`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formattedTime}</span>
          </div>

          <Button variant="danger" onClick={onForceSubmit}>
            Selesai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TryoutHeader;
