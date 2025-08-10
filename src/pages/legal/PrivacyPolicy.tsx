import React from 'react';
import { Shield, Eye, Lock, Database, Cookie, Mail, Phone, MapPin } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Kebijakan Privasi</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Komitmen kami untuk melindungi privasi dan data pribadi Anda
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-green-600 mr-2" />
                Informasi yang Kami Kumpulkan
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>Kami mengumpulkan informasi berikut untuk memberikan layanan terbaik:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Informasi Pribadi:</strong> Nama, email, nomor telepon, alamat pengiriman</li>
                  <li><strong>Informasi Akun:</strong> Username, password (terenkripsi), preferensi pengguna</li>
                  <li><strong>Informasi Transaksi:</strong> Riwayat pembelian, metode pembayaran, alamat penagihan</li>
                  <li><strong>Informasi Teknis:</strong> Alamat IP, browser, perangkat, log aktivitas</li>
                  <li><strong>Komunikasi:</strong> Pesan chat, ulasan produk, feedback pelanggan</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-green-600 mr-2" />
                Bagaimana Kami Menggunakan Informasi
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>Informasi Anda digunakan untuk:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Memproses pesanan dan pembayaran</li>
                  <li>Mengirim produk ke alamat yang benar</li>
                  <li>Memberikan dukungan pelanggan</li>
                  <li>Mengirim notifikasi pesanan dan promosi</li>
                  <li>Meningkatkan layanan dan pengalaman pengguna</li>
                  <li>Mencegah penipuan dan aktivitas mencurigakan</li>
                  <li>Mematuhi kewajiban hukum</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-green-600 mr-2" />
                Keamanan Data
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>Kami menerapkan langkah-langkah keamanan tingkat tinggi:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Enkripsi SSL/TLS untuk semua transmisi data</li>
                  <li>Enkripsi database untuk data sensitif</li>
                  <li>Autentikasi dua faktor untuk akun admin</li>
                  <li>Monitoring keamanan 24/7</li>
                  <li>Backup data reguler dan aman</li>
                  <li>Akses terbatas berdasarkan peran</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Cookie className="h-6 w-6 text-green-600 mr-2" />
                Penggunaan Cookie
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>Kami menggunakan cookie untuk:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Menjaga sesi login Anda</li>
                  <li>Mengingat preferensi dan pengaturan</li>
                  <li>Menyimpan isi keranjang belanja</li>
                  <li>Menganalisis penggunaan website</li>
                  <li>Memberikan konten yang dipersonalisasi</li>
                </ul>
                <p>Anda dapat mengelola pengaturan cookie melalui browser Anda.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hak-Hak Anda</h2>
              <div className="text-gray-700 space-y-4">
                <p>Sebagai pengguna, Anda memiliki hak untuk:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mengakses data pribadi yang kami miliki</li>
                  <li>Memperbarui atau mengoreksi informasi</li>
                  <li>Menghapus akun dan data pribadi</li>
                  <li>Membatasi pemrosesan data tertentu</li>
                  <li>Memindahkan data ke layanan lain</li>
                  <li>Menolak pemrosesan untuk tujuan pemasaran</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Berbagi Informasi</h2>
              <div className="text-gray-700 space-y-4">
                <p>Kami tidak menjual data pribadi Anda. Informasi hanya dibagikan dengan:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Penyedia layanan pembayaran (Stripe) untuk memproses transaksi</li>
                  <li>Kurir pengiriman untuk mengirim pesanan</li>
                  <li>Penyedia layanan cloud untuk hosting dan backup</li>
                  <li>Otoritas hukum jika diwajibkan oleh hukum</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontak Kami</h2>
              <div className="text-gray-700">
                <p className="mb-4">Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami:</p>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <span>Email: privacy@azkagarden.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <span>WhatsApp: 0896-3508-6182</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span>Alamat: Jl. Raya KSU, Tirtajaya, Depok, Jawa Barat</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;