import React, { useState, useEffect } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X } from 'lucide-react';

export const UtilityNav: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#products', label: t('products') },
    { href: '#materials', label: t('materials') },
    { href: '#showroom', label: t('showroom3d') },
    { href: '#configure', label: t('configure') },
    { href: '#inquiry', label: t('inquiry') }
  ];

  return (
    <nav className={`utility-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">XINSHENGAN</a>
        
        <div className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
          <LanguageSelector />
        </div>

        <div className="nav-mobile-controls">
          <LanguageSelector />
          <button aria-label="Toggle navigation" className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} type="button">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
