import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { ScrollImageSequence } from '../ui/ScrollImageSequence';

interface Principle {
  number: string;
  tag: string;
  title: string;
  description: string;
  spec: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    tag: 'MODERN EQUIPMENT',
    title: 'The Best Machines Give The Best Feeling',
    description: 'Imported biomechanical selectorized machines, plate-loaded leg presses, Olympic racks, and calibrated free weights designed for optimal muscle isolation and joint comfort.',
    spec: 'RANGE // IMPORTED CALIBRATED MACHINERY',
  },
  {
    number: '02',
    tag: 'EXPERIENCED TRAINERS',
    title: 'Supportive & Helpful Floor Coaching',
    description: 'Certified male and female fitness trainers dedicated to teaching proper lifting form, structuring progressive overload, and helping you achieve sustainable weight loss.',
    spec: 'COACHING // MALE & FEMALE TRAINERS AVAILABLE',
  },
  {
    number: '03',
    tag: 'SEPARATE SALON',
    title: 'Dedicated Unisex Salon & Makeup Studio',
    description: 'A completely separate, hygienic unisex parlour wing featuring top-rated keratin hair smoothing, revitalizing hair spas, and professional HD bridal and party makeup.',
    spec: 'SERVICES // KERATIN, HAIR SPA & BRIDAL ARTISTRY',
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
  const currentFrame = Math.round(1 + scrollNormalized * 191);
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
        scrollDistance="160vh"
        objectFit="cover"
        className="w-full"
      >
        {/* Dynamic Scrub Progress Bar at Top of Pinned Viewport */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#20231F]/10 z-30">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6747] via-[#8177FF] to-[#174D3B]"
            style={{ width: `${Math.round(scrollNormalized * 100)}%` }}
          />
        </div>

        {/* Top Floating Telemetry Overlay */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-start pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#20231F]/10 shadow-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
            <span className="font-mono text-xs text-[#20231F] uppercase tracking-wider font-semibold">
              CALIBRATED HARDWARE // 360° SCULPTURAL PROFILE
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-sm border border-[#20231F]/10 font-mono text-xs text-[#20231F] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#8177FF] animate-pulse" />
            <span className="font-bold text-[#FF6747]">FRAME {String(currentFrame).padStart(3, '0')}</span>
            <span className="text-[#20231F]/40">//</span>
            <span>ORBIT {currentDegrees}°</span>
          </div>
        </div>

        {/* Dynamic Principle Card Revealed by Scroll Progress */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-none pb-8 sm:pb-12">
          {/* Active Principle Card with AnimatePresence */}
          <div className="w-full max-w-lg min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrinciple.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-sm border border-[#20231F]/12 shadow-sculptural pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-mono text-xs text-[#FF6747] font-bold">
                    PRINCIPLE // {currentPrinciple.number}
                  </span>
                  <Badge variant="periwinkle" size="sm">
                    {currentPrinciple.tag}
                  </Badge>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] tracking-tight mb-2">
                  {currentPrinciple.title}
                </h3>

                <p className="text-sm sm:text-base text-[#4C514A] leading-relaxed mb-4">
                  {currentPrinciple.description}
                </p>

                <div className="pt-3 border-t border-[#20231F]/10 flex items-center justify-between font-mono text-[11px] text-[#20231F]/70">
                  <span>{currentPrinciple.spec}</span>
                  <span className="text-[#FF6747] font-bold">STEP {activePrincipleIndex + 1}/3</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Principle Navigation Dots */}
          <div className="flex md:flex-col gap-2 pointer-events-auto bg-white/90 backdrop-blur-md p-2 rounded-sm border border-[#20231F]/10 shadow-xs">
            {PRINCIPLES.map((p, idx) => (
              <button
                key={p.number}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const top = scrollContainerRef.current.offsetTop + (idx * window.innerHeight * 0.75);
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activePrincipleIndex === idx
                    ? 'bg-[#20231F] text-[#F5F2EA] font-bold shadow-xs'
                    : 'text-[#20231F]/60 hover:text-[#20231F] hover:bg-[#20231F]/5'
                }`}
              >
                P{p.number}
              </button>
            ))}
          </div>
        </div>
      </ScrollImageSequence>
    </section>
  );
};
