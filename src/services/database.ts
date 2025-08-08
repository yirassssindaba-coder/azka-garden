// Complete database service with all plants from the provided list
import { Plant, Category } from '../types';

// Enhanced categories including accessories
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Tanaman Indoor',
    description: 'Tanaman hias yang cocok untuk dalam ruangan dengan cahaya rendah hingga sedang',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Tanaman Outdoor',
    description: 'Tanaman hias untuk taman dan halaman dengan cahaya matahari penuh',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sukulen & Kaktus',
    description: 'Tanaman sukulen dan kaktus yang tahan kekeringan dan mudah perawatan',
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Bonsai',
    description: 'Koleksi bonsai eksklusif untuk penggemar seni tanaman miniatur',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Tanaman Berbunga',
    description: 'Tanaman hias dengan bunga cantik untuk mempercantik taman',
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Pot & Aksesoris',
    description: 'Pot tanaman dan aksesoris pendukung untuk tanaman hias',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Media Tanam',
    description: 'Media tanam berkualitas tinggi untuk pertumbuhan optimal',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Complete plant catalog based on the provided list
const mockPlants: Plant[] = [
  // Tanaman Indoor Premium
  {
    id: '1',
    name: 'Jamani Dolar (ZZ Plant)',
    description: 'Zamioculcas zamiifolia - Tanaman perennial tropis dari Afrika Timur dengan daun mengkilap hijau pekat. Sangat toleran cahaya rendah dan tahan kekeringan, perfect untuk pemula.',
    price: 70000,
    image: '/images/plants/jamani-dolar.jpg', // Gambar yang Anda upload
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya rendah hingga sedang. Siram ketika tanah benar-benar kering. Hindari overwatering.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Dragon Sekel/Tengkorak',
    description: 'Alocasia baginda Dragon Scale - Varietas eksotis dengan motif daun menyerupai sisik naga. Daun hijau zamrud dengan urat perak metalik yang mencolok.',
    price: 125000,
    image: '/images/plants/dragon-sekel.jpg', // Gambar yang Anda upload
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Sedang',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi dan cahaya tidak langsung. Jaga kelembapan tanah tetapi tidak tergenang.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Pakis Kuning',
    description: 'Nephrolepis exaltata Golden - Pakis hias dengan daun muda kuning cerah yang berubah hijau saat dewasa. Memberikan sentuhan segar alami.',
    price: 25000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-40 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka tempat teduh dengan kelembapan tinggi. Semprot daun secara teratur.',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Kuping Gajah',
    description: 'Anthurium crystallinum - Anthurium dengan daun besar berbentuk hati dan urat putih mencolok. Sangat elegan untuk dekorasi interior.',
    price: 75000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-70 cm',
    care_level: 'Sedang',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Butuh kelembapan tinggi dan cahaya tidak langsung. Jaga drainase yang baik.',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Cemara Ekor Tupai',
    description: 'Asparagus densiflorus - Tanaman hijau abadi dengan daun menyerupai ekor tupai. Sangat cocok untuk interior dengan toleransi cahaya rendah.',
    price: 40000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '25-35 cm',
    care_level: 'Mudah',
    watering_frequency: '1 kali seminggu',
    care_instructions: 'Toleran terhadap cahaya rendah. Siram ketika tanah mulai kering.',
    stock: 20,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Berbunga
  {
    id: '6',
    name: 'Puting Cabe',
    description: 'Euphorbia milii - Tanaman berbunga dengan duri tajam dan bunga kecil cerah. Tahan kekeringan dan mudah berbunga.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '20-30 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat terang. Siram sedikit dan jarang. Hati-hati dengan duri.',
    stock: 40,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Gestrum Kuning',
    description: 'Gestrum coromandelianum - Tanaman tropis dengan bunga kuning cerah dan daun hijau lebat. Tahan berbagai kondisi cuaca.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan berikan pupuk bulanan.',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Alamanda Kuning',
    description: 'Allamanda cathartica - Tanaman berbunga terompet emas kuning cerah diameter 5-7.5 cm. Populer untuk taman dan pagar hidup.',
    price: 75000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '60-120 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh. Siram teratur dan pangkas untuk bentuk yang bagus.',
    stock: 10,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    name: 'Teratai',
    description: 'Nymphaea - Tanaman air dengan bunga besar indah yang mengapung. Warna bervariasi dari putih, merah muda hingga ungu.',
    price: 75000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '10-20 cm (mengapung)',
    care_level: 'Sedang',
    watering_frequency: 'Selalu dalam air',
    care_instructions: 'Butuh kolam atau wadah air besar. Letakkan di tempat dengan cahaya matahari penuh.',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    name: 'Kamboja Jepang',
    description: 'Plumeria - Tanaman berbunga cantik dan harum yang sering digunakan sebagai tanaman pekarangan di daerah tropis.',
    price: 50000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '80-150 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur di musim tumbuh, kurangi di musim kering.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Outdoor & Cemara
  {
    id: '11',
    name: 'Cemara Perak',
    description: 'Juniperus chinensis - Tanaman konifer hijau kekuningan berbentuk rimbun menyerupai pohon cemara mini. Cocok untuk taman dan indoor.',
    price: 50000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh hingga sebagian. Siram teratur dan pangkas untuk bentuk.',
    stock: 22,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    name: 'Bringin Korea Tinggi 2M',
    description: 'Ficus microcarpa - Tanaman hias premium dengan tinggi 2 meter, batang kokoh dan daun hijau mengkilap. Memberikan suasana alami dan sejuk.',
    price: 2000000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '200 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Adaptif dengan berbagai kondisi cahaya. Siram teratur dan pangkas sesuai kebutuhan.',
    stock: 3,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '13',
    name: 'Cemara Tretes',
    description: 'Cemara mini tinggi 120 cm yang memberikan kesan asri dan elegan, sangat cocok untuk taman dan penghias ruang luar.',
    price: 250000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '120 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan berikan pupuk sebulan sekali.',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '14',
    name: 'Pucuk Merah Tinggi 250cm',
    description: 'Tanaman pucuk merah tinggi yang sering digunakan sebagai pagar hidup atau dekorasi taman, memberikan warna cerah yang menarik.',
    price: 350000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '250 cm',
    care_level: 'Mudah',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan pangkas untuk menjaga bentuk.',
    stock: 5,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Sukulen & Kaktus
  {
    id: '15',
    name: 'Siklok (Agave)',
    description: 'Agave attenuata - Sukulen asal Meksiko dengan daun panjang runcing hijau keabu-abuan dengan pinggiran putih. Tahan panas dan kekeringan.',
    price: 70000,
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '40-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '3-4 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya matahari penuh. Siram sangat jarang, pastikan drainase baik.',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '16',
    name: 'Kaktus Koboy Tinggi 70cm',
    description: 'Kaktus besar berbentuk unik yang tahan kering dan mudah dirawat, sangat cocok untuk dekorasi rumah dengan gaya modern.',
    price: 150000,
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '70 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '1 bulan sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya matahari langsung. Siram sangat jarang, hanya saat tanah benar-benar kering.',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Koleksi Bonsai Premium
  {
    id: '17',
    name: 'Bonsai Gestrum Ukuran L',
    description: 'Bonsai besar dengan daun Gestrum yang indah, cocok untuk koleksi eksklusif dengan perawatan khusus. Masterpiece untuk kolektor.',
    price: 1200000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '4',
    category: 'Bonsai',
    height: '40-50 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Butuh perawatan harian. Siram pagi dan sore, pangkas teratur, pupuk khusus bonsai.',
    stock: 2,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '18',
    name: 'Bonsai Gestrum Ukuran M',
    description: 'Bonsai berukuran sedang dengan daun Gestrum yang cantik, memberikan kesan elegan di rumah atau kantor.',
    price: 500000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '4',
    category: 'Bonsai',
    height: '30-40 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Perawatan harian diperlukan. Siram teratur, pangkas, dan berikan pupuk bonsai.',
    stock: 4,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '19',
    name: 'Bonsai Cemara Udang',
    description: 'Bonsai cemara unik yang menyerupai udang, merupakan tanaman koleksi menarik dengan perawatan khusus untuk penggemar bonsai.',
    price: 650000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '4',
    category: 'Bonsai',
    height: '25-35 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Butuh perhatian khusus. Siram harian, pangkas rutin, pupuk bonsai khusus.',
    stock: 3,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '20',
    name: 'Bringin Korea Micro',
    description: 'Varian kecil dari Bringin Korea yang cocok untuk koleksi bonsai dengan bentuk daun menarik dan perawatan mudah.',
    price: 1500000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '4',
    category: 'Bonsai',
    height: '20-30 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Koleksi premium. Siram harian, cahaya tidak langsung, pupuk bonsai berkualitas.',
    stock: 1,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Eksotis & Langka
  {
    id: '21',
    name: 'Jamani Cobra',
    description: 'Tanaman hias eksotis dengan bentuk unik dan sangat langka, cocok untuk koleksi tanaman premium dengan harga tinggi.',
    price: 300000,
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '50-80 cm',
    care_level: 'Sulit',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Tanaman langka butuh perawatan khusus. Kelembapan tinggi, cahaya tidak langsung.',
    stock: 3,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22',
    name: 'Sikas Tinggi 70cm',
    description: 'Tanaman sikas berukuran besar yang cocok sebagai tanaman hias eksklusif dengan perawatan khusus untuk kolektor tanaman.',
    price: 1700000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '70 cm',
    care_level: 'Sulit',
    watering_frequency: '1 kali seminggu',
    care_instructions: 'Tanaman premium. Butuh cahaya terang, drainase sempurna, pupuk khusus.',
    stock: 2,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '23',
    name: 'Pandan Bali',
    description: 'Tanaman pandan beraroma khas yang digunakan sebagai tanaman hias dan bumbu dapur di daerah tropis.',
    price: 150000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan berikan pupuk organik.',
    stock: 10,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Populer & Mudah Perawatan
  {
    id: '24',
    name: 'Lidah Mertua',
    description: 'Sansevieria - Tanaman hias indoor dengan daun panjang tajam yang mudah dirawat dan sesuai untuk dekorasi meja atau rak tanaman.',
    price: 25000,
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Sangat toleran. Letakkan di tempat dengan cahaya sedang, siram jarang.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '25',
    name: 'Brokoli Hijau',
    description: 'Tanaman hias dengan daun hijau segar yang menyerupai sayur brokoli. Unik untuk menambah sentuhan alami pada taman.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '20-30 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya sedang. Siram ketika tanah mulai kering.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '26',
    name: 'Sampang Dara',
    description: 'Excoecaria cochinchinensis - Perdu tropis dengan daun hijau cerah di atas dan merah gelap di bawah. Tampilan eksotis untuk taman.',
    price: 16000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Hati-hati dengan getah yang beracun. Gunakan sarung tangan saat merawat.',
    stock: 20,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '27',
    name: 'Kana',
    description: 'Canna indica - Tanaman tropis dengan daun lebar hijau cerah dan bunga besar berwarna merah, kuning, atau oranye yang mencolok.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '100-200 cm',
    care_level: 'Mudah',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh dan tanah lembap. Berikan pupuk teratur.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Hias Daun
  {
    id: '28',
    name: 'Airis Brazil',
    description: 'Iris variegata - Tanaman hias outdoor dengan daun panjang hijau cerah bergaris putih yang memberikan tampilan segar dan menarik.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '40-60 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari sebagian. Siram teratur dan jaga kelembapan tanah.',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '29',
    name: 'Maranti Bali',
    description: 'Stromanthe sanguinea - Tanaman hias tropis dari Brasil dengan daun berwarna-warni merah, hijau, dan putih yang mencolok.',
    price: 15000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi dan cahaya tidak langsung. Semprot daun secara teratur.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '30',
    name: 'Kadaka Tanduk',
    description: 'Platycerium - Tanaman paku-pakuan epifit yang biasanya hidup menempel, dapat ditanam dalam pot dan cocok untuk daerah lembap.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '25-40 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi. Semprot daun dan jaga media tetap lembap.',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '31',
    name: 'Jayen',
    description: 'Episcia - Tanaman hias indoor dengan daun berbentuk hati dan bunga kecil berwarna cerah, cocok untuk dekorasi meja atau rak tanaman.',
    price: 80000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '15-25 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi dan cahaya tidak langsung. Jaga tanah tetap lembap.',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Berbunga Kecil
  {
    id: '32',
    name: 'Sarbena Putih',
    description: 'Tanaman hias gantung dengan bunga putih kecil yang menawan, ideal untuk taman minimalis atau teras rumah.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '20-30 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari sebagian. Siram teratur dan deadhead bunga layu.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33',
    name: 'Sarbena Hijau',
    description: 'Varian tanaman hias dengan daun hijau cerah yang memberikan kesan segar dan alami pada ruang hijau.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '20-30 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari sebagian. Siram teratur dan berikan pupuk cair.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '34',
    name: 'Marigool',
    description: 'Tanaman berbunga oranye cerah yang populer sebagai tanaman hias dan penangkal serangga di taman rumah.',
    price: 25000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '30-50 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan deadhead untuk bunga berkelanjutan.',
    stock: 28,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '35',
    name: 'Bunga Kertas',
    description: 'Tanaman hias dengan warna-warni cerah yang mudah dirawat dan cocok untuk memperindah pagar atau taman.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan pangkas untuk bentuk yang bagus.',
    stock: 22,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Ukuran Sedang
  {
    id: '36',
    name: 'Pitalub Kecil',
    description: 'Tanaman hias kecil dengan daun lebat berwarna hijau, cocok sebagai penghias meja atau sudut ruangan, mudah dirawat untuk pemula.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '20-30 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya sedang. Siram ketika tanah mulai kering.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '37',
    name: 'Pitalub Tinggi 70cm',
    description: 'Tanaman hias berukuran sedang dengan daun lebat, mudah dirawat dan sesuai sebagai penghias taman untuk pemula.',
    price: 80000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '70 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Adaptif dengan berbagai kondisi. Siram teratur dan pangkas sesuai kebutuhan.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '38',
    name: 'Aglonema Valentin',
    description: 'Tanaman hias dengan daun hijau-merah muda yang populer untuk dekorasi interior dan mudah tumbuh subur di tempat teduh.',
    price: 70000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka tempat teduh dengan kelembapan sedang. Siram ketika tanah mulai kering.',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Buah & Herbal
  {
    id: '39',
    name: 'Jambu Kanci Tinggi 50cm',
    description: 'Tanaman buah jambu kanci kecil yang juga dapat dijadikan tanaman hias, cocok untuk taman dan kebun rumah.',
    price: 60000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50 cm',
    care_level: 'Mudah',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan berikan pupuk buah.',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '40',
    name: 'Jeruk Lemon',
    description: 'Tanaman buah jeruk lemon kecil yang memberikan aroma segar dan cocok untuk taman maupun kebun rumah.',
    price: 60000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Siram teratur dan berikan pupuk citrus.',
    stock: 10,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Tanaman Pagar & Landscape
  {
    id: '41',
    name: 'Asoka India',
    description: 'Tanaman berbunga kecil yang sering digunakan sebagai pagar hidup, mudah dirawat dan sesuai untuk pemula.',
    price: 10000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Cocok untuk pagar hidup. Siram teratur dan pangkas untuk bentuk yang rapi.',
    stock: 40,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '42',
    name: 'Asoka Singapur',
    description: 'Tanaman berbunga kecil yang populer sebagai pagar hidup, mudah dirawat dan sesuai untuk pemula.',
    price: 25000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Ideal untuk pagar hidup. Siram teratur dan pangkas sesuai kebutuhan.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '43',
    name: 'Ketapang Kaligata Tinggi 60cm',
    description: 'Tanaman hias kecil dengan daun khas yang memberikan kesan asri, sangat sesuai untuk taman minimalis.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '60 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari sebagian. Siram teratur dan berikan pupuk organik.',
    stock: 20,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '44',
    name: 'Berekele',
    description: 'Tanaman hias yang menambah warna dan tekstur pada taman tropis maupun sebagai tanaman pagar hidup.',
    price: 15000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '30-50 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Adaptif dengan berbagai kondisi. Siram teratur dan pangkas untuk bentuk.',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '45',
    name: 'Bringin Putih',
    description: 'Tanaman hias dengan daun putih hijau yang menawan, memberikan kesan elegan untuk taman dan halaman.',
    price: 50000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari sebagian. Siram teratur dan jaga kelembapan tanah.',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '46',
    name: 'Bromelian Baby Pink',
    description: 'Bromeliad dengan bunga pink kecil yang cantik, menjadi favorit tanaman eksotis untuk dekorasi interior.',
    price: 125000,
    image: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '25-40 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi. Isi cup daun dengan air dan jaga kelembapan.',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '47',
    name: 'Kadaka Tempel',
    description: 'Tanaman hias dengan daun menarik yang mudah dirawat dan sesuai untuk taman tropis maupun sebagai tanaman pagar hidup.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka kelembapan tinggi dan cahaya tidak langsung. Semprot daun teratur.',
    stock: 22,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Pot & Aksesoris
  {
    id: '48',
    name: 'Pot Tanah Coklat Diameter 15cm',
    description: 'Pot tanah liat berkualitas tinggi dengan desain minimalis, tersedia dalam warna coklat. Cocok untuk tanaman kecil hingga sedang.',
    price: 40000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '15 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot berkualitas dengan drainase baik. Cocok untuk berbagai jenis tanaman.',
    stock: 50,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '49',
    name: 'Pot Tanah Hitam Diameter 15cm',
    description: 'Pot tanah liat berkualitas tinggi dengan desain minimalis, tersedia dalam warna hitam. Memberikan kesan modern dan elegan.',
    price: 40000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '15 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot berkualitas dengan drainase baik. Desain modern untuk dekorasi.',
    stock: 50,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '50',
    name: 'Pot Tanah Putih Diameter 15cm',
    description: 'Pot tanah liat berkualitas tinggi dengan desain minimalis, tersedia dalam warna putih. Memberikan kesan bersih dan fresh.',
    price: 40000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '15 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot berkualitas dengan drainase baik. Warna putih yang elegan.',
    stock: 50,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '51',
    name: 'Pot Kapsul Coklat Diameter 35cm',
    description: 'Pot dengan desain kapsul elegan diameter 35cm tinggi 60cm, cocok untuk tanaman besar atau bonsai. Warna coklat natural.',
    price: 85000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '35cm diameter, 60cm tinggi',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot premium untuk tanaman besar. Drainase excellent dan desain modern.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '52',
    name: 'Pot Kapsul Hitam Diameter 35cm',
    description: 'Pot dengan desain kapsul elegan diameter 35cm tinggi 60cm, cocok untuk tanaman besar atau bonsai. Warna hitam modern.',
    price: 85000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '35cm diameter, 60cm tinggi',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot premium untuk tanaman besar. Drainase excellent dan desain modern.',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '53',
    name: 'Pot Tanah Coklat Diameter 30cm',
    description: 'Pot tanah liat minimalis diameter 30cm yang sesuai untuk berbagai tanaman hias berukuran sedang.',
    price: 65000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '30 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot berkualitas untuk tanaman sedang. Drainase baik dan tahan lama.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '54',
    name: 'Pot Tanah Putih Diameter 30cm',
    description: 'Pot tanah liat minimalis diameter 30cm warna putih yang sesuai untuk berbagai tanaman hias berukuran sedang.',
    price: 65000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '30 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot berkualitas untuk tanaman sedang. Warna putih yang elegan.',
    stock: 35,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '55',
    name: 'Pot Tanah Bintik Hitam Diameter 30cm',
    description: 'Pot tanah liat minimalis diameter 30cm dengan motif bintik hitam yang unik dan artistik.',
    price: 65000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '30 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot artistik untuk tanaman sedang. Motif unik dan berkualitas tinggi.',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '56',
    name: 'Pot Hitam Diameter 40cm',
    description: 'Pot plastik hitam berukuran besar diameter 40cm yang tahan lama dan ideal untuk tanaman hias berukuran sedang hingga besar.',
    price: 40000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '40 cm diameter',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pot plastik tahan lama untuk indoor dan outdoor. Drainase baik.',
    stock: 40,
    created_at: '2024-01-01T00:00:00Z'
  },

  // Media Tanam & Aksesoris
  {
    id: '57',
    name: 'Media Tanah Premium',
    description: 'Media tanam berkualitas tinggi yang mendukung pertumbuhan berbagai tanaman hias. Dapat digunakan untuk pot maupun tanah terbuka.',
    price: 15000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '7',
    category: 'Media Tanam',
    height: '5kg per kemasan',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Media tanam siap pakai. Campurkan dengan tanah existing atau gunakan langsung.',
    stock: 100,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '58',
    name: 'Batu Taman Hitam',
    description: 'Batu hias hitam yang digunakan untuk dekorasi taman, memberikan kontras alami dan estetis pada landscape.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '2kg per kemasan',
    care_level: 'Mudah',
    watering_frequency: 'Tidak perlu',
    care_instructions: 'Batu dekoratif untuk mulching dan estetika taman. Tahan cuaca.',
    stock: 60,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '59',
    name: 'Batu Taman Putih',
    description: 'Batu hias putih yang digunakan untuk dekorasi taman, memberikan kontras alami dan estetis pada landscape.',
    price: 30000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg',
    category_id: '6',
    category: 'Pot & Aksesoris',
    height: '2kg per kemasan',
    care_level: 'Mudah',
    watering_frequency: 'Tidak perlu',
    care_instructions: 'Batu dekoratif untuk mulching dan estetika taman. Warna putih yang elegan.',
    stock: 60,
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const getPlants = async (limit?: number): Promise<Plant[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (limit) {
    return mockPlants.slice(0, limit);
  }
  return mockPlants;
};

export const getPlantById = async (id: string): Promise<Plant | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockPlants.find(plant => plant.id === id) || null;
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockCategories;
};

export const getPlantsByCategory = async (categoryId: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return mockPlants.filter(plant => plant.category_id === categoryId);
};

export const searchPlants = async (query: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const lowerQuery = query.toLowerCase();
  return mockPlants.filter(plant => 
    plant.name.toLowerCase().includes(lowerQuery) ||
    plant.description.toLowerCase().includes(lowerQuery) ||
    plant.category.toLowerCase().includes(lowerQuery)
  );
};

export const getFeaturedPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return premium and popular plants
  return mockPlants.filter(plant => 
    plant.price >= 100000 || 
    ['Jamani Dolar', 'Lidah Mertua', 'Pakis Kuning', 'Alamanda Kuning'].includes(plant.name.split(' ')[0])
  ).slice(0, 8);
};

export const getPremiumPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return plants above 500k (premium collection)
  return mockPlants.filter(plant => plant.price >= 500000);
};

export const getBudgetPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return plants under 50k (budget friendly)
  return mockPlants.filter(plant => plant.price <= 50000);
};

export const getPlantsByPriceRange = async (min: number, max: number): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockPlants.filter(plant => plant.price >= min && plant.price <= max);
};

export const getPlantsByCareLevel = async (careLevel: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockPlants.filter(plant => plant.care_level === careLevel);
};

// Statistics for admin dashboard
export const getPlantStatistics = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    totalPlants: mockPlants.length,
    totalCategories: mockCategories.length,
    averagePrice: mockPlants.reduce((sum, plant) => sum + plant.price, 0) / mockPlants.length,
    totalStock: mockPlants.reduce((sum, plant) => sum + plant.stock, 0),
    lowStockCount: mockPlants.filter(plant => plant.stock <= 5).length,
    outOfStockCount: mockPlants.filter(plant => plant.stock === 0).length,
    premiumPlantsCount: mockPlants.filter(plant => plant.price >= 500000).length,
    budgetPlantsCount: mockPlants.filter(plant => plant.price <= 50000).length,
    categoryDistribution: mockCategories.map(category => ({
      name: category.name,
      count: mockPlants.filter(plant => plant.category_id === category.id).length
    })),
    careLevelDistribution: [
      { level: 'Sangat Mudah', count: mockPlants.filter(p => p.care_level === 'Sangat Mudah').length },
      { level: 'Mudah', count: mockPlants.filter(p => p.care_level === 'Mudah').length },
      { level: 'Sedang', count: mockPlants.filter(p => p.care_level === 'Sedang').length },
      { level: 'Sulit', count: mockPlants.filter(p => p.care_level === 'Sulit').length }
    ]
  };
};

// Helper function for formatting price in components
export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}jt`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}k`;
  }
  return price.toString();
};