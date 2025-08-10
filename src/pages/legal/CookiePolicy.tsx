import React from 'react';
import { Cookie, Settings, Eye, BarChart3, Target } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cookie className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Kebijakan Cookie</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Informasi tentang penggunaan cookie di website Azka Garden
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Apa itu Cookie?</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website. 
                  Cookie membantu kami memberikan pengalaman yang lebih baik dan personal.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="h-6 w-6 text-green-600 mr-2" />
                Jenis Cookie yang Kami Gunakan
              </h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cookie Esensial</h3>
                  <p className="text-gray-700 text-sm">
                    Diperlukan untuk fungsi dasar website seperti login, keranjang belanja, dan keamanan.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cookie Fungsional</h3>
                  <p className="text-gray-700 text-sm">
                    Mengingat preferensi Anda seperti bahasa, mata uang, dan pengaturan tampilan.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cookie Analitik</h3>
                  <p className="text-gray-700 text-sm">
                    Membantu kami memahami bagaimana pengunjung menggunakan website untuk perbaikan layanan.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-2">Cookie Pemasaran</h3>
                  <p className="text-gray-700 text-sm">
                    Digunakan untuk menampilkan iklan yang relevan dan mengukur efektivitas kampanye.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mengelola Cookie</h2>
              <div className="text-gray-700 space-y-4">
                <p>Anda dapat mengelola cookie melalui:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pengaturan browser untuk memblokir atau menghapus cookie</li>
                  <li>Panel preferensi cookie di website kami</li>
                  <li>Opt-out dari cookie pihak ketiga</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <Target className="h-5 w-5 text-yellow-600 mt-1" />
                    <p className="text-yellow-800 text-sm">
                      <strong>Perhatian:</strong> Menonaktifkan cookie esensial dapat mempengaruhi 
                      fungsi website dan pengalaman berbelanja Anda.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Pihak Ketiga</h2>
              <div className="text-gray-700 space-y-4">
                <p>Kami menggunakan layanan pihak ketiga yang mungkin menetapkan cookie:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> Untuk analisis penggunaan website</li>
                  <li><strong>Stripe:</strong> Untuk pemrosesan pembayaran yang aman</li>
                  <li><strong>YouTube:</strong> Untuk menampilkan video tutorial</li>
                  <li><strong>WhatsApp:</strong> Untuk widget chat customer service</li>
                </ul>
              </div>
            </section>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <div className="flex items-start space-x-3">
                <Eye className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Persetujuan Cookie</h3>
                  <p className="text-gray-700">
                    Dengan melanjutkan menggunakan website ini, Anda menyetujui penggunaan cookie 
                    sesuai dengan kebijakan ini. Anda dapat mengubah pengaturan cookie kapan saja.
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

export default CookiePolicy;