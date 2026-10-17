import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_WORDS = [
  { text: 'Close', accent: false },
  { text: 'tracking', accent: false },
  { text: 'through', accent: false },
  { text: 'a', accent: false },
  { text: 'shaft', accent: false },
  { text: 'of', accent: false },
  { text: 'daylight.', accent: false },
  { text: 'Powder', accent: true },
  { text: 'chalk', accent: true },
  { text: 'settling', accent: false },
  { text: 'against', accent: false },
  { text: 'knurled', accent: true },
  { text: 'steel.', accent: true },
  { text: 'Before', accent: false },
  { text: 'force', accent: false },
  { text: 'becomes', accent: false },
  { text: 'velocity,', accent: true },
  { text: 'it', accent: false },
  { text: 'begins', accent: false },
  { text: 'in', accent: false },
  { text: 'the', accent: false },
  { text: 'quiet', accent: false },
  { text: 'discipline', accent: true },
  { text: 'of', accent: false },
  { text: 'the', accent: false },
  { text: 'grip.', accent: true },
];

export const MomentumFilm: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const progressReadoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wordsContainer = wordsContainerRef.current;
    const videoFrame = videoFrameRef.current;

    if (!section || !wordsContainer || !videoFrame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wordElements = wordsContainer.querySelectorAll('.manifesto-word');

    const ctx = gsap.context(() => {
      // 1. Oddball-style word-by-word scroll illumination
      gsap.fromTo(
        wordElements,
        { opacity: 0.18, y: 6 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: wordsContainer,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );

      // 2. Valmora-style cinematic frame expansion on scroll
      gsap.fromTo(
        videoFrame,
        {
          scale: 0.9,
          borderRadius: '28px',
        },
        {
          scale: 1,
          borderRadius: '12px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoFrame,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 0.8,
            onUpdate: (self) => {
              if (progressReadoutRef.current) {
                const pct = Math.round(self.progress * 100);
                progressReadoutRef.current.textContent = `REEL 02 // ${String(pct).padStart(3, '0')}%`;
              }
            },
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#F5F2EA] text-[#20231F] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Editorial Header & Telemetry Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#174D3B] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
              <span>ACT II // KINETIC MANIFESTO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.03em] text-[#20231F] leading-[0.95]">
              MOMENTUM IS{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#FF6747]">
                Engineered.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end px-4 py-2 rounded-full bg-[#20231F] text-[#F5F2EA] font-mono text-xs tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#FF6747]" />
            <span ref={progressReadoutRef} className="tabular-nums">
              REEL 02 // 000%
            </span>
            <span className="text-white/30">·</span>
            <span className="text-[#DDE8F8]">24 FPS RAW</span>
          </div>
        </div>

        {/* Oddball-Inspired Scroll-Scrubbed Word Highlight Paragraph */}
        <div className="max-w-5xl mb-14 sm:mb-20">
          <p
            ref={wordsContainerRef}
            className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold uppercase tracking-[-0.02em] leading-[1.18] text-[#20231F] flex flex-wrap gap-x-3 gap-y-2"
          >
            {MANIFESTO_WORDS.map((item, idx) => (
              <span
                key={idx}
                className={`manifesto-word inline-block transition-colors duration-150 ${
                  item.accent
                    ? 'font-serif italic font-normal capitalize tracking-normal text-[#FF6747] text-3xl sm:text-5xl lg:text-[3.1rem]'
                    : 'text-[#20231F]'
                }`}
              >
                {item.text}
              </span>
            ))}
          </p>
        </div>

        {/* Full-Bleed Expanding Cinema Stage */}
        <div
          ref={videoFrameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] bg-[#161815] overflow-hidden shadow-2xl ring-1 ring-[#20231F]/15 will-change-transform"
        >
          <video
            src="/assets/videos/v03-momentum.mp4"
            poster="/assets/images/i04-strength-still.webp"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-95"
          />

          {/* Subtle Vignette & Architectural Viewfinder Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

          {/* Top-Left Camera Telemetry */}
          <div className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white font-mono text-[11px] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FF6747] animate-ping" />
            <span>OPTICAL TRACKING // 28MM COMPETITION KNURL</span>
          </div>

          {/* Bottom-Left & Bottom-Right HUD Callouts */}
          <div className="pointer-events-none absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[#F5F2EA] font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6747]" />
              <span>SHILPA&apos;S GYM TRAINING FLOOR · RAHARA, KHARDAHA</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 text-[#20231F] font-mono text-xs font-bold uppercase tracking-wider">
              <span>TENSILE RATING: 216,000 PSI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentumFilm;
