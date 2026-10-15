import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { User } from 'lucide-react';

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
          title="Weekly Studio Schedule."
          description="Open daily from 06:00 AM to 10:00 PM. Reserve training time on the gym floor or book private salon treatments in Rahara, Khardaha."
        />

        {/* Day Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-xs text-sm font-bold uppercase transition-colors cursor-pointer whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-[#20231F] text-[#F5F2EA]'
                  : 'bg-white text-[#20231F]/80 hover:bg-white/80'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Discipline Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'strength', label: 'Gym & Strength' },
            { id: 'conditioning', label: 'Fat Loss & Cardio' },
            { id: 'mobility', label: 'Keratin & Hair Spa' },
            { id: 'private', label: 'Personal Coaching & Bridal' },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setDisciplineFilter(flt.id)}
              className={`px-4 py-2 rounded-xs text-sm font-semibold uppercase transition-colors cursor-pointer ${
                disciplineFilter === flt.id
                  ? 'bg-[#FF6747] text-white'
                  : 'bg-white/70 text-[#20231F]/70 hover:bg-white'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white p-6 sm:p-7 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="w-40 flex-shrink-0">
                  <span className="text-base font-extrabold text-[#20231F] tabular-nums block">
                    {session.time}
                  </span>
                  <span className="text-sm text-[#174D3B] font-semibold">
                    {session.duration}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-display font-bold text-[#20231F] mb-1">
                    {session.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#4E534B]">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#FF6747]" />
                      <span>{session.coach}</span>
                    </span>
                    <span>·</span>
                    <span>{session.bay}</span>
                    <span>·</span>
                    <span className="text-[#174D3B] font-semibold">{session.spotsLeft} slots left</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onBookClass(session.title, session.time, session.coach)}
                >
                  RESERVE SLOT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
