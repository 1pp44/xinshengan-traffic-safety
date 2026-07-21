import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { Product } from '../data/productData';
import { X } from 'lucide-react';

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ products, onClose }) => {
  const { lang, t } = useLanguage();

  if (products.length === 0) return null;

  const specs = [
    { key: 'material', label: t('material'), val: (p: Product) => p.material },
    { key: 'height', label: t('height'), val: (p: Product) => p.height },
    { key: 'top', label: t('topDiameter'), val: (p: Product) => p.top },
    { key: 'base', label: t('baseDiameter'), val: (p: Product) => p.base },
    { key: 'band', label: t('reflectiveBand'), val: (p: Product) => p.band[lang] },
    { key: 'screw', label: t('screwStatus'), val: (p: Product) => p.screwNote[lang] }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="comparison-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t('compare')}</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th></th>
                {products.map(p => (
                  <th key={p.id}>
                    <img src={p.image} alt={p.name[lang]} className="comp-img" />
                    <div className="comp-name">{p.name[lang]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(s => (
                <tr key={s.key}>
                  <td className="spec-label">{s.label}</td>
                  {products.map(p => (
                    <td key={p.id}>{s.val(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
