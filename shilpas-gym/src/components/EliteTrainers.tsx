import React from 'react';

export const EliteTrainers: React.FC = () => {
  return (
    <section className="py-24 bg-gym-charcoal text-white px-6 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-gym-orange/20 translate-x-4 translate-y-4 rounded-sm"></div>
          <img 
            src="/assets/trainer-head-coach.jpg" 
            alt="Head Coach" 
            className="relative w-full h-[500px] object-cover rounded-sm shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:-translate-x-2 grayscale hover:grayscale-0"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-gym-orange"></div>
            <span className="text-gym-orange font-black tracking-widest text-xs uppercase">Elite Guidance</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Meet the Head Coach</h2>
          <p className="text-gray-300 font-medium leading-relaxed mb-6">
            With over a decade of competitive bodybuilding and functional movement expertise, our head coach curates training regimens that transcend standard workouts. Every program is a bespoke architectural plan for your physique.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-4">
              <span className="text-gym-orange text-xl font-black">01.</span>
              <span className="text-gray-300 font-bold uppercase tracking-wider">ISSA Certified Master Trainer</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-gym-orange text-xl font-black">02.</span>
              <span className="text-gray-300 font-bold uppercase tracking-wider">Nutrition & Recovery Specialist</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-gym-orange text-xl font-black">03.</span>
              <span className="text-gray-300 font-bold uppercase tracking-wider">Former National Champion</span>
            </li>
          </ul>
        </div>
        
      </div>
    </section>
  );
};
