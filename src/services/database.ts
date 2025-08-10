import { Plant, Category } from '../types';

// Mock data untuk development - 53 produk dengan gambar yang relevan
const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Jamani Dolar (ZZ Plant)',
    description: 'Tanaman hias indoor yang sangat mudah perawatan, cocok untuk pemula. Tahan terhadap kondisi cahaya rendah dan jarang disiram.',
    price: 85000,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya rendah hingga sedang. Siram ketika tanah benar-benar kering.',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    description: 'Tanaman hias populer dengan daun berlubang yang unik. Tumbuh merambat dan cocok untuk dekorasi ruangan modern.',
    price: 150000,
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '60-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Letakkan di tempat dengan cahaya terang tidak langsung. Siram ketika tanah mulai kering.',
    stock: 15,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Lidah Mertua (Sansevieria)',
    description: 'Tanaman yang sangat tahan banting dan bisa bertahan dalam kondisi minim perawatan. Ideal untuk kamar tidur.',
    price: 65000,
    image: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-80 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-4 minggu sekali',
    care_instructions: 'Toleran terhadap semua kondisi cahaya. Siram sangat jarang, biarkan tanah kering total.',
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Kuping Gajah (Anthurium)',
    description: 'Anthurium dengan daun besar berbentuk hati dan urat putih mencolok. Memerlukan kelembapan tinggi.',
    price: 125000,
    image: 'https://images.pexels.com/photos/7084308/pexels-photo-7084308.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-70 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Jaga kelembapan udara tinggi. Semprot daun secara teratur. Hindari air menggenang.',
    stock: 12,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Pucuk Merah',
    description: 'Tanaman pagar hidup populer dengan daun muda berwarna merah menyala. Tumbuh cepat dan mudah dibentuk.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50-150 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Pangkas rutin untuk menjaga bentuk. Berikan pupuk NPK untuk warna optimal.',
    stock: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Bonsai Gestrum',
    description: 'Bonsai dengan bunga kuning harum yang memerlukan perawatan intensif dan teknik pembentukan khusus.',
    price: 750000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '4',
    category: 'Bonsai',
    height: '25-40 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Siram setiap hari dengan air sedikit. Pangkas rutin untuk menjaga bentuk.',
    stock: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Philodendron Brasil',
    description: 'Tanaman hias dengan daun variegata hijau dan kuning yang cantik. Mudah perawatan dan tumbuh cepat.',
    price: 95000,
    image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya terang tidak langsung. Jaga kelembapan tanah tetapi tidak tergenang.',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Kaktus Koboy',
    description: 'Kaktus tinggi dengan bentuk unik seperti koboi. Sangat tahan kekeringan dan cocok untuk outdoor.',
    price: 180000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '70-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya matahari langsung. Siram sedikit saat musim kering.',
    stock: 8,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Dragon Sekel (Alocasia)',
    description: 'Keladi dengan motif sisik naga yang eksotis. Daun berwarna hijau dengan urat putih mencolok.',
    price: 220000,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '25-45 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Jaga kelembapan tinggi. Hindari cahaya langsung. Gunakan media tanam yang porous.',
    stock: 10,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Alamanda Kuning',
    description: 'Tanaman berbunga kuning cerah yang harum. Cocok untuk taman outdoor dan sebagai tanaman pagar.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1084200/pexels-photo-1084200.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh. Pangkas bunga layu untuk merangsang bunga baru.',
    stock: 18,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Pothos Golden',
    description: 'Tanaman merambat yang sangat mudah perawatan, sempurna untuk pemula dan dapat tumbuh di air.',
    price: 45000,
    image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '1 kali seminggu',
    care_instructions: 'Sangat toleran terhadap berbagai kondisi cahaya. Siram ketika tanah kering.',
    stock: 35,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Peace Lily',
    description: 'Tanaman indoor dengan bunga putih cantik yang dapat membersihkan udara dalam ruangan.',
    price: 75000,
    image: 'https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-60 cm',
    care_level: 'Mudah',
    watering_frequency: '2 kali seminggu',
    care_instructions: 'Suka tempat teduh dengan kelembapan tinggi. Siram ketika tanah mulai kering.',
    stock: 22,
    created_at: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Rubber Plant (Ficus)',
    description: 'Tanaman karet dengan daun besar mengkilap yang mudah perawatan dan tumbuh cepat.',
    price: 85000,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Letakkan di tempat dengan cahaya terang tidak langsung. Bersihkan daun secara berkala.',
    stock: 18,
    created_at: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Spider Plant',
    description: 'Tanaman laba-laba dengan daun bergaris putih yang mudah berkembang biak dan cocok digantung.',
    price: 55000,
    image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '20-40 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Toleran terhadap berbagai kondisi. Cocok untuk pemula yang baru belajar.',
    stock: 28,
    created_at: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Fiddle Leaf Fig',
    description: 'Tanaman dengan daun besar berbentuk biola yang menjadi favorit untuk dekorasi interior modern.',
    price: 185000,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '80-150 cm',
    care_level: 'Sedang',
    watering_frequency: '1 kali seminggu',
    care_instructions: 'Butuh cahaya terang tidak langsung. Jangan terlalu sering dipindah.',
    stock: 8,
    created_at: new Date().toISOString()
  },
  {
    id: '16',
    name: 'Aloe Vera',
    description: 'Tanaman sukulen dengan manfaat obat yang mudah perawatan dan tahan kekeringan.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '20-40 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Letakkan di tempat dengan cahaya matahari langsung. Siram sangat jarang.',
    stock: 40,
    created_at: new Date().toISOString()
  },
  {
    id: '17',
    name: 'Echeveria',
    description: 'Sukulen cantik berbentuk roset dengan warna-warna menarik yang cocok untuk koleksi mini.',
    price: 25000,
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '10-20 cm',
    care_level: 'Mudah',
    watering_frequency: '2 minggu sekali',
    care_instructions: 'Butuh cahaya matahari penuh. Hindari air pada daun.',
    stock: 45,
    created_at: new Date().toISOString()
  },
  {
    id: '18',
    name: 'Mawar Merah',
    description: 'Bunga mawar merah klasik yang harum dan cantik untuk taman outdoor.',
    price: 65000,
    image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '40-80 cm',
    care_level: 'Sedang',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh dan sirkulasi udara baik. Pangkas rutin.',
    stock: 15,
    created_at: new Date().toISOString()
  },
  {
    id: '19',
    name: 'Melati Putih',
    description: 'Bunga melati putih yang harum dan sering digunakan untuk upacara adat.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari pagi. Siram secara teratur tapi jangan berlebihan.',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '20',
    name: 'Anggrek Bulan',
    description: 'Anggrek putih cantik yang menjadi bunga nasional Indonesia dengan perawatan khusus.',
    price: 125000,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '30-50 cm',
    care_level: 'Sulit',
    watering_frequency: '2 kali seminggu',
    care_instructions: 'Butuh kelembapan tinggi dan cahaya tidak langsung. Gunakan media khusus anggrek.',
    stock: 6,
    created_at: new Date().toISOString()
  },
  {
    id: '21',
    name: 'Cemara Norfolk',
    description: 'Pohon cemara mini yang cocok untuk indoor dengan bentuk simetris yang indah.',
    price: 95000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-80 cm',
    care_level: 'Sedang',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya terang dan kelembapan sedang. Jangan biarkan tanah kering total.',
    stock: 12,
    created_at: new Date().toISOString()
  },
  {
    id: '22',
    name: 'Dracaena Marginata',
    description: 'Tanaman dengan batang ramping dan daun runcing bergaris merah yang elegan.',
    price: 115000,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '60-120 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Toleran terhadap cahaya rendah. Siram ketika tanah mulai kering.',
    stock: 14,
    created_at: new Date().toISOString()
  },
  {
    id: '23',
    name: 'Calathea Ornata',
    description: 'Tanaman dengan daun bergaris pink yang cantik dan unik untuk dekorasi interior.',
    price: 105000,
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh kelembapan tinggi dan cahaya tidak langsung. Hindari air keran.',
    stock: 16,
    created_at: new Date().toISOString()
  },
  {
    id: '24',
    name: 'Boston Fern',
    description: 'Pakis Boston dengan daun lebat yang cocok untuk tempat teduh dan lembap.',
    price: 65000,
    image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-50 cm',
    care_level: 'Sedang',
    watering_frequency: '3-4 kali seminggu',
    care_instructions: 'Jaga kelembapan tinggi. Semprot daun secara teratur.',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '25',
    name: 'Aglaonema Red',
    description: 'Tanaman hias dengan daun merah-hijau yang cantik dan mudah perawatan.',
    price: 85000,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Toleran terhadap cahaya rendah. Siram ketika tanah mulai kering.',
    stock: 24,
    created_at: new Date().toISOString()
  },
  {
    id: '26',
    name: 'Dieffenbachia',
    description: 'Tanaman dengan daun besar bercak putih yang menarik untuk dekorasi ruangan.',
    price: 75000,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '40-80 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya terang tidak langsung. Jaga kelembapan tanah.',
    stock: 18,
    created_at: new Date().toISOString()
  },
  {
    id: '27',
    name: 'Schefflera',
    description: 'Tanaman payung dengan daun majemuk yang mudah perawatan dan tumbuh cepat.',
    price: 95000,
    image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Toleran terhadap berbagai kondisi cahaya. Pangkas untuk menjaga bentuk.',
    stock: 16,
    created_at: new Date().toISOString()
  },
  {
    id: '28',
    name: 'Ficus Benjamina',
    description: 'Pohon beringin mini yang cocok untuk indoor dengan daun kecil mengkilap.',
    price: 125000,
    image: 'https://images.pexels.com/photos/3125195/pexels-photo-3125195.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '1',
    category: 'Tanaman Indoor',
    height: '60-120 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya terang. Siram ketika tanah mulai kering.',
    stock: 10,
    created_at: new Date().toISOString()
  },
  {
    id: '29',
    name: 'Haworthia',
    description: 'Sukulen kecil dengan pola transparan yang unik dan mudah perawatan.',
    price: 35000,
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '10-15 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 minggu sekali',
    care_instructions: 'Butuh cahaya terang tidak langsung. Siram sangat jarang.',
    stock: 32,
    created_at: new Date().toISOString()
  },
  {
    id: '30',
    name: 'Jade Plant',
    description: 'Tanaman giok yang membawa keberuntungan dengan daun tebal dan mudah perawatan.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '3',
    category: 'Sukulen & Kaktus',
    height: '20-40 cm',
    care_level: 'Mudah',
    watering_frequency: '2 minggu sekali',
    care_instructions: 'Suka cahaya matahari langsung. Biarkan tanah kering antar penyiraman.',
    stock: 26,
    created_at: new Date().toISOString()
  },
  {
    id: '31',
    name: 'Bougainvillea',
    description: 'Tanaman merambat dengan bunga berwarna cerah yang cocok untuk pagar atau pergola.',
    price: 55000,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '100-200 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh. Pangkas untuk mengontrol pertumbuhan.',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '32',
    name: 'Ixora',
    description: 'Tanaman berbunga cluster berwarna cerah yang cocok untuk pagar hidup.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1084200/pexels-photo-1084200.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '50-100 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Berikan pupuk untuk pembungaan optimal.',
    stock: 22,
    created_at: new Date().toISOString()
  },
  {
    id: '33',
    name: 'Hibiscus',
    description: 'Bunga sepatu dengan bunga besar berwarna cerah yang menjadi bunga nasional Malaysia.',
    price: 55000,
    image: 'https://images.pexels.com/photos/158028/bellis-perennis-daisy-flower-spring-158028.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '60-120 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari penuh. Siram secara teratur untuk pembungaan optimal.',
    stock: 18,
    created_at: new Date().toISOString()
  },
  {
    id: '34',
    name: 'Lavender',
    description: 'Tanaman aromatik dengan bunga ungu yang harum dan memiliki efek menenangkan.',
    price: 65000,
    image: 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '30-60 cm',
    care_level: 'Sedang',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Butuh drainase baik dan cahaya matahari penuh. Jangan overwater.',
    stock: 14,
    created_at: new Date().toISOString()
  },
  {
    id: '35',
    name: 'Rosemary',
    description: 'Tanaman herbal aromatik yang dapat digunakan untuk memasak dan memiliki aroma yang menyegarkan.',
    price: 45000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh dan tanah yang well-drained.',
    stock: 20,
    created_at: new Date().toISOString()
  },
  {
    id: '36',
    name: 'Basil',
    description: 'Tanaman kemangi yang aromatik dan sering digunakan untuk memasak masakan Italia.',
    price: 25000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '20-40 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh cahaya matahari dan penyiraman teratur. Petik daun untuk merangsang pertumbuhan.',
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '37',
    name: 'Mint',
    description: 'Tanaman mint yang segar dan aromatik, mudah tumbuh dan cocok untuk teh herbal.',
    price: 25000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '20-40 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka tempat lembap dan cahaya tidak langsung. Tumbuh sangat cepat.',
    stock: 35,
    created_at: new Date().toISOString()
  },
  {
    id: '38',
    name: 'Thyme',
    description: 'Tanaman herbal kecil dengan aroma khas yang sering digunakan untuk bumbu masakan.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '15-30 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh dan tanah yang tidak terlalu lembap.',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '39',
    name: 'Oregano',
    description: 'Tanaman herbal dengan aroma kuat yang sering digunakan untuk pizza dan pasta.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '20-40 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Butuh cahaya matahari dan drainase baik. Petik daun secara teratur.',
    stock: 28,
    created_at: new Date().toISOString()
  },
  {
    id: '40',
    name: 'Lemon Balm',
    description: 'Tanaman herbal dengan aroma lemon yang menenangkan dan mudah tumbuh.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '30-60 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Tumbuh di berbagai kondisi. Pangkas untuk mencegah berbunga.',
    stock: 22,
    created_at: new Date().toISOString()
  },
  {
    id: '41',
    name: 'Pot Keramik Putih 20cm',
    description: 'Pot keramik putih minimalis diameter 20cm yang cocok untuk tanaman indoor.',
    price: 45000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '7',
    category: 'Pot & Aksesoris',
    height: '20 cm',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Pastikan ada lubang drainase. Bersihkan secara berkala.',
    stock: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '42',
    name: 'Pot Terracotta 25cm',
    description: 'Pot tanah liat alami diameter 25cm yang memberikan sirkulasi udara baik untuk akar.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '7',
    category: 'Pot & Aksesoris',
    height: '25 cm',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Material porous yang baik untuk akar. Rendam sebelum digunakan.',
    stock: 40,
    created_at: new Date().toISOString()
  },
  {
    id: '43',
    name: 'Media Tanam Organik',
    description: 'Campuran media tanam organik yang kaya nutrisi untuk pertumbuhan optimal tanaman.',
    price: 25000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '7',
    category: 'Pot & Aksesoris',
    height: '5 kg',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai tanaman',
    care_instructions: 'Campurkan dengan tanah biasa. Pastikan drainase baik.',
    stock: 60,
    created_at: new Date().toISOString()
  },
  {
    id: '44',
    name: 'Pupuk Cair NPK',
    description: 'Pupuk cair lengkap dengan kandungan NPK yang seimbang untuk semua jenis tanaman.',
    price: 35000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '7',
    category: 'Pot & Aksesoris',
    height: '500ml',
    care_level: 'Mudah',
    watering_frequency: '2 minggu sekali',
    care_instructions: 'Campurkan dengan air sesuai petunjuk. Aplikasikan pada tanah, bukan daun.',
    stock: 45,
    created_at: new Date().toISOString()
  },
  {
    id: '45',
    name: 'Semprot Tanaman',
    description: 'Botol semprot khusus untuk menyiram dan membersihkan daun tanaman.',
    price: 15000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '7',
    category: 'Pot & Aksesoris',
    height: '500ml',
    care_level: 'Mudah',
    watering_frequency: 'Sesuai kebutuhan',
    care_instructions: 'Gunakan untuk menyemprot daun atau memberikan kelembapan.',
    stock: 55,
    created_at: new Date().toISOString()
  },
  {
    id: '46',
    name: 'Bonsai Serissa',
    description: 'Bonsai dengan bunga putih kecil yang cantik dan memerlukan perawatan intensif.',
    price: 450000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '4',
    category: 'Bonsai',
    height: '20-35 cm',
    care_level: 'Sulit',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Butuh kelembapan tinggi dan cahaya tidak langsung. Pangkas rutin.',
    stock: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '47',
    name: 'Bonsai Ficus',
    description: 'Bonsai ficus yang mudah dibentuk dan cocok untuk pemula bonsai.',
    price: 350000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '4',
    category: 'Bonsai',
    height: '25-40 cm',
    care_level: 'Sedang',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Toleran terhadap pemangkasan. Siram ketika tanah mulai kering.',
    stock: 6,
    created_at: new Date().toISOString()
  },
  {
    id: '48',
    name: 'Bonsai Juniper',
    description: 'Bonsai juniper dengan daun jarum yang klasik dan tahan terhadap berbagai kondisi.',
    price: 550000,
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '4',
    category: 'Bonsai',
    height: '30-45 cm',
    care_level: 'Sedang',
    watering_frequency: 'Setiap hari',
    care_instructions: 'Butuh cahaya matahari penuh. Lindungi dari angin kencang.',
    stock: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '49',
    name: 'Gardenia',
    description: 'Tanaman berbunga putih yang sangat harum dan cantik untuk taman.',
    price: 75000,
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '40-80 cm',
    care_level: 'Sedang',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Butuh tanah asam dan kelembapan tinggi. Hindari air pada bunga.',
    stock: 12,
    created_at: new Date().toISOString()
  },
  {
    id: '50',
    name: 'Pentas',
    description: 'Tanaman berbunga cluster kecil berwarna cerah yang menarik kupu-kupu.',
    price: 35000,
    image: 'https://images.pexels.com/photos/158028/bellis-perennis-daisy-flower-spring-158028.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya matahari penuh. Pangkas bunga layu untuk pembungaan berkelanjutan.',
    stock: 25,
    created_at: new Date().toISOString()
  },
  {
    id: '51',
    name: 'Vinca',
    description: 'Tanaman berbunga kecil yang tahan panas dan cocok untuk border taman.',
    price: 25000,
    image: 'https://images.pexels.com/photos/158028/bellis-perennis-daisy-flower-spring-158028.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '5',
    category: 'Tanaman Berbunga',
    height: '20-40 cm',
    care_level: 'Sangat Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Sangat toleran terhadap panas. Siram secara teratur tapi jangan berlebihan.',
    stock: 40,
    created_at: new Date().toISOString()
  },
  {
    id: '52',
    name: 'Coleus',
    description: 'Tanaman hias daun dengan warna-warna cerah yang menarik dan mudah perawatan.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '2',
    category: 'Tanaman Outdoor',
    height: '30-60 cm',
    care_level: 'Mudah',
    watering_frequency: '2-3 kali seminggu',
    care_instructions: 'Suka cahaya terang tidak langsung. Pangkas bunga untuk menjaga warna daun.',
    stock: 30,
    created_at: new Date().toISOString()
  },
  {
    id: '53',
    name: 'Catnip',
    description: 'Tanaman herbal yang disukai kucing dengan aroma mint yang khas.',
    price: 35000,
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    category_id: '6',
    category: 'Tanaman Herbal',
    height: '30-50 cm',
    care_level: 'Mudah',
    watering_frequency: '1-2 kali seminggu',
    care_instructions: 'Mudah tumbuh di berbagai kondisi. Pangkas untuk mencegah berbunga.',
    stock: 20,
    created_at: new Date().toISOString()
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Tanaman Indoor',
    description: 'Tanaman hias untuk dalam ruangan',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Tanaman Outdoor',
    description: 'Tanaman untuk taman dan area luar',
    image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sukulen & Kaktus',
    description: 'Tanaman tahan kekeringan',
    image: 'https://images.pexels.com/photos/1974928/pexels-photo-1974928.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Bonsai',
    description: 'Koleksi bonsai premium',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tanaman Berbunga',
    description: 'Tanaman dengan bunga cantik',
    image: 'https://images.pexels.com/photos/1084200/pexels-photo-1084200.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Tanaman Herbal',
    description: 'Tanaman herbal untuk memasak dan obat',
    image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Pot & Aksesoris',
    description: 'Pot, media tanam, dan aksesoris taman',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: new Date().toISOString()
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
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPlants.find(plant => plant.id === id) || null;
};

export const getCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCategories;
};

export const getPlantsByCategory = async (categoryId: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.category_id === categoryId);
};

export const searchPlants = async (query: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => 
    plant.name.toLowerCase().includes(query.toLowerCase()) ||
    plant.description.toLowerCase().includes(query.toLowerCase()) ||
    plant.category.toLowerCase().includes(query.toLowerCase())
  );
};

export const getFeaturedPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.slice(0, 6);
};

export const getPremiumPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price >= 500000);
};

export const getBudgetPlants = async (): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price <= 50000);
};

export const getPlantsByPriceRange = async (min: number, max: number): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.price >= min && plant.price <= max);
};

export const getPlantsByCareLevel = async (careLevel: string): Promise<Plant[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockPlants.filter(plant => plant.care_level === careLevel);
};

export const getPlantStatistics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
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