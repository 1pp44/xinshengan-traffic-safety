import { ArrowLeft, Check, Copy, PackageSearch } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import { useInquiry } from '../state/InquiryContext';
import { Reveal } from './Reveal';

export function InquirySummary() {
  const { lang, t } = useLanguage();
  const { config, selectedProducts } = useInquiry();
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const summaryRef = useRef<HTMLPreElement>(null);

  const summary = [
    '--- XINSHENGAN INQUIRY PREFERENCES ---',
    `${t('products')}:`,
    selectedProducts.map((item) => `- ${item.name[lang]}`).join('\n'),
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

  const fallbackCopy = () => {
    const selection = window.getSelection();
    const node = document.createElement('div');
    node.textContent = summary;
    node.contentEditable = 'true';
    node.setAttribute('aria-hidden', 'true');
    Object.assign(node.style, {
      position: 'fixed',
      inset: '0 auto auto -10000px',
      whiteSpace: 'pre-wrap',
      opacity: '0',
      pointerEvents: 'none',
    });
    document.body.appendChild(node);
    const range = document.createRange();
    range.selectNodeContents(node);
    selection?.removeAllRanges();
    selection?.addRange(range);
    const copied = document.execCommand('copy');
    selection?.removeAllRanges();
    node.remove();
    summaryRef.current?.focus();
    return copied;
  };

  const finishCopyState = (copied: boolean) => {
    setCopyState(copied ? 'success' : 'error');
    window.setTimeout(() => setCopyState('idle'), 4000);
  };

  const copySummary = () => {
    setCopyState('idle');
    if (fallbackCopy()) {
      finishCopyState(true);
      return;
    }
    if (!navigator.clipboard?.writeText) {
      finishCopyState(false);
      return;
    }
    Promise.race([
      navigator.clipboard.writeText(summary).then(() => true).catch(() => false),
      new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), 1000)),
    ]).then(finishCopyState);
  };

  return (
    <section className="inquiry-summary-section" data-component="inquiry-summary" id="inquiry">
      <div className="inquiry-heading-row">
        <div>
          <span className="config-step-code">05 / 05</span>
          <Reveal><h2 className="section-title">{t('inquirySummary')}</h2></Reveal>
        </div>
        <a className="btn-outline back-products" href="#products"><ArrowLeft aria-hidden="true" size={17} /><span>{t('backProducts')}</span></a>
      </div>

      {selectedProducts.length === 0 ? (
        <div className="inquiry-empty">
          <PackageSearch aria-hidden="true" size={42} />
          <h3>{t('noProducts')}</h3>
          <p>{t('selectFirst')}</p>
          <a className="btn-primary" href="#products"><span>{t('journeySelect')}</span></a>
        </div>
      ) : (
        <div className="summary-box summary-box-complete">
          <pre aria-live="polite" className="summary-content" ref={summaryRef}>{summary}</pre>
          <div className="summary-action-row">
            <button className={`btn-primary copy-btn ${copyState === 'success' ? 'success' : ''}`} onClick={copySummary} type="button">
              {copyState === 'success' ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
              <span>{copyState === 'success' ? t('copied') : t('copySummary')}</span>
            </button>
          </div>
          <p aria-live="polite" className={`copy-status ${copyState}`}>
            {copyState === 'success' ? t('copied') : copyState === 'error' ? 'Copy failed. Select the summary text manually.' : ''}
          </p>
        </div>
      )}
    </section>
  );
}
