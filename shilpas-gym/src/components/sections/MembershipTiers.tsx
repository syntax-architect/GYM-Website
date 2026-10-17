import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Interactive3DCard } from '../ui/Interactive3DCard';
import { ArrowUpRight } from 'lucide-react';

export interface MembershipTiersProps {
  onSelectTier: (tierName: string) => void;
}

interface Tier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  features: string[];
  timing: string;
}

const TIERS: Tier[] = [
  {
    id: 'fitness',
    name: 'Unisex Gym Access',
    tagline: 'Unlimited floor access to imported machinery & free weights',
    monthlyPrice: 1499,
    annualPrice: 1199,
    timing: '06:00 AM – 10:00 PM Daily',
    features: [
      'Full access to air-conditioned unisex fitness floor',
      'Imported biomechanical selectorized & cable stations',
      'Olympic free-weight and power rack lifting zones',
      'Locker room, clean showers & hygienic changing suites',
      'General floor trainer guidance for proper form',
    ],
  },
  {
    id: 'pt-transformation',
    name: 'PT Transformation',
    tagline: 'Dedicated 1-on-1 certified trainer & custom diet plan',
    monthlyPrice: 3499,
    annualPrice: 2899,
    highlighted: true,
    timing: 'Reserved Priority Hours',
    features: [
      'Everything included in Unisex Gym Access',
      'Dedicated personal trainer (Male & Female available)',
      'Customized fat loss, toning, or muscle growth diet plan',
      'Weekly body composition & measurement tracking',
      'Complimentary monthly hair spa / salon service',
      'Priority slot reservations',
    ],
  },
  {
    id: 'vip-dual',
    name: 'All-Access: Gym + Salon',
    tagline: 'The ultimate fitness & glamour package for complete lifestyle care',
    monthlyPrice: 4999,
    annualPrice: 3999,
    timing: 'VIP Full Access',
    features: [
      'Unlimited Gym Access + Dedicated Trainer Support',
      'Monthly Keratin smoothing or Botox Hair Spa treatment',
      'Aesthetic facial & skin grooming in private salon section',
      'Exclusive 20% discount on all bridal & party makeup packages',
      'Complimentary pre-workout refreshments & towel service',
      'Priority appointment bookings for salon & makeup studio',
    ],
  },
];

export const MembershipTiers: React.FC<MembershipTiersProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="memberships" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF8F4]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Transparent Pricing"
          title="Direct Memberships."
          description="Straightforward pricing for gym access, personal coaching, and beauty salon care in Khardaha. No hidden admission surcharges, zero deceptive lock-ins."
        />

        {/* High-End Segmented Cadence Toggle Pill Dock */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 border ${
                billingCycle === 'monthly'
                  ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-md border-[#0D0D0E]'
                  : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E] hover:bg-white/90 border-transparent hover:border-[#0D0D0E]/15'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${billingCycle === 'monthly' ? 'bg-[#D9381E] animate-pulse' : 'bg-[#0D0D0E]/30'}`} />
              <span>Monthly Pass</span>
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 border ${
                billingCycle === 'annual'
                  ? 'bg-[#D9381E] text-[#0D0D0E] shadow-md border-[#D9381E]'
                  : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E] hover:bg-white/90 border-transparent hover:border-[#0D0D0E]/15'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${billingCycle === 'annual' ? 'bg-[#0D0D0E]' : 'bg-[#0D0D0E]/30'}`} />
              <span>Annual Pass</span>
              <span className="text-[10px] bg-black/15 px-2 py-0.5 rounded-full font-black">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Silicon Valley-Grade Membership Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
            const isHighlighted = tier.highlighted;

            return (
              <Interactive3DCard
                key={tier.id}
                maxTilt={6}
                scale={1.02}
                glowColor={isHighlighted ? 'rgba(217, 56, 30, 0.22)' : 'rgba(20, 19, 17, 0.12)'}
                className="flex"
              >
                {/* Double-Bezel Outer Shell */}
                <div
                  className={`w-full p-2 sm:p-2.5 rounded-[2.5rem] transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-[#D9381E]/20 ring-1 ring-[#D9381E]/60 shadow-[0_20px_50px_rgba(217, 56, 30,0.18)]'
                      : 'bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {/* Double-Bezel Inner Core */}
                  <div
                    className={`w-full rounded-[calc(2.5rem-0.625rem)] p-7 sm:p-9 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-[#141311] text-[#F5F2EA] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                        : 'bg-white text-[#0D0D0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight">
                          {tier.name}
                        </h3>
                        {isHighlighted && (
                          <span className="bg-[#D9381E] text-white text-[11px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-sm ring-1 ring-white/30">
                            POPULAR
                          </span>
                        )}
                      </div>

                      <p className={`text-xs mb-3 uppercase tracking-wider ${isHighlighted ? 'text-[#D9381E]' : 'text-[#141311]'} font-extrabold`}>
                        {tier.timing}
                      </p>

                      <p className={`text-xs sm:text-sm mb-8 leading-relaxed ${
                        isHighlighted ? 'text-[#E6DEC8]' : 'text-[#5A6057]'
                      }`}>
                        {tier.tagline}
                      </p>

                      {/* Price Block */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold">₹</span>
                          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums">
                            {price.toLocaleString('en-IN')}
                          </span>
                          <span className={`text-xs ml-1 uppercase tracking-wider font-bold ${isHighlighted ? 'text-[#E6DEC8]/70' : 'text-[#0D0D0E]/60'}`}>
                            / month
                          </span>
                        </div>
                        {billingCycle === 'annual' && (
                          <span className={`text-xs block mt-1 ${isHighlighted ? 'text-[#D9381E]' : 'text-[#141311]'} font-extrabold uppercase tracking-wider`}>
                            Billed annually · Save 20%
                          </span>
                        )}
                      </div>

                      {/* Feature Inclusions */}
                      <div className="space-y-3.5 mb-10">
                        {tier.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                              isHighlighted ? 'bg-white/15 text-[#D9381E]' : 'bg-[#141311]/10 text-[#141311]'
                            }`}>
                              ✓
                            </span>
                            <span className={`text-xs sm:text-sm leading-snug ${
                              isHighlighted ? 'text-[#F5F2EA]' : 'text-[#3E423C]'
                            }`}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom-Aligned CTA */}
                    <Button
                      variant={isHighlighted ? 'primary' : 'secondary'}
                      size="md"
                      className="w-full text-center justify-center min-h-[50px]"
                      onClick={() => onSelectTier(tier.name)}
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      SELECT {tier.name.toUpperCase()}
                    </Button>
                  </div>
                </div>
              </Interactive3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
