export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number; // Price in USD
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1Rtp3SRMKiPOXCTjlAUBfQiI',
    name: 'Pucuk Merah (tinggi 250 cm)',
    description: 'Tanaman pucuk merah tinggi yang sering digunakan sebagai pagar hidup atau dekorasi taman, memberikan warna cerah yang menarik dan menambah estetika lingkungan.',
    mode: 'subscription',
    price: 23.33
  },
  {
    priceId: 'price_1Rtp2xRMKiPOXCTjodrtpXq4',
    name: 'Kadaka Tempel',
    description: 'Tanaman hias dengan daun menarik yang mudah dirawat dan sesuai untuk taman tropis maupun sebagai tanaman pagar hidup.',
    mode: 'subscription',
    price: 2.33
  },
  {
    priceId: 'price_1Rtp2JRMKiPOXCTjWJfTQAoM',
    name: 'Sikas (tinggi 70 cm)',
    description: 'Tanaman sikas berukuran besar yang cocok sebagai tanaman hias eksklusif dengan perawatan khusus.',
    mode: 'subscription',
    price: 113.33
  },
  {
    priceId: 'price_1Rtp1pRMKiPOXCTjdNanO3U8',
    name: 'Asoka Singapur',
    description: 'Tanaman berbunga kecil yang populer sebagai pagar hidup, mudah dirawat dan sesuai untuk pemula.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1Rtp0iRMKiPOXCTjySp3MkkZ',
    name: 'Jeruk Lemon',
    description: 'Tanaman buah jeruk lemon kecil yang memberikan aroma segar dan cocok untuk taman maupun kebun rumah.',
    mode: 'subscription',
    price: 4.00
  },
  {
    priceId: 'price_1RtoziRMKiPOXCTjEwDYEVT6',
    name: 'Jambu Kanci (tinggi 50 cm)',
    description: 'Tanaman buah jambu kanci kecil yang juga dapat dijadikan tanaman hias, cocok untuk taman dan kebun rumah.',
    mode: 'subscription',
    price: 4.00
  },
  {
    priceId: 'price_1Rtoz7RMKiPOXCTj75KFAev3',
    name: 'Bunga Kertas',
    description: 'Tanaman hias dengan warna-warni cerah yang mudah dirawat dan cocok untuk memperindah pagar atau taman. Tanaman ini sangat sesuai bagi pemula.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtoxQRMKiPOXCTjoKPvob23',
    name: 'Bonsai Cemara Udang',
    description: 'Bonsai cemara unik yang menyerupai udang dan merupakan tanaman koleksi menarik dengan perawatan khusus.',
    mode: 'subscription',
    price: 43.33
  },
  {
    priceId: 'price_1Rtow8RMKiPOXCTjjTQ02NO9',
    name: 'Bonsai Gestrum Ukuran M',
    description: 'Bonsai berukuran sedang dengan daun Gestrum yang cantik, memberikan kesan elegan di rumah atau kantor.',
    mode: 'subscription',
    price: 33.33
  },
  {
    priceId: 'price_1RtovMRMKiPOXCTjRbMuMGMu',
    name: 'Bonsai Gestrum Ukuran L',
    description: 'Bonsai besar dengan daun Gestrum yang indah, cocok untuk koleksi eksklusif dengan perawatan khusus.',
    mode: 'subscription',
    price: 80.00
  },
  {
    priceId: 'price_1RtouhRMKiPOXCTjP4FStO1I',
    name: 'Kaktus Koboy (tinggi 70 cm)',
    description: 'Kaktus besar berbentuk unik yang tahan kering dan mudah dirawat, sangat cocok untuk dekorasi rumah.',
    mode: 'subscription',
    price: 10.00
  },
  {
    priceId: 'price_1RtotORMKiPOXCTjNMMepqS3',
    name: 'Marigool',
    description: 'Tanaman berbunga oranye cerah yang populer sebagai tanaman hias dan penangkal serangga di taman rumah.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1Rtos9RMKiPOXCTjDzfHWWHg',
    name: 'Bringin Korea Micro',
    description: 'Varian kecil dari Bringin Korea yang cocok untuk koleksi bonsai dengan bentuk daun menarik dan perawatan mudah.',
    mode: 'subscription',
    price: 100.00
  },
  {
    priceId: 'price_1RtorNRMKiPOXCTjzpVhKiPw',
    name: 'Lidah Mertua',
    description: 'Tanaman hias indoor dengan daun panjang tajam yang mudah dirawat dan sesuai untuk dekorasi meja atau rak tanaman.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RtoqaRMKiPOXCTjnY1NHYX1',
    name: 'Pandan Bali',
    description: 'Tanaman pandan beraroma khas yang digunakan sebagai tanaman hias dan bumbu dapur di daerah tropis.',
    mode: 'subscription',
    price: 10.00
  },
  {
    priceId: 'price_1Rtoq2RMKiPOXCTj1ADbBdxW',
    name: 'Asoka India',
    description: 'Tanaman berbunga kecil yang sering digunakan sebagai pagar hidup, mudah dirawat dan sesuai untuk pemula.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RtopARMKiPOXCTjYMd9PNAT',
    name: 'Bromelian Baby Pink',
    description: 'Bromeliad dengan bunga pink kecil yang cantik, menjadi favorit tanaman eksotis untuk dekorasi interior.',
    mode: 'subscription',
    price: 8.33
  },
  {
    priceId: 'price_1RtooIRMKiPOXCTjg2ekY73L',
    name: 'Bringin Putih',
    description: 'Tanaman hias dengan daun putih hijau yang menawan, memberikan kesan elegan untuk taman dan halaman.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1Rton5RMKiPOXCTjQo0rMpzY',
    name: 'Kamboja Jepang',
    description: 'Tanaman hias berbunga cantik dan harum yang sering digunakan sebagai tanaman pekarangan di daerah tropis.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1RtomURMKiPOXCTjjUVcD5eQ',
    name: 'Jamani Cobra',
    description: 'Tanaman hias eksotis dengan bentuk unik dan harga tinggi, sangat cocok untuk koleksi tanaman langka.',
    mode: 'subscription',
    price: 20.00
  },
  {
    priceId: 'price_1RtoltRMKiPOXCTjIQWSbsg5',
    name: 'Media Tanah',
    description: 'Media tanam berkualitas tinggi yang mendukung pertumbuhan berbagai tanaman hias dan dapat digunakan untuk tanaman dalam pot maupun di tanah terbuka.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1Rtol0RMKiPOXCTjCUmup76M',
    name: 'Berekele',
    description: 'Tanaman hias yang menambah warna dan tekstur pada taman tropis maupun sebagai tanaman pagar hidup.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1RtojBRMKiPOXCTj94WqCsIN',
    name: 'Ketapang Kaligata Tinggi 60 cm',
    description: 'Tanaman hias kecil dengan daun khas yang memberikan kesan asri, sangat sesuai untuk taman minimalis.',
    mode: 'subscription',
    price: 2.33
  },
  {
    priceId: 'price_1RtnugRMKiPOXCTjat94kaJb',
    name: 'Pitalub Tinggi 70 cm',
    description: 'Tanaman hias berukuran sedang dengan daun lebat, mudah dirawat dan sesuai sebagai penghias taman, khususnya bagi pemula.',
    mode: 'subscription',
    price: 5.33
  },
  {
    priceId: 'price_1RtntuRMKiPOXCTjGlpaurNW',
    name: 'Cemara Tretes (tinggi 120 cm)',
    description: 'Tanaman cemara mini yang memberikan kesan asri dan elegan, sangat cocok untuk taman dan penghias ruang luar.',
    mode: 'subscription',
    price: 16.67
  },
  {
    priceId: 'price_1RtnseRMKiPOXCTjkVlCDpg5',
    name: 'Pot Hitam Diameter 40 cm',
    description: 'Pot plastik hitam berukuran besar yang tahan lama dan ideal untuk tanaman hias berukuran sedang hingga besar. Pot ini dapat digunakan di dalam maupun luar ruangan.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RtnrcRMKiPOXCTjfq20KaNZ',
    name: 'Pot Tanah Coklat, Putih, dan Bintik Hitam (diameter 30 cm)',
    description: 'Pot tanah liat minimalis yang sesuai untuk berbagai tanaman hias.',
    mode: 'subscription',
    price: 4.33
  },
  {
    priceId: 'price_1RtnqlRMKiPOXCTjr0uKU87v',
    name: 'Pot Kapsul Coklat dan Hitam (diameter 35 cm, tinggi 60 cm)',
    description: 'Pot dengan desain kapsul elegan yang cocok untuk tanaman besar atau bonsai.',
    mode: 'subscription',
    price: 5.67
  },
  {
    priceId: 'price_1RtnqBRMKiPOXCTj9TcmaOMF',
    name: 'Aglonema Valentin',
    description: 'Tanaman hias dengan daun hijau-merah muda yang populer untuk dekorasi interior dan mudah tumbuh subur di tempat teduh.',
    mode: 'subscription',
    price: 4.67
  },
  {
    priceId: 'price_1RtnpfRMKiPOXCTjcZYr9HL9',
    name: 'Pitalub Kecil',
    description: 'Tanaman hias kecil dengan daun lebat berwarna hijau, cocok sebagai penghias meja atau sudut ruangan, mudah dirawat dan sesuai untuk pemula.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtnosRMKiPOXCTjg8W6kU4m',
    name: 'Sarbena Hijau',
    description: 'Varian tanaman hias dengan daun hijau cerah yang memberikan kesan segar dan alami pada ruang hijau.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RtnoMRMKiPOXCTjlUxeVCDx',
    name: 'Sarbena Putih (Sabrina)',
    description: 'Tanaman hias gantung dengan bunga putih kecil yang menawan, ideal untuk taman minimalis atau teras rumah.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RtnnqRMKiPOXCTj3sDhz81k',
    name: 'Alamanda Kuning (Allamanda cathartica)',
    description: 'Tanaman hias berbunga terompet emas berwarna kuning cerah dengan diameter 5–7,5 cm, populer untuk taman dan pagar hidup.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1RtnnJRMKiPOXCTjgnFpaVAA',
    name: 'Jayen (Episcia)',
    description: 'Tanaman hias indoor dengan daun berbentuk hati dan bunga kecil berwarna cerah, cocok untuk dekorasi meja atau rak tanaman dalam ruangan.',
    mode: 'subscription',
    price: 5.33
  },
  {
    priceId: 'price_1Rtnm9RMKiPOXCTjVdfWZKmA',
    name: 'Kadaka Tanduk (Platycerium)',
    description: 'Tanaman paku-pakuan epifit yang biasanya hidup menempel pada batang tanaman lain, namun dapat juga ditanam dalam pot dan umum ditemukan di daerah lembap.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtnkrRMKiPOXCTjeNTzxc5V',
    name: 'Maranti Bali (Stromanthe sanguinea)',
    description: 'Tanaman hias tropis dari hutan hujan Brasil yang memiliki daun berwarna-warni merah, hijau, dan putih mencolok, sangat populer di kalangan penggemar tanaman hias.',
    mode: 'subscription',
    price: 1.00
  },
  {
    priceId: 'price_1Rtnk1RMKiPOXCTjmKp6q5HH',
    name: 'Batu Taman Hitam dan Putih',
    description: 'Batu hias yang digunakan untuk dekorasi taman, tersedia dalam warna hitam dan putih yang memberikan kontras alami dan estetis pada taman.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtnjKRMKiPOXCTjTaj5Xhwq',
    name: 'Airis Brazil (Iris variegata)',
    description: 'Tanaman hias outdoor dengan daun panjang hijau cerah bergaris putih yang memberikan tampilan segar dan menarik, cocok untuk taman dan pot.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RtnilRMKiPOXCTjDjbUE1En',
    name: 'Teratai (Nymphaea)',
    description: 'Tanaman air dengan bunga besar indah yang mengapung di permukaan air. Warnanya bervariasi dari putih, merah muda hingga ungu, sering digunakan untuk mempercantik kolam atau taman air.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1Rtnf6RMKiPOXCTjWxBVom5R',
    name: 'Kana (Canna indica)',
    description: 'Tanaman tropis dengan daun lebar hijau cerah dan bunga besar berwarna merah, kuning, atau oranye yang mencolok. Tumbuh hingga 1–2 meter, cocok untuk taman dan halaman, tahan berbagai kondisi cuaca dan mudah dirawat sehingga sesuai untuk pemula.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtneRMKiPOXCTjC4KORKCP',
    name: 'Sampang Dara (Excoecaria cochinchinensis)',
    description: 'Perdu tropis dengan daun hijau cerah di bagian atas dan merah gelap di bagian bawah, tumbuh hingga 1–2 meter. Memberikan tampilan alami dan eksotis, tanaman ini cocok untuk taman indoor maupun outdoor. Perlu hati-hati karena getahnya beracun saat perawatan.',
    mode: 'subscription',
    price: 1.07
  },
  {
    priceId: 'price_1RtndQRMKiPOXCTjiPzmbBQ6',
    name: 'Siklok (Agave attenuata)',
    description: 'Foxtail Agave adalah tanaman sukulen asal Meksiko dengan daun panjang runcing berwarna hijau keabu-abuan dengan pinggiran putih membentuk roseta yang elegan. Tahan terhadap panas dan kekeringan, cocok untuk taman tropis maupun subtropis serta perawatan mudah.',
    mode: 'subscription',
    price: 4.67
  },
  {
    priceId: 'price_1RtncYRMKiPOXCTjUCOpR0kB',
    name: 'Brokoli Hijau',
    description: 'Tanaman hias dengan daun hijau segar yang menyerupai sayur brokoli. Tanaman ini sering digunakan sebagai tanaman hias unik yang menambah sentuhan alami pada taman atau ruangan.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1Rtn6RMKiPOXCTjpaTZT2Sw',
    name: 'Gestrum Kuning (Gestrum coromandelianum)',
    description: 'Tanaman tropis dengan bunga kuning cerah dan daun hijau lebat yang dapat tumbuh hingga 2 meter. Tanaman ini cocok untuk taman atau halaman rumah, tahan berbagai kondisi cuaca dan mudah dirawat.',
    mode: 'subscription',
    price: 2.00
  },
  {
    priceId: 'price_1RtnZMRMKiPOXCTjxw9d5cXy',
    name: 'Bringin Korea (Ficus microcarpa)',
    description: 'Tanaman hias populer untuk taman dan interior dengan tinggi sekitar 2 meter, batang kokoh, dan daun hijau mengkilap yang memberikan suasana alami dan sejuk. Tanaman ini mudah beradaptasi dengan berbagai kondisi cahaya dan perawatan sehingga cocok untuk pemula maupun penghobi.',
    mode: 'subscription',
    price: 133.33
  },
  {
    priceId: 'price_1RtnVZRMKiPOXCTjF9scowcG',
    name: 'Cemara Perak (Juniperus chinensis)',
    description: 'Tanaman konifer hijau kekuningan berbentuk rimbun menyerupai pohon cemara mini. Tanaman ini cocok untuk taman, halaman, maupun sebagai tanaman indoor, memberikan kesan alami dan segar.',
    mode: 'subscription',
    price: 3.33
  },
  {
    priceId: 'price_1RtnUHRMKiPOXCTjn53EGg34',
    name: 'Puting Cabe (Euphorbia milii)',
    description: 'Tanaman hias berbunga dari keluarga Euphorbiaceae yang memiliki bunga kecil cerah serta duri tajam pada batangnya. Daunnya hijau rapat dengan bunga muncul dalam kelompok kecil, menciptakan tampilan eksotis. Tanaman ini tahan terhadap cahaya rendah hingga sedang dan mampu bertahan dalam kondisi kering berkat cadangan air pada batangnya.',
    mode: 'subscription',
    price: 0.67
  },
  {
    priceId: 'price_1RtnT2RMKiPOXCTjxOibVUOJ',
    name: 'Pot Tanah Liat diameter 15 cm',
    description: 'Dibuat dari bahan tanah liat berkualitas tinggi dengan design minimalis yang sesuai untuk berbagai tanaman hias kecil hingga sedang. Pot ini tersedia dalam warna coklat, hitam, dan putih, memberikan pilihan dekorasi menarik serta harga terjangkau untuk menambah estetika tanaman di rumah Anda.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RtnRxRMKiPOXCTj0kq7Ylwb',
    name: 'Cemara Ekor Tupai (Asparagus densiflorus)',
    description: 'Tanaman tahunan hijau abadi dari keluarga Asparagaceae yang berasal dari Afrika Selatan. Daunnya menyerupai ekor tupai dengan daun kecil berwarna hijau cerah yang tumbuh rimbun dan mengerucut. Tanaman ini cocok sebagai tanaman hias interior karena toleransi terhadap cahaya rendah hingga sedang serta kemampuannya bertahan pada kondisi kering.',
    mode: 'subscription',
    price: 2.67
  },
  {
    priceId: 'price_1RtnPvRMKiPOXCTjirTLTcxe',
    name: 'Kuping Gajah (Anthurium crystallinum)',
    description: 'Varietas Anthurium dari keluarga Araceae dengan daun besar berbentuk hati dan permukaan berkilau. Urat daun berwarna keputih-putihan yang mencolok menambah kesan elegan dan eksotis. Tanaman ini cocok untuk dekorasi interior, memiliki toleransi terhadap cahaya rendah hingga sedang serta tahan pada periode kekeringan.',
    mode: 'subscription',
    price: 5.00
  },
  {
    priceId: 'price_1RtnPDRMKiPOXCTj6EJnSnRs',
    name: 'Pakis Kuning (Nephrolepis exaltata \'Golden\')',
    description: 'Varietas pakis hias yang memiliki daun muda berwarna kuning cerah yang berubah menjadi hijau saat dewasa. Daunnya berbentuk pedang dan tumbuh merumpun, menciptakan tampilan alami dan menyegarkan. Tanaman ini ideal ditempatkan di area teduh dengan cahaya matahari tidak langsung dan mudah dirawat, memberikan sentuhan hijau segar pada lingkungan sekitar.',
    mode: 'subscription',
    price: 1.67
  },
  {
    priceId: 'price_1RtnN1RMKiPOXCTjiy6FzZOQ',
    name: 'Dragon Sekel (Alocasia baginda \'Dragon Scale\')',
    description: 'Varietas Alocasia dari keluarga Araceae yang terkenal dengan motif daun unik menyerupai sisik naga. Daunnya hijau zamrud dengan urat perak metalik yang mencolok, memberikan kesan eksotis dan elegan. Tanaman ini sangat cocok untuk dekorasi interior karena toleransinya terhadap cahaya rendah hingga sedang serta kemampuannya bertahan dalam kondisi kering.',
    mode: 'subscription',
    price: 8.33
  },
  {
    priceId: 'price_1Rtl1PRMKiPOXCTjtcdq9Sa1',
    name: 'Jamani Dolar (Zamioculcas zamiifolia)',
    description: 'Tanaman perennial tropis dari keluarga Araceae yang berasal dari Afrika Timur seperti Kenya, Tanzania, dan Afrika Selatan. Tumbuh dari rimpang tebal yang menyimpan cadangan air, tanaman ini menghasilkan daun majemuk menyirip berwarna hijau pekat dan mengkilap dengan 6–8 pasang foliol oval sepanjang 7–15 cm. ZZ Plant sangat toleran terhadap cahaya rendah hingga sedang dan mampu bertahan lama dalam kondisi kekeringan.',
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