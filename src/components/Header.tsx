import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Package, User, LogOut, Shield, Menu, X, Sun, Moon, Monitor, Code } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import SmartSearchBar from './advanced/SmartSearchBar';

const Header: React.FC = () => {
  const location = useLocation();
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-5 w-5" />;
      case 'dark': return <Moon className="h-5 w-5" />;
      default: return <Monitor className="h-5 w-5" />;
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Azka Garden</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              Produk
            </Link>
            <Link
              to="/stripe-products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/stripe-products') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              Premium
            </Link>
            {isAuthenticated && (
              <Link
                to="/orders"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/orders') 
                    ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
                }`}
              >
                Pesanan
              </Link>
            )}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Admin Portal Link */}
            <Link 
              to="/admin/login"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
            >
              <Shield className="h-4 w-4 mr-1" />
              Portal Administrator
            </Link>
            
            {/* Developer Portal Link */}
            <Link 
              to="/developer/login"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              <Code className="h-4 w-4 mr-1" />
              Portal Pengembang
            </Link>
            
            {/* Orders Link for authenticated users */}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <Package className="h-5 w-5" />
              </Link>
            )}
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.fullName || user?.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border dark:border-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profil
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Pesanan
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Wishlist
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
                >
                  Registrasi
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Side - Theme + Cart + Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme Selector - Sebelah kiri hamburger */}
            <div className="relative group">
              <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {getThemeIcon()}
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <span>Terang</span>
                    </div>
                    {theme === 'light' && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>Gelap</span>
                    </div>
                    {theme === 'dark' && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4" />
                      <span>Sistem</span>
                    </div>
                    {theme === 'system' && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Cart for mobile */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SmartSearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {/* Navigation Links */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              🏠 Beranda
            </Link>
            
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              📦 Produk
            </Link>

            <Link
              to="/stripe-products"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/stripe-products') 
                  ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              👑 Premium
            </Link>

            {isAuthenticated && (
              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive('/orders') 
                    ? 'text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
                }`}
              >
                📋 Pesanan
              </Link>
            )}

            {/* Admin Portal Link */}
            <Link 
              to="/admin/login"
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
            >
              <Shield className="h-5 w-5 mr-3" />
              Portal Administrator
            </Link>

            {/* Developer Portal Link */}
            <Link 
              to="/developer/login"
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              <Code className="h-5 w-5 mr-3" />
              Portal Pengembang
            </Link>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.fullName || user?.email}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</div>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                >
                  👤 Profil
                </Link>
                
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                >
                  ❤️ Wishlist
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Keluar
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                >
                  🔑 Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 bg-green-600 dark:bg-green-700 text-white text-base font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-center"
                >
                  📝 Registrasi
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;