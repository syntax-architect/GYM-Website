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

  const [totalFrames, setTotalFrames] = useState<number>(192);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const batchLoadingStartedRef = useRef(false);
  const canvasSizeRef = useRef<{ width: number; height: number; dpr: number }>({ width: 0, height: 0, dpr: 1 });
  const turnDegreesSpanRef = useRef<HTMLSpanElement>(null);
  const paddedFrameSpanRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef<number>(0);

  // Measure and cache canvas backing-store buffer (runs strictly on resize & mount, NOT during scroll)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    canvasSizeRef.current = { width, height, dpr };

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }
  }, []);

  // Render specific frame onto canvas using cached geometry — ZERO layout reflows!
  const renderFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameNumber - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Nearest-loaded-frame fallback so fast scrolling never flashes blank!
      const total = imagesRef.current.length;
      let closestImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < total; offset++) {
        const left = frameNumber - 1 - offset;
        const right = frameNumber - 1 + offset;
        if (left >= 0 && imagesRef.current[left]?.complete && imagesRef.current[left].naturalWidth > 0) {
          closestImg = imagesRef.current[left];
          break;
        }
        if (right < total && imagesRef.current[right]?.complete && imagesRef.current[right].naturalWidth > 0) {
          closestImg = imagesRef.current[right];
          break;
        }
      }
      if (!closestImg) return;
      img = closestImg;
    }

    const { width, height, dpr } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

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

  // Progressive 2-Stage Preloader: Frame 1 immediately (~20KB), rest batched on scroll/idle
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 96 : 192;
    setTotalFrames(count);

    const loadedImages: HTMLImageElement[] = new Array(count);
    imagesRef.current = loadedImages;

    const getFrameUrl = (idx: number) => {
      const padded = String(idx).padStart(4, '0');
      return isMobile
        ? `/assets/sequences/v04-sculpture/mobile/${padded}.webp`
        : `/assets/sequences/v04-sculpture/${padded}.webp`;
    };

    // Stage 1: ONLY preload Frame 0001.webp on initial mount
    const frame1 = new Image();
    frame1.decoding = 'async';
    frame1.src = getFrameUrl(1);
    frame1.onload = () => {
      loadedImages[0] = frame1;
      updateCanvasDimensions();
      renderFrame(1);
    };
    loadedImages[0] = frame1;

    // Stage 2: Batch-load frames 0002 to count in chunks of 16
    const startBatchPreload = () => {
      if (batchLoadingStartedRef.current) return;
      batchLoadingStartedRef.current = true;

      const BATCH_SIZE = 16;
      let currentBatchStart = 2;

      const loadNextChunk = () => {
        if (currentBatchStart > count) return;
        const currentBatchEnd = Math.min(count, currentBatchStart + BATCH_SIZE - 1);
        let pending = currentBatchEnd - currentBatchStart + 1;

        for (let i = currentBatchStart; i <= currentBatchEnd; i++) {
          const img = new Image();
          img.decoding = 'async';
          img.src = getFrameUrl(i);
          img.onload = () => {
            loadedImages[i - 1] = img;
            pending--;
            if (pending === 0) {
              if ('requestIdleCallback' in window) {
                (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(loadNextChunk, { timeout: 200 });
              } else {
                setTimeout(loadNextChunk, 16);
              }
            }
          };
          img.onerror = () => {
            pending--;
            if (pending === 0) {
              setTimeout(loadNextChunk, 16);
            }
          };
          loadedImages[i - 1] = img;
        }

        currentBatchStart = currentBatchEnd + 1;
      };

      loadNextChunk();
    };

    // Trigger Stage 2 with IntersectionObserver (800px margin) or fallback idle
    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (container && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startBatchPreload();
            observer?.disconnect();
          }
        },
        { rootMargin: '800px 0px' }
      );
      observer.observe(container);
    } else {
      setTimeout(startBatchPreload, 2500);
    }

    const idleTimer = setTimeout(() => {
      startBatchPreload();
    }, 3000);

    const handleResize = () => {
      updateCanvasDimensions();
      renderFrame(currentFrameRef.current);
    };

    updateCanvasDimensions();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer?.disconnect();
      clearTimeout(idleTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, updateCanvasDimensions]);

  // GSAP ScrollTrigger Scrubbing with ZERO React Re-Renders
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.max(
            1,
            Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1)
          );

          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            renderFrame(frameIndex);

            // Direct DOM update for zero React render overhead on scroll!
            if (turnDegreesSpanRef.current) {
              const turnDegrees = Math.round(((frameIndex - 1) / Math.max(1, totalFrames - 1)) * 360);
              turnDegreesSpanRef.current.textContent = `Turn: ${turnDegrees}°`;
            }
            if (paddedFrameSpanRef.current) {
              const padded = String(frameIndex).padStart(4, '0');
              paddedFrameSpanRef.current.textContent = `FRAME ${padded} / ${String(totalFrames).padStart(4, '0')}`;
            }
          }

          const nextIdx = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
          if (nextIdx !== activeIndexRef.current) {
            activeIndexRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [totalFrames, renderFrame]);

  // Allow user to click a pill on the right to jump/scrub to that principle
  const handleSelectPrinciple = (idx: number) => {
    activeIndexRef.current = idx;
    setActiveIndex(idx);
    const targetProgress = idx === 0 ? 0.12 : idx === 1 ? 0.5 : 0.88;
    const targetFrame = Math.max(1, Math.round(targetProgress * totalFrames));
    currentFrameRef.current = targetFrame;
    renderFrame(targetFrame);

    if (turnDegreesSpanRef.current) {
      const turnDegrees = Math.round(((targetFrame - 1) / Math.max(1, totalFrames - 1)) * 360);
      turnDegreesSpanRef.current.textContent = `Turn: ${turnDegrees}°`;
    }
    if (paddedFrameSpanRef.current) {
      const padded = String(targetFrame).padStart(4, '0');
      paddedFrameSpanRef.current.textContent = `FRAME ${padded} / ${String(totalFrames).padStart(4, '0')}`;
    }
  };

  const activeSpec = PRINCIPLES[activeIndex];
  const turnDegrees = Math.round(((currentFrameRef.current - 1) / Math.max(1, totalFrames - 1)) * 360);
  const paddedFrame = String(currentFrameRef.current).padStart(4, '0');
  const paddedTotal = String(totalFrames).padStart(4, '0');

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#E8E4DC] text-[#0D0D0E] select-none z-10"
    >
      <h2 className="sr-only">Signature 360° Biomechanical Sequence</h2>

      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between pt-16 sm:pt-24 pb-3 sm:pb-6">
        {/* Radial Studio Backlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.78) 0%, rgba(232, 228, 220, 0.35) 55%, rgba(220, 215, 205, 0.9) 100%)',
          }}
        />

        {/* 192-Frame Sequence Canvas with Warm Bronze/Crimson Optical Grade & Vignette Mask */}
        <div className="absolute inset-0 z-10 flex items-start sm:items-center justify-center pt-16 sm:pt-0 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[1080px] max-h-[55vh] sm:max-h-[80vh]"
            style={{
              filter: 'sepia(0.24) hue-rotate(-14deg) saturate(1.25) contrast(1.06)',
              WebkitMaskImage:
                'radial-gradient(ellipse 68% 68% at 50% 50%, #000 62%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 68% 68% at 50% 50%, #000 62%, transparent 100%)',
            }}
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
            stroke="#0D0D0E"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.45"
          />
          <line
            x1="365"
            y1="520"
            x2={activeSpec.targetX}
            y2={activeSpec.targetY}
            stroke="#D9381E"
            strokeWidth="1.5"
            opacity="0.85"
          />

          {/* Anchor Node on Spec Card Edge */}
          <circle cx="365" cy="520" r="3.5" fill="#D9381E" />

          {/* Target Reticle on 3D Sculpture */}
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="5"
            fill="#D9381E"
          />
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="14"
            fill="none"
            stroke="#D9381E"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle
            cx={activeSpec.targetX}
            cy={activeSpec.targetY}
            r="22"
            fill="none"
            stroke="#0D0D0E"
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.35"
          />
        </svg>

        {/* TOP TELEMETRY HUD BAR */}
        <div className="relative z-30 max-w-[1440px] w-full mx-auto px-3 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0D0D0E]/12 shadow-xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D9381E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#0D0D0E]">
              360° PRECISION BIOMECHANICS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 sm:gap-4 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0D0D0E]/12 shadow-xs font-mono text-[10px] sm:text-xs font-bold text-[#0D0D0E]">
            <span ref={turnDegreesSpanRef} className="tabular-nums">Turn: {turnDegrees}°</span>
            <span className="text-[#0D0D0E]/25">|</span>
            <span ref={paddedFrameSpanRef} className="tabular-nums text-[#0D0D0E]/70">
              FRAME {paddedFrame} / {paddedTotal}
            </span>
            <span className="text-[#0D0D0E]/25 hidden sm:inline">|</span>
            <span className="text-[#D9381E] uppercase tracking-wider hidden sm:inline">
              {activeSpec.tag}
            </span>
          </div>
        </div>

        {/* CENTER INTERACTIVE CALLOUT STAGE (Left Macro Spec Card + Right Quick Switcher) */}
        <div className="relative z-30 max-w-[1440px] w-full mx-auto px-3 sm:px-8 lg:px-12 my-auto flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-8">
          {/* Left: Valmora-Style Double-Bezel Specification Card */}
          <div className="w-full max-w-md p-1 sm:p-2 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-2xl sm:rounded-[2rem] shadow-sculptural transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl p-3.5 sm:p-7 rounded-[calc(1rem)] sm:rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#D9381E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E]" />
                  {activeSpec.tag}
                </span>
                <span className="font-serif italic text-lg sm:text-2xl text-[#0D0D0E]/45">
                  {activeSpec.indexLabel}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-[1.05] mb-1.5 sm:mb-2.5">
                {activeSpec.title}{' '}
                <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                  {activeSpec.serifAccent}
                </span>
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#4C514A] leading-relaxed mb-2.5 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                {activeSpec.description}
              </p>

              <div className="pt-2 sm:pt-3 border-t border-[#0D0D0E]/10 flex items-center justify-between gap-3">
                <div>
                  <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#0D0D0E]/50">
                    {activeSpec.metaLeftLabel}
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-[#0D0D0E]">
                    {activeSpec.metaLeftValue}
                  </span>
                </div>

                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#141311]/10 text-[#141311] font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  {activeSpec.badge}
                </span>
              </div>
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
                      ? 'bg-[#0D0D0E] text-[#F5F2EA] border-[#0D0D0E] shadow-lg'
                      : 'bg-white/85 text-[#0D0D0E] border-[#0D0D0E]/12 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#D9381E]' : 'bg-[#0D0D0E]/30'
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
                        : 'bg-[#0D0D0E]/8 text-[#0D0D0E]/70'
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
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#0D0D0E]/15">
            {PRINCIPLES.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPrinciple(idx)}
                  className="text-left group cursor-pointer"
                  aria-label={`Jump to principle 0${idx + 1} - ${item.tag}`}
                >
                  <div className="h-1 w-full bg-[#0D0D0E]/12 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'w-full bg-[#D9381E]' : 'w-0 bg-transparent'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                    <span
                      className={
                        isSelected
                          ? 'font-bold text-[#0D0D0E]'
                          : 'text-[#0D0D0E]/50 group-hover:text-[#0D0D0E]'
                      }
                    >
                      0{item.id} · {item.tag}
                    </span>
                    <span className="text-[#0D0D0E]/40 hidden sm:inline">
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
