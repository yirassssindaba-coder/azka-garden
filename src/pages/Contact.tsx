import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, ExternalLink, Mail, Clock, Send, Leaf } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-800 dark:to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">Hubungi Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Kami siap membantu Anda dengan konsultasi tanaman, pemesanan, atau pertanyaan apapun
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Informasi Kontak</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Alamat Toko</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Jl. Raya KSU, Tirtajaya<br />
                    Kec. Sukmajaya, Kota Depok<br />
                    Jawa Barat 16412, Indonesia
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/j5AuLF1AZ3VVgovcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                  >
                    Buka di Google Maps
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Telepon & WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">0896-3508-6182</p>
                  <a 
                    href="https://wa.me/6289635086182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                  >
                    Chat WhatsApp
                    <MessageCircle className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">info@azkagarden.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Jam Operasional</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Buka 24 Jam Setiap Hari<br />
                    Konsultasi & Pemesanan
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/6289635086182"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
              <a
                href="tel:+6289635086182"
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Telepon
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Masukkan email Anda"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subjek *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="konsultasi">Konsultasi Tanaman</option>
                    <option value="pemesanan">Pemesanan Tanaman</option>
                    <option value="jasa-taman">Jasa Pembuatan Taman</option>
                    <option value="kolam">Jasa Pembuatan Kolam</option>
                    <option value="keluhan">Keluhan atau Saran</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Mengirim...'
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;