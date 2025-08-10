export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number; // Price in USD
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1RuZTX81xruOlT8qEM278WfI',
    name: 'Pucuk Merah (250 cm)',
    description: 'Tanaman pucuk merah tinggi 250 cm yang sering digunakan sebagai pagar hidup atau dekorasi taman dengan warna cerah menarik.',
    mode: 'subscription',
    price: 23.33
  },
  {
    priceId: 'price_1RuZRW81xruOlT8qoDtfw4Gv',
    name: 'Kadaka Tempel',
    description: 'Tanaman hias dengan daun menarik yang mudah dirawat dan sesuai untuk taman tropis atau pagar hidup.',
    mode: 'subscription',
    price: 2.33
  },
  {
    priceId: 'price_1RuZQx81xruOlT8qPaUDEloJ',
    name: 'Asoka Singapur',
    description: 'Tanaman berbunga kecil yang populer sebagai pagar hidup dan mudah dirawat untuk pemula.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RuZPq81xruOlT8qYBXe9CVn',
    name: 'Sikas (70 cm)',
    description: 'Tanaman sikas berukuran besar tinggi 70 cm yang cocok sebagai tanaman hias eksklusif dengan perawatan khusus.',
    mode: 'subscription',
    price: 113.33
  },
  {
    priceId: 'price_1RuZP681xruOlT8qF0i7m6md',
    name: 'Jeruk Lemon',
    description: 'Tanaman buah jeruk lemon kecil yang memberikan aroma segar dan cocok untuk taman maupun kebun rumah.',
    mode: 'subscription',
    price: 4.00
  },
  {
    priceId: 'price_1RuZNX81xruOlT8q3RgX2wvj',
    name: 'Jambu Kanci (50 cm)',
    description: 'Tanaman buah jambu kanci kecil tinggi 50 cm yang dapat dijadikan tanaman hias untuk taman dan kebun.',
    mode: 'subscription',
    price: 4.00
  },
  {
    priceId: 'price_1RuZLi81xruOlT8qVRDGtTjI',
    name: 'Bunga Kertas',
    description: 'Tanaman hias dengan warna-warni cerah yang mudah dirawat dan cocok untuk memperindah pagar atau taman.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuZKt81xruOlT8quqHuPYg0',
    name: 'Bonsai Cemara Udang',
    description: 'Bonsai cemara unik menyerupai udang yang merupakan tanaman koleksi menarik dengan perawatan khusus.',
    mode: 'subscription',
    price: 43.33
  },
  {
    priceId: 'price_1RuZJI81xruOlT8quWq8CCMp',
    name: 'Bonsai Gestrum Ukuran M',
    description: 'Bonsai berukuran sedang dengan daun Gestrum cantik yang memberikan kesan elegan di rumah atau kantor.',
    mode: 'subscription',
    price: 33.33
  },
  {
    priceId: 'price_1RuZIb81xruOlT8qf0FNwR4Y',
    name: 'Bonsai Gestrum Ukuran L',
    description: 'Bonsai besar dengan daun Gestrum indah yang cocok untuk koleksi eksklusif dengan perawatan khusus.',
    mode: 'subscription',
    price: 80.00
  },
  {
    priceId: 'price_1RuZFS81xruOlT8qyAfWT1yz',
    name: 'Kaktus Koboy (70 cm)',
    description: 'Kaktus besar tinggi 70 cm berbentuk unik yang tahan kering dan mudah dirawat untuk dekorasi rumah.',
    mode: 'subscription',
    price: 10.00
  },
  {
    priceId: 'price_1RuZEt81xruOlT8qEZgV5H5T',
    name: 'Marigool',
    description: 'Tanaman berbunga oranye cerah yang populer sebagai tanaman hias dan penangkal serangga di taman.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RuZDv81xruOlT8qw36FxBJR',
    name: 'Bringin Korea Micro',
    description: 'Varian kecil Bringin Korea yang cocok untuk koleksi bonsai dengan bentuk daun menarik dan perawatan mudah.',
    mode: 'subscription',
    price: 100.00
  },
  {
    priceId: 'price_1RuZCx81xruOlT8q5vn78GuJ',
    name: 'Lidah Mertua',
    description: 'Tanaman hias indoor dengan daun panjang tajam yang mudah dirawat untuk dekorasi meja atau rak.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RuZBB81xruOlT8qyWfXgw2Z',
    name: 'Pandan Bali',
    description: 'Tanaman pandan beraroma khas yang digunakan sebagai tanaman hias dan bumbu dapur di daerah tropis.',
    mode: 'subscription',
    price: 10.00
  },
  {
    priceId: 'price_1RuZAb81xruOlT8qKpaJtn9Z',
    name: 'Asoka India',
    description: 'Tanaman berbunga kecil yang sering digunakan sebagai pagar hidup dan mudah dirawat untuk pemula.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuZA181xruOlT8q4aEJPKOT',
    name: 'Bromelian Baby Pink',
    description: 'Bromelian dengan bunga pink kecil cantik yang menjadi favorit tanaman eksotis untuk dekorasi interior.',
    mode: 'subscription',
    price: 8.33
  },
  {
    priceId: 'price_1RuZ5881xruOlT8qbErTNn8s',
    name: 'Bringin Putih',
    description: 'Tanaman hias dengan daun putih hijau menawan yang memberikan kesan elegan untuk taman.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1RuZ4K81xruOlT8q725qCCY2',
    name: 'Kamboja Jepang',
    description: 'Tanaman hias berbunga cantik dan harum yang sering digunakan sebagai tanaman pekarangan tropis.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1RuZ3j81xruOlT8qnkfYU6Az',
    name: 'Jamani Cobra',
    description: 'Tanaman hias eksotis dengan bentuk unik dan harga tinggi yang cocok untuk koleksi tanaman langka.',
    mode: 'subscription',
    price: 20.00
  },
  {
    priceId: 'price_1RuYru81xruOlT8qKYb7fUu6',
    name: 'Media Tanah',
    description: 'Media tanam berkualitas tinggi yang mendukung pertumbuhan berbagai tanaman hias dalam pot atau tanah terbuka.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1RuYqw81xruOlT8qn7c0aeYl',
    name: 'Berekele',
    description: 'Tanaman hias yang menambah warna dan tekstur pada taman tropis atau sebagai pagar hidup.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1RuYpY81xruOlT8qHQqs6Kio',
    name: 'Ketapang Kaligata (60 cm)',
    description: 'Tanaman hias kecil tinggi 60 cm dengan daun khas yang sesuai untuk taman minimalis.',
    mode: 'subscription',
    price: 2.33
  },
  {
    priceId: 'price_1RuYol81xruOlT8qDLoA5W1p',
    name: 'Pitalub Tinggi (70 cm)',
    description: 'Tanaman hias berukuran sedang tinggi 70 cm dengan daun lebat yang mudah dirawat untuk pemula.',
    mode: 'subscription',
    price: 5.33
  },
  {
    priceId: 'price_1RuYoB81xruOlT8qhokHR3tG',
    name: 'Cemara Tretes (120 cm)',
    description: 'Tanaman cemara mini tinggi 120 cm yang memberikan kesan asri dan elegan untuk taman.',
    mode: 'subscription',
    price: 16.67
  },
  {
    priceId: 'price_1RuYmm81xruOlT8qjeraIMo6',
    name: 'Pot Hitam Diameter 40 cm',
    description: 'Pot plastik hitam berukuran besar yang tahan lama dan ideal untuk tanaman sedang hingga besar.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RuYlz81xruOlT8qbKISFZtQ',
    name: 'Pot Tanah Coklat, Putih, dan Bintik Hitam (30 cm)',
    description: 'Pot tanah liat minimalis diameter 30 cm yang sesuai untuk berbagai tanaman hias.',
    mode: 'subscription',
    price: 4.33
  },
  {
    priceId: 'price_1RuYiU81xruOlT8qIVupX3Ti',
    name: 'Pot Kapsul Coklat dan Hitam (35 cm)',
    description: 'Pot desain kapsul elegan diameter 35 cm tinggi 60 cm yang cocok untuk tanaman besar atau bonsai.',
    mode: 'subscription',
    price: 5.67
  },
  {
    priceId: 'price_1RuYgl81xruOlT8quSAbX6u3',
    name: 'Aglonema Valentin',
    description: 'Tanaman hias dengan daun hijau-merah muda yang populer untuk dekorasi interior dan mudah tumbuh.',
    mode: 'subscription',
    price: 4.67
  },
  {
    priceId: 'price_1RuYft81xruOlT8q2o0tFAVj',
    name: 'Pitalub Kecil',
    description: 'Tanaman hias kecil dengan daun lebat hijau yang cocok sebagai penghias meja dan mudah dirawat.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuYee81xruOlT8qBTA5lb3O',
    name: 'Sarbena Hijau',
    description: 'Varian tanaman hias dengan daun hijau cerah yang memberikan kesan segar dan alami.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuYdW81xruOlT8qJA558RKu',
    name: 'Sarbena Putih (Sabrina)',
    description: 'Tanaman hias gantung dengan bunga putih kecil yang ideal untuk taman minimalis atau teras.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuYcx81xruOlT8qTFwvZaKd',
    name: 'Alamanda Kuning (Allamanda cathartica)',
    description: 'Tanaman berbunga terompet emas kuning cerah diameter 5-7,5 cm yang populer untuk pagar hidup.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1RuYc781xruOlT8qvIev4GgF',
    name: 'Jayen (Episcia)',
    description: 'Tanaman hias indoor dengan daun berbentuk hati dan bunga kecil cerah untuk dekorasi meja.',
    mode: 'subscription',
    price: 5.33
  },
  {
    priceId: 'price_1RuYaJ81xruOlT8qWqwenJCE',
    name: 'Kadaka Tanduk (Platycerium)',
    description: 'Tanaman paku-pakuan epifit yang dapat ditanam dalam pot dan umum ditemukan di daerah lembap.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuYZj81xruOlT8qZhOJUedU',
    name: 'Maranti Bali (Stromanthe sanguinea)',
    description: 'Tanaman hias tropis dari Brasil dengan daun berwarna-warni merah, hijau, dan putih yang mencolok.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1RuYYx81xruOlT8qquKbPJRG',
    name: 'Batu Taman Hitam dan Putih',
    description: 'Batu hias dekorasi taman dalam warna hitam dan putih yang memberikan kontras alami dan estetis.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuYYF81xruOlT8qdwutvYgI',
    name: 'Airis Brazil (Iris variegata)',
    description: 'Tanaman hias outdoor dengan daun panjang hijau bergaris putih yang memberikan tampilan segar.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuYXN81xruOlT8qlHzA599s',
    name: 'Teratai (Nymphaea)',
    description: 'Tanaman air dengan bunga besar indah yang mengapung, sering digunakan untuk mempercantik kolam.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1RuYWN81xruOlT8q0M9HGfwS',
    name: 'Kana (Canna indica)',
    description: 'Tanaman tropis dengan daun lebar dan bunga besar berwarna cerah yang tahan berbagai kondisi cuaca.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuYVn81xruOlT8qIlCzH6x5',
    name: 'Sampang Dara (Excoecaria cochinchinensis)',
    description: 'Perdu tropis dengan daun hijau cerah di atas dan merah gelap di bawah, namun getahnya beracun.',
    mode: 'subscription',
    price: 1.07
  },
  {
    priceId: 'price_1RuYUu81xruOlT8qAvQj9K6B',
    name: 'Siklok (Agave attenuata)',
    description: 'Tanaman sukulen dari Meksiko dengan daun panjang runcing membentuk roseta yang tahan panas dan kekeringan.',
    mode: 'subscription',
    price: 4.67
  },
  {
    priceId: 'price_1RuYTb81xruOlT8q74VCTi5F',
    name: 'Brokoli Hijau',
    description: 'Tanaman hias unik dengan daun hijau segar menyerupai sayur brokoli untuk sentuhan alami.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuYT481xruOlT8q8aPDtWGR',
    name: 'Gestrum Kuning (Gestrum coromandelianum)',
    description: 'Tanaman tropis dengan bunga kuning cerah yang tahan berbagai kondisi cuaca dan mudah dirawat.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RuYRi81xruOlT8qhfWd2SWu',
    name: 'Bringin Korea (Ficus microcarpa)',
    description: 'Tanaman hias besar setinggi 2 meter dengan daun hijau mengkilap yang mudah beradaptasi.',
    mode: 'subscription',
    price: 133.33
  },
  {
    priceId: 'price_1RuYQm81xruOlT8qM06nJelR',
    name: 'Cemara Perak (Juniperus chinensis)',
    description: 'Tanaman konifer hijau kekuningan berbentuk rimbun yang cocok untuk taman dan indoor.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1RuYPJ81xruOlT8qOHgC1qWm',
    name: 'Puting Cabe (Euphorbia milii)',
    description: 'Tanaman berbunga dengan duri tajam yang tahan kekeringan dan memberikan tampilan eksotis.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RuYNt81xruOlT8qEx6tPlcz',
    name: 'Pot Tanah Liat 15 cm',
    description: 'Pot tanah liat berkualitas tinggi dengan desain minimalis tersedia dalam warna coklat, hitam, dan putih.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RuYMr81xruOlT8qKwcjPsmQ',
    name: 'Cemara Ekor Tupai (Asparagus densiflorus)',
    description: 'Tanaman hijau abadi dari Afrika Selatan dengan daun menyerupai ekor tupai yang cocok untuk interior.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RuYLz81xruOlT8q6ILSYSAR',
    name: 'Kuping Gajah (Anthurium crystallinum)',
    description: 'Anthurium dengan daun besar berbentuk hati berkilau dan urat putih mencolok yang elegan untuk dekorasi interior.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1RuYKg81xruOlT8qlihI4fnm',
    name: 'Pakis Kuning (Nephrolepis exaltata \'Golden\')',
    description: 'Pakis hias dengan daun muda kuning cerah yang berubah hijau saat dewasa, ideal untuk area teduh.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RuYJf81xruOlT8qyG3K3iTK',
    name: 'Dragon Sekel (Alocasia baginda \'Dragon Scale\')',
    description: 'Varietas Alocasia eksotis dengan motif daun menyerupai sisik naga berwarna hijau zamrud dan urat perak metalik.',
    mode: 'subscription',
    price: 8.33
  },
  {
    priceId: 'price_1RuYIh81xruOlT8qq6lEI0kU',
    name: 'Jamani Dolar (Zamioculcas zamiifolia)',
    description: 'Tanaman perennial tropis dari Afrika Timur yang toleran terhadap cahaya rendah dan tahan kekeringan dengan daun hijau pekat mengkilap.',
    mode: 'subscription',
    price: 4.67
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductsByMode = (mode: 'payment' | 'subscription'): StripeProduct[] => {
  return stripeProducts.filter(product => product.mode === mode);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

export const formatPriceIDR = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price * 15000); // Convert USD to IDR (approximate rate)
};