import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowUpRight, Phone, MapPin, Clock, Sparkles, Layers, Eye, Play, Box } from 'lucide-react';
import {
  SculpturalDumbbellCanvas,
  type DumbbellFinish,
} from '../3d/SculpturalDumbbellCanvas';
import { Button } from '../ui/Button';

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
    code: 'SPEC // 01 · PERSIMMON & PERIWINKLE',
    materialNote: '216,000 PSI Carbon Shaft · Dual Urethane Heads',
  },
  stealth: {
    label: 'STEALTH',
    dot: 'bg-[#0D0D0E]',
    code: 'SPEC // 02 · BLACK OXIDE GUNMETAL',
    materialNote: 'Matte Black Oxide · Volcano Knurl Tolerance',
  },
  prestige: {
    label: 'PRESTIGE',
    dot: 'bg-[#CFA852]',
    code: 'SPEC // 03 · CHAMPAGNE BRONZE',
    materialNote: 'Hand-Polished Brass Alloy · Atelier Edition',
  },
};

export const HeroMaster: React.FC<HeroMasterProps> = ({ onOpenInquiry }) => {
  const [finish, setFinish] = useState<DumbbellFinish>('signature');
  const [exploded, setExploded] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d' | 'loop'>('3d');
  const [rotationY, setRotationY] = useState<number>(32);
  const [velocityLabel, setVelocityLabel] = useState<string>('0.4x IDLE');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const lastAngleRef = useRef<number>(32);
  const lastTimeRef = useRef<number>(performance.now());

  // Track subtle window scroll for 3D parallax coupling
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Calculate Valmora-style real-time angular velocity telemetry
  const handleTelemetryChange = useCallback(
    (data: { rotationY: number; finish: DumbbellFinish; isExploded: boolean }) => {
      const now = performance.now();
      const dt = Math.max(16, now - lastTimeRef.current);

      if (dt > 80) {
        let deltaDeg = Math.abs(data.rotationY - lastAngleRef.current);
        if (deltaDeg > 180) deltaDeg = 360 - deltaDeg;

        const degPerSec = (deltaDeg / dt) * 1000;
        const multiplier = Math.max(0.4, Math.min(4.8, +(degPerSec / 28).toFixed(1)));

        if (multiplier > 1.2) {
          setVelocityLabel(`>> ${multiplier.toFixed(1)}x SCRUB`);
        } else if (multiplier < 0.6) {
          setVelocityLabel(`< 0.4x SLOW`);
        } else {
          setVelocityLabel(`${multiplier.toFixed(1)}x ORBIT`);
        }

        lastAngleRef.current = data.rotationY;
        lastTimeRef.current = now;
        setRotationY(data.rotationY);
      }
    },
    []
  );

  // Format angle into Valmora timecode style (00:03:42)
  const paddedAngle = String(rotationY).padStart(3, '0');
  const activeSpec = FINISH_SPECS[finish];

  return (
    <section className="relative w-full min-h-[100svh] bg-[#F5F2EA] text-[#0D0D0E] overflow-hidden flex flex-col justify-between pt-36 sm:pt-40 lg:pt-44 pb-8 select-none">
      {/* Subtle Architectural Radial Spotlight & Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 68% 46%, rgba(217, 56, 30, 0.10) 0%, rgba(197, 160, 89, 0.08) 32%, rgba(245, 242, 234, 0) 70%)',
        }}
      />

      {/* Fine 1px Architectural Crosshairs (Valmora Atelier Motif) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-36 sm:top-40 lg:top-44 h-px bg-[#0D0D0E]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute top-36 sm:top-40 lg:top-44 bottom-16 left-[52%] w-px bg-[#0D0D0E]/8"
      />

      {/* FULL-BLEED INTERACTIVE 3D / VIDEO STAGE (Unboxed) */}
      <div className="relative lg:absolute lg:inset-y-16 lg:right-0 lg:w-[58%] h-[420px] sm:h-[500px] lg:h-auto z-10 flex items-center justify-center order-2 lg:order-none">
        {/* Valmora-Inspired SVG Orbital Drag Arc & Leader Reticle */}
        {viewMode === '3d' && (
          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="pointer-events-none absolute w-[88%] max-w-[540px] h-auto opacity-65"
          >
            {/* Dashed Orbital Ring */}
            <circle
              cx="300"
              cy="300"
              r="230"
              fill="none"
              stroke="#0D0D0E"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.25"
            />
            {/* Active Scrubbing Arc */}
            <path
              d="M 120 160 A 230 230 0 0 1 515 380"
              fill="none"
              stroke="#D9381E"
              strokeWidth="1.5"
              strokeDasharray="360"
              strokeDashoffset={Math.round(360 - (rotationY / 360) * 360)}
              className="transition-all duration-150"
            />
            {/* Target Reticle Dot on Arc */}
            <circle cx="485" cy="165" r="4" fill="#D9381E" />
            <circle
              cx="485"
              cy="165"
              r="11"
              fill="none"
              stroke="#D9381E"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        )}

        {/* Drag-to-Reveal Floating Prompt (Valmora Motif) */}
        {viewMode === '3d' && (
          <div className="pointer-events-none absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D0D0E]/90 text-[#F5F2EA] backdrop-blur-md shadow-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#D9381E] animate-ping" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              DRAG TO ORBIT · {paddedAngle}°
            </span>
          </div>
        )}

        {/* 3D Canvas or Master Loop Video */}
        {viewMode === '3d' ? (
          <div className="w-full h-full flex items-center justify-center">
            <SculpturalDumbbellCanvas
              className="w-full h-full"
              exploded={exploded}
              finish={finish}
              onTelemetryChange={handleTelemetryChange}
              scrollProgress={scrollProgress}
              wireframe={wireframe}
            />
          </div>
        ) : (
          <div className="w-full h-full px-4 sm:px-10 lg:px-14 flex items-center justify-center">
            <div className="relative w-full max-w-[680px] aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#0D0D0E]/15">
              <video
                src="/assets/videos/v01-hero-loop.mp4"
                poster="/assets/images/i01-hero-still.webp"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 text-white font-mono text-[10px] uppercase tracking-widest">
                MASTER REEL // V01 STUDIO LOOP
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOP TELEMETRY BAR (Valmora + Oddball HUD) */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-2 flex flex-wrap items-center justify-between gap-4">
        {/* Verified Local Authority Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#0D0D0E]/12 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#141311]" />
          <span className="font-sans text-xs sm:text-sm font-bold text-[#0D0D0E]">
            4.7 Rating across 355+ Google Reviews · Rahara & Khardaha
          </span>
        </div>

        {/* Live Telemetry Readout (Top-Right HUD) */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F5F2EA] font-mono text-xs tracking-wider shadow-md">
          <span className="text-[#D9381E] font-bold">REEL 01</span>
          <span className="text-white/30">·</span>
          <span className="tabular-nums">
            00:0{finish === 'signature' ? '1' : finish === 'stealth' ? '2' : '3'}:{paddedAngle.slice(0, 2)}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-[#E6DEC8] tabular-nums">{velocityLabel}</span>
        </div>
      </div>

      {/* MAIN EDITORIAL FOREGROUND */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 my-auto py-6 lg:py-12 pointer-events-none">
        <div className="max-w-2xl space-y-6 pointer-events-auto">
          {/* Technical Act Tag */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#141311] font-semibold">
            <span>ACT I // DUAL SANCTUARY</span>
            <span className="w-8 h-px bg-[#141311]/40" />
            <span className="text-[#0D0D0E]/60">{activeSpec.code}</span>
          </div>

          {/* High-Contrast Valmora / Oddball Display Typography */}
          <h1 className="font-display text-5xl sm:text-7xl xl:text-[5.4rem] font-extrabold uppercase tracking-[-0.035em] text-[#0D0D0E] leading-[0.94]">
            STRENGTH <br />
            MEETS{' '}
            <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E] pr-2">
              Glamour.
            </span>
          </h1>

          {/* Concise Editorial Copy */}
          <p className="font-sans text-base sm:text-lg text-[#4C514A] max-w-xl leading-relaxed font-normal">
            Khardaha’s premier unisex fitness atelier and private beauty studio.
            Biomechanical strength training meets bespoke keratin & bridal artistry
            under one calibrated roof.
          </p>

          {/* Primary Conversion Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenInquiry}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="min-h-[54px] px-8 shadow-persimmon-subtle"
            >
              BOOK FREE TRIAL PASS
            </Button>

            <a
              href="tel:07439761994"
              className="inline-flex items-center gap-3 px-6 min-h-[54px] rounded-full bg-white/90 hover:bg-[#0D0D0E] text-[#0D0D0E] hover:text-[#F5F2EA] border border-[#0D0D0E]/15 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 shadow-xs active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#D9381E]" />
              <span className="tabular-nums">074397 61994</span>
            </a>
          </div>

          {/* 3-Pillar Micro Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#0D0D0E]/75 font-semibold">
            <span className="inline-flex items-center gap-2">
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
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-4 border-t border-[#0D0D0E]/12 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        {/* Left: Physical Telemetry & Google Plus Code */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#0D0D0E]/80 font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
            <MapPin className="w-3.5 h-3.5 text-[#141311]" />
            Naskarhat Madhya Para, Rahara, Khardaha, Kolkata 700118
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0D0D0E]/70">
            <Clock className="w-3.5 h-3.5 text-[#D9381E]" />
            Open Daily: 06:00 AM – 10:00 PM
          </span>
        </div>

        {/* Right: Floating Hardware Spec Dock (Controls 3D Dumbbell State) */}
        <div className="w-full xl:w-auto flex flex-wrap items-center justify-between xl:justify-end gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#0D0D0E]/12 shadow-sculptural">
          {/* Material Finish Selector Pills */}
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected && viewMode === '3d'
                      ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-xs'
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

          {/* Explode Bushing Spec & Wireframe Toggles */}
          {viewMode === '3d' && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  exploded
                    ? 'bg-[#D9381E] text-white'
                    : 'bg-[#F5F2EA] text-[#0D0D0E] hover:bg-[#0D0D0E]/10'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>{exploded ? 'Collapse' : 'Explore Spec'}</span>
              </button>

              <button
                type="button"
                onClick={() => setWireframe((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  wireframe
                    ? 'bg-[#C5A059] text-white'
                    : 'bg-[#F5F2EA] text-[#0D0D0E] hover:bg-[#0D0D0E]/10'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>{wireframe ? 'Shaded' : 'Wireframe'}</span>
              </button>
            </div>
          )}

          <div className="h-4 w-px bg-[#0D0D0E]/15 hidden sm:block" />

          {/* 3D vs Loop Switcher */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase cursor-pointer transition-all ${
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
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase cursor-pointer transition-all ${
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
