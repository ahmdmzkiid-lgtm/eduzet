# 🚀 Tryout Single API Fetch - Quick Start Guide

## 📌 Summary

Anda sekarang punya sistem lengkap untuk mengelola **160 soal tryout** dengan:
- ✅ **Single API Fetch** (1 request, 160 soal)
- ✅ **Smart Filtering** (by category/subtes, tanpa API call)
- ✅ **Answer Persistence** (localStorage backup)
- ✅ **Bulk Submit** (160 answers dalam 1 POST request)
- ✅ **Progress Tracking** (statistics dan monitoring)

---

## 📁 Files Created/Modified

### Frontend
```
client/src/
├── hooks/
│   ├── useTryoutFetch.js          ← NEW: Main hook
│   └── USERTRYOUTFETCH_DOCS.md    ← NEW: Detailed docs
└── pages/
    └── TryoutWithSingleFetch.jsx  ← NEW: Example component
```

### Backend
```
server/src/routes/
└── tryout.js                      ← MODIFIED: Added /submit-bulk endpoint
```

---

## 🎯 Implementation Steps

### Step 1: Import Hook dalam Component
```jsx
import { useTryoutFetch } from '../hooks/useTryoutFetch';

function TryoutPage({ tryoutPackageId }) {
  const {
    allQuestions,      // Semua 160 soal
    userAnswers,       // Jawaban user: { questionId: { choiceId, flagged } }
    loading,           // Loading state saat fetch
    submitting,        // Submitting state
    activeCategory,    // Category yang sedang dipilih
    metadata,          // Info: totalQuestions, categories, etc
    
    fetchAllQuestions,       // Method: Fetch 160 soal
    getCurrentQuestions,     // Method: Get questions untuk active category
    saveAnswer,              // Method: Simpan jawaban
    getAnswerStats,          // Method: Get progress stats
    handleSubmitAllAnswers,  // Method: Submit semua jawaban
    setActiveCategory,       // Method: Switch category
  } = useTryoutFetch(tryoutPackageId);
```

### Step 2: Fetch Soal Saat Component Mount
```jsx
useEffect(() => {
  fetchAllQuestions(tryoutPackageId);
}, [tryoutPackageId]);
```

### Step 3: Display Questions by Category
```jsx
// Tab untuk kategori
{metadata.totalCategories.map(cat => (
  <button 
    key={cat}
    onClick={() => setActiveCategory(cat)}
    className={activeCategory === cat ? 'active' : ''}
  >
    {cat}
  </button>
))}

// Display soal category aktif
{getCurrentQuestions().map((q, i) => (
  <div key={q.id}>
    <h3>{i + 1}. {q.content}</h3>
    {q.choices.map(choice => (
      <label key={choice.id}>
        <input
          type="radio"
          checked={userAnswers[q.id]?.choiceId === choice.id}
          onChange={() => saveAnswer(q.id, choice.id)}
        />
        {choice.label}. {choice.content}
      </label>
    ))}
  </div>
))}
```

### Step 4: Display Progress Stats
```jsx
const stats = getAnswerStats();

<div>
  <p>Dijawab: {stats.totalAnswered}/160</p>
  <p>Ditandai: {stats.totalFlagged}</p>
  <p>Belum: {stats.totalUnanswered}</p>
  
  {/* Per category */}
  {Object.entries(stats.answersByCategory).map(([cat, s]) => (
    <div key={cat}>
      <span>{cat}: {s.answered}/{s.total} ({s.percentage}%)</span>
    </div>
  ))}
</div>
```

### Step 5: Submit Jawaban
```jsx
const handleSubmit = async () => {
  try {
    await handleSubmitAllAnswers(tryoutPackageId, (response) => {
      // Success callback
      console.log('Submit response:', response);
      // Navigate ke hasil
      navigate('/hasil-tryout', { state: response });
    });
  } catch (err) {
    console.error('Submit failed:', err);
  }
};

<button onClick={handleSubmit}>Submit Jawaban</button>
```

