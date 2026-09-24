import React, { useState } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Recovery'];

const CLASSES = [
  { id: 'c1', name: 'Elite Powerlifting', category: 'Strength', price: 499, desc: 'Master the big three lifts with our specialized coaching.' },
  { id: 'c2', name: 'HIIT Burnout', category: 'Cardio', price: 399, desc: 'High intensity intervals designed to shred fat.' },
  { id: 'c3', name: 'Yoga Flow', category: 'Recovery', price: 299, desc: 'Active recovery and mobility session.' },
  { id: 'c4', name: 'BodyPump', category: 'Strength', price: 449, desc: 'Full body barbell workout for muscular endurance.' },
  { id: 'c5', name: 'Spin Velocity', category: 'Cardio', price: 399, desc: 'Immersive indoor cycling experience.' },
  { id: 'c6', name: 'Deep Tissue Prep', category: 'Recovery', price: 599, desc: 'Guided foam rolling and mobility work.' },
];

export const ClassSchedule: React.FC = () => {
  const [activeCat, setActiveCat] = useState('All');
  const addToCart = useStore(state => state.addToCart);

  const filtered = activeCat === 'All' ? CLASSES : CLASSES.filter(c => c.category === activeCat);

  return (
    <section id="memberships" className="py-24 bg-gym-black text-white px-6 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[2px] w-8 bg-gym-orange"></div>
          <span className="text-gym-orange font-black tracking-widest text-xs uppercase">Curated Sessions</span>
          <div className="h-[2px] w-8 bg-gym-orange"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">Class Schedule</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2 rounded-sm text-sm font-black tracking-widest uppercase transition-all ${activeCat === cat ? 'bg-gym-orange text-black' : 'bg-transparent border-2 border-white/20 text-white hover:border-gym-orange hover:text-gym-orange'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(cls => (
          <div key={cls.id} className="bg-gym-charcoal p-6 rounded-sm border border-white/10 hover:border-gym-orange transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-gym-orange transition-colors">{cls.name}</h3>
                <span className="text-gym-orange font-black text-xl tabular-nums">₹{cls.price}</span>
              </div>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6 uppercase tracking-tight">{cls.desc}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart({ id: cls.id, name: cls.name, price: cls.price })}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-white/20 rounded-sm hover:border-gym-orange hover:bg-gym-orange hover:text-black font-black uppercase text-sm tracking-widest transition-colors"
            >
              <span>ADD TO PASSES</span>
              <span className="text-lg leading-none">+</span>
            </motion.button>
          </div>
        ))}
      </div>
    </section>
  );
};
