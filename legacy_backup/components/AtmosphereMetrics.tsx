import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { Clock, Dumbbell, Activity, Wind, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AtmosphereMetrics: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAtmosphereAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#09090C] border-b border-white/10 overflow-hidden">
      {/* Warm Ambient Spotlight Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <Container>
        <SectionHeader
          index="00"
          tag="ENVIRONMENTAL SPECIFICATION"
          title="ATMOSPHERE & VIBE."
          accentTitle="MEASURED SENSES."
          description="A calibrated sensory environment. Acoustic dampening, circadian amber lighting, competition-spec iron, and clinical airflow are engineered to keep psychological fatigue low and neuromuscular output high."
        />

        {/* 4-Card Primary Environmental Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Peak Hours & Density */}
          <div className="bg-[#121217] border border-white/10 p-6 rounded-sm flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <Badge variant="live" size="sm">
                  CONTROLLED
                </Badge>
              </div>

              <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
                FLOOR DENSITY WINDOWS
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                Operational Peaks
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-white/60">MORNING PEAK:</span>
                  <span className="text-white font-bold">06:00 — 09:00</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-white/60">MIDDAY CALM:</span>
                  <span className="text-amber-400 font-bold">11:00 — 16:00</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-white/60">EVENING PEAK:</span>
                  <span className="text-white font-bold">17:30 — 20:30</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[10px] text-white/40 mt-4 pt-3 border-t border-white/5">
              Maximum 28 athletes per training block to prevent wait times.
            </p>
          </div>

          {/* Card 2: Calibrated Equipment Roster */}
          <div className="bg-[#121217] border border-white/10 p-6 rounded-sm flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <Badge variant="mono" size="sm">
                  CALIBRATED
                </Badge>
              </div>

              <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
                HARDWARE SPEC
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                Equipment Roster
              </h3>

              <ul className="space-y-2 font-mono text-xs text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Eleiko IWF Competition Barbells</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Rogue Monster RM-6 Power Racks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Concept2 RowErg & SkiErg Array</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>Assault AirRunner Pro Curved Slats</span>
                </li>
              </ul>
            </div>

            <p className="font-mono text-[10px] text-white/40 mt-4 pt-3 border-t border-white/5">
              100% competition tolerances with volcano knurl profiles.
            </p>
          </div>

          {/* Card 3: Decibel & Sonic Vibe */}
          <div className="bg-[#121217] border border-white/10 p-6 rounded-sm flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <Badge variant="amber" size="sm">
                  82–85 dB
                </Badge>
              </div>

              <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
                ACOUSTIC ENERGY
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                Decibel / Sonic Vibe
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">SOUND PROFILE:</span>
                  <span className="text-white font-medium">Industrial & Dark Tech</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">SUB-BASS DAMPING:</span>
                  <span className="text-amber-400 font-medium">Acoustic Tile Array</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">BPM RANGE:</span>
                  <span className="text-white font-bold">128 — 145 BPM</span>
                </div>
              </div>
            </div>

            {/* Equalizer Visualizer Bars */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/40">LIVE FREQUENCY</span>
              <div className="flex items-end gap-1 h-4">
                <span className="w-1 bg-amber-500 animate-pulse h-2.5"></span>
                <span className="w-1 bg-amber-400 animate-pulse h-4" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 bg-amber-500 animate-pulse h-1.5" style={{ animationDelay: '300ms' }}></span>
                <span className="w-1 bg-amber-400 animate-pulse h-3.5" style={{ animationDelay: '75ms' }}></span>
                <span className="w-1 bg-amber-500 animate-pulse h-2" style={{ animationDelay: '220ms' }}></span>
              </div>
            </div>
          </div>

          {/* Card 4: Environmental Climate & Air */}
          <div className="bg-[#121217] border border-white/10 p-6 rounded-sm flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-white/10 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                  <Wind className="w-5 h-5" />
                </div>
                <Badge variant="mono" size="sm">
                  18°C CLIMATE
                </Badge>
              </div>

              <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest block mb-1">
                PHYSIOLOGICAL SUPPORT
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                Positive Pressure Air
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">FILTRATION:</span>
                  <span className="text-white font-medium">Medical HEPA H13</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">TEMP SETPOINT:</span>
                  <span className="text-amber-400 font-bold">18°C (64°F)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/60">HUMIDITY:</span>
                  <span className="text-white font-medium">42% Constant</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[10px] text-white/40 mt-4 pt-3 border-t border-white/5">
              Prevents oxygen depletion during anaerobic max exertion.
            </p>
          </div>
        </div>

        {/* Ambient Soundscape Bar (Inspired by the Cafe Reference Video) */}
        <div className="p-5 sm:p-6 bg-[#0E0E13] border border-amber-500/20 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest">
                  ATHLETIC SOUNDSCAPE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              </div>
              <h4 className="font-display text-base font-bold text-white uppercase tracking-tight">
                Nocturnal Focus & Raw Frequency Stream
              </h4>
              <p className="font-mono text-xs text-white/50">
                Curated high-cadence electronic rhythms designed for adrenaline synchronization.
              </p>
            </div>
          </div>

          <button
            onClick={toggleAtmosphereAudio}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-[#16161D] hover:bg-amber-500 text-white hover:text-black font-mono text-xs uppercase tracking-wider font-bold transition-all border border-white/10 hover:border-amber-500 cursor-pointer shrink-0"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>PAUSE VIBE</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>SAMPLE VIBE</span>
              </>
            )}
          </button>
        </div>
      </Container>
    </section>
  );
};
