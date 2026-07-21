import React from 'react';
import { useLanguage } from '../state/LanguageContext';
import { Reveal } from './Reveal';
import { ParkingCircle, MoveRight, HardHat, Warehouse } from 'lucide-react';

export const UseContexts: React.FC = () => {
  const { t } = useLanguage();

  const scenarios = [
    { id: 'parking', label: t('parking'), icon: <ParkingCircle size={40} /> },
    { id: 'diversion', label: t('diversion'), icon: <MoveRight size={40} /> },
    { id: 'construction', label: t('construction'), icon: <HardHat size={40} /> },
    { id: 'warehouse', label: t('warehouse'), icon: <Warehouse size={40} /> }
  ];

  return (
    <section className="use-contexts-section">
      <Reveal>
        <h2 className="section-title">{t('apps')}</h2>
      </Reveal>
      
      <div className="scenarios-grid">
        {scenarios.map(s => (
          <Reveal key={s.id}>
            <div className="scenario-card">
              <div className="scenario-icon">{s.icon}</div>
              <h3 className="scenario-label">{s.label}</h3>
              <div className="scenario-graphic">
                <svg viewBox="0 0 100 20" className="road-stripes">
                  <rect x="0" y="0" width="100" height="20" fill="#181B1D" />
                  <line x1="10" y1="10" x2="30" y2="10" stroke="#D7FF35" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="40" y1="10" x2="60" y2="10" stroke="#D7FF35" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="70" y1="10" x2="90" y2="10" stroke="#D7FF35" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
