import React from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

export const MembershipEngine: React.FC = () => {
  const openBooking = useStore(state => state.openBooking);

  return (
    <section className="py-32 bg-[#0a0a0a] text-white px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-serif mb-6 text-gold">Curated Wellness Plans</h2>
        <p className="text-gray-400 font-light italic max-w-2xl mx-auto text-lg">Select the tier that aligns with your lifestyle and fitness aspirations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Starter Plan */}
        <div className="bg-[#121212] border border-white/5 hover:border-gold/30 rounded-xl overflow-hidden flex flex-col transition-colors duration-500">
          <div className="h-56 relative">
            <img src="/assets/ecommerce-starter-bundle.jpg" alt="Starter" className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-serif text-white tracking-wide">Starter</h3>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <div className="text-4xl font-light tabular-nums text-gold mb-8 flex items-end gap-1">
              ₹1,999<span className="text-sm text-gray-500 font-sans mb-1">/mo</span>
            </div>
            <ul className="space-y-4 text-gray-400 mb-10 flex-grow font-light text-sm">
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Access to Iron Floor</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Basic equipment</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Locker access</li>
            </ul>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => openBooking('Starter')}
              className="w-full bg-transparent border border-gray-700 text-gray-300 hover:border-gold hover:text-gold rounded-full py-3 text-sm tracking-widest transition-all"
            >
              CHOOSE STARTER
            </motion.button>
          </div>
        </div>

        {/* Advance Plan */}
        <div className="bg-[#151515] border border-gold/50 rounded-xl overflow-hidden flex flex-col transform md:-translate-y-4 shadow-[0_10px_40px_rgba(200,155,60,0.1)] relative transition-all duration-500 hover:shadow-[0_10px_50px_rgba(200,155,60,0.15)]">
          <div className="absolute top-4 right-4 bg-gold text-[#0a0a0a] text-xs font-semibold px-4 py-1.5 rounded-full z-10 tracking-widest">
            SIGNATURE
          </div>
          <div className="h-56 relative">
            <img src="/assets/ecommerce-vip-pass.jpg" alt="Advance" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-serif text-white tracking-wide">Advance</h3>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <div className="text-4xl font-light tabular-nums text-gold mb-8 flex items-end gap-1">
              ₹4,999<span className="text-sm text-gray-500 font-sans mb-1">/mo</span>
            </div>
            <ul className="space-y-4 text-gray-300 mb-10 flex-grow font-light text-sm">
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> All Starter benefits</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Recovery Lounge Access</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> 2 PT sessions/month</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Nutrition plan</li>
            </ul>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => openBooking('Advance')}
              className="w-full bg-gold text-[#0a0a0a] hover:bg-gold-light rounded-full py-3 font-medium text-sm tracking-widest transition-colors shadow-[0_0_15px_rgba(200,155,60,0.4)]"
            >
              CHOOSE ADVANCE
            </motion.button>
          </div>
        </div>

        {/* Beginner Plan */}
        <div className="bg-[#121212] border border-white/5 hover:border-gold/30 rounded-xl overflow-hidden flex flex-col transition-colors duration-500">
          <div className="h-56 relative bg-[#1f1f1f] flex items-center justify-center">
            <div className="text-gray-700 font-serif text-5xl opacity-30">Beginner</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-serif text-white tracking-wide">Beginner</h3>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <div className="text-4xl font-light tabular-nums text-gold mb-8 flex items-end gap-1">
              ₹2,999<span className="text-sm text-gray-500 font-sans mb-1">/mo</span>
            </div>
            <ul className="space-y-4 text-gray-400 mb-10 flex-grow font-light text-sm">
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> All Starter benefits</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Group classes</li>
              <li className="flex items-center gap-3"><span className="text-gold text-xs">◆</span> Sauna access</li>
            </ul>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => openBooking('Beginner')}
              className="w-full bg-transparent border border-gray-700 text-gray-300 hover:border-gold hover:text-gold rounded-full py-3 text-sm tracking-widest transition-all"
            >
              CHOOSE BEGINNER
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};
