import { Box, Check, GitCompare, Plus, SlidersHorizontal, View, X } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import type { Product } from '../data/productData';

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
  onCompare: (product: Product) => void;
  isCompared: boolean;
}

export function ProductDrawer({ product, onClose, onCompare, isCompared }: ProductDrawerProps) {
  const { lang, t } = useLanguage();
  const { selectedProducts, toggleProduct } = useInquiry();
  if (!product) return null;
  const isSelected = selectedProducts.some((item) => item.productId === product.id);

  const goTo = (id: string) => {
    onClose();
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 40);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <section aria-labelledby="drawer-title" aria-modal="true" className="drawer-content" onClick={(event) => event.stopPropagation()} role="dialog">
        <button aria-label={t('close')} className="drawer-close" onClick={onClose} type="button"><X aria-hidden="true" size={22} /></button>
        <div className="drawer-body">
          <div className="drawer-image-section"><img alt={product.name[lang]} className="drawer-image" src={product.image} /></div>
          <div className="drawer-info-section">
            <span className="drawer-kicker"><Box aria-hidden="true" size={15} />{t('details')}</span>
            <h2 className="drawer-title" id="drawer-title">{product.name[lang]}</h2>
            <div className="technical-grid">
              {[
                [t('material'), product.material],
                [t('height'), product.height],
                [t('topDiameter'), product.top],
                [t('baseDiameter'), product.base],
                [t('reflectiveBand'), product.band[lang]],
                [t('screwStatus'), product.screwNote[lang]],
              ].map(([label, value]) => (
                <div className="tech-item" key={label}><span className="tech-label">{label}</span><span className="tech-value">{value}</span></div>
              ))}
            </div>
            <p className="drawer-disclaimer">{t('disclaimer')}</p>

            <div className="drawer-next-actions" aria-label={t('nextStep')}>
              <button aria-pressed={isSelected} className="btn-primary drawer-primary" onClick={() => toggleProduct(product.id, product.name)} type="button">
                {isSelected ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}<span>{t('addToInquiry')}</span>
              </button>
              <button aria-pressed={isCompared} className="btn-outline" onClick={() => onCompare(product)} type="button">
                <GitCompare aria-hidden="true" size={17} /><span>{isCompared ? t('removeCompare') : t('addCompare')}</span>
              </button>
              <button className="btn-outline" onClick={() => goTo('showroom')} type="button"><View aria-hidden="true" size={17} /><span>{t('go3d')}</span></button>
              <button className="btn-outline" onClick={() => goTo('configure')} type="button"><SlidersHorizontal aria-hidden="true" size={17} /><span>{t('goConfigure')}</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
