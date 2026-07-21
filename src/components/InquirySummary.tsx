import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import { Reveal } from './Reveal';

export function InquirySummary() {
  const { lang, t } = useLanguage();
  const { selectedProducts, config } = useInquiry();
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');

  const summary = [
    '--- XINSHENGAN INQUIRY PREFERENCES ---',
    `${t('products')}:`,
    selectedProducts.length ? selectedProducts.map((item) => `- ${item.name[lang]}`).join('\n') : `[${t('noProducts')}]`,
    '',
    `${t('material')}: ${config.material}`,
    `${t('height')}: ${config.height}`,
    `${t('reflectiveBand')}: ${config.band}`,
    `${t('selectChain')}: ${config.chain}`,
    `${t('selectScrews')}: ${config.screws}`,
    `${t('quantity')}: ${config.quantity}`,
    '',
    t('disclaimer'),
    'Export legal entity and exact SKU combination require supplier confirmation.',
  ].join('\n');

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState('success');
    } catch {
      const block = document.querySelector('.summary-content');
      if (!block) {
        setCopyState('error');
        return;
      }
      const range = document.createRange();
      range.selectNodeContents(block);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      const copied = document.execCommand('copy');
      selection?.removeAllRanges();
      setCopyState(copied ? 'success' : 'error');
    }
    window.setTimeout(() => setCopyState('idle'), 1800);
  };

  return (
    <section className="inquiry-summary-section" data-component="inquiry-summary" id="inquiry">
      <Reveal><h2 className="section-title">{t('inquirySummary')}</h2></Reveal>
      <div className="summary-box">
        <pre aria-live="polite" className="summary-content">{summary}</pre>
        <button className={`btn-primary copy-btn ${copyState === 'success' ? 'success' : ''}`} onClick={copySummary} type="button">
          {copyState === 'success' ? <Check size={18} /> : <Copy size={18} />}
          <span>{copyState === 'success' ? t('copied') : t('copySummary')}</span>
        </button>
        {copyState === 'error' && <p className="copy-error">Copy failed. Select the summary text manually.</p>}
      </div>
    </section>
  );
}
