import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Dumbbell, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface DisciplinesMatrixProps {
  onOpenInquiry: (plan?: string) => void;
}

interface DisciplineItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  serifTitle: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  specs: { label: string; value: string }[];
  ctaText: string;
  planName: string;
}

const DISCIPLINES: DisciplineItem[] = [
  {
    id: 'strength',
    number: '#1',
    badge: 'GYM FLOOR',
    title: 'UNISEX STRENGTH &',
    serifTitle: 'Calibrated Iron.',
    subtitle: 'Calibrated Machinery & Free Weights',
    description:
      'Biomechanical selectorized stations, Olympic squat racks, dumbbells, and cable systems engineered for safe muscular hypertrophy and joint alignment.',
    image: '/assets/images/i09-macro-plate.webp',
    video: '/assets/videos/v06-strength.mp4',
    specs: [
      { label: 'MACHINERY', value: 'Imported Biomechanical' },
      { label: 'ATMOSPHERE', value: 'Air-Conditioned Unisex' },
      { label: 'SUPERVISION', value: 'On-Floor Form Coaching' },
    ],
    ctaText: 'RESERVE GYM FLOOR PASS',
    planName: 'Unisex Gym Access (₹1,499/mo)',
  },
  {
    id: 'coaching',
    number: '#2',
    badge: '1-ON-1 COACHING',
    title: 'FAT LOSS & PERSONAL',
    serifTitle: 'Transformation.',
    subtitle: 'Targeted Weight Loss & Custom Nutrition',
    description:
      'Dedicated 1-on-1 personal training with certified male and female coaches. Structured metabolic conditioning, battle-rope intervals, and custom high-protein Indian meal blueprints.',
    image: '/assets/images/i05-conditioning-still.webp',
    video: '/assets/videos/v05-conditioning.mp4',
    specs: [
      { label: 'TRAINERS', value: 'Male & Female Certified' },
      { label: 'FOCUS', value: 'Hypertrophy & Fat Loss' },
      { label: 'NUTRITION', value: 'Custom Macro Blueprint' },
    ],
    ctaText: 'INQUIRE ABOUT 1-ON-1 COACHING',
    planName: 'PT Transformation (₹3,499/mo)',
  },
  {
    id: 'keratin',
    number: '#3',
    badge: 'PRIVATE SALON',
    title: 'KERATIN & HAIR SPA',
    serifTitle: 'Sanctuary.',
    subtitle: 'Hair Smoothing & Restorative Care',
    description:
      'Formaldehyde-free keratin smoothing, deep hair botox, protein spa, and restorative scalp therapies administered by senior salon technicians in a private suite.',
    image: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    specs: [
      { label: 'FORMULA', value: 'Formaldehyde-Free Botox & Keratin' },
      { label: 'PRIVACY', value: 'Dedicated Salon Suite' },
      { label: 'OUTCOME', value: 'Silky Shine & Zero Frizz' },
    ],
    ctaText: 'BOOK KERATIN & HAIR SPA',
    planName: 'Keratin & Hair Spa Lounge',
  },
  {
    id: 'bridal',
    number: '#4',
    badge: 'BEAUTY STUDIO',
    title: 'BRIDAL & MAKEUP',
    serifTitle: 'Artistry.',
    subtitle: 'HD Celebration Glamour & Skin Grooming',
    description:
      'High-definition waterproof bridal artistry, reception styling, skin brightening facials, and unisex grooming crafted by founder Shilpa Roy and master aestheticians.',
    image: '/assets/showcase/shilpas_salon_glamour.jpg',
    specs: [
      { label: 'ARTISTRY', value: 'HD & Airbrush Bridal' },
      { label: 'CLIENTELE', value: 'Unisex Parlour & Skin Care' },
      { label: 'STANDARDS', value: 'Dermatologist Tested' },
    ],
    ctaText: 'BOOK BRIDAL / BEAUTY CONSULTATION',
    planName: 'Bridal & Makeup Studio Consultation',
  },
];

