import { useEffect, useRef, useState } from 'react';
import { ArrowRight, SkipForward } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { assetUrl } from '../lib/assetUrl';

interface CinematicIntroProps {
  onEnter: () => void;
}

const VIDEO_URL = assetUrl('assets/video/drift-intro.mp4');
const POSTER_URL = assetUrl('assets/images/xinshengan/hero-night-road.png');

export function CinematicIntro({ onEnter }: CinematicIntroProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowButton(true), 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduceMotion(media.matches);
      if (media.matches) videoRef.current?.pause();
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!videoReady || reduceMotion) return;
    void videoRef.current?.play().catch(() => setVideoReady(false));
  }, [videoReady, reduceMotion]);

  return (
    <div className={`cinematic-intro ${videoReady && !reduceMotion ? 'has-video' : ''}`} data-component="cinematic-intro">
      {!reduceMotion && (
        <video
          aria-hidden="true"
          className="intro-video"
          loop
          muted
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          playsInline
          poster={POSTER_URL}
          preload="auto"
          ref={videoRef}
          src={VIDEO_URL}
        />
      )}
      <div aria-hidden="true" className="intro-video-scrim" />
      <div aria-hidden="true" className="intro-grain" />
      <div aria-hidden="true" className="intro-scan" />
      <div aria-hidden="true" className="road-container">
        <div className="road-flow road-flow-left" />
        <div className="road-flow road-flow-right" />
        <div className="road-centerline" />
      </div>
      <div aria-hidden="true" className="signal-point signal-point-a"><i /></div>
      <div aria-hidden="true" className="signal-point signal-point-b"><i /></div>

      <div className="intro-content">
        <span aria-hidden="true" className="intro-system-label">SYSTEM / ACTIVE</span>
        <h1 className="intro-title" data-text="XINSHENGAN">XINSHENGAN</h1>
        <p className="intro-subtitle">Traffic Safety Solutions</p>
        <div className="intro-status" aria-hidden="true">
          <span>VISIBILITY</span><i /><span>CONTROL</span><i /><span>SEPARATION</span>
        </div>

        <div className={`intro-actions ${showButton ? 'visible' : ''}`}>
          <button className="btn-primary btn-capsule intro-enter" onClick={onEnter} type="button">
            <span>{t('enterSite')}</span><ArrowRight aria-hidden="true" size={18} />
          </button>
          <button className="btn-text btn-skip" onClick={onEnter} type="button">
            <SkipForward aria-hidden="true" size={15} /><span>{t('skip')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
