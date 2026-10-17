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
    <section className="relative w-full min-h-[92svh] pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-10 lg:px-16 flex flex-col justify-between overflow-hidden bg-[#F5F2EA]">
      {/* Main Hero Grid: Balanced Editorial Space & Expansive 3D Canvas / Video */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center my-auto w-full max-w-[1440px] mx-auto">
        {/* Left Column: Bold Typography & Conversion Deck */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center z-10">
          {/* Trust Metric Statement */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 text-sm font-semibold text-[#174D3B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#174D3B] flex-shrink-0 animate-pulse" />
            <span>4.7 rating across 355+ Google reviews · Rahara & Khardaha</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.98] break-words">
            Strength Meets Glamour.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#3C403A] font-normal leading-relaxed max-w-xl font-sans">
            Khardaha's premier unisex fitness atelier and private beauty studio. Biomechanical strength training meets bespoke salon care under one refined roof.
          </p>

          {/* Confident Actions with Clear Boutique Affordance */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
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

        {/* Right Column: Seamless Expansive 3D Stage & Cinematic Video Playback (NO BOX) */}
        <div className="lg:col-span-6 xl:col-span-6 relative w-full flex flex-col items-center justify-center min-h-[460px] sm:min-h-[560px] lg:min-h-[660px]">
          {/* Ambient Studio Lighting (Organic atmospheric radial glow, zero harsh box edges) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,103,71,0.14)_0%,rgba(129,119,255,0.06)_45%,transparent_75%)] pointer-events-none blur-3xl -z-10" />

          {/* Floating Top Control Dock: Finish Swatches (when in 3D) & View Mode Switcher */}
          <div className="absolute top-2 right-2 sm:right-4 z-30 flex flex-wrap items-center gap-2 pointer-events-auto">
            {/* Material Finish Swatches - shown in 3D mode */}
            {viewMode === '3d' && (
              <div className="flex items-center gap-1 bg-white/85 backdrop-blur-md p-1 rounded-full shadow-xs border border-[#20231F]/10">
                <button
                  type="button"
                  onClick={() => setFinish('signature')}
                  title="Signature Persimmon & Periwinkle Finish"
                  className={`px-3 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    finish === 'signature'
                      ? 'bg-[#20231F] text-white shadow-xs'
                      : 'text-[#20231F]/70 hover:text-[#20231F]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
                  <span className="hidden sm:inline">Signature</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFinish('stealth')}
                  title="Stealth Black Oxide Finish"
                  className={`px-3 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    finish === 'stealth'
                      ? 'bg-[#20231F] text-white shadow-xs'
                      : 'text-[#20231F]/70 hover:text-[#20231F]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#20231F]" />
                  <span className="hidden sm:inline">Stealth</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFinish('prestige')}
                  title="Prestige Champagne Gold Finish"
                  className={`px-3 py-1 text-[11px] font-extrabold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
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
            <div className="flex items-center gap-1 bg-white/85 backdrop-blur-md p-1 rounded-full shadow-xs border border-[#20231F]/10">
              <button
                type="button"
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
                type="button"
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

          {viewMode === '3d' ? (
            <div className="w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[660px] relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
              <SculpturalDumbbellCanvas
                interactivePointer={true}
                finish={finish}
                exploded={exploded}
                wireframe={wireframe}
                onTelemetryChange={handleTelemetryChange}
                className="w-full h-full"
              />

              {/* Floating Bottom Telemetry & Quick Action Bar */}
              <div className="absolute bottom-2 inset-x-2 sm:inset-x-4 flex flex-wrap items-center justify-between gap-2 z-20 pointer-events-auto">
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-[#20231F]/90 shadow-xs border border-[#20231F]/10 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-pulse" />
                  <span>Drag 360°:</span>
                  <span ref={telemetryDegRef} className="font-bold tabular-nums text-[#FF6747]">28°</span>
                </div>

                {/* Exploded & Wireframe Tactile Toggle Buttons */}
                <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md p-1 rounded-full shadow-xs border border-[#20231F]/10">
                  <button
                    type="button"
                    onClick={() => setExploded(!exploded)}
                    className={`px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full transition-all cursor-pointer border active:scale-95 ${
                      exploded
                        ? 'bg-[#FF6747] text-white border-[#FF6747] shadow-xs'
                        : 'bg-white text-[#20231F] border-[#20231F]/15 hover:border-[#FF6747]'
                    }`}
                  >
                    {exploded ? 'Collapsed' : 'Explode Spec'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setWireframe(!wireframe)}
                    className={`px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-full transition-all cursor-pointer border active:scale-95 ${
                      wireframe
                        ? 'bg-[#8177FF] text-white border-[#8177FF] shadow-xs'
                        : 'bg-white text-[#20231F] border-[#20231F]/15 hover:border-[#8177FF]'
                    }`}
                  >
                    {wireframe ? 'Shaded' : 'Wireframe'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Cinematic Video Playback with Adjusted Luxury Dimensions */
            <div className="w-full max-w-[660px] aspect-[16/10] sm:aspect-[16/9] relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#20231F]/10 bg-[#161815] group">
              <LazyVideo
                src={PULSEFORM_ASSETS.V01.src}
                poster={PULSEFORM_ASSETS.I01.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Ambient Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-pulse" />
                <span>Live Studio Feed · Khardaha Floor</span>
              </div>

              {/* Bottom Cinematic Telemetry */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-white/90 font-mono pointer-events-none z-10">
                <span>CINEMATIC REEL // 01</span>
                <span className="text-[#FF6747] font-bold">ATMOSPHERIC PLAYBACK</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grounded Studio Metadata Bar: Clean tone block, no hairline rules, no monospace */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto mt-6 sm:mt-8 pt-4 border-t border-[#20231F]/5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#20231F]/80">
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
