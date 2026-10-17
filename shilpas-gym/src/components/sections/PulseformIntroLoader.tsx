import React, { useState, useEffect } from 'react';

export interface PulseformIntroLoaderProps {
  onComplete?: () => void;
}

export const PulseformIntroLoader: React.FC<PulseformIntroLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 250);
          return 100;
        }
        return prev + 12;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 bg-[#F5F2EA] text-[#0D0D0E] transition-opacity duration-500 ease-out"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      <div className="flex justify-between items-center font-mono text-xs text-[#0D0D0E]/60">
        <span className="tracking-widest">SHILPA'S // SYSTEM INITIALIZED</span>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onComplete?.();
          }}
          className="px-4 py-1.5 rounded-full border border-[#0D0D0E]/20 hover:border-[#D9381E] hover:bg-[#D9381E] hover:text-white transition-all text-xs uppercase font-extrabold tracking-wider cursor-pointer active:scale-95 shadow-xs"
        >
          SKIP INTRO →
        </button>
      </div>

      <div className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#D9381E] mb-3">
          IMMERSIVE TRAINING STUDIO
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight leading-none text-[#0D0D0E]">
          PULSEFORM
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#4C514A] mt-4 max-w-md">
          A physical training studio engineered around sculptural geometry, kinetic performance, and structural integrity.
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between font-mono text-xs text-[#0D0D0E]/60 mb-2">
          <span>CALIBRATING ASSETS</span>
          <span>{Math.min(100, progress)}%</span>
        </div>
        <div className="w-full h-1 bg-[#0D0D0E]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D9381E] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
