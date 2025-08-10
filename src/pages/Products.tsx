import React, { useEffect, useState } from 'react';
import PlantCatalogGrid from '../components/catalog/PlantCatalogGrid';

const Products: React.FC = () => {
  return (
    <PlantCatalogGrid 
      title="Katalog Lengkap Tanaman Hias Azka Garden"
      showFilters={true}
    />
  );
};

export default Products;