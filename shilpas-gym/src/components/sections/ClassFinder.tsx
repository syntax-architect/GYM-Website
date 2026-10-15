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
          title="Find Your Service."
          description="Answer three quick questions to receive an instant, tailored recommendation for your gym training or salon appointment in Khardaha."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3 Practical Questions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Question 1: Goal */}
            <div className="bg-white p-7 sm:p-9 rounded-sm">
              <span className="block text-sm font-bold text-[#FF6747] mb-2">
                First Decision
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5">
                What is your primary goal?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'strength', label: 'Unisex Gym & Iron', sublabel: 'Machinery, barbells & free weights' },
                  { id: 'conditioning', label: 'Fat Loss & 1-on-1 PT', sublabel: 'Dedicated personal trainer & nutrition' },
                  { id: 'keratin', label: 'Keratin & Hair Spa', sublabel: 'Hair smoothing & deep conditioning' },
                  { id: 'makeup', label: 'Bridal & Makeup Studio', sublabel: 'HD party glamour & skin grooming' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`p-5 rounded-xs text-left transition-colors duration-200 cursor-pointer ${
                      goal === opt.id
                        ? 'bg-[#20231F] text-white'
                        : 'bg-[#FAF8F4] text-[#20231F] hover:bg-[#EDE9DF]'
                    }`}
                  >
                    <span className="block text-base font-bold mb-1">{opt.label}</span>
                    <span className={`text-sm block ${goal === opt.id ? 'text-white/80' : 'text-[#5A6057]'}`}>
                      {opt.sublabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Experience */}
            <div className="bg-white p-7 sm:p-9 rounded-sm">
              <span className="block text-sm font-bold text-[#FF6747] mb-2">
                Second Decision
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5">
                What is your experience level?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'beginner', label: 'First Time / Beginner', sub: 'Need guided form instruction' },
                  { id: 'intermediate', label: 'Regular Member', sub: 'Know the basics, want progression' },
                  { id: 'advanced', label: 'Experienced Lifter', sub: 'Heavy loading & high intensity' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExperience(opt.id)}
                    className={`p-4 rounded-xs text-left transition-colors duration-200 cursor-pointer ${
                      experience === opt.id
                        ? 'bg-[#20231F] text-white'
                        : 'bg-[#FAF8F4] text-[#20231F] hover:bg-[#EDE9DF]'
                    }`}
                  >
                    <span className="block text-sm font-bold mb-1">{opt.label}</span>
                    <span className={`text-sm block ${experience === opt.id ? 'text-white/80' : 'text-[#5A6057]'}`}>
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Schedule */}
            <div className="bg-white p-7 sm:p-9 rounded-sm">
              <span className="block text-sm font-bold text-[#FF6747] mb-2">
                Third Decision
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-[#20231F] mb-5">
                When do you prefer to visit?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'morning', label: 'Morning Slot', sub: '06:00 – 10:00 AM' },
                  { id: 'midday', label: 'Midday Focus', sub: '11:00 AM – 04:00 PM' },
                  { id: 'evening', label: 'Evening Peak', sub: '05:00 – 10:00 PM' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSchedule(opt.id)}
                    className={`p-4 rounded-xs text-left transition-colors duration-200 cursor-pointer ${
                      schedule === opt.id
                        ? 'bg-[#20231F] text-white'
                        : 'bg-[#FAF8F4] text-[#20231F] hover:bg-[#EDE9DF]'
                    }`}
                  >
                    <span className="block text-sm font-bold mb-1">{opt.label}</span>
                    <span className={`text-sm block ${schedule === opt.id ? 'text-white/80' : 'text-[#5A6057]'}`}>
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Recommendation */}
          <div className="lg:col-span-5 sticky top-28 bg-[#174D3B] text-[#F5F2EA] p-8 sm:p-10 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-[#FF6747]">
                Tailored Recommendation
              </span>
              <span className="text-sm text-[#DDE8F8] font-medium">
                {rec.category}
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white mb-4 leading-snug">
              {rec.title}
            </h4>

            <p className="text-base text-[#DDE8F8] leading-relaxed mb-6">
              {rec.focus}
            </p>

            <div className="space-y-4 bg-white/10 p-5 rounded-xs mb-8 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Assigned Coach</span>
                <span className="font-bold text-white">{rec.coach}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Optimal Window</span>
                <span className="font-bold text-white tabular-nums">{rec.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Recommended Plan</span>
                <span className="font-bold text-[#FF6747]">{rec.plan}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full text-center justify-center"
              onClick={() => onSelectClass?.(rec.title)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              BOOK THIS RECOMMENDATION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
