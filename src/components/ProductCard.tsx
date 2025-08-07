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
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            onClick={handleAddToCart}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-green-50 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </button>
          <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {plant.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {plant.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              Rp {plant.price.toLocaleString('id-ID')}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {plant.category}
            </span>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <span>Perawatan: {plant.care_level}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;