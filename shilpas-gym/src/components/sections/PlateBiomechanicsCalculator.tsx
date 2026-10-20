import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Gauge, Dumbbell, Flame, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PlateBiomechanicsCalculatorProps {
  onOpenInquiry: (plan?: string) => void;
}

type LiftType = 'Bench Press' | 'Back Squat' | 'Deadlift' | 'Military Press';

interface PlateSpec {
  weight: number;
  label: string;
  color: string;
  textColor: string;
  heightClass: string;
  widthClass: string;
}

const IWF_PLATES: PlateSpec[] = [
  { weight: 25, label: '25kg', color: '#E03B24', textColor: '#FFFFFF', heightClass: 'h-36 sm:h-44', widthClass: 'w-5 sm:w-6' },
  { weight: 20, label: '20kg', color: '#2563EB', textColor: '#FFFFFF', heightClass: 'h-36 sm:h-44', widthClass: 'w-4 sm:w-5' },
  { weight: 15, label: '15kg', color: '#EAB308', textColor: '#0D0D0E', heightClass: 'h-32 sm:h-38', widthClass: 'w-4 sm:w-5' },
  { weight: 10, label: '10kg', color: '#16A34A', textColor: '#FFFFFF', heightClass: 'h-28 sm:h-34', widthClass: 'w-3.5 sm:w-4' },
  { weight: 5, label: '5kg', color: '#F5F2EA', textColor: '#0D0D0E', heightClass: 'h-24 sm:h-28', widthClass: 'w-3 sm:w-3.5' },
  { weight: 2.5, label: '2.5kg', color: '#0D0D0E', textColor: '#F5F2EA', heightClass: 'h-20 sm:h-24', widthClass: 'w-2.5 sm:w-3' },
  { weight: 1.25, label: '1.25kg', color: '#9CA3AF', textColor: '#0D0D0E', heightClass: 'h-16 sm:h-20', widthClass: 'w-2 sm:w-2.5' },
];

const LIFT_DEFAULTS: Record<LiftType, { defaultWeight: number; velocityBase: number; cnsTag: string }> = {
  'Bench Press': { defaultWeight: 100, velocityBase: 0.48, cnsTag: 'UPPER ANTERIOR DRIVE' },
  'Back Squat': { defaultWeight: 135, velocityBase: 0.54, cnsTag: 'POSTERIOR & QUAD CHAIN' },
  'Deadlift': { defaultWeight: 160, velocityBase: 0.42, cnsTag: 'MAXIMAL AXIAL PULL' },
  'Military Press': { defaultWeight: 65, velocityBase: 0.52, cnsTag: 'OVERHEAD STABILIZATION' },
};

const REP_OPTIONS = [1, 2, 3, 5, 8, 10, 12];
const QUICK_WEIGHTS = [60, 100, 140, 180, 220];

