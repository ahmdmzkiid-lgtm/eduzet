import React from 'react';

export default function MaintenanceModal() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up transform transition-all relative">
        <div className="bg-gradient-to-r from-[#0050cb] to-[#3b82f6] px-6 pt-10 pb-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-white text-[32px]">construction</span>
          </div>
          <h2 className="text-[22px] font-bold text-white leading-tight">
            Kami Telah Pindah!
          </h2>
        </div>

        <div className="px-6 py-6 space-y-4">
          <p className="text-[#191b24] text-[15px] font-semibold text-center">
            Eduzet.my.id telah beralih menjadi stubia.id
          </p>

          <div className="bg-[#f2f3ff] rounded-xl p-4 space-y-3 text-[14px] text-[#424656] leading-relaxed">
            <p>
              Jangan khawatir, kami hanya memindahkan domain dan server serta rebranding. Semua layanan yang sama tetap tersedia di stubia.id!
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <a
            href="https://stubia.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#0050cb] to-[#3b82f6] text-white py-3.5 rounded-xl font-bold text-[15px] text-center hover:opacity-90 transition-opacity"
          >
            Kunjungi stubia.id
          </a>
        </div>
      </div>
    </div>
  );
}
