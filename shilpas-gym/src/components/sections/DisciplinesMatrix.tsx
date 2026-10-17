import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { PULSEFORM_ASSETS } from '../../config/assets';

interface TrainingMode {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  imageSrc: string;
  videoSrc?: string;
  specs: { label: string; value: string }[];
}

const MODES: TrainingMode[] = [
  {
    id: 'strength',
    title: 'Unisex Strength & Iron',
    category: 'Gym Floor',
    tagline: 'Calibrated Machinery & Free Weights',
    description: 'Biomechanical selectorized stations, Olympic squat racks, dumbbells, and cable systems engineered for safe muscular hypertrophy and posture alignment.',
    imageSrc: PULSEFORM_ASSETS.I04.src,
    videoSrc: PULSEFORM_ASSETS.V06.src,
    specs: [
      { label: 'Machinery', value: 'Imported Biomechanical Lines' },
      { label: 'Atmosphere', value: 'Air-Conditioned Unisex Floor' },
      { label: 'Supervision', value: 'Certified Floor Instructors' },
    ],
  },
  {
    id: 'conditioning',
    title: 'Fat Loss & Personal Coaching',
    category: '1-on-1 Coaching',
    tagline: 'Targeted Weight Loss & Custom Nutrition',
    description: 'Targeted fat burn, conditioning lines, and 1-on-1 personal coaching with certified male and female fitness instructors tailored to your body composition.',
    imageSrc: PULSEFORM_ASSETS.I05.src,
    videoSrc: PULSEFORM_ASSETS.V05.src,
    specs: [
      { label: 'Trainers', value: 'Male & Female Available' },
      { label: 'Programs', value: 'Hypertrophy & Fat Loss' },
      { label: 'Nutrition', value: 'Custom Macro Blueprint' },
    ],
  },
  {
    id: 'keratin',
    title: 'Keratin & Hair Spa Lounge',
    category: 'Private Salon',
    tagline: 'Hair Smoothing & Restorative Care',
    description: 'Formaldehyde-free keratin smoothing, deep hair botox, protein spa, and restorative therapies administered by senior salon technicians.',
    imageSrc: PULSEFORM_ASSETS.I06.src,
    videoSrc: PULSEFORM_ASSETS.V07.src,
    specs: [
      { label: 'Formula', value: 'Formaldehyde-Free Botox & Keratin' },
      { label: 'Privacy', value: 'Dedicated Salon Suite' },
      { label: 'Outcome', value: 'Silky Shine & Zero Frizz' },
    ],
  },
  {
    id: 'makeup',
    title: 'Bridal & Makeup Studio',
    category: 'Beauty Studio',
    tagline: 'HD Celebration Glamour & Skin Grooming',
    description: 'High-definition bridal artistry, party reception looks, skin brightening, and unisex facial grooming in Rahara.',
    imageSrc: PULSEFORM_ASSETS.I07.src,
    specs: [
      { label: 'Artistry', value: 'HD & Airbrush Bridal' },
      { label: 'Clientele', value: 'Unisex Parlour & Skin Care' },
      { label: 'Standards', value: 'Dermatologist Certified' },
    ],
  },
];

export interface DisciplinesMatrixProps {
  onOpenInquiry: (plan?: string) => void;
}

export const DisciplinesMatrix: React.FC<DisciplinesMatrixProps> = ({ onOpenInquiry }) => {
  const [selectedId, setSelectedId] = useState<string>('strength');
  const activeMode = MODES.find((m) => m.id === selectedId) || MODES[0];

  return (
    <section id="disciplines" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#EDE9DF]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Curated Disciplines"
          title="Strength Meets Salon Sanctuary."
          description="Explore our specialized unisex gym floor and private salon suites in Khardaha. Select any discipline to inspect equipment and specifications."
        />

        {/* Asymmetric Studio Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Selector List (Unmistakable Buttons) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {MODES.map((mode, idx) => {
              const isSelected = mode.id === selectedId;
              const formattedIndex = `0${idx + 1}`;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedId(mode.id)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#20231F] text-[#F5F2EA] border-[#FF6747] shadow-xl'
                      : 'bg-white text-[#20231F] border-[#20231F]/10 hover:border-[#FF6747]/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Index Capsule */}
                    <div className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'bg-[#FF6747] text-[#20231F]'
                        : 'bg-[#EDE9DF] text-[#20231F]/70 group-hover:bg-[#FF6747]/20 group-hover:text-[#FF6747]'
                    }`}>
                      {formattedIndex}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-extrabold uppercase tracking-wider ${
                          isSelected ? 'text-[#FF6747]' : 'text-[#174D3B]'
                        }`}>
                          {mode.category}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747] animate-pulse" />
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-extrabold uppercase tracking-tight mb-1">
                        {mode.title}
                      </h3>
                      <p className={`text-xs leading-relaxed ${
                        isSelected ? 'text-[#F5F2EA]/80' : 'text-[#50554E]'
                      }`}>
                        {mode.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Trailing Interactive Arrow Capsule */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-white/10 text-[#FF6747]'
                      : 'bg-[#EDE9DF] text-[#20231F]/50 group-hover:bg-[#FF6747] group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Double-Bezel Visual Showcase & Specifications */}
          <div className="lg:col-span-7 p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl shadow-lg">
            <div className="bg-white rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-8 flex flex-col justify-between h-full shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-6"
                >
                  {/* Visual Media Frame */}
                  <div className="relative w-full aspect-[16/10] bg-[#20231F] rounded-2xl overflow-hidden shadow-inner">
                    {activeMode.videoSrc ? (
                      <video
                        src={activeMode.videoSrc}
                        poster={activeMode.imageSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={activeMode.imageSrc}
                        alt={activeMode.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-[#20231F]/90 backdrop-blur-md text-[#F5F2EA] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                      {activeMode.category}
                    </div>
                  </div>

                  {/* Information & Details */}
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-[#20231F] mb-2">
                      {activeMode.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#3E423C] leading-relaxed">
                      {activeMode.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {activeMode.specs.map((spec) => (
                      <div key={spec.label} className="bg-[#FAF8F4] p-4 rounded-xl border border-[#20231F]/5">
                        <span className="block text-xs uppercase font-extrabold text-[#174D3B] tracking-wider mb-1">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-[#20231F]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Conversion Trigger */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onOpenInquiry(activeMode.title)}
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      INQUIRE ABOUT {activeMode.category.toUpperCase()}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
