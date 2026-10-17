import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { User, ArrowUpRight } from 'lucide-react';

export interface TimetableBookingProps {
  onBookClass: (sessionTitle: string, time: string, coach: string) => void;
}

interface ClassSession {
  id: string;
  time: string;
  discipline: 'strength' | 'conditioning' | 'mobility' | 'private';
  title: string;
  coach: string;
  duration: string;
  bay: string;
  spotsLeft: number;
}

const SCHEDULE_DATA: Record<string, ClassSession[]> = {
  Mon: [
    { id: 'm1', time: '06:00 – 08:30', discipline: 'strength', title: 'Morning Iron & Strength Circuit', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 8 },
    { id: 'm2', time: '08:30 – 10:30', discipline: 'conditioning', title: 'Fat Loss & High-Intensity Cardio', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', spotsLeft: 5 },
    { id: 'm3', time: '11:00 – 14:00', discipline: 'private', title: '1-on-1 Personal Training & Body Measurement', coach: 'Dedicated PT', duration: '60 min', bay: 'PT Bay', spotsLeft: 2 },
    { id: 'm4', time: '12:00 – 17:00', discipline: 'mobility', title: 'Keratin Hair Spa & Treatment Lounge', coach: 'Senior Hair Stylist', duration: '90–120 min', bay: 'Unisex Salon Suite', spotsLeft: 3 },
    { id: 'm5', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Peak Muscle Building & Hypertrophy', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 6 },
  ],
  Tue: [
    { id: 't1', time: '06:00 – 09:00', discipline: 'strength', title: 'Morning Strength & Calibrated Machines', coach: 'Floor Instructor', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 10 },
    { id: 't2', time: '09:00 – 11:00', discipline: 'conditioning', title: 'Aerobic Fat Burn & Core Conditioning', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', spotsLeft: 4 },
    { id: 't3', time: '12:00 – 16:00', discipline: 'mobility', title: 'Hair Botox, Protein Spa & Rejuvenation', coach: 'Senior Hair Stylist', duration: '90 min', bay: 'Unisex Salon Suite', spotsLeft: 2 },
    { id: 't4', time: '17:00 – 22:00', discipline: 'strength', title: 'Evening Strength & Powerlifting Floor', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 7 },
  ],
  Wed: [
    { id: 'w1', time: '06:00 – 08:30', discipline: 'strength', title: 'Morning Iron & Strength Circuit', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 9 },
    { id: 'w2', time: '08:30 – 10:30', discipline: 'conditioning', title: 'Metabolic Conditioning & Fat Loss', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', spotsLeft: 6 },
    { id: 'w3', time: '14:00 – 18:00', discipline: 'private', title: 'Bridal Consultation & Skin Glow Facial', coach: 'Lead Makeup Artist', duration: '60 min', bay: 'Beauty Studio', spotsLeft: 2 },
    { id: 'w4', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Peak Muscle Building Floor', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 5 },
  ],
  Thu: [
    { id: 'th1', time: '06:00 – 09:00', discipline: 'strength', title: 'Morning Strength & Dumbbell Rows', coach: 'Floor Instructor', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 12 },
    { id: 'th2', time: '10:00 – 13:00', discipline: 'private', title: 'Personalized Weight Loss Check-in & PT', coach: 'Dedicated PT', duration: '60 min', bay: 'PT Bay', spotsLeft: 2 },
    { id: 'th3', time: '14:00 – 17:30', discipline: 'mobility', title: 'Keratin Gloss & Deep Conditioning Treatment', coach: 'Master Hair Stylist', duration: '120 min', bay: 'Unisex Salon Suite', spotsLeft: 1 },
    { id: 'th4', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Iron & Barbell Floor', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 8 },
  ],
  Fri: [
    { id: 'f1', time: '06:00 – 08:30', discipline: 'strength', title: 'Compound Lifting & Posture Strength', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 7 },
    { id: 'f2', time: '09:00 – 11:00', discipline: 'conditioning', title: 'High-Energy Cardio & Treadmill Surge', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', spotsLeft: 4 },
    { id: 'f3', time: '13:00 – 17:00', discipline: 'mobility', title: 'Unisex Aesthetic Facial & Scalp Revival', coach: 'Salon Aesthetician', duration: '75 min', bay: 'Beauty Studio', spotsLeft: 3 },
    { id: 'f4', time: '17:30 – 22:00', discipline: 'strength', title: 'Friday Night Pump & Functional Training', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 6 },
  ],
  Sat: [
    { id: 's1', time: '07:00 – 10:30', discipline: 'strength', title: 'Weekend Heavy Loading Intensive', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 4 },
    { id: 's2', time: '11:00 – 15:00', discipline: 'mobility', title: 'Keratin Therapy & Event Hair Styling', coach: 'Senior Hair Stylist', duration: '120 min', bay: 'Unisex Salon Suite', spotsLeft: 2 },
    { id: 's3', time: '15:30 – 19:30', discipline: 'private', title: 'Pre-Wedding & Party HD Makeup Studio', coach: 'Lead Makeup Artist', duration: '90 min', bay: 'Beauty Studio', spotsLeft: 1 },
    { id: 's4', time: '18:00 – 22:00', discipline: 'strength', title: 'Saturday Evening Fitness Floor', coach: 'Floor Staff', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 9 },
  ],
  Sun: [
    { id: 'su1', time: '08:00 – 12:00', discipline: 'strength', title: 'Sunday Morning Workout & Mobility Flow', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 10 },
    { id: 'su2', time: '12:00 – 16:00', discipline: 'mobility', title: 'Sunday Self-Care: Hair Spa & Skin Care', coach: 'Salon Aesthetician', duration: '90 min', bay: 'Unisex Salon Suite', spotsLeft: 3 },
    { id: 'su3', time: '17:00 – 22:00', discipline: 'strength', title: 'Sunday Evening Workout & Reset', coach: 'Floor Staff', duration: 'Full Access', bay: 'Gym Floor A', spotsLeft: 12 },
  ],
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TimetableBooking: React.FC<TimetableBookingProps> = ({ onBookClass }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const [disciplineFilter, setDisciplineFilter] = useState<string>('all');

  const sessions = (SCHEDULE_DATA[selectedDay] || []).filter((s) => {
    if (disciplineFilter === 'all') return true;
    return s.discipline === disciplineFilter;
  });

  return (
    <section id="timetable" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#EDE9DF]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Weekly Timetable"
          title="Daily Studio Schedule."
          description="Open daily from 06:00 AM to 10:00 PM. Reserve your training slot on the gym floor or book private salon treatments in Rahara, Khardaha."
        />

        {/* High-End Segmented Day Dock */}
        <div className="mb-6 flex items-center overflow-x-auto pb-2">
          <div className="p-1.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            {DAYS.map((day) => {
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-md border border-[#0D0D0E]'
                      : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E] hover:bg-white/80'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tactile Discipline Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'strength', label: 'Gym & Strength' },
            { id: 'conditioning', label: 'Fat Loss & Cardio' },
            { id: 'mobility', label: 'Keratin & Hair Spa' },
            { id: 'private', label: 'Personal Coaching & Bridal' },
          ].map((flt) => {
            const isActive = disciplineFilter === flt.id;
            return (
              <button
                key={flt.id}
                type="button"
                onClick={() => setDisciplineFilter(flt.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border active:scale-95 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#D9381E] text-[#0D0D0E] border-[#D9381E] shadow-xs'
                    : 'bg-white/90 text-[#0D0D0E]/75 border-[#0D0D0E]/15 hover:border-[#D9381E]/60 hover:text-[#0D0D0E]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0D0D0E]' : 'bg-[#D9381E]'}`} />
                <span>{flt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Schedule List with Double-Bezel Framing */}
        <div className="space-y-3.5">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-1.5 sm:p-2 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2rem] shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="bg-white p-5 sm:p-6 rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="w-44 flex-shrink-0">
                    <span className="text-base font-extrabold text-[#0D0D0E] tabular-nums block tracking-tight">
                      {session.time}
                    </span>
                    <span className="text-xs text-[#141311] font-bold uppercase tracking-wider">
                      {session.duration}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-display font-extrabold text-[#0D0D0E] uppercase tracking-tight mb-1">
                      {session.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#4E534B]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-[#D9381E]" />
                        <span>{session.coach}</span>
                      </span>
                      <span>·</span>
                      <span>{session.bay}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1 text-[#141311] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141311]" />
                        <span>{session.spotsLeft} slots left</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onBookClass(session.title, session.time, session.coach)}
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    RESERVE SLOT
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
