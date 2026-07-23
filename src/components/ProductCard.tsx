import { Check, GitCompare, Info, Plus } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import type { Product } from '../data/productData';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onCompare: (product: Product) => void;
  isCompared: boolean;
}

export function ProductCard({ product, onViewDetails, onCompare, isCompared }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { toggleProduct, selectedProducts } = useInquiry();
  const isSelected = selectedProducts.some((item) => item.productId === product.id);

  return (
    <article className="product-card">
      <button
        aria-label={`${t('viewDetails')}: ${product.name[lang]}`}
        className="card-image-button"
        onClick={() => onViewDetails(product)}
        type="button"
      >
        <img alt={product.name[lang]} className="card-image" src={product.image} />
        <span className="image-detail-cue"><Info aria-hidden="true" size={16} />{t('viewDetails')}</span>
      </button>

      <div className="card-info">
        <h3 className="card-title">{product.name[lang]}</h3>
        <div className="card-specs">
          <span className="technical-tag">{product.material}</span>
          <span className="technical-tag">{product.height}</span>
        </div>
        <div className="card-actions card-actions-complete">
          <button className="btn-card-detail" onClick={() => onViewDetails(product)} type="button">
            <Info aria-hidden="true" size={16} /><span>{t('viewDetails')}</span>
          </button>
          <button
            aria-pressed={isSelected}
            className={`btn-action ${isSelected ? 'active' : ''}`}
            onClick={() => toggleProduct(product.id, product.name)}
            type="button"
          >
            {isSelected ? <Check aria-hidden="true" size={16} /> : <Plus aria-hidden="true" size={16} />}
            <span>{t('addToInquiry')}</span>
          </button>
          <button
            aria-pressed={isCompared}
            className={`btn-card-compare ${isCompared ? 'active' : ''}`}
            onClick={() => onCompare(product)}
            type="button"
          >
            <GitCompare aria-hidden="true" size={16} />
            <span>{isCompared ? t('removeCompare') : t('addCompare')}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
