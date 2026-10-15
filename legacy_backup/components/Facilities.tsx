import React from 'react';

export const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="py-32 bg-[#121212] text-white">
      <div className="px-6 md:px-16 lg:px-24 mb-16 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gold/50"></div>
          <span className="text-gold tracking-[0.2em] text-xs uppercase">The Spaces</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Unrivaled Facilities</h2>
        <p className="text-gray-400 max-w-xl text-lg font-light italic mx-auto md:mx-0">Experience raw power combined with luxury recovery. Everything you need to shatter your limits in a perfectly curated environment.</p>
      </div>

      {/* Desktop: Asymmetrical Grid, Mobile: Horizontal Slider */}
      <div className="pl-6 md:px-16 lg:px-24 flex md:grid md:grid-cols-12 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
        
        {/* Item 1 */}
        <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-7 snap-center relative group overflow-hidden rounded-xl">
          <div className="aspect-[4/3] md:aspect-auto md:h-[600px] w-full bg-[#0a0a0a]">
            <img 
              src="/assets/facilities-iron-floor.jpg" 
              alt="Iron Floor" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent flex flex-col justify-end p-10 transition-opacity duration-500">
            <h3 className="text-3xl font-serif text-white mb-2">The Iron Floor</h3>
            <p className="text-gold/80 text-sm tracking-wider uppercase font-medium">Strength & Conditioning</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex-shrink-0 w-[85vw] md:w-auto md:col-span-5 snap-center relative group overflow-hidden rounded-xl">
          <div className="aspect-[4/3] md:aspect-auto md:h-[600px] w-full bg-[#0a0a0a]">
            <img 
              src="/assets/facilities-recovery-lounge.jpg" 
              alt="Recovery Lounge" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent flex flex-col justify-end p-10 transition-opacity duration-500">
            <h3 className="text-3xl font-serif text-gold mb-2">Recovery Lounge</h3>
            <p className="text-white/70 text-sm tracking-wider uppercase font-medium">Rejuvenate & Repair</p>
          </div>
        </div>

      </div>
    </section>
  );
};
