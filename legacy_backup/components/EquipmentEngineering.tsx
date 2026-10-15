import React from 'react';
import { getAsset } from '../../config/assets';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { MediaFrame } from '../ui/MediaFrame';
import { Badge } from '../ui/Badge';

export const EquipmentEngineering: React.FC = () => {
  const assetEquipment = getAsset('A14');
  const assetIntensity = getAsset('A15');
  const assetFemaleStrength = getAsset('A16');
  const assetExplosive = getAsset('A17');
  const assetA18Locked = getAsset('A18');

  return (
    <section id="biomechanics" className="relative py-28 md:py-36 bg-[#080808] border-b border-white/10">
      <Container>
        <SectionHeader
          index="05"
          tag="TACTILE PRECISION & MOVEMENT"
          title="CALIBRATED IRON."
          accentTitle="UNCOMPROMISING FORCE."
          description="Every contact point matters. From high-tensile 216,000 PSI steel bars to millimeter-accurate Olympic plates and heavy acoustic platforms, Shilpa's equipment is curated for serious athletic loading."
        />

        {/* Featured Locked Visual Banner: A18 V2 */}
        <div className="mb-16 bg-[#111116] border border-amber-500/30 rounded-sm overflow-hidden p-4 sm:p-6 shadow-2xl relative">
          <div className="absolute top-0 right-0 p-4 z-20">
            <Badge variant="amber" size="md">
              APPROVED ARCHITECTURE // A18 V2 LOCKED
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <MediaFrame
                asset={assetA18Locked}
                aspectRatio="16/9"
                className="rounded-sm border border-white/10"
                showOverlay
                overlayText="NOCTURNAL FACILITY ATMOSPHERE // A18 V2"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest block">
                FACILITY AMBIENCE // 3000K WARM TUNGSTEN
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                THE NOCTURNAL SANCTUARY
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed font-sans font-light">
                Captured under approved nocturnal conditions. The balance of dark textured concrete and focused warm amber glow eliminates distraction, channeling athlete energy solely into the bar.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-[#0A0A0D] border border-white/5">
                  <span className="text-amber-500 block font-bold">LIGHTING</span>
                  <span className="text-white/70 text-[11px]">Anti-glare directional spot</span>
                </div>
                <div className="p-3 bg-[#0A0A0D] border border-white/5">
                  <span className="text-amber-500 block font-bold">ACOUSTICS</span>
                  <span className="text-white/70 text-[11px]">Sub-bass structural damping</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modular Gallery of Assets: A14, A15, A16, A17 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* A14: Equipment Detail */}
          <div className="bg-[#0F0F14] border border-white/10 p-4 rounded-sm flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div>
              <MediaFrame
                asset={assetEquipment}
                aspectRatio="4/3"
                className="rounded-sm mb-4"
                showOverlay
                overlayText="EQUIPMENT DETAIL"
              />
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-500 mb-1">
                <span>ASSET // A14</span>
                <span className="text-white/40">PRECISION KNURL</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                Calibrated Iron & Steel
              </h4>
              <p className="font-sans text-xs text-white/60 mt-1.5 leading-relaxed">
                Volcanic knurling and tight competition collars prevent slip and plate vibration during multi-rep loading.
              </p>
            </div>
          </div>

          {/* A15: Post-Workout Intensity */}
          <div className="bg-[#0F0F14] border border-white/10 p-4 rounded-sm flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div>
              <MediaFrame
                asset={assetIntensity}
                aspectRatio="4/3"
                className="rounded-sm mb-4"
                showOverlay
                overlayText="THRESHOLD INTENSITY"
              />
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-500 mb-1">
                <span>ASSET // A15</span>
                <span className="text-white/40">MENTAL RESOLVE</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                Post-Exertion Resolve
              </h4>
              <p className="font-sans text-xs text-white/60 mt-1.5 leading-relaxed">
                The mental stillness following maximal output. Training designed to test and elevate systemic threshold.
              </p>
            </div>
          </div>

          {/* A16: Female Strength */}
          <div className="bg-[#0F0F14] border border-white/10 p-4 rounded-sm flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div>
              <MediaFrame
                asset={assetFemaleStrength}
                aspectRatio="4/3"
                className="rounded-sm mb-4"
                showOverlay
                overlayText="COMPOUND POWER"
              />
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-500 mb-1">
                <span>ASSET // A16</span>
                <span className="text-white/40">PURE MECHANICS</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                Female Strength Standard
              </h4>
              <p className="font-sans text-xs text-white/60 mt-1.5 leading-relaxed">
                Progressive barbell cycles cultivating structural power, posterior chain resilience, and clean mechanics.
              </p>
            </div>
          </div>

          {/* A17: Explosive Performance */}
          <div className="bg-[#0F0F14] border border-white/10 p-4 rounded-sm flex flex-col justify-between group hover:border-amber-500/40 transition-colors">
            <div>
              <MediaFrame
                asset={assetExplosive}
                aspectRatio="4/3"
                className="rounded-sm mb-4"
                showOverlay
                overlayText="BALLISTIC VELOCITY"
              />
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-500 mb-1">
                <span>ASSET // A17</span>
                <span className="text-white/40">KINETIC DRIVE</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                Ballistic Acceleration
              </h4>
              <p className="font-sans text-xs text-white/60 mt-1.5 leading-relaxed">
                Translating raw muscle tension into explosive rate of force development across three-dimensional sport planes.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
