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
  const currentFrame = Math.min(192, Math.max(1, Math.round(scrollNormalized * 191) + 1));

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrollNormalized(val);
    if (scrollContainerRef.current) {
      const containerHeight = scrollContainerRef.current.offsetHeight - window.innerHeight;
      const targetY = scrollContainerRef.current.offsetTop + (val * containerHeight);
      window.scrollTo({ top: targetY, behavior: 'instant' });
    }
  };

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
        scrollDistance="140vh"
        objectFit="contain"
        className="w-full"
      >
        {/* Interactive Scrub Progress Bar at Top of Viewport */}
        <div className="absolute top-0 inset-x-0 h-2 bg-[#20231F]/10 z-30 group">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6747] via-[#8177FF] to-[#FF6747]"
            style={{ width: `${Math.round(scrollNormalized * 100)}%` }}
          />
          {/* Invisible range input overlay for direct scrub dragging */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={scrollNormalized}
            onChange={handleScrubberChange}
            aria-label="Scrub 3D frame sequence"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize pointer-events-auto"
          />
        </div>

        {/* Top Telemetry Bar */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-start pointer-events-none pt-4">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xs border border-[#20231F]/5 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-pulse" />
            <span className="text-xs sm:text-sm text-[#20231F] uppercase font-bold tracking-wider">
              360° Precision Biomechanics Sequence
            </span>
          </div>

          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-xs border border-[#20231F]/5 text-xs sm:text-sm text-[#20231F] font-semibold tabular-nums">
            <span className="w-2 h-2 rounded-full bg-[#8177FF]" />
            <span>Turn: {currentDegrees}°</span>
            <span className="text-[#20231F]/30">|</span>
            <span className="font-mono text-[#174D3B]">FRAME {currentFrame.toString().padStart(4, '0')} / 0192</span>
            <span className="text-[#20231F]/30">|</span>
            <span className="text-[#FF6747] font-bold">{currentPrinciple.tag}</span>
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
                className="w-full p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl shadow-xl pointer-events-auto"
              >
                <div className="bg-white p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] shadow-xs">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#FF6747]/10 text-[#FF6747] border border-[#FF6747]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747] animate-pulse" />
                      {currentPrinciple.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#174D3B] uppercase tracking-wider">
                      Principle 0{activePrincipleIndex + 1} / 03
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] tracking-tight mb-3 leading-snug">
                    {currentPrinciple.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#3E423C] leading-relaxed mb-6 font-normal">
                    {currentPrinciple.description}
                  </p>

                  <div className="pt-3.5 border-t border-[#20231F]/10 flex items-center justify-between text-xs sm:text-sm text-[#20231F]/80 font-bold">
                    <span className="font-mono text-[#174D3B]">{currentPrinciple.spec}</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#174D3B]/10 text-[#174D3B] text-[11px] font-extrabold uppercase tracking-wider">
                      Studio Standard
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Principle Navigation Segmented Pill Dock */}
          <div className="flex md:flex-col gap-2 pointer-events-auto p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-2xl md:rounded-3xl shadow-md backdrop-blur-md">
            {PRINCIPLES.map((p, idx) => {
              const isActive = activePrincipleIndex === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const top = scrollContainerRef.current.offsetTop + (idx * window.innerHeight * 0.45);
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className={`px-5 py-3 rounded-xl md:rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-between gap-3 border-2 ${
                    isActive
                      ? 'bg-[#20231F] text-[#F5F2EA] border-[#20231F] shadow-md'
                      : 'bg-white/80 text-[#20231F]/80 border-[#20231F]/10 hover:border-[#FF6747]/60 hover:text-[#20231F] hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#FF6747] animate-pulse' : 'bg-[#20231F]/20'}`} />
                    {p.tag}
                  </span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#20231F]/5 text-[#20231F]/60'}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollImageSequence>
    </section>
  );
};
