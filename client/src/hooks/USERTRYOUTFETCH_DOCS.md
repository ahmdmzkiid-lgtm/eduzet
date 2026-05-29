# 📚 useTryoutFetch Hook - Dokumentasi Teknis

## Overview

Hook React komprehensif untuk mengelola tryout dengan 160 soal yang diambil dalam **satu kali API request**. Dirancang untuk performa optimal pada database Neon dengan fitur caching dan persistence.

---

## ✨ Fitur Utama

### 1. **Single API Fetch untuk 160 Soal**
```typescript
// ✅ Satu request, semua data
const response = await api.get('/soal', {
  params: {
    tryout_package_id: 'uuid-tryout',
    limit: 200  // Ambil sampai 200 untuk memastikan semua 160 soal terambil
  },
  timeout: 30000  // 30 detik untuk Neon yang potentially slow
});
```

**Keuntungan:**
- ⚡ Minimal round trips ke server
- 📦 Efficient bandwidth usage
- 🚀 Lebih cepat daripada load by category
- 💾 Bisa di-cache di browser

---

### 2. **Smart Category/Subtes Filtering (Tanpa API Call)**
```javascript
// Data sudah di-load, filtering lokal INSTANT
const questionsByCategory = getQuestionsByCategory('Penalaran Umum');

// Atau set active category dan ambil current questions
setActiveCategory('Penalaran Umum');
const currentQuestions = getCurrentQuestions();
```

**Internal Logic:**
```javascript
const questionsByCategory = {};
questions.forEach((q) => {
  const category = q.subject?.category || 'uncategorized';
  if (!questionsByCategory[category]) {
    questionsByCategory[category] = [];
  }
  questionsByCategory[category].push(q);
});
```

---

### 3. **User Answers Management dengan localStorage**

#### Save Answer
```javascript
saveAnswer(questionId, choiceId, { sessionId: tryoutPackageId });

// Internal state structure:
// {
//   [questionId]: {
//     choiceId: 'uuid-choice',
//     flagged: false,
//     timeSpent: 45,
//     answeredAt: '2026-05-14T10:30:00.000Z'
//   }
// }
```

#### localStorage Backup
```javascript
const storageKey = `tryout_answers_${sessionId}`;
localStorage.setItem(storageKey, JSON.stringify(userAnswers));

// Automatic restore on component mount
useEffect(() => {
  loadAnswersFromStorage(packageId);
}, [packageId]);
```

#### Recovery After Refresh
```
User membuka halaman → Component mount → 
loadAnswersFromStorage() → Answers restored ✅
```

---

### 4. **Flagging & Time Tracking**

```javascript
// Toggle flag (misalnya untuk soal yang sulit)
toggleFlag(questionId);

// Track waktu yang dihabiskan per soal
updateTimeSpent(questionId, secondsSpent);

// Hasil: { questionId: { flagged: true, timeSpent: 120 } }
```

---

### 5. **Statistics & Progress Tracking**

```javascript
const stats = getAnswerStats();

// Returns:
{
  totalAnswered: 145,
  totalFlagged: 12,
  totalUnanswered: 15,
  answersByCategory: {
    'Penalaran Umum': { answered: 40, total: 45, percentage: 89 },
    'Pengetahuan Kuantitatif': { answered: 50, total: 60, percentage: 83 },
    // ... other categories
  }
}
```

---

### 6. **Submit All Answers Dalam Satu Request**

```javascript
const payload = {
  sessionId,
  answers: [
    { questionId: 'q1', choiceId: 'choice-a', flagged: false, timeSpent: 30 },
    { questionId: 'q2', choiceId: 'choice-b', flagged: true, timeSpent: 45 },
    // ... 158 soal lainnya
  ],
  stats: { totalAnswered: 160, totalFlagged: 5 },
  submittedAt: '2026-05-14T11:15:00.000Z'
};

await api.post('/tryout/submit', payload);
```

---

### 7. **Loading States & Error Handling**

#### Loading State
```javascript
if (loading) {
  return <LoadingSpinner />; // Menunjukkan progress loading
}

// Dengan toast notification:
toast.loading('📚 Memuat 160 soal tryout... (ini mungkin butuh beberapa detik)');
```