---

## 🔄 Data Flow Summary

```
1. FETCH (Single API Call)
   ┌─────────────────────────────┐
   │ fetchAllQuestions()         │
   │ ↓                           │
   │ GET /api/soal?              │
   │   tryout_package_id=...     │
   │   limit=200                 │
   └─────────────────────────────┘
                ↓
        160 Soal di-load

2. ORGANIZE & DISPLAY
   ┌─────────────────────────────┐
   │ Group by category           │
   │ ↓                           │
   │ Show UI with tabs           │
   │ Filter on client-side       │ ← NO EXTRA API CALLS
   └─────────────────────────────┘

3. TRACK ANSWERS
   ┌─────────────────────────────┐
   │ User clicks jawaban         │
   │ ↓                           │
   │ saveAnswer(questionId,      │
   │   choiceId)                 │
   │ ↓                           │
   │ Update state + localStorage │
   └─────────────────────────────┘

4. SUBMIT (Bulk)
   ┌─────────────────────────────┐
   │ handleSubmitAllAnswers()    │
   │ ↓                           │
   │ Prepare 160 answers         │
   │ ↓                           │
   │ POST /api/tryout/submit-bulk│
   │ ↓                           │
   │ Backend scoring (IRT)       │
   │ ↓                           │
   │ Return results              │
   └─────────────────────────────┘
```

---

## 💾 localStorage Structure

```javascript
// Key format
localStorage.getItem('tryout_answers_${sessionId}')

// Value structure
{
  "uuid-question-1": {
    "choiceId": "uuid-choice-a",
    "flagged": false,
    "timeSpent": 45,
    "answeredAt": "2026-05-14T10:30:00Z"
  },
  "uuid-question-2": {
    "choiceId": "uuid-choice-b",
    "flagged": true,
    "timeSpent": 120,
    "answeredAt": "2026-05-14T10:31:00Z"
  },
  // ... 158 soal lainnya
}

// Auto-recover saat page refresh ✅
```

---

## 🌐 API Endpoints

### 1. Fetch Questions
```
GET /api/soal?tryout_package_id=UUID&limit=200
┌─────────────┐
│ 30 seconds  │ Timeout untuk slow DB
└─────────────┘

Response:
{
  "success": true,
  "data": [
    {
      "id": "q-uuid",
      "subject": { "name": "...", "category": "..." },
      "content": "...",
      "choices": [
        {
          "id": "c-uuid",
          "label": "A",
          "content": "...",
          "is_correct": false
        }
      ]
    }
    // ... 159 more
  ]
}
```

### 2. Submit Answers (NEW)
```
POST /api/tryout/submit-bulk
Authorization: Bearer <token>

Payload:
{
  "sessionId": "session-uuid",
  "answers": [
    {
      "questionId": "q-uuid",
      "choiceId": "c-uuid",
      "flagged": false,
      "timeSpent": 45
    }
    // ... 159 more
  ],
  "stats": {
    "totalAnswered": 160,
    "totalFlagged": 5
  },
  "submittedAt": "2026-05-14T11:00:00Z"
}

Response:
{
  "success": true,
  "data": {
    "sessionId": "...",
    "totalScore": 487.5,
    "scoreBreakdown": {
      "totalScore": 487.5,
      "subjectScores": { ... },
      "answerCount": 160,
      "scoringMethod": "IRT-3PL"
    }
  }
}
```

---

## 📊 Statistics Output

```javascript
const stats = getAnswerStats();

// Output:
{
  totalAnswered: 145,
  totalFlagged: 12,
  totalUnanswered: 15,
  answersByCategory: {
    "Penalaran Umum": {
      answered: 40,
      total: 45,
      percentage: 89
    },
    "Pengetahuan Kuantitatif": {
      answered: 50,
      total: 60,
      percentage: 83
    },
    // ... other categories
  }
}
```

---

## 🔐 localStorage Backup & Recovery

