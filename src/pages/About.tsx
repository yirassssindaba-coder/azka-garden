import React from 'react';
import { MapPin, Phone, MessageCircle, ExternalLink, Leaf, Award, Users, Clock, Heart, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Leaf className="h-12 w-12 text-green-200" />
              <h1 className="text-5xl font-bold">Azka Garden</h1>
            </div>
            <p className="text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Toko Bunga Hendrik - Nursery Terpercaya di Depok
            </p>
            <p className="text-lg text-green-200 max-w-4xl mx-auto leading-relaxed">
              Usaha hortikultura keluarga yang telah melayani pecinta tanaman hias dengan dedikasi tinggi, 
              menyediakan 59+ varietas tanaman berkualitas premium dan layanan taman profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Cerita Azka Garden</h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Azka Garden dimulai sebagai usaha keluarga Pak Hendrik di Jl. Raya KSU, Depok, Jawa Barat. 
                  Dengan passion yang mendalam terhadap tanaman hias, kami memulai perjalanan untuk menyediakan 
                  tanaman berkualitas tinggi bagi masyarakat Indonesia.
                </p>
                <p>
                  Seiring berjalannya waktu, kami tidak hanya fokus pada penjualan tanaman, tetapi juga 
                  mengembangkan platform edukasi melalui YouTube channel "Azka Garden Indonesia" yang kini 
                  memiliki lebih dari 13.000 subscriber. Setiap minggu kami berbagi tips perawatan tanaman 
                  dan tutorial budidaya.
                </p>
                <p>
                  Komitmen kami adalah memberikan yang terbaik - dari tanaman indoor mudah perawatan untuk 
                  pemula hingga koleksi bonsai eksklusif untuk kolektor sejati. Setiap tanaman dipilih dengan 
                  teliti dan dilengkapi panduan perawatan yang detail.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg"
                alt="Nursery Azka Garden"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg"
                alt="Koleksi pot dan media tanam"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg"
                alt="Tanaman indoor collection"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg"
                alt="Perawatan tanaman hias"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Mission */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Visi & Misi Kami</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam melayani setiap pelanggan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Kualitas Terbaik</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Setiap tanaman dipilih dengan standar kualitas tinggi dan dijamin sehat saat sampai di tangan pelanggan.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Pelayanan Tulus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kami melayani dengan hati, memberikan konsultasi gratis dan panduan perawatan untuk setiap pembelian.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Komunitas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Membangun komunitas pecinta tanaman melalui edukasi dan berbagi pengalaman di platform digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Kunjungi Toko Kami</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Datang langsung ke nursery kami untuk melihat koleksi lengkap dan konsultasi gratis
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Informasi Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Alamat Lengkap</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Jl. Raya KSU, Tirtajaya<br />
                        Kec. Sukmajaya, Kota Depok<br />
                        Jawa Barat 16412, Indonesia
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm mt-2 font-medium"
                      >
                        Buka di Google Maps
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Telepon & WhatsApp</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">0896-3508-6182</p>
                      <a 
                        href="https://wa.me/6289635086182"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                      >
                        Chat WhatsApp
                        <MessageCircle className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Jam Operasional</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Buka 24 Jam Setiap Hari<br />
                        Konsultasi & Pemesanan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Digital Kami</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.youtube.com/channel/UCuAUD9jzepl1iay_eIlDgKw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
                  >
                    <div className="text-2xl mr-4">📺</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">YouTube Channel</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">13k+ subscriber • Video tutorial mingguan</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                  
                  <a
                    href="https://www.instagram.com/azka_garden/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-pink-50 dark:bg-pink-900 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-800 transition-colors"
                  >
                    <div className="text-2xl mr-4">📸</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Instagram</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">@azka_garden • Katalog & inspirasi taman</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                  
                  <a
                    href="https://www.tokopedia.com/hendrikfloris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                  >
                    <div className="text-2xl mr-4">🛒</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Tokopedia</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Hendrik Floris • Belanja online mudah</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mengapa Memilih Azka Garden?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Keunggulan yang membuat kami menjadi pilihan utama pecinta tanaman hias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Award className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pengalaman Bertahun-tahun</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dengan pengalaman bertahun-tahun di industri hortikultura, kami memahami kebutuhan setiap jenis tanaman.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Star className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Kualitas Premium</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Setiap tanaman dipilih dengan standar kualitas tinggi dan dijamin sehat saat sampai di tangan Anda.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Komunitas Aktif</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bergabung dengan komunitas 13k+ subscriber di YouTube untuk tips dan trik perawatan tanaman.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Clock className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Layanan 24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Toko buka 24 jam setiap hari untuk konsultasi dan pemesanan melalui WhatsApp.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Heart className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Konsultasi Gratis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dapatkan konsultasi gratis untuk pemilihan tanaman dan tips perawatan dari para ahli kami.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <Leaf className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Koleksi Lengkap</h3>
              <p className="text-gray-600 dark:text-gray-300">
                59+ varietas tanaman dari indoor, outdoor, bonsai, hingga aksesoris dan media tanam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-green-600 dark:bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan Berkebun Anda?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan temukan tanaman yang tepat untuk rumah Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6289635086182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Konsultasi via WhatsApp
            </a>
            <a
              href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Kunjungi Toko Fisik
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;