#### Error Handling
```javascript
if (error) {
  return <ErrorComponent message={error} />;
}

// Try again button untuk retry fetch
```

---

## 📋 API Responses Structure

### GET /api/soal Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-q1",
      "subject_id": "uuid-subject",
      "subject": {
        "id": "uuid-subject",
        "name": "Penalaran Umum",
        "category": "TPS"
      },
      "topic_id": "uuid-topic",
      "content": "Soal penalaran umum...",
      "image_url": "https://...",
      "difficulty": "medium",
      "tryout_package_id": "uuid-package",
      "choices": [
        {
          "id": "uuid-choice-a",
          "label": "A",
          "content": "Jawaban A",
          "is_correct": false,
          "explanation": "Penjelasan..."
        }
        // ... B, C, D, E
      ]
    }
    // ... 159 soal lainnya
  ]
}
```

### POST /api/tryout/submit Response
```json
{
  "success": true,
  "data": {
    "sessionId": "uuid-session",
    "totalScore": 487.5,
    "scoreBreakdown": {
      "Penalaran Umum": 90,
      "Pengetahuan Kuantitatif": 85,
      // ...
    },
    "resultUrl": "/hasil-tryout/session-id"
  }
}
```

---

## 🎯 Usage Example

### Basic Implementation
```jsx
import { useTryoutFetch } from '../hooks/useTryoutFetch';

