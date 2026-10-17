import React, { useState } from 'react';
import { ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ClassFinderProps {
  onSelectClass?: (className: string) => void;
}

const QUARTERS = [
  {
    id: 'Q1',
    clock: '12:00',
    score: '02',
    title: 'TIP-OFF DIAGNOSTIC',
    note: 'Posture screening, joint mobility check, or hair/skin texture analysis with our senior specialists.',
    svgPath: 'M 70 210 Q 160 110 260 140',
    targetX: 260,
    targetY: 140,
  },
  {
    id: 'Q2',
    clock: '09:00',
    score: '04',
    title: 'DRAW THE PLAY',
    note: 'Custom biomechanical machine calibration, macro nutrition blueprint, or keratin formula selection.',
    svgPath: 'M 70 210 Q 170 90 290 120 T 410 95',
    targetX: 410,
    targetY: 95,
  },
  {
    id: 'Q3',
    clock: '03:06',
    score: '06',
    title: 'RUN THE SESSION',
    note: 'Supervised progressive overload on imported racks or restorative multi-stage salon therapy.',
    svgPath: 'M 70 210 C 160 220, 250 70, 390 150 L 465 80',
    targetX: 465,
    targetY: 80,
  },
  {
    id: 'Q4',
    clock: '00:00',
    score: '08',
    title: 'BUZZER BEATER UNVEIL',
    note: 'Measurable strength PRs, lean body recomposition, and mirror-gloss salon radiance.',
    svgPath: 'M 70 210 C 180 40, 320 240, 490 65',
    targetX: 490,
    targetY: 65,
  },
];

export const ClassFinder: React.FC<ClassFinderProps> = ({ onSelectClass }) => {
  const [goal, setGoal] = useState<string>('strength');
  const [experience, setExperience] = useState<string>('intermediate');
  const [schedule, setSchedule] = useState<string>('morning');
  const [activeQuarter, setActiveQuarter] = useState<number>(0);

  const getRecommendation = () => {
    if (goal === 'strength') {
      return {
        title: 'Unisex Gym & Strength Architecture',
        coach: 'Coach Rajesh Sen (Head Biomechanics)',
        time:
          schedule === 'morning'
            ? '06:00 – 10:00 (Morning Focus)'
            : schedule === 'evening'
            ? '17:00 – 22:00 (Evening Peak)'
            : '11:00 – 16:00 (Midday Calm)',
        focus:
          'Biomechanical machine guidance, posture correction, Olympic barbell lifting, progressive overload',
        category: 'GYM FLOOR // ACT VI',
        plan: 'Unisex Gym Access (₹1,499/mo)',
      };
    }

    if (goal === 'conditioning') {
      return {
        title: 'Personal Training & Body Transformation',
        coach: 'Dedicated 1-on-1 Trainer (Male / Female)',
        time:
          schedule === 'morning'
            ? '06:30 – 08:30 (Dawn Prime)'
            : schedule === 'evening'
            ? '18:00 – 20:30 (Evening Focus)'
            : '12:00 – 15:00 (Midday Slot)',
        focus:
          'Targeted fat loss, metabolic conditioning, high-protein nutrition blueprint, 1-on-1 form tracking',
        category: 'PERSONAL COACHING // ACT VI',
        plan: 'PT Transformation (₹3,499/mo)',
      };
    }

    if (goal === 'keratin') {
      return {
        title: 'Keratin Smoothing & Hair Restoration',
        coach: 'Tania Roy (Senior Hair & Spa Specialist)',
        time:
          schedule === 'morning'
            ? '10:00 – 13:00'
            : schedule === 'evening'
            ? '16:00 – 19:30'
            : '12:00 – 15:00',
        focus:
          'Formaldehyde-free keratin smoothing, deep hair botox, protein spa infusion, frizz-free silk finish',
        category: 'PRIVATE SALON // ACT VI',
        plan: 'Keratin Lounge Session',
      };
    }

    return {
      title: 'Bridal & Celebration Glamour Studio',
      coach: 'Shilpa Roy (Founder & Master Aesthetician)',
      time: 'Private Appointment Slot (Custom Schedule)',
      focus:
        'High-definition waterproof bridal makeup, reception styling, skin brightening, unisex facial care',
      category: 'BEAUTY STUDIO // ACT VI',
      plan: 'Bridal & Event Consultation',
    };
  };

  const rec = getRecommendation();
  const currentQ = QUARTERS[activeQuarter];

  return (
    <section
      id="class-finder"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F5F2EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#141311] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>ACT VI // THE PLAYBOOK & CONCIERGE</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
              THE STUDIO{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Playbook.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4C514A]">
              Configure your objective across three decisions and inspect your four-quarter progression
              blueprint in Rahara, Khardaha.
            </p>
          </div>

          {/* Oddball Q1-Q4 Game Clock Switcher (00:14-00:17 Motif) */}
          <div className="flex flex-wrap items-center gap-2 bg-[#141614] text-[#F5F2EA] p-2 rounded-2xl border border-[#0D0D0E]/15 self-start lg:self-end shadow-lg">
            {QUARTERS.map((q, idx) => {
              const isSelected = activeQuarter === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveQuarter(idx)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs font-extrabold uppercase transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D9381E] text-white shadow-sm'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {q.id}
                </button>
              );
            })}

            <div className="px-3 py-1 border-l border-white/15 font-mono text-right">
              <span className="block text-[9px] uppercase tracking-widest text-white/45">
                CLOCK
              </span>
              <span className="text-sm font-bold text-[#D9381E] tabular-nums">
                {currentQ.clock}
              </span>
            </div>

            <div className="px-3 py-1 border-l border-white/15 font-mono text-right">
              <span className="block text-[9px] uppercase tracking-widest text-white/45">
                PHASE
              </span>
              <span className="text-sm font-bold text-white tabular-nums">
                {currentQ.score}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 7 COLUMNS: 3 Guided Decision Steps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Primary Objective */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9381E]">
                  DECISION 01 // PRIMARY OBJECTIVE
                </span>
                <span className="font-mono text-xs text-[#0D0D0E]/45">STEP 1 OF 3</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#0D0D0E] mb-5">
                What is your focus?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'strength',
                    label: 'Unisex Gym & Iron',
                    sublabel: 'Biomechanical machines & free weights',
                    qIndex: 0,
                  },
                  {
                    id: 'conditioning',
                    label: 'Fat Loss & 1-on-1 PT',
                    sublabel: 'Dedicated personal trainer & custom diet',
                    qIndex: 1,
                  },
                  {
                    id: 'keratin',
                    label: 'Keratin & Hair Spa',
                    sublabel: 'Smoothing therapy & deep conditioning',
                    qIndex: 2,
                  },
                  {
                    id: 'makeup',
                    label: 'Bridal & Glamour Studio',
                    sublabel: 'HD celebration makeover & skin care',
                    qIndex: 3,
                  },
                ].map((opt) => {
                  const isSelected = goal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setGoal(opt.id);
                        setActiveQuarter(opt.qIndex);
                      }}
                      className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0D0D0E] text-white border-[#0D0D0E] shadow-md'
                          : 'bg-[#FAF8F4] text-[#0D0D0E] border-[#0D0D0E]/10 hover:border-[#D9381E]/60'
                      }`}
                    >
                      <div className="pr-3">
                        <span className="block font-display text-sm sm:text-base font-bold mb-0.5">
                          {opt.label}
                        </span>
                        <span
                          className={`text-xs block ${
                            isSelected ? 'text-white/75' : 'text-[#5A6057]'
                          }`}
                        >
                          {opt.sublabel}
                        </span>
                      </div>
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          isSelected ? 'text-[#D9381E]' : 'text-[#0D0D0E]/20'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Experience Level */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9381E]">
                  DECISION 02 // EXPERIENCE LEVEL
                </span>
                <span className="font-mono text-xs text-[#0D0D0E]/45">STEP 2 OF 3</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#0D0D0E] mb-5">
                What is your background?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'beginner', label: 'Beginner', sub: 'Guided form coaching' },
                  { id: 'intermediate', label: 'Regular', sub: 'Consistent routine' },
                  { id: 'advanced', label: 'Experienced', sub: 'Heavy loading' },
                ].map((opt, idx) => {
                  const isSelected = experience === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setExperience(opt.id);
                        setActiveQuarter(Math.min(3, idx + 1));
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D0D0E] text-white border-[#0D0D0E] shadow-md'
                          : 'bg-[#FAF8F4] text-[#0D0D0E] border-[#0D0D0E]/10 hover:border-[#D9381E]/60'
                      }`}
                    >
                      <span className="block font-display text-sm font-bold mb-0.5">
                        {opt.label}
                      </span>
                      <span
                        className={`text-xs block ${
                          isSelected ? 'text-white/75' : 'text-[#5A6057]'
                        }`}
                      >
                        {opt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preferred Timing */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#0D0D0E]/12 shadow-sculptural">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9381E]">
                  DECISION 03 // PREFERRED TIMING
                </span>
                <span className="font-mono text-xs text-[#0D0D0E]/45">STEP 3 OF 3</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#0D0D0E] mb-5">
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
                      onClick={() => {
                        setSchedule(opt.id);
                        setActiveQuarter(3);
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D0D0E] text-white border-[#0D0D0E] shadow-md'
                          : 'bg-[#FAF8F4] text-[#0D0D0E] border-[#0D0D0E]/10 hover:border-[#D9381E]/60'
                      }`}
                    >
                      <span className="block font-display text-sm font-bold mb-0.5">
                        {opt.label}
                      </span>
                      <span
                        className={`text-xs block ${
                          isSelected ? 'text-white/75' : 'text-[#5A6057]'
                        }`}
                      >
                        {opt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: Oddball Tactical Playbook Clipboard + Tailored Dossier */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            {/* Tactical SVG Clipboard Card */}
            <div className="bg-[#FAF8F4] p-5 sm:p-6 rounded-3xl border-4 border-[#0D0D0E] shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-[#0D0D0E]">
                  TACTICAL CLIPBOARD // {currentQ.id}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#D9381E]">
                  +{currentQ.score} PTS
                </span>
              </div>

              {/* SVG Court / Biomechanics Play Diagram */}
              <div className="relative w-full aspect-[16/10] bg-white rounded-2xl border border-[#0D0D0E]/15 overflow-hidden mb-4">
                <svg viewBox="0 0 560 280" className="w-full h-full">
                  {/* Court / Floor Grid Lines */}
                  <rect
                    x="16"
                    y="16"
                    width="528"
                    height="248"
                    rx="12"
                    fill="none"
                    stroke="#0D0D0E"
                    strokeWidth="1.5"
                    opacity="0.2"
                  />
                  <path
                    d="M 140 16 A 140 140 0 0 0 420 16"
                    fill="none"
                    stroke="#0D0D0E"
                    strokeWidth="1.5"
                    opacity="0.2"
                  />
                  <circle
                    cx="280"
                    cy="140"
                    r="52"
                    fill="none"
                    stroke="#0D0D0E"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.25"
                  />

                  {/* X Defensive / Resistance Markers */}
                  <text
                    x="185"
                    y="105"
                    className="font-mono text-sm font-bold fill-[#D9381E]"
                  >
                    ✕
                  </text>
                  <text
                    x="335"
                    y="125"
                    className="font-mono text-sm font-bold fill-[#D9381E]"
                  >
                    ✕
                  </text>
                  <text
                    x="275"
                    y="195"
                    className="font-mono text-sm font-bold fill-[#D9381E]"
                  >
                    ✕
                  </text>

                  {/* Dynamic Play Trajectory Line */}
                  <path
                    d={currentQ.svgPath}
                    fill="none"
                    stroke="#0D0D0E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={currentQ.svgPath}
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />

                  {/* Start Node (Athlete) */}
                  <circle
                    cx="70"
                    cy="210"
                    r="12"
                    fill="#D9381E"
                    stroke="#0D0D0E"
                    strokeWidth="2"
                  />
                  <text
                    x="66"
                    y="214"
                    className="font-mono text-[10px] font-bold fill-white"
                  >
                    1
                  </text>

                  {/* Active Target Node */}
                  <circle
                    cx={currentQ.targetX}
                    cy={currentQ.targetY}
                    r="14"
                    fill="#141311"
                    stroke="#0D0D0E"
                    strokeWidth="2"
                  />
                  <circle
                    cx={currentQ.targetX}
                    cy={currentQ.targetY}
                    r="22"
                    fill="none"
                    stroke="#D9381E"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#141311] font-bold">
                  QUARTER {activeQuarter + 1} OF 4 · COACH&apos;S ORDERS
                </span>
                <h4 className="font-display text-xl font-extrabold uppercase text-[#0D0D0E]">
                  {currentQ.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#4C514A]">
                  {currentQ.note}
                </p>
              </div>
            </div>

            {/* Tailored Recommendation Output Card */}
            <div className="bg-[#141311] text-[#F5F2EA] p-7 sm:p-8 rounded-3xl shadow-2xl border border-white/15">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9381E]/20 border border-[#D9381E]/40 font-mono text-[11px] font-bold text-[#D9381E] uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  TAILORED MATCH
                </span>
                <span className="font-mono text-[11px] text-[#E6DEC8]/80 uppercase">
                  {rec.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight mb-3">
                {rec.title}
              </h3>

              <p className="font-sans text-sm text-[#E6DEC8]/90 leading-relaxed mb-6">
                {rec.focus}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-white/15 font-mono text-xs mb-6">
                <div className="flex justify-between">
                  <span className="text-[#E6DEC8]/60">LEAD SPECIALIST:</span>
                  <span className="text-white font-bold text-right">{rec.coach}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E6DEC8]/60">OPTIMAL WINDOW:</span>
                  <span className="text-white font-bold text-right">{rec.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E6DEC8]/60">RECOMMENDED TRACK:</span>
                  <span className="text-[#D9381E] font-bold text-right">{rec.plan}</span>
                </div>
              </div>

              <Button
                onClick={() => onSelectClass && onSelectClass(rec.plan)}
                size="lg"
                variant="primary"
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="w-full justify-center"
              >
                LOCK IN THIS PLAYBOOK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassFinder;
