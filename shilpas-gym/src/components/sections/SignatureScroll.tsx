import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PrincipleSpec {
  id: number;
  indexLabel: string;
  tag: string;
  title: string;
  serifAccent: string;
  description: string;
  metaLeftLabel: string;
  metaLeftValue: string;
  badge: string;
  frameRange: [number, number];
  /** Normalized SVG coordinates (0-1000 viewBox) on the 3D dumbbell for Valmora leader line */
  targetX: number;
  targetY: number;
}

const PRINCIPLES: PrincipleSpec[] = [
  {
    id: 1,
    indexLabel: '01 / 03',
    tag: 'MODERN EQUIPMENT',
    title: 'CALIBRATED',
    serifAccent: 'Machinery.',
    description:
      'Imported biomechanical selectorized machines, plate-loaded leg presses, Olympic power cages, and calibrated free weights engineered for targeted muscle isolation and joint safety.',
    metaLeftLabel: 'RANGE',
    metaLeftValue: 'Calibrated Heavy Machinery',
    badge: 'STUDIO STANDARD',
    frameRange: [1, 64],
    targetX: 430,
    targetY: 360,
  },
  {
    id: 2,
    indexLabel: '02 / 03',
    tag: 'FLOOR COACHING',
    title: 'BIOMECHANICAL',
    serifAccent: 'Supervision.',
    description:
      'Certified male and female floor coaches monitor every compound lift, correcting spinal alignment, tempo cadence, and progressive overload without ego-lifting.',
    metaLeftLabel: 'SUPERVISION',
    metaLeftValue: '1-on-1 & Floor Biomechanics',
    badge: 'CERTIFIED STAFF',
    frameRange: [65, 128],
    targetX: 500,
    targetY: 495,
  },
  {
    id: 3,
    indexLabel: '03 / 03',
    tag: 'PRIVATE WING',
    title: 'LUXURY SALON',
    serifAccent: 'Sanctuary.',
    description:
      'An acoustically separated, air-conditioned beauty wing featuring formaldehyde-free keratin smoothing, restorative hair botox spas, and high-definition bridal artistry.',
    metaLeftLabel: 'SERVICES',
    metaLeftValue: 'Keratin, Hair Spa & Bridal Studio',
    badge: 'PRIVATE SUITE',
    frameRange: [129, 192],
    targetX: 575,
    targetY: 635,
  },
];

