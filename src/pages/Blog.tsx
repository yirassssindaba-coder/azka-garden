import React from 'react';
import { Calendar, User, ArrowRight, Leaf, Heart, Droplets, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  readTime: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Tips Merawat Jamani Dolar untuk Pemula',
      excerpt: 'Panduan lengkap merawat ZZ Plant yang sangat mudah untuk pemula. Tanaman yang tahan banting dan cocok untuk indoor.',
      content: '',
      author: 'Tim Azka Garden',
      publishedAt: '2024-01-15',
      category: 'Perawatan',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg',
      readTime: '5 menit'
    },
    {
      id: '2',
      title: 'Cara Membuat Media Tanam yang Tepat',
      excerpt: 'Resep media tanam terbaik untuk berbagai jenis tanaman hias. Tips dari pengalaman bertahun-tahun Azka Garden.',
      content: '',
      author: 'Pak Hendrik',
      publishedAt: '2024-01-12',
      category: 'Tutorial',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      readTime: '8 menit'
    },
    {
      id: '3',
      title: 'Monstera Deliciosa: Si Daun Berlubang yang Menawan',
      excerpt: 'Mengapa Monstera menjadi tanaman hias paling populer? Simak tips perawatan dan propagasi yang mudah.',
      content: '',
      author: 'Tim Azka Garden',
      publishedAt: '2024-01-10',
      category: 'Tanaman Populer',
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      readTime: '6 menit'
    },
    {
      id: '4',
      title: 'Bonsai Gestrum: Seni Tanaman Miniatur Berbunga',
      excerpt: 'Panduan lengkap merawat bonsai gestrum dengan bunga kuning harum. Teknik pembentukan dan perawatan intensif.',
      content: '',
      author: 'Master Bonsai Azka',
      publishedAt: '2024-01-08',
      category: 'Bonsai',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
      readTime: '12 menit'
    },
    {
      id: '5',
      title: 'Tanaman Indoor Terbaik untuk Apartemen',
      excerpt: 'Rekomendasi tanaman indoor yang cocok untuk ruang terbatas. Mudah perawatan dan mempercantik ruangan.',
      content: '',
      author: 'Tim Azka Garden',
      publishedAt: '2024-01-05',
      category: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
      readTime: '7 menit'
    },
    {
      id: '6',
      title: 'Pucuk Merah: Tanaman Pagar Hidup Terfavorit',
      excerpt: 'Mengapa pucuk merah menjadi pilihan utama untuk pagar hidup? Tips penanaman dan perawatan yang benar.',
      content: '',
      author: 'Pak Hendrik',
      publishedAt: '2024-01-03',
      category: 'Outdoor Plants',
      image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
      readTime: '5 menit'
    }
  ];

  const categories = ['Semua', 'Perawatan', 'Tutorial', 'Tanaman Populer', 'Bonsai', 'Indoor Plants', 'Outdoor Plants'];
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');

  const filteredPosts = selectedCategory === 'Semua' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Blog & Tips Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Panduan lengkap perawatan tanaman hias dari para ahli. Tips, trik, dan tutorial untuk semua pecinta tanaman.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{blogPosts[0].author}</span>
                    <Calendar className="h-4 w-4 ml-2" />
                    <span>{new Date(blogPosts[0].publishedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <Link
                    to={`/blog/${blogPosts[0].id}`}
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{post.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium"
                  >
                    Baca →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Tips Section */}
        <section className="mt-16 bg-green-50 dark:bg-green-900 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Tips Perawatan Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Penyiraman</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Cek kelembapan tanah dengan jari sebelum menyiram. Lebih baik kurang air daripada kebanyakan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pencahayaan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Sesuaikan dengan kebutuhan tanaman. Indoor plants umumnya suka cahaya tidak langsung.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pemupukan</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Gunakan pupuk sesuai jenis tanaman. Pupuk cair lebih mudah diserap untuk tanaman indoor.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;