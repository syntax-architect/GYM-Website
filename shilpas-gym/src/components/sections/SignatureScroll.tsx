import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollImageSequence } from '../ui/ScrollImageSequence';

interface Principle {
  id: string;
  tag: string;
  title: string;
  description: string;
  spec: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: 'equipment',
    tag: 'Modern Equipment',
    title: 'The Best Machines Give The Best Feeling',
    description: 'Imported biomechanical selectorized machines, plate-loaded leg presses, Olympic power cages, and calibrated free weights designed for targeted muscle isolation and joint safety.',
    spec: 'Range: Calibrated Heavy Machinery',
  },
  {
    id: 'coaching',
    tag: 'Floor Coaching',
    title: 'Supportive & Attentive Personal Guidance',
    description: 'Certified male and female fitness instructors teach proper lifting form, structure progressive overload, and help you reach sustainable fat loss or strength goals.',
    spec: 'Coaching: Certified Trainers On-Floor',
  },
  {
    id: 'salon',
    tag: 'Private Wing',
    title: 'Dedicated Unisex Salon & Makeup Studio',
    description: 'A completely separate, hygienic unisex parlour wing featuring top-rated keratin hair smoothing, revitalizing hair spas, and professional HD bridal and party makeover artistry.',
    spec: 'Services: Keratin, Hair Spa & Bridal Studio',
  },
];

export const SignatureScroll: React.FC = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const [scrollNormalized, setScrollNormalized] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const containerHeight = scrollContainerRef.current.offsetHeight - window.innerHeight;
      if (containerHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / containerHeight));
      setScrollNormalized(progress);

      if (progress < 0.35) {
        setActivePrincipleIndex(0);
      } else if (progress < 0.70) {
        setActivePrincipleIndex(1);
      } else {
        setActivePrincipleIndex(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPrinciple = PRINCIPLES[activePrincipleIndex];
  const currentDegrees = Math.round(scrollNormalized * 360);

  return (
    <section id="signature" ref={scrollContainerRef} className="relative w-full bg-[#F5F2EA]">
      <ScrollImageSequence
        sequencePath="/assets/sequences/v04-sculpture"
        frameCount={192}
        width={960}
        height={540}
        poster="/assets/sequences/v04-sculpture/poster.webp"
        mobileSequence="/assets/sequences/v04-sculpture/mobile"
        mobileFrameCount={96}
        scrollDistance="120vh"
        objectFit="contain"
        className="w-full"
      >
        {/* Scrub Progress Bar at Top of Viewport */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#20231F]/10 z-30">
          <motion.div
            className="h-full bg-[#FF6747]"
            style={{ width: `${Math.round(scrollNormalized * 100)}%` }}
          />
        </div>

        {/* Top Telemetry Bar */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-start pointer-events-none pt-4">
          <div className="bg-white px-4 py-2 rounded-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
            <span className="text-sm text-[#20231F] uppercase font-bold">
              360° Hardware Architecture
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xs text-sm text-[#20231F] font-semibold tabular-nums">
            <span className="w-2 h-2 rounded-full bg-[#8177FF]" />
            <span>Turn: {currentDegrees}°</span>
            <span className="text-[#20231F]/40">·</span>
            <span className="text-[#FF6747]">{currentPrinciple.tag}</span>
          </div>
        </div>

        {/* Principle Card Revealed by Scroll */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none pb-8 sm:pb-12">
          {/* Active Principle Card */}
          <div className="w-full max-w-lg min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrinciple.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full bg-white p-7 sm:p-9 rounded-sm pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-sm font-bold text-[#FF6747]">
                    {currentPrinciple.tag}
                  </span>
                  <span className="text-sm text-[#174D3B] font-semibold">
                    Principle {activePrincipleIndex + 1} of 3
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] tracking-tight mb-3 leading-snug">
                  {currentPrinciple.title}
                </h3>

                <p className="text-base text-[#3E423C] leading-relaxed mb-5">
                  {currentPrinciple.description}
                </p>

                <div className="pt-4 bg-[#FAF8F4] -mx-7 -mb-7 sm:-mx-9 sm:-mb-9 px-7 sm:px-9 py-3 flex items-center justify-between text-sm text-[#20231F]/80 font-medium">
                  <span>{currentPrinciple.spec}</span>
                  <span className="text-[#174D3B] font-bold">Studio Standard</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Principle Navigation Pills */}
          <div className="flex md:flex-col gap-2 pointer-events-auto bg-[#EDE9DF] p-2 rounded-xs">
            {PRINCIPLES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const top = scrollContainerRef.current.offsetTop + (idx * window.innerHeight * 0.45);
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-2 rounded-xs text-sm font-semibold uppercase transition-colors cursor-pointer ${
                  activePrincipleIndex === idx
                    ? 'bg-[#20231F] text-[#F5F2EA]'
                    : 'text-[#20231F]/70 hover:text-[#20231F] hover:bg-black/5'
                }`}
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>
      </ScrollImageSequence>
    </section>
  );
};
