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
    description: 'Biomechanical selectorized machines, Olympic squat racks, dumbbells, and cable systems designed for safe muscular hypertrophy and posture alignment.',
    imageSrc: PULSEFORM_ASSETS.I04.src,
    videoSrc: PULSEFORM_ASSETS.V06.src,
    specs: [
      { label: 'Equipment', value: 'Imported Biomechanical Machinery' },
      { label: 'Atmosphere', value: 'Air-Conditioned Unisex Floor' },
      { label: 'Supervision', value: 'Certified Floor Instructors' },
    ],
  },
  {
    id: 'conditioning',
    title: 'Fat Loss & Personal Coaching',
    category: '1-on-1 Coaching',
    tagline: 'Targeted Weight Loss & Nutrition Blueprint',
    description: 'High-intensity interval conditioning, cardio lines, and 1-on-1 personal training with certified male and female fitness instructors tailored to your body composition.',
    imageSrc: PULSEFORM_ASSETS.I05.src,
    videoSrc: PULSEFORM_ASSETS.V05.src,
    specs: [
      { label: 'Trainers', value: 'Male & Female Available' },
      { label: 'Programs', value: 'Weight Loss & Muscle Gain' },
      { label: 'Diet Plan', value: 'Custom Macro Nutrition' },
    ],
  },
  {
    id: 'keratin',
    title: 'Keratin & Hair Spa Lounge',
    category: 'Private Salon',
    tagline: 'Advanced Hair Smoothing & Deep Nourishment',
    description: 'Our top-rated salon service: premium keratin smoothing, hair botox, deep protein spa, and scalp revival therapies administered by senior salon technicians.',
    imageSrc: PULSEFORM_ASSETS.I06.src,
    videoSrc: PULSEFORM_ASSETS.V07.src,
    specs: [
      { label: 'Signature', value: 'Formaldehyde-Free Keratin & Botox' },
      { label: 'Facility', value: 'Separate Private Salon Suite' },
      { label: 'Outcome', value: 'High Gloss & Zero Frizz' },
    ],
  },
  {
    id: 'makeup',
    title: 'Bridal & Makeup Studio',
    category: 'Beauty Studio',
    tagline: 'HD Party Glamour & Aesthetic Grooming',
    description: 'A complete glamour studio catering to bridal makeup, reception looks, pre-wedding skin therapies, and unisex aesthetic facial grooming in Rahara.',
    imageSrc: PULSEFORM_ASSETS.I07.src,
    specs: [
      { label: 'Bridal Artistry', value: 'HD & Airbrush Available' },
      { label: 'Clientele', value: 'Unisex Parlour & Skin Care' },
      { label: 'Products', value: 'Dermatologist Certified' },
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
          title="Fitness & Glamour Under One Roof."
          description="Explore our specialized unisex gym floor and private salon suites in Khardaha. Select any discipline to inspect equipment and specifications."
        />

        {/* Asymmetric Studio Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {MODES.map((mode) => {
              const isSelected = mode.id === selectedId;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedId(mode.id)}
                  className={`w-full p-6 sm:p-7 rounded-sm text-left transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#20231F] text-[#F5F2EA]'
                      : 'bg-white text-[#20231F] hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-bold uppercase ${
                      isSelected ? 'text-[#FF6747]' : 'text-[#174D3B]'
                    }`}>
                      {mode.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase tracking-tight mb-2">
                    {mode.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isSelected ? 'text-[#F5F2EA]/80' : 'text-[#50554E]'
                  }`}>
                    {mode.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase & Specifications */}
          <div className="lg:col-span-7 bg-white rounded-sm p-6 sm:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Media Frame */}
                <div className="relative w-full aspect-[16/10] bg-[#20231F] rounded-sm overflow-hidden">
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
                  <div className="absolute top-4 left-4 bg-[#20231F] text-[#F5F2EA] px-3.5 py-1.5 rounded-xs text-sm font-bold uppercase">
                    {activeMode.category}
                  </div>
                </div>

                {/* Information & Details */}
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-[#20231F] mb-3">
                    {activeMode.title}
                  </h4>
                  <p className="text-base text-[#3E423C] leading-relaxed">
                    {activeMode.description}
                  </p>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {activeMode.specs.map((spec) => (
                    <div key={spec.label} className="bg-[#FAF8F4] p-4 rounded-xs">
                      <span className="block text-sm uppercase font-bold text-[#FF6747] mb-1">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-[#20231F]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Conversion Trigger */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
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
    </section>
  );
};
