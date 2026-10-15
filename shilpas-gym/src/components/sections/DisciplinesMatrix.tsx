import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PULSEFORM_ASSETS } from '../../config/assets';

interface TrainingMode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  videoSrc?: string;
  specs: { label: string; value: string }[];
  tag: string;
  accent: 'persimmon' | 'periwinkle' | 'botanical' | 'carbon';
}

const MODES: TrainingMode[] = [
  {
    id: 'strength',
    number: '01',
    title: 'Unisex Strength & Iron',
    subtitle: 'Latest Calibrated Machinery & Free Weights',
    description: 'World-class biomechanical selectorized machines, Olympic squat racks, dumbbells, and cable systems designed for safe muscular hypertrophy and posture alignment.',
    imageSrc: PULSEFORM_ASSETS.I04.src,
    videoSrc: PULSEFORM_ASSETS.V06.src,
    tag: 'UNISEX GYM',
    accent: 'persimmon',
    specs: [
      { label: 'EQUIPMENT', value: 'Imported Biomechanical' },
      { label: 'ATMOSPHERE', value: 'Air-Conditioned Floor' },
      { label: 'SUPERVISION', value: 'Experienced Trainers' },
    ],
  },
  {
    id: 'conditioning',
    number: '02',
    title: 'Fat Loss & Personal Training',
    subtitle: 'Targeted Weight Loss & Certified Coaching',
    description: 'High-intensity interval conditioning, cardio lines, and 1-on-1 personal training with certified male and female fitness instructors tailored to your body composition.',
    imageSrc: PULSEFORM_ASSETS.I05.src,
    videoSrc: PULSEFORM_ASSETS.V05.src,
    tag: 'PERSONAL COACHING',
    accent: 'periwinkle',
    specs: [
      { label: 'TRAINERS', value: 'Male & Female Available' },
      { label: 'PROGRAMS', value: 'Weight Loss / Weight Gain' },
      { label: 'DIET PLAN', value: 'Personalized Nutrition' },
    ],
  },
  {
    id: 'keratin',
    number: '03',
    title: 'Keratin & Hair Spa Lounge',
    subtitle: 'Advanced Hair Smoothing & Deep Nourishment',
    description: 'Our top-rated salon service: premium keratin smoothing, hair botox, deep protein spa, and scalp revival therapies administered by senior salon technicians.',
    imageSrc: PULSEFORM_ASSETS.I06.src,
    videoSrc: PULSEFORM_ASSETS.V07.src,
    tag: 'SALON FAVORITE',
    accent: 'botanical',
    specs: [
      { label: 'POPULAR', value: 'Keratin & Hair Botox' },
      { label: 'FACILITY', value: 'Separate Salon Section' },
      { label: 'CARE', value: 'Zero Frizz / High Gloss' },
    ],
  },
  {
    id: 'makeup',
    number: '04',
    title: 'Bridal & Makeup Studio',
    subtitle: 'HD Party Glamour & Aesthetic Grooming',
    description: 'A complete glamour studio catering to bridal makeup, reception looks, pre-wedding skin therapies, and unisex aesthetic facial grooming in Rahara.',
    imageSrc: PULSEFORM_ASSETS.I07.src,
    tag: 'BEAUTY STUDIO',
    accent: 'carbon',
    specs: [
      { label: 'BRIDAL', value: 'HD & Airbrush Available' },
      { label: 'CLIENTELE', value: 'Unisex Parlour Care' },
      { label: 'PRODUCTS', value: 'Dermatologist Certified' },
    ],
  },
];

export interface DisciplinesMatrixProps {
  onOpenInquiry: (plan?: string) => void;
}

export const DisciplinesMatrix: React.FC<DisciplinesMatrixProps> = ({ onOpenInquiry }) => {
  const [activeCard, setActiveCard] = useState<string>('strength');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="disciplines" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF8F4] border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="04"
          tag="ONE-STOP DESTINATION"
          title="FITNESS & GLAMOUR."
          accentTitle="ALL UNDER ONE ROOF."
          description="Recognized by over 355+ verified Google reviews as Khardaha's best unisex gym and beauty salon. Modern workout machinery combined with a private, dedicated unisex parlour."
        />

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {MODES.map((mode, idx) => {
            const isHovered = hoveredCard === mode.id || activeCard === mode.id;

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredCard(mode.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setActiveCard(mode.id)}
                className="group relative flex flex-col justify-between bg-white rounded-sm border border-[#20231F]/10 overflow-hidden shadow-xs hover:shadow-sculptural hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Media Container (4:5 Aspect Ratio) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE3]">
                  {mode.videoSrc && isHovered ? (
                    <video
                      src={mode.videoSrc}
                      poster={mode.imageSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={mode.imageSrc}
                      alt={mode.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#20231F]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge & Number */}
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center z-10 pointer-events-none">
                    <span className="font-mono text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xs tracking-wider">
                      PILLAR 0{idx + 1}
                    </span>
                    <Badge variant={mode.accent === 'persimmon' ? 'persimmon' : mode.accent === 'periwinkle' ? 'periwinkle' : 'mineral'}>
                      {mode.tag}
                    </Badge>
                  </div>

                  {/* Bottom Image Headline */}
                  <div className="absolute bottom-4 inset-x-4 z-10 pointer-events-none">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-white/80 font-sans mt-0.5 line-clamp-1">
                      {mode.subtitle}
                    </p>
                  </div>
                </div>

                {/* Editorial Details & Specs */}
                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <p className="text-sm text-[#4C514A] leading-relaxed mb-6 font-normal">
                    {mode.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-[#20231F]/10 mb-6 font-mono text-xs">
                    {mode.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center">
                        <span className="text-[#20231F]/60 uppercase">{spec.label}</span>
                        <span className="font-semibold text-[#20231F]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={isHovered ? 'primary' : 'outline'}
                    size="sm"
                    magnetic={true}
                    className="w-full justify-between"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInquiry(`Discipline: ${mode.title}`);
                    }}
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    <span>INQUIRE // {mode.title.split(' ')[0].toUpperCase()}</span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
