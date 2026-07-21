import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import { Product } from '../data/productData';
import { Plus, Info, GitCompare } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onCompare, isCompared }) => {
  const { lang, t } = useLanguage();
  const { toggleProduct, selectedProducts } = useInquiry();
  
  const isSelected = selectedProducts.some(p => p.productId === product.id);

  return (
    <div className="product-card">
      <div className="card-image-wrapper" onClick={() => onViewDetails(product)}>
        <img src={product.image} alt={product.name[lang]} className="card-image" />
        <div className="card-overlay">
          <button className="btn-icon" onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}>
            <Info size={20} />
          </button>
        </div>
      </div>
      
      <div className="card-info">
        <h3 className="card-title">{product.name[lang]}</h3>
        <div className="card-specs">
          <span className="technical-tag">{product.material}</span>
          <span className="technical-tag">{product.height}</span>
        </div>
        
        <div className="card-actions">
          <button 
            className={`btn-action ${isSelected ? 'active' : ''}`}
            onClick={() => toggleProduct(product.id, product.name)}
          >
            <Plus size={16} />
            <span>{t('addToInquiry')}</span>
          </button>
          <button 
            className={`btn-icon-s ${isCompared ? 'active' : ''}`}
            onClick={() => onCompare(product)}
            title={t('compare')}
          >
            <GitCompare size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