export const DisciplinesMatrix: React.FC<DisciplinesMatrixProps> = ({ onOpenInquiry }) => {
  const disciplines = useCmsStore((s) => s.disciplines);
  const [activeId, setActiveId] = useState<string>('strength');
  const activeItem = disciplines.find((d) => d.id === activeId) || disciplines[0] || DISCIPLINES[0];

  return (
    <section
      id="disciplines"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F4F1EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0D0D0E]/70 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>ACT III // CURATED DISCIPLINES</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
              STRENGTH MEETS{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Salon Sanctuary.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4A4843]">
              Explore our specialized unisex gym floor and private salon suites in Khardaha. Select
              any discipline to inspect equipment and specifications.
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F4F1EA] font-mono text-xs uppercase tracking-wider self-start lg:self-end">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>04 SPECIALIZED WINGS · UNDER ONE ROOF</span>
          </div>
        </div>

        {/* 12-Column Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: 4 Tactile Selector Cards (Horizontal scroll on mobile, stacked on desktop) */}
          <div className="lg:col-span-5 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2.5 sm:gap-3.5 pb-2 lg:pb-0 no-scrollbar">
            {disciplines.map((item) => {
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`min-w-[240px] sm:min-w-[280px] lg:min-w-0 w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 shrink-0 lg:shrink ${
                    isSelected
                      ? 'bg-[#0D0D0E] text-[#F4F1EA] border-[#0D0D0E] shadow-xl'
                      : 'bg-white text-[#0D0D0E] border-[#0D0D0E]/10 hover:border-[#D9381E]/50 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold ${
                          isSelected
                            ? 'bg-[#D9381E] text-white'
                            : 'bg-[#F4F1EA] text-[#0D0D0E]/70'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-bold uppercase tracking-widest ${
                          isSelected ? 'text-[#C5A059]' : 'text-[#D9381E]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight">
                      {item.title} {item.serifTitle.replace('.', '')}
                    </h3>

                    <p
                      className={`font-sans text-xs sm:text-sm ${
                        isSelected ? 'text-white/70' : 'text-[#4A4843]'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#D9381E] text-white'
                        : 'bg-[#F4F1EA] text-[#0D0D0E]/60'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Instant-Render Media & Specification Dossier (Zero Blank Flash) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural">
            {/* Media Frame with Guaranteed Poster Image + Video Overlay */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#141311] mb-6">
              <img
                key={`img-${activeItem.id}`}
                src={activeItem.image}
                alt={`${activeItem.title} - ${activeItem.subtitle} at Shilpa's Gym & Salon in Rahara, Khardaha`}
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />

              {activeItem.video && (
                <video
                  key={`vid-${activeItem.id}`}
                  src={activeItem.video}
                  poster={activeItem.image}
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />

              <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-[11px] font-bold uppercase tracking-widest border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
                <span>{activeItem.badge}</span>
              </div>

              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/90 text-[#0D0D0E] font-mono text-[11px] font-bold uppercase tracking-wider">
                SPEC {activeItem.number} // KHARDAHA ATELIER
              </div>
            </div>

            {/* Detail Copy & 3-Column Spec Grid */}
            <div className="px-2 sm:px-4 pb-2 space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-[1.02] mb-2.5">
                  {activeItem.title}{' '}
                  <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                    {activeItem.serifTitle}
                  </span>
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4843] leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#0D0D0E]/10">
                {activeItem.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#0D0D0E]/8"
                  >
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#D9381E] mb-1">
                      {sp.label}
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-bold text-[#0D0D0E]">
                      {sp.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onOpenInquiry(activeItem.planName)}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  {activeItem.ctaText}
                </Button>

                <div className="flex items-center gap-4 font-mono text-xs text-[#0D0D0E]/65">
                  <span className="inline-flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-[#D9381E]" />
                    Calibrated
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    Hygienic Suite
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#D9381E]" />
                    Unisex
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisciplinesMatrix;
