import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Dapatkan Tips Perawatan Tanaman</h3>
              <p className="text-green-100">
                Berlangganan newsletter kami untuk mendapatkan tips perawatan tanaman dan penawaran khusus
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 md:w-80 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-green-800 hover:bg-green-900 px-6 py-3 rounded-r-lg font-semibold transition-colors">
                Berlangganan
              </button>
            </div>
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
            <p className="text-gray-300 mb-6 leading-relaxed">
              Toko tanaman hias online terpercaya dengan koleksi lengkap dan kualitas terbaik. 
              Kami berkomitmen untuk membantu Anda menciptakan ruang hijau yang indah.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/azkagarden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/azkagarden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-600 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/azkagarden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com/azkagarden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-green-600 p-2 rounded-full transition-colors"
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
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-green-400 transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-green-400 transition-colors">
                  FAQ
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
                  Panduan Perawatan
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori Populer</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=indoor" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tanaman Indoor
                </Link>
              </li>
              <li>
                <Link to="/products?category=outdoor" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tanaman Outdoor
                </Link>
              </li>
              <li>
                <Link to="/products?category=succulent" className="text-gray-300 hover:text-green-400 transition-colors">
                  Sukulen
                </Link>
              </li>
              <li>
                <Link to="/products?category=flowering" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tanaman Berbunga
                </Link>
              </li>
              <li>
                <Link to="/products?category=herbs" className="text-gray-300 hover:text-green-400 transition-colors">
                  Tanaman Herbal
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-green-400 transition-colors">
                  Aksesoris & Pupuk
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
                    Jl. Raya Tanaman Hias No. 123<br />
                    Jakarta Selatan 12345<br />
                    Indonesia
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+62 812-3456-7890</p>
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
                    Senin - Sabtu: 08:00 - 17:00 WIB<br />
                    Minggu: 09:00 - 15:00 WIB
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
              © {currentYear} Azka Garden. Semua hak dilindungi undang-undang.
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
                <span>Rating 4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;