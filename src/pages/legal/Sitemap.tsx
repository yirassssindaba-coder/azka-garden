import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Home, Package, Users, MessageCircle, FileText, Shield, Code } from 'lucide-react';

const Sitemap: React.FC = () => {
  const siteStructure = [
    {
      category: 'Halaman Utama',
      icon: Home,
      pages: [
        { name: 'Beranda', path: '/', description: 'Halaman utama Azka Garden' },
        { name: 'Tentang Kami', path: '/about', description: 'Informasi tentang Azka Garden' },
        { name: 'Kontak', path: '/contact', description: 'Hubungi kami' },
        { name: 'FAQ', path: '/faq', description: 'Pertanyaan yang sering diajukan' }
      ]
    },
    {
      category: 'Produk & Layanan',
      icon: Package,
      pages: [
        { name: 'Katalog Produk', path: '/products', description: 'Semua tanaman hias' },
        { name: 'Koleksi Premium', path: '/stripe-products', description: 'Tanaman premium dan berlangganan' },
        { name: 'Panduan Perawatan', path: '/care-guide', description: 'Tips merawat tanaman' },
        { name: 'Blog & Tips', path: '/blog', description: 'Artikel dan tutorial' }
      ]
    },
    {
      category: 'Akun & Transaksi',
      icon: Users,
      pages: [
        { name: 'Login', path: '/login', description: 'Masuk ke akun' },
        { name: 'Registrasi', path: '/register', description: 'Buat akun baru' },
        { name: 'Profil', path: '/profile', description: 'Kelola profil Anda' },
        { name: 'Pesanan', path: '/orders', description: 'Riwayat pesanan' },
        { name: 'Keranjang', path: '/cart', description: 'Keranjang belanja' },
        { name: 'Wishlist', path: '/wishlist', description: 'Daftar keinginan' }
      ]
    },
    {
      category: 'Komunikasi',
      icon: MessageCircle,
      pages: [
        { name: 'Chat Global', path: '/global-chat', description: 'Percakapan dengan komunitas' },
        { name: 'Ulasan & Komentar', path: '/reviews', description: 'Ulasan produk dan layanan' },
        { name: 'Customer Service', path: '/customer-service', description: 'Bantuan pelanggan' }
      ]
    },
    {
      category: 'Portal Khusus',
      icon: Shield,
      pages: [
        { name: 'Portal Administrator', path: '/admin/login', description: 'Akses untuk admin' },
        { name: 'Portal Pengembang', path: '/developer/login', description: 'Akses untuk developer' }
      ]
    },
    {
      category: 'Informasi Legal',
      icon: FileText,
      pages: [
        { name: 'Kebijakan Privasi', path: '/privacy', description: 'Perlindungan data pribadi' },
        { name: 'Syarat & Ketentuan', path: '/terms', description: 'Ketentuan penggunaan' },
        { name: 'Kebijakan Cookie', path: '/cookies', description: 'Penggunaan cookie' },
        { name: 'Kebijakan Pengembalian', path: '/returns', description: 'Garansi dan retur' },
        { name: 'Informasi Pengiriman', path: '/shipping', description: 'Panduan pengiriman' }
      ]
    },
    {
      category: 'Lainnya',
      icon: Code,
      pages: [
        { name: 'Karir', path: '/careers', description: 'Lowongan kerja' },
        { name: 'Pencarian', path: '/search', description: 'Hasil pencarian' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Map className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Sitemap</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Peta lengkap semua halaman dan fitur di website Azka Garden
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-3">
                  <section.icon className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.category}</h2>
              </div>
              
              <div className="space-y-3">
                {section.pages.map((page, pageIndex) => (
                  <Link
                    key={pageIndex}
                    to={page.path}
                    className="block p-3 rounded-lg hover:bg-green-50 transition-colors border border-gray-100 hover:border-green-200"
                  >
                    <div className="font-medium text-gray-900 hover:text-green-600">
                      {page.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {page.description}
                    </div>
                    <div className="text-xs text-green-600 mt-1 font-mono">
                      {page.path}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-green-50 rounded-xl p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">59+ Produk</h3>
              <p className="text-gray-600 text-sm">Koleksi lengkap tanaman hias berkualitas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Chat Global</h3>
              <p className="text-gray-600 text-sm">Komunikasi real-time dengan komunitas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Portal Khusus</h3>
              <p className="text-gray-600 text-sm">Akses admin dan developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;