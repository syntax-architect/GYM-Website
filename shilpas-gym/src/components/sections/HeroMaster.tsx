import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight, Phone, MapPin, Clock, Sparkles, Layers, Eye, Play, Box } from 'lucide-react';
import {
  SculpturalDumbbellCanvas,
  type DumbbellFinish,
} from '../3d/SculpturalDumbbellCanvas';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface HeroMasterProps {
  onOpenInquiry: () => void;
}

const FINISH_SPECS: Record<
  DumbbellFinish,
  { label: string; dot: string; code: string; materialNote: string }
> = {
  signature: {
    label: 'SIGNATURE',
    dot: 'bg-[#D9381E]',
    code: 'SPEC // 01 · INFRARED & CHAMPAGNE GOLD',
    materialNote: '216,000 PSI Carbon Shaft · Anodized Dual Heads',
  },
  stealth: {
    label: 'STEALTH',
    dot: 'bg-[#0D0D0E]',
    code: 'SPEC // 02 · BLACK OXIDE GUNMETAL',
    materialNote: 'Matte Black Oxide · Volcano Knurl Tolerance',
  },
  prestige: {
    label: 'PRESTIGE',
    dot: 'bg-[#C5A059]',
    code: 'SPEC // 03 · CHAMPAGNE BRONZE',
    materialNote: 'Hand-Polished Brass Alloy · Atelier Edition',
  },
};

