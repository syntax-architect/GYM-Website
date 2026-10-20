import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Clock, UserCheck, Sparkles } from 'lucide-react';
import { useCmsStore } from '../../store/cmsStore';

export interface TimetableBookingProps {
  onBookClass: (sessionTitle: string, time: string, coach: string) => void;
}

type DayKey = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
type CategoryFilter = 'all' | 'strength' | 'cardio' | 'keratin' | 'bridal';

interface ScheduleSlot {
  id: string;
  day?: string;
  time: string;
  duration: string;
  title: string;
  coach: string;
  zone: string;
  slotsLeft: number;
  category: Exclude<CategoryFilter, 'all'>;
}

const BASE_SESSIONS: ScheduleSlot[] = [
  {
    id: 's1',
    time: '06:00 – 08:30',
    duration: 'FULL ACCESS',
    title: 'MORNING IRON & BIOMECHANICAL STRENGTH CIRCUIT',
    coach: 'Coach Rajesh Sen',
    zone: 'Gym Floor A',
    slotsLeft: 8,
    category: 'strength',
  },
  {
    id: 's2',
    time: '08:30 – 10:30',
    duration: '60 MIN',
    title: 'FAT LOSS & METABOLIC CONDITIONING SURGE',
    coach: 'Coach Priya Mukherjee',
    zone: 'Cardio & Turf Zone',
    slotsLeft: 5,
    category: 'cardio',
  },
  {
    id: 's3',
    time: '11:00 – 14:00',
    duration: '60 MIN',
    title: '1-ON-1 PERSONAL TRAINING & BODY RECOMPOSITION',
    coach: 'Dedicated PT Specialist',
    zone: 'Private PT Bay',
    slotsLeft: 2,
    category: 'strength',
  },
  {
    id: 's4',
    time: '12:00 – 17:00',
    duration: '90–120 MIN',
    title: 'FORMALDEHYDE-FREE KERATIN & HAIR BOTOX LOUNGE',
    coach: 'Tania Roy',
    zone: 'Private Salon Suite',
    slotsLeft: 3,
    category: 'keratin',
  },
  {
    id: 's5',
    time: '15:00 – 18:00',
    duration: 'BY APPOINTMENT',
    title: 'HD BRIDAL MAKEOVER & SKIN LUMINESCENCE STUDIO',
    coach: 'Shilpa Roy',
    zone: 'Bridal Artistry Wing',
    slotsLeft: 2,
    category: 'bridal',
  },
  {
    id: 's6',
    time: '17:30 – 22:00',
    duration: 'FULL ACCESS',
    title: 'EVENING PEAK MUSCLE HYPERTROPHY & HEAVY IRON',
    coach: 'Lead Floor Trainers',
    zone: 'Olympic Lifting Floor',
    slotsLeft: 6,
    category: 'strength',
  },
];

const DAYS: DayKey[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const TimetableBooking: React.FC<TimetableBookingProps> = ({ onBookClass }) => {
  const brand = useCmsStore((s) => s.brand);
  const timetableSlots = useCmsStore((s) => s.timetableSlots);
  const [selectedDay, setSelectedDay] = useState<DayKey>('MON');
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const filteredSessions = useMemo(() => {
    const list = timetableSlots && timetableSlots.length > 0 ? timetableSlots : BASE_SESSIONS;
    return list.filter((s) => {
      const matchesCategory = filter === 'all' ? true : s.category === filter;
      const matchesDay = !s.day || s.day === 'ALL' || s.day === selectedDay;
      return matchesCategory && matchesDay;
    });
  }, [timetableSlots, filter, selectedDay]);

  return (
    <section
      id="timetable"
      className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F4F1EA] text-[#0D0D0E]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#0D0D0E]/70 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>WEEKLY TIMETABLE // LIVE SLOT ROSTER</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.95]">
              DAILY STUDIO{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                Schedule.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4A4843]">
              Open daily from {brand.hours}. Reserve your training slot on the gym floor or
              book private salon treatments in {brand.locationShort}.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F4F1EA] font-mono text-xs uppercase tracking-wider self-start lg:self-end">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ACTIVE DAY // {selectedDay}</span>
          </div>
        </div>

        {/* Day Selector Strip + Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#0D0D0E]/10 mb-8 overflow-hidden">
          {/* Days */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap items-center gap-2">
            {DAYS.map((day) => {
              const active = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`shrink-0 min-h-[42px] px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0D0D0E] text-[#F4F1EA] shadow-md'
                      : 'bg-white text-[#0D0D0E]/70 border border-[#0D0D0E]/12 hover:border-[#0D0D0E]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Discipline Filters */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'ALL SESSIONS' },
              { id: 'strength', label: 'GYM & STRENGTH' },
              { id: 'cardio', label: 'FAT LOSS & CARDIO' },
              { id: 'keratin', label: 'KERATIN & HAIR SPA' },
              { id: 'bridal', label: 'BRIDAL & MAKEUP' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as CategoryFilter)}
                  className={`shrink-0 min-h-[40px] px-4 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#D9381E] text-white shadow-xs'
                      : 'bg-white/80 text-[#0D0D0E]/70 border border-[#0D0D0E]/10 hover:text-[#0D0D0E]'
                  }`}
                >
                  ● {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flight-Board Session Rows */}
        <div className="space-y-4">
          {filteredSessions.map((slot) => (
            <div
              key={`${selectedDay}-${slot.id}`}
              className="group bg-white hover:bg-[#141311] text-[#0D0D0E] hover:text-[#F4F1EA] p-6 sm:p-7 rounded-3xl border border-[#0D0D0E]/12 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Timecode Column */}
              <div className="flex items-center gap-4 lg:w-56 shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-[#F4F1EA] group-hover:bg-white/10 flex items-center justify-center text-[#D9381E] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-sm sm:text-base font-extrabold tabular-nums">
                    {slot.time}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest opacity-55">
                    {slot.duration} · {selectedDay}
                  </span>
                </div>
              </div>

              {/* Center Session Title & Specialist */}
              <div className="flex-1 space-y-1.5">
                <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight">
                  {slot.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs opacity-75">
                  <span className="inline-flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#D9381E]" />
                    {slot.coach}
                  </span>
                  <span>•</span>
                  <span>{slot.zone}</span>
                  <span>•</span>
                  <span className="text-[#D9381E] group-hover:text-[#C5A059] font-bold">
                    ● {slot.slotsLeft} slots left
                  </span>
                </div>
              </div>

              {/* Right Action Button */}
              <div className="flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => onBookClass(slot.title, `${selectedDay} · ${slot.time}`, slot.coach)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <span>RESERVE SLOT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimetableBooking;
