import React, { useState } from 'react';
import { Star, RotateCw, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCmsStore } from '../../store/cmsStore';

export interface CoachingActionProps {
  onOpenInquiry?: (plan?: string) => void;
}

interface RosterMember {
  id: string;
  number: string;
  positionCode: string;
  name: string;
  role: string;
  specialtyTag: string;
  experience: string;
  image: string;
  quote: string;
  accentColor: string;
  stats: {
    label: string;
    value: number;
  }[];
}

export const DEFAULT_ROSTER: RosterMember[] = [
  {
    id: 'rajesh-sen',
    number: '01',
    positionCode: 'HC',
    name: 'COACH RAJESH SEN',
    role: 'HEAD BIOMECHANICS & STRENGTH',
    specialtyTag: 'BIOMECHANICS & CALIBRATED RACKS',
    experience: '8+ Years Experience',
    image: '/assets/images/i08-coach-portrait.webp',
    quote:
      'Calibrated form over ego. We guide every member on precision posture, joint safety, and progressive overload.',
    accentColor: '#D9381E',
    stats: [
      { label: 'BIOMECHANICS', value: 99 },
      { label: 'STRENGTH PROGRAMMING', value: 97 },
      { label: 'JOINT REHAB & SAFETY', value: 96 },
    ],
  },
  {
    id: 'priya-mukherjee',
    number: '02',
    positionCode: 'SF',
    name: 'COACH PRIYA MUKHERJEE',
    role: 'SENIOR WOMEN’S FITNESS & POSTURE',
    specialtyTag: 'PROGRESSIVE OVERLOAD & NUTRITION',
    experience: '6+ Years Experience',
    image: '/assets/images/i07-coaching-still.webp',
    quote:
      'A welcoming, supportive environment where everyone feels confident lifting weights and hitting their target body composition.',
    accentColor: '#D9381E',
    stats: [
      { label: 'BODY RECOMPOSITION', value: 98 },
      { label: 'POSTURE ALIGNMENT', value: 97 },
      { label: 'CUSTOM MACRO DESIGN', value: 95 },
    ],
  },
  {
    id: 'shilpa-roy',
    number: '03',
    positionCode: 'MA',
    name: 'SHILPA ROY',
    role: 'FOUNDER & MASTER AESTHETICIAN',
    specialtyTag: 'HD BRIDAL MAKEOVERS & STYLING',
    experience: '10+ Years Experience',
    image: '/assets/showcase/shilpas_salon_glamour.jpg',
    quote:
      'Strength on the training floor paired with rejuvenating salon care. Total physical wellness and self-confidence under one roof.',
    accentColor: '#C5A059',
    stats: [
      { label: 'HD BRIDAL ARTISTRY', value: 99 },
      { label: 'SKIN LUMINESCENCE', value: 98 },
      { label: 'STUDIO DIRECTION', value: 99 },
    ],
  },
  {
    id: 'tania-roy',
    number: '04',
    positionCode: 'KS',
    name: 'TANIA ROY',
    role: 'SENIOR HAIR SPA & KERATIN SPECIALIST',
    specialtyTag: 'FORMALDEHYDE-FREE HAIR BOTOX & SPA',
    experience: '7+ Years Experience',
    image: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    quote:
      'Premium treatments, hygienic suites, and restorative self-care designed to revitalize you after intense workouts.',
    accentColor: '#C5A059',
    stats: [
      { label: 'KERATIN SMOOTHING', value: 99 },
      { label: 'PROTEIN HAIR BOTOX', value: 97 },
      { label: 'FRIZZ ELIMINATION', value: 98 },
    ],
  },
];

const VERIFIED_REVIEWS = [
  {
    badge: 'FEATURED REVIEW',
    headline:
      '“Exceptional facility available here. They have all latest imported equipment for gym workouts. Trainers are very helpful and experienced. Also they have a separate unisex salon section.”',
    subNote: 'Imported biomechanical lines paired with dedicated salon privacy in Rahara.',
    author: 'Shukdeb Ghosh',
    meta: 'Local Guide · 68 reviews · 368 photos · Verified Google Review',
    featured: true,
  },
  {
    badge: 'GOOD AMBIENCE & SUPPORTIVE TRAINERS',
    headline:
      '“A great place to workout with good ambience. Trainers are supportive and helpful with lifting form and discipline.”',
    author: 'Sanket Jaiswal',
    meta: 'Local Guide · 15 reviews · 2 photos',
    featured: false,
  },
  {
    badge: 'POLITE STAFF & QUALITY SALON CARE',
    headline:
      '“Ambience is very nice. Staff behaviour was polite and professional. The salon services I took were top quality. Thank you.”',
    author: 'Avramouli S.',
    meta: 'Local Guide · 17 reviews · 45 photos',
    featured: false,
  },
];

export const CoachingAction: React.FC<CoachingActionProps> = ({ onOpenInquiry }) => {
  const brand = useCmsStore((s) => s.brand);
  const trainers = useCmsStore((s) => s.trainers);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCardFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDraftSpecialist = (member: { id: string; name: string; role: string; [key: string]: any }, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenInquiry) {
      onOpenInquiry(`Session with ${member.name} (${member.role})`);
    } else {
      const timetableEl = document.querySelector('#timetable');
      timetableEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F5F2EA] text-[#0D0D0E] overflow-hidden">
      <div className="max-w-[1440px] mx-auto space-y-28">
        {/* PART 1: GOOGLE VERIFIED COMMUNITY PROOF (Preserves #reviews anchor) */}
        <div id="reviews">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#141311] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
                <span>VERIFIED MEMBER PROOF</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.96]">
                GOOGLE VERIFIED{' '}
                <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                  Community.
                </span>
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#4C514A]">
                Rated {brand.googleRating} out of 5 across {brand.reviewCount} Google reviews. Members consistently praise our
                motivating floor atmosphere, calibrated machinery, and private salon suite in{' '}
                {brand.locationShort}.
              </p>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-[#0D0D0E]/12 shadow-xs self-start lg:self-end">
              <div className="flex items-center gap-0.5 text-[#D9381E]">
                {[...Array(5)].map((_, i) => (
                  <Star className="w-3.5 h-3.5 fill-current" key={i} />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-[#0D0D0E]">
                {brand.googleRating} / 5.0 · {brand.reviewCount} GOOGLE REVIEWS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Featured Review in Double-Bezel Card */}
            <div className="lg:col-span-6 p-2 sm:p-2.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2.5rem] shadow-xl">
              <div className="bg-white p-8 sm:p-10 rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9381E]/15 text-[#D9381E] font-mono text-[11px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E]" />
                      {VERIFIED_REVIEWS[0].badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#141311] bg-[#141311]/10 px-3 py-1 rounded-full">
                      5.0 / 5.0 Rating
                    </span>
                  </div>

                  <blockquote className="font-display text-xl sm:text-2xl font-extrabold text-[#0D0D0E] leading-snug tracking-tight">
                    {VERIFIED_REVIEWS[0].headline}
                  </blockquote>

                  <p className="font-sans text-sm text-[#4C514A]">
                    {VERIFIED_REVIEWS[0].subNote}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0D0D0E]/10 flex items-center justify-between">
                  <div>
                    <span className="block font-display text-sm font-extrabold text-[#0D0D0E]">
                      {VERIFIED_REVIEWS[0].author}
                    </span>
                    <span className="font-mono text-[11px] text-[#0D0D0E]/55">
                      {VERIFIED_REVIEWS[0].meta}
                    </span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#141311]" />
                </div>
              </div>
            </div>

            {/* Right Stacked Reviews in Double-Bezel Cards */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              {VERIFIED_REVIEWS.slice(1).map((rev, idx) => (
                <div
                  key={idx}
                  className="p-1.5 sm:p-2 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2rem] shadow-xs flex-1 flex flex-col"
                >
                  <div className="bg-white p-6 sm:p-8 rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between h-full flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#141311]">
                          {rev.badge}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#141311] bg-[#141311]/10 px-2.5 py-0.5 rounded-full">
                          5.0 / 5.0 Verified
                        </span>
                      </div>
                      <p className="font-sans text-sm sm:text-base text-[#0D0D0E] font-medium leading-relaxed">
                        {rev.headline}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#0D0D0E]/10 flex items-center justify-between">
                      <div>
                        <span className="block font-display text-xs sm:text-sm font-bold text-[#0D0D0E]">
                          {rev.author}
                        </span>
                        <span className="font-mono text-[10px] text-[#0D0D0E]/55">{rev.meta}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D9381E]">
                        GOOGLE REVIEW
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: ODDBALL-INSPIRED 3D FLIP STARTING ROSTER CARDS */}
        <div id="coaches">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#141311] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
                <span>ACT V // THE STARTING LINEUP</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
                THE FLOOR{' '}
                <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                  Roster.
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#4C514A]">
                Four positions. One dual-sanctuary team. Hover or tap any specialist card to flip and
                inspect their biomechanical & aesthetic telemetry ratings.
              </p>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F5F2EA] font-mono text-xs uppercase tracking-wider self-start lg:self-end">
              <RotateCw className="w-3.5 h-3.5 text-[#D9381E]" />
              <span>TAP OR HOVER A CARD TO FLIP IT</span>
            </div>
          </div>

          {/* 4-Card 3D Collectible Roster Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((member) => {
              const isFlipped = !!flippedIds[member.id];
              return (
                <div
                  key={member.id}
                  onClick={() => toggleCardFlip(member.id)}
                  onMouseEnter={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                      setFlippedIds((prev) => ({ ...prev, [member.id]: true }));
                    }
                  }}
                  onMouseLeave={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                      setFlippedIds((prev) => ({ ...prev, [member.id]: false }));
                    }
                  }}
                  className="group relative h-[440px] sm:h-[490px] w-full cursor-pointer select-none"
                  style={{ perspective: '1200px' }}
                >
                  {/* pointer-events-none prevents 3D rotation edge from triggering mouseleave jitter */}
                  <div
                    className="relative w-full h-full transition-transform duration-500 ease-out pointer-events-none will-change-transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* FRONT OF COLLECTIBLE CARD */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#161815] text-[#F5F2EA] border-2 border-[#0D0D0E]/15 shadow-xl flex flex-col justify-between"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    >
                      <img
                        src={member.image}
                        alt={`${member.name} (${member.roleBengali}) - Certified Coach at Shilpa's Gym in Rahara, Khardaha`}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={550}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            '/assets/images/i08-coach-portrait.webp';
                        }}
                        className="absolute inset-0 w-full h-full object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F0E] via-[#0D0F0E]/35 to-black/30" />

                      <div className="relative z-10 p-5 flex items-start justify-between">
                        <span
                          className="font-display text-5xl font-black leading-none tracking-tighter drop-shadow-md"
                          style={{
                            WebkitTextStroke: '1.5px rgba(245,242,234,0.85)',
                            color: 'transparent',
                          }}
                        >
                          {member.number}
                        </span>

                        <span
                          style={{ backgroundColor: member.accentColor }}
                          className="px-2.5 py-1 rounded-md font-mono text-xs font-extrabold text-white uppercase tracking-wider shadow-md"
                        >
                          {member.positionCode}
                        </span>
                      </div>

                      <div className="relative z-10 p-6 space-y-2.5">
                        <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest text-[#D9381E]">
                          {member.specialtyTag}
                        </span>

                        <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white leading-tight">
                          {member.name}
                        </h3>

                        <p className="font-sans text-xs text-white/75 font-medium">
                          {member.role}
                        </p>

                        <div className="pt-3 border-t border-white/15 flex items-center justify-between font-mono text-[11px] text-white/80">
                          <span>{member.experience}</span>
                          <span className="inline-flex items-center gap-1.5 text-[#C5A059] font-bold bg-[#0D0D0E]/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#C5A059]/40 sm:bg-transparent sm:border-none sm:p-0">
                            <RotateCw className="w-3 h-3 text-[#D9381E]" />
                            <span className="sm:hidden text-[10px] tracking-wider text-white">TAP CARD TO FLIP ↻</span>
                            <span className="hidden sm:inline">STATS</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK OF COLLECTIBLE CARD */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#141311] text-[#F5F2EA] border-2 border-[#D9381E] p-4 sm:p-6 flex flex-col justify-between shadow-2xl"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                            #{member.number} · {member.positionCode} SPEC
                          </span>
                          <Sparkles className="w-4 h-4 text-[#D9381E]" />
                        </div>

                        <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white mb-0.5 sm:mb-1">
                          {member.name}
                        </h3>
                        <p className="font-mono text-[10px] sm:text-[11px] text-white/55 uppercase tracking-wider mb-2.5 sm:mb-5">
                          {member.role}
                        </p>

                        <blockquote className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 font-serif italic text-xs sm:text-base text-[#E6DEC8] leading-snug mb-3 sm:mb-6">
                          “{member.quote}”
                        </blockquote>
                      </div>

                      <div className="space-y-2 sm:space-y-3.5 my-auto">
                        {member.stats.map((st) => (
                          <div key={st.label}>
                            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] mb-1">
                              <span className="text-white/75 uppercase tracking-wider">
                                {st.label}
                              </span>
                              <span className="text-[#C5A059] font-bold tabular-nums text-xs sm:text-sm">
                                {st.value}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#D9381E] rounded-full transition-all duration-700"
                                style={{ width: `${st.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDraftSpecialist(member, e)}
                        className="pointer-events-auto w-full mt-3 sm:mt-4 py-2.5 sm:py-3.5 px-4 rounded-full bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
                      >
                        <span>DRAFT THIS SPECIALIST</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingAction;
