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
    <div className={`inline-flex items-center gap-1.5 rounded-sm bg-[#EDE9DF] p-1 ${className}`}>
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xs text-sm font-semibold uppercase transition-colors cursor-pointer ${
          isPlaying
            ? 'bg-[#FF6747] text-white'
            : 'text-[#20231F] hover:bg-black/5'
        }`}
        title={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
        aria-label={isPlaying ? 'Mute Studio Audio' : 'Enable Studio Audio'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Audio</span>
            <span className="flex items-center gap-0.5 h-3 ml-0.5">
              <span className="w-1 h-3 bg-white" />
              <span className="w-1 h-2 bg-white" />
              <span className="w-1 h-3.5 bg-white" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#20231F]/70" />
            <span className="hidden sm:inline text-[#20231F]/80">Audio Off</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 pr-1">
          <button
            onClick={() => switchTrack('ambient')}
            className={`px-2 py-1 rounded-xs text-sm font-medium uppercase transition-colors ${
              activeTrack === 'ambient'
                ? 'bg-[#174D3B] text-white font-bold'
                : 'text-[#20231F]/70 hover:text-[#20231F]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => switchTrack('kinetic')}
            className={`px-2 py-1 rounded-xs text-sm font-medium uppercase transition-colors ${
              activeTrack === 'kinetic'
                ? 'bg-[#174D3B] text-white font-bold'
                : 'text-[#20231F]/70 hover:text-[#20231F]'
            }`}
          >
            Kinetic
          </button>
        </div>
      )}
    </div>
  );
};
