import React from 'react';

export default function MaintenanceModal() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-3 sm:p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[95vh] animate-slide-up transform transition-all relative">
        <div className="bg-gradient-to-r from-[#0050cb] to-[#3b82f6] px-5 sm:px-6 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="material-symbols-outlined text-white text-[28px] sm:text-[32px]">construction</span>
          </div>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-white leading-tight">
            Pemeliharaan Sistem
          </h2>
        </div>

        <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-3 sm:space-y-4">
          <p className="text-[#191b24] text-[14px] sm:text-[15px] font-semibold text-center">
            Eduzet.my.id sedang dalam masa pemeliharaan. Terima kasih atas kesabaranmu.
          </p>

          <div className="bg-[#f2f3ff] rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 text-[13px] sm:text-[14px] text-[#424656] leading-relaxed">
            <p>
              Sehubungan dengan bertambahnya pengguna yang tiada henti, Eduzet selalu berusaha mengusahakan kenyamanan terbaik untukmu.
            </p>
            <p>
              Oleh karena itu, untuk sementara waktu kami melakukan pemeliharaan dalam rangka proses migrasi database ke website baru.
            </p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
            <span className="material-symbols-outlined text-amber-600 text-[18px] sm:text-[20px] shrink-0 mt-0.5">schedule</span>
            <div className="text-[12px] sm:text-[13px] text-amber-800 leading-relaxed space-y-1.5 sm:space-y-2">
              <p>Proses ini bertujuan untuk memberikan pengalaman belajar yang lebih baik, lebih cepat, dan lebih stabil. Terima kasih atas kesabaran dan pengertianmu.</p>
              <p>Jangan khawatir, ini hanya beberapa saat saja. Cek berkala Instagram <a href="https://www.instagram.com/eduzet.my.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-amber-900">@eduzet.my.id</a> untuk info terbaru.</p>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 sm:py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] cursor-not-allowed"
          >
            Login untuk sementara dinonaktifkan
          </button>
        </div>
      </div>
    </div>
  );
}
