import React from 'react';

export const EliteTrainers: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-gym-orange/20 translate-x-4 translate-y-4 rounded-sm"></div>
          <img 
            src="/assets/trainer-head-coach.jpg" 
            alt="Head Coach" 
            className="relative w-full h-[500px] object-cover rounded-sm shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2 grayscale hover:grayscale-0"
          />
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-gym-orange"></div>
            <span className="text-gym-orange font-black tracking-widest text-xs uppercase">Elite Guidance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">MEET THE ARCHITECT</h2>
          <p className="text-gray-400 font-bold uppercase tracking-wider leading-relaxed mb-8 text-sm">
            With over a decade of competitive bodybuilding and functional movement expertise, our head coach curates training regimens that transcend standard workouts. Every program is a bespoke architectural plan for your physique.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-6 p-4 rounded-sm bg-[#050505] border border-white/10">
              <span className="text-gym-orange text-xl font-black">01.</span>
              <span className="text-white font-black uppercase tracking-widest text-sm">ISSA Certified Master Trainer</span>
            </li>
            <li className="flex items-center gap-6 p-4 rounded-sm bg-[#050505] border border-white/10">
              <span className="text-gym-orange text-xl font-black">02.</span>
              <span className="text-white font-black uppercase tracking-widest text-sm">Nutrition & Recovery Specialist</span>
            </li>
            <li className="flex items-center gap-6 p-4 rounded-sm bg-[#050505] border border-white/10">
              <span className="text-gym-orange text-xl font-black">03.</span>
              <span className="text-white font-black uppercase tracking-widest text-sm">Former National Champion</span>
            </li>
          </ul>
        </div>
        
      </div>
    </section>
  );
};