export const PlateBiomechanicsCalculator: React.FC<PlateBiomechanicsCalculatorProps> = ({
  onOpenInquiry,
}) => {
  const [selectedLift, setSelectedLift] = useState<LiftType>('Deadlift');
  const [targetWeight, setTargetWeight] = useState<number>(140);
  const [barWeight, setBarWeight] = useState<20 | 15>(20);
  const [reps, setReps] = useState<number>(5);
  const [hoveredZoneIndex, setHoveredZoneIndex] = useState<number | null>(null);

  // Calculate per-side plate breakdown
  const plateLoadout = useMemo(() => {
    const remainingTotal = Math.max(0, targetWeight - barWeight);
    let perSide = remainingTotal / 2;
    const loaded: { spec: PlateSpec; count: number }[] = [];

    for (const plate of IWF_PLATES) {
      const count = Math.floor((perSide + 0.001) / plate.weight);
      if (count > 0) {
        loaded.push({ spec: plate, count });
        perSide -= count * plate.weight;
      }
    }

    const flatPlates: PlateSpec[] = [];
    loaded.forEach(({ spec, count }) => {
      for (let i = 0; i < count; i++) {
        flatPlates.push(spec);
      }
    });

    return {
      perSideKg: Math.max(0, (targetWeight - barWeight) / 2),
      summary: loaded,
      flatPlates: flatPlates.slice(0, 9), // keep visual sleeve clean
    };
  }, [targetWeight, barWeight]);

  // Epley 1RM formula
  const estimated1RM = useMemo(() => {
    if (reps === 1) return targetWeight;
    return Math.round(targetWeight * (1 + reps / 30));
  }, [targetWeight, reps]);

  const trainingZones = useMemo(
    () => [
      {
        code: '01',
        title: 'Max Strength (90%)',
        pct: 90,
        weight: Math.round(estimated1RM * 0.9),
        repsLabel: '1–3 Reps',
        velocity: '0.28 m/s',
        rpmEquivalent: 7400,
      },
      {
        code: '02',
        title: 'Power & Density (80%)',
        pct: 80,
        weight: Math.round(estimated1RM * 0.8),
        repsLabel: '4–6 Reps',
        velocity: '0.45 m/s',
        rpmEquivalent: 6200,
      },
      {
        code: '03',
        title: 'Hypertrophy Volume (70%)',
        pct: 70,
        weight: Math.round(estimated1RM * 0.7),
        repsLabel: '8–12 Reps',
        velocity: '0.62 m/s',
        rpmEquivalent: 5100,
      },
      {
        code: '04',
        title: 'Metabolic Endurance (60%)',
        pct: 60,
        weight: Math.round(estimated1RM * 0.6),
        repsLabel: '12–15 Reps',
        velocity: '0.78 m/s',
        rpmEquivalent: 4100,
      },
    ],
    [estimated1RM]
  );

  // Active readout for Valmora Analog Gauge
  const activeZone = hoveredZoneIndex !== null ? trainingZones[hoveredZoneIndex] : null;
  const displayedKg = activeZone ? activeZone.weight : estimated1RM;
  const displayedSubLabel = activeZone
    ? `${activeZone.title.toUpperCase()} · ${activeZone.repsLabel}`
    : `${selectedLift.toUpperCase()} · PROJECTED 1RM`;

  // Normalize gauge progress (from 40kg to 280kg)
  const gaugeRatio = Math.max(0.05, Math.min(1, (displayedKg - 40) / 240));
  // Needle sweeps from -125 deg to +125 deg (250 deg total sweep)
  const needleAngleDeg = -125 + gaugeRatio * 250;
  const activeShiftLeds = Math.min(5, Math.max(1, Math.ceil(gaugeRatio * 5)));

  const handleSelectLift = (lift: LiftType) => {
    setSelectedLift(lift);
    setTargetWeight(LIFT_DEFAULTS[lift].defaultWeight);
  };

  const adjustWeight = (delta: number) => {
    setTargetWeight((prev) => Math.max(20, Math.min(260, prev + delta)));
  };

  return (
    <section
      id="biomechanics-lab"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#F5F2EA] text-[#0D0D0E] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#141311] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D9381E]" />
              <span>ACT IV // INTERACTIVE BIOMECHANICS STUDIO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-[-0.03em] text-[#0D0D0E] leading-[0.96]">
              CALIBRATED BARBELL &{' '}
              <span className="font-serif italic font-normal capitalize tracking-normal text-[#D9381E]">
                1RM Telemetry.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#4C514A] leading-relaxed">
              Test your lifting numbers on our digital Olympic barbell. Visual IWF plate-loading math,
              analog force telemetry, and hypertrophy zones tuned for Shilpa&apos;s Gym competition bars.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end px-4 py-2 rounded-full bg-[#0D0D0E] text-[#F5F2EA] font-mono text-xs uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5 text-[#D9381E]" />
            <span>{LIFT_DEFAULTS[selectedLift].cnsTag}</span>
          </div>
        </div>

        {/* Main 12-Column Telemetry Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT 5 COLUMNS: Tactile Parameter Controls in Double-Bezel Card */}
          <div className="lg:col-span-5 p-2 sm:p-2.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2.5rem] shadow-xl">
            <div className="bg-white p-6 sm:p-8 rounded-[calc(2.5rem-0.625rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between space-y-7 h-full">
              {/* 1. Compound Lift Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/60">
                    01 · SELECT COMPOUND LIFT
                  </span>
                  <span className="font-mono text-[11px] text-[#D9381E] font-bold">
                    IWF STANDARD
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Bench Press', 'Back Squat', 'Deadlift', 'Military Press'] as LiftType[]).map(
                    (lift) => {
                      const isSelected = selectedLift === lift;
                      return (
                        <button
                          key={lift}
                          type="button"
                          onClick={() => handleSelectLift(lift)}
                          className={`px-3 py-3 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-md'
                              : 'bg-[#F5F2EA] text-[#0D0D0E]/80 hover:bg-[#0D0D0E]/10'
                          }`}
                        >
                          {lift}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* 2. Target Lift Weight Slider & Fine Steppers */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/60">
                    02 · TARGET LIFT WEIGHT
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#D9381E] tabular-nums">
                      {targetWeight} kg
                    </span>
                    <span className="font-mono text-xs text-[#0D0D0E]/50 tabular-nums">
                      ({Math.round(targetWeight * 2.20462)} lbs)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={20}
                  max={260}
                  step={2.5}
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full h-2 bg-[#E8E3D5] rounded-lg appearance-none cursor-pointer accent-[#D9381E] mb-4"
                  aria-label="Target Lift Weight in Kilograms"
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => adjustWeight(-5)}
                      className="px-3 py-1.5 min-h-[38px] rounded-lg border border-[#0D0D0E]/20 font-mono text-xs font-bold text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-white transition-colors cursor-pointer active:scale-95"
                    >
                      -5kg
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustWeight(5)}
                      className="px-3 py-1.5 min-h-[38px] rounded-lg border border-[#0D0D0E]/20 font-mono text-xs font-bold text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-white transition-colors cursor-pointer active:scale-95"
                    >
                      +5kg
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1">
                    {QUICK_WEIGHTS.map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setTargetWeight(w)}
                        className={`px-2.5 py-1.5 min-h-[38px] rounded-lg font-mono text-[11px] font-bold transition-all cursor-pointer active:scale-95 ${
                          targetWeight === w
                            ? 'bg-[#D9381E] text-white'
                            : 'bg-[#F5F2EA] text-[#0D0D0E]/70 hover:bg-[#0D0D0E]/10'
                        }`}
                      >
                        {w}kg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Barbell Type */}
              <div className="flex items-center justify-between pt-2 border-t border-[#0D0D0E]/10">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/60">
                  03 · BARBELL SHAFT
                </span>
                <div className="flex items-center gap-2">
                  {([20, 15] as const).map((bw) => (
                    <button
                      key={bw}
                      type="button"
                      onClick={() => setBarWeight(bw)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                        barWeight === bw
                          ? 'bg-[#0D0D0E] text-white shadow-xs'
                          : 'bg-[#F5F2EA] text-[#0D0D0E]/70 hover:bg-[#0D0D0E]/10'
                      }`}
                    >
                      {bw}kg Olympic
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Reps Completed */}
              <div className="pt-2 border-t border-[#0D0D0E]/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/60">
                    04 · REPS COMPLETED
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0D0D0E]">
                    {reps} {reps === 1 ? 'REP (MAX)' : 'REPS'}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {REP_OPTIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReps(r)}
                      className={`py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                        reps === r
                          ? 'bg-[#141311] text-white shadow-sm'
                          : 'bg-[#F5F2EA] text-[#0D0D0E]/75 hover:bg-[#0D0D0E]/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    onOpenInquiry(
                      `1-on-1 Form Clinic (${selectedLift} · Target ${targetWeight}kg / 1RM ${estimated1RM}kg)`
                    )
                  }
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="w-full justify-center shadow-lg shadow-[#D9381E]/20"
                >
                  BOOK 1-ON-1 FORM CLINIC
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLUMNS: Valmora Dark Telemetry Console in Double-Bezel Tray */}
          <div className="lg:col-span-7 p-2 sm:p-2.5 bg-[#0D0D0E]/5 ring-1 ring-[#0D0D0E]/10 rounded-[2.5rem] shadow-2xl">
            <div className="bg-[#141614] text-[#F5F2EA] p-6 sm:p-10 rounded-[calc(2.5rem-0.625rem)] shadow-inner flex flex-col justify-between space-y-8 h-full">
              {/* Top Row: Valmora Analog Tachometer + interactive Spec Table */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left 5 Cols: Valmora Circular SVG Analog Tachometer */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  {/* 5 Top Shift LEDs (Valmora 00:18 Motif) */}
                  <div className="flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10">
                    {[1, 2, 3, 4, 5].map((led) => {
                      const active = led <= activeShiftLeds;
                      const ledColor =
                        led <= 2
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                          : led <= 4
                          ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                          : 'bg-[#D9381E] shadow-[0_0_10px_#D9381E]';
                      return (
                        <span
                          key={led}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            active ? ledColor : 'bg-white/15'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Circular SVG Tachometer */}
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                    <svg viewBox="0 0 240 240" className="w-full h-full">
                      {/* Outer Bezel Ring */}
                      <circle
                        cx="120"
                        cy="120"
                        r="108"
                        fill="none"
                        stroke="rgba(245,242,234,0.12)"
                        strokeWidth="1.5"
                      />
                      {/* Redline Warning Arc */}
                      <circle
                        cx="120"
                        cy="120"
                        r="96"
                        fill="none"
                        stroke="#D9381E"
                        strokeWidth="3"
                        strokeDasharray="110 600"
                        strokeDashoffset="-185"
                        strokeLinecap="round"
                        opacity="0.7"
                      />

                      {/* Radial Tick Marks around the dial */}
                      {Array.from({ length: 29 }, (_, idx) => {
                        const angle = -125 + (idx / 28) * 250;
                        const isMajor = idx % 4 === 0;
                        const rad = ((angle - 90) * Math.PI) / 180;
                        const rOuter = 94;
                        const rInner = isMajor ? 82 : 88;
                        const x1 = 120 + rOuter * Math.cos(rad);
                        const y1 = 120 + rOuter * Math.sin(rad);
                        const x2 = 120 + rInner * Math.cos(rad);
                        const y2 = 120 + rInner * Math.sin(rad);

                        return (
                          <line
                            key={idx}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={idx >= 22 ? '#D9381E' : 'rgba(245,242,234,0.45)'}
                            strokeWidth={isMajor ? '2' : '1'}
                          />
                        );
                      })}

                      {/* Sweeping Analog Needle */}
                      <g
                        transform={`rotate(${needleAngleDeg} 120 120)`}
                        className="transition-transform duration-500 ease-out"
                      >
                        <line
                          x1="120"
                          y1="132"
                          x2="120"
                          y2="34"
                          stroke="#D9381E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="120" cy="120" r="6" fill="#D9381E" />
                        <circle cx="120" cy="120" r="2.5" fill="#141614" />
                      </g>
                    </svg>

                    {/* Center Digital Telemetry Readout */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-9 text-center">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif italic text-5xl sm:text-6xl text-white tabular-nums leading-none">
                          {displayedKg}
                        </span>
                        <span className="font-mono text-xs text-[#D9381E] uppercase font-bold">
                          kg
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 mt-1 px-4">
                        {displayedSubLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: Valmora Interactive Specification Rows (Hover to rev gauge) */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D9381E]">
                      BIOMECHANICAL OUTPUT ZONES
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      HOVER ROW TO TEST DIAL
                    </span>
                  </div>

                  <div className="divide-y divide-white/10">
                    {trainingZones.map((zone, idx) => {
                      const isHovered = hoveredZoneIndex === idx;
                      return (
                        <div
                          key={zone.code}
                          onClick={() => setHoveredZoneIndex((prev) => (prev === idx ? null : idx))}
                          onMouseEnter={() => setHoveredZoneIndex(idx)}
                          onMouseLeave={() => setHoveredZoneIndex(null)}
                          className={`py-3 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                            isHovered ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-[#D9381E] font-bold">
                              {zone.code}
                            </span>
                            <div>
                              <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                                {zone.title}
                              </span>
                              <span className="font-mono text-[10px] text-white/45">
                                Target Cadence: {zone.repsLabel} · {zone.velocity}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-serif italic text-2xl sm:text-3xl text-white tabular-nums">
                              {zone.weight}
                            </span>
                            <span className="font-mono text-xs text-[#D9381E] ml-1">kg</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Visual Olympic Sleeve Plate Loader */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <span className="text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <Dumbbell className="w-3.5 h-3.5 text-[#D9381E]" />
                    OLYMPIC SLEEVE VISUALIZATION (PER SIDE)
                  </span>
                  <span className="text-[#D9381E] font-bold tabular-nums">
                    Per Side: {plateLoadout.perSideKg.toFixed(1)} kg
                  </span>
                </div>

                {/* Graphic Barbell Sleeve & Plates */}
                <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-[#0B0C0B] border border-white/10 flex items-center justify-start sm:justify-center overflow-x-auto px-3 sm:px-6 no-scrollbar">
                  {/* Knurled Shaft & Sleeve */}
                  <div className="relative w-full max-w-xl flex items-center shrink-0">
                    {/* Left Inner Shaft */}
                    <div className="w-12 sm:w-28 h-4 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-500 rounded-l-sm shrink-0" />
                    {/* Sleeve Collar Stop */}
                    <div className="w-4 h-10 bg-zinc-300 border-x border-black/40 shrink-0" />

                    {/* Loaded IWF Plates */}
                    <div className="flex items-center gap-1 pl-1 z-10">
                      {plateLoadout.flatPlates.length === 0 ? (
                        <span className="font-mono text-xs text-white/40 pl-4">
                          UNLOADED OLYMPIC BAR ({barWeight}KG)
                        </span>
                      ) : (
                        plateLoadout.flatPlates.map((plate, i) => (
                          <div
                            key={i}
                            style={{ backgroundColor: plate.color, color: plate.textColor }}
                            className={`${plate.heightClass} ${plate.widthClass} rounded-sm shadow-lg flex items-center justify-center border border-black/25 transition-all duration-200`}
                            title={plate.label}
                          >
                            <span className="font-mono text-[8px] font-bold -rotate-90 whitespace-nowrap select-none">
                              {plate.weight}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Outer Olympic Sleeve Remainder */}
                    <div className="flex-1 h-6 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-r-sm -ml-1" />
                  </div>

                  {/* Bottom Plate Count Pills */}
                  <div className="absolute bottom-3 inset-x-4 flex flex-wrap items-center justify-center gap-2">
                    {plateLoadout.summary.map(({ spec, count }) => (
                      <span
                        key={spec.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/10 font-mono text-[11px] text-white"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: spec.color }}
                        />
                        <span>
                          {count}x {spec.label}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-white/45">
                  <span className="inline-flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#D9381E]" />
                    All barbells at Shilpa&apos;s Gym are certified 28mm competition-spec steel with dual knurl marks.
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#E6DEC8]">
                    <Zap className="w-3 h-3 text-[#D9381E]" />
                    Epley 1RM Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlateBiomechanicsCalculator;
