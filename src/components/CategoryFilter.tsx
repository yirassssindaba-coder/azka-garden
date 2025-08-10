import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Kategori</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? 'bg-green-100 text-green-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Semua Kategori
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-100 text-green-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;