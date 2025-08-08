import React, { useState } from 'react';
import { Leaf, Droplets, Sun, Scissors, Heart, Search, Filter } from 'lucide-react';

interface CareGuide {
  id: number;
  title: string;
  category: string;
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Sedang' | 'Sulit';
  content: string;
  tips: string[];
  watering: string;
  light: string;
  fertilizer: string;
}

const CareGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const careGuides: CareGuide[] = [
    {
      id: 1,
      title: "Jamani Dolar (ZZ Plant)",
      category: "indoor",
      difficulty: "Sangat Mudah",
      content: "Zamioculcas zamiifolia adalah tanaman indoor yang sangat toleran dan mudah dirawat. Cocok untuk pemula yang baru memulai hobi tanaman hias.",
      tips: [
        "Letakkan di tempat dengan cahaya rendah hingga sedang",
        "Hindari overwatering - ini adalah kesalahan paling umum",
        "Bersihkan daun secara berkala dengan kain lembap",
        "Repotting dilakukan 2-3 tahun sekali"
      ],
      watering: "2-3 minggu sekali, ketika tanah benar-benar kering",
      light: "Cahaya rendah hingga sedang, tidak langsung",
      fertilizer: "Pupuk cair sebulan sekali di musim tumbuh"
    },
    {
      id: 2,
      title: "Monstera Deliciosa",
      category: "indoor",
      difficulty: "Mudah",
      content: "Tanaman hias populer dengan daun berlubang yang unik. Tumbuh merambat dan membutuhkan support untuk pertumbuhan optimal.",
      tips: [
        "Berikan tiang moss atau support untuk merambat",
        "Bersihkan daun besar secara rutin",
        "Pangkas akar udara yang terlalu panjang",
        "Rotasi pot seminggu sekali untuk pertumbuhan merata"
      ],
      watering: "1-2 kali seminggu, cek kelembapan tanah dengan jari",
      light: "Cahaya terang tidak langsung",
      fertilizer: "Pupuk NPK cair 2 minggu sekali"
    },
    {
      id: 3,
      title: "Lidah Mertua (Sansevieria)",
      category: "indoor",
      difficulty: "Sangat Mudah",
      content: "Tanaman yang sangat tahan banting dan bisa bertahan dalam kondisi minim perawatan. Ideal untuk ruangan dengan cahaya rendah.",
      tips: [
        "Jangan terlalu sering menyiram",
        "Bisa bertahan tanpa air hingga 1 bulan",
        "Cocok untuk kamar tidur karena menghasilkan oksigen di malam hari",
        "Propagasi mudah dengan memotong rhizome"
      ],
      watering: "2-4 minggu sekali, sangat jarang",
      light: "Toleran semua kondisi cahaya",
      fertilizer: "Pupuk minimal, 2-3 bulan sekali"
    },
    {
      id: 4,
      title: "Bonsai Gestrum",
      category: "bonsai",
      difficulty: "Sulit",
      content: "Bonsai dengan bunga kuning harum yang memerlukan perawatan intensif dan teknik pembentukan khusus.",
      tips: [
        "Siram setiap hari dengan air sedikit",
        "Pangkas rutin untuk menjaga bentuk",
        "Gunakan kawat untuk membentuk cabang",
        "Repotting setiap 2 tahun dengan media khusus bonsai"
      ],
      watering: "Setiap hari, pagi dan sore",
      light: "Cahaya matahari pagi, teduh siang",
      fertilizer: "Pupuk bonsai khusus setiap 2 minggu"
    },
    {
      id: 5,
      title: "Pucuk Merah",
      category: "outdoor",
      difficulty: "Mudah",
      content: "Tanaman pagar hidup populer dengan daun muda berwarna merah menyala. Tumbuh cepat dan mudah dibentuk.",
      tips: [
        "Pangkas rutin untuk menjaga bentuk pagar",
        "Berikan pupuk NPK untuk warna daun optimal",
        "Siram lebih sering di musim kemarau",
        "Cocok untuk pagar hidup atau tanaman hias taman"
      ],
      watering: "2-3 kali seminggu, lebih sering di musim kering",
      light: "Cahaya matahari penuh hingga sebagian",
      fertilizer: "Pupuk NPK sebulan sekali"
    },
    {
      id: 6,
      title: "Kuping Gajah (Anthurium)",
      category: "indoor",
      difficulty: "Sedang",
      content: "Anthurium dengan daun besar berbentuk hati dan urat putih mencolok. Memerlukan kelembapan tinggi untuk pertumbuhan optimal.",
      tips: [
        "Jaga kelembapan udara di atas 60%",
        "Semprot daun secara teratur",
        "Gunakan media tanam yang porous",
        "Hindari air yang menggenang di pot"
      ],
      watering: "2-3 kali seminggu, jaga kelembapan tanah",
      light: "Cahaya terang tidak langsung",
      fertilizer: "Pupuk cair khusus anthurium 2 minggu sekali"
    },
    {
      id: 7,
      title: "Kaktus & Sukulen",
      category: "succulent",
      difficulty: "Mudah",
      content: "Tanaman tahan kekeringan yang memerlukan sedikit air dan banyak cahaya. Cocok untuk iklim tropis Indonesia.",
      tips: [
        "Pastikan pot memiliki drainase yang sangat baik",
        "Gunakan media tanam khusus kaktus",
        "Jangan menyiram saat musim hujan",
        "Letakkan di tempat dengan sirkulasi udara baik"
      ],
      watering: "1-2 minggu sekali di musim kering, stop saat hujan",
      light: "Cahaya matahari langsung minimal 6 jam",
      fertilizer: "Pupuk khusus kaktus 2-3 bulan sekali"
    },
    {
      id: 8,
      title: "Tanaman Berbunga (Alamanda, Gestrum)",
      category: "flowering",
      difficulty: "Sedang",
      content: "Tanaman berbunga memerlukan perawatan khusus untuk menghasilkan bunga yang optimal dan tahan lama.",
      tips: [
        "Deadhead bunga layu untuk merangsang bunga baru",
        "Berikan pupuk tinggi fosfor untuk pembungaan",
        "Pangkas cabang yang tidak produktif",
        "Jaga kelembapan tanah tetapi tidak tergenang"
      ],
      watering: "2-3 kali seminggu, lebih sering saat berbunga",
      light: "Cahaya matahari penuh untuk bunga optimal",
      fertilizer: "Pupuk NPK + fosfor tinggi setiap 2 minggu"
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'indoor', label: 'Tanaman Indoor' },
    { value: 'outdoor', label: 'Tanaman Outdoor' },
    { value: 'bonsai', label: 'Bonsai' },
    { value: 'succulent', label: 'Sukulen & Kaktus' },
    { value: 'flowering', label: 'Tanaman Berbunga' }
  ];

  const difficulties = [
    { value: 'all', label: 'Semua Level' },
    { value: 'Sangat Mudah', label: 'Sangat Mudah' },
    { value: 'Mudah', label: 'Mudah' },
    { value: 'Sedang', label: 'Sedang' },
    { value: 'Sulit', label: 'Sulit' }
  ];

  const filteredGuides = careGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Sangat Mudah': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Mudah': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Sedang': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Sulit': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Panduan Perawatan Tanaman</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Tips dan trik lengkap untuk merawat tanaman hias agar tumbuh sehat dan indah
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari panduan perawatan tanaman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tingkat Kesulitan</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Care Guides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{guide.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                  {guide.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {guide.content}
              </p>
              
              {/* Care Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Penyiraman</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{guide.watering}</p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Sun className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Cahaya</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{guide.light}</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Leaf className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Pupuk</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{guide.fertilizer}</p>
                </div>
              </div>
              
              {/* Tips */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Heart className="h-4 w-4 text-green-600 mr-2" />
                  Tips Perawatan
                </h4>
                <ul className="space-y-2">
                  {guide.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tidak Ada Panduan Ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Coba ubah kata kunci pencarian atau filter yang dipilih
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* General Tips */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tips Umum Perawatan Tanaman</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <Droplets className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Penyiraman</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Cek kelembapan tanah dengan jari sebelum menyiram. Lebih baik kurang air daripada kebanyakan.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <Sun className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pencahayaan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sesuaikan dengan kebutuhan tanaman. Indoor plants umumnya suka cahaya tidak langsung.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <Leaf className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pemupukan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Gunakan pupuk sesuai jenis tanaman. Pupuk cair lebih mudah diserap untuk tanaman indoor.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
              <Scissors className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pemangkasan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Pangkas daun kuning atau mati secara rutin untuk menjaga kesehatan tanaman.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareGuide;