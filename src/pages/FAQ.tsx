import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Leaf } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Bagaimana cara memesan tanaman di Azka Garden?",
      answer: "Anda bisa memesan melalui website ini, WhatsApp di 0896-3508-6182, atau datang langsung ke toko kami di Jl. Raya KSU, Depok. Kami buka 24 jam setiap hari untuk melayani konsultasi dan pemesanan.",
      category: "pemesanan"
    },
    {
      id: 2,
      question: "Apakah tanaman dijamin hidup saat sampai?",
      answer: "Ya, kami memberikan garansi tanaman hidup. Jika tanaman mati dalam 24 jam setelah diterima karena kondisi pengiriman, kami akan mengganti dengan tanaman baru atau refund penuh.",
      category: "garansi"
    },
    {
      id: 3,
      question: "Bagaimana cara merawat Jamani Dolar (ZZ Plant)?",
      answer: "Jamani Dolar sangat mudah dirawat. Letakkan di tempat dengan cahaya rendah hingga sedang, siram 2-3 minggu sekali atau ketika tanah benar-benar kering. Hindari overwatering karena bisa menyebabkan akar busuk.",
      category: "perawatan"
    },
    {
      id: 4,
      question: "Berapa ongkos kirim untuk tanaman?",
      answer: "Ongkos kirim bervariasi tergantung lokasi dan ukuran tanaman. Untuk area Depok dan sekitarnya mulai dari Rp15.000. Kami menggunakan packaging khusus untuk memastikan tanaman aman selama perjalanan.",
      category: "pengiriman"
    },
    {
      id: 5,
      question: "Apakah tersedia jasa pembuatan taman?",
      answer: "Ya, kami menyediakan jasa pembuatan taman, renovasi taman, dan pembuatan kolam ikan. Tim kami berpengalaman dalam landscape design dan akan memberikan konsultasi gratis untuk proyek Anda.",
      category: "jasa"
    },
    {
      id: 6,
      question: "Bagaimana cara merawat tanaman indoor untuk pemula?",
      answer: "Untuk pemula, kami rekomendasikan tanaman seperti Lidah Mertua, Jamani Dolar, atau Pothos. Kunci utama: jangan terlalu sering menyiram, letakkan di tempat dengan cahaya tidak langsung, dan gunakan pot dengan drainase yang baik.",
      category: "perawatan"
    },
    {
      id: 7,
      question: "Apakah bisa custom pot atau media tanam?",
      answer: "Ya, kami menyediakan berbagai ukuran pot dari diameter 15cm hingga 40cm dalam berbagai warna. Media tanam juga bisa disesuaikan dengan kebutuhan tanaman spesifik Anda.",
      category: "produk"
    },
    {
      id: 8,
      question: "Bagaimana cara bergabung dengan komunitas Azka Garden?",
      answer: "Anda bisa subscribe YouTube channel 'Azka Garden Indonesia', follow Instagram @azka_garden, atau join grup WhatsApp komunitas. Kami rutin berbagi tips dan mengadakan diskusi tentang perawatan tanaman.",
      category: "komunitas"
    },
    {
      id: 9,
      question: "Apakah ada diskon untuk pembelian dalam jumlah banyak?",
      answer: "Ya, kami memberikan diskon khusus untuk pembelian grosir atau proyek landscape. Hubungi kami via WhatsApp untuk mendapatkan penawaran terbaik sesuai kebutuhan Anda.",
      category: "harga"
    },
    {
      id: 10,
      question: "Bagaimana cara merawat bonsai untuk pemula?",
      answer: "Bonsai membutuhkan perawatan khusus: siram setiap hari dengan sedikit air, letakkan di tempat dengan cahaya cukup, pangkas rutin untuk menjaga bentuk, dan gunakan pupuk khusus bonsai sebulan sekali.",
      category: "perawatan"
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'pemesanan', label: 'Pemesanan' },
    { value: 'perawatan', label: 'Perawatan Tanaman' },
    { value: 'pengiriman', label: 'Pengiriman' },
    { value: 'garansi', label: 'Garansi' },
    { value: 'jasa', label: 'Jasa Taman' },
    { value: 'produk', label: 'Produk' },
    { value: 'harga', label: 'Harga' },
    { value: 'komunitas', label: 'Komunitas' }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">FAQ & Bantuan</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang tanaman hias dan layanan kami
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {item.question}
                </h3>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tidak Ada Hasil Ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah kata kunci pencarian atau kategori yang dipilih
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-green-50 dark:bg-green-900 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tidak Menemukan Jawaban yang Anda Cari?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tim ahli kami siap membantu Anda dengan konsultasi gratis melalui WhatsApp
          </p>
          <a
            href="https://wa.me/6289635086182"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;