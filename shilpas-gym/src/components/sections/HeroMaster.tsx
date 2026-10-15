import React, { useState } from 'react';
import { ArrowUpRight, Phone, RotateCcw, Box } from 'lucide-react';
import { Button } from '../ui/Button';
import { LazyVideo } from '../ui/LazyVideo';
import { PULSEFORM_ASSETS } from '../../config/assets';
import { SculpturalDumbbellCanvas } from '../3d/SculpturalDumbbellCanvas';

export interface HeroMasterProps {
  onOpenInquiry: () => void;
  onExploreModes?: () => void;
}

export const HeroMaster: React.FC<HeroMasterProps> = ({ onOpenInquiry }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'video'>('3d');

  return (
    <section className="relative w-full min-h-[95svh] pt-28 sm:pt-32 pb-14 sm:pb-16 px-4 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#F5F2EA]">
      {/* Main Hero Grid: 55% Editorial Space, 45% Sculptural 3D Canvas / Video */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full max-w-[1440px] mx-auto">
        {/* Left Column: Bold Typography & Conversion Deck */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Trust Metric Statement (Folded into copy, no floating eyebrow badges) */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 text-sm font-semibold text-[#174D3B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#174D3B] flex-shrink-0" />
            <span>4.7 rating across 355+ Google reviews · Rahara & Khardaha</span>
          </div>

          {/* Master Headline: Strictly 2 lines or fewer at every width */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.98] break-words">
            Strength Meets Glamour.
          </h1>

          <p className="mt-5 sm:mt-8 text-sm sm:text-base lg:text-lg text-[#3C403A] font-normal leading-relaxed max-w-xl font-sans">
            শিল্পা'জ জিম এন বিউটি সালোঁ — Khardaha and Rahara's premier unisex fitness atelier and private beauty studio. 
            Calibrated biomechanical equipment, certified personal trainers, keratin hair therapy, and luxury bridal artistry under one roof.
          </p>

          {/* Confident Actions */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto justify-center min-h-[48px]"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              BOOK FREE TRIAL PASS
            </Button>

            <a
              href="tel:07439761994"
              className="px-7 py-3.5 sm:py-4 rounded-sm bg-[#EDE9DF] hover:bg-[#20231F] hover:text-[#F5F2EA] text-sm font-bold uppercase tracking-wider text-[#20231F] transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-[#FF6747]" />
              <span className="tabular-nums">074397 61994</span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-[#20231F]/80 font-medium">
            <span>Women-Owned Studio</span>
            <span>·</span>
            <span>Unisex Fitness Floor</span>
            <span>·</span>
            <span>Private Salon Wing</span>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Dumbbell & Atmospheric Loop */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-[500px] bg-[#EDE9DF] rounded-sm overflow-hidden flex items-center justify-center">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                <SculpturalDumbbellCanvas
                  interactivePointer={true}
                  className="w-full h-full"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-[#20231F]/80 bg-white/95 px-3 py-1.5 rounded-xs pointer-events-none">
                  <span>Interactive 3D: Drag to rotate</span>
                  <span className="font-bold text-[#FF6747]">Powder-Coated Steel</span>
                </div>
              </div>
            ) : (
              <LazyVideo
                src={PULSEFORM_ASSETS.V01.src}
                poster={PULSEFORM_ASSETS.I01.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            )}

            {/* Viewport Model Switcher */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white p-1 rounded-xs z-20">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 text-sm font-bold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#20231F] text-white'
                    : 'text-[#20231F]/70 hover:text-[#20231F]'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Real-Time 3D</span>
              </button>
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1.5 text-sm font-bold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-[#20231F] text-white'
                    : 'text-[#20231F]/70 hover:text-[#20231F]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Film Loop</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grounded Studio Metadata Bar: Clean tone block, no hairline rules, no monospace */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto mt-12 pt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[#20231F]/80">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2 font-semibold text-[#20231F]">
            <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
            Naskarhat Madhya Para, Rahara, Khardaha · Kolkata 700118
          </span>
          <span className="hidden md:inline text-[#20231F]/40">·</span>
          <span className="text-[#174D3B] font-bold">Open Daily: 06:00 AM – 10:00 PM</span>
        </div>
        <span className="font-medium text-[#20231F]/70">Google Plus Code: P9FM+6V Rahara</span>
      </div>
    </section>
  );
};
