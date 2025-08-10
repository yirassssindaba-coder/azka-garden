import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Scale className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Syarat & Ketentuan</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Ketentuan penggunaan layanan Azka Garden yang perlu Anda ketahui
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Terakhir diperbarui:</strong> 15 Januari 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Penerimaan Ketentuan</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Dengan mengakses dan menggunakan website Azka Garden, Anda menyetujui untuk terikat 
                  dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, 
                  mohon untuk tidak menggunakan layanan kami.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Layanan Kami</h2>
              <div className="text-gray-700 space-y-4">
                <p>Azka Garden menyediakan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Penjualan tanaman hias dan aksesoris taman</li>
                  <li>Jasa pembuatan dan renovasi taman</li>
                  <li>Jasa pembuatan kolam ikan</li>
                  <li>Konsultasi perawatan tanaman</li>
                  <li>Edukasi melalui konten digital</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Akun Pengguna</h2>
              <div className="text-gray-700 space-y-4">
                <p>Untuk menggunakan layanan tertentu, Anda perlu membuat akun dengan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Informasi yang akurat dan lengkap</li>
                  <li>Password yang aman dan rahasia</li>
                  <li>Tanggung jawab atas semua aktivitas akun</li>
                  <li>Pemberitahuan segera jika terjadi penggunaan tidak sah</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pemesanan dan Pembayaran</h2>
              <div className="text-gray-700 space-y-4">
                <p>Ketentuan pemesanan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Semua harga dalam Rupiah (IDR) kecuali disebutkan lain</li>
                  <li>Harga dapat berubah tanpa pemberitahuan sebelumnya</li>
                  <li>Pembayaran harus dilakukan sebelum pengiriman</li>
                  <li>Kami berhak menolak pesanan yang mencurigakan</li>
                  <li>Konfirmasi pesanan akan dikirim via email/WhatsApp</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pengiriman dan Garansi</h2>
              <div className="text-gray-700 space-y-4">
                <p>Ketentuan pengiriman:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Estimasi waktu pengiriman bersifat perkiraan</li>
                  <li>Risiko pengiriman ditanggung bersama</li>
                  <li>Garansi tanaman hidup 24 jam setelah diterima</li>
                  <li>Klaim garansi harus disertai foto bukti</li>
                  <li>Penggantian atau refund sesuai kebijakan</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Hak Kekayaan Intelektual</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Semua konten di website ini, termasuk teks, gambar, logo, dan video 
                  adalah milik Azka Garden dan dilindungi hak cipta. Penggunaan tanpa izin dilarang.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Pembatasan Tanggung Jawab</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Azka Garden tidak bertanggung jawab atas kerugian tidak langsung, 
                  kehilangan keuntungan, atau kerusakan yang timbul dari penggunaan layanan kami.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Perubahan Ketentuan</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Kami berhak mengubah syarat dan ketentuan ini kapan saja. 
                  Perubahan akan diberitahukan melalui website dan email.
                </p>
              </div>
            </section>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Hubungi Kami</h3>
                  <p className="text-gray-700">
                    Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, 
                    silakan hubungi kami di <strong>legal@azkagarden.com</strong> atau 
                    WhatsApp <strong>0896-3508-6182</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;