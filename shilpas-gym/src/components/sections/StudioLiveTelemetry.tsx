import React, { useState } from 'react';
import { ArrowUpRight, Thermometer, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCmsStore } from '../../store/cmsStore';

export interface StudioLiveTelemetryProps {
  onOpenInquiry: () => void;
}

interface HourSlot {
  hour: string;
  timeLabel?: string;
  density: number;
  status: 'QUIET' | 'MODERATE' | 'PRIME' | 'PEAK' | 'OPTIMAL';
  note: string;
}

const HOURLY_CURVE: HourSlot[] = [
  { hour: '06', timeLabel: '06:00 AM', density: 42, status: 'OPTIMAL', note: 'Morning barbell & conditioning crew.' },
  { hour: '07', timeLabel: '07:00 AM', density: 68, status: 'OPTIMAL', note: 'Active morning rush; all racks supervised.' },
  { hour: '08', timeLabel: '08:00 AM', density: 78, status: 'PEAK', note: 'High-energy morning peak session.' },
  { hour: '09', timeLabel: '09:00 AM', density: 54, status: 'OPTIMAL', note: 'Balanced floor & salon opening prep.' },
  { hour: '10', timeLabel: '10:00 AM', density: 32, status: 'QUIET', note: 'Calm floor; ideal for 1-on-1 form coaching.' },
  { hour: '11', timeLabel: '11:00 AM', density: 26, status: 'QUIET', note: 'Private salon keratin appointments active.' },
  { hour: '12', timeLabel: '12:00 PM', density: 22, status: 'QUIET', note: 'Zero wait time on all Olympic cages.' },
  { hour: '13', timeLabel: '01:00 PM', density: 15, status: 'QUIET', note: 'Serene midday window; maximum privacy.' },
  { hour: '14', timeLabel: '02:00 PM', density: 18, status: 'QUIET', note: 'Quiet strength floor & bridal consultations.' },
  { hour: '15', timeLabel: '03:00 PM', density: 28, status: 'QUIET', note: 'Afternoon personal training window.' },
  { hour: '16', timeLabel: '04:00 PM', density: 45, status: 'OPTIMAL', note: 'Early evening warm-up cadence.' },
  { hour: '17', timeLabel: '05:00 PM', density: 72, status: 'OPTIMAL', note: 'Evening strength & cardio momentum.' },
  { hour: '18', timeLabel: '06:00 PM', density: 88, status: 'PEAK', note: 'Prime evening atmosphere; 2 floor coaches active.' },
  { hour: '19', timeLabel: '07:00 PM', density: 92, status: 'PEAK', note: 'Peak hypertrophy & conditioning window.' },
  { hour: '20', timeLabel: '08:00 PM', density: 74, status: 'OPTIMAL', note: 'Late evening heavy compound lifting.' },
  { hour: '21', timeLabel: '09:00 PM', density: 44, status: 'OPTIMAL', note: 'Cool-down & final strength sets until 10 PM.' },
];

