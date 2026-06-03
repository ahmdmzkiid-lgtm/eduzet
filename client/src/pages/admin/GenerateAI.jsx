import React, { useState, useEffect } from 'react';
import { subjectService, adminService, soalService } from '../../services/api';
import toast from 'react-hot-toast';
import MathText from '../../components/MathText';

const GenerateAI = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewData, setPreviewData] = useState([]);

  const [formData, setFormData] = useState({
    subject_id: '',
    topic: '',
    difficulty: 'medium',
    count: 5
  });

  useEffect(() => {
    subjectService.list().then(res => setSubjects(res.data.data)).catch(() => {});
  }, []);

  // Simulate progress bar
  useEffect(() => {
    if (!loading) { setProgress(0); return; }
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) { clearInterval(interval); return 90; }
        return prev + Math.random() * 15;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.subject_id) { toast.error('Pilih mata pelajaran'); return; }
    if (!formData.topic.trim()) { toast.error('Masukkan topik/materi'); return; }

    setLoading(true);
    setPreviewData([]);
    try {
      const res = await adminService.generateAI(formData);
      setPreviewData(res.data.data);
      setProgress(100);
      toast.success(`✅ ${res.data.data?.length || 0} soal berhasil di-generate!`);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Gagal generate soal';
      toast.error(`❌ ${msg}`);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const promises = previewData.map(q =>
        soalService.create({
          subject_id: formData.subject_id,
          difficulty: formData.difficulty,
          content: q.content,
          source: 'ai',
          choices: q.choices.map(c => ({
            ...c,
            explanation: c.is_correct ? q.explanation : null
          }))
        })
      );
      await Promise.all(promises);
      toast.success(`${previewData.length} soal berhasil disimpan!`);
      setPreviewData([]);
    } catch {
      toast.error('Gagal menyimpan beberapa soal');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setPreviewData([]);
    toast('Semua soal dihapus', { icon: '🗑️' });
  };

  const removeQuestion = (idx) => {
    setPreviewData(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="animate-fade-in text-on-surface">

      {/* Page Title */}
      <div className="mb-10">
        <h2 className="text-[48px] font-bold leading-tight text-on-surface tracking-tight mb-2">AI Question Generator</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Buat soal UTBK berkualitas tinggi secara instan. Deskripsikan topik atau tempel teks materi untuk menghasilkan soal yang disesuaikan.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ── Left: Generator Form ── */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-surface-container-high">

          {/* Topic Textarea */}
          <div className="mb-8">
            <label className="block font-label-md text-label-md text-on-surface mb-3">Topic or Source Text</label>
            <textarea
              rows={8}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none outline-none placeholder:text-outline-variant"
              placeholder="Contoh: Konsep integral tentu dan tak tentu dalam kalkulus, termasuk teorema dasar kalkulus dan aplikasinya..."
              value={formData.topic}
              onChange={e => setFormData({ ...formData, topic: e.target.value })}
            />
            <div className="flex justify-end mt-2">
              <span className="text-label-sm text-on-surface-variant">{formData.topic.length} / 2000 characters</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Number of Questions */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-3">Number of Questions</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={formData.count}
                  onChange={e => setFormData({ ...formData, count: parseInt(e.target.value) })}
                  className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="font-label-md text-label-md bg-[#dae1ff]/30 text-primary px-3 py-1 rounded-full min-w-[36px] text-center">
                  {formData.count}
                </span>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-3">Mata Pelajaran</label>
              <select
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 font-label-md text-on-surface focus:ring-2 focus:ring-primary outline-none"
                value={formData.subject_id}
                onChange={e => setFormData({ ...formData, subject_id: e.target.value })}
              >
                <option value="">Pilih Mata Pelajaran...</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          {/* Difficulty Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-3">Difficulty Level</label>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                {['easy', 'medium', 'hard'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: lvl })}
                    className={`flex-1 py-2 text-label-sm font-label-sm rounded-md transition-all capitalize ${
                      formData.difficulty === lvl
                        ? 'bg-surface text-on-surface shadow-sm border border-outline-variant/20'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {lvl === 'easy' ? 'Easy' : lvl === 'medium' ? 'Medium' : 'Hard'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-3">Tone & Style</label>
              <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 font-label-md text-on-surface focus:ring-2 focus:ring-primary outline-none">
                <option>Academic & Formal</option>
                <option>Conversational</option>
                <option>Challenging/Advanced</option>
                <option>Quick Recall</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-label-md text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            {loading ? 'Generating...' : 'Generate Questions'}
          </button>

          {/* Progress Bar */}
          {(loading || progress > 0) && (
            <div className="mt-6">
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#00c1fd] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.round(progress)}%` }}
                />
              </div>
              <p className="text-center text-label-sm text-on-surface-variant mt-2">
                {loading ? `Processing content... (${Math.round(progress)}%)` : 'Complete!'}
              </p>
            </div>
          )}
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Generation Tips */}
          <div className="bg-[#00c1fd]/10 p-6 rounded-xl border border-[#00c1fd]/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-secondary mb-2">Generation Tips</h3>
              <p className="text-label-md text-[#004d67] leading-relaxed">
                Untuk hasil terbaik, sertakan definisi kunci dan hubungan konseptual dalam teks sumber. AI bekerja paling baik dengan konteks yang spesifik.
              </p>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-secondary/5 pointer-events-none">lightbulb</span>
          </div>

          {/* Image + Recent Activity Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary to-[#003fa4] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle cx="170" cy="30" r="80" fill="white" />
                  <circle cx="30" cy="170" r="100" fill="white" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white/30 text-[80px]">smart_toy</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-label-md text-label-md text-primary uppercase tracking-wider mb-4">Recent Activity</h4>
              <div className="space-y-4">
                {previewData.length > 0 ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#cc4204]/10 flex items-center justify-center text-[#a33200] flex-shrink-0">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">{formData.topic.substring(0, 30)}...</p>
                      <p className="text-label-sm text-on-surface-variant">{previewData.length} Questions • Just now</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#cc4204]/10 flex items-center justify-center text-[#a33200] flex-shrink-0">
                      <span className="material-symbols-outlined">history</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">Belum ada aktivitas</p>
                      <p className="text-label-sm text-on-surface-variant">Generate soal pertamamu!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Generated Questions Section ── */}
      {previewData.length > 0 && (
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Review Generated Questions</h3>
              <p className="text-body-md text-on-surface-variant">Edit or refine the AI's suggestions before saving to your question bank.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                Discard All
              </button>
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={saving}
                className="px-6 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                {saving ? 'Saving...' : 'Save to Bank'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {previewData.map((q, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-high hover:border-primary/30 transition-all group relative"
              >
                {/* Hover Actions */}
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => removeQuestion(idx)}
                    className="p-2 hover:bg-[#ffdad6]/30 rounded-full text-error"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                <div className="max-w-4xl">
                  {/* Badge */}
                  <span className="inline-block px-3 py-1 bg-surface-container-high rounded-full text-label-sm text-on-surface-variant mb-4">
                    Question {idx + 1} • Multiple Choice
                  </span>

                  {/* Question Text */}
                  <MathText className="font-headline-md text-headline-md text-on-surface mb-6" text={q.content || ''} />

                  {/* Choices Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.choices.map((c, cIdx) => (
                      <div
                        key={cIdx}
                        className={`p-4 rounded-lg flex items-start gap-3 border ${
                          c.is_correct
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant hover:border-outline'
                        } transition-colors`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          c.is_correct
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-outline-variant'
                        }`}>
                          {c.is_correct && (
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                          )}
                        </div>
                        <MathText className="text-label-md text-on-surface" text={c.content || ''} />
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="mt-4 p-4 border border-outline-variant rounded-lg bg-surface-container-low">
                      <div className="text-label-md text-on-surface-variant italic flex flex-wrap gap-1">
                        <span className="font-bold not-italic">Penjelasan: </span>
                        <MathText text={q.explanation} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">Eduzet</span>
            <span className="text-on-surface-variant text-label-sm">© 2026 AI Learning Portal</span>
          </div>
          <div className="flex gap-6">
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GenerateAI;
