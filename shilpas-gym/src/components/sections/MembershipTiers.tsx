import React, { useState } from 'react';
import { Check, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useCmsStore } from '../../store/cmsStore';

export interface MembershipTiersProps {
  onSelectTier: (tierName: string) => void;
}

export const MembershipTiers: React.FC<MembershipTiersProps> = ({ onSelectTier }) => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const tiers = useCmsStore((s) => s.membershipTiers);
  const brand = useCmsStore((s) => s.brand);

  return (
    <section
      id="memberships"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F4F1EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Header + Tactile Billing Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0D0D0E]/70 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>TRANSPARENT PRICING // ZERO HIDDEN FEES</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
              DIRECT STUDIO{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Memberships.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4A4843]">
              Straightforward pricing for gym access, personal coaching, and beauty salon care in{' '}
              {brand.locationShort}. Zero deceptive lock-ins.
            </p>
          </div>

          {/* Monthly / Annual Switcher */}
          <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-white p-1 sm:p-1.5 rounded-full border border-[#0D0D0E]/12 shadow-sculptural self-start lg:self-end max-w-full">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                billing === 'monthly'
                  ? 'bg-[#0D0D0E] text-[#F4F1EA] shadow-sm'
                  : 'text-[#0D0D0E]/65 hover:text-[#0D0D0E]'
              }`}
            >
              ● MONTHLY PASS
            </button>

            <button
              type="button"
              onClick={() => setBilling('annual')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                billing === 'annual'
                  ? 'bg-[#0D0D0E] text-[#F4F1EA] shadow-sm'
                  : 'text-[#0D0D0E]/65 hover:text-[#0D0D0E]'
              }`}
            >
              <span>ANNUAL PASS</span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#D9381E] text-white text-[9px] sm:text-[10px]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Column Atelier Pass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = billing === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  tier.featured
                    ? 'bg-[#141311] text-[#F4F1EA] border-2 border-[#D9381E] shadow-2xl lg:-translate-y-2'
                    : 'bg-white text-[#0D0D0E] border border-[#0D0D0E]/12 shadow-sculptural'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#D9381E] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div>
                  {/* Pass Code & Schedule Tag */}
                  <div className="flex items-center justify-between font-mono text-[11px] mb-4">
                    <span
                      className={
                        tier.featured ? 'text-[#C5A059] font-bold' : 'text-[#D9381E] font-bold'
                      }
                    >
                      {tier.code}
                    </span>
                    <span className={tier.featured ? 'text-white/50' : 'text-[#0D0D0E]/50'}>
                      {tier.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2">
                    {tier.name}{' '}
                    <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                      {tier.serifName}
                    </span>
                  </h3>

                  <p
                    className={`font-sans text-xs sm:text-sm mb-6 ${
                      tier.featured ? 'text-[#E6DEC8]/80' : 'text-[#4A4843]'
                    }`}
                  >
                    {tier.subtitle}
                  </p>

                  {/* Luxury Serif Price Display */}
                  <div className="pb-6 mb-6 border-b border-current/10 flex items-baseline gap-1.5">
                    <span className="font-mono text-lg text-[#D9381E] font-bold">₹</span>
                    <span className="font-serif italic text-6xl sm:text-7xl leading-none tracking-tight tabular-nums">
                      {price}
                    </span>
                    <div className="ml-1">
                      <span
                        className={`block font-mono text-xs uppercase tracking-wider ${
                          tier.featured ? 'text-white/60' : 'text-[#0D0D0E]/60'
                        }`}
                      >
                        / MONTH
                      </span>
                      {billing === 'annual' && (
                        <span className="block font-mono text-[10px] text-[#D9381E] font-bold">
                          BILLED ANNUALLY
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            tier.featured
                              ? 'bg-[#D9381E]/20 text-[#D9381E]'
                              : 'bg-[#0D0D0E]/8 text-[#D9381E]'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                        <span
                          className={
                            tier.featured ? 'text-[#F4F1EA]/90' : 'text-[#0D0D0E]/85'
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectTier(
                      `${tier.name} ${tier.serifName.replace('.', '')} (₹${price}/mo · ${billing.toUpperCase()})`
                    )
                  }
                  className={`w-full py-4 px-6 rounded-full font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    tier.featured
                      ? 'bg-[#D9381E] hover:bg-[#B82B14] text-white shadow-lg'
                      : 'bg-[#0D0D0E] hover:bg-[#D9381E] text-[#F4F1EA]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-[#0D0D0E]/65">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D9381E]" />
            NO HIDDEN ADMISSION SURCHARGES
          </span>
          <span>•</span>
          <span>COUPLE & STUDENT DISCOUNTS AVAILABLE AT FRONT DESK</span>
        </div>
      </div>
    </section>
  );
};

export default MembershipTiers;
