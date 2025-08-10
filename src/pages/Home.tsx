import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Heart, Star, MapPin, Phone, MessageCircle, ExternalLink, Award, Shield, Clock, Users } from 'lucide-react';
import FeaturedCollections from '../components/catalog/FeaturedCollections';
import PlantShowcase from '../components/catalog/PlantShowcase';
import ReviewsAndComments from '../components/reviews/ReviewsAndComments';
import { Plant } from '../types';
import { getFeaturedPlants } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const [featuredPlants, setFeaturedPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadFeaturedPlants = async () => {
      try {
        const plants = await getFeaturedPlants();
        setFeaturedPlants(plants);
      } catch (error) {
        console.error('Error loading featured plants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPlants();
  }, []);

  useEffect(() => {
    // Create floating flower petals effect
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'floating-petal';
      petal.innerHTML = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍃', '🌱', '🌾', '🍀', '🌳'][Math.floor(Math.random() * 12)];
      petal.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 10 + 15}px;
        opacity: ${Math.random() * 0.7 + 0.3};
        pointer-events: none;
        z-index: 0;
        animation: floatDown ${Math.random() * 6 + 8}s linear infinite;
        transform: rotate(${Math.random() * 360}deg);
      `;
      
      document.body.appendChild(petal);
      
      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      }, 15000);
    };

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatDown {
        0% {
          transform: translateY(-50px) rotate(0deg) scale(0.8);
          opacity: 1;
        }
        50% {
          transform: translateY(40vh) rotate(180deg) scale(1);
          opacity: 0.8;
        }
        100% {
          transform: translateY(100vh) rotate(360deg) scale(0.6);
          opacity: 0;
        }
      }
      .floating-petal {
        animation: floatDown linear infinite;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
      }
    `;
    document.head.appendChild(style);

    // Create petals periodically
    const interval = setInterval(createPetal, 1500);
    
    // Initial petals
    for (let i = 0; i < 5; i++) {
      setTimeout(createPetal, i * 300);
    }

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
      // Clean up existing petals
      document.querySelectorAll('.floating-petal').forEach(petal => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      });
    };
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
                <Leaf className="h-5 w-5 text-green-200 mr-2" />
                <span className="text-green-100 text-sm font-medium">Toko Tanaman Hias #1 di Depok</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Hijaukan Rumah Anda dengan
                <span className="text-gradient bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent"> Tanaman Hias Terbaik</span>
              </h1>
              <p className="text-xl mb-8 text-green-100 leading-relaxed animate-slide-up">
                Koleksi lengkap 59+ tanaman hias berkualitas premium dari Jamani Dolar hingga Bonsai eksklusif. 
                Dari tanaman indoor mudah perawatan hingga koleksi premium untuk kolektor sejati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
                <Link
                  to="/stripe-products"
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-bold rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Jelajahi Koleksi Premium
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/6289635086182"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Konsultasi Gratis
                </a>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in">
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">59+</div>
                  <div className="text-green-200 text-sm font-medium">Jenis Tanaman</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-green-200 text-sm font-medium">Buka Setiap Hari</div>
                </div>
                <div className="text-center p-4 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white mb-1">10k+</div>
                  <div className="text-green-200 text-sm font-medium">Pelanggan Puas</div>
                </div>
              </div>
            </div>
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg"
                alt="Koleksi tanaman hias Azka Garden"
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl animate-slide-up">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900 text-lg">4.9/5</span>
                  <span className="text-gray-600 text-sm font-medium">Rating Pelanggan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Azka Garden Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Azka Garden</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toko Bunga Hendrik - Azka Garden adalah usaha hortikultura keluarga yang telah melayani 
              pecinta tanaman hias di Depok dan sekitarnya dengan dedikasi tinggi. Didirikan dengan visi 
              menghijaukan Indonesia, kami telah menjadi pilihan utama ribuan pelanggan di seluruh nusantara.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sejarah & Visi Kami</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Azka Garden didirikan oleh keluarga Pak Hendrik di Jl. Raya KSU, Depok, sebagai 
                  nursery yang mengkhususkan diri pada tanaman hias berkualitas tinggi. Dengan pengalaman 
                  bertahun-tahun, kami memahami kebutuhan setiap tanaman dan memberikan panduan perawatan 
                  yang tepat untuk setiap pelanggan. Perjalanan kami dimulai dari kecintaan terhadap tanaman 
                  dan berkembang menjadi misi menghijaukan rumah-rumah di Indonesia.
                </p>
                <p>
                  Visi kami adalah menjadi toko tanaman hias terpercaya yang tidak hanya menjual produk, 
                  tetapi juga mengedukasi masyarakat tentang cara merawat tanaman dengan benar melalui 
                  kanal YouTube dan media sosial kami. Kami percaya bahwa setiap orang bisa menjadi 
                  plant parent yang sukses dengan bimbingan yang tepat dan tanaman berkualitas.
                </p>
                <p>
                  Dengan koleksi 59+ varietas tanaman dari yang mudah perawatan hingga koleksi premium 
                  eksklusif, kami berkomitmen memberikan yang terbaik untuk setiap rumah di Indonesia. 
                  Setiap tanaman dipilih dengan teliti, dikemas dengan aman, dan disertai panduan perawatan 
                  yang mudah dipahami. Kepuasan pelanggan adalah prioritas utama kami.
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

          {/* Location & Contact Info */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kunjungi Toko Kami</h3>
              <p className="text-gray-600">
                Datang langsung ke nursery kami untuk melihat koleksi lengkap dan konsultasi gratis
                Nikmati pengalaman berbelanja tanaman secara langsung dengan bimbingan ahli kami.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap</h4>
                <p className="text-gray-600 text-sm">
                  Jl. Raya KSU, Tirtajaya<br />
                  Kec. Sukmajaya, Kota Depok<br />
                  Jawa Barat 16412, Indonesia<br />
                  <strong>Landmark:</strong> Dekat KSU, mudah diakses<br />
                  <strong>Parkir:</strong> Tersedia area parkir luas
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
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Hubungi Kami</h4>
                <p className="text-gray-600 text-sm mb-2">
                  0896-3508-6182<br />
                  WhatsApp & Telepon<br />
                  <strong>Respons:</strong> Rata-rata 5 menit<br />
                  <strong>Bahasa:</strong> Indonesia & English
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
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Jam Operasional</h4>
                <p className="text-gray-600 text-sm">
                  Buka 24 Jam<br />
                  Setiap Hari<br />
                  <span className="text-green-600 font-medium">Konsultasi & Pemesanan</span><br />
                  <strong>Kunjungan terbaik:</strong> Pagi hari (07:00-10:00)<br />
                  <strong>Konsultasi intensif:</strong> Tersedia appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih Azka Garden?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Komitmen kami untuk memberikan yang terbaik bagi pecinta tanaman hias di Indonesia. 
              Lebih dari sekedar toko, kami adalah partner dalam perjalanan berkebun Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">59+ Varietas Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Dari Jamani Dolar hingga Bonsai eksklusif, semua tanaman dipilih dengan teliti untuk kualitas optimal 
                dan disesuaikan dengan iklim Indonesia. Koleksi kami mencakup tanaman indoor, outdoor, sukulen, 
                tanaman berbunga, hingga tanaman langka yang sulit ditemukan di tempat lain.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Panduan Perawatan Lengkap</h3>
              <p className="text-gray-600 leading-relaxed">
                Setiap tanaman dilengkapi panduan perawatan detail dari frekuensi penyiraman hingga tips khusus 
                berdasarkan pengalaman bertahun-tahun. Panduan mencakup cara penyiraman, pemupukan, 
                penanganan hama, repotting, dan troubleshooting masalah umum yang mungkin terjadi.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Harga Terjangkau</h3>
              <p className="text-gray-600 leading-relaxed">
                Mulai dari Rp10.000 hingga koleksi premium. Ada tanaman untuk setiap budget dan kebutuhan 
                dengan kualitas terjamin. Kami percaya tanaman hias berkualitas harus dapat diakses oleh semua kalangan, 
                dari mahasiswa hingga kolektor profesional. Sistem pembayaran fleksibel dan promo reguler tersedia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Layanan Azka Garden</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lebih dari sekedar toko tanaman, kami menyediakan solusi lengkap untuk kebutuhan taman Anda. 
              Dari konsultasi hingga maintenance, kami adalah partner terpercaya dalam perjalanan berkebun Anda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-green-200">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Penjualan Tanaman</h3>
              <p className="text-gray-600 text-sm">
                59+ varietas tanaman hias dari indoor hingga outdoor, bibit buah, dan koleksi bonsai premium. 
                Semua tanaman dipilih langsung dari petani terpercaya dengan standar kualitas internasional.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-green-200">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Jasa Taman</h3>
              <p className="text-gray-600 text-sm">
                Pembuatan dan renovasi taman, desain landscape, dan penataan area hijau untuk rumah atau kantor. 
                Tim landscape designer berpengalaman siap mewujudkan taman impian Anda dengan konsep modern dan berkelanjutan.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-green-200">
              <div className="text-4xl mb-4">🐠</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kolam Ikan</h3>
              <p className="text-gray-600 text-sm">
                Pembuatan kolam ikan hias, kolam koi, dan water feature untuk mempercantik taman Anda. 
                Desain custom dengan sistem filtrasi modern dan maintenance berkala untuk menjaga kejernihan air.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-green-200">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Edukasi & Konsultasi</h3>
              <p className="text-gray-600 text-sm">
                Tutorial perawatan tanaman melalui YouTube dan konsultasi gratis via WhatsApp untuk semua pelanggan. 
                Program edukasi mencakup workshop offline, webinar online, dan panduan tertulis yang mudah dipahami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Showcase */}
      <PlantShowcase />

      {/* Price Range Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tanaman untuk Setiap Budget</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dari yang terjangkau hingga koleksi eksklusif untuk semua kalangan. 
              Kami percaya setiap orang berhak memiliki tanaman hias berkualitas, apapun budgetnya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:-translate-y-2">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Budget Friendly</h3>
              <p className="text-green-600 font-bold text-lg mb-4">Rp10.000 - Rp50.000</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tanaman berkualitas dengan harga terjangkau untuk pemula dan pecinta tanaman dengan budget terbatas. 
                Pilihan perfect untuk mahasiswa, karyawan baru, atau siapa saja yang ingin memulai hobi berkebun 
                tanpa mengeluarkan biaya besar.
              </p>
              <Link
                to="/products?price=budget"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Lihat Koleksi
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:-translate-y-2">
              <div className="text-6xl mb-6">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Mid Range</h3>
              <p className="text-green-600 font-bold text-lg mb-4">Rp50.000 - Rp500.000</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
              Dengan pengalaman bertahun-tahun, kami menyediakan tanaman terbaik dengan panduan perawatan lengkap 
              dan dukungan konsultasi gratis seumur hidup untuk setiap pembelian.
                Tanaman berkualitas tinggi untuk penggemar tanaman hias yang ingin koleksi lebih beragam. 
                Kategori ini mencakup tanaman hias populer, tanaman berbunga, dan varietas unik yang 
                perfect untuk mendekorasi rumah atau kantor dengan style yang lebih sophisticated.
              </p>
              <Link
                to="/stripe-products"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Koleksi Premium
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:-translate-y-2">
              <div className="text-6xl mb-6">👑</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Premium Collection</h3>
              <p className="text-green-600 font-bold text-lg mb-4">Rp500.000+</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Bonsai eksklusif dan tanaman langka untuk kolektor sejati yang menghargai keunikan dan kualitas. 
                Setiap tanaman premium dilengkapi sertifikat keaslian, panduan perawatan khusus, dan 
                layanan konsultasi intensif dari master bonsai kami.
              </p>
              <Link
                to="/products?price=premium"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Koleksi Eksklusif
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Dipercaya Ribuan Pelanggan</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Pengalaman bertahun-tahun dan komitmen kualitas membuat kami menjadi pilihan utama
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">59+</div>
              <div className="text-green-200 font-medium">Jenis Tanaman</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-green-200 font-medium">Layanan</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10k+</div>
              <div className="text-green-200 font-medium">Pelanggan Puas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">4.9</div>
              <div className="text-green-200 font-medium">Rating Bintang</div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <Award className="h-8 w-8 text-green-200 mb-4" />
              <h3 className="text-lg font-bold mb-2">Kualitas Terjamin</h3>
              <p className="text-green-100 text-sm">
                Setiap tanaman dipilih dengan teliti dan dijamin sehat saat sampai di tangan Anda
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <Shield className="h-8 w-8 text-green-200 mb-4" />
              <h3 className="text-lg font-bold mb-2">Garansi Hidup</h3>
              <p className="text-green-100 text-sm">
                Garansi tanaman hidup dan panduan perawatan lengkap untuk setiap pembelian
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
              <Users className="h-8 w-8 text-green-200 mb-4" />
              <h3 className="text-lg font-bold mb-2">Komunitas Aktif</h3>
              <p className="text-green-100 text-sm">
                Bergabung dengan komunitas pecinta tanaman dan dapatkan tips dari para ahli
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Channel Promotion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
            <div className="text-6xl mb-6">📺</div>
            <h2 className="text-3xl font-bold mb-4">Channel YouTube Azka Garden Indonesia</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Lebih dari 13.000 subscriber mempercayai kami untuk tutorial perawatan tanaman. 
              Video baru setiap minggu dengan tips dan trik dari para ahli.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/channel/UCuAUD9jzepl1iay_eIlDgKw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Tonton di YouTube
              </a>
              <a
                href="https://wa.me/6289635086182"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Konsultasi Langsung
              </a>
            </div>
            
            {/* Additional Hero Information */}
            <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-green-100 text-sm leading-relaxed">
                <strong>Azka Garden</strong> adalah toko tanaman hias terpercaya di Depok yang melayani seluruh Indonesia. 
                Kami mengkhususkan diri pada tanaman hias berkualitas tinggi dengan layanan konsultasi gratis, 
                panduan perawatan lengkap, dan garansi tanaman hidup. Dari pemula hingga kolektor berpengalaman, 
                kami memiliki solusi tanaman yang tepat untuk setiap kebutuhan dan budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews and Comments Section */}
      <ReviewsAndComments />
    </div>
  );
};

export default Home;