import React from 'react';
import { useMaintenance } from '../hooks/useMaintenance';
import { useAuth } from '../hooks/useAuth';

export default function MaintenanceOverlay({ children }) {
  const { isMaintenance, loading } = useMaintenance();
  const { isAdmin, loginOverlayVisible, dismissLoginOverlay } = useAuth();

  if (loading) return children;

  const showOverlay = loginOverlayVisible || (isMaintenance && !isAdmin);

  if (!showOverlay) return children;

  return (
    <div className="relative">
      <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center relative">
          {loginOverlayVisible && (
            <button
              onClick={dismissLoginOverlay}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500 text-[20px]">close</span>
            </button>
          )}
          <div className="w-20 h-20 bg-[#0050cb]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[#0050cb] text-[40px]">construction</span>
          </div>
          <h1 className="text-[28px] font-bold text-[#191b24] mb-3">
            Sistem Dalam Pemeliharaan
          </h1>
          <p className="text-[#424656] text-[15px] leading-relaxed mb-4">
            Eduzet.my.id telah beralih menjadi stubia.id. Kami hanya memindahkan domain dan server serta rebranding.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-[13px] text-amber-800 leading-relaxed">
              <span className="font-bold">📢 Bagi yang melakukan pembelian premium plan ujian mandiri di jam 18:00-21:00,</span> segera hubungi Instagram <strong>eduzet.my.id</strong>.
            </p>
          </div>
          <a
            href="https://stubia.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-gradient-to-r from-[#0050cb] to-[#3b82f6] text-white py-3.5 rounded-xl font-bold text-[15px] text-center hover:opacity-90 transition-opacity"
          >
            Kunjungi stubia.id
          </a>
        </div>
      </div>
      <div className={loginOverlayVisible ? '' : 'pointer-events-none'}>{children}</div>
    </div>
  );
}
