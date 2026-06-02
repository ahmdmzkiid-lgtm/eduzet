import { useState, useEffect } from 'react';
import { socialService } from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageSocialVerifications() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [submittingAction, setSubmittingAction] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await socialService.listPending();
      setRequests(res.data?.data || []);
    } catch (err) {
      toast.error('Gagal memuat permintaan verifikasi sosial');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    if (submittingAction) return;
    setSubmittingAction(true);
    try {
      await socialService.reviewRequest(id, { action: 'approve' });
      toast.success('Permintaan verifikasi disetujui');
      fetchRequests();
    } catch (err) {
      // handled by interceptor
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Masukkan alasan penolakan');
      return;
    }
    setSubmittingAction(true);
    try {
      await socialService.reviewRequest(rejectingItem.id, {
        action: 'reject',
        rejection_reason: rejectionReason,
      });
      toast.success('Permintaan verifikasi berhasil ditolak');
      setRejectingItem(null);
      setRejectionReason('');
      fetchRequests();
    } catch (err) {
      // handled by interceptor
    } finally {
      setSubmittingAction(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-[32px] font-bold text-[#191b24] mb-2 leading-tight">Verifikasi Media Sosial Latihan</h1>
        <p className="text-[#424656] text-[16px]">Tinjau dan verifikasi username IG/X yang dimasukkan oleh pengguna Free Plan untuk akses latihan soal.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#c2c6d8]/30 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#727687]">
            <div className="w-10 h-10 border-4 border-[#0050cb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-semibold text-sm">Memuat data permintaan...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-[#727687]">
            <span className="material-symbols-outlined text-[48px] mb-2 text-[#cbd5e1]">check_circle</span>
            <p className="font-semibold text-sm">Tidak ada permintaan verifikasi yang pending</p>
            <p className="text-xs">Semua permintaan telah selesai diproses.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#c2c6d8]/20 bg-[#faf8ff] text-[#424656] font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Nama Pengguna</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Username Instagram</th>
                  <th className="px-6 py-4">Username X</th>
                  <th className="px-6 py-4">Tanggal Diajukan</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c6d8]/10 text-sm">
                {requests.map((item) => (
                  <tr key={item.id} className="hover:bg-[#faf8ff]/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#191b24]">{item.user_name}</td>
                    <td className="px-6 py-4 text-[#424656]">{item.user_email}</td>
                    <td className="px-6 py-4 font-mono text-[#0050cb]">
                      {item.ig_username ? `@${item.ig_username.replace(/^@/, '')}` : '-'}
                    </td>
                    <td className="px-6 py-4 font-mono text-[#0050cb]">
                      {item.x_username ? `@${item.x_username.replace(/^@/, '')}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-xs text-[#727687]">
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={submittingAction}
                          onClick={() => setRejectingItem(item)}
                          className="px-3.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition"
                        >
                          Tolak
                        </button>
                        <button
                          disabled={submittingAction}
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0050cb] hover:bg-[#003da6] text-white text-xs font-semibold shadow transition"
                        >
                          Setujui
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRejectingItem(null)} />
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#191b24] mb-2">Tolak Permintaan Verifikasi</h3>
            <p className="text-xs text-[#727687] mb-4">Berikan alasan mengapa permintaan ini ditolak. Alasan ini akan ditampilkan kepada user.</p>
            <textarea
              className="w-full rounded-xl border border-[#c2c6d8] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0050cb]"
              rows={4}
              placeholder="Alasan penolakan..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 py-2.5 border border-[#e5e7eb] rounded-xl text-sm font-semibold text-[#424656] hover:bg-gray-50 transition"
                onClick={() => {
                  setRejectingItem(null);
                  setRejectionReason('');
                }}
              >
                Batal
              </button>
              <button
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50"
                onClick={handleRejectSubmit}
                disabled={submittingAction}
              >
                Tolak Permintaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
