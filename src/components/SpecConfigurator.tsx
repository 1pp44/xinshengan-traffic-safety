import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import { Reveal } from './Reveal';

export function SpecConfigurator() {
  const { t } = useLanguage();
  const { config, selectedProducts, updateConfig } = useInquiry();

  const options = {
    material: ['Plastic', 'Soft Plastic', 'PU', 'EVA'],
    height: ['45cm', '65cm', '68cm', '70cm', '73cm', '75cm', '90cm', '95cm', '110cm'],
    band: ['Reflective White', 'Fluorescent', 'Both'],
    chain: ['None', 'Loop'],
    screws: ['Include', 'Without', 'Confirm'],
  } as const;

  const renderGroup = (key: keyof typeof options, label: string) => (
    <div className="config-group">
      <h3 className="config-label">{label}</h3>
      <div className="config-options">
        {options[key].map((option) => (
          <button
            aria-pressed={config[key] === option}
            className={`config-opt ${config[key] === option ? 'active' : ''}`}
            key={option}
            onClick={() => updateConfig({ [key]: option })}
            type="button"
          >
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="spec-config-section" data-component="spec-configurator" id="configure">
      <div className="config-status-row">
        <div>
          <span className="config-step-code">04 / 05</span>
          <h2 className="section-title">{t('specConfig')}</h2>
          <p className="selected-product-count">{t('selectedCount')}: <strong>{selectedProducts.length}</strong></p>
        </div>
        <a className="btn-outline back-products" href="#products"><ArrowLeft aria-hidden="true" size={17} /><span>{t('backProducts')}</span></a>
      </div>

      <div className="config-grid">
        <Reveal width="100%">
          {renderGroup('material', t('selectMaterial'))}
          {renderGroup('height', t('selectHeight'))}
          {renderGroup('band', t('selectBand'))}
        </Reveal>
        <Reveal width="100%">
          {renderGroup('chain', t('selectChain'))}
          {renderGroup('screws', t('selectScrews'))}
          <div className="config-group">
            <h3 className="config-label">{t('quantity')}</h3>
            <div className="quantity-ctrl">
              <button aria-label="Decrease by ten" onClick={() => updateConfig({ quantity: Math.max(1, config.quantity - 10) })} type="button">−10</button>
              <button aria-label="Decrease quantity" onClick={() => updateConfig({ quantity: Math.max(1, config.quantity - 1) })} type="button"><Minus aria-hidden="true" size={17} /></button>
              <span aria-live="polite" className="qty-val">{config.quantity}</span>
              <button aria-label="Increase quantity" onClick={() => updateConfig({ quantity: Math.min(999, config.quantity + 1) })} type="button"><Plus aria-hidden="true" size={17} /></button>
              <button aria-label="Increase by ten" onClick={() => updateConfig({ quantity: Math.min(999, config.quantity + 10) })} type="button">+10</button>
            </div>
          </div>
          <a className="btn-primary config-next" href="#inquiry"><span>{t('goInquiry')}</span></a>
        </Reveal>
      </div>
    </section>
  );
}
