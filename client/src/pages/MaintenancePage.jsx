import React from 'react';
import { Link } from 'react-router-dom';

const EduzetRedirectNotice = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans select-none w-full">
      {/* Decorative glowing blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Header (Minimal Logo) */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            EDUZET
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Rebranding
          </span>
        </div>
      </header>

      {/* Main content - 404 style notice */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-xl text-center space-y-8 animate-scale-in">
          
          {/* Visual Indicator: Huge Rebrand icon */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
              <span className="material-symbols-outlined text-[48px] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                swap_horiz
              </span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Eduzet telah beralih ke <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">stubia.id</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Kami memperbarui identitas dan meningkatkan layanan kami demi kenyamanan belajar Anda.
            </p>
          </div>

          {/* Card Notice */}
          <div className="backdrop-blur-md bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-left space-y-4 shadow-xl">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-200 text-base">Riwayat & Premium Aman</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Jangan khawatir, seluruh <strong className="text-indigo-300 font-medium">riwayat pengerjaan</strong> dan <strong className="text-indigo-300 font-medium">paket premium plan</strong> Anda sudah berpindah secara aman ke <strong className="text-indigo-300 font-medium">stubia.id</strong>.
                </p>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined text-[20px]">help_center</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-slate-200 text-base">Beli Premium saat Maintenance?</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Bagi yang membeli premium plan pada saat server maintenance, segera hubungi kami melalui WhatsApp di <a href="https://wa.me/6285183147625" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">085183147625</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://stubia.id"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
            >
              Kunjungi stubia.id
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
            
            <a
              href="https://wa.me/6285183147625"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              Hubungi WhatsApp
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center border-t border-white/[0.04] relative z-10">
        <p className="text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Stubia. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default function MaintenancePage() {
  const isEduzetDomain = window.location.hostname.includes('eduzet.my.id');

  if (isEduzetDomain) {
    return <EduzetRedirectNotice />;
  }

  // Normal maintenance page for stubia.id/localhost
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center p-4 text-slate-100 font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md text-center space-y-6 relative z-10 animate-scale-in">
        <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <span className="material-symbols-outlined text-blue-400 text-[40px] animate-pulse">construction</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Sistem Dalam Pemeliharaan
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Kami sedang melakukan peningkatan sistem untuk memberikan pelayanan yang lebih baik. Silakan kembali beberapa saat lagi.
          </p>
        </div>
        
        <div className="pt-2">
          <button 
            onClick={() => window.location.reload()}
            className="inline-block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3.5 rounded-xl font-bold text-[15px] text-center shadow-lg shadow-blue-500/10 transition-all hover:-translate-y-0.5"
          >
            Segarkan Halaman
          </button>
        </div>
        
        <p className="text-[13px] text-slate-500">
          Butuh masuk segera? Hubungi kami atau kembali setelah pemeliharaan selesai.
        </p>
      </div>
    </div>
  );
}
