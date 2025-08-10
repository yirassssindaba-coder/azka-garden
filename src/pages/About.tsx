import React from 'react';
import { MapPin, Phone, MessageCircle, ExternalLink, Leaf, Award, Users, Clock, Heart, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
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
              Dengan pengalaman bertahun-tahun, kami memahami setiap kebutuhan tanaman dan memberikan 
              panduan perawatan yang tepat untuk setiap pelanggan di seluruh Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cerita Azka Garden</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Azka Garden dimulai sebagai usaha keluarga Pak Hendrik di Jl. Raya KSU, Depok, Jawa Barat. 
                  Dengan passion yang mendalam terhadap tanaman hias, kami memulai perjalanan untuk menyediakan 
                  tanaman berkualitas tinggi bagi masyarakat Indonesia.
                  Dari awal berdiri, kami berkomitmen tidak hanya menjual tanaman, tetapi juga mengedukasi 
                  pelanggan tentang cara merawat tanaman dengan benar.
                </p>
                <p>
                  Seiring berjalannya waktu, kami tidak hanya fokus pada penjualan tanaman, tetapi juga 
                  mengembangkan platform edukasi melalui YouTube channel "Azka Garden Indonesia" yang kini 
                  memiliki lebih dari 13.000 subscriber. Setiap minggu kami berbagi tips perawatan tanaman 
                  dan tutorial budidaya. Channel ini menjadi sumber informasi terpercaya bagi pecinta tanaman 
                  di seluruh Indonesia, dengan video-video berkualitas tinggi yang mudah dipahami.
                </p>
                <p>
                  Komitmen kami adalah memberikan yang terbaik - dari tanaman indoor mudah perawatan untuk 
                  pemula hingga koleksi bonsai eksklusif untuk kolektor sejati. Setiap tanaman dipilih dengan 
                  teliti dan dilengkapi panduan perawatan yang detail. Kami juga menyediakan layanan konsultasi 
                  gratis 24/7 melalui WhatsApp untuk memastikan setiap pelanggan mendapatkan dukungan yang mereka butuhkan.
                </p>
                <p>
                  Visi kami adalah menjadikan setiap rumah di Indonesia lebih hijau dan asri dengan tanaman hias 
                  berkualitas. Misi kami adalah memberikan akses mudah ke tanaman hias terbaik dengan harga terjangkau, 
                  disertai edukasi lengkap dan dukungan berkelanjutan untuk semua pecinta tanaman.
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
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visi & Misi Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam melayani setiap pelanggan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kualitas Terbaik</h3>
              <p className="text-gray-600">
                Setiap tanaman dipilih dengan standar kualitas tinggi dan dijamin sehat saat sampai di tangan pelanggan.
                Kami melakukan seleksi ketat untuk memastikan hanya tanaman terbaik yang sampai ke tangan Anda.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pelayanan Tulus</h3>
              <p className="text-gray-600">
                Kami melayani dengan hati, memberikan konsultasi gratis dan panduan perawatan untuk setiap pembelian.
                Tim customer service kami siap membantu 24/7 dengan respons cepat dan solusi yang tepat.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Komunitas</h3>
              <p className="text-gray-600">
                Membangun komunitas pecinta tanaman melalui edukasi dan berbagi pengalaman di platform digital.
                Bergabunglah dengan 13.000+ subscriber di YouTube dan ribuan follower di media sosial kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kunjungi Toko Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Datang langsung ke nursery kami untuk melihat koleksi lengkap dan konsultasi gratis
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Alamat Lengkap</h4>
                      <p className="text-gray-600">
                        Jl. Raya KSU, Tirtajaya<br />
                        Kec. Sukmajaya, Kota Depok<br />
                        Jawa Barat 16412, Indonesia
                        <br /><br />
                        <strong>Landmark:</strong> Dekat dengan KSU (Koperasi Serba Usaha) dan mudah diakses 
                        dari berbagai arah. Lokasi strategis dengan akses transportasi umum yang baik.
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 text-sm mt-2 font-medium"
                      >
                        Buka di Google Maps
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Hubungi Kami</h4>
                      <p className="text-gray-600 mb-2">
                        0896-3508-6182<br />
                        WhatsApp & Telepon<br />
                        <strong>Respons cepat:</strong> Rata-rata balasan dalam 5 menit<br />
                        <strong>Konsultasi gratis:</strong> Tips perawatan dan rekomendasi tanaman
                      </p>
                      <a 
                        href="https://wa.me/6289635086182"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Chat WhatsApp
                        <MessageCircle className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Jam Operasional</h4>
                      <p className="text-gray-600">
                        Buka 24 Jam<br />
                        Setiap Hari<br />
                        <span className="text-green-600 font-medium">Konsultasi & Pemesanan</span><br />
                        <strong>Kunjungan toko:</strong> Disarankan pagi hari (07:00-10:00) untuk melihat 
                        tanaman dalam kondisi terbaik dan mendapat konsultasi langsung dari ahli kami.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Digital Kami</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.youtube.com/channel/UCuAUD9jzepl1iay_eIlDgKw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                  >
                    <div className="text-2xl mr-4">📺</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">YouTube Channel</h4>
                      <p className="text-gray-600 text-sm">
                        13k+ subscriber • Video tutorial mingguan<br />
                        <strong>Konten:</strong> Tips perawatan, tutorial repotting, identifikasi penyakit tanaman
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                  
                  <a
                    href="https://www.instagram.com/azka_garden/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors border border-pink-200"
                  >
                    <div className="text-2xl mr-4">📸</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instagram</h4>
                      <p className="text-gray-600 text-sm">
                        @azka_garden • Katalog & inspirasi taman<br />
                        <strong>Update harian:</strong> Foto tanaman baru, customer showcase, behind the scenes
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </a>
                  
                  <a
                    href="https://www.tokopedia.com/hendrikfloris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <div className="text-2xl mr-4">🛒</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Tokopedia</h4>
                      <p className="text-gray-600 text-sm">
                        Hendrik Floris • Belanja online mudah<br />
                        <strong>Rating:</strong> 4.9/5 dengan ribuan transaksi sukses
                      </p>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih Azka Garden?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Keunggulan yang membuat kami menjadi pilihan utama pecinta tanaman hias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Award className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pengalaman Bertahun-tahun</h3>
              <p className="text-gray-600">
                Dengan pengalaman bertahun-tahun di industri hortikultura, kami memahami kebutuhan setiap jenis tanaman.
                Tim ahli kami telah menangani ribuan kasus perawatan tanaman dengan tingkat keberhasilan tinggi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Star className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kualitas Premium</h3>
              <p className="text-gray-600">
                Setiap tanaman dipilih dengan standar kualitas tinggi dan dijamin sehat saat sampai di tangan Anda.
                Proses seleksi ketat dengan pemeriksaan kesehatan tanaman oleh ahli hortikultura bersertifikat.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Komunitas Aktif</h3>
              <p className="text-gray-600">
                Bergabung dengan komunitas 13k+ subscriber di YouTube untuk tips dan trik perawatan tanaman.
                Akses eksklusif ke grup WhatsApp komunitas dengan diskusi harian dan sharing pengalaman.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Clock className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Layanan 24/7</h3>
              <p className="text-gray-600">
                Toko buka 24 jam setiap hari untuk konsultasi dan pemesanan melalui WhatsApp.
                Tim customer service siap membantu kapan saja dengan respons rata-rata dalam 5 menit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Heart className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Konsultasi Gratis</h3>
              <p className="text-gray-600">
                Dapatkan konsultasi gratis untuk pemilihan tanaman dan tips perawatan dari para ahli kami.
                Layanan konsultasi mencakup diagnosa masalah tanaman, rekomendasi perawatan, dan follow-up berkala.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
              <Leaf className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Koleksi Lengkap</h3>
              <p className="text-gray-600">
                59+ varietas tanaman dari indoor, outdoor, bonsai, hingga aksesoris dan media tanam.
                Koleksi terus bertambah dengan tanaman langka dan varietas baru yang didatangkan khusus untuk pelanggan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Perjalanan Berkebun Anda?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan temukan tanaman yang tepat untuk rumah Anda
            Tim ahli kami siap memberikan rekomendasi personal berdasarkan kondisi rumah, pengalaman, dan preferensi Anda.
          </p>
          
          {/* Additional Benefits */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4">Yang Anda Dapatkan:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Konsultasi gratis seumur hidup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Panduan perawatan detail tertulis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Garansi tanaman hidup 24 jam</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Akses grup komunitas eksklusif</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Packaging khusus anti rusak</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                <span>Follow-up perawatan via WhatsApp</span>
              </div>
            </div>
          </div>
          
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