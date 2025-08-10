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
    <footer className="bg-green-50 text-gray-900 border-t-4 border-green-500">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between mobile-padding">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg mobile-text-sm">Newsletter Azka Garden</h3>
              <p className="text-green-50 text-lg leading-relaxed mobile-text-xs">
                Dapatkan tips perawatan tanaman dan penawaran khusus langsung di email Anda
              </p>
              {isSubscribed && (
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span className="text-white font-medium text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    ✅ Berlangganan Aktif - Akses Premium Tersedia!
                  </span>
                </div>
              )}
            </div>
            {!isSubscribed && (
              <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Nama (opsional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 md:w-40 px-4 py-3 rounded-lg text-gray-900 bg-white border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-lg mobile-form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 md:w-60 px-4 py-3 rounded-lg text-gray-900 bg-white border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-lg mobile-form-input"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-green-600 hover:bg-green-50 px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 mobile-btn shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? 'Memproses...' : '🌟 Berlangganan & Akses Premium'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-10 w-10 text-green-400" />
              <span className="text-3xl font-bold text-gray-900">Azka Garden</span>
            </div>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Toko tanaman hias online terpercaya dengan koleksi lengkap 59+ varietas premium. 
              Dari Jamani Dolar hingga Bonsai eksklusif untuk semua pecinta tanaman di Indonesia.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.tokopedia.com/hendrikfloris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-200 hover:bg-green-300 p-3 rounded-full transition-all duration-300 hover:scale-110"
                title="Tokopedia Hendrik Floris"
              >
                <ExternalLink className="h-5 w-5 text-green-800" />
              </a>
              <a 
                href="https://wa.me/6289635086182" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-200 hover:bg-green-300 p-3 rounded-full transition-all duration-300 hover:scale-110"
                title="WhatsApp Azka Garden"
              >
                <MessageCircle className="h-5 w-5 text-green-800" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Tentang Azka Garden
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  FAQ & Bantuan
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Informasi Pengiriman
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Kebijakan Pengembalian
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Panduan Perawatan Tanaman
                </Link>
              </li>
              <li>
                <Link to="/stripe-products" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Koleksi Premium
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline">
                  Karir
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Kategori Populer</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=6" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🪨</span>
                  <span>Batu Taman</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=7" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🌱</span>
                  <span>Media Tanah</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=1" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🌿</span>
                  <span>Tanaman Hias</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=6" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🏺</span>
                  <span>Pot & Aksesoris</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=4" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🌳</span>
                  <span>Bonsai Premium</span>
                </Link>
              </li>
              <li>
                <Link to="/products?category=5" className="text-gray-700 hover:text-green-700 transition-colors text-lg hover:underline flex items-center space-x-2">
                  <span>🌸</span>
                  <span>Tanaman Berbunga</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Jl. Raya KSU, Tirtajaya<br />
                    Kec. Sukmajaya, Kota Depok<br />
                    Jawa Barat 16412, Indonesia
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm mt-2 inline-flex items-center font-medium hover:underline"
                  >
                    📍 Lihat di Google Maps
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-lg font-semibold">0896-3508-6182</p>
                  <p className="text-green-700 text-sm">WhatsApp & Telepon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-lg">info@azkagarden.com</p>
                  <p className="text-green-700 text-sm">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-lg font-semibold">
                    Buka 24 Jam Setiap Hari
                  </p>
                  <p className="text-green-700 text-sm">Konsultasi & Pemesanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-200 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-700 text-lg mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} <span className="font-bold text-gray-900">Azka Garden</span> - Toko Bunga Hendrik. 
              <br className="md:hidden" />
              <span className="text-green-700">Semua hak dilindungi undang-undang.</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-700 hover:text-green-700 transition-colors hover:underline">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-gray-700 hover:text-green-700 transition-colors hover:underline">
                Syarat & Ketentuan
              </Link>
              <Link to="/cookies" className="text-gray-700 hover:text-green-700 transition-colors hover:underline">
                Kebijakan Cookie
              </Link>
              <Link to="/sitemap" className="text-gray-700 hover:text-green-700 transition-colors hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-green-200">
            <div className="flex flex-wrap items-center justify-center space-x-8 gap-4">
              <div className="flex items-center space-x-3 text-gray-700 text-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">SSL</span>
                </div>
                <span className="font-medium">Transaksi Aman</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700 text-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">24/7</span>
                </div>
                <span className="font-medium">Customer Support</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700 text-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Kualitas Terjamin</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700 text-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">⭐</span>
                </div>
                <span className="font-medium">Rating 4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;