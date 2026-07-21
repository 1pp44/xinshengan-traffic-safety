import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import { Reveal } from './Reveal';

export const SpecConfigurator: React.FC = () => {
  const { t } = useLanguage();
  const { config, updateConfig } = useInquiry();

  const options = {
    material: ['Plastic', 'Soft Plastic', 'PU', 'EVA'],
    height: ['45cm', '65cm', '68cm', '70cm', '73cm', '75cm', '90cm', '95cm', '110cm'],
    band: ['Reflective White', 'Fluorescent', 'Both'],
    chain: ['None', 'Loop'],
    screws: ['Include', 'Without', 'Confirm']
  };

  const renderGroup = (key: keyof typeof options, label: string) => (
    <div className="config-group">
      <h4 className="config-label">{label}</h4>
      <div className="config-options">
        {options[key].map(opt => (
          <button 
            key={opt}
            className={`config-opt ${config[key as keyof typeof config] === opt ? 'active' : ''}`}
            onClick={() => updateConfig({ [key]: opt })}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="configure" className="spec-config-section">
      <Reveal>
        <h2 className="section-title">{t('specConfig')}</h2>
      </Reveal>

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
            <h4 className="config-label">{t('quantity')}</h4>
            <div className="quantity-ctrl">
              <button onClick={() => updateConfig({ quantity: Math.max(1, config.quantity - 10) })}>-10</button>
              <button onClick={() => updateConfig({ quantity: Math.max(1, config.quantity - 1) })}>-</button>
              <span className="qty-val">{config.quantity}</span>
              <button onClick={() => updateConfig({ quantity: Math.min(999, config.quantity + 1) })}>+</button>
              <button onClick={() => updateConfig({ quantity: Math.min(999, config.quantity + 10) })}>+10</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
