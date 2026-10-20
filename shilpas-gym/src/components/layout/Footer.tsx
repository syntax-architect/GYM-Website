import React from 'react';
import { ArrowUpRight, ArrowUp, Phone, MessageCircle, Heart, Lock } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const brand = useCmsStore((s) => s.brand);

  // Valmora / Oddball smooth reverse-scroll to top
  const handleReverseScrollTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 2.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenStaffPortal = () => {
    window.dispatchEvent(new CustomEvent('open-admin-portal'));
  };

  return (
    <footer className="relative bg-[#141311] text-[#F5F2EA] pt-24 pb-12 overflow-hidden">
      {/* Valmora Convex Curved Top Curtain Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 w-full overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 fill-[#F5F2EA]"
        >
          <path d="M0,0 L1440,0 L1440,8 Q720,56 0,8 Z" />
        </svg>
      </div>

      <Container>
        {/* ODDBALL STADIUM LED SCOREBOARD BANNER (00:20-00:21 Motif) */}
        <div className="relative z-10 mb-12 p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#141311] border border-white/15 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
            <span className="px-2.5 py-1 rounded-md bg-[#D9381E] text-white font-extrabold">
              FINAL TELEMETRY
            </span>
            <span className="text-[#E6DEC8]/60">
              BIOMECHANICAL RIGOR · BESPOKE SALON CARE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-center md:text-left">
            <div className="md:col-span-4">
              <span className="font-display text-xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                {brand.gymName.toUpperCase()}
              </span>
              <span className="block font-mono text-xs text-[#D9381E] uppercase tracking-wider mt-1">
                {brand.locationShort}
              </span>
            </div>

            <div className="md:col-span-4 flex items-center justify-center gap-3 sm:gap-5 font-mono">
              <span className="text-4xl sm:text-7xl font-black text-[#D9381E] tabular-nums leading-none">
                98
              </span>
              <span className="text-2xl sm:text-5xl text-white/25 font-bold">:</span>
              <span className="text-4xl sm:text-7xl font-black text-white/25 tabular-nums leading-none">
                00
              </span>
            </div>

            <div className="md:col-span-4 md:text-right">
              <span className="font-display text-xl sm:text-4xl font-extrabold uppercase tracking-tight text-white/35">
                ORDINARY GYMS
              </span>
              <span className="block font-mono text-xs text-white/35 uppercase tracking-wider mt-1">
                ZERO EGO · ZERO TEMPLATES
              </span>
            </div>
          </div>
        </div>

        {/* Pre-Footer Conversion Callout */}
        <div className="relative z-10 p-2 bg-black/15 ring-1 ring-white/10 rounded-3xl mb-16 shadow-2xl">
          <div className="bg-[#1C1A17] rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#D9381E]/15 text-[#D9381E] border border-[#D9381E]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E] animate-pulse" />
                  Rated {brand.googleRating} across {brand.reviewCount} Google reviews · {brand.locationShort}
                </span>

                <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#F5F2EA] leading-[1.02]">
                  WHERE STRENGTH MEETS{' '}
                  <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                    Glamour.
                  </span>
                </h2>

                <p className="text-[#E6DEC8] text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed">
                  {brand.tagline} — Imported workout equipment, certified personal
                  trainers, and a private luxury salon for keratin hair smoothing and bridal makeup.
                  All under one roof.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onOpenInquiry}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-center justify-center font-bold tracking-wider min-h-[52px]"
                >
                  BOOK FREE VISIT / TRIAL
                </Button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={`tel:${brand.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-white/10 hover:bg-white text-sm font-extrabold text-white hover:text-[#0D0D0E] border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D9381E]" />
                    <span className="tabular-nums">{brand.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-sm font-extrabold text-white border border-[#25D366]/40 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#D9381E] text-white flex items-center justify-center font-display font-black text-lg">
                {brand.gymName.charAt(0)}
              </div>
              <span className="font-display font-extrabold text-2xl text-[#F5F2EA] tracking-tight uppercase">
                {brand.gymName}
              </span>
            </div>

            <p className="text-sm text-[#E6DEC8] leading-relaxed font-sans font-normal">
              A modern, air-conditioned unisex fitness floor paired with a private beauty salon wing
              in {brand.locationShort}. Women-owned, LGBTQ+ welcoming, and dedicated to progressive
              training.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E6DEC8] font-bold uppercase tracking-wider">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full">
                <Heart className="w-3.5 h-3.5 text-[#D9381E]" /> Women-Owned
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
                {brand.googleRating} Google Rating ({brand.reviewCount})
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <span className="font-display font-bold text-base text-[#D9381E] block">
              Gym & Fitness
            </span>
            <ul className="space-y-2 text-sm text-[#E6DEC8]">
              <li>Unisex Calibrated Strength Floor</li>
              <li>Olympic Barbell & Squat Cages</li>
              <li>1-on-1 Personal Transformation</li>
              <li>Fat Loss & Metabolic Conditioning</li>
              <li>Posture Alignment & Form Correction</li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <span className="font-display font-bold text-base text-[#D9381E] block">
              Salon & Spa
            </span>
            <ul className="space-y-2 text-sm text-[#E6DEC8]">
              <li>Formaldehyde-Free Keratin Smoothing</li>
              <li>Deep Protein Hair Botox & Spa</li>
              <li>High-Definition Bridal Makeovers</li>
              <li>Reception & Party Styling</li>
              <li>Unisex Facial Grooming & Skin Care</li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <span className="font-display font-bold text-base text-[#D9381E] block">
              Studio Hours
            </span>
            <div className="space-y-2 text-sm text-[#E6DEC8]">
              <p className="font-semibold text-white">Monday – Sunday</p>
              <p className="tabular-nums">{brand.hours}</p>
              <p className="text-sm text-[#E6DEC8]/80 pt-2">
                {brand.fullAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Baseline + Valmora / Oddball Reverse-Scroll Button */}
        <div className="relative z-10 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-[#E6DEC8]/80 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-3">
            <span>
              © 2026 {brand.gymName}. All rights reserved.
            </span>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={handleOpenStaffPortal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[#D9381E] text-white/80 hover:text-white transition-all text-[11px] font-mono font-bold tracking-wider cursor-pointer"
              title="Open Staff Portal (Ctrl+Shift+A or #admin)"
            >
              <Lock className="w-3 h-3 text-[#C5A059]" />
              <span>STAFF PORTAL</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="#location" className="hover:text-white transition-colors">
              Location
            </a>
            <a href="#memberships" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Google Reviews
            </a>

            <button
              type="button"
              onClick={handleReverseScrollTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <span>BACK TO TIP-OFF</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
