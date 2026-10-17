import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export interface AudioExperienceControllerProps {
  className?: string;
  defaultTrack?: 'ambient' | 'kinetic';
}

export const AudioExperienceController: React.FC<AudioExperienceControllerProps> = ({
  className = '',
  defaultTrack = 'ambient',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const volume = 0.45;
  const [activeTrack, setActiveTrack] = useState<'ambient' | 'kinetic'>(defaultTrack);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = activeTrack === 'ambient' 
      ? '/assets/audio/pulseform-ambient.mp3' 
      : '/assets/audio/pulseform-kinetic.mp3';
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [activeTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Audio playback error (browser user gesture requirement):', err);
      }
    }
  };

  const switchTrack = (track: 'ambient' | 'kinetic') => {
    setActiveTrack(track);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track === 'ambient'
        ? '/assets/audio/pulseform-ambient.mp3'
        : '/assets/audio/pulseform-kinetic.mp3';
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-md p-1 border-2 border-[#0D0D0E]/15 shadow-xs ${className}`}>
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-[#D9381E] text-[#0D0D0E] shadow-xs'
            : 'text-[#0D0D0E] hover:bg-black/5'
        }`}
        title={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
        aria-label={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audio On</span>
            <span className="flex items-center gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 h-3 bg-[#0D0D0E] animate-pulse" />
              <span className="w-0.5 h-2 bg-[#0D0D0E] animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-[#0D0D0E] animate-pulse delay-150" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#0D0D0E]/70" />
            <span className="hidden sm:inline text-[#0D0D0E]/80">Audio Off</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 pr-1 border-l border-[#0D0D0E]/10 pl-1.5">
          <button
            onClick={() => switchTrack('ambient')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTrack === 'ambient'
                ? 'bg-[#141311] text-white shadow-xs'
                : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => switchTrack('kinetic')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTrack === 'kinetic'
                ? 'bg-[#141311] text-white shadow-xs'
                : 'text-[#0D0D0E]/70 hover:text-[#0D0D0E]'
            }`}
          >
            Kinetic
          </button>
        </div>
      )}
    </div>
  );
};
