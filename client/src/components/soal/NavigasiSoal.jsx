import React from 'react';
import Button from '../ui/Button';

const NavigasiSoal = ({ 
  onPrev, 
  onNext, 
  disablePrev, 
  disableNext, 
  currentNum, 
  totalNum,
  showSubmit,
  onSubmit
}) => {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
      <Button 
        variant="secondary" 
        onClick={onPrev} 
        disabled={disablePrev}
        className="min-w-[120px]"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Sebelumnya
      </Button>

      <div className="text-slate-400 font-medium">
        Soal {currentNum} dari {totalNum}
      </div>

      {showSubmit ? (
        <Button 
          variant="primary" 
          onClick={onSubmit}
          className="min-w-[120px]"
        >
          Submit Tryout
        </Button>
      ) : (
        <Button 
          variant="primary" 
          onClick={onNext} 
          disabled={disableNext}
          className="min-w-[120px]"
        >
          Berikutnya
          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default NavigasiSoal;
