import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Leaf, CheckCircle, Shield, Clock, MessageCircle } from 'lucide-react';
import { authService } from '../services/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await authService.resetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <Leaf className="h-10 w-10 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Azka Garden</span>
            </Link>
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Email Terkirim!
            </h2>
            <p className="text-gray-600 mb-8">
              Kami telah mengirim link reset password ke email Anda. Silakan cek inbox dan ikuti instruksi untuk mereset password.
            </p>
            
            {/* Additional Information */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Langkah Selanjutnya:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>Cek email Anda (termasuk folder spam)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span>Link berlaku selama 1 jam</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Gunakan password yang kuat untuk keamanan</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors block text-center"
              >
                Kembali ke Login
              </Link>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="w-full text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
              >
                Kirim Ulang Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Leaf className="h-10 w-10 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Azka Garden</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Lupa Password?
          </h2>
          <p className="text-gray-600">
            Masukkan email Anda dan kami akan mengirim link untuk mereset password
          </p>
        </div>

        <div className="bg-white border border-green-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan email Anda"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali ke Login
            </Link>
          </div>
        </div>

        {/* Help Information */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 mb-3">Bantuan Reset Password:</h3>
          <div className="text-xs text-green-700 space-y-2">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-3 w-3" />
              <span>Hubungi customer service jika tidak menerima email</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>Proses pengiriman email maksimal 5 menit</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <h4 className="text-sm font-medium text-green-800 mb-2">Demo Users untuk Testing:</h4>
            <p>• customer@azkagarden.com (Customer)</p>
            <p>• admin@azkagarden.com (Administrator)</p>
            <p>• dev@azkagarden.com (Developer)</p>
          </div>
        </div>
        
        {/* Contact Support */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Butuh bantuan?</p>
          <a
            href="https://wa.me/6289635086182"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Hubungi Customer Service
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;