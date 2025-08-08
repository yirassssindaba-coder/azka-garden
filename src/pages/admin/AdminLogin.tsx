import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = {
    admin: {
      email: 'admin@azkagarden.com',
      password: 'admin123',
      role: 'admin'
    },
    developer: {
      email: 'dev@azkagarden.com',
      password: 'dev123',
      role: 'developer'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      const { email, password, role } = credentials;
      
      if (role === 'admin' && 
          email === demoCredentials.admin.email && 
          password === demoCredentials.admin.password) {
        localStorage.setItem('adminToken', 'admin-token-123');
        localStorage.setItem('adminRole', 'admin');
        navigate('/admin/dashboard');
      } else if (role === 'developer' && 
                 email === demoCredentials.developer.email && 
                 password === demoCredentials.developer.password) {
        localStorage.setItem('adminToken', 'dev-token-123');
        localStorage.setItem('adminRole', 'developer');
        navigate('/admin/developer');
      } else {
        setError('Email atau password salah');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (type: 'admin' | 'developer') => {
    setCredentials({
      email: demoCredentials[type].email,
      password: demoCredentials[type].password,
      role: type
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
            <p className="text-gray-600">Azka Garden Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login Sebagai
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCredentials(prev => ({ ...prev, role: 'admin' }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    credentials.role === 'admin'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Shield className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Administrator</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCredentials(prev => ({ ...prev, role: 'developer' }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    credentials.role === 'developer'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">Developer</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan email admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              {isLoading ? 'Memproses...' : 'Masuk ke Portal'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">Administrator</div>
                <div className="text-xs text-gray-600">admin@azkagarden.com / admin123</div>
              </button>
              <button
                onClick={() => handleDemoLogin('developer')}
                className="w-full text-left p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">Developer</div>
                <div className="text-xs text-gray-600">dev@azkagarden.com / dev123</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;