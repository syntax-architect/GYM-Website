import React from 'react';
import { getAsset } from '../../config/assets';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { MediaFrame } from '../ui/MediaFrame';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const EditorialPhilosophy: React.FC = () => {
  const assetArchitecture = getAsset('A09');
  const assetRecovery = getAsset('A03');

  return (
    <section id="architecture" className="relative py-28 md:py-36 bg-[#080808] border-b border-white/10">
      {/* Subtle Warm Amber Gradient Accent */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-amber-600/5 blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <SectionHeader
          index="01"
          tag="SPATIAL DISCIPLINE"
          title="MONOLITHIC SPACE."
          accentTitle="ENGINEERED RIGOR."
          description="The environment dictates the quality of human performance. Shilpa's is designed around brutalist materials, uncluttered sightlines, and generous training envelopes where athletes never compromise form for space."
        />

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Primary Architectural Visual (A09) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative">
              <MediaFrame
                asset={assetArchitecture}
                aspectRatio="16/9"
                className="rounded-sm shadow-2xl border border-white/10"
                showOverlay
                overlayText="MONOLITHIC INDUSTRIAL FOUNDATION"
              />
              <div className="absolute -bottom-4 -right-4 hidden sm:block bg-[#0D0D10] border border-amber-500/30 p-4 shadow-xl z-20 max-w-xs">
                <span className="font-mono text-[10px] text-amber-500 block uppercase tracking-widest mb-1">
                  ASSET CODE // A09
                </span>
                <p className="font-sans text-xs text-white/80 leading-normal">
                  Reinforced structural framing, non-slip rubber surfacing, and zoned lighting.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophical Principles */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div className="border-l-2 border-amber-500 pl-6">
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest block mb-2">
                CORE PHILOSOPHY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
                ELIMINATE NOISE. <br />
                PRIORITIZE OUTPUT.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-sans font-light">
              Conventional gyms suffer from visual cacophony, fluorescent glare, and cramped machinery. Here, every angle is stripped to pure functional utility: raw concrete textures, matte black iron, and amber illumination that sharpens athlete focus.
            </p>

            {/* Architecture Standards List */}
            <div className="space-y-4 font-mono text-xs pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-[#121216] border border-white/5 rounded-sm">
                <Compass className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block uppercase">Uncompromised Platform Space</span>
                  <span className="text-white/50 text-[11px]">Ample spacing around every rack, deadlift station, and turf lane.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#121216] border border-white/5 rounded-sm">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block uppercase">Restrained Amber Lighting</span>
                  <span className="text-white/50 text-[11px]">3000K warm downlights calibrated to prevent glare during supine lifts.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#121216] border border-white/5 rounded-sm">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block uppercase">Acoustic Isolation Substrate</span>
                  <span className="text-white/50 text-[11px]">Heavy vibration absorption layers protecting athlete joint feedback.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Row: Active Recovery & Focus Zone (A03) */}
        <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="amber" size="sm">
                SYSTEMIC BALANCE
              </Badge>
              <span className="font-mono text-xs text-white/40">ASSET // A03</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              RECOVERY AS A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#D97706] italic font-normal">
                PERFORMANCE VARIABLE
              </span>
            </h3>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-sans font-light">
              Maximum kinetic exertion is only as effective as the systemic recovery that follows it. Our dedicated recovery environment provides intentional breathing zones, mobility implements, and temperature-controlled stillness.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="p-3 bg-[#121216] border border-white/5">
                <span className="text-amber-500 block font-bold">CIRCULATION</span>
                <span className="text-white/70 text-[11px]">Targeted myofascial restoration</span>
              </div>
              <div className="p-3 bg-[#121216] border border-white/5">
                <span className="text-amber-500 block font-bold">NEUROLOGICAL</span>
                <span className="text-white/70 text-[11px]">Down-regulation & parasympathetic reset</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <MediaFrame
              asset={assetRecovery}
              aspectRatio="16/9"
              className="rounded-sm shadow-2xl border border-white/10"
              showOverlay
              overlayText="ACTIVE RECOVERY & SYSTEMIC REGENERATION"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
