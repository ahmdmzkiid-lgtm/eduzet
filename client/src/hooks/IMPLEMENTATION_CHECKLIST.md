# ✅ Implementation Checklist & Ready-to-Use Code Snippets

## 🎯 Pre-Implementation Checklist

- [ ] React Hook sudah dibuat: `useTryoutFetch.js` ✓
- [ ] Backend endpoint sudah dibuat: `POST /api/tryout/submit-bulk` ✓
- [ ] Example component sudah ada: `TryoutWithSingleFetch.jsx` ✓
- [ ] Database sudah support: `tryout_sessions`, `user_answers`, `questions` ✓
- [ ] localStorage supported di target browser ✓
- [ ] axios installed dan dikonfigurasi ✓
- [ ] react-hot-toast installed untuk notifications ✓

---

## 📋 Integration Checklist

### Backend Setup
- [ ] Route import di `app.js` sudah terdaftar
  ```javascript
  // Check in server/src/app.js
  app.use('/api/tryout', tryoutRoutes);
  ```
- [ ] Endpoint `/api/tryout/submit-bulk` tested dengan Postman/Thunder Client
- [ ] Database migrations sudah run
  ```bash
  npm run migrate  # atau check migration scripts
  ```
- [ ] JWT middleware working untuk `verifyToken`

### Frontend Setup
- [ ] Hook file exists: `client/src/hooks/useTryoutFetch.js`
- [ ] Example component exists: `client/src/pages/TryoutWithSingleFetch.jsx`
- [ ] Import dalam project sudah tested
- [ ] VITE_API_URL env var ada di `.env` atau `.env.local`

---

## 🔧 Copy-Paste Code Snippets

### Snippet 1: Basic Component Setup
```jsx
import React, { useEffect, useState } from 'react';
import { useTryoutFetch } from '../hooks/useTryoutFetch';
import toast from 'react-hot-toast';

export function MyTryoutComponent({ tryoutPackageId }) {
  const {
    allQuestions,
    userAnswers,
    loading,
    submitting,
    error,
    activeCategory,
    metadata,
    fetchAllQuestions,
    getCurrentQuestions,
    saveAnswer,
    toggleFlag,
    getAnswerStats,
    handleSubmitAllAnswers,
    setActiveCategory,
  } = useTryoutFetch(tryoutPackageId);

  // Fetch soal saat component mount
  useEffect(() => {
    if (tryoutPackageId) {
      fetchAllQuestions(tryoutPackageId);
    }
  }, [tryoutPackageId, fetchAllQuestions]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">📚</div>
          <p className="text-lg font-semibold">Memuat 160 soal...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-bold">Error: {error}</p>
          <button
            onClick={() => fetchAllQuestions(tryoutPackageId)}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return <div>Component ready!</div>;
}
```

