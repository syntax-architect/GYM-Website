import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight, MoveHorizontal, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface TransformationVisualizerProps {
  onOpenInquiry: (plan?: string) => void;
}

type CategoryKey = 'fitness' | 'salon' | 'bridal';

interface TransformationCase {
  id: CategoryKey;
  tabLabel: string;
  tag: string;
  title: string;
  serifTitle: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  planName: string;
}

const CASES: Record<CategoryKey, TransformationCase> = {
  fitness: {
    id: 'fitness',
    tabLabel: 'FITNESS',
    tag: '16-WEEK BIOMECHANICAL HYPERTROPHY',
    title: 'LEAN ATHLETIC RECOMPOSITION &',
    serifTitle: 'Core Power.',
    description:
      'Structured progressive overload on plate-loaded machinery combined with caloric deficit and dedicated posture realignment under Shilpa’s head floor coach.',
    beforeLabel: 'WEEK 0 · BASELINE FORM',
    afterLabel: 'WEEK 16 · CALIBRATED POWER',
    beforeImage: '/assets/images/i10-community-wide.webp',
    afterImage: '/assets/images/i05-conditioning-still.webp',
    metrics: [
      { value: '-12.8 kg', label: 'Body Fat Reduction' },
      { value: '+4.2 kg', label: 'Lean Mass Gained' },
      { value: '+45 kg', label: 'Squat 1RM Increase' },
    ],
    quote:
      'The trainers here don’t let you ego-lift. Every movement was corrected down to joint angles. Best gym in North 24 Parganas.',
    author: 'Subhadip Banerjee · Verified Member (Rahara, Khardaha)',
    planName: 'PT Transformation (₹3,499/mo)',
  },
  salon: {
    id: 'salon',
    tabLabel: 'SALON & SPA',
    tag: 'SINGLE-SESSION LUXURY HAIR THERAPY',
    title: 'MIRROR-GLOSS KERATIN SMOOTHING &',
    serifTitle: 'Hair Spa.',
    description:
      'Transformative zero-formaldehyde keratin infusion restoring damaged cuticles with deep botanical moisture bath in our private luxury salon wing.',
    beforeLabel: 'BEFORE · DAMAGED CUTICLES',
    afterLabel: 'AFTER · MIRROR KERATIN SHEEN',
    beforeImage: '/assets/images/i06-mobility-still.webp',
    afterImage: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    metrics: [
      { value: '100%', label: 'Frizz Reduction' },
      { value: '5+ Months', label: 'Silk Longevity' },
      { value: '2.5 Hours', label: 'Suite Treatment' },
    ],
    quote:
      'Completely separated from the gym noise. Hygienic, cool AC, and the keratin results are smoother than high-end South Kolkata salons.',
    author: 'Ananya Mukherjee · Verified Member (Khardaha Railway Station Rd)',
    planName: 'Keratin & Hair Spa Suite',
  },
  bridal: {
    id: 'bridal',
    tabLabel: 'BRIDAL',
    tag: 'FULL BRIDAL HD ARTISTRY PACKAGE',
    title: 'SIGNATURE BENGALI HD BRIDAL',
    serifTitle: 'Makeover.',
    description:
      'Waterproof HD airbrush base, traditional Chandan artistry, sculpted eye contouring, and bridal hair styling with fresh floral jasmine setting.',
    beforeLabel: 'PRE-PREP SESSION',
    afterLabel: 'FINAL HD BRIDAL REVEAL',
    beforeImage: '/assets/library/A03_philosophy_recovery.jpeg',
    afterImage: '/assets/showcase/shilpas_salon_glamour.jpg',
    metrics: [
      { value: '18h Wear', label: 'Humidity Proof' },
      { value: 'Flawless HD', label: '4K Camera Finish' },
      { value: 'Included', label: 'Trial Consultation' },
    ],
    quote:
      'Shilpa did my bridal makeover personally. Not a crease or smudge throughout the entire wedding night. 10/10.',
    author: 'Priyanka Sen · Verified Member (Sodepur, Kolkata)',
    planName: 'Bridal & HD Makeup Consultation',
  },
};

