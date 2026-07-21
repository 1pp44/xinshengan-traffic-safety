import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { Reveal } from './Reveal';
import { assetUrl } from '../lib/assetUrl';

export const HeroSpotlight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-spotlight">
      <div className="hero-bg">
        <img src={assetUrl("assets/images/xinshengan/hero-night-road.png")} alt="Hero background" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <Reveal>
          <div className="hero-badge">ENGINEERED FOR SAFETY</div>
        </Reveal>
        <Reveal>
          <h2 className="hero-title">{t('engineeredToBeSeen')}</h2>
        </Reveal>
        <Reveal>
          <div className="hero-specs">
            <span className="spec-chip">PU</span>
            <span className="spec-chip">70 CM</span>
            <span className="spec-chip">FLUORESCENT BANDS</span>
          </div>
        </Reveal>
        <Reveal>
          <div className="hero-actions">
            <a href="#products" className="btn-primary">{t('products')}</a>
            <a href="#showroom" className="btn-outline">{t('showroom3d')}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
