import React, { useRef } from 'react';
import { Badge } from '../ui/Badge';
import { PULSEFORM_ASSETS } from '../../config/assets';

export const MomentumFilm: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA] overflow-hidden border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
            <Badge variant="carbon" size="sm">
              STUDIO FILM
            </Badge>
          </div>
          <span className="font-mono text-xs text-[#20231F]/60 uppercase tracking-wider">
            RAW KINEMATICS // DIRECT ATELIER FOOTAGE
          </span>
        </div>

        {/* Video Canvas Container with HTML Typography Overlays */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] rounded-sm overflow-hidden border border-[#20231F]/10 shadow-sculptural bg-[#FAF8F4] group">
          {/* Looping Film */}
          <video
            ref={videoRef}
            src={PULSEFORM_ASSETS.V03.src}
            poster={PULSEFORM_ASSETS.I04.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
          />

          {/* Controlled Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#20231F]/75 via-[#20231F]/30 to-transparent pointer-events-none" />

          {/* HTML Typography Overlays */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-16 flex flex-col justify-between pointer-events-none">
            <div className="max-w-md">
              <span className="font-mono text-[11px] text-[#FF6747] tracking-widest uppercase block mb-2 font-bold">
                TACTILE REALISM
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
                MOMENTUM IS ENGINEERED.
              </h2>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-lg text-sm sm:text-base text-[#F5F2EA]/90 font-normal leading-relaxed">
                Close tracking through a shaft of daylight. Powder chalk settling against knurled steel. 
                Before force becomes velocity, it begins in the quiet tension of the grip.
              </p>

              <div className="font-mono text-[11px] text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-xs border border-white/10 hidden sm:block">
                SHILPA'S GYM FLOOR // RAHARA, KHARDAHA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