export const TransformationVisualizer: React.FC<TransformationVisualizerProps> = ({
  onOpenInquiry,
}) => {
  const transformations = useCmsStore((s) => s.transformations);
  const [activeTab, setActiveTab] = useState<CategoryKey>('fitness');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRectRef = useRef<{ left: number; width: number } | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const currentCase = transformations[activeTab] || CASES[activeTab];

  const updateSliderFromClientX = useCallback((clientX: number) => {
    let rect = containerRectRef.current;
    if (!rect && containerRef.current) {
      const b = containerRef.current.getBoundingClientRect();
      rect = { left: b.left, width: b.width };
      containerRectRef.current = rect;
    }
    if (!rect || rect.width === 0) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = window.requestAnimationFrame(() => {
      const currentRect = containerRectRef.current;
      if (!currentRect || currentRect.width === 0) return;
      const rawPct = ((clientX - currentRect.left) / currentRect.width) * 100;
      setSliderPos(Math.max(8, Math.min(92, Math.round(rawPct))));
      rafIdRef.current = null;
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    if (containerRef.current) {
      const b = containerRef.current.getBoundingClientRect();
      containerRectRef.current = { left: b.left, width: b.width };
    }
    updateSliderFromClientX(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    containerRectRef.current = null;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="transformations"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F4F1EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Editorial Header & Category Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0D0D0E]/70 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>PROVEN CLIENT RESULTS // BIOMETRIC & AESTHETIC</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-[0.98]">
              REAL TRANSFORMATIONS.{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Zero Filters.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#4A4843]">
              Drag the optical comparison aperture to inspect client progression across our unisex
              fitness floor and private luxury beauty studio.
            </p>
          </div>

          {/* Category Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#0D0D0E]/12 shadow-xs self-start lg:self-end overflow-x-auto max-w-full no-scrollbar">
            {(['fitness', 'salon', 'bridal'] as CategoryKey[]).map((key) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTab(key);
                    setSliderPos(50);
                  }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0D0D0E] text-[#F4F1EA] shadow-sm'
                      : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E]'
                  }`}
                >
                  {transformations[key]?.tabLabel || CASES[key].tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 12-Column Split Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: Interactive Split-Screen Scanner */}
          <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Before and after transformation comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderPos}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="lg:col-span-7 relative min-h-[320px] sm:min-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141311] border border-[#0D0D0E]/15 shadow-2xl select-none touch-pan-y cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#D9381E]"
          >
            {/* AFTER IMAGE (Full Underlying Layer) */}
            <img
              src={currentCase.afterImage}
              alt={`${currentCase.title} - ${currentCase.afterLabel} at Shilpa's Gym & Salon in Khardaha`}
              loading="lazy"
              decoding="async"
              width={900}
              height={600}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

            {/* BEFORE IMAGE (Clipped Left Layer with Monochromatic Baseline Grade) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={currentCase.beforeImage}
                alt={`${currentCase.title} - ${currentCase.beforeLabel} at Shilpa's Gym & Salon in Khardaha`}
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'grayscale(0.65) contrast(1.08) brightness(0.9)' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
            </div>

            {/* Top Left & Right Labels */}
            <div className="pointer-events-none absolute top-3 left-3 sm:top-6 sm:left-6 z-20 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[9px] sm:text-[11px] font-bold text-white uppercase tracking-wider">
              {currentCase.beforeLabel}
            </div>

            <div className="pointer-events-none absolute top-3 right-3 sm:top-6 sm:right-6 z-20 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#141311]/90 backdrop-blur-md border border-[#C5A059]/40 font-mono text-[9px] sm:text-[11px] font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D9381E]" />
              <span>{currentCase.afterLabel}</span>
            </div>

            {/* Vertical Divider Line & Tactile Handle */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#0D0D0E] shadow-2xl border-2 border-[#0D0D0E] flex items-center justify-center">
                <MoveHorizontal className="w-5 h-5 text-[#D9381E]" />
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pointer-events-none absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-20 flex items-center justify-between">
              <div className="px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white/90 uppercase tracking-widest">
                DRAG HORIZONTALLY TO COMPARE
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-[#D9381E] text-white font-mono text-[11px] font-bold tabular-nums">
                SCAN // {String(sliderPos).padStart(3, '0')}%
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Case Dossier Card */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-10 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9381E]/10 text-[#D9381E] font-mono text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentCase.tag}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-[1.02]">
                {currentCase.title}{' '}
                <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                  {currentCase.serifTitle}
                </span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#4A4843] leading-relaxed">
                {currentCase.description}
              </p>
            </div>

            {/* 3 Telemetry Metric Boxes */}
            <div className="grid grid-cols-3 gap-3 py-2">
              {currentCase.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#0D0D0E]/10 text-center"
                >
                  <span className="block font-serif italic text-2xl sm:text-3xl text-[#0D0D0E] leading-none mb-1">
                    {m.value}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#4A4843]">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Verified Member Quote */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#0D0D0E]/10 space-y-2.5">
              <p className="font-serif italic text-base sm:text-lg text-[#0D0D0E] leading-snug">
                “{currentCase.quote}”
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#141311]/75">
                <ShieldCheck className="w-4 h-4 text-[#D9381E] shrink-0" />
                <span>{currentCase.author}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => onOpenInquiry(currentCase.planName)}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              START YOUR TRANSFORMATION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationVisualizer;
