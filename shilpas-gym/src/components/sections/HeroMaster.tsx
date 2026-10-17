import React, { useState, useRef, useCallback } from 'react';
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
  const [finish, setFinish] = useState<'signature' | 'stealth' | 'prestige'>('signature');
  const [exploded, setExploded] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const telemetryDegRef = useRef<HTMLSpanElement>(null);

  const handleTelemetryChange = useCallback((data: { rotationY: number }) => {
    if (telemetryDegRef.current) {
      telemetryDegRef.current.textContent = `${data.rotationY}°`;
    }
  }, []);

  return (
    <section className="relative w-full min-h-[95svh] pt-28 sm:pt-32 pb-14 sm:pb-16 px-4 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#F5F2EA]">
      {/* Main Hero Grid: 55% Editorial Space, 45% Sculptural 3D Canvas / Video */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto w-full max-w-[1440px] mx-auto">
        {/* Left Column: Bold Typography & Conversion Deck */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Trust Metric Statement */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 text-sm font-semibold text-[#174D3B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#174D3B] flex-shrink-0 animate-pulse" />
            <span>4.7 rating across 355+ Google reviews · Rahara & Khardaha</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.98] break-words">
            Strength Meets Glamour.
          </h1>

          <p className="mt-5 sm:mt-7 text-sm sm:text-base lg:text-lg text-[#3C403A] font-normal leading-relaxed max-w-xl font-sans">
            Khardaha's premier unisex fitness atelier and private beauty studio. Biomechanical strength training meets bespoke salon care under one refined roof.
          </p>

          {/* Confident Actions with Clear Boutique Affordance */}
          <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto justify-center"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              BOOK FREE TRIAL PASS
            </Button>

            <a
              href="tel:07439761994"
              className="group px-6 py-3.5 rounded-full bg-white/80 hover:bg-[#20231F] hover:text-[#F5F2EA] text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#20231F] border-2 border-[#20231F]/15 hover:border-[#20231F] shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer min-h-[54px] active:scale-[0.97]"
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF6747]/15 group-hover:bg-[#FF6747] flex items-center justify-center transition-colors">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6747] group-hover:text-white transition-colors" />
              </span>
              <span className="tabular-nums">074397 61994</span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#20231F]/80 font-bold uppercase tracking-wider">
            <span>Women-Owned Studio</span>
            <span className="text-[#FF6747]">·</span>
            <span>Unisex Fitness Floor</span>
            <span className="text-[#FF6747]">·</span>
            <span>Private Salon Wing</span>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Dumbbell & Atmospheric Loop */}
        <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
          {/* Double-Bezel Hardware Enclosure */}
          <div className="relative w-full aspect-square max-w-[500px] p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-[2rem] shadow-xl">
            <div className="relative w-full h-full bg-[#EDE9DF] rounded-[calc(2rem-0.5rem)] overflow-hidden flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              {viewMode === '3d' ? (
                <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                  <SculpturalDumbbellCanvas
                    interactivePointer={true}
                    finish={finish}
                    exploded={exploded}
                    wireframe={wireframe}
                    onTelemetryChange={handleTelemetryChange}
                    className="w-full h-full"
                  />

                  {/* Bottom Telemetry & Quick Action Bar */}
                  <div className="absolute bottom-3 inset-x-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#20231F]/90 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs border border-[#20231F]/10 pointer-events-auto">
                    <div className="flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-pulse" />
                      <span className="font-bold text-[11px] uppercase tracking-wider">Drag 360°:</span>
                      <span ref={telemetryDegRef} className="font-bold tabular-nums text-[#FF6747]">28°</span>
                    </div>

                    {/* Exploded & Wireframe Tactile Toggle Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setExploded(!exploded)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer border active:scale-95 ${
                          exploded
                            ? 'bg-[#FF6747] text-white border-[#FF6747] shadow-xs'
                            : 'bg-white text-[#20231F] border-[#20231F]/20 hover:border-[#FF6747]'
                        }`}
                      >
                        {exploded ? 'Collapsed' : 'Explode Spec'}
                      </button>

                      <button
                        onClick={() => setWireframe(!wireframe)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all cursor-pointer border active:scale-95 ${
                          wireframe
                            ? 'bg-[#8177FF] text-white border-[#8177FF] shadow-xs'
                            : 'bg-white text-[#20231F] border-[#20231F]/20 hover:border-[#8177FF]'
                        }`}
                      >
                        {wireframe ? 'Shaded' : 'Wireframe'}
                      </button>
                    </div>
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

              {/* Top Finish Swatches & Model Switcher */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-20 pointer-events-auto">
                {/* Material Finish Swatches */}
                {viewMode === '3d' && (
                  <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-xs border border-[#20231F]/10">
                    <button
                      onClick={() => setFinish('signature')}
                      title="Signature Persimmon & Periwinkle Finish"
                      className={`px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        finish === 'signature'
                          ? 'bg-[#20231F] text-white shadow-xs'
                          : 'text-[#20231F]/70 hover:text-[#20231F]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
                      <span className="hidden sm:inline">Signature</span>
                    </button>

                    <button
                      onClick={() => setFinish('stealth')}
                      title="Stealth Black Oxide Finish"
                      className={`px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        finish === 'stealth'
                          ? 'bg-[#20231F] text-white shadow-xs'
                          : 'text-[#20231F]/70 hover:text-[#20231F]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#20231F]" />
                      <span className="hidden sm:inline">Stealth</span>
                    </button>

                    <button
                      onClick={() => setFinish('prestige')}
                      title="Prestige Champagne Gold Finish"
                      className={`px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        finish === 'prestige'
                          ? 'bg-[#20231F] text-white shadow-xs'
                          : 'text-[#20231F]/70 hover:text-[#20231F]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span className="hidden sm:inline">Prestige</span>
                    </button>
                  </div>
                )}

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-xs border border-[#20231F]/10 ml-auto">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1 text-xs font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      viewMode === '3d'
                        ? 'bg-[#20231F] text-white shadow-xs'
                        : 'text-[#20231F]/70 hover:text-[#20231F]'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D</span>
                  </button>
                  <button
                    onClick={() => setViewMode('video')}
                    className={`px-3 py-1 text-xs font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      viewMode === 'video'
                        ? 'bg-[#20231F] text-white shadow-xs'
                        : 'text-[#20231F]/70 hover:text-[#20231F]'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Loop</span>
                  </button>
                </div>
              </div>
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
