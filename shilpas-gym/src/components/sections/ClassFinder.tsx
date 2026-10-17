import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export interface ClassFinderProps {
  onSelectClass?: (className: string) => void;
}

export const ClassFinder: React.FC<ClassFinderProps> = ({ onSelectClass }) => {
  const [goal, setGoal] = useState<string>('strength');
  const [experience, setExperience] = useState<string>('intermediate');
  const [schedule, setSchedule] = useState<string>('morning');

  // Rules-based recommendation calculation
  const getRecommendation = () => {
    if (goal === 'strength') {
      return {
        title: 'Unisex Gym & Strength Architecture',
        coach: 'Senior Biomechanics Floor Coach',
        time: schedule === 'morning' ? '06:00 – 10:00 (Morning Focus)' : schedule === 'evening' ? '17:00 – 22:00 (Evening Peak)' : '12:00 – 16:00 (Midday Power)',
        focus: 'Biomechanical machine guidance, posture correction, Olympic barbell lifting, progressive overload',
        category: 'Gym Floor',
        plan: 'Unisex Gym Access (₹1,499/mo)',
      };
    }

    if (goal === 'conditioning') {
      return {
        title: 'Personal Training & Body Transformation',
        coach: 'Dedicated Personal Trainer (Male or Female)',
        time: schedule === 'morning' ? '06:30 – 08:30 (Dawn Prime)' : schedule === 'evening' ? '18:00 – 20:30 (Evening Focus)' : '13:00 – 15:00',
        focus: 'Targeted fat loss, cardio endurance, high-protein nutrition blueprint, dedicated 1-on-1 coaching',
        category: 'Personal Coaching',
        plan: 'PT Transformation (₹3,499/mo)',
      };
    }

    if (goal === 'keratin') {
      return {
        title: 'Keratin Smoothing & Hair Restoration',
        coach: 'Senior Hair Stylist & Technician',
        time: schedule === 'morning' ? '10:00 – 13:00' : schedule === 'evening' ? '16:00 – 19:30' : '12:00 – 15:00',
        focus: 'Formaldehyde-free keratin smoothing, deep hair botox, protein spa infusion, long-lasting silk shine',
        category: 'Private Salon',
        plan: 'Keratin Lounge Session',
      };
    }

    // Bridal & Makeup
    return {
      title: 'Bridal & Celebration Glamour Studio',
      coach: 'Lead Makeup & Aesthetic Artist',
      time: 'Appointment by Booking (Flexible Slots)',
      focus: 'High-definition bridal makeup, party looks, skin brightening, unisex facial therapies',
      category: 'Beauty Studio',
      plan: 'Bridal & Event Consultation',
    };
  };

  const rec = getRecommendation();

  return (
    <section id="class-finder" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Interactive Concierge"
          title="Find Your Ideal Program."
          description="Answer three quick questions to receive a tailored recommendation for your gym training or salon appointment in Khardaha."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3 Guided Decision Steps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Question 1: Goal */}
            <div className="p-1.5 sm:p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl">
              <div className="bg-white p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D3B]/10 text-[#174D3B] text-[11px] font-extrabold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
                    <span>Decision 01 · Primary Objective</span>
                  </div>
                  <span className="text-xs text-[#20231F]/60 font-bold uppercase tracking-wider">Step 1 of 3</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5 tracking-tight">
                  What is your focus?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'strength', label: 'Unisex Gym & Iron', sublabel: 'Biomechanical machines & free weights' },
                    { id: 'conditioning', label: 'Fat Loss & 1-on-1 PT', sublabel: 'Dedicated personal trainer & custom diet' },
                    { id: 'keratin', label: 'Keratin & Hair Spa', sublabel: 'Smoothing therapy & deep conditioning' },
                    { id: 'makeup', label: 'Bridal & Glamour Studio', sublabel: 'HD celebration makeover & aesthetic skin care' },
                  ].map((opt) => {
                    const isSelected = goal === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGoal(opt.id)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#20231F] text-white border-[#20231F] shadow-md'
                            : 'bg-[#FAF8F4] text-[#20231F] border-[#20231F]/10 hover:border-[#FF6747]/60 hover:bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="pr-3">
                          <span className="block text-sm sm:text-base font-bold mb-0.5">{opt.label}</span>
                          <span className={`text-xs block ${isSelected ? 'text-white/80' : 'text-[#5A6057]'}`}>
                            {opt.sublabel}
                          </span>
                        </div>
                        {/* Tactile Radio Indicator Capsule */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? 'border-[#FF6747] bg-[#FF6747]'
                            : 'border-[#20231F]/25 group-hover:border-[#FF6747]'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Question 2: Experience */}
            <div className="p-1.5 sm:p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl">
              <div className="bg-white p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D3B]/10 text-[#174D3B] text-[11px] font-extrabold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
                    <span>Decision 02 · Experience Level</span>
                  </div>
                  <span className="text-xs text-[#20231F]/60 font-bold uppercase tracking-wider">Step 2 of 3</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5 tracking-tight">
                  What is your background?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'beginner', label: 'Beginner', sub: 'Guided form coaching' },
                    { id: 'intermediate', label: 'Regular', sub: 'Consistent routine' },
                    { id: 'advanced', label: 'Experienced', sub: 'Heavy loading' },
                  ].map((opt) => {
                    const isSelected = experience === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setExperience(opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#20231F] text-white border-[#20231F] shadow-md'
                            : 'bg-[#FAF8F4] text-[#20231F] border-[#20231F]/10 hover:border-[#FF6747]/60 hover:bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="pr-2">
                          <span className="block text-sm font-bold mb-0.5">{opt.label}</span>
                          <span className={`text-xs block ${isSelected ? 'text-white/80' : 'text-[#5A6057]'}`}>
                            {opt.sub}
                          </span>
                        </div>
                        {/* Radio Indicator */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? 'border-[#FF6747] bg-[#FF6747]'
                            : 'border-[#20231F]/25 group-hover:border-[#FF6747]'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Question 3: Schedule */}
            <div className="p-1.5 sm:p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl">
              <div className="bg-white p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#174D3B]/10 text-[#174D3B] text-[11px] font-extrabold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
                    <span>Decision 03 · Preferred Timing</span>
                  </div>
                  <span className="text-xs text-[#20231F]/60 font-bold uppercase tracking-wider">Step 3 of 3</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5 tracking-tight">
                  When will you visit?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'morning', label: 'Morning Slot', sub: '06:00 – 10:00 AM' },
                    { id: 'midday', label: 'Midday Focus', sub: '11:00 AM – 04:00 PM' },
                    { id: 'evening', label: 'Evening Peak', sub: '05:00 – 10:00 PM' },
                  ].map((opt) => {
                    const isSelected = schedule === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSchedule(opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between group active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#20231F] text-white border-[#20231F] shadow-md'
                            : 'bg-[#FAF8F4] text-[#20231F] border-[#20231F]/10 hover:border-[#FF6747]/60 hover:bg-white hover:shadow-xs'
                        }`}
                      >
                        <div className="pr-2">
                          <span className="block text-sm font-bold mb-0.5">{opt.label}</span>
                          <span className={`text-xs block ${isSelected ? 'text-white/80' : 'text-[#5A6057]'}`}>
                            {opt.sub}
                          </span>
                        </div>
                        {/* Radio Indicator */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? 'border-[#FF6747] bg-[#FF6747]'
                            : 'border-[#20231F]/25 group-hover:border-[#FF6747]'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Recommendation Box */}
          <div className="lg:col-span-5 sticky top-28 p-1.5 sm:p-2 bg-[#174D3B]/20 ring-1 ring-[#174D3B]/40 rounded-3xl shadow-xl">
            <div className="bg-[#174D3B] text-[#F5F2EA] p-7 sm:p-9 rounded-[calc(1.5rem-0.25rem)]">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6747]/20 border border-[#FF6747]/30 text-xs font-bold text-[#FF6747] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747] animate-pulse" />
                  <span>Tailored Plan</span>
                </div>
                <span className="text-xs text-[#DDE8F8] font-bold uppercase tracking-wider">
                  {rec.category}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white mb-3 leading-snug">
                {rec.title}
              </h4>

              <p className="text-sm text-[#DDE8F8] leading-relaxed mb-6 font-normal">
                {rec.focus}
              </p>

              <div className="space-y-3 bg-white/10 p-5 rounded-2xl mb-8 text-xs sm:text-sm border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Lead Coach</span>
                  <span className="font-bold text-white">{rec.coach}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Optimal Window</span>
                  <span className="font-bold text-white tabular-nums">{rec.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Plan Pricing</span>
                  <span className="font-bold text-[#FF6747]">{rec.plan}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full text-center justify-center shadow-lg shadow-[#FF6747]/20"
                onClick={() => onSelectClass?.(rec.title)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                BOOK THIS RECOMMENDATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
