import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Calendar, UserCheck, Flame } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
        title: 'UNISEX GYM & STRENGTH ARCHITECTURE',
        coach: 'Senior Fitness Coach',
        time: schedule === 'morning' ? '06:00 – 10:00 (Morning Slot)' : schedule === 'evening' ? '17:00 – 22:00 (Evening Peak)' : '12:00 – 16:00 (Midday Focus)',
        focus: 'Biomechanical machine guidance, posture correction, free weight form, progressive overload',
        tag: 'FITNESS FLOOR',
        load: 'AIR-CONDITIONED UNISEX GYM',
      };
    }

    if (goal === 'conditioning') {
      return {
        title: 'TRANSFORMATION & PERSONAL COACHING',
        coach: 'Certified Personal Trainer (Male/Female)',
        time: schedule === 'morning' ? '06:30 – 08:30 (Dawn Prime)' : schedule === 'evening' ? '18:00 – 20:30 (Evening)' : '13:00 – 15:00',
        focus: 'Targeted fat loss, cardio endurance, high-protein nutrition guidance, dedicated 1-on-1 supervision',
        tag: 'FAT LOSS & TONING',
        load: 'CUSTOM GOAL PROTOCOL',
      };
    }

    if (goal === 'keratin') {
      return {
        title: 'PREMIUM KERATIN & HAIR RESTORATION',
        coach: 'Master Hair Stylist',
        time: schedule === 'morning' ? '10:00 – 13:00' : schedule === 'evening' ? '16:00 – 19:30' : '12:00 – 15:00',
        focus: 'Formaldehyde-free keratin smoothing, deep hair botox, protein spa infusion, long-lasting silk gloss',
        tag: 'SALON SIGNATURE',
        load: 'LUXURY SALON SECTION',
      };
    }

    // Bridal & Makeup
    return {
      title: 'BRIDAL & CELEBRATION GLAMOUR STUDIO',
      coach: 'Lead Makeup & Aesthetic Artist',
      time: 'Appointment by Booking (Flexible Hours)',
      focus: 'High-definition bridal makeup, party looks, skin brightening, unisex facial therapies',
      tag: 'MAKEUP ARTISTRY',
      load: 'PREMIUM DERMA PRODUCTS',
    };
  };

  const recommendation = getRecommendation();

  return (
    <section id="class-finder" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA] border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="05"
          tag="SMART SERVICE SELECTOR"
          title="FIND YOUR SERVICE."
          accentTitle="THREE QUICK QUESTIONS."
          description="Whether you're looking for intense workout sessions, personal training, hair keratin smoothing, or party makeup, get an instant customized recommendation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3 Practical Questions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Question 01: Goal */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#20231F]/10 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-[#FF6747] font-bold">STEP 01</span>
                <span className="font-mono text-xs uppercase text-[#20231F]/70 font-semibold">
                  // SELECT PRIMARY SERVICE
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'strength', label: 'Unisex Gym & Iron', sublabel: 'Workout machinery & weight training' },
                  { id: 'conditioning', label: 'Fat Loss & PT', sublabel: '1-on-1 personal trainer & diet plan' },
                  { id: 'keratin', label: 'Keratin & Hair Spa', sublabel: 'Hair smoothing & deep restoration' },
                  { id: 'makeup', label: 'Bridal & Makeup', sublabel: 'HD party glamour & skin grooming' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`p-4 rounded-sm text-left border transition-all cursor-pointer ${
                      goal === opt.id
                        ? 'border-[#FF6747] bg-[#FF6747]/5 shadow-xs'
                        : 'border-[#20231F]/10 hover:border-[#20231F]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm uppercase text-[#20231F]">
                        {opt.label}
                      </span>
                      {goal === opt.id && <CheckCircle2 className="w-4 h-4 text-[#FF6747]" />}
                    </div>
                    <span className="text-xs text-[#4C514A] font-sans">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 02: Experience */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#20231F]/10 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-[#8177FF] font-bold">STEP 02</span>
                <span className="font-mono text-xs uppercase text-[#20231F]/70 font-semibold">
                  // CURRENT TRAINING PROFICIENCY
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'foundational', label: 'Foundational', sublabel: 'Under 1 yr structured lifting' },
                  { id: 'intermediate', label: 'Intermediate', sublabel: '1–3 yrs consistent barbell work' },
                  { id: 'advanced', label: 'Advanced', sublabel: '3+ yrs competitive / athletic loading' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setExperience(opt.id)}
                    className={`p-4 rounded-sm text-left border transition-all cursor-pointer ${
                      experience === opt.id
                        ? 'border-[#8177FF] bg-[#8177FF]/5 shadow-xs'
                        : 'border-[#20231F]/10 hover:border-[#20231F]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm uppercase text-[#20231F]">
                        {opt.label}
                      </span>
                      {experience === opt.id && <CheckCircle2 className="w-4 h-4 text-[#8177FF]" />}
                    </div>
                    <span className="text-xs text-[#4C514A] font-sans">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 03: Schedule */}
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#20231F]/10 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-[#174D3B] font-bold">STEP 03</span>
                <span className="font-mono text-xs uppercase text-[#20231F]/70 font-semibold">
                  // PREFERRED TIMETABLE WINDOW
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'morning', label: 'Morning Dawn', sublabel: '06:00 – 09:00 prime' },
                  { id: 'midday', label: 'Midday Focus', sublabel: '12:00 – 14:00 recharge' },
                  { id: 'evening', label: 'Evening Peak', sublabel: '17:30 – 20:30 high velocity' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSchedule(opt.id)}
                    className={`p-4 rounded-sm text-left border transition-all cursor-pointer ${
                      schedule === opt.id
                        ? 'border-[#174D3B] bg-[#174D3B]/5 shadow-xs'
                        : 'border-[#20231F]/10 hover:border-[#20231F]/30 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm uppercase text-[#20231F]">
                        {opt.label}
                      </span>
                      {schedule === opt.id && <CheckCircle2 className="w-4 h-4 text-[#174D3B]" />}
                    </div>
                    <span className="text-xs text-[#4C514A] font-sans">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tailored Recommendation Result */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#20231F]/12 border-l-4 border-l-[#FF6747] shadow-sculptural relative">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#20231F]/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#FF6747] font-bold">
                  PRESCRIBED PROTOCOL
                </span>
                <Badge variant="mineral">{recommendation.tag}</Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-[#20231F] tracking-tight leading-tight mb-4">
                {recommendation.title}
              </h3>

              <p className="text-sm text-[#4C514A] leading-relaxed mb-6 font-normal">
                {recommendation.focus}
              </p>

              <div className="space-y-3 font-mono text-xs bg-[#FAF8F4] p-4 rounded-sm border border-[#20231F]/10 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#20231F]/60 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> LEAD COACH:
                  </span>
                  <span className="font-bold text-[#20231F]">{recommendation.coach}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#20231F]/60 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> RECOM. TIME:
                  </span>
                  <span className="font-bold text-[#FF6747]">{recommendation.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#20231F]/60 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> INTENSITY:
                  </span>
                  <span className="font-bold text-[#20231F]">{recommendation.load}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  onSelectClass?.(recommendation.title);
                  const el = document.getElementById('timetable');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                VIEW ON LIVE TIMETABLE
              </Button>

              <p className="font-mono text-[11px] text-[#20231F]/60 text-center mt-3">
                // COMPREHENSIVE BIOMECHANICAL MOVEMENT SCREEN INCLUDED
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
