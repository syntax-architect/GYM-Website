import React from 'react';
import { useStore } from '../store';

export const Hero6040: React.FC = () => {
  const openBooking = useStore(state => state.openBooking);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      {/* LEFT SIDE: 60% Width, High z-index */}
      <div className="relative z-20 w-[60%] pl-8 md:pl-24 flex flex-col items-start mt-16 md:mt-0">
        <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          IMPROVE YOUR<br /><span className="text-[#FF4500]">FITNESS LEVEL</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg mb-8">
          Where state-of-the-art equipment meets bespoke personal training in a strictly premium, focused setting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => openBooking()}
            className="bg-[#FF4500] text-white px-8 py-4 font-bold uppercase rounded-sm hover:bg-[#CC3700] transition-colors"
          >
            Initialize Trial
          </button>
          <a 
            href="#memberships"
            className="bg-transparent border border-white/20 text-white px-8 py-4 font-bold uppercase rounded-sm hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            View Architecture
          </a>
        </div>
      </div>

      {/* RIGHT SIDE: 40% Width with Gradient Mask */}
      <div className="absolute top-0 right-0 w-[55%] h-full z-10">
        {/* The Gradient that fades the image into the black left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        {/* The Hero Image */}
        <img 
          src="/assets/hero-desktop-16x9.jpg" 
          alt="Elite Athlete" 
          className="w-full h-full object-cover object-right"
        />
      </div>
    </div>
  );
};
