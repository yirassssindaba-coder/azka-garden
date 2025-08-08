import React from 'react';
import { Truck, Package, Clock, Shield, MapPin, MessageCircle, Leaf } from 'lucide-react';

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Truck className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Informasi Pengiriman</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Panduan lengkap pengiriman tanaman hias dengan packaging khusus untuk menjaga kualitas
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Metode Pengiriman</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pengiriman Regular</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Estimasi 3-5 hari kerja untuk seluruh Indonesia
              </p>
              <div className="text-green-600 dark:text-green-400 font-semibold">Mulai dari Rp15.000</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pengiriman Express</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Estimasi 1-2 hari kerja untuk area Jabodetabek
              </p>
              <div className="text-blue-600 dark:text-blue-400 font-semibold">Mulai dari Rp25.000</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ambil di Toko</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Langsung ambil di toko kami di Depok
              </p>
              <div className="text-purple-600 dark:text-purple-400 font-semibold">Gratis</div>
            </div>
          </div>
        </section>

        {/* Packaging Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Packaging Khusus Tanaman</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Standar Packaging Kami</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Pot dibungkus dengan bubble wrap untuk perlindungan maksimal</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Tanaman diikat dengan hati-hati untuk mencegah kerusakan daun</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Menggunakan kardus khusus dengan ventilasi untuk tanaman</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Label "FRAGILE" dan "TANAMAN HIDUP" pada setiap paket</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Panduan perawatan disertakan dalam setiap pengiriman</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tips Setelah Menerima Tanaman</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Segera buka paket dan letakkan tanaman di tempat teduh</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Jangan langsung menyiram, biarkan tanaman beradaptasi 1-2 hari</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Periksa kondisi tanah dan akar jika diperlukan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Hubungi kami jika ada masalah dalam 24 jam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Area Pengiriman</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Jabodetabek & Sekitarnya</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Jakarta (semua wilayah)</li>
                <li>• Bogor, Depok, Tangerang, Bekasi</li>
                <li>• Bandung dan sekitarnya</li>
                <li>• Cirebon, Sukabumi, Cianjur</li>
              </ul>
              <div className="mt-4 text-green-600 dark:text-green-400 font-semibold">
                Estimasi: 1-3 hari kerja
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Seluruh Indonesia</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Sumatera (semua provinsi)</li>
                <li>• Kalimantan (semua provinsi)</li>
                <li>• Sulawesi (semua provinsi)</li>
                <li>• Papua, Maluku, Nusa Tenggara</li>
              </ul>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold">
                Estimasi: 3-7 hari kerja
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Costs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Estimasi Ongkos Kirim</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Wilayah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Regular
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Express
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estimasi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Depok & Sekitar</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp10.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp15.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">1-2 hari</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Jabodetabek</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp15.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp25.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">2-3 hari</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Jawa Barat</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp20.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp35.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">3-4 hari</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Pulau Jawa</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp25.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp45.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">4-6 hari</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Luar Jawa</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp35.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Rp65.000</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">5-8 hari</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Special Care */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Perawatan Khusus Pengiriman</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Untuk Tanaman Besar</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Menggunakan kardus extra strong dan penyangga khusus</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tanaman tinggi di atas 1 meter menggunakan packaging kayu</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Koordinasi khusus dengan kurir untuk handling yang tepat</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Untuk Tanaman Sensitif</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Bonsai dan tanaman mahal menggunakan box kayu custom</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tanaman berbunga diberi perlindungan extra pada bunga</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Asuransi pengiriman untuk tanaman di atas Rp500.000</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Syarat & Ketentuan Pengiriman</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Garansi Pengiriman</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Garansi tanaman hidup selama pengiriman</li>
                  <li>• Penggantian gratis jika tanaman mati karena pengiriman</li>
                  <li>• Klaim harus dilaporkan dalam 24 jam setelah diterima</li>
                  <li>• Foto bukti kondisi tanaman diperlukan untuk klaim</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Ketentuan Khusus</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  <li>• Pengiriman tanaman besar memerlukan konfirmasi khusus</li>
                  <li>• Ongkir dapat berubah sesuai kondisi cuaca ekstrem</li>
                  <li>• Pengiriman ke daerah terpencil memerlukan koordinasi tambahan</li>
                  <li>• Asuransi wajib untuk tanaman premium di atas Rp1.000.000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Shipping */}
        <section>
          <div className="bg-green-50 dark:bg-green-900 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Butuh Informasi Pengiriman Khusus?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Untuk pengiriman tanaman besar, area khusus, atau pertanyaan lainnya, hubungi tim kami
            </p>
            <a
              href="https://wa.me/6289635086182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Konsultasi Pengiriman
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shipping;