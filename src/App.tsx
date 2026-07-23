import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './state/LanguageContext';
import { InquiryProvider } from './state/InquiryContext';
import { CinematicIntro } from './components/CinematicIntro';
import { UtilityNav } from './components/UtilityNav';
import { HeroSpotlight } from './components/HeroSpotlight';
import { ProductMatrix } from './components/ProductMatrix';
import { MaterialLab } from './components/MaterialLab';
import { Bollard3DViewer } from './components/Bollard3DViewer';
import { UseContexts } from './components/UseContexts';
import { CompareTray } from './components/CompareTray';
import { ComparisonModal } from './components/ComparisonModal';
import { SpecConfigurator } from './components/SpecConfigurator';
import { InquirySummary } from './components/InquirySummary';
import { CorporateFooter } from './components/CorporateFooter';
import { JourneyBar } from './components/JourneyBar';
import { products, Product } from './data/productData';
import './styles.css';

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const entered = sessionStorage.getItem('xinshengan_entered');
    if (entered) setShowIntro(false);
  }, []);

  const handleEnter = () => {
    setShowIntro(false);
    sessionStorage.setItem('xinshengan_entered', 'true');
  };

  const handleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  };

  if (showIntro) {
    return <CinematicIntro onEnter={handleEnter} />;
  }

  return (
    <div className="page-shell">
      <UtilityNav />
      <JourneyBar compareCount={comparedProducts.length} onOpenCompare={() => setShowComparison(true)} />
      <HeroSpotlight />
      <ProductMatrix 
        onCompare={handleCompare} 
        comparedIds={comparedProducts.map(p => p.id)} 
      />
      <MaterialLab />
      <Bollard3DViewer />
      <UseContexts />
      <SpecConfigurator />
      <InquirySummary />
      <CorporateFooter />
      
      <CompareTray 
        products={comparedProducts} 
        onRemove={(id) => setComparedProducts(p => p.filter(x => x.id !== id))}
        onClear={() => setComparedProducts([])}
        onStart={() => setShowComparison(true)}
      />

      {showComparison && (
        <ComparisonModal 
          products={comparedProducts} 
          onClose={() => setShowComparison(false)} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <InquiryProvider>
        <AppContent />
      </InquiryProvider>
    </LanguageProvider>
  );
}
