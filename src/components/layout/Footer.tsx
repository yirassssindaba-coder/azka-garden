import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { subscribe, isSubscribed } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await subscribe(email, name);
      alert('Berhasil berlangganan newsletter! Sekarang Anda dapat mengakses produk premium.');
      setEmail('');
      setName('');
    } catch (error) {
      alert('Gagal berlangganan newsletter. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 text-gray-900 border-t-4 border-green-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300 rounded-full blur-2xl"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 relative">
        {/* Newsletter Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between mobile-padding relative z-10">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white drop-shadow-lg mobile-text-sm">Newsletter Azka Garden</h3>
              </div>
              <p className="text-green-50 text-xl leading-relaxed mobile-text-xs max-w-2xl">
                Dapatkan tips perawatan tanaman dan penawaran khusus langsung di email Anda
              </p>
              {isSubscribed && (
                <div className="flex items-center space-x-3 mt-4">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-bold text-lg bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
                    ✅ Berlangganan Aktif - Akses Premium Tersedia!
                  </span>
                </div>
              )}
            </div>
            {!isSubscribed && (
              <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Nama (opsional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 md:w-40 px-4 py-3 rounded-xl text-gray-900 bg-white bg-opacity-95 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-xl mobile-form-input backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 md:w-60 px-4 py-3 rounded-xl text-gray-900 bg-white bg-opacity-95 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-xl mobile-form-input backdrop-blur-sm"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-green-600 hover:bg-green-50 px-6 py-4 rounded-xl font-bold text-xl transition-all duration-300 disabled:opacity-50 mobile-btn shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"></div>
                      <span>Memproses...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🌟</span>
                      <span>Berlangganan & Akses Premium</span>
                      <span>🚀</span>
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Azka Garden</span>
            </div>
            <p className="text-gray-800 text-lg mb-8 leading-relaxed font-medium">
              Toko tanaman hias online terpercaya dengan koleksi lengkap 59+ varietas premium. 
              Dari Jamani Dolar hingga Bonsai eksklusif untuk semua pecinta tanaman di Indonesia.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.tokopedia.com/hendrikfloris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                title="Tokopedia Hendrik Floris"
              >
                <ExternalLink className="h-6 w-6 text-white" />
              </a>
              <a 
                href="https://wa.me/6289635086182" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                title="WhatsApp Azka Garden"
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCuAUD9jzepl1iay_eIlDgKw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                title="YouTube Azka Garden Indonesia"
              >
                <span className="text-white text-xl">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-green-300 pb-2">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Tentang Azka Garden</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Kontak Kami</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>FAQ & Bantuan</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Informasi Pengiriman</span>
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Kebijakan Pengembalian</span>
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Panduan Perawatan Tanaman</span>
                </Link>
              </li>
              <li>
                <Link to="/stripe-products" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Koleksi Premium</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Blog & Tips</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-2 group">
                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-green-600 transition-colors"></span>
                  <span>Karir</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-green-300 pb-2">Kategori Populer</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=6" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🪨</span>
                  <span>Batu Taman</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=7" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🌱</span>
                  <span>Media Tanah</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=1" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🌿</span>
                  <span>Tanaman Hias</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=6" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🏺</span>
                  <span>Pot & Aksesoris</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=4" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🌳</span>
                  <span>Bonsai Premium</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=5" className="text-gray-800 hover:text-green-700 transition-all duration-300 text-lg hover:underline hover:translate-x-2 flex items-center space-x-3 group">
                  <span className="text-2xl">🌸</span>
                  <span>Tanaman Berbunga</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-green-300 pb-2">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mt-1">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 text-lg leading-relaxed font-medium">
                    Jl. Raya KSU, Tirtajaya<br />
                    Kec. Sukmajaya, Kota Depok<br />
                    Jawa Barat 16412, Indonesia
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-base mt-3 inline-flex items-center font-bold hover:underline transition-all duration-300 hover:translate-x-1"
                  >
                    📍 Lihat di Google Maps
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 text-xl font-bold">0896-3508-6182</p>
                  <p className="text-green-700 text-base font-medium">WhatsApp & Telepon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 text-lg font-semibold">info@azkagarden.com</p>
                  <p className="text-green-700 text-base font-medium">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mt-1">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-900 text-xl font-bold">
                    Buka 24 Jam Setiap Hari
                  </p>
                  <p className="text-green-700 text-base font-medium">Konsultasi & Pemesanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-green-300 bg-gradient-to-r from-green-100 via-emerald-100 to-green-200 relative">
        {/* Bottom Bar Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316a34a' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="text-gray-800 text-xl mb-4 md:mb-0 text-center md:text-left font-medium">
              © {currentYear} <span className="font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Azka Garden</span> - Toko Bunga Hendrik. 
              <br className="md:hidden" />
              <span className="text-green-800 font-semibold">Semua hak dilindungi undang-undang.</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-6 text-base">
              <Link to="/privacy" className="text-black hover:text-green-700 transition-all duration-300 hover:underline font-bold hover:translate-y-1">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-black hover:text-green-700 transition-all duration-300 hover:underline font-bold hover:translate-y-1">
                Syarat & Ketentuan
              </Link>
              <Link to="/cookies" className="text-black hover:text-green-700 transition-all duration-300 hover:underline font-bold hover:translate-y-1">
                Kebijakan Cookie
              </Link>
              <Link to="/sitemap" className="text-black hover:text-green-700 transition-all duration-300 hover:underline font-bold hover:translate-y-1">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-green-200">
            <div className="flex flex-wrap items-center justify-center space-x-8 gap-6">
              <div className="flex items-center space-x-4 text-gray-800 text-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold">SSL</span>
                </div>
                <span className="font-bold">Transaksi Aman</span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-800 text-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold">24/7</span>
                </div>
                <span className="font-bold">Customer Support</span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-800 text-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold">Kualitas Terjamin</span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-800 text-xl group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-white font-bold text-xl">⭐</span>
                </div>
                <span className="font-bold">Rating 4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;