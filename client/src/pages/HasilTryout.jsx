import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import DiscussQuestionModal from '../components/DiscussQuestionModal';
import MathText from '../components/MathText';

const HasilTryout = () => {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  // Discussion State
  const [isDiscussOpen, setIsDiscussOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const openDiscussion = (wa) => {
    // Map legacy wa object to standard question format for modal
    const mappedQuestion = {
      content: wa.content,
      choices: [
        { label: 'A', content: '', is_correct: wa.correctChoice === 'A' },
        { label: 'B', content: '', is_correct: wa.correctChoice === 'B' },
        { label: 'C', content: '', is_correct: wa.correctChoice === 'C' },
        { label: 'D', content: '', is_correct: wa.correctChoice === 'D' },
        { label: 'E', content: '', is_correct: wa.correctChoice === 'E' },
      ],
      userAnswer: wa.userChoice,
      isCorrect: false,
      explanation: wa.explanation
    };
    setSelectedQuestion(mappedQuestion);
    setIsDiscussOpen(true);
  };

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setResult({
        total_score: 650,
        breakdown: { benar: 45, salah: 10, kosong: 5, score: 650 },
        subjects: [
          { name: 'TPS', score: 250, max: 400 },
          { name: 'TKA Saintek', score: 400, max: 600 }
        ],
        wrongAnswers: [
          {
            id: '1',
            content: 'Soal yang salah dijawab',
            userChoice: 'A',
            correctChoice: 'B',
            explanation: 'Penjelasan mengapa B benar...'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [sessionId]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const maxPossibleScore = 1000;
  const scorePercentage = (result.total_score / maxPossibleScore) * 100;

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto print:bg-white print:text-black">
      {/* Header / Main Score */}
      <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden print:shadow-none print:border print:border-gray-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-blue to-accent-violet"></div>
        <h1 className="text-2xl font-semibold text-slate-300 mb-2">Skor UTBK Kamu</h1>
        <div className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          {result.total_score}
        </div>
        
        <div className="flex justify-center gap-8 text-sm md:text-base">
          <div className="text-center">
            <div className="text-accent-emerald font-bold text-2xl">{result.breakdown.benar}</div>
            <div className="text-slate-400">Benar</div>
          </div>
          <div className="text-center">
            <div className="text-accent-red font-bold text-2xl">{result.breakdown.salah}</div>
            <div className="text-slate-400">Salah</div>
          </div>
          <div className="text-center">
            <div className="text-slate-500 font-bold text-2xl">{result.breakdown.kosong}</div>
            <div className="text-slate-400">Kosong</div>
          </div>
        </div>
      </div>

      {/* Breakdown per subject (CSS Bar Chart) */}
      <div className="glass-card p-6 md:p-8 print:shadow-none print:border print:border-gray-300">
        <h2 className="text-xl font-bold text-white mb-6">Breakdown per Mata Pelajaran</h2>
        <div className="space-y-6">
          {result.subjects.map((sub, i) => {
            const percentage = (sub.score / sub.max) * 100;
            return (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-300">{sub.name}</span>
                  <span className="font-bold text-white">{sub.score} <span className="text-slate-500 font-normal">/ {sub.max}</span></span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-blue to-accent-violet rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wrong Answers Review */}
      <div className="glass-card p-6 md:p-8 print:hidden">
        <h2 className="text-xl font-bold text-white mb-6">Review Jawaban Salah</h2>
        <div className="space-y-6">
          {result.wrongAnswers.map((wa, i) => (
            <div key={i} className="border border-slate-700/50 rounded-xl p-5 bg-slate-800/30">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <MathText className="text-slate-200 mb-4" text={wa.content || ''} />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                      <span className="text-xs text-red-400 font-semibold block mb-1">JAWABANMU</span>
                      <span className="text-white font-medium">{wa.userChoice}</span>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                      <span className="text-xs text-emerald-400 font-semibold block mb-1">JAWABAN BENAR</span>
                      <span className="text-white font-medium">{wa.correctChoice}</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-4 mt-2 border border-slate-700">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">PENJELASAN</span>
                    <MathText className="text-slate-300 text-sm leading-relaxed" text={wa.explanation || ''} />
                  </div>
                </div>

                {/* Elegant Chat Button */}
                <div className="md:w-56 flex-shrink-0">
                  <button 
                    onClick={() => openDiscussion(wa)}
                    className="w-full h-full min-h-[120px] bg-slate-800/50 border-2 border-dashed border-accent-blue/30 rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-accent-blue/20">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <span className="text-[13px] font-bold text-white mb-1">Masih Bingung?</span>
                    <span className="text-[11px] text-slate-400 font-medium leading-tight">Chat dengan Kak Z untuk Membahas soal ini</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discuss Modal */}
      {selectedQuestion && (
        <DiscussQuestionModal 
          isOpen={isDiscussOpen} 
          onClose={() => setIsDiscussOpen(false)} 
          question={selectedQuestion} 
        />
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4 print:hidden">
        <Button variant="secondary" onClick={() => window.print()}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Download PDF
        </Button>
        <Link to="/dashboard">
          <Button variant="primary">Kembali ke Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default HasilTryout;
