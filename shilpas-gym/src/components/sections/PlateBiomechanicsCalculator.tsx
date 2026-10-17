import React, { useState, useMemo } from 'react';
import { Dumbbell, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';

export interface PlateBiomechanicsCalculatorProps {
  onOpenInquiry?: (plan?: string) => void;
}

interface PlateConfig {
  weight: number;
  color: string;
  borderColor: string;
  textColor: string;
  width: number;
  height: number;
  label: string;
}

const OLYMPIC_PLATES: PlateConfig[] = [
  { weight: 25, color: '#DC2626', borderColor: '#B91C1C', textColor: '#FFFFFF', width: 22, height: 160, label: '25kg' },
  { weight: 20, color: '#2563EB', borderColor: '#1D4ED8', textColor: '#FFFFFF', width: 20, height: 160, label: '20kg' },
  { weight: 15, color: '#EAB308', borderColor: '#CA8A04', textColor: '#20231F', width: 17, height: 140, label: '15kg' },
  { weight: 10, color: '#16A34A', borderColor: '#15803D', textColor: '#FFFFFF', width: 14, height: 120, label: '10kg' },
  { weight: 5, color: '#F8FAFC', borderColor: '#CBD5E1', textColor: '#20231F', width: 11, height: 95, label: '5kg' },
  { weight: 2.5, color: '#1E293B', borderColor: '#0F172A', textColor: '#FFFFFF', width: 9, height: 75, label: '2.5kg' },
  { weight: 1.25, color: '#94A3B8', borderColor: '#64748B', textColor: '#20231F', width: 7, height: 60, label: '1.25kg' },
];

export const PlateBiomechanicsCalculator: React.FC<PlateBiomechanicsCalculatorProps> = ({
  onOpenInquiry,
}) => {
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [barWeight, setBarWeight] = useState<number>(20); // 20kg standard Olympic bar
  const [reps, setReps] = useState<number>(5);
  const [exercise, setExercise] = useState<string>('Bench Press');

  // Calculate plates required per side
  const plateBreakdown = useMemo(() => {
    let weightPerSide = Math.max(0, (targetWeight - barWeight) / 2);
    const platesUsed: { plate: PlateConfig; count: number }[] = [];

    for (const plate of OLYMPIC_PLATES) {
      if (weightPerSide >= plate.weight) {
        const count = Math.floor(weightPerSide / plate.weight);
        platesUsed.push({ plate, count });
        weightPerSide -= count * plate.weight;
      }
    }

    return platesUsed;
  }, [targetWeight, barWeight]);

  // Flattened plates list for rendering left/right sleeve
  const renderedPlates = useMemo(() => {
    const list: PlateConfig[] = [];
    plateBreakdown.forEach(({ plate, count }) => {
      for (let i = 0; i < count; i++) {
        list.push(plate);
      }
    });
    return list;
  }, [plateBreakdown]);

  // 1-Rep Max calculation using Epley Formula
  const estimated1RM = useMemo(() => {
    if (reps === 1) return targetWeight;
    return Math.round(targetWeight * (1 + reps / 30));
  }, [targetWeight, reps]);

  // Target training percentages
  const trainingZones = useMemo(() => {
    return [
      { label: 'Max Strength (90%)', weight: Math.round(estimated1RM * 0.9), reps: '1-3 Reps' },
      { label: 'Power & Density (80%)', weight: Math.round(estimated1RM * 0.8), reps: '4-6 Reps' },
      { label: 'Hypertrophy Volume (70%)', weight: Math.round(estimated1RM * 0.7), reps: '8-12 Reps' },
      { label: 'Metabolic Endurance (60%)', weight: Math.round(estimated1RM * 0.6), reps: '15+ Reps' },
    ];
  }, [estimated1RM]);

  return (
    <section id="biomechanics-lab" className="relative w-full py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#EDE9DF]/60">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Interactive Biomechanics Studio"
          title="CALIBRATED BARBELL & 1RM LAB"
          description="Test your lifting numbers on our digital Olympic barbell. Visual plate loading math, 1-Rep Max projections, and hypertrophy percentages tuned for Shilpa's Gym imported competition bars."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls in Double-Bezel Card */}
          <div className="lg:col-span-5 p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl shadow-md">
            <div className="bg-white p-6 sm:p-8 rounded-[calc(1.5rem-0.25rem)] shadow-xs space-y-6">
              {/* Exercise Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F]/70 mb-2.5">
                  Select Compound Lift
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Bench Press', 'Back Squat', 'Deadlift', 'Military Press'].map((item) => {
                    const isSelected = exercise === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setExercise(item)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border-2 active:scale-95 ${
                          isSelected
                            ? 'bg-[#20231F] text-white border-[#20231F] shadow-sm'
                            : 'bg-[#FAF8F4] text-[#20231F] border-[#20231F]/10 hover:border-[#FF6747]/60 hover:bg-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Weight Slider & Number Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#20231F]/70">
                    Target Lift Weight
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tabular-nums text-[#FF6747] font-display">
                      {targetWeight} kg
                    </span>
                    <span className="text-xs text-[#20231F]/60 font-semibold tabular-nums">
                      ({Math.round(targetWeight * 2.20462)} lbs)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="260"
                  step="2.5"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#EDE9DF] rounded-lg appearance-none cursor-pointer accent-[#FF6747]"
                />

                {/* Quick Increments and Presets */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#20231F]/5">
                  {/* Step Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTargetWeight((prev) => Math.max(20, prev - 5))}
                      className="px-2.5 py-1 rounded-full text-xs font-extrabold border-2 border-[#20231F]/15 hover:border-[#20231F] bg-white text-[#20231F] active:scale-95 transition-all cursor-pointer shadow-xs"
                      title="Decrease by 5kg"
                    >
                      -5kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetWeight((prev) => Math.min(260, prev + 5))}
                      className="px-2.5 py-1 rounded-full text-xs font-extrabold border-2 border-[#20231F]/15 hover:border-[#20231F] bg-white text-[#20231F] active:scale-95 transition-all cursor-pointer shadow-xs"
                      title="Increase by 5kg"
                    >
                      +5kg
                    </button>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[60, 100, 140, 180, 220].map((wt) => (
                      <button
                        key={wt}
                        type="button"
                        onClick={() => setTargetWeight(wt)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer border active:scale-95 ${
                          targetWeight === wt
                            ? 'bg-[#FF6747] text-[#20231F] border-[#FF6747] font-extrabold shadow-xs'
                            : 'bg-white text-[#20231F]/80 border-[#20231F]/15 hover:border-[#FF6747]/60'
                        }`}
                      >
                        {wt}kg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barbell Weight Spec */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF8F4] rounded-2xl border-2 border-[#20231F]/5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#20231F]/80">Barbell Type</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setBarWeight(20)}
                    className={`px-3 py-1 text-xs font-extrabold rounded-full cursor-pointer transition-all border active:scale-95 ${
                      barWeight === 20
                        ? 'bg-[#20231F] text-white border-[#20231F] shadow-xs'
                        : 'bg-white text-[#20231F]/70 border-[#20231F]/15 hover:border-[#20231F]'
                    }`}
                  >
                    20kg Olympic
                  </button>
                  <button
                    type="button"
                    onClick={() => setBarWeight(15)}
                    className={`px-3 py-1 text-xs font-extrabold rounded-full cursor-pointer transition-all border active:scale-95 ${
                      barWeight === 15
                        ? 'bg-[#20231F] text-white border-[#20231F] shadow-xs'
                        : 'bg-white text-[#20231F]/70 border-[#20231F]/15 hover:border-[#20231F]'
                    }`}
                  >
                    15kg Olympic
                  </button>
                </div>
              </div>

              {/* Reps for 1RM Calculation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#20231F]/70">
                    Reps Completed
                  </label>
                  <span className="text-xs font-extrabold text-[#174D3B] uppercase tracking-wider">{reps} {reps === 1 ? 'Rep' : 'Reps'}</span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReps(r)}
                      className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer border active:scale-95 ${
                        reps === r
                          ? 'bg-[#174D3B] text-white border-[#174D3B] shadow-xs'
                          : 'bg-[#FAF8F4] text-[#20231F]/80 border-[#20231F]/10 hover:border-[#174D3B]/40 hover:bg-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onOpenInquiry?.(`Form Assessment for ${exercise} (${targetWeight}kg)`)}
                  className="w-full justify-center shadow-lg shadow-[#FF6747]/20"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  BOOK 1-ON-1 FORM CLINIC
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Olympic Barbell & Training Metrics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Barbell Rack Graphic */}
            <div className="bg-[#141613] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#FF6747]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F5F2EA]/90">
                    Olympic Sleeve Visualization (Per Side)
                  </span>
                </div>
                <span className="text-xs font-mono text-[#DDE8F8]/80 bg-white/10 px-2.5 py-1 rounded-md">
                  Per Side: {((targetWeight - barWeight) / 2).toFixed(1)} kg
                </span>
              </div>

              {/* Barbell Sleeve Graphic Canvas */}
              <div className="relative w-full h-44 bg-[#0D0F0D] rounded-xl border border-white/10 flex items-center justify-center px-4 overflow-x-auto">
                {/* Horizontal Barbell Shaft */}
                <div className="relative w-full max-w-lg flex items-center">
                  {/* Left Collar Stop */}
                  <div className="w-4 h-14 bg-gradient-to-r from-[#555] to-[#777] rounded-l-xs flex-shrink-0" />
                  <div className="w-3 h-20 bg-gradient-to-r from-[#999] to-[#bbb] flex-shrink-0 shadow-md" />

                  {/* Sleeve Plate Loading Area */}
                  <div className="h-7 flex-1 bg-gradient-to-b from-[#ccc] via-[#eee] to-[#888] flex items-center px-1 gap-1 relative min-w-[280px]">
                    {renderedPlates.length === 0 ? (
                      <span className="text-xs text-white/40 italic mx-auto">Empty Barbell ({barWeight}kg)</span>
                    ) : (
                      renderedPlates.map((plate, idx) => (
                        <div
                          key={idx}
                          title={`${plate.label} Plate`}
                          style={{
                            width: `${plate.width}px`,
                            height: `${plate.height}px`,
                            backgroundColor: plate.color,
                            borderColor: plate.borderColor,
                            color: plate.textColor,
                          }}
                          className="rounded-xs border flex items-center justify-center text-[10px] font-black font-mono shadow-lg flex-shrink-0 transition-all duration-300 hover:scale-105"
                        >
                          <span className="-rotate-90 select-none tracking-tighter">{plate.label}</span>
                        </div>
                      ))
                    )}

                    {/* Barbell Collar Lock */}
                    {renderedPlates.length > 0 && (
                      <div
                        title="Quick-Release Olympic Collar"
                        className="w-3 h-10 bg-gradient-to-r from-[#222] to-[#444] border border-[#FF6747] rounded-xs flex-shrink-0 ml-1 shadow-md"
                      />
                    )}
                  </div>

                  {/* Sleeve Tip */}
                  <div className="w-5 h-7 bg-gradient-to-r from-[#999] to-[#666] rounded-r-xs flex-shrink-0" />
                </div>
              </div>

              {/* Plate Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
                {plateBreakdown.map(({ plate, count }) => (
                  <div key={plate.label} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    <span
                      style={{ backgroundColor: plate.color }}
                      className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20"
                    />
                    <span className="font-bold text-white">{count}× {plate.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1RM Projection & Target Hypertrophy Zones */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#20231F]/10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#174D3B]" />
                  <h4 className="font-display font-extrabold text-base text-[#20231F] uppercase tracking-tight">
                    Estimated 1-Rep Max Projection:
                  </h4>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-display text-[#174D3B] tabular-nums">
                    {estimated1RM}
                  </span>
                  <span className="text-sm font-bold text-[#174D3B]">kg 1RM</span>
                </div>
              </div>

              {/* 4 Training Zones */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trainingZones.map((zone) => (
                  <div key={zone.label} className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#20231F]/5">
                    <span className="block text-[11px] font-semibold text-[#20231F]/70 mb-1">
                      {zone.label}
                    </span>
                    <span className="text-xl font-extrabold text-[#20231F] tabular-nums font-display block">
                      {zone.weight} kg
                    </span>
                    <span className="text-[11px] font-bold text-[#FF6747]">
                      {zone.reps}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-[#20231F]/70 bg-[#EDE9DF]/50 p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#174D3B] flex-shrink-0" />
                <span>All barbells at Shilpa's Gym are certified 28mm competition-spec steel with dual knurl marks and needle bearings.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
