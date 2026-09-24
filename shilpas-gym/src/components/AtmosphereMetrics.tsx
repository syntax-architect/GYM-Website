import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Dumbbell, Activity } from 'lucide-react';

export const AtmosphereMetrics: React.FC = () => {
  return (
    <section className="bg-gym-charcoal py-20 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col items-center text-center p-8 border border-white/10 rounded-sm hover:border-gym-orange transition-colors">
          <Clock className="w-10 h-10 text-gym-orange mb-6" />
          <h4 className="text-sm font-black tracking-widest text-gray-400 uppercase mb-4">Peak Hours</h4>
          <p className="font-black text-xl text-white uppercase tracking-tighter">6:00 AM &mdash; 9:00 AM</p>
          <p className="font-black text-xl text-white uppercase tracking-tighter">5:30 PM &mdash; 8:30 PM</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 border border-white/10 rounded-sm hover:border-gym-orange transition-colors">
          <Dumbbell className="w-10 h-10 text-gym-orange mb-6" />
          <h4 className="text-sm font-black tracking-widest text-gray-400 uppercase mb-4">Equipment Roster</h4>
          <p className="font-black text-xl text-white uppercase tracking-tighter">Eleiko Barbells & Plates</p>
          <p className="font-black text-xl text-white uppercase tracking-tighter">Rogue Fitness Racks</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 border border-white/10 rounded-sm hover:border-gym-orange transition-colors">
          <Activity className="w-10 h-10 text-gym-orange mb-6" />
          <h4 className="text-sm font-black tracking-widest text-gray-400 uppercase mb-4">Decibel / Vibe</h4>
          <p className="font-black text-xl text-white uppercase tracking-tighter">High Energy (~85 dB)</p>
          <p className="font-black text-xl text-white uppercase tracking-tighter">Hip-Hop & Electronic</p>
        </div>

      </div>
    </section>
  );
};
