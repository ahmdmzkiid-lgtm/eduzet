import React, { useEffect } from 'react';
import { useTryoutFetch } from '../hooks/useTryoutFetch';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import toast from 'react-hot-toast';

/**
 * CONTOH PENGGUNAAN useTryoutFetch Hook
 * 
 * Component ini mendemonstrasikan:
 * 1. Fetch 160 soal dengan single API call
 * 2. Filter by category/subtes
 * 3. Track user answers dengan localStorage
 * 4. Submit all answers dalam satu request
 * 5. Display answer statistics
 */
const TryoutWithSingleFetch = ({ tryoutPackageId }) => {
  const {
    // State
    allQuestions,
    userAnswers,
    loading,
    submitting,
    error,
    activeCategory,
    metadata,

    // Methods
    fetchAllQuestions,
    getCurrentQuestions,
    saveAnswer,
    toggleFlag,
    getAnswerStats,
    handleSubmitAllAnswers,
    setActiveCategory,
  } = useTryoutFetch(tryoutPackageId);

  // ===== LIFECYCLE =====
  useEffect(() => {
    // Fetch 160 soal saat component mount
    if (tryoutPackageId) {
      fetchAllQuestions(tryoutPackageId);
    }
  }, [tryoutPackageId, fetchAllQuestions]);

  // ===== EVENT HANDLERS =====
  const handleSelectAnswer = (questionId, choiceId) => {
    saveAnswer(questionId, choiceId, { sessionId: tryoutPackageId });
    toast.success('Jawaban disimpan ✅', { duration: 1.5 });
  };

  const handleFlagQuestion = (questionId) => {
    toggleFlag(questionId);
    toast.success('Soal ditandai 🚩', { duration: 1 });
  };

  const handleSubmit = async () => {
    if (!confirm('Apakah Anda yakin ingin submit semua jawaban?')) return;

    try {
      await handleSubmitAllAnswers(tryoutPackageId, (response) => {
        // Redirect ke hasil atau show score
        console.log('Submit response:', response);
        // navigate('/hasil-tryout', { state: response.data });
      });
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mb-4 relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Memuat Soal Tryout...
          </h2>
          <p className="text-gray-600 mb-4">
            📤 Mengambil 160 soal dari database Neon (ini mungkin butuh 5-10 detik)
          </p>
          <div className="max-w-md mx-auto text-sm text-gray-500">
            <p>💡 Tips: Pastikan internet stabil</p>
            <p>⏳ Jangan refresh halaman selama loading</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== ERROR STATE =====
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-2">❌ Gagal Memuat Soal</h2>
          <p className="mb-4">{error}</p>
          <Button
            onClick={() => fetchAllQuestions(tryoutPackageId)}
            className="bg-red-600 hover:bg-red-700"
          >
            🔄 Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  // ===== CALCULATE STATS =====
  const stats = getAnswerStats();
  const currentQuestions = getCurrentQuestions();

  // ===== RENDER =====
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-indigo-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📝 Tryout UTBK
              </h1>
              <p className="text-sm text-gray-600">
                Total: <strong>{metadata.totalQuestions} soal</strong> | 
                Dijawab: <strong>{stats.totalAnswered}</strong> | 
                Ditandai: <strong>{stats.totalFlagged}</strong>
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              {submitting ? '📤 Mengirim...' : '✅ Submit Jawaban'}
            </Button>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {metadata.totalCategories.map((category) => {
              const categoryStats = stats.answersByCategory[category];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-4 py-2 rounded-lg font-semibold whitespace-nowrap
                    transition-all duration-200 flex items-center gap-2
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  <span>{category}</span>
                  <Badge
                    variant={isActive ? 'light' : 'default'}
                    className="text-xs"
                  >
                    {categoryStats?.answered}/{categoryStats?.total}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QUESTIONS SECTION */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {currentQuestions.map((question, index) => {
                const userAnswer = userAnswers[question.id];
                const isFlagged = userAnswer?.flagged;

                return (
                  <div
                    key={question.id}
                    className={`
                      bg-white rounded-lg shadow-md p-6 border-l-4 transition-all
                      ${isFlagged ? 'border-l-yellow-500 bg-yellow-50' : 'border-l-indigo-500'}
                    `}
                  >
                    {/* QUESTION NUMBER & FLAG */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {index + 1}. {question.content?.substring(0, 80)}...
                      </h3>
                      <button
                        onClick={() => handleFlagQuestion(question.id)}
                        className={`
                          text-2xl transition-transform hover:scale-110
                          ${isFlagged ? 'text-yellow-500' : 'text-gray-300'}
                        `}
                        title="Tandai soal penting"
                      >
                        🚩
                      </button>
                    </div>

                    {/* QUESTION IMAGE */}
                    {question.image_url && (
                      <img
                        src={question.image_url}
                        alt="Question"
                        className="mb-4 max-w-full rounded-lg"
                      />
                    )}

                    {/* ANSWER CHOICES */}
                    <div className="space-y-2">
                      {question.choices?.map((choice) => {
                        const isSelected = userAnswer?.choiceId === choice.id;
                        const isCorrect = choice.is_correct;

                        return (
                          <label
                            key={choice.id}
                            className={`
                              flex items-start gap-3 p-3 rounded-lg cursor-pointer
                              transition-all border-2
                              ${
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-50'
                                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                              }
                            `}
                          >
                            <input
                              type="radio"
                              name={`question_${question.id}`}
                              value={choice.id}
                              checked={isSelected}
                              onChange={() => handleSelectAnswer(question.id, choice.id)}
                              className="mt-1"
                            />
                            <span className="flex-1">
                              <strong className="text-lg">{choice.label}.</strong>
                              {' '}{choice.content}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* EXPLANATION */}
                    {question.choices?.[0]?.explanation && (
                      <details className="mt-4 pt-4 border-t border-gray-200">
                        <summary className="cursor-pointer text-blue-600 font-semibold hover:text-blue-800">
                          📖 Lihat Pembahasan
                        </summary>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-gray-700">
                          {question.choices[0].explanation}
                        </div>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR: STATISTICS & QUICK NAV */}
          <aside className="lg:col-span-1">
            {/* STATS CARD */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 text-gray-900">📊 Statistik</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span>✅ Dijawab</span>
                  <strong className="text-lg text-green-600">{stats.totalAnswered}</strong>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span>🚩 Ditandai</span>
                  <strong className="text-lg text-yellow-600">{stats.totalFlagged}</strong>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span>❓ Belum Dijawab</span>
                  <strong className="text-lg text-red-600">{stats.totalUnanswered}</strong>
                </div>
              </div>

              {/* PROGRESS PER CATEGORY */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold mb-3 text-gray-900">Per Subtes</h4>
                <div className="space-y-3">
                  {Object.entries(stats.answersByCategory).map(([cat, catStats]) => (
                    <div key={cat} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-gray-700">{cat}</span>
                        <span className="text-indigo-600 font-bold">
                          {catStats.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${catStats.percentage}%` }}
                        />
                      </div>
                      <div className="text-gray-500 mt-1">
                        {catStats.answered}/{catStats.total} soal
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                onClick={handleSubmit}
                disabled={submitting || stats.totalUnanswered > 0}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
              >
                {submitting ? '📤 Mengirim...' : '✅ Submit Sekarang'}
              </Button>

              {stats.totalUnanswered > 0 && (
                <p className="text-xs text-orange-600 mt-2 text-center">
                  ⚠️ Masih ada {stats.totalUnanswered} soal yang belum dijawab
                </p>
              )}
            </div>

            {/* INFO CARD */}
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-900">
              <h4 className="font-bold mb-2">💡 Catatan:</h4>
              <ul className="space-y-1 text-xs">
                <li>✅ Jawaban disimpan otomatis di browser</li>
                <li>🚩 Tandai soal sulit untuk direview</li>
                <li>📱 Responsif di semua device</li>
                <li>🔄 Refresh halaman, jawaban tetap ada</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TryoutWithSingleFetch;
