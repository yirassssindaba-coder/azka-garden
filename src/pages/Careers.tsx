import React from 'react';
import { Briefcase, MapPin, Clock, Users, Heart, Leaf, Send } from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  requirements: string[];
  benefits: string[];
}

const Careers: React.FC = () => {
  const jobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Plant Care Specialist',
      department: 'Operations',
      location: 'Depok, Jawa Barat',
      type: 'Full-time',
      description: 'Bergabunglah dengan tim ahli tanaman kami untuk memberikan konsultasi dan perawatan terbaik kepada pelanggan.',
      requirements: [
        'Pengalaman minimal 2 tahun di bidang hortikultura',
        'Pengetahuan mendalam tentang tanaman hias indoor dan outdoor',
        'Kemampuan komunikasi yang baik',
        'Passion terhadap tanaman dan lingkungan'
      ],
      benefits: [
        'Gaji kompetitif + bonus performa',
        'Pelatihan berkelanjutan',
        'Lingkungan kerja yang menyenangkan',
        'Kesempatan belajar dari para ahli'
      ]
    },
    {
      id: '2',
      title: 'Content Creator & Social Media',
      department: 'Marketing',
      location: 'Depok, Jawa Barat',
      type: 'Full-time',
      description: 'Bantu kami membuat konten edukatif untuk YouTube channel dan media sosial Azka Garden dengan 13k+ subscriber.',
      requirements: [
        'Pengalaman video editing dan content creation',
        'Familiar dengan platform YouTube, Instagram, TikTok',
        'Kreatif dan up-to-date dengan tren digital',
        'Basic knowledge tentang tanaman hias'
      ],
      benefits: [
        'Peluang berkreasi dengan konten viral',
        'Akses ke equipment recording profesional',
        'Kolaborasi dengan influencer tanaman',
        'Bonus berdasarkan engagement'
      ]
    },
    {
      id: '3',
      title: 'Landscape Designer',
      department: 'Services',
      location: 'Depok & Jabodetabek',
      type: 'Contract',
      description: 'Desain dan implementasi proyek taman untuk residential dan commercial. Termasuk pembuatan kolam ikan.',
      requirements: [
        'Portfolio desain landscape yang menarik',
        'Pengalaman minimal 3 tahun',
        'Kemampuan menggunakan software desain',
        'Mobilitas tinggi untuk survey lokasi'
      ],
      benefits: [
        'Project fee yang menarik',
        'Fleksibilitas waktu kerja',
        'Kesempatan proyek besar',
        'Networking dengan developer'
      ]
    }
  ];

  const [selectedJob, setSelectedJob] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Briefcase className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Karir di Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Bergabunglah dengan keluarga besar Azka Garden dan wujudkan passion Anda di dunia tanaman hias
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Culture */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mengapa Bekerja di Azka Garden?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kami bukan hanya tempat kerja, tapi keluarga yang tumbuh bersama dalam dunia tanaman hias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <Heart className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Passion-Driven</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bekerja dengan orang-orang yang memiliki passion sama terhadap tanaman dan lingkungan hijau.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <Users className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tim Solid</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lingkungan kerja yang supportif dengan tim yang saling membantu dan berbagi ilmu.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <Leaf className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Berkembang Bersama</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kesempatan belajar dan berkembang dalam industri yang terus tumbuh di Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* Job Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Posisi Terbuka</h2>
          
          <div className="space-y-6">
            {jobPositions.map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {selectedJob === job.id ? 'Tutup' : 'Lihat Detail'}
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {job.description}
                  </p>
                  
                  {selectedJob === job.id && (
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Persyaratan:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Benefit:</h4>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <a
                          href="https://wa.me/6289635086182?text=Halo, saya tertarik dengan posisi Plant Care Specialist di Azka Garden"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Lamar Sekarang
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact HR */}
        <section>
          <div className="bg-green-50 dark:bg-green-900 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tidak Menemukan Posisi yang Cocok?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Kirim CV dan portfolio Anda. Kami selalu terbuka untuk talenta terbaik!
            </p>
            <a
              href="https://wa.me/6289635086182?text=Halo, saya ingin mengirim CV untuk bergabung dengan tim Azka Garden"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <Send className="h-5 w-5 mr-2" />
              Kirim CV via WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;