### Automatic Backup
```javascript
// Setiap kali saveAnswer() dipanggil
saveAnswer(questionId, choiceId, { sessionId });
↓
// Otomatis backup ke localStorage
localStorage.setItem(
  `tryout_answers_${sessionId}`,
  JSON.stringify(userAnswers)
);
```

### Automatic Recovery
```javascript
// Saat component mount
useEffect(() => {
  fetchAllQuestions(packageId);
}, [packageId]);

// Inside hook:
// → loadAnswersFromStorage(packageId)
//   → Restore dari localStorage ✅
```

### Manual Save
```javascript
// Jika perlu save manual
saveAnswersToStorage(sessionId, userAnswers);
```

---

## 🐛 Troubleshooting

### ❌ "Answers tidak tersimpan"
```javascript
// Check:
1. localStorage diaktifkan di browser
2. Tidak private/incognito mode
3. Storage quota tidak penuh
4. DevTools → Storage tab → localStorage
```

### ❌ "Jawaban hilang setelah refresh"
```javascript
// Check:
1. localStorage.getItem(`tryout_answers_${sessionId}`)
2. Component sudah mount sebelum fetch
3. Session ID konsisten
4. Token masih valid (auth belum expired)
```

### ❌ "Submit lambat"
```javascript
// Optimize:
1. Check network latency (DevTools → Network)
2. Backend processing time (check server logs)
3. Database query performance
4. Increase timeout jika perlu: { timeout: 60000 }
```

### ❌ "Soal tidak load"
```javascript
// Check:
1. tryoutPackageId ada dan valid
2. API endpoint /api/soal accessible
3. Token valid (Authorization header)
4. DB connection (check Neon status)
5. Browser console untuk errors
```

---

## ⚡ Performance Tips

### 1. Pre-load Categories
```javascript
// Saat component render, sudah tahu berapa soal per kategori
metadata.questionsPerCategory
// { "Penalaran Umum": 45, "Kuantitatif": 60, ... }
```

### 2. Lazy Display
```javascript
// Hanya render visible questions (bukan semua 160)
import { Virtualized } from 'react-virtual';
<Virtualized>
  {getCurrentQuestions().map(...)}
</Virtualized>
```

### 3. Debounce Autosave
```javascript
// Save ke localStorage setiap 5 soal, bukan per soal
const saveBatch = debounce(() => {
  saveAnswersToStorage(sessionId, userAnswers);
}, 500);
```

### 4. Progressive Submit
```javascript
// Jika submit lambat, bisa show progress
const handleSubmitWithProgress = async () => {
  for (let i = 0; i < answers.length; i += 10) {
    await submitBatch(answers.slice(i, i + 10));
    updateProgress((i / answers.length) * 100);
  }
};
```

---

## 🎯 Next Implementation Ideas

1. **Real-time Timer** - Tampilkan waktu mengerjakan per soal
2. **AI Hints** - Suggest jawaban dengan Gemini API
3. **Compare Results** - Bandingkan dengan tryout sebelumnya
4. **Collaborative Mode** - Study group dengan real-time sync
5. **Mobile Optimization** - Better UX untuk mobile devices

---

## 📚 Full Example Component

Lihat file lengkap di: [client/src/pages/TryoutWithSingleFetch.jsx](../pages/TryoutWithSingleFetch.jsx)

File ini includes:
- ✅ Complete state management
- ✅ Category filtering
- ✅ Answer tracking
- ✅ Statistics display
- ✅ Bulk submit
- ✅ Loading/error states
- ✅ localStorage integration
- ✅ Responsive UI

---

## 🚀 Ready to Go!

Semuanya sudah siap. Tinggal:

1. **Import hook** ke component
2. **Fetch soal** saat mount
3. **Display questions** dengan filter kategori
4. **Track answers** otomatis ke state + localStorage
5. **Submit bulk** dengan satu button click

🎉 Good luck dengan tryout UTBK!
