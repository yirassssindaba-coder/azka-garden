import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff, Leaf, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [passkey, setPasskey] = useState('');
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(credentials.email, credentials.password);
      
      // Get user data to determine redirect
      const userData = localStorage.getItem('azka_garden_user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          throw new Error('Akses ditolak. Hanya administrator yang dapat mengakses portal ini.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySubmit = () => {
    if (passkey === 'AZKA2024ADMIN') {
      setShowCredentials(true);
      setCredentials({
        email: 'admin@azkagarden.com',
        password: 'Admin123!'
      });
    } else {
      alert('Passkey salah!');
      setPasskey('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portal Administrator</h1>
            <p className="text-gray-600 dark:text-gray-400">Azka Garden Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Administrator
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => {
                  setCredentials(prev => ({ ...prev, email: e.target.value }));
                  if (error) clearError();
                }}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan email administrator"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials(prev => ({ ...prev, password: e.target.value }));
                    if (error) clearError();
                  }}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Masuk ke Portal Administrator'}
            </button>
          </form>

          {/* Demo Credentials with Passkey Protection */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {!showCredentials ? (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Demo Credentials (Protected)
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    placeholder="Masukkan passkey untuk melihat credentials"
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={handlePasskeySubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Buka
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Hubungi developer untuk mendapatkan passkey
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Demo Credentials:</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-gray-600 rounded border">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Administrator</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Email: admin@azkagarden.com<br />
                      Password: Admin123!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 text-sm"
            >
              <Leaf className="h-4 w-4 mr-1" />
              Kembali ke Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;