export const StudioLiveTelemetry: React.FC<StudioLiveTelemetryProps> = ({ onOpenInquiry }) => {
  const brand = useCmsStore((s) => s.brand);
  const hourlyCurve = useCmsStore((s) => s.hourlyCurve);
  const [selectedHour, setSelectedHour] = useState<string>('13');
  const currentSlot = hourlyCurve.find((h) => h.hour === selectedHour) || hourlyCurve[7] || HOURLY_CURVE[7];
  const isOverridden = brand.liveOccupancyOverride !== null;
  const activeDensity = isOverridden ? brand.liveOccupancyOverride! : currentSlot.density;

  const getBarColor = (status: HourSlot['status'], isSelected: boolean) => {
    if (isSelected) return 'bg-[#D9381E] ring-2 ring-white';
    if (status === 'QUIET') return 'bg-emerald-500/80 hover:bg-emerald-400';
    if (status === 'OPTIMAL' || status === 'MODERATE' || status === 'PRIME') return 'bg-[#C5A059] hover:bg-[#D9B978]';
    return 'bg-[#D9381E]/80 hover:bg-[#D9381E]';
  };

  return (
    <section className="w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#F4F1EA]">
      <div className="max-w-[1440px] mx-auto rounded-[2rem] bg-[#141311] text-[#F4F1EA] p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 font-mono text-[11px] uppercase tracking-widest text-[#C5A059]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>REAL-TIME STUDIO TELEMETRY</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
              LIVE FLOOR CAPACITY &{' '}
              <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                Atmosphere.
              </span>
            </h2>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>STUDIO OPEN DAILY</span>
            </div>
            <span className="text-white/55 text-[11px]">
              {brand.hours} IST · {brand.locationShort}
            </span>
          </div>
        </div>

        {/* 12-Column Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 4 Columns: Active Window Readout */}
          <div className="lg:col-span-4 bg-[#1C1A17] p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between font-mono text-xs mb-4">
                <span className="text-white/50 uppercase tracking-widest">
                  {isOverridden ? 'STAFF OVERRIDE' : 'SELECTED WINDOW'}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#D9381E] text-white font-bold">
                  {isOverridden ? 'LIVE FLOOR SENSOR' : (currentSlot.timeLabel || `${currentSlot.hour}:00`)}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif italic text-6xl sm:text-7xl text-white leading-none tabular-nums">
                  {activeDensity}%
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059]">
                  {isOverridden ? 'LIVE OVERRIDE' : 'FLOOR DENSITY'}
                </span>
              </div>

              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-[#D9381E] transition-all duration-300"
                  style={{ width: `${activeDensity}%` }}
                />
              </div>

              <div className="flex items-center justify-between font-mono text-xs py-2 border-y border-white/10 mb-3">
                <span className="text-white/60">ATMOSPHERE RATING:</span>
                <span className="text-emerald-400 font-bold">{currentSlot.status}</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#E6DEC8]/80 leading-relaxed">
                {currentSlot.note}
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={onOpenInquiry}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full justify-center"
            >
              RESERVE FLOOR PASS
            </Button>
          </div>

          {/* Right 8 Columns: Interactive 16-Hour Rush Curve + 4 Environmental Sensors */}
          <div className="lg:col-span-8 bg-[#1C1A17] p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div>
                  <span className="block font-display text-sm sm:text-base font-extrabold uppercase text-white">
                    TYPICAL DAILY OCCUPANCY PATTERN
                  </span>
                  <span className="font-sans text-xs text-white/50">
                    Click any hour column below to inspect traffic and atmospheric conditions.
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1.5 text-white/75">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Quiet (&lt;35%)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/75">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                    Optimal
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-white/75">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9381E]" />
                    Peak (&gt;75%)
                  </span>
                </div>
              </div>

              {/* 16 Interactive Bar Columns (Horizontally scrollable on mobile for comfortable tap targets) */}
              <div className="overflow-x-auto pb-2 no-scrollbar">
                <div className="h-44 min-w-[460px] sm:min-w-0 flex items-end justify-between gap-1.5 sm:gap-2.5 pt-6 px-2 border-b border-white/10">
                  {hourlyCurve.map((slot) => {
                    const isSelected = slot.hour === selectedHour;
                    return (
                      <button
                        key={slot.hour}
                        type="button"
                        onClick={() => setSelectedHour(slot.hour)}
                        className="flex-1 h-full min-w-[22px] flex flex-col items-center justify-end group cursor-pointer"
                        aria-label={`Inspect ${slot.timeLabel || slot.hour} occupancy`}
                      >
                        <div
                          className={`w-full rounded-t-md transition-all duration-300 ${getBarColor(
                            slot.status,
                            isSelected
                          )}`}
                          style={{ height: `${slot.density}%` }}
                        />
                        <span
                          className={`font-mono text-[10px] mt-2 pb-2 tabular-nums ${
                            isSelected ? 'text-[#D9381E] font-bold' : 'text-white/45 group-hover:text-white'
                          }`}
                        >
                          {String(slot.hour).padStart(2, '0')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4 Environmental Telemetry Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Thermometer, title: '21°C Climate', sub: 'Air-Conditioned' },
                { icon: ShieldCheck, title: 'Continuous', sub: 'Machine Sanitation' },
                { icon: Sparkles, title: 'Salon Stylists', sub: 'Private Wing Active' },
                { icon: Users, title: 'Floor Trainers', sub: 'Attentive Form Guard' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-2xl bg-black/35 border border-white/8"
                  >
                    <Icon className="w-4 h-4 text-[#C5A059] mb-2" />
                    <span className="block font-display text-xs sm:text-sm font-bold text-white">
                      {item.title}
                    </span>
                    <span className="block font-mono text-[10px] text-white/50">{item.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioLiveTelemetry;
