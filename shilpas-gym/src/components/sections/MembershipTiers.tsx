import React, { useState } from 'react';
import { Check, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
  specs: { label: string; value: string };
}

const TIERS: Tier[] = [
  {
    id: 'fitness',
    name: 'Unisex Gym Access',
    tagline: 'Unlimited floor access to imported machinery & free weights',
    monthlyPrice: 1499,
    annualPrice: 1199,
    specs: { label: 'TIMING', value: '06:00 – 22:00 Daily' },
    features: [
      'Full access to air-conditioned unisex fitness floor',
      'Imported biomechanical selectorized & cable stations',
      'Free weight & Olympic barbell lifting zones',
      'Locker room, shower & hygienic changing suites',
      'General floor trainer guidance for safe lifting form',
    ],
  },
  {
    id: 'pt-transformation',
    name: 'PT Transformation',
    tagline: '1-on-1 certified trainer coaching & personalized diet blueprint',
    monthlyPrice: 3499,
    annualPrice: 2899,
    highlighted: true,
    specs: { label: 'COACHING', value: 'Dedicated 1-on-1' },
    features: [
      'Everything included in Unisex Gym Access',
      'Dedicated personal trainer (Male & Female available)',
      'Customized fat loss, toning, or muscle growth diet plan',
      'Weekly body composition & measurement tracking',
      '1 Complimentary Hair Spa / Salon service per month',
      'Flexible time slot reservation',
    ],
  },
  {
    id: 'vip-dual',
    name: 'All-Access: Gym + Salon',
    tagline: 'The ultimate fitness & glamour package for complete lifestyle care',
    monthlyPrice: 4999,
    annualPrice: 3999,
    specs: { label: 'ACCESS', value: 'VIP Dual Pass' },
    features: [
      'Unlimited Gym Access + Dedicated Trainer Support',
      'Monthly Keratin smoothing or Botox Hair Spa treatment',
      'Aesthetic facial & skin grooming in private salon section',
      'Exclusive 20% discount on all bridal & party makeup packages',
      'Complimentary pre-workout refreshments & towel service',
      'Priority appointments for salon & makeup studio',
    ],
  },
];

export const MembershipTiers: React.FC<MembershipTiersProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="memberships" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF8F4] border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="06"
          tag="TRANSPARENT ADMISSION"
          title="FLEXIBLE PLANS."
          accentTitle="HONEST VALUE."
          description="Straightforward pricing for gym memberships, personal coaching, and beauty salon care in Khardaha. No hidden admission surcharges, zero deceptive lock-ins."
        />

        {/* Monthly vs Annual Switch */}
        <div className="flex justify-center mb-14">
          <div className="bg-white p-1.5 rounded-full border border-[#20231F]/10 flex items-center gap-1 shadow-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#20231F] text-[#F5F2EA] shadow-xs'
                  : 'text-[#20231F]/60 hover:text-[#20231F]'
              }`}
            >
              MONTHLY CADENCE
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#FF6747] text-white shadow-xs'
                  : 'text-[#20231F]/60 hover:text-[#20231F]'
              }`}
            >
              <span>ANNUAL COMMITMENT</span>
              <span className="text-[10px] bg-white text-[#FF6747] px-1.5 py-0.2 rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const price = billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-sm transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-white border border-[#FF6747] shadow-sculptural ring-1 ring-[#FF6747]/20'
                    : 'bg-white border border-[#20231F]/10 hover:border-[#20231F]/25 shadow-xs'
                }`}
              >
                {/* Popular Pill */}
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FF6747] text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                      MOST RECOMMENDED
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-2xl font-display font-extrabold uppercase text-[#20231F] tracking-tight">
                      {tier.name}
                    </h3>
                    <Badge variant={tier.highlighted ? 'persimmon' : 'carbon'}>
                      {tier.specs.value}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4C514A] mb-6 font-sans">
                    {tier.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="pt-4 pb-6 border-y border-[#20231F]/10 mb-8">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-display font-extrabold text-[#20231F] tracking-tight">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-mono text-[#20231F]/60 uppercase">
                        / MONTH
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#20231F]/50 mt-1">
                      {billingCycle === 'annual'
                        ? 'Billed annually (₹' + (price * 12).toLocaleString('en-IN') + '/yr) • Best value'
                        : 'Billed monthly • Flexible renewal'}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3.5 mb-8">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${
                          tier.highlighted ? 'bg-[#FF6747]/10 text-[#FF6747]' : 'bg-[#20231F]/5 text-[#20231F]'
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-[#20231F]/90 font-sans leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div>
                  <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    size="md"
                    className="w-full justify-between"
                    onClick={() => onSelectTier(tier.name)}
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    <span>SELECT {tier.name.split(' ')[0]}</span>
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] font-mono text-[#20231F]/50">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#174D3B]" />
                    <span>HONEST BILLING GUARANTEE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
