import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Sparkles, Gauge } from 'lucide-react';
import { TiltedGridHero, type TiltedGridImage } from '../ui/tilted-grid-hero';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface TiltedGridHeroSectionProps {
  onOpenInquiry?: (plan?: string) => void;
}

type FilterCategory = 'all' | 'gym' | 'salon';

const GYM_IMAGES: TiltedGridImage[] = [
  { src: '/assets/images/i04-strength-still.webp', alt: 'Olympic Barbell Strength Floor' },
  { src: '/assets/images/i05-conditioning-still.webp', alt: 'Metabolic Battle Rope Conditioning' },
  { src: '/assets/images/i07-coaching-still.webp', alt: '1-on-1 Biomechanical Personal Coaching' },
  { src: '/assets/images/i09-macro-plate.webp', alt: 'Calibrated Competition Plates' },
  { src: '/assets/images/i10-community-wide.webp', alt: 'Unisex Fitness Studio Floor' },
];

const SALON_IMAGES: TiltedGridImage[] = [
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'Bridal & HD Glamour Artistry' },
  { src: '/assets/showcase/shilpas_salon_hair_spa.jpg', alt: 'Formaldehyde-Free Keratin & Hair Spa Suite' },
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'HD Makeup & Skin Brightening Suite' },
  { src: '/assets/showcase/shilpas_salon_hair_spa.jpg', alt: 'Private Salon Sanctuary' },
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'Aesthetic Transformation Studio' },
];

export const TiltedGridHeroSection: React.FC<TiltedGridHeroSectionProps> = ({ onOpenInquiry }) => {
  const galleryImages = useCmsStore((s) => s.galleryImages);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [speed, setSpeed] = useState<number>(3.8);

  const gymList = useMemo(() => {
    const filtered = galleryImages.filter((img) => img.category === 'gym');
    return filtered.length > 0 ? filtered : GYM_IMAGES;
  }, [galleryImages]);

  const salonList = useMemo(() => {
    const filtered = galleryImages.filter((img) => img.category === 'salon');
    return filtered.length > 0 ? filtered : SALON_IMAGES;
  }, [galleryImages]);

  const activeImages = useMemo(() => {
    if (filter === 'gym') return [...gymList, ...gymList];
    if (filter === 'salon') return [...salonList, ...salonList];
    const combined: TiltedGridImage[] = [];
    const maxLen = Math.max(gymList.length, salonList.length, 5);
    for (let i = 0; i < maxLen; i++) {
      if (gymList[i % gymList.length]) combined.push(gymList[i % gymList.length]);
      if (salonList[i % salonList.length]) combined.push(salonList[i % salonList.length]);
    }
    return combined;
  }, [filter, gymList, salonList]);

  return (
    <section className="w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-[1440px] mx-auto rounded-2xl sm:rounded-[2rem] bg-[#0D0D0E] text-[#F4F1EA] border border-white/10 shadow-2xl overflow-hidden">
        {/* TOP TELEMETRY & FILTER BAR */}
        <div className="px-4 sm:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em]">
            <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
            <span className="text-[#D9381E] font-bold">ACT IV</span>
            <span className="text-white/40">//</span>
            <span className="text-white/80">CYLINDRICAL CINEMA</span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full no-scrollbar pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'ALL SPACES (10)' },
              { id: 'gym', label: 'CALIBRATED IRON (5)' },
              { id: 'salon', label: 'LUXURY SALON (5)' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as FilterCategory)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#D9381E] text-white shadow-md'
                      : 'bg-white/8 text-white/70 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Speed Controller */}
          <div className="hidden xl:flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10 font-mono text-[11px]">
            <Gauge className="w-3.5 h-3.5 text-[#C5A059] mr-1" />
            <span className="text-white/50 mr-1">SPEED:</span>
            {[
              { label: 'CRUISE', val: 5.2 },
              { label: '1.8x FAST', val: 3.8 },
              { label: 'TURBO', val: 2.4 },
            ].map((sp) => (
              <button
                key={sp.label}
                type="button"
                onClick={() => setSpeed(sp.val)}
                className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-all ${
                  speed === sp.val
                    ? 'bg-white text-[#0D0D0E]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* EDITORIAL TITLE STAGE (Positioned cleanly above the 3D cylinder so text never collides with faces) */}
        <div className="px-4 sm:px-10 pt-6 sm:pt-8 pb-2 text-center max-w-3xl mx-auto relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-3">
            <Sparkles className="w-3 h-3 text-[#D9381E]" />
            <span>3D ROTATIONAL STREAM · KHARDAHA</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[0.98]">
            DUAL SANCTUARY{' '}
            <span className="font-serif italic font-normal capitalize text-[#D9381E]">
              In Motion.
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-base text-[#E6DEC8]/80 mt-2.5 max-w-xl mx-auto">
            Heavy Olympic strength training paired with bespoke formaldehyde-free keratin hair
            smoothing and HD bridal glamour in Rahara.
          </p>
        </div>

        {/* 3D CYLINDRICAL IMAGE STREAM (Unobstructed View) */}
        <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[420px]">
          <TiltedGridHero
            images={activeImages}
            speed={speed}
            tileHeight={58}
            aspectRatio={16 / 10}
            gap={8}
            axis={52}
            curve={75}
            fade={16}
            className="w-full h-full"
          />
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="px-6 sm:px-10 py-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#141311]">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#E6DEC8]/80">
            <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10">
              ● 28mm Olympic Cages
            </span>
            <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10">
              ● Formaldehyde-Free Keratin
            </span>
            <span className="px-3 py-1 rounded-full bg-white/8 border border-white/10">
              ● 4.7★ Google Certified
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/50 hidden sm:inline">
              Cadence: {speed}s / tile
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenInquiry?.('All-Access: Gym + Salon (₹4,999/mo)')}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              BOOK ATELIER VISIT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiltedGridHeroSection;
