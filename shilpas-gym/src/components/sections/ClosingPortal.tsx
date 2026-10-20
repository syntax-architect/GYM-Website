import React from 'react';
import { MapPin, Clock, Phone, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface ClosingPortalProps {
  onOpenInquiry: () => void;
}

export const ClosingPortal: React.FC<ClosingPortalProps> = ({ onOpenInquiry }) => {
  const brand = useCmsStore((s) => s.brand);

  return (
    <section
      id="location"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F4F1EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Top Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0D0D0E]/70 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>FINAL ACT // PRIVATE VIEWING & LOCATION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
              STEP THROUGH THE{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Sanctuary.
              </span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F4F1EA] font-mono text-xs uppercase tracking-wider self-start lg:self-end">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>PLUS CODE: {brand.plusCode} · {brand.locationShort}</span>
          </div>
        </div>

        {/* Unified 12-Column Architectural Portal + Studio Location Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: 3D Architectural Portal Cinema */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden bg-[#141311] border border-[#0D0D0E]/15 shadow-2xl">
            <video
              src={brand.portalVideoUrl}
              poster="/assets/images/i11-portal-still.webp"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                filter: 'sepia(0.26) hue-rotate(-18deg) saturate(1.2) contrast(1.1)',
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[11px] text-white uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>ARCHITECTURAL PORTAL // {brand.locationShort} ATELIER</span>
            </div>

            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#C5A059]">
                  DUAL-WING FACILITY
                </span>
                <p className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white">
                  {brand.gymName.toUpperCase()}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/90 text-[#0D0D0E] font-mono text-xs font-bold">
                {brand.locationShort}
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Private Viewing & Directions Card */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-10 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9381E]">
                  STUDIO DOSSIER
                </span>
                <span className="px-3 py-1 rounded-full bg-[#141311] text-[#C5A059] font-mono text-xs font-bold">
                  {brand.googleRating}★ ({brand.reviewCount})
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-none">
                VISIT {brand.gymName.toUpperCase()}{' '}
                <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                  Studio.
                </span>
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#4A4843] leading-relaxed">
                Experience the premier workout and salon atmosphere in {brand.locationShort}.
                Calibrated biomechanical machines, certified trainers, and private salon care under
                one roof.
              </p>
            </div>

            <div className="space-y-3.5 py-5 border-y border-[#0D0D0E]/10 font-sans text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D9381E] shrink-0 mt-1" />
                <div>
                  <span className="font-bold block text-[#0D0D0E]">
                    {brand.gymName.toUpperCase()}
                  </span>
                  <span className="text-[#4A4843] text-xs sm:text-sm">
                    {brand.fullAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D9381E] shrink-0" />
                <span className="text-[#0D0D0E] font-medium">
                  Open Daily: <strong className="font-mono">{brand.hours}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D9381E] shrink-0" />
                <a
                  href={`tel:${brand.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-mono font-bold text-[#D9381E] hover:underline"
                >
                  {brand.phone}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenInquiry}
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="flex-1 justify-center"
              >
                BOOK STUDIO VISIT
              </Button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Shilpa's+Gym+%26+Beauty+Salon+Rahara+Khardaha+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-[#141311] hover:bg-[#0D0D0E] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span>GOOGLE MAPS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingPortal;
