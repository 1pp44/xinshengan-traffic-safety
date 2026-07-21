import React from 'react';
import { useLanguage } from '../state/LanguageContext';

export const CorporateFooter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="corporate-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">XINSHENGAN</h3>
            <p>{t('brand')}</p>
          </div>
          
          <div className="footer-identity">
            <h4>{t('identity')}</h4>
            <p className="legal-note">{t('legalNote')}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2026 XINSHENGAN / Tiantai Guangfu Traffic Facilities Factory. All rights reserved.</p>
          <div className="footer-disclaimer">
            {t('disclaimer')}
          </div>
        </div>
      </div>
    </footer>
  );
};
