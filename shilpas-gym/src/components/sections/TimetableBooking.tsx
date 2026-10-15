import React, { useState } from 'react';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
  capacity: string;
  spotsLeft: number;
}

const SCHEDULE_DATA: Record<string, ClassSession[]> = {
  Mon: [
    { id: 'm1', time: '06:00 – 08:30', discipline: 'strength', title: 'Morning Iron & Strength Circuit', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 8 },
    { id: 'm2', time: '08:30 – 10:30', discipline: 'conditioning', title: 'Fat Loss & High-Intensity Cardio', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', capacity: '15 Max', spotsLeft: 5 },
    { id: 'm3', time: '11:00 – 14:00', discipline: 'private', title: '1-on-1 Personal Training & Body Measurement', coach: 'Dedicated PT', duration: '60 min', bay: 'PT Bay', capacity: '1-on-1', spotsLeft: 2 },
    { id: 'm4', time: '12:00 – 17:00', discipline: 'mobility', title: 'Keratin Hair Spa & Treatment Lounge', coach: 'Senior Hair Stylist', duration: '90–120 min', bay: 'Unisex Salon Suite', capacity: 'Private', spotsLeft: 3 },
    { id: 'm5', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Peak Muscle Building & Hypertrophy', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 6 },
  ],
  Tue: [
    { id: 't1', time: '06:00 – 09:00', discipline: 'strength', title: 'Morning Strength & Calibrated Machines', coach: 'Floor Instructor', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 10 },
    { id: 't2', time: '09:00 – 11:00', discipline: 'conditioning', title: 'Aerobic Fat Burn & Core Conditioning', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', capacity: '15 Max', spotsLeft: 4 },
    { id: 't3', time: '12:00 – 16:00', discipline: 'mobility', title: 'Hair Botox, Protein Spa & Rejuvenation', coach: 'Senior Hair Stylist', duration: '90 min', bay: 'Unisex Salon Suite', capacity: 'Private', spotsLeft: 2 },
    { id: 't4', time: '17:00 – 22:00', discipline: 'strength', title: 'Evening Strength & Powerlifting Floor', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 7 },
  ],
  Wed: [
    { id: 'w1', time: '06:00 – 08:30', discipline: 'strength', title: 'Morning Iron & Strength Circuit', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 9 },
    { id: 'w2', time: '08:30 – 10:30', discipline: 'conditioning', title: 'Metabolic Conditioning & Fat Loss', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', capacity: '15 Max', spotsLeft: 6 },
    { id: 'w3', time: '14:00 – 18:00', discipline: 'private', title: 'Bridal Consultation & Skin Glow Facial', coach: 'Lead Makeup Artist', duration: '60 min', bay: 'Beauty Studio', capacity: 'By Appt', spotsLeft: 2 },
    { id: 'w4', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Peak Muscle Building Floor', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 5 },
  ],
  Thu: [
    { id: 'th1', time: '06:00 – 09:00', discipline: 'strength', title: 'Morning Strength & Dumbbell Rows', coach: 'Floor Instructor', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 12 },
    { id: 'th2', time: '10:00 – 13:00', discipline: 'private', title: 'Personalized Weight Loss Check-in & PT', coach: 'Dedicated PT', duration: '60 min', bay: 'PT Bay', capacity: '1-on-1', spotsLeft: 2 },
    { id: 'th3', time: '14:00 – 17:30', discipline: 'mobility', title: 'Keratin Gloss & Deep Conditioning Treatment', coach: 'Master Hair Stylist', duration: '120 min', bay: 'Unisex Salon Suite', capacity: 'Private', spotsLeft: 1 },
    { id: 'th4', time: '17:30 – 22:00', discipline: 'strength', title: 'Evening Iron & Barbell Floor', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 8 },
  ],
  Fri: [
    { id: 'f1', time: '06:00 – 08:30', discipline: 'strength', title: 'Compound Lifting & Posture Strength', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 7 },
    { id: 'f2', time: '09:00 – 11:00', discipline: 'conditioning', title: 'High-Energy Cardio & Treadmill Surge', coach: 'Fitness Coach', duration: '60 min', bay: 'Cardio Zone', capacity: '15 Max', spotsLeft: 4 },
    { id: 'f3', time: '13:00 – 17:00', discipline: 'mobility', title: 'Unisex Aesthetic Facial & Scalp Revival', coach: 'Salon Aesthetician', duration: '75 min', bay: 'Beauty Studio', capacity: 'Private', spotsLeft: 3 },
    { id: 'f4', time: '17:30 – 22:00', discipline: 'strength', title: 'Friday Night Pump & Functional Training', coach: 'Lead Floor Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 6 },
  ],
  Sat: [
    { id: 's1', time: '07:00 – 10:30', discipline: 'strength', title: 'Weekend Heavy Loading Intensive', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 4 },
    { id: 's2', time: '11:00 – 15:00', discipline: 'mobility', title: 'Keratin Therapy & Special Event Hair Styling', coach: 'Senior Hair Stylist', duration: '120 min', bay: 'Unisex Salon Suite', capacity: 'Private', spotsLeft: 2 },
    { id: 's3', time: '15:30 – 19:30', discipline: 'private', title: 'Pre-Wedding & Party HD Makeup Studio', coach: 'Lead Makeup Artist', duration: '90 min', bay: 'Beauty Studio', capacity: 'By Appt', spotsLeft: 1 },
    { id: 's4', time: '18:00 – 22:00', discipline: 'strength', title: 'Saturday Evening Fitness Floor', coach: 'Floor Staff', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 9 },
  ],
  Sun: [
    { id: 'su1', time: '08:00 – 12:00', discipline: 'strength', title: 'Sunday Morning Workout & Mobility Flow', coach: 'Senior Gym Trainer', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 10 },
    { id: 'su2', time: '12:00 – 16:00', discipline: 'mobility', title: 'Sunday Self-Care: Hair Spa & Skin Care', coach: 'Salon Aesthetician', duration: '90 min', bay: 'Unisex Salon Suite', capacity: 'Private', spotsLeft: 3 },
    { id: 'su3', time: '17:00 – 22:00', discipline: 'strength', title: 'Sunday Evening Workout & Reset', coach: 'Floor Staff', duration: 'Full Access', bay: 'Gym Floor A', capacity: 'Open', spotsLeft: 12 },
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
    <section id="timetable" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF8F4] border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="08"
          tag="TIMETABLE & BOOKING"
          title="OPEN 7 DAYS A WEEK."
          accentTitle="06:00 AM — 10:00 PM."
          description="Live schedule for gym workouts, dedicated trainer sessions, and salon appointments. Walk-ins and reservations welcome in Rahara, Khardaha."
        />

        {/* Day Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-sm font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-[#20231F] text-[#F5F2EA] shadow-xs'
                  : 'bg-white text-[#20231F]/70 border border-[#20231F]/10 hover:border-[#20231F]/30'
              }`}
            >
              {day === 'Mon' ? 'MONDAY' : day === 'Tue' ? 'TUESDAY' : day === 'Wed' ? 'WEDNESDAY' : day === 'Thu' ? 'THURSDAY' : day === 'Fri' ? 'FRIDAY' : day === 'Sat' ? 'SATURDAY' : 'SUNDAY'}
            </button>
          ))}
        </div>

        {/* Discipline Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#20231F]/10 font-mono text-xs">
          <span className="text-[#20231F]/50 mr-2 uppercase">DEPARTMENT:</span>
          {[
            { id: 'all', label: 'ALL SLOTS' },
            { id: 'strength', label: 'UNISEX GYM' },
            { id: 'conditioning', label: 'FAT LOSS & CARDIO' },
            { id: 'mobility', label: 'KERATIN & HAIR SPA' },
            { id: 'private', label: 'PT & MAKEUP STUDIO' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDisciplineFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                disciplineFilter === tab.id
                  ? 'bg-[#FF6747] text-white font-bold'
                  : 'bg-white/80 text-[#20231F]/70 hover:text-[#20231F] border border-[#20231F]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-sm border border-[#20231F]/10 text-[#20231F]/60 font-mono text-xs">
              NO SCHEDULED SESSIONS MATCHING THIS FILTER TODAY.
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-8 bg-white rounded-sm border border-[#20231F]/10 hover:border-[#20231F]/30 hover:shadow-xs transition-all gap-6"
              >
                {/* Time & Duration */}
                <div className="flex items-center gap-4 lg:w-64 flex-shrink-0">
                  <div className="p-3 bg-[#FAF8F4] rounded-sm text-[#FF6747]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-lg sm:text-xl text-[#20231F] block tracking-tight">
                      {session.time}
                    </span>
                    <span className="font-mono text-xs text-[#20231F]/60">
                      {session.duration} // {session.bay}
                    </span>
                  </div>
                </div>

                {/* Session Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        session.discipline === 'strength'
                          ? 'persimmon'
                          : session.discipline === 'conditioning'
                          ? 'periwinkle'
                          : 'botanical'
                      }
                    >
                      {session.discipline.toUpperCase()}
                    </Badge>
                    <span className="font-mono text-xs text-[#20231F]/60 flex items-center gap-1">
                      <User className="w-3 h-3" /> {session.coach}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-display font-bold uppercase text-[#20231F] tracking-tight">
                    {session.title}
                  </h4>
                </div>

                {/* Capacity & Booking Trigger */}
                <div className="flex items-center justify-between lg:justify-end gap-6 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#20231F]/10">
                  <div className="text-right">
                    <span className="font-mono text-xs text-[#20231F]/60 block uppercase">CAPACITY</span>
                    <span className={`font-mono text-xs font-bold ${
                      session.spotsLeft <= 2 ? 'text-[#FF6747]' : 'text-[#174D3B]'
                    }`}>
                      {session.spotsLeft} SPOTS LEFT [{session.capacity}]
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onBookClass(session.title, session.time, session.coach)}
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                  >
                    RESERVE
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