export const SignatureScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [totalFrames, setTotalFrames] = useState<number>(192);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Render specific frame onto canvas with cover/contain scaling
  const renderFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameNumber - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Draw image centered with clean aspect ratio preservation
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = height * 0.92;
      drawWidth = drawHeight * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = width * 0.95;
      drawHeight = drawWidth / imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  // Preload WebP frame sequence (Desktop 192 frames / Mobile 96 frames)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 96 : 192;
    setTotalFrames(count);

    const loadedImages: HTMLImageElement[] = new Array(count);
    imagesRef.current = loadedImages;

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, '0');
      img.src = isMobile
        ? `/assets/sequences/v04-sculpture/mobile/${padded}.webp`
        : `/assets/sequences/v04-sculpture/${padded}.webp`;

      if (i === 1) {
        img.onload = () => {
          renderFrame(1);
        };
      }
      loadedImages[i - 1] = img;
    }

    const handleResize = () => renderFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // GSAP ScrollTrigger Scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.max(
            1,
            Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            setCurrentFrame(frameIndex);
            renderFrame(frameIndex);
          }

          if (progress < 0.34) {
            setActiveIndex(0);
          } else if (progress < 0.67) {
            setActiveIndex(1);
          } else {
            setActiveIndex(2);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [totalFrames, renderFrame]);

  // Allow user to click a pill on the right to jump/scrub to that principle
  const handleSelectPrinciple = (idx: number) => {
    setActiveIndex(idx);
    const targetProgress = idx === 0 ? 0.12 : idx === 1 ? 0.5 : 0.88;
    const targetFrame = Math.max(1, Math.round(targetProgress * totalFrames));
    currentFrameRef.current = targetFrame;
    setCurrentFrame(targetFrame);
    renderFrame(targetFrame);
  };

  const activeSpec = PRINCIPLES[activeIndex];
  const turnDegrees = Math.round(((currentFrame - 1) / Math.max(1, totalFrames - 1)) * 360);
  const paddedFrame = String(currentFrame).padStart(4, '0');
  const paddedTotal = String(totalFrames).padStart(4, '0');

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#E8E4DC] text-[#20231F] select-none"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-20 sm:py-24">
        {/* Radial Studio Backlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.78) 0%, rgba(232, 228, 220, 0.35) 55%, rgba(220, 215, 205, 0.9) 100%)',
          }}
        />

        {/* 192-Frame Sequence Canvas */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1150px] max-h-[82vh]"
          />
        </div>

        {/* VALMORA 1PX SVG ANATOMICAL LEADER LINE OVERLAY (Desktop) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="pointer-events-none hidden lg:block absolute inset-0 w-full h-full z-20"
        >
          {/* Diagonal 1px Leader Line from Left Spec Card to 3D Dumbbell Target */}
          <line
            x1="365"
            y1="520"
            x2={activeSpec.targetX}
            y2={activeSpec.targetY}
            stroke="#20231F"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.45"
          />
          <line
            x1="365"
            y1="520"
            x2={activeSpec.targetX}
            y2={activeSpec.targetY}
            stroke="#FF6747"
            strokeWidth="1.5"
            opacity="0.85"
          />

          {/* Anchor Node on Spec Card Edge */}
          <circle cx="365" cy="520" r="3.5" fill="#FF6747" />

          {/* Target Reticle on 3D Sculpture */}
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="5"
            fill="#FF6747"
          />
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="14"
            fill="none"
            stroke="#FF6747"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="22"
            fill="none"
            stroke="#20231F"
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.35"
          />
        </svg>

        {/* TOP TELEMETRY HUD BAR */}
        <div className="relative z-30 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#20231F]/12 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#20231F]">
              360° PRECISION BIOMECHANICS SEQUENCE
            </span>
          </div>

          <div className="inline-flex items-center gap-3 sm:gap-4 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#20231F]/12 shadow-xs font-mono text-xs font-bold text-[#20231F]">
            <span className="tabular-nums">Turn: {turnDegrees}°</span>
            <span className="text-[#20231F]/25">|</span>
            <span className="tabular-nums text-[#20231F]/70">
              FRAME {paddedFrame} / {paddedTotal}
            </span>
            <span className="text-[#20231F]/25 hidden sm:inline">|</span>
            <span className="text-[#FF6747] uppercase tracking-wider hidden sm:inline">
              {activeSpec.tag}
            </span>
          </div>
        </div>

        {/* CENTER INTERACTIVE CALLOUT STAGE (Left Macro Spec Card + Right Quick Switcher) */}
        <div className="relative z-30 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 my-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: Valmora-Style Macro Specification Card */}
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#20231F]/12 shadow-sculptural transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#FF6747]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
                {activeSpec.tag}
              </span>
              <span className="font-serif italic text-2xl sm:text-3xl text-[#20231F]/45">
                {activeSpec.indexLabel}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#20231F] leading-[1.02] mb-3">
              {activeSpec.title}{' '}
              <span className="font-serif italic font-normal capitalize text-[#FF6747]">
                {activeSpec.serifAccent}
              </span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#4C514A] leading-relaxed mb-6">
              {activeSpec.description}
            </p>

            <div className="pt-4 border-t border-[#20231F]/10 flex items-center justify-between gap-3">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#20231F]/50">
                  {activeSpec.metaLeftLabel}
                </span>
                <span className="font-sans text-xs sm:text-sm font-bold text-[#20231F]">
                  {activeSpec.metaLeftValue}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#174D3B]/10 text-[#174D3B] font-mono text-[10px] font-bold uppercase tracking-widest">
                {activeSpec.badge}
              </span>
            </div>
          </div>

          {/* Right: Interactive Hotspot Selector Dock */}
          <div className="flex flex-row lg:flex-col gap-2.5 w-full lg:w-64 overflow-x-auto pb-2 lg:pb-0">
            {PRINCIPLES.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPrinciple(idx)}
                  className={`flex-1 lg:flex-none px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#20231F] text-[#F5F2EA] border-[#20231F] shadow-lg'
                      : 'bg-white/85 text-[#20231F] border-[#20231F]/12 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#FF6747]' : 'bg-[#20231F]/30'
                      }`}
                    />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-[#20231F]/8 text-[#20231F]/70'
                    }`}
                  >
                    #{item.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM TIMELINE SCRUBBER BAR (Valmora 01 - 02 - 03 Progress Line) */}
        <div className="relative z-30 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#20231F]/15">
            {PRINCIPLES.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPrinciple(idx)}
                  className="text-left group cursor-pointer"
                >
                  <div className="h-1 w-full bg-[#20231F]/12 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'w-full bg-[#FF6747]' : 'w-0 bg-transparent'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                    <span
                      className={
                        isSelected
                          ? 'font-bold text-[#20231F]'
                          : 'text-[#20231F]/50 group-hover:text-[#20231F]'
                      }
                    >
                      0{item.id} · {item.tag}
                    </span>
                    <span className="text-[#20231F]/40 hidden sm:inline">
                      F{String(item.frameRange[0]).padStart(3, '0')}–
                      {String(item.frameRange[1]).padStart(3, '0')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureScroll;
