import React, { useState } from 'react';
import { useStore } from '../store';

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
    <section id="memberships" className="py-24 bg-[#0a0a0a] text-white px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-gym-orange"></div>
            <span className="text-gym-orange font-black tracking-widest text-xs uppercase">Curated Sessions</span>
            <div className="h-[2px] w-8 bg-gym-orange"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 uppercase">ACCESS THE SCHEDULE</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-6 py-3 rounded-sm text-sm font-black uppercase tracking-widest transition-all ${activeCat === cat ? 'bg-gym-orange text-black' : 'bg-transparent border-2 border-white/20 text-white hover:border-gym-orange hover:text-gym-orange'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(cls => (
            <div key={cls.id} className="bg-black p-8 rounded-sm border border-white/10 hover:border-gym-orange transition-colors flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black tracking-tighter uppercase text-white group-hover:text-gym-orange transition-colors">{cls.name}</h3>
                  <span className="text-gym-orange font-black text-xl tabular-nums">₹{cls.price}</span>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider leading-relaxed mb-8">{cls.desc}</p>
              </div>
              <button
                onClick={() => addToCart({ id: cls.id, name: cls.name, price: cls.price })}
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-white/20 text-white rounded-sm font-black text-sm uppercase tracking-widest transition-colors hover:border-gym-orange hover:bg-gym-orange hover:text-black"
              >
                <span>Add to Passes</span>
                <span className="text-lg leading-none font-bold">+</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