function TryoutPage({ tryoutPackageId }) {
  const {
    allQuestions,
    userAnswers,
    loading,
    activeCategory,
    metadata,
    fetchAllQuestions,
    getCurrentQuestions,
    saveAnswer,
    getAnswerStats,
    handleSubmitAllAnswers,
    setActiveCategory,
  } = useTryoutFetch(tryoutPackageId);

  // Load soal saat component mount
  useEffect(() => {
    fetchAllQuestions(tryoutPackageId);
  }, [tryoutPackageId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Tabs untuk category */}
      <div className="flex gap-2">
        {metadata.totalCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Display questions */}
      <div>
        {getCurrentQuestions().map((q, i) => (
          <div key={q.id}>
            <h3>{i + 1}. {q.content}</h3>
            {q.choices.map(choice => (
              <label key={choice.id}>
                <input
                  type="radio"
                  onChange={() => saveAnswer(q.id, choice.id)}
                  checked={userAnswers[q.id]?.choiceId === choice.id}
                />
                {choice.label}. {choice.content}
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div>
        {const stats = getAnswerStats()}
        <p>Dijawab: {stats.totalAnswered}/160</p>
      </div>

      {/* Submit */}
      <button onClick={() => handleSubmitAllAnswers(tryoutPackageId)}>
        Submit
      </button>
    </div>
  );
}
```

---

## 🏗️ Data Flow Architecture

```
┌─────────────────┐
│  Component      │
│  Mount          │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ fetchAllQuestions()     │
│ - Start loading toast   │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ API Call: GET /soal          │
│ - param: tryout_package_id   │
│ - limit: 200                 │
│ - timeout: 30s               │
└────────┬─────────────────────┘
         │
    ┌────┴──────┬─────────────┐
    │ Success   │ Error       │
    ▼           ▼             ▼
 Data    Org by Category  Error toast
 loaded  Set state        Retry button
    │              │
    └──────┬───────┘
           ▼
  ┌──────────────────────┐
  │ loadAnswersFromLS()  │ (auto-restore)
  └──────────────────────┘
           │
           ▼
  ┌──────────────────────┐
  │ Ready to Use!        │
  │ - Show questions     │
  │ - Track answers      │
  └──────────────────────┘
           │
    ┌──────┴──────┬──────────┐
    │ User input  │ Time     │ Flag
    ▼             ▼          ▼
saveAnswer()   updateTime   toggleFlag()
    │             │          │
    └──────┬──────┴──────────┘
           ▼
  ┌──────────────────────┐
  │ Save to State        │
  │ + localStorage       │ (auto-persist)
  └──────────────────────┘
           │
           ▼ (when ready)
  ┌──────────────────────┐
  │ handleSubmitAll()    │
  └────────┬─────────────┘
           │
           ▼
  ┌──────────────────────────────┐
  │ POST /api/tryout/submit      │
  │ - all 160 answers            │
  │ - all stats                  │
  │ - timestamp                  │
  └────────┬─────────────────────┘
           │
    ┌──────┴──────┐
    │ Success     │ Error
    ▼             ▼
 Clear LS   Retry/Toast
 Redirect   Keep answers
```

---

## 📦 localStorage Keys

```javascript
// Main answers backup
localStorage.getItem('tryout_answers_${sessionId}');

// Example content:
{
  "uuid-question-1": {
    "choiceId": "uuid-choice-a",
    "flagged": false,
    "timeSpent": 45,
    "answeredAt": "2026-05-14T10:30:00.000Z"
  },
  "uuid-question-2": {
    "choiceId": "uuid-choice-b",
    "flagged": true,
    "timeSpent": 120,
    "answeredAt": "2026-05-14T10:31:00.000Z"
  }
  // ... 158 soal lainnya
}
```

---

## ⚡ Performance Optimizations

### 1. **Timeout Configuration**
```javascript
api.get('/soal', {
  timeout: 30000  // 30 detik untuk slow DB response
});
```

### 2. **Client-Side Filtering**
```javascript
// ✅ GOOD: Instant filtering pada already-loaded data
getQuestionsByCategory('category'); // O(n) local

// ❌ BAD: API call untuk setiap filter
api.get('/soal', { params: { category } }); // Network latency
```

### 3. **localStorage Caching**
```javascript
// Recover jawaban dari browser storage, tidak dari server
loadAnswersFromStorage(sessionId);
```

### 4. **Single Payload Submit**
```javascript
// ✅ GOOD: 1 request, 160 answers
POST /api/tryout/submit { answers: [...] }

// ❌ BAD: 160 requests, satu per soal
for (each answer) {
  POST /api/answers { answer }
}
```

---

## 🔍 Debugging Tips

### 1. Log State di DevTools
```javascript
console.log('allQuestions:', allQuestions);
console.log('userAnswers:', userAnswers);
console.log('metadata:', metadata);
```

### 2. Check localStorage
```javascript
// Di browser console:
localStorage.getItem('tryout_answers_${sessionId}')
```

### 3. Network Inspection
```
DevTools → Network → Ambil request '/soal'
- Check timing (berapa lama fetch)
- Check payload size
- Check response headers (caching info)
```

### 4. Performance Profiling
```javascript
const start = performance.now();
fetchAllQuestions(packageId);
// ... then:
const duration = performance.now() - start;
console.log(`Fetch time: ${duration}ms`);
```

---

## ❌ Common Pitfalls

### 1. **Multiple Fetches**
```javascript
// ❌ WRONG: Fetch berulang kali
useEffect(() => {
  fetchAllQuestions(packageId);
}, []); // missing dependency

// ✅ CORRECT: Single fetch dengan proper dependencies
useEffect(() => {
  fetchAllQuestions(packageId);
}, [packageId, fetchAllQuestions]);
```

### 2. **Forgetting localStorage Sync**
```javascript
// ❌ WRONG: State updated tapi localStorage tidak
setUserAnswers(newAnswers);

// ✅ CORRECT: Save ke both state dan localStorage
saveAnswer(questionId, choiceId, { sessionId });
```

### 3. **Not Handling Timeouts**
```javascript
// ❌ WRONG: No timeout, bisa hang forever
api.get('/soal');

// ✅ CORRECT: 30 detik timeout
api.get('/soal', { timeout: 30000 });
```

### 4. **Missing Error Boundary**
```javascript
// ❌ WRONG: Fetch error bisa crash app
if (error) throw error;

// ✅ CORRECT: Display user-friendly error
if (error) return <ErrorComponent message={error} />;
```

---

## 🚀 Next Steps / Enhancements

1. **Real-time sync across tabs** - SharedWorker untuk sync jawaban
2. **Offline support** - Service Workers untuk offline functionality
3. **Analytics tracking** - Log answer time, category distribution
4. **Autosave intervals** - Periodic save ke server (setiap 5 menit)
5. **Smart resume** - Continue dari soal terakhir jika interrupted
6. **Progressive loading** - Load questions progressively instead of all at once

---

## 📞 Support

Untuk issues atau pertanyaan, lihat:
- Backend API documentation
- Database schema di migrations/
- Console logs untuk debugging info

Happy trying out! 🎉
