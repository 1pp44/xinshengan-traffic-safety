import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { Product } from '../data/productData';
import { X } from 'lucide-react';

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({ product, onClose }) => {
  const { lang, t } = useLanguage();

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="drawer-body">
          <div className="drawer-image-section">
            <img src={product.image} alt={product.name[lang]} className="drawer-image" />
          </div>
          
          <div className="drawer-info-section">
            <h2 className="drawer-title">{product.name[lang]}</h2>
            
            <div className="technical-grid">
              <div className="tech-item">
                <span className="tech-label">{t('material')}</span>
                <span className="tech-value">{product.material}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">{t('height')}</span>
                <span className="tech-value">{product.height}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">{t('topDiameter')}</span>
                <span className="tech-value">{product.top}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">{t('baseDiameter')}</span>
                <span className="tech-value">{product.base}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">{t('reflectiveBand')}</span>
                <span className="tech-value">{product.band[lang]}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">{t('screwStatus')}</span>
                <span className="tech-value">{product.screwNote[lang]}</span>
              </div>
            </div>
            
            <div className="drawer-disclaimer">
              <p>{t('disclaimer')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
