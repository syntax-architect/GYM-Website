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
    <div className={`inline-flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#20231F]/10 shadow-xs transition-all ${className}`}>
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${
          isPlaying
            ? 'bg-[#FF6747] text-white shadow-xs'
            : 'bg-[#20231F]/5 text-[#20231F] hover:bg-[#20231F]/10'
        }`}
        title={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
        aria-label={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PULSE AUDIO</span>
            {/* Equalizer animation */}
            <span className="flex items-center gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 h-2.5 bg-white animate-pulse" />
              <span className="w-0.5 h-3.5 bg-white animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#20231F]/60" />
            <span className="hidden sm:inline text-[#20231F]/70">AUDIO OFF</span>
          </>
        )}
      </button>

      {/* Track selector when playing */}
      {isPlaying && (
        <div className="flex items-center gap-1 pr-2">
          <button
            onClick={() => switchTrack('ambient')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase transition-colors ${
              activeTrack === 'ambient'
                ? 'bg-[#174D3B] text-white font-bold'
                : 'text-[#20231F]/60 hover:text-[#20231F]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => switchTrack('kinetic')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase transition-colors ${
              activeTrack === 'kinetic'
                ? 'bg-[#174D3B] text-white font-bold'
                : 'text-[#20231F]/60 hover:text-[#20231F]'
            }`}
          >
            Chalk
          </button>
        </div>
      )}
    </div>
  );
};
