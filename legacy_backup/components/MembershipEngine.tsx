import React from 'react';
import { useStore } from '../store';

export const MembershipEngine: React.FC = () => {
  const openBooking = useStore(state => state.openBooking);

  return (
    <section className="py-24 bg-black text-white px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-gym-orange"></div>
            <span className="text-gym-orange font-black tracking-widest text-xs uppercase">Membership Tiers</span>
            <div className="h-[2px] w-8 bg-gym-orange"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">SELECT YOUR TIER</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-xl mx-auto">Access the facility on your terms. Every tier is designed to elevate your performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Starter Plan */}
          <div className="bg-[#050505] border border-white/10 rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-gym-orange group">
            <div className="h-56 relative overflow-hidden">
              <img src="/assets/ecommerce-starter-bundle.jpg" alt="Starter" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white">STARTER</h3>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="text-5xl font-black tracking-tighter text-gym-orange mb-8 flex items-end gap-1">
                ₹1,999<span className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">/mo</span>
              </div>
              <ul className="space-y-4 text-gray-300 mb-10 flex-grow font-bold uppercase tracking-widest text-xs">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  Access to Iron Floor
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  Basic equipment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  Locker access
                </li>
              </ul>
              <button 
                onClick={() => openBooking()}
                className="w-full bg-transparent border-2 border-white/20 text-white hover:bg-gym-orange hover:text-black hover:border-gym-orange rounded-sm py-4 font-black uppercase text-sm tracking-widest transition-all"
              >
                CHOOSE STARTER
              </button>
            </div>
          </div>

          {/* Signature Plan */}
          <div className="bg-[#050505] border-2 border-gym-orange rounded-sm overflow-hidden flex flex-col relative transition-all duration-500 group shadow-glow">
            <div className="absolute top-4 right-4 bg-gym-orange text-black text-[10px] font-black px-4 py-1 rounded-sm z-10 tracking-widest uppercase">
              SIGNATURE
            </div>
            <div className="h-56 relative overflow-hidden">
              <img src="/assets/ecommerce-vip-pass.jpg" alt="Signature" className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white">SIGNATURE</h3>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="text-5xl font-black tracking-tighter text-gym-orange mb-8 flex items-end gap-1">
                ₹4,999<span className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">/mo</span>
              </div>
              <ul className="space-y-4 text-gray-300 mb-10 flex-grow font-bold uppercase tracking-widest text-xs">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  All Starter benefits
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  Recovery Lounge Access
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  2 PT sessions/month
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-sm bg-gym-orange"></div>
                  Nutrition plan
                </li>
              </ul>
              <button 
                onClick={() => openBooking()}
                className="w-full bg-gym-orange text-black hover:bg-gym-orangeHover rounded-sm py-4 font-black uppercase text-sm tracking-widest transition-colors"
              >
                CHOOSE SIGNATURE
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
