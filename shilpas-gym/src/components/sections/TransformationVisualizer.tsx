import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Trophy, ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export interface TransformationVisualizerProps {
  onOpenInquiry?: (plan?: string) => void;
}

interface CaseStudy {
  id: string;
  category: 'Fitness' | 'Salon & Spa' | 'Bridal';
  client: string;
  location: string;
  timeline: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  reviewQuote: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'physique',
    category: 'Fitness',
    client: 'Subhadip Banerjee',
    location: 'Rahara, Khardaha',
    timeline: '16-Week Biomechanical Hypertrophy',
    headline: 'Lean Athletic Recomposition & Core Power',
    description: 'Structured progressive overload on plate-loaded machinery combined with caloric deficit and dedicated posture re-alignment under Shilpa’s head floor coach.',
    metrics: [
      { label: 'Body Fat Reduction', value: '-12.8 kg' },
      { label: 'Lean Mass Gained', value: '+4.2 kg' },
      { label: 'Squat 1RM Increase', value: '+45 kg' },
    ],
    beforeImage: '/assets/texture-kinetic-ropes.jpg',
    afterImage: '/assets/facilities-iron-floor.jpg',
    beforeLabel: 'Week 0 · Baseline Form',
    afterLabel: 'Week 16 · Calibrated Power',
    reviewQuote: 'The trainers here don’t let you ego-lift. Every movement was corrected down to joint angles. Best gym in North 24 Parganas.',
  },
  {
    id: 'keratin',
    category: 'Salon & Spa',
    client: 'Ananya Mukherjee',
    location: 'Khardaha Railway Station Rd',
    timeline: 'Single-Session Luxury Hair Therapy',
    headline: 'Mirror-Gloss Keratin Smoothing & Hair Spa',
    description: 'Transformative zero-formaldehyde keratin infusion restoring damaged cuticles with deep botanical moisture bath in our private luxury salon wing.',
    metrics: [
      { label: 'Frizz Reduction', value: '100% Gloss' },
      { label: 'Longevity', value: '5+ Months' },
      { label: 'Treatment Time', value: '2.5 Hours' },
    ],
    beforeImage: '/assets/hero-desktop-16x9.jpg',
    afterImage: '/assets/facilities-recovery-lounge.jpg',
    beforeLabel: 'Before · Damaged Cuticles',
    afterLabel: 'After · Mirror Keratin Sheen',
    reviewQuote: 'Completely separated from the gym noise. Hygienic, cool AC, and the keratin results are smoother than high-end south Kolkata salons.',
  },
  {
    id: 'bridal',
    category: 'Bridal',
    client: 'Priyanka Sen',
    location: 'Sodepur · Kolkata',
    timeline: 'Full Bridal HD Artistry Package',
    headline: 'Signature Bengali HD Bridal Makeover',
    description: 'Waterproof HD airbrush base, traditional Chandan artistry, sculpted eye contouring, and bridal hair styling with fresh floral jasmine setting.',
    metrics: [
      { label: 'Longevity', value: '18h Wear' },
      { label: 'Finish', value: 'Flawless HD' },
      { label: 'Trial Session', value: 'Included' },
    ],
    beforeImage: '/assets/texture-barbell-macro.jpg',
    afterImage: '/assets/trainer-head-coach.jpg',
    beforeLabel: 'Pre-Prep Session',
    afterLabel: 'Final HD Bridal Reveal',
    reviewQuote: 'Shilpa did my bridal makeover personally. Not a crease or smudge throughout the entire wedding night. 10/10.',
  },
];

export const TransformationVisualizer: React.FC<TransformationVisualizerProps> = ({
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const activeCase = CASE_STUDIES[activeTab];

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSliderPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section id="transformations" className="relative w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            tag="Proven Client Results"
            title="REAL TRANSFORMATIONS. NO FILTERS."
            description="Drag the interactive slider to inspect client progression across our unisex fitness floor and private luxury beauty studio."
          />

          {/* Category Tabs in Segmented Pill Dock */}
          <div className="p-1.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-full inline-flex gap-1.5 self-start md:self-end shadow-xs">
            {CASE_STUDIES.map((study, idx) => (
              <button
                key={study.id}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setSliderPos(50);
                }}
                className={`px-5 py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all cursor-pointer active:scale-95 ${
                  activeTab === idx
                    ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-md border border-[#0D0D0E]'
                    : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E] hover:bg-white/80'
                }`}
              >
                {study.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Before/After Split-Screen Viewport in Double-Bezel Tray */}
          <div className="lg:col-span-7 p-2 sm:p-2.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2.5rem] shadow-xl">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[calc(2.5rem-0.625rem)] overflow-hidden select-none touch-none shadow-inner cursor-ew-resize group bg-[#161815]"
            >
              {/* After Image (Background layer) */}
              <img
                src={activeCase.afterImage}
                alt={activeCase.afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 z-10 bg-[#141311]/90 backdrop-blur-md text-[#F5F2EA] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D9381E]" />
                <span>{activeCase.afterLabel}</span>
              </div>

              {/* Before Image (Clipped overlay layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 z-10 bg-[#0D0D0E]/90 backdrop-blur-md text-[#F5F2EA] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-white/10">
                  <span>{activeCase.beforeLabel}</span>
                </div>
              </div>

              {/* Draggable Divider Line & Luxury Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Floating Central Dial */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-[#0D0D0E] shadow-xl border-2 border-[#D9381E] flex items-center justify-center gap-0.5 group-hover:scale-110 transition-transform">
                  <ChevronLeft className="w-3.5 h-3.5 text-[#0D0D0E]" />
                  <ChevronRight className="w-3.5 h-3.5 text-[#0D0D0E]" />
                </div>
              </div>

              {/* Bottom Drag Prompt Hint */}
              <div className="absolute bottom-3 inset-x-3 text-center pointer-events-none z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                  Drag slider horizontally to compare
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Details & Quantitative Metrics (Double-Bezel Card) */}
          <div className="lg:col-span-5 p-2 sm:p-2.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2.5rem] shadow-xl">
            <div className="bg-white p-7 sm:p-9 rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#D9381E] mb-2">
                  <Trophy className="w-4 h-4" />
                  <span>{activeCase.timeline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-tight mb-3">
                  {activeCase.headline}
                </h3>

                <p className="text-sm text-[#3E423C] leading-relaxed mb-6 font-sans">
                  {activeCase.description}
                </p>

                {/* Metric Pillars */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {activeCase.metrics.map((m) => (
                    <div key={m.label} className="bg-[#FAF8F4] p-3 rounded-2xl border border-[#0D0D0E]/5 text-center">
                      <span className="block text-lg sm:text-xl font-black font-display text-[#141311] tabular-nums">
                        {m.value}
                      </span>
                      <span className="block text-[11px] font-bold text-[#0D0D0E]/70 leading-tight mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Verified Client Testimonial Quote */}
                <div className="p-4 bg-[#EDE9DF]/60 rounded-2xl border-l-4 border-[#D9381E]">
                  <p className="text-xs sm:text-sm italic text-[#0D0D0E] mb-2 font-medium">
                    "{activeCase.reviewQuote}"
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#141311]">
                    <Check className="w-3.5 h-3.5" />
                    <span>{activeCase.client} · Verified Member ({activeCase.location})</span>
                  </div>
                </div>
              </div>

              {/* Direct Consultation Initiation CTA */}
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-lg shadow-[#D9381E]/20"
                onClick={() => onOpenInquiry?.(`${activeCase.category} Consultation (${activeCase.headline})`)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                START YOUR TRANSFORMATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
