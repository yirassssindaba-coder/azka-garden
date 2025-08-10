import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Plant } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  plant: Plant;
}

const ProductCard: React.FC<ProductCardProps> = ({ plant }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity: 1
    });
  };

  return (
    <Link to={`/products/${plant.id}`} className="group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-white hover:-translate-y-1">
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button 
            onClick={handleAddToCart}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-green-50 hover:scale-110 transition-all duration-300 border border-white"
          >
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </button>
          <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all duration-300 border border-white">
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
          
          {/* Stock indicator */}
          {plant.stock <= 5 && plant.stock > 0 && (
            <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium border border-white">
              Stok Terbatas
            </div>
          )}
          
          {plant.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Stok Habis
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-black mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
            {plant.name}
          </h3>
          <p className="text-black text-sm mb-4 line-clamp-2 leading-relaxed">
            {plant.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              Rp {plant.price.toLocaleString('id-ID')}
            </span>
            <span className="text-xs text-black bg-green-100 px-3 py-1 rounded-full font-medium border border-white">
              {plant.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${
                plant.care_level === 'Sangat Mudah' ? 'bg-green-500' :
                plant.care_level === 'Mudah' ? 'bg-blue-500' :
                plant.care_level === 'Sedang' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
              <span className="text-black font-medium">{plant.care_level}</span>
            </div>
            <span className="text-black">Stok: {plant.stock}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;