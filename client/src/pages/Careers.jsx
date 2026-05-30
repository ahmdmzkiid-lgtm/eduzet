import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Careers() {
  const [showComingModal, setShowComingModal] = useState(true);

  const careers = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: 'Mengembangkan interface yang intuitif dan responsif untuk platform EduZET',
    },
    {
      id: 2,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: 'Membangun API dan sistem backend yang scalable dan efisien',
    },
    {
      id: 3,
      title: 'Content Creator - Pembahasan Soal',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      description: 'Membuat pembahasan soal UTBK yang komprehensif dan mudah dipahami',
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: 'Mendesain pengalaman pengguna yang menarik dan fungsional',
    },
    {
      id: 5,
      title: 'Product Manager',
      department: 'Product',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: 'Memimpin pengembangan produk dan strategi platform EduZET',
    },
    {
      id: 6,
      title: 'Community Manager',
      department: 'Marketing',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: 'Membangun dan memelihara komunitas pengguna EduZET yang aktif',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Coming Soon Modal */}
      {showComingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 animate-bounce-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lowongan Belum Dibuka</h2>
              <p className="text-gray-600 mb-2 text-lg">
                Terima kasih atas minat Anda bergabung dengan tim EduZET!
              </p>
              <p className="text-gray-600 mb-8">
                Saat ini kami belum membuka lowongan pekerjaan. Namun, kami akan segera mengumumkan posisi terbaru. Silakan periksa kembali di halaman ini atau hubungi kami untuk informasi lebih lanjut.
              </p>
              <button
                onClick={() => setShowComingModal(false)}
                className="bg-[#0050cb] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#0050cb]/90 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0050cb] to-[#0050cb]/80 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bergabunglah dengan Tim EduZET
          </h1>
          <p className="text-white/90 text-lg">
            Kami mencari talenta terbaik untuk membangun masa depan pendidikan Indonesia
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        {/* About Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tentang EduZET</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                EduZET adalah platform pembelajaran UTBK terdepan di Indonesia yang membantu ribuan siswa mencapai impian mereka untuk masuk ke universitas ternama.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Kami berkomitmen untuk menyediakan pengalaman belajar terbaik dengan teknologi terkini dan konten berkualitas tinggi.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Nilai-nilai Kami</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#0050cb] font-bold">✓</span>
                  <span className="text-gray-700"><strong>Inovasi:</strong> Terus berkembang dan menemukan solusi baru</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#0050cb] font-bold">✓</span>
                  <span className="text-gray-700"><strong>Kualitas:</strong> Memberikan yang terbaik untuk pengguna</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#0050cb] font-bold">✓</span>
                  <span className="text-gray-700"><strong>Integritas:</strong> Transparansi dan kejujuran dalam setiap tindakan</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#0050cb] font-bold">✓</span>
                  <span className="text-gray-700"><strong>Kolaborasi:</strong> Bekerja bersama untuk mencapai tujuan bersama</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="mb-20 bg-gray-50 p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Mengapa Bergabung dengan EduZET?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Misi Mulia</h3>
              <p className="text-gray-700">
                Membantu ribuan siswa Indonesia mewujudkan impian mereka untuk mendapatkan pendidikan berkualitas di universitas terkemuka.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🌱 Pertumbuhan Karir</h3>
              <p className="text-gray-700">
                Bekerja di lingkungan yang dinamis dengan kesempatan belajar dan pengembangan profesional yang berkelanjutan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💼 Budaya Kerja</h3>
              <p className="text-gray-700">
                Tim yang kolaboratif, inovatif, dan saling mendukung untuk menciptakan produk yang luar biasa.
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Lowongan Terbuka</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Saat ini belum ada lowongan yang tersedia. Silakan periksa kembali di kemudian hari atau hubungi kami untuk informasi lebih lanjut.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-not-allowed opacity-60"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                <div className="flex gap-4 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded">
                    {job.department}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{job.location}</p>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
                >
                  Lowongan Ditutup
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-[#0050cb] to-[#0050cb]/80 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Dapatkan Notifikasi Lowongan Terbaru</h2>
          <p className="text-white/90 mb-8">
            Daftarkan email Anda untuk menerima notifikasi ketika kami membuka lowongan baru
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
            />
            <button className="bg-white text-[#0050cb] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Daftar
            </button>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Hubungi Kami</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Memiliki pertanyaan tentang karir di EduZET? Jangan ragu untuk menghubungi kami:
          </p>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-800 mb-2"><strong>Email:</strong> careers@eduzet.com</p>
            <p className="text-gray-800 mb-2"><strong>Telepon:</strong> 085183147625</p>
            <p className="text-gray-800"><strong>Alamat:</strong> Jakarta, Indonesia</p>
          </div>
        </section>
      </div>

      {/* Footer Link */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 border-t border-gray-200 mt-20">
        <Link 
          to="/" 
          className="text-[#0050cb] hover:text-[#0050cb]/80 font-semibold"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
