import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { Product } from '../data/productData';
import { X, GitCompare } from 'lucide-react';

interface CompareTrayProps {
  products: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onStart: () => void;
}

export const CompareTray: React.FC<CompareTrayProps> = ({ products, onRemove, onClear, onStart }) => {
  const { lang, t } = useLanguage();

  if (products.length === 0) return null;

  return (
    <div className="compare-tray">
      <div className="tray-container">
        <div className="tray-items">
          {products.map(p => (
            <div key={p.id} className="tray-item">
              <img src={p.image} alt={p.name[lang]} />
              <button className="item-remove" onClick={() => onRemove(p.id)}>
                <X size={12} />
              </button>
            </div>
          ))}
          {products.length < 3 && (
             <div className="tray-slot technical-grid-pattern">
               <GitCompare size={20} className="text-muted" />
             </div>
          )}
        </div>
        
        <div className="tray-actions">
          <button className="btn-text-s" onClick={onClear}>{t('clearAll')}</button>
          <button className="btn-primary-s" onClick={onStart} disabled={products.length < 2}>
            {t('startCompare')}
          </button>
        </div>
      </div>
    </div>
  );
};
