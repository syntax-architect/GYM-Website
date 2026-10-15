import React from 'react';

export const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] text-white border-t border-white/5">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">THE ATMOSPHERE</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-xl mx-auto">Moments captured inside our sanctuary.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-16 lg:px-24">
        <div className="relative group overflow-hidden h-[400px] md:h-[600px] rounded-sm">
          <img 
            src="/assets/facilities-iron-floor.jpg" 
            alt="Iron Floor" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-gym-orange">THE IRON FLOOR</h3>
          </div>
        </div>
        
        <div className="relative group overflow-hidden h-[400px] md:h-[600px] rounded-sm">
          <img 
            src="/assets/facilities-recovery-lounge.jpg" 
            alt="Recovery Lounge" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-gym-orange">RECOVERY LOUNGE</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