### Snippet 2: Category Tabs
```jsx
<div className="flex gap-2 overflow-x-auto pb-2">
  {metadata.totalCategories.map((category) => (
    <button
      key={category}
      onClick={() => setActiveCategory(category)}
      className={`
        px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all
        ${
          activeCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
      `}
    >
      {category}
    </button>
  ))}
</div>
```

### Snippet 3: Question List Display
```jsx
<div className="space-y-6">
  {getCurrentQuestions().map((question, index) => {
    const userAnswer = userAnswers[question.id];

    return (
      <div
        key={question.id}
        className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
      >
        {/* Question header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">
            {index + 1}. {question.content?.substring(0, 80)}...
          </h3>
          <button
            onClick={() => toggleFlag(question.id)}
            className={`text-2xl ${userAnswer?.flagged ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            🚩
          </button>
        </div>

        {/* Question image */}
        {question.image_url && (
          <img src={question.image_url} alt="Question" className="mb-4 max-w-full rounded" />
        )}

        {/* Answer choices */}
        <div className="space-y-2">
          {question.choices?.map((choice) => {
            const isSelected = userAnswer?.choiceId === choice.id;

            return (
              <label
                key={choice.id}
                className={`
                  flex items-start gap-3 p-3 rounded-lg cursor-pointer
                  transition-all border-2
                  ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={choice.id}
                  checked={isSelected}
                  onChange={() => {
                    saveAnswer(question.id, choice.id, {
                      sessionId: tryoutPackageId,
                    });
                    toast.success('✓', { duration: 1 });
                  }}
                />
                <span>
                  <strong>{choice.label}.</strong> {choice.content}
                </span>
              </label>
            );
          })}
        </div>

        {/* Explanation */}
        {question.choices?.[0]?.explanation && (
          <details className="mt-4 pt-4 border-t">
            <summary className="cursor-pointer text-blue-600 font-semibold">
              📖 Lihat Pembahasan
            </summary>
            <div className="mt-2 p-3 bg-blue-50 rounded text-gray-700">
              {question.choices[0].explanation}
            </div>
          </details>
        )}
      </div>
    );
  })}
</div>
```

### Snippet 4: Statistics Sidebar
```jsx
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-lg font-bold mb-4">📊 Statistik</h3>

  {(() => {
    const stats = getAnswerStats();

    return (
      <>
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between p-2 bg-green-50 rounded">
            <span>✅ Dijawab</span>
            <strong className="text-lg text-green-600">{stats.totalAnswered}</strong>
          </div>
          <div className="flex justify-between p-2 bg-yellow-50 rounded">
            <span>🚩 Ditandai</span>
            <strong className="text-lg text-yellow-600">{stats.totalFlagged}</strong>
          </div>
          <div className="flex justify-between p-2 bg-red-50 rounded">
            <span>❓ Belum</span>
            <strong className="text-lg text-red-600">{stats.totalUnanswered}</strong>
          </div>
        </div>

        {/* Per category progress */}
        <div className="pt-6 border-t space-y-3">
          {Object.entries(stats.answersByCategory).map(([cat, catStats]) => (
            <div key={cat} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{cat}</span>
                <span className="text-blue-600 font-bold">{catStats.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${catStats.percentage}%` }}
                />
              </div>
              <div className="text-gray-500 mt-1">
                {catStats.answered}/{catStats.total}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  })()}
</div>
```

### Snippet 5: Submit Button & Handler
```jsx
<button
  onClick={() => handleSubmit()}
  disabled={submitting}
  className={`
    w-full px-6 py-3 rounded-lg font-bold text-white
    transition-all
    ${
      submitting
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-green-600 hover:bg-green-700'
    }
  `}
>
  {submitting ? '📤 Mengirim Jawaban...' : '✅ Submit Jawaban'}
</button>

{/* Handler function */}
const handleSubmit = async () => {
  const stats = getAnswerStats();

  if (stats.totalUnanswered > 0) {
    if (!confirm(`⚠️ Masih ada ${stats.totalUnanswered} soal yang belum dijawab. Lanjutkan?`)) {
      return;
    }
  }

  try {
    await handleSubmitAllAnswers(tryoutPackageId, (response) => {
      console.log('Submit berhasil:', response);
      // Redirect ke hasil
      // navigate('/hasil-tryout', { state: response });
    });
  } catch (err) {
    console.error('Submit gagal:', err);
  }
};
```

---

## 🧪 Testing Checklist

### Unit Testing - Hook Methods
```javascript
// Test fetchAllQuestions
- [ ] Load 160 soal berhasil
- [ ] Error handling jika API gagal
- [ ] Loading state menampil/hilang dengan benar
- [ ] Data tersimpan di state

// Test filtering
- [ ] getQuestionsByCategory return soal yang benar
- [ ] getCurrentQuestions filter sesuai activeCategory
- [ ] Tidak ada API call tambahan

// Test answer tracking
- [ ] saveAnswer update state
- [ ] localStorage backup otomatis
- [ ] toggleFlag bekerja
- [ ] updateTimeSpent akurat

// Test statistics
- [ ] getAnswerStats return data benar
- [ ] Persentase per kategori akurat
- [ ] Total soal dijawab/ditandai/belum accurate

// Test submit
- [ ] handleSubmitAllAnswers format payload benar
- [ ] POST ke /submit-bulk dengan benar
- [ ] Success callback dipanggil
- [ ] localStorage dihapus setelah submit
```

### Integration Testing - Component
```javascript
// Test user flow
- [ ] Component render tanpa crash
- [ ] Fetch dialog tampil saat loading
- [ ] Soal tampil per kategori
- [ ] User bisa pilih jawaban
- [ ] Jawaban tersimpan ke state
- [ ] Jawaban restore dari localStorage after refresh
- [ ] Stats update real-time
- [ ] Submit button disabled jika ada jawaban kosong
- [ ] Submit berhasil dan redirect ke hasil
```

### Performance Testing
```javascript
// Measure timing
- [ ] Fetch 160 soal: < 5 detik (dengan Neon DB)
- [ ] Filtering kategori: < 100ms
- [ ] Render 160 soal: < 1 detik
- [ ] Submit 160 jawaban: < 10 detik
- [ ] localStorage read/write: < 50ms
```

---

## 🔍 Manual Testing with Postman/Thunder Client

### Test 1: Fetch Soal
```
GET http://localhost:3001/api/soal?tryout_package_id=YOUR_PACKAGE_ID&limit=200

Headers:
Authorization: Bearer YOUR_TOKEN

Expected:
- Status 200
- data array dengan 160 objects
- Setiap object punya: id, subject, choices, content
- Response time < 5s
```

### Test 2: Submit Bulk
```
POST http://localhost:3001/api/tryout/submit-bulk

Headers:
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

Body:
{
  "sessionId": "YOUR_SESSION_ID",
  "answers": [
    {
      "questionId": "q-uuid-1",
      "choiceId": "choice-uuid-a",
      "flagged": false,
      "timeSpent": 45
    },
    {
      "questionId": "q-uuid-2",
      "choiceId": null,
      "flagged": true,
      "timeSpent": 0
    }
    // ... 158 more
  ],
  "stats": {
    "totalAnswered": 158,
    "totalFlagged": 1
  },
  "submittedAt": "2026-05-14T11:00:00Z"
}

Expected:
- Status 200
- data.success: true
- data.totalScore: number (487.5 etc)
- data.scoreBreakdown: object dengan scoring details
```

---

## 🚨 Common Issues & Fixes

### Issue: "VITE_API_URL tidak ditemukan"
**Fix:**
```bash
# File: client/.env atau client/.env.local
VITE_API_URL=http://localhost:3001/api
```

### Issue: "401 Unauthorized saat submit"
**Fix:**
```javascript
// Check token di localStorage
localStorage.getItem('token')

// Token ada tapi masih error? Check di backend:
// middleware/auth.js sudah benar implement verifyToken?
```

### Issue: "localStorage kosong setelah submit"
**Ini normal!** localStorage auto-cleared setelah submit berhasil.
```javascript
// Verify di browser console:
localStorage.getItem(`tryout_answers_${sessionId}`)
// Should return null ✓
```

### Issue: "Soal tidak muncul / blank"
**Debug:**
```javascript
// Di browser console:
console.log('allQuestions:', allQuestions);
console.log('activeCategory:', activeCategory);
console.log('currentQuestions:', getCurrentQuestions());
```

---

## 📊 Database Verification

```sql
-- Check database adalah setup dengan benar

-- 1. Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('questions', 'answer_choices', 'tryout_sessions', 'user_answers');

-- 2. Check 160 soal tersedia
SELECT COUNT(*) as total_questions FROM questions
WHERE tryout_package_id = 'YOUR_PACKAGE_UUID';

-- 3. Check user sessions
SELECT * FROM tryout_sessions 
WHERE user_id = 'YOUR_USER_UUID'
LIMIT 1;
```

---

## 🎯 Final Validation

### Before Going Live
- [ ] Hook tested dengan 160 soal real dari database
- [ ] Component render tanpa crash / console errors
- [ ] localStorage backup working
- [ ] Submit endpoint tested
- [ ] Scoring calculated correctly
- [ ] UI responsive di mobile
- [ ] Loading states working
- [ ] Error handling tested
- [ ] Performance acceptable (< 10s untuk semua operasi)

### Deployment Checklist
- [ ] Environment variables set (.env production)
- [ ] Database migrations applied
- [ ] API endpoints deployed
- [ ] Frontend built (npm run build)
- [ ] Cache headers configured
- [ ] Error logging setup
- [ ] Monitoring/alerts setup

---

## 🎉 Success Criteria

✅ **Berhasil jika:**
1. 160 soal load dalam satu request
2. User bisa navigate antar kategori instant (no loading)
3. Jawaban terus tersimpan ke state + localStorage
4. UI responsive dan smooth
5. Submit berhasil dan return score
6. Refresh tidak hilangkan jawaban
7. Performance acceptable pada koneksi normal

---

## 📞 Debugging Commands

```javascript
// Di browser console:

// 1. Check hook state
window.TryoutDebug = { hookState }; // jika debug mode active

// 2. Check localStorage
localStorage.getItem('tryout_answers_${sessionId}');
JSON.parse(localStorage.getItem('tryout_answers_${sessionId}'));

// 3. Check API response time
performance.measure('fetch-start', 'fetch-end');

// 4. Check memory usage
console.memory // di Chrome

// 5. Network inspection
// DevTools → Network tab → filter 'soal' → check timing
```

---

**Happy implementing! 🚀**
