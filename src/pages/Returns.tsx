import React from 'react';
import { RotateCcw, Shield, Clock, MessageCircle, CheckCircle, AlertTriangle, Leaf } from 'lucide-react';

const Returns: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <RotateCcw className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Kebijakan Pengembalian</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Kami berkomitmen memberikan kepuasan pelanggan dengan kebijakan pengembalian yang fair dan mudah
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Return Policy Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Garansi & Pengembalian</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Garansi Hidup</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Semua tanaman dijamin hidup saat sampai di tangan Anda dengan kondisi sehat dan segar
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">24 Jam Klaim</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Laporkan masalah dalam 24 jam setelah penerimaan untuk mendapatkan penggantian atau refund
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Proses Mudah</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proses klaim yang mudah dan cepat melalui WhatsApp dengan tim customer service kami
              </p>
            </div>
          </div>
        </section>

        {/* Return Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Kondisi Pengembalian</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kondisi yang Dapat Diklaim</h3>
              </div>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tanaman mati total saat diterima</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Jenis tanaman tidak sesuai dengan pesanan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Kerusakan fisik parah akibat pengiriman</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Pot pecah atau rusak saat pengiriman</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ukuran tanaman tidak sesuai deskripsi</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kondisi yang Tidak Dapat Diklaim</h3>
              </div>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tanaman mati karena kesalahan perawatan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Kerusakan setelah 24 jam penerimaan</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Perubahan warna daun yang natural</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tanaman yang sudah dipindah pot</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Kerusakan akibat force majeure (bencana alam)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Proses Pengembalian</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hubungi Kami</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hubungi via WhatsApp dalam 24 jam setelah penerimaan
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Kirim Foto</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Kirim foto kondisi tanaman dan kemasan sebagai bukti
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Verifikasi</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Tim kami akan memverifikasi klaim dalam 2-4 jam kerja
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Penyelesaian</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Penggantian tanaman atau refund dalam 3-7 hari kerja
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Opsi Pengembalian</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4 text-center">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Penggantian Tanaman</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Kami akan mengirim tanaman pengganti dengan jenis dan ukuran yang sama tanpa biaya tambahan
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4 text-center">💰</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Refund Penuh</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Pengembalian dana 100% ke metode pembayaran asal dalam 3-7 hari kerja
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4 text-center">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Tukar Varietas</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Tukar dengan tanaman lain dengan nilai setara sesuai pilihan Anda
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Catatan Penting</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  Untuk Tanaman Hidup
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Tanaman adalah makhluk hidup yang memerlukan adaptasi</li>
                  <li>• Perubahan warna atau layu ringan dalam 2-3 hari adalah normal</li>
                  <li>• Ikuti panduan perawatan yang disertakan dalam paket</li>
                  <li>• Jangan langsung menyiram atau memindah pot setelah diterima</li>
                  <li>• Konsultasi gratis via WhatsApp untuk tips perawatan</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Untuk Pot & Aksesoris
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Pot pecah atau retak dapat diklaim penggantian</li>
                  <li>• Media tanam yang tidak sesuai spesifikasi dapat ditukar</li>
                  <li>• Batu taman atau aksesoris rusak akan diganti</li>
                  <li>• Kemasan harus dalam kondisi asli untuk klaim</li>
                  <li>• Foto bukti kerusakan diperlukan untuk verifikasi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Claim */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Cara Mengajukan Klaim</h2>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dokumentasi</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ambil foto tanaman dari berbagai sudut, termasuk kondisi akar jika memungkinkan. 
                    Sertakan juga foto kemasan dan label pengiriman.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Hubungi Customer Service</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Kirim pesan via WhatsApp ke 0896-3508-6182 dengan menyertakan:
                    nomor pesanan, foto kondisi tanaman, dan deskripsi masalah.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Verifikasi Tim</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tim ahli kami akan memverifikasi kondisi tanaman dan menentukan solusi terbaik 
                    dalam 2-4 jam kerja.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Penyelesaian</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Setelah klaim disetujui, Anda dapat memilih penggantian tanaman, refund, 
                    atau tukar dengan varietas lain sesuai preferensi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Testimoni Pelanggan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Sari Dewi</h4>
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Monstera yang saya pesan sampai dalam kondisi sempurna. Packaging-nya sangat rapi dan aman. 
                Tim customer service juga sangat responsif saat saya konsultasi perawatan."
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold">R</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Rizki Pratama</h4>
                  <div className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Pernah ada masalah dengan pengiriman, tapi tim Azka Garden langsung ganti tanaman baru 
                tanpa ribet. Pelayanan after-sales yang luar biasa!"
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section>
          <div className="bg-green-50 dark:bg-green-900 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Butuh Bantuan dengan Pesanan Anda?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tim customer service kami siap membantu 24/7 untuk semua kebutuhan Anda
            </p>
            <a
              href="https://wa.me/6289635086182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Hubungi Customer Service
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Returns;