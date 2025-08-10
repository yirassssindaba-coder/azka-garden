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
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between mobile-padding">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2 mobile-text-sm">Newsletter Azka Garden</h3>
              <p className="text-green-100 mobile-text-xs">
                Dapatkan tips perawatan tanaman dan penawaran khusus langsung di email Anda
              </p>
              {isSubscribed && (
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-200" />
                  <span className="text-green-200 text-sm">Anda sudah berlangganan - Akses produk premium tersedia!</span>
                </div>
              )}
            </div>
            {!isSubscribed && (
              <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nama (opsional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 md:w-40 px-3 py-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 mobile-form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 md:w-60 px-3 py-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 mobile-form-input"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-800 hover:bg-green-900 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 mobile-btn"
                >
                  {isSubmitting ? 'Memproses...' : 'Berlangganan & Akses Premium'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">Azka Garden</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              Toko tanaman hias online terpercaya dengan koleksi lengkap 59+ varietas premium. 
              Dari Jamani Dolar hingga Bonsai eksklusif untuk semua pecinta tanaman di Indonesia.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.tokopedia.com/hendrikfloris" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-2 rounded-full transition-colors"
                title="Tokopedia Hendrik Floris"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/6289635086182" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-2 rounded-full transition-colors"
                title="WhatsApp Azka Garden"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tentang Azka Garden
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ & Bantuan
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-green-400 transition-colors">
                  Informasi Pengiriman
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-green-400 transition-colors">
                  Kebijakan Pengembalian
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-gray-300 hover:text-green-400 transition-colors">
                  Panduan Perawatan Tanaman
                </Link>
              </li>
              <li>
                <Link to="/stripe-products" className="text-gray-300 hover:text-green-400 transition-colors">
                  Koleksi Premium
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-green-400 transition-colors">
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-green-400 transition-colors">
                  Karir
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori Populer</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=6" className="text-gray-300 hover:text-green-400 transition-colors">
                  🪨 Batu Taman
                </Link>
              </li>
              <li>
                <Link to="/products?category=7" className="text-gray-300 hover:text-green-400 transition-colors">
                  🌱 Media Tanah
                </Link>
              </li>
              <li>
                <Link to="/products?category=1" className="text-gray-300 hover:text-green-400 transition-colors">
                  🌿 Tanaman Hias
                </Link>
              </li>
              <li>
                <Link to="/products?category=6" className="text-gray-300 hover:text-green-400 transition-colors">
                  🏺 Pot & Aksesoris
                </Link>
              </li>
              <li>
                <Link to="/products?category=4" className="text-gray-300 hover:text-green-400 transition-colors">
                  🌳 Bonsai Premium
                </Link>
              </li>
              <li>
                <Link to="/products?category=5" className="text-gray-300 hover:text-green-400 transition-colors">
                  🌸 Tanaman Berbunga
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Jl. Raya KSU, Tirtajaya<br />
                    Kec. Sukmajaya, Kota Depok<br />
                    Jawa Barat 16412, Indonesia
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm mt-1 inline-flex items-center"
                  >
                    Lihat di Google Maps
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">0896-3508-6182</p>
                  <p className="text-sm text-gray-400">WhatsApp & Telepon</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@azkagarden.com</p>
                  <p className="text-sm text-gray-400">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Buka 24 Jam Setiap Hari<br />
                    Konsultasi & Pemesanan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Azka Garden - Toko Bunga Hendrik. Semua hak dilindungi undang-undang.
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-green-400 transition-colors">
                Kebijakan Cookie
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-green-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap items-center justify-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SSL</span>
                </div>
                <span>Transaksi Aman</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">24/7</span>
                </div>
                <span>Customer Support</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <span>Kualitas Terjamin</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">⭐</span>
                </div>
                <span>Rating 4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;