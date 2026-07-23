import { useEffect, useMemo, useState } from 'react';
import { Box, ClipboardList, GitCompare, SlidersHorizontal, View } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';

interface JourneyBarProps {
  compareCount: number;
  onOpenCompare: () => void;
}

const steps = [
  { id: 'products', labelKey: 'journeySelect', icon: Box },
  { id: 'showroom', labelKey: 'journey3d', icon: View },
  { id: 'compare', labelKey: 'journeyCompare', icon: GitCompare },
  { id: 'configure', labelKey: 'journeyConfigure', icon: SlidersHorizontal },
  { id: 'inquiry', labelKey: 'journeyInquiry', icon: ClipboardList },
] as const;

export function JourneyBar({ compareCount, onOpenCompare }: JourneyBarProps) {
  const { t } = useLanguage();
  const { selectedProducts } = useInquiry();
  const [activeSection, setActiveSection] = useState('products');

  useEffect(() => {
    const targets = ['products', 'showroom', 'configure', 'inquiry']
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.25, 0.5] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const currentIndex = useMemo(() => {
    if (activeSection === 'inquiry') return 4;
    if (activeSection === 'configure') return 3;
    if (compareCount >= 2 && activeSection === 'products') return 2;
    if (activeSection === 'showroom') return 1;
    return 0;
  }, [activeSection, compareCount]);

  const goToStep = (id: string) => {
    if (id === 'compare') {
      if (compareCount >= 2) onOpenCompare();
      else document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav aria-label="Product journey" className="journey-bar" data-component="product-journey">
      <div className="journey-track">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const complete = index === 0
            ? selectedProducts.length > 0
            : index === 2
              ? compareCount >= 2
              : currentIndex > index;
          const active = currentIndex === index;
          return (
            <button
              aria-current={active ? 'step' : undefined}
              className={`journey-step ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}
              key={step.id}
              onClick={() => goToStep(step.id)}
              type="button"
            >
              <span className="journey-index">{String(index + 1).padStart(2, '0')}</span>
              <Icon aria-hidden="true" size={16} />
              <span className="journey-label">{t(step.labelKey)}</span>
              {step.id === 'compare' && compareCount > 0 && <span className="journey-count">{compareCount}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
