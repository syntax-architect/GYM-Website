import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { PULSEFORM_ASSETS } from '../../config/assets';

export interface HeroMasterProps {
  onOpenInquiry: () => void;
  onExploreModes?: () => void;
}

export const HeroMaster: React.FC<HeroMasterProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative w-full min-h-[92svh] lg:min-h-screen pt-32 pb-16 px-6 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#F5F2EA]">
      {/* Subtle Architectural Ambient Lighting */}
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-[#DDE8F8]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-[#FF6747]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Grid: 50% Editorial Negative Space, 50% Photorealistic Master 3D Object */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-auto w-full max-w-[1440px] mx-auto">
        {/* Left Column: Pure Luxury Editorial Space */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2.5 mb-6"
          >
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#20231F]/10 shadow-xs">
              <span className="flex text-[#FF6747] text-xs">★★★★★</span>
              <span className="font-mono text-xs font-bold text-[#20231F]">4.7</span>
              <span className="font-mono text-[11px] text-[#20231F]/70">(355+ Reviews)</span>
              <span className="text-[#20231F]/20">•</span>
              <span className="font-mono text-[11px] font-bold text-[#174D3B]">KHARDAHA</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-[#174D3B]/10 px-3 py-1.5 rounded-full border border-[#174D3B]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174D3B]" />
              <span className="font-mono text-[10px] uppercase font-bold text-[#174D3B] tracking-wider">
                WOMEN-OWNED • LGBTQ+ INCLUSIVE
              </span>
            </div>
          </motion.div>

          {/* Master Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.95]"
            >
              WHERE STRENGTH <br />
              <span className="text-[#FF6747]">MEETS</span> GLAMOUR.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#4C514A] font-normal leading-relaxed max-w-xl font-sans"
          >
            শিল্পা'জ জিম এন বিউটি সালোঁ — Khardaha & Rahara's premier unisex fitness atelier and luxury beauty makeup studio. 
            Modern calibrated equipment, expert trainers, keratin hair therapy, and bridal glamour under one roof.
          </motion.p>

          {/* Luxury CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenInquiry}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              BOOK FREE TRIAL / SALON PASS
            </Button>

            <a
              href="tel:+917439761994"
              className="px-6 py-4 rounded-sm border border-[#20231F]/15 bg-white hover:border-[#FF6747] hover:text-[#FF6747] text-xs font-mono font-bold uppercase tracking-widest text-[#20231F] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#174D3B] animate-pulse" />
              <span>CALL 074397 61994</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Cinematic Photorealistic Master Loop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-[460px] lg:max-w-none flex items-center justify-center">
            {/* Seamless Photorealistic Video Render */}
            <video
              src={PULSEFORM_ASSETS.V01.src}
              poster={PULSEFORM_ASSETS.I01.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain filter drop-shadow-2xl mix-blend-multiply"
            />
          </div>
        </motion.div>
      </div>

      {/* Grounded Luxury Studio Metadata Bar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto pt-6 border-t border-[#20231F]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#20231F]/70">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5 font-semibold text-[#20231F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
            NASKARHAT MADHYA PARA, RAHARA, KHARDAHA • KOLKATA 700118
          </span>
          <span className="hidden md:inline text-[#20231F]/50">//</span>
          <span className="text-[#174D3B] font-bold">OPEN DAILY: 06:00 AM – 10:00 PM</span>
        </div>
        <span className="font-medium text-[#20231F]/80">PLUS CODE: P9FM+6V RAHARA</span>
      </div>
    </section>
  );
};
