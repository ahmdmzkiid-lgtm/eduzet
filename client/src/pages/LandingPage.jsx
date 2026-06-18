import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LandingPage.css';

const EduzetRedirectNotice = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans select-none">
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
            {/* Outer ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse" />
            
            {/* Main Icon */}
            <div className="relative w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
              <span className="material-symbols-outlined text-[48px] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                swap_horiz
              </span>
            </div>
            
            {/* Mini floating badges */}
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

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEduzetDomain = window.location.hostname.includes('eduzet.my.id');
  if (isEduzetDomain) {
    return <EduzetRedirectNotice />;
  }

  const handleUpgradeClick = () => {
    if (user) {
      navigate('/dashboard#pricing-plans');
    } else {
      navigate('/login?redirect=/dashboard%23pricing-plans');
    }
  };

  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <img src="/eduzet-brand-light.svg" alt="Eduzet" className="h-10 sm:h-14" />
          </div>
          <div className="landing-nav-actions">
            <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-join" onClick={() => navigate('/register')}>Daftar Gratis</button>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section className="landing-hero">

          <div className="hero-content">
            <div className="hero-text">
              <h1>Persiapkan <span className="text-blue">UTBK</span> dengan Latihan Soal Terbaik</h1>
              <p>Raih skor UTBK impianmu dengan ribuan soal latihan, tryout simulasi, dan pembahasan lengkap dari mentor berpengalaman.</p>
              <div className="hero-buttons">
                <button className="btn-primary-lg" onClick={() => navigate('/register')}>Mulai Belajar</button>
                <button className="btn-outline-lg" onClick={() => navigate('/login')}>Lihat Program</button>
              </div>
            </div>
            <div className="hero-image">
              <img src="/landingpage-hero.svg" alt="Students collaborating" />
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="landing-trust">
          <p className="trust-label">DIPERCAYA OLEH RIBUAN SISWA DI SELURUH INDONESIA</p>
          <div className="trust-logos">
            <div>UI</div><div>ITB</div><div>UGM</div><div>UNPAD</div><div>ITS</div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="landing-features">
          <div className="section-inner">
            <div className="section-header">
              <h2>Kenapa Pilih Eduzet?</h2>
              <p>Platform belajar UTBK paling efektif dengan fitur lengkap untuk memaksimalkan persiapanmu.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon icon-blue">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <h3>Belajar Kapan Saja</h3>
                <p>Akses ribuan soal dan materi kapan saja, di mana saja. Belajar sesuai tempo dan jadwalmu sendiri.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon icon-teal">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h3>Mentor Berpengalaman</h3>
                <p>Belajar langsung dari tutor alumni PTN top yang paham pola soal UTBK dan strategi menjawab.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon icon-orange">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3>Tryout Simulasi Realistis</h3>
                <p>Simulasi UTBK dengan timer, skor IRT, dan analisis performa detail untuk evaluasi kesiapanmu.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Pricing Plans */}
        <section id="pricing" className="landing-pricing">
          <div className="section-inner">
            <div className="section-header">
              <h2>Pilih Paket Belajarmu</h2>
              <p>Mulai gratis, tingkatkan kapan saja. Semua paket bisa diupgrade atau downgrade sewaktu-waktu.</p>
            </div>
            <div className="pricing-grid">



              {/* PREMIUM */}
              <div className="pricing-card pricing-card-featured">
                <div className="pricing-badge">Paling Populer</div>
                <div className="pricing-card-header">
                  <h3 className="pricing-name pricing-name-blue">Premium</h3>
                  <p className="pricing-desc">Tingkatkan persiapan UTBK-mu</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount">Rp35.000</span>
                  <span className="pricing-period">/6 bulan</span>
                </div>
                <hr className="pricing-divider pricing-divider-blue" />
                <ul className="pricing-features">
                  <li>
                    <span className="material-symbols-outlined pricing-check check-blue">verified</span>
                    <span className="pricing-feat-bold">Akses semua latihan soal</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check check-blue">verified</span>
                    <span>Pembahasan lengkap AI</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check check-blue">verified</span>
                    <span>Analisis performa IRT</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check check-blue">verified</span>
                    <span>10x Tryout beserta pembahasannya</span>
                  </li>
                </ul>
                <button className="pricing-btn pricing-btn-primary" onClick={handleUpgradeClick}>
                  Upgrade Sekarang
                </button>
              </div>

              {/* PREMIUM UM */}
              <div className="pricing-card">
                <div className="pricing-badge" style={{ backgroundColor: '#0d9488' }}>Paket Mandiri</div>
                <div className="pricing-card-header">
                  <h3 className="pricing-name" style={{ color: '#0d9488' }}>Premium UM</h3>
                  <p className="pricing-desc">Fokus persiapan Ujian Mandiri</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount">Rp15.000</span>
                  <span className="pricing-period">/2 bulan</span>
                </div>
                <hr className="pricing-divider" style={{ borderColor: 'rgba(13, 148, 136, 0.2)' }} />
                <ul className="pricing-features">
                  <li>
                    <span className="material-symbols-outlined pricing-check" style={{ color: '#0d9488' }}>verified</span>
                    <span className="pricing-feat-bold">Akses semua latihan mandiri</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check" style={{ color: '#0d9488' }}>verified</span>
                    <span>Akses semua tryout mandiri</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check" style={{ color: '#0d9488' }}>verified</span>
                    <span>Pembahasan lengkap & analisis</span>
                  </li>
                </ul>
                <button className="pricing-btn" style={{ backgroundColor: '#0d9488', color: '#fff' }} onClick={handleUpgradeClick}>
                  Upgrade Sekarang
                </button>
              </div>

              {/* SULTAN */}
              <div className="pricing-card pricing-card-dark">
                <div className="pricing-card-header">
                  <div className="pricing-sultan-title">
                    <span className="material-symbols-outlined pricing-star">star</span>
                    <h3 className="pricing-name pricing-name-sultan">Sultan</h3>
                  </div>
                  <p className="pricing-desc pricing-desc-muted">Persiapan UTBK terlengkap</p>
                </div>
                <div className="pricing-price">
                  <span className="pricing-amount pricing-amount-light">Rp60.000</span>
                  <span className="pricing-period pricing-period-muted">/tahun</span>
                </div>
                <hr className="pricing-divider pricing-divider-dark" />
                <ul className="pricing-features">
                  <li>
                    <span className="material-symbols-outlined pricing-check check-gold">diamond</span>
                    <span className="pricing-feat-light">Akses semua latihan soal</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check check-gold">diamond</span>
                    <span className="pricing-feat-light">Akses semua tryout</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined pricing-check check-gold">diamond</span>
                    <span className="pricing-feat-light">Akses pembahasan soal sepuasnya</span>
                  </li>
                </ul>
                <button className="pricing-btn pricing-btn-sultan" onClick={handleUpgradeClick}>
                  Go Sultan
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="landing-testimonials">
          <div className="section-inner">
            <h2 className="text-center">Cerita Sukses</h2>
            <div className="testimonials-grid">
              <TestimonialCard
                text="Eduzet benar-benar mengubah cara belajar saya. Soal-soalnya mirip banget sama UTBK asli, dan pembahasannya lengkap. Alhamdulillah lolos FKUI!"
                avatar="https://ui-avatars.com/api/?name=Muhammad+Rayyan+Daffa&background=0050cb&color=fff"
                name="Muhammad Rayyan Daffa" role="Mahasiswa FK UI"
              />
              <TestimonialCard
                text="Tryout simulasinya realistis banget. Timer, scoring IRT, dan analisis performanya bikin saya tahu kelemahan di mana. Sangat recommended!"
                avatar="https://ui-avatars.com/api/?name=Anwar+Rizal+Fadhillah&background=006688&color=fff"
                name="Anwar Rizal Fadhillah" role="Mahasiswa Teknik ITB"
              />
              <TestimonialCard
                text="Platform terbaik untuk persiapan UTBK. Fitur Tanya Kak Z dan riwayat bikin review soal jadi gampang. Worth it banget! Terima kasih Eduzet sudah bantu aku sampai lolos ke jurusan impian!"
                avatar="https://ui-avatars.com/api/?name=Alya+Nurul+Khairunnisa&background=a33200&color=fff"
                name="Alya Nurul Khairunnisa" role="Mahasiswa FEB UGM"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="landing-cta-section">
          <div className="landing-cta">
            <h2>Siap raih PTN impianmu?</h2>
            <p>Bergabung dengan 50.000+ siswa di seluruh Indonesia dan mulai persiapan UTBK-mu sekarang.</p>
            <button className="btn-cta" onClick={() => navigate('/register')}>Daftar Eduzet Gratis</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="landing-logo">
              <img src="/eduzet-brand-light.svg" alt="Eduzet" className="h-10 sm:h-14" />
            </div>
            <p>Platform persiapan UTBK terbaik untuk raih PTN impianmu.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => navigate('/terms-and-conditions')} className="cursor-pointer hover:text-[#0050cb] transition">Syarat & Ketentuan</button>
            <button onClick={() => navigate('/privacy-policy')} className="cursor-pointer hover:text-[#0050cb] transition">Kebijakan Privasi</button>
            <button onClick={() => navigate('/contact-us')} className="cursor-pointer hover:text-[#0050cb] transition">Hubungi Kami</button>
            <button onClick={() => navigate('/careers')} className="cursor-pointer hover:text-[#0050cb] transition">Karir</button>
            <button onClick={() => navigate('/team')} className="cursor-pointer hover:text-[#0050cb] transition">Tim Eduzet</button>
          </div>
          <div className="footer-copy">© 2026 Eduzet. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};


const TestimonialCard = ({ text, avatar, name, role }) => (
  <div className="testimonial-card">
    <span className="material-symbols-outlined quote-icon">format_quote</span>
    <p className="testimonial-text">{text}</p>
    <div className="testimonial-author">
      <img src={avatar} alt={name} />
      <div>
        <p className="author-name">{name}</p>
        <p className="author-role">{role}</p>
      </div>
    </div>
  </div>
);

export default LandingPage;
