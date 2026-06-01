import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ujianMandiriService, tryoutService } from '../services/api';
import { getStatusConfig } from '../data/ujianMandiriData';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import TryoutVerificationModal from '../components/tryout/TryoutVerificationModal';

/* ─── Navbar (same pattern as all other pages) ─── */
const TopNavbar = ({ user, isAdmin, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { to: '/dashboard',      label: 'Dashboard' },
    { to: '/latihan',        label: 'Latihan' },
    { to: '/tryout/packages',label: 'Tryout' },
    { to: '/battle',         label: 'Battle' },
    { to: '/riwayat',        label: 'Riwayat' },
    { to: '/prediksi-skor',  label: 'Prediksi Skor' },
    { to: '/ujian-mandiri',  label: 'Ujian Mandiri', active: true },
  ];

  return (
    <>
      <header className={`fixed top-0 z-[100] w-full backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-[#faf8ff]/90 shadow-sm border-b border-[#c2c6d8]/30' : 'bg-[#faf8ff] border-b border-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-12">
            <Link to="/dashboard" className="flex items-center"><img src="/eduzet-brand-light.svg" alt="Eduzet" className="h-8 sm:h-10 md:h-12" /></Link>
            <nav className="hidden lg:flex items-center space-x-8 text-[14px] font-medium">
              {links.map(l => (
                <Link key={l.to} to={l.to} className={l.active ? 'text-[#0050cb] border-b-2 border-[#0050cb] pb-1 transition-colors' : 'text-[#424656] hover:text-[#0050cb] transition-colors'}>{l.label}</Link>
              ))}
              {isAdmin && <Link to="/admin" className="text-[#a33200] hover:text-[#0050cb] transition-colors">Admin Panel</Link>}
            </nav>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-[14px] font-medium text-[#191b24]">{user?.name?.split(' ')[0]}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  user?.current_plan === 'sultan' ? 'bg-yellow-100 text-yellow-700' :
                  user?.current_plan === 'premium' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  <span className="material-symbols-outlined text-[10px]">
                    {user?.current_plan === 'sultan' ? 'star' : user?.current_plan === 'premium' ? 'diamond' : 'person'}
                  </span>
                  {user?.current_plan === 'sultan' ? 'Sultan' : user?.current_plan === 'premium' ? 'Premium' : 'Gratis'}
                </span>
              </div>
              <div className={`relative w-10 h-10 rounded-full bg-[#0050cb] flex items-center justify-center text-white font-bold text-sm border-2 ${
                user?.current_plan === 'sultan' ? 'border-yellow-400' : user?.current_plan === 'premium' ? 'border-blue-400' : 'border-transparent'
              }`}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                {(user?.current_plan === 'premium' || user?.current_plan === 'sultan') && (
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                    user?.current_plan === 'sultan' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-500 text-white'
                  }`}>
                    <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {user?.current_plan === 'sultan' ? 'star' : 'diamond'}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <button type="button" onClick={onLogout} className="hidden sm:flex text-[#424656] hover:text-[#ba1a1a] transition-colors items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#424656]">
              <span className="material-symbols-outlined text-[24px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/50 lg:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-white rounded-b-[32px] shadow-2xl p-6 pt-20 animate-slide-down" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link to="/dashboard" className="flex items-center"><img src="/eduzet-brand-light.svg" alt="Eduzet" className="h-8" /></Link>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#424656]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileMenuOpen(false)} className={`px-5 py-4 rounded-2xl text-[16px] font-bold transition-colors ${l.active ? 'bg-[#dae1ff] text-[#0050cb]' : 'text-[#424656] hover:bg-[#f2f3ff]'}`}>{l.label}</Link>
              ))}
              {isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl text-[16px] font-bold text-[#a33200] hover:bg-[#f2f3ff]">Admin Panel</Link>}
            </nav>
            <hr className="my-6 border-[#c2c6d8]/30" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0050cb] flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#191b24]">{user?.name?.split(' ')[0]}</p>
                  <span className="text-[12px] font-bold uppercase text-[#727687]">{user?.current_plan || 'Gratis'}</span>
                </div>
              </div>
              <button type="button" onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="px-6 py-3 rounded-xl text-[14px] font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 border border-red-100">
                <span className="material-symbols-outlined text-[18px]">logout</span> Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Main Page ─── */
export default function UjianMandiriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [ujian, setUjian] = useState(null);
  const [tryoutPackages, setTryoutPackages] = useState([]);
  const [latihanSoal, setLatihanSoal] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [hasConfirmedStart, setHasConfirmedStart] = useState(false);

  const fetchStatus = async () => {
    if (selectedPkg) {
      try {
        const regRes = await tryoutService.getRegistrationStatus('um', selectedPkg.id);
        setRegistrationStatus(regRes.data?.data);
      } catch (err) {
        console.error('Error fetching registration status:', err);
      }
    }
  };

  const handleStartTryout = async (pkg) => {
    if (user?.current_plan === 'gratis') {
      setSelectedPkg(pkg);
      setCheckingRegistration(pkg.id);
      try {
        const regRes = await tryoutService.getRegistrationStatus('um', pkg.id);
        const status = regRes.data?.data;
        setRegistrationStatus(status);
        if (!status || status.status !== 'approved' || !hasConfirmedStart) {
          setShowVerificationModal(true);
        } else {
          // If approved and confirmed, navigate directly
          navigate(`/ujian-mandiri/${id}/tryout/${pkg.id}`);
        }
      } catch (err) {
        toast.error('Gagal memeriksa status verifikasi');
      } finally {
        setCheckingRegistration(false);
      }
    } else {
      navigate(`/ujian-mandiri/${id}/tryout/${pkg.id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ujianRes, tryoutRes, latihanRes] = await Promise.all([
          ujianMandiriService.getById(id),
          ujianMandiriService.getTryoutPackages(id),
          ujianMandiriService.getLatihan(id),
        ]);
        if (!ujianRes.data.data) {
          navigate('/ujian-mandiri');
          return;
        }
        setUjian(ujianRes.data.data);
        setTryoutPackages(tryoutRes.data.data || []);
        setLatihanSoal(latihanRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch ujian mandiri detail:', err);
        navigate('/ujian-mandiri');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading || !ujian) {
    return (
      <div className="min-h-screen bg-[#FAF8FF] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-[48px] text-[#0050cb]">progress_activity</span>
      </div>
    );
  }

  const statusCfg = getStatusConfig(ujian.status);

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      <TopNavbar user={user} isAdmin={isAdmin} onLogout={handleLogout} />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-16 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8">
          <Link to="/ujian-mandiri" className="text-[12px] font-bold text-[#424656] uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity">
            Ujian Mandiri
          </Link>
          <span className="material-symbols-outlined text-[16px] text-[#727687]">chevron_right</span>
          <span className="text-[12px] font-bold text-[#424656] uppercase tracking-wider opacity-60">
            {ujian.nama_ujian}
          </span>
          <span className="material-symbols-outlined text-[16px] text-[#727687]">chevron_right</span>
          <span className="text-[12px] font-bold text-[#0050cb] uppercase tracking-wider">
            Simulasi Tryout
          </span>
        </nav>

        {/* Hero Banner */}
        <section className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-xl overflow-hidden mb-16 shadow-[0_24px_48px_-12px_rgba(0,51,153,0.12)] group">
          <img
            src={ujian.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
            alt={ujian.universitas}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0050cb]/90 to-transparent flex flex-col justify-center p-6 sm:px-8 lg:px-16 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit mb-3 sm:mb-6">
              <span className={`w-2 h-2 rounded-full ${ujian.status === 'open' ? 'bg-[#FFC600] animate-pulse' : ujian.status === 'coming-soon' ? 'bg-[#765a00]' : 'bg-[#D90429]'}`}></span>
              <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-wider">{statusCfg.label}</span>
            </div>
            <h1 className="text-[20px] sm:text-[32px] lg:text-[64px] font-extrabold leading-[1.2] sm:leading-[1.1] tracking-tight max-w-2xl mb-2 sm:mb-4">
              Simulasi UJIAN MANDIRI<br />{ujian.nama_ujian} {new Date().getFullYear()}
            </h1>
            <p className="text-[12px] sm:text-[14px] lg:text-[16px] max-w-xl opacity-90 leading-relaxed line-clamp-2 sm:line-clamp-none">
              Persiapkan diri Anda menghadapi seleksi paling prestisius dengan bank soal terakurat dan sistem penilaian IRT standar nasional.
            </p>
          </div>
        </section>

        {/* Paket Tryout Tersedia */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[24px] lg:text-[32px] font-bold text-[#191b24] leading-tight">Tryout Tersedia</h2>
            <span className="text-[14px] lg:text-[16px] text-[#0050cb] font-semibold cursor-pointer hover:underline">Lihat Semua</span>
          </div>
          <div className="space-y-6">
            {tryoutPackages.length > 0 ? (
              tryoutPackages.map((pkg) => (
                <article
                  key={pkg.id}
                  className="bg-white rounded-xl p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 items-center border border-[#e5e2e3] transition-all hover:border-[#0050cb]/30 shadow-[0_24px_48px_-12px_rgba(0,51,153,0.12)]"
                >
                  <div
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${pkg.icon_color || '#0050cb'}10` }}
                  >
                    <span
                      className="material-symbols-outlined text-[36px] lg:text-[48px]"
                      style={{ color: pkg.icon_color || '#0050cb' }}
                    >
                      {pkg.icon}
                    </span>
                  </div>
                  <div className="flex-grow space-y-3 lg:space-y-4 text-center md:text-left w-full">
                    <div className="space-y-1">
                      {pkg.user_history?.length > 0 && (
                        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit mb-2">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Selesai
                        </div>
                      )}
                      <h3 className="text-[18px] lg:text-[24px] font-semibold text-[#191b24]">{pkg.title}</h3>
                      <p className="text-[14px] lg:text-[16px] text-[#424656]">{pkg.description}</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 lg:gap-6 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: pkg.icon_color || '#0050cb' }}>task_alt</span>
                        <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">{pkg.soal_count || 0} SOAL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: pkg.icon_color || '#0050cb' }}>schedule</span>
                        <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">{pkg.duration} MENIT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: pkg.icon_color || '#0050cb' }}>group</span>
                        <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">{(pkg.peserta || 0).toLocaleString()} PESERTA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: pkg.icon_color || '#0050cb' }}>sports_score</span>
                        <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">
                          B: +{pkg.points_correct ?? 4} | S: {pkg.points_incorrect ?? -1} | K: {pkg.points_unanswered ?? 0}
                        </span>
                      </div>
                    </div>
                    
                    {pkg.user_history?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-dashed border-[#e5e2e3] text-left">
                        <h4 className="text-[11px] font-bold text-[#727687] uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">history</span>
                          Riwayat Nilai
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {pkg.user_history.map((attempt, index) => (
                            <button
                              type="button"
                              key={attempt.id}
                              onClick={() => navigate(`/ujian-mandiri/${ujian.id}/tryout/${pkg.id}/hasil/${attempt.id}`)}
                              className="inline-flex items-center gap-1.5 bg-white border border-[#c2c6d8] hover:border-[#0050cb] hover:text-[#0050cb] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all"
                            >
                              <span className="material-symbols-outlined text-xs">assessment</span>
                              Poin: <strong className="font-extrabold">{attempt.score}</strong> (Attempt {pkg.user_history.length - index})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => handleStartTryout(pkg)}
                      disabled={checkingRegistration !== false}
                      className="bg-[#0050cb] text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold text-[14px] hover:bg-[#003fa4] transition-all active:scale-95 whitespace-nowrap disabled:opacity-75 flex items-center justify-center gap-2 w-full"
                    >
                      {checkingRegistration === pkg.id ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                          <span>Memeriksa...</span>
                        </>
                      ) : (
                        pkg.user_history?.length > 0 ? 'Mulai Lagi' : 'Mulai Tryout'
                      )}
                    </button>
                    {pkg.user_history?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => navigate(`/ujian-mandiri/${ujian.id}/tryout/${pkg.id}/hasil/${pkg.user_history[0].id}`)}
                        className="border border-[#0050cb] text-[#0050cb] hover:bg-[#0050cb]/5 px-6 lg:px-8 py-3 rounded-lg font-bold text-[14px] transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 w-full"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Hasil Terakhir
                      </button>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-[#e5e2e3]">
                <span className="material-symbols-outlined text-[48px] text-[#c2c6d8] mb-2">quiz</span>
                <p className="text-[#727687]">Belum ada paket tryout tersedia untuk ujian ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* Latihan Soal Mandiri */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[24px] lg:text-[32px] font-bold text-[#191b24] leading-tight">Latihan Soal Mandiri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {latihanSoal.length > 0 ? (
              latihanSoal.map((lat) => (
                <div
                  key={lat.id}
                  className="group bg-white rounded-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 border border-[#e5e2e3] shadow-sm hover:shadow-lg"
                >
                  <div className="p-6 pb-0">
                    <div className="flex justify-between items-start">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${lat.icon_bg_color || '#0050cb'}15` }}
                      >
                        <span
                          className="material-symbols-outlined text-[32px]"
                          style={{ color: lat.icon_bg_color || '#0050cb' }}
                        >
                          {lat.icon}
                        </span>
                      </div>
                      {lat.user_history?.length > 0 && (
                        <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          Selesai
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span
                        className="text-[12px] font-bold uppercase tracking-wider mb-2 block"
                        style={{ color: lat.category_color || '#0050cb' }}
                      >
                        {lat.category}
                      </span>
                      <h3 className="text-[20px] lg:text-[24px] font-semibold text-[#191b24] mb-2">{lat.title}</h3>
                      <p className="text-[13px] lg:text-[14px] text-[#424656] mb-3">{lat.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: lat.icon_bg_color || '#0050cb' }}>task_alt</span>
                          <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">{lat.soal_count || 0} SOAL</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] opacity-60" style={{ color: lat.icon_bg_color || '#0050cb' }}>sports_score</span>
                          <span className="text-[11px] lg:text-[12px] font-bold uppercase tracking-wider">
                            B: +{lat.points_correct ?? 4} | S: {lat.points_incorrect ?? -1} | K: {lat.points_unanswered ?? 0}
                          </span>
                        </div>
                      </div>
                      
                      {lat.user_history?.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-dashed border-[#e5e2e3] text-left">
                          <h4 className="text-[10px] font-bold text-[#727687] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">history</span>
                            Riwayat Nilai
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {lat.user_history.map((attempt, index) => (
                              <span
                                key={attempt.id}
                                className="inline-flex items-center bg-[#faf8ff] border border-[#c2c6d8]/60 px-2 py-1 rounded-md text-[11px] font-semibold text-[#424656]"
                              >
                                Poin: <strong className="font-extrabold text-[#0050cb] ml-0.5">{attempt.score}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {(lat.button_style || 'filled') === 'filled' ? (
                      <button
                        type="button"
                        onClick={() => navigate(`/ujian-mandiri/${id}/latihan/${lat.id}`)}
                        className="w-full bg-[#0050cb] text-white py-3 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#003fa4] transition-colors mt-4"
                      >
                        {lat.user_history?.length > 0 ? 'Mulai Lagi' : 'Mulai Latihan'} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate(`/ujian-mandiri/${id}/latihan/${lat.id}`)}
                        className="w-full border-2 border-[#0050cb] text-[#0050cb] py-3 rounded-lg font-bold text-[14px] hover:bg-[#0050cb]/5 transition-colors mt-4"
                      >
                        {lat.user_history?.length > 0 ? 'Mulai Lagi' : 'Mulai Latihan'}
                      </button>
                    )}
                    {lat.user_history?.length > 0 && (
                      <button
                        type="button"
                        onClick={() => navigate(`/ujian-mandiri/${id}/latihan/${lat.id}/hasil/${lat.user_history[0].id}`)}
                        className="w-full border border-[#0050cb] text-[#0050cb] py-3 rounded-lg font-bold text-[14px] mt-2 flex items-center justify-center gap-2 hover:bg-[#0050cb]/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Hasil Terakhir
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 bg-white rounded-xl border border-[#e5e2e3]">
                <span className="material-symbols-outlined text-[48px] text-[#c2c6d8] mb-2">menu_book</span>
                <p className="text-[#727687]">Belum ada latihan soal tersedia untuk ujian ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            to="/ujian-mandiri"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#c2c6d8] rounded-xl text-[#424656] font-bold hover:bg-[#f2f3ff] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Daftar Ujian Mandiri
          </Link>
        </div>
      </main>

      <Footer />

      {user?.current_plan === 'gratis' && (
        <TryoutVerificationModal
          open={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          packageType="um"
          packageId={selectedPkg?.id}
          packageTitle={selectedPkg?.title || 'Paket Tryout Ujian Mandiri'}
          registrationStatus={registrationStatus}
          onSubmitSuccess={fetchStatus}
          onConfirmStart={() => {
            setHasConfirmedStart(true);
            setShowVerificationModal(false);
            if (selectedPkg) {
              // Use setTimeout to ensure modal closes before navigation
              setTimeout(() => {
                navigate(`/ujian-mandiri/${id}/tryout/${selectedPkg.id}`);
              }, 100);
            }
          }}
        />
      )}
    </div>
  );
}
