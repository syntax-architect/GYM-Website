import React, { useState, useMemo } from 'react';
import { TiltedGridHero } from '../ui/tilted-grid-hero';
import { Sparkles, Dumbbell, Scissors, ArrowUpRight, ShieldCheck, Gauge, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

interface TiltedGridHeroSectionProps {
  onOpenInquiry?: (plan?: string) => void;
}

const ALL_IMAGES = [
  {
    src: '/assets/showcase/shilpas_gym_strength.jpg',
    alt: "Powerlifter barbell training in Shilpa's Gym studio",
    category: 'gym',
  },
  {
    src: '/assets/showcase/shilpas_salon_glamour.jpg',
    alt: "Luxury bridal makeover in Shilpa's Beauty Salon studio",
    category: 'salon',
  },
  {
    src: '/assets/showcase/shilpas_gym_athlete.jpg',
    alt: 'Athletic training and dumbbell overhead press in Khardaha gym',
    category: 'gym',
  },
  {
    src: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    alt: 'Keratin smoothing hair spa & styling by master aesthetician',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    alt: 'Barbell weight plates and heavy lifting rigs',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    alt: 'Salon styling station with warm lighting',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cross-functional athletic conditioning battle ropes',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Skincare facial and bridal makeup close-up',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dumbbell hypertrophy training',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hair wash and scalp therapy',
    category: 'salon',
  },
];

export const TiltedGridHeroSection: React.FC<TiltedGridHeroSectionProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState<'all' | 'gym' | 'salon'>('all');
  const [speed, setSpeed] = useState<number>(1.8);

  const filteredImages = useMemo(() => {
    if (filter === 'all') return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  return (
    <section
      id="tilted-showcase"
      className="relative w-full py-16 sm:py-24 bg-[#0B0B0C] text-[#F5F2EA] overflow-hidden select-none border-y border-white/10"
    >
      {/* Luminous Architectural Atmosphere & Radial Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(217, 56, 30, 0.20) 0%, rgba(11, 11, 12, 0) 55%), radial-gradient(circle at 80% 70%, rgba(197, 160, 89, 0.18) 0%, rgba(11, 11, 12, 0) 55%)',
        }}
      />

      {/* High-Tech Blueprint Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3D Cylindrical Hero Container */}
      <div className="relative w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <TiltedGridHero
          images={filteredImages}
          speed={speed}
          tileHeight={38}
          aspectRatio={16 / 10}
          curve={78}
          gap={5}
          className="h-[620px] sm:h-[680px] lg:h-[740px] w-full rounded-3xl border border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden bg-[#101012]"
        >
          {/* Integrated Foreground Layer (Floating Over the 3D Cylinder) */}
          <div className="relative z-20 flex h-full flex-col justify-between p-6 sm:p-10 pointer-events-none">
            {/* TOP BAR: Technical Telemetry & Interactive Docks */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
              {/* Left: Technical Act Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono font-bold tracking-wider text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D9381E] animate-pulse" />
                <span className="text-[#D9381E]">ACT IV</span>
                <span className="text-white/30">·</span>
                <span>CYLINDRICAL PERSPECTIVE CINEMA</span>
              </div>

              {/* Center: Category Filter Dock */}
              <div className="p-1.5 bg-black/70 backdrop-blur-md ring-1 ring-white/15 rounded-full inline-flex items-center gap-1 shadow-2xl">
                {[
                  { id: 'all', label: 'All Spaces', count: 10 },
                  { id: 'gym', label: 'Calibrated Iron', count: 5 },
                  { id: 'salon', label: 'Luxury Salon', count: 5 },
                ].map((item) => {
                  const isSelected = filter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilter(item.id as 'all' | 'gym' | 'salon')}
                      className={`px-4 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#D9381E] text-white shadow-md'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label} ({item.count})
                    </button>
                  );
                })}
              </div>

              {/* Right: Motion Velocity Switcher */}
              <div className="hidden sm:inline-flex items-center gap-1 p-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full font-mono text-[10px] text-white/70">
                <span className="px-2 py-1 flex items-center gap-1 text-[#C5A059] font-bold">
                  <Gauge className="w-3 h-3" /> SPEED:
                </span>
                {[
                  { value: 2.6, label: 'CRUISE' },
                  { value: 1.8, label: '1.8s FAST' },
                  { value: 1.0, label: 'TURBO' },
                ].map((sp) => (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={() => setSpeed(sp.value)}
                    className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                      speed === sp.value
                        ? 'bg-white text-[#0D0D0E] shadow-sm'
                        : 'hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER EDITORIAL HERO HEADLINE */}
            <div className="my-auto text-center px-4 max-w-4xl mx-auto space-y-4 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold tracking-widest text-[#C5A059] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>3D ROTATIONAL STREAM · KHARDANA ATELIER</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.92] drop-shadow-2xl">
                DUAL SANCTUARY <br />
                <span className="font-serif italic font-normal capitalize tracking-normal bg-gradient-to-r from-[#D9381E] via-[#FF8A65] to-[#C5A059] bg-clip-text text-transparent">
                  In Constant Motion.
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#E6DEC8]/90 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
                Heavy Olympic barbell strength and certified personal training paired with bespoke
                formaldehyde-free keratin therapy and HD bridal glam in Rahara.
              </p>
            </div>

            {/* BOTTOM HUD STRIP & CALL TO ACTION */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15 pointer-events-auto">
              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-white/90 font-mono">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <Dumbbell className="w-3.5 h-3.5 text-[#D9381E]" />
                  <span>28mm Olympic Cages</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Formaldehyde-Free Keratin</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4.7★ Google Certified</span>
                </span>
              </div>

              {/* Conversion CTA */}
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-[#E6DEC8]/70">
                  <Zap className="w-3 h-3 text-[#D9381E]" />
                  Cadence: {speed}s / tile
                </span>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onOpenInquiry && onOpenInquiry('Tour Both Sanctuaries (3D Cinema)')}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="shadow-lg shadow-[#D9381E]/30"
                >
                  BOOK ATELIER VISIT
                </Button>
              </div>
            </div>
          </div>
        </TiltedGridHero>
      </div>
    </section>
  );
};

export default TiltedGridHeroSection;
