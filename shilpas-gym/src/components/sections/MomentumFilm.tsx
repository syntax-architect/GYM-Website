import React, { useRef } from 'react';
import { PULSEFORM_ASSETS } from '../../config/assets';

export const MomentumFilm: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#EDE9DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Headline */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-[#20231F] tracking-tight leading-tight">
            Momentum is Engineered.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3C403A] font-normal leading-relaxed">
            Close tracking through a shaft of daylight. Powder chalk settling against knurled steel. 
            Before force becomes velocity, it begins in the quiet discipline of the grip.
          </p>
        </div>

        {/* Video Canvas Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] rounded-sm overflow-hidden bg-[#20231F]">
          <video
            ref={videoRef}
            src={PULSEFORM_ASSETS.V03.src}
            poster={PULSEFORM_ASSETS.I04.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Clean Film Footnote */}
          <div className="absolute bottom-4 right-4 bg-black/60 px-4 py-2 rounded-xs text-sm text-white/90 font-medium">
            Shilpa's Gym Training Floor · Rahara, Khardaha
          </div>
        </div>
      </div>
    </section>
  );
};
