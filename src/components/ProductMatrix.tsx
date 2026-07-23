import React, { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { products, Product } from '../data/productData';
import { ProductCard } from './ProductCard';
import { ProductDrawer } from './ProductDrawer';
import { Reveal } from './Reveal';

interface ProductMatrixProps {
  onCompare: (product: Product) => void;
  comparedIds: string[];
}

export const ProductMatrix: React.FC<ProductMatrixProps> = ({ onCompare, comparedIds }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filters = [
    { id: 'all', label: t('all') },
    { id: 'Plastic', label: t('plastic') },
    { id: 'Soft Plastic', label: t('softPlastic') },
    { id: 'PU', label: t('pu') },
    { id: 'EVA', label: t('eva') },
    { id: 'Chain', label: t('chain') }
  ];

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'Chain') return p.name.en.toLowerCase().includes('chain');
    return p.material === filter;
  });

  return (
    <section id="products" className="product-matrix-section">
      <div className="section-header">
        <Reveal>
          <h2 className="section-title">{t('products')}</h2>
        </Reveal>
        
        <div className="filter-rail">
          {filters.map(f => (
            <button 
              key={f.id}
              className={`filter-btn ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Reveal key={product.id}>
            <ProductCard 
              product={product} 
              onViewDetails={setSelectedProduct}
              onCompare={onCompare}
              isCompared={comparedIds.includes(product.id)}
            />
          </Reveal>
        ))}
      </div>

      <ProductDrawer
        isCompared={selectedProduct ? comparedIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onCompare={onCompare}
        product={selectedProduct}
      />
    </section>
  );
};
