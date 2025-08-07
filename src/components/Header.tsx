import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Search, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">PlantShop</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Produk
            </Link>
            <Link
              to="/orders"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/orders') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              Pesanan
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/orders"
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Package className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;