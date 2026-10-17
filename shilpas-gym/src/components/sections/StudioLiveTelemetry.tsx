import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Users, ShieldCheck, Thermometer, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface StudioLiveTelemetryProps {
  onOpenInquiry?: () => void;
}

interface HourData {
  hour: number;
  label: string;
  occupancy: number; // 0 to 100
  status: 'Quiet' | 'Optimal' | 'Energetic' | 'Peak';
}

const HOURLY_SCHEDULE: HourData[] = [
  { hour: 6, label: '06 AM', occupancy: 45, status: 'Optimal' },
  { hour: 7, label: '07 AM', occupancy: 78, status: 'Peak' },
  { hour: 8, label: '08 AM', occupancy: 84, status: 'Peak' },
  { hour: 9, label: '09 AM', occupancy: 65, status: 'Energetic' },
  { hour: 10, label: '10 AM', occupancy: 40, status: 'Optimal' },
  { hour: 11, label: '11 AM', occupancy: 22, status: 'Quiet' },
  { hour: 12, label: '12 PM', occupancy: 18, status: 'Quiet' },
  { hour: 13, label: '01 PM', occupancy: 15, status: 'Quiet' },
  { hour: 14, label: '02 PM', occupancy: 19, status: 'Quiet' },
  { hour: 15, label: '03 PM', occupancy: 25, status: 'Quiet' },
  { hour: 16, label: '04 PM', occupancy: 38, status: 'Optimal' },
  { hour: 17, label: '05 PM', occupancy: 62, status: 'Energetic' },
  { hour: 18, label: '06 PM', occupancy: 88, status: 'Peak' },
  { hour: 19, label: '07 PM', occupancy: 92, status: 'Peak' },
  { hour: 20, label: '08 PM', occupancy: 74, status: 'Energetic' },
  { hour: 21, label: '09 PM', occupancy: 42, status: 'Optimal' },
];

export const StudioLiveTelemetry: React.FC<StudioLiveTelemetryProps> = ({ onOpenInquiry }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<number>(() => new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const isOpen = currentHour >= 6 && currentHour < 22;

  // Determine current active capacity
  const currentData = useMemo(() => {
    const match = HOURLY_SCHEDULE.find((h) => h.hour === selectedHour);
    if (match) return match;
    return { hour: currentHour, label: 'Now', occupancy: isOpen ? 35 : 0, status: 'Quiet' as const };
  }, [selectedHour, currentHour, isOpen]);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-12 bg-[#161815] text-[#F5F2EA] overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6747]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#174D3B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold uppercase tracking-widest text-[#FF6747] mb-3">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Real-Time Studio Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              LIVE FLOOR CAPACITY & ATMOSPHERE
            </h2>
          </div>

          {/* Current Studio Status Pill */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3 px-5 rounded-full border border-white/15 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-[#22C55E] animate-ping' : 'bg-red-500'}`} />
              <div>
                <span className="block text-xs uppercase font-extrabold tracking-wider text-white">
                  {isOpen ? 'STUDIO OPEN NOW' : 'DOORS OPEN 06:00 AM'}
                </span>
                <span className="text-[11px] text-white/70 font-mono tabular-nums">
                  {formattedTime} IST · Khardaha, Kolkata
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Telemetry Dashboard in Double-Bezel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Current Capacity Gauge */}
          <div className="lg:col-span-4 p-2 bg-white/5 ring-1 ring-white/10 rounded-3xl shadow-xl">
            <div className="bg-[#1C1F1B] rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-8 flex flex-col justify-between h-full shadow-inner">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-extrabold text-white/70 tracking-wider">
                    Selected Window
                  </span>
                  <span className="text-xs font-mono font-extrabold text-[#FF6747] bg-[#FF6747]/10 px-2.5 py-1 rounded-full border border-[#FF6747]/20">
                    {currentData.label}
                  </span>
                </div>

                {/* Big Percentage Indicator */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl sm:text-7xl font-display font-black tracking-tight text-white tabular-nums">
                    {currentData.occupancy}%
                  </span>
                  <span className="text-xs uppercase font-extrabold text-white/60 tracking-wider">Floor Density</span>
                </div>

                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mb-4">
                  <div
                    style={{ width: `${currentData.occupancy}%` }}
                    className={`h-full transition-all duration-500 rounded-full ${
                      currentData.occupancy > 75
                        ? 'bg-gradient-to-r from-[#FF6747] to-[#DC2626]'
                        : currentData.occupancy > 40
                        ? 'bg-gradient-to-r from-[#8177FF] to-[#FF6747]'
                        : 'bg-gradient-to-r from-[#22C55E] to-[#174D3B]'
                    }`}
                  />
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/70">Atmosphere Rating:</span>
                    <span className="text-[#FF6747] font-extrabold uppercase tracking-wider">{currentData.status}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-normal">
                    {currentData.occupancy < 35
                      ? 'Serene environment. Zero wait time on squat racks, leg presses, and private salon appointments.'
                      : currentData.occupancy < 70
                      ? 'Balanced training flow. Ample space for supersets, personal training drills, and hair spas.'
                      : 'High energy community vibe. Spotters available, uptempo soundscape, floor coaches active.'}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenInquiry}
                  className="w-full justify-center shadow-lg shadow-[#FF6747]/20"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  RESERVE FLOOR PASS
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive 16-Hour Rush Curve Bar Chart */}
          <div className="lg:col-span-8 p-2 bg-white/5 ring-1 ring-white/10 rounded-3xl shadow-xl">
            <div className="bg-[#1C1F1B] rounded-[calc(1.5rem-0.25rem)] p-6 sm:p-8 flex flex-col justify-between h-full shadow-inner">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                    Typical Daily Occupancy Pattern
                  </h3>
                  <span className="text-xs text-white/60">
                    Click any hour column below to inspect traffic and atmospheric conditions.
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    <span className="text-white/70">Quiet (&lt;35%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8177FF]" />
                    <span className="text-white/70">Optimal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6747]" />
                    <span className="text-white/70">Peak (&gt;75%)</span>
                  </div>
                </div>
              </div>

              {/* Hourly Vertical Bars */}
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 sm:gap-2 items-end h-44 pt-6 px-1 border-b border-white/10 pb-2">
                {HOURLY_SCHEDULE.map((item) => {
                  const isCurrentNow = item.hour === currentHour;
                  const isSelected = item.hour === selectedHour;

                  return (
                    <button
                      key={item.hour}
                      onClick={() => setSelectedHour(item.hour)}
                      title={`${item.label}: ${item.occupancy}% Occupancy (${item.status})`}
                      className="group flex flex-col items-center h-full justify-end cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#FF6747]"
                    >
                      <div className="w-full relative flex items-end justify-center">
                        <div
                          style={{ height: `${item.occupancy * 1.3}px` }}
                          className={`w-full max-w-[24px] rounded-t-sm transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#FF6747] shadow-[0_0_12px_#FF6747]'
                              : isCurrentNow
                              ? 'bg-white shadow-[0_0_8px_white]'
                              : item.occupancy > 75
                              ? 'bg-[#FF6747]/80 group-hover:bg-[#FF6747]'
                              : item.occupancy > 40
                              ? 'bg-[#8177FF]/80 group-hover:bg-[#8177FF]'
                              : 'bg-[#22C55E]/70 group-hover:bg-[#22C55E]'
                          }`}
                        />
                      </div>
                      <span className={`text-[10px] mt-2 font-mono tabular-nums leading-none ${
                        isSelected ? 'font-bold text-[#FF6747]' : isCurrentNow ? 'font-bold text-white' : 'text-white/50'
                      }`}>
                        {item.hour.toString().padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Studio Hygiene & Environment Diagnostics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2.5">
                <Thermometer className="w-4 h-4 text-[#8177FF] flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-white">21°C Climate</span>
                  <span className="text-[10px] text-white/60">Air-Conditioned</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-white">Continuous</span>
                  <span className="text-[10px] text-white/60">Machine Sanitization</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#FF6747] flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-white">Salon Stylists</span>
                  <span className="text-[10px] text-white/60">On-Floor Active</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#DDE8F8] flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-white">Floor Trainers</span>
                  <span className="text-[10px] text-white/60">Attentive Form Guard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