export const HeroMaster: React.FC<HeroMasterProps> = ({ onOpenInquiry }) => {
  const brand = useCmsStore((s) => s.brand);
  const [finish, setFinish] = useState<DumbbellFinish>('signature');
  const [exploded, setExploded] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d' | 'loop'>('3d');

  const telemetryAngleSpanRef = useRef<HTMLSpanElement>(null);
  const telemetryVelocitySpanRef = useRef<HTMLSpanElement>(null);
  const lastAngleRef = useRef<number>(32);
  const lastTimeRef = useRef<number>(performance.now());

  const handleTelemetryChange = useCallback(
    (data: { rotationY: number; finish: DumbbellFinish; isExploded: boolean }) => {
      const now = performance.now();
      const dt = Math.max(16, now - lastTimeRef.current);

      if (dt > 70) {
        let deltaDeg = Math.abs(data.rotationY - lastAngleRef.current);
        if (deltaDeg > 180) deltaDeg = 360 - deltaDeg;

        const degPerSec = (deltaDeg / dt) * 1000;
        const multiplier = Math.max(0.4, Math.min(4.8, +(degPerSec / 28).toFixed(1)));

        let newLabel = `${multiplier.toFixed(1)}x ORBIT`;
        if (multiplier > 1.2) {
          newLabel = `>> ${multiplier.toFixed(1)}x SCRUB`;
        } else if (multiplier < 0.6) {
          newLabel = `< 0.4x SLOW`;
        }

        lastAngleRef.current = data.rotationY;
        lastTimeRef.current = now;

        // Zero-render direct DOM update for high-frequency telemetry HUD
        if (telemetryAngleSpanRef.current) {
          const padded = String(data.rotationY).padStart(3, '0');
          const prefix = data.finish === 'signature' ? '1' : data.finish === 'stealth' ? '2' : '3';
          telemetryAngleSpanRef.current.textContent = `00:0${prefix}:${padded.slice(0, 2)}`;
        }
        if (telemetryVelocitySpanRef.current) {
          telemetryVelocitySpanRef.current.textContent = newLabel;
        }
      }
    },
    []
  );

  const activeSpec = FINISH_SPECS[finish];

  return (
    <section className="relative w-full min-h-[100svh] lg:h-[100svh] bg-[#F4F1EA] text-[#0D0D0E] overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-5 select-none">
      {/* Warm Architectural Radial Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 72% 48%, rgba(217, 56, 30, 0.08) 0%, rgba(197, 160, 89, 0.12) 34%, rgba(244, 241, 234, 0) 70%)',
        }}
      />

      {/* Fine 1px Architectural Crosshairs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 sm:top-24 h-px bg-[#0D0D0E]/8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute top-24 bottom-14 left-[50%] w-px bg-[#0D0D0E]/8"
      />

      {/* RIGHT-SIDE INTERACTIVE 3D STAGE (Properly Scaled & Framed) */}
      <div className="relative lg:absolute lg:top-20 lg:bottom-14 lg:right-0 lg:w-[52%] h-[280px] sm:h-[360px] lg:h-auto z-10 flex items-center justify-center order-2 lg:order-none">
        {viewMode === '3d' && (
          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="pointer-events-none absolute w-[82%] max-w-[460px] h-auto opacity-70"
          >
            <circle
              cx="300"
              cy="300"
              r="225"
              fill="none"
              stroke="#0D0D0E"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.22"
            />
            <path
              d="M 120 160 A 225 225 0 0 1 510 380"
              fill="none"
              stroke="#D9381E"
              strokeWidth="1.5"
              strokeDasharray="360"
              strokeDashoffset="240"
              className="transition-all duration-150"
            />
            <circle cx="480" cy="165" r="4" fill="#D9381E" />
            <circle
              cx="480"
              cy="165"
              r="11"
              fill="none"
              stroke="#D9381E"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        )}

        {/* Floating Drag Prompt */}
        {viewMode === '3d' && (
          <div className="pointer-events-none absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0E]/90 text-[#F4F1EA] backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E] animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              DRAG 360° TO ROTATE & INSPECT
            </span>
          </div>
        )}

        {viewMode === '3d' ? (
          <div className="w-full h-full flex items-center justify-center">
            <SculpturalDumbbellCanvas
              className="w-full h-full"
              exploded={exploded}
              finish={finish}
              onTelemetryChange={handleTelemetryChange}
              wireframe={wireframe}
            />
          </div>
        ) : (
          <div className="w-full h-full px-4 sm:px-10 flex items-center justify-center">
            <div className="relative w-full max-w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#0D0D0E]/15">
              <video
                src={brand.heroLoopVideoUrl}
                poster="/assets/images/i01-hero-still.webp"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  filter: 'sepia(0.2) hue-rotate(-12deg) contrast(1.08) saturate(1.15)',
                }}
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/75 text-white font-mono text-[10px] uppercase tracking-widest">
                MASTER REEL // V01 STUDIO LOOP
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOP TELEMETRY ROW */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-1 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0D0D0E]/10 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
          <span className="font-sans text-xs font-bold text-[#0D0D0E]">
            {brand.googleRating} Rating across {brand.reviewCount} Google Reviews · {brand.locationShort}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3.5 px-4 py-1.5 rounded-full bg-[#0D0D0E] text-[#F4F1EA] font-mono text-[11px] tracking-wider shadow-md">
          <span className="text-[#D9381E] font-bold">REEL 01</span>
          <span className="text-white/25">·</span>
          <span ref={telemetryAngleSpanRef} className="tabular-nums">
            00:0{finish === 'signature' ? '1' : finish === 'stealth' ? '2' : '3'}:32
          </span>
          <span className="text-white/25">·</span>
          <span ref={telemetryVelocitySpanRef} className="text-[#C5A059] tabular-nums">1.1x ORBIT</span>
        </div>
      </div>

      {/* MAIN EDITORIAL FOREGROUND (Compact so CTA & Bottom Bar never overflow 100svh) */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 my-auto py-2 lg:py-0 pointer-events-none order-1 lg:order-none">
        <div className="max-w-xl xl:max-w-2xl space-y-4 sm:space-y-5 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0D0D0E]/70 font-semibold">
            <span className="text-[#D9381E] font-bold">ACT I // DUAL SANCTUARY</span>
            <span className="w-6 h-px bg-[#0D0D0E]/30" />
            <span>{activeSpec.code}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.85rem] font-extrabold uppercase tracking-[-0.035em] text-[#0D0D0E] leading-[0.92]">
            STRENGTH <br />
            MEETS{' '}
            <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E] pr-2">
              Glamour.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#4A4843] max-w-lg leading-relaxed font-normal">
            {brand.locationShort}’s premier unisex fitness atelier and private beauty studio.
            Biomechanical strength training meets bespoke keratin & bridal artistry
            under one calibrated roof.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenInquiry}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 shadow-persimmon-subtle"
            >
              BOOK FREE TRIAL PASS
            </Button>

            <a
              href={`tel:${brand.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 min-h-[48px] sm:min-h-[52px] rounded-full bg-white/95 hover:bg-[#0D0D0E] text-[#0D0D0E] hover:text-[#F4F1EA] border border-[#0D0D0E]/15 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 shadow-xs active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#D9381E]" />
              <span className="tabular-nums">{brand.phone}</span>
            </a>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#0D0D0E]/70 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D9381E]" />
              WOMEN-OWNED STUDIO
            </span>
            <span className="text-[#0D0D0E]/25">•</span>
            <span>UNISEX FITNESS FLOOR</span>
            <span className="text-[#0D0D0E]/25">•</span>
            <span>PRIVATE SALON WING</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ARCHITECTURAL BAR + FLOATING 3D HARDWARE CONTROLLER */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-3 border-t border-[#0D0D0E]/10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 order-3 lg:order-none">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#0D0D0E]/75 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
            <MapPin className="w-3.5 h-3.5 text-[#0D0D0E]" />
            {brand.fullAddress}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#0D0D0E]/65">
            <Clock className="w-3.5 h-3.5 text-[#D9381E]" />
            Open Daily: {brand.hours}
          </span>
        </div>

        {/* Floating Hardware Spec Dock */}
        <div className="w-full xl:w-auto flex items-center justify-start xl:justify-end gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#0D0D0E]/12 shadow-sculptural overflow-x-auto max-w-full no-scrollbar">
          <div className="flex items-center gap-1">
            {(['signature', 'stealth', 'prestige'] as DumbbellFinish[]).map((item) => {
              const isSelected = finish === item;
              const spec = FINISH_SPECS[item];
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setViewMode('3d');
                    setFinish(item);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected && viewMode === '3d'
                      ? 'bg-[#0D0D0E] text-[#F4F1EA] shadow-xs'
                      : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E] hover:bg-[#0D0D0E]/5'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${spec.dot}`} />
                  <span>{spec.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-4 w-px bg-[#0D0D0E]/15 hidden sm:block" />

          {viewMode === '3d' && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  exploded
                    ? 'bg-[#D9381E] text-white'
                    : 'bg-[#F4F1EA] text-[#0D0D0E] hover:bg-[#0D0D0E]/10'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{exploded ? 'Collapse' : 'Explore Spec'}</span>
              </button>

              <button
                type="button"
                onClick={() => setWireframe((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  wireframe
                    ? 'bg-[#C5A059] text-white'
                    : 'bg-[#F4F1EA] text-[#0D0D0E] hover:bg-[#0D0D0E]/10'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{wireframe ? 'Shaded' : 'Wireframe'}</span>
              </button>
            </div>
          )}

          <div className="h-4 w-px bg-[#0D0D0E]/15 hidden sm:block" />

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase cursor-pointer transition-all ${
                viewMode === '3d'
                  ? 'bg-[#141311] text-white'
                  : 'text-[#0D0D0E]/65 hover:text-[#0D0D0E]'
              }`}
            >
              <Box className="w-3 h-3" />
              <span>3D</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('loop')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase cursor-pointer transition-all ${
                viewMode === 'loop'
                  ? 'bg-[#141311] text-white'
                  : 'text-[#0D0D0E]/65 hover:text-[#0D0D0E]'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>LOOP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMaster;
