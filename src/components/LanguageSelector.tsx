import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import type { Language } from '../state/LanguageContext';

const LANGUAGES: Array<{ code: Language; name: string }> = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية' },
];

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => {
      document.removeEventListener('mousedown', closeOutside);
      document.removeEventListener('keydown', closeEscape);
    };
  }, []);

  const current = LANGUAGES.find((item) => item.code === lang) ?? LANGUAGES[1];

  return (
    <div className="language-selector" ref={rootRef}>
      <button aria-expanded={open} aria-haspopup="menu" className="lang-toggle" onClick={() => setOpen((value) => !value)} type="button">
        <Globe aria-hidden="true" size={18} />
        <span>{current.name}</span>
        <ChevronDown aria-hidden="true" className={open ? 'rotate-180' : ''} size={14} />
      </button>
      {open && (
        <div className="lang-menu" role="menu">
          {LANGUAGES.map((item) => (
            <button
              aria-checked={lang === item.code}
              className={`lang-option ${lang === item.code ? 'active' : ''}`}
              key={item.code}
              onClick={() => {
                setLang(item.code);
                setOpen(false);
              }}
              role="menuitemradio"
              type="button"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
