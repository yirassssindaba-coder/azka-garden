import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Eye, EyeOff, Leaf, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DeveloperLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [passkey, setPasskey] = useState('');
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      
      const userData = localStorage.getItem('azka_garden_user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'DEVELOPER') {
          navigate('/developer/portal');
        } else {
          throw new Error('Akses ditolak. Hanya pengembang yang dapat mengakses portal ini.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySubmit = () => {
    if (passkey === 'AZKA2024DEV') {
      setShowCredentials(true);
      setFormData({
        email: 'dev@azkagarden.com',
        password: 'Dev123!'
      });
    } else {
      alert('Passkey salah!');
      setPasskey('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold text-white">Azka Garden</span>
          </Link>
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Code className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Portal Pengembang</h2>
          <p className="mt-2 text-blue-200">Akses sistem untuk pengembang</p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email Pengembang
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="developer@azkagarden.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Password pengembang"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Memproses...' : 'Masuk ke Portal Pengembang'}
          </button>
        </form>

        {/* Demo Credentials with Passkey Protection */}
        <div className="bg-blue-900 bg-opacity-50 border border-blue-700 rounded-lg p-4">
          {!showCredentials ? (
            <div>
              <h3 className="text-sm font-medium text-blue-200 mb-3 flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Demo Credentials (Protected)
              </h3>
              <div className="flex space-x-2">
                <input
                  type="password"
                  placeholder="Masukkan passkey untuk melihat credentials"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 text-sm"
                />
                <button
                  type="button"
                  onClick={handlePasskeySubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Buka
                </button>
              </div>
              <p className="text-xs text-blue-300 mt-2">
                Hubungi administrator untuk mendapatkan passkey
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium text-blue-200 mb-3">Demo Credentials:</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-800 rounded border border-gray-600">
                  <div className="text-sm font-medium text-white">Pengembang</div>
                  <div className="text-xs text-blue-300">
                    Email: dev@azkagarden.com<br />
                    Password: Dev123!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/admin/login"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            Portal Administrator →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;