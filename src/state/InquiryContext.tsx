import React, { createContext, useContext, useState } from 'react';

export interface InquiryItem {
  productId: string;
  name: { [key: string]: string };
}

export interface SpecConfig {
  material: string;
  height: string;
  band: string;
  chain: string;
  screws: string;
  quantity: number;
}

interface InquiryContextType {
  selectedProducts: InquiryItem[];
  toggleProduct: (productId: string, name: { [key: string]: string }) => void;
  config: SpecConfig;
  updateConfig: (patch: Partial<SpecConfig>) => void;
  clearInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

const defaultConfig: SpecConfig = {
  material: 'Plastic',
  height: '70cm',
  band: 'Reflective White',
  chain: 'None',
  screws: 'Include',
  quantity: 1
};

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<InquiryItem[]>([]);
  const [config, setConfig] = useState<SpecConfig>(defaultConfig);

  const toggleProduct = (productId: string, name: { [key: string]: string }) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.productId === productId);
      if (exists) {
        return prev.filter(p => p.productId !== productId);
      } else {
        return [...prev, { productId, name }];
      }
    });
  };

  const updateConfig = (patch: Partial<SpecConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }));
  };

  const clearInquiry = () => {
    setSelectedProducts([]);
    setConfig(defaultConfig);
  };

  return (
    <InquiryContext.Provider value={{ selectedProducts, toggleProduct, config, updateConfig, clearInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('useInquiry must be used within InquiryProvider');
  return context;
};
