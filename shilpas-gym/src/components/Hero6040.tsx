import React from 'react';
import { motion } from 'framer-motion';

const sentence = "IMPROVE YOUR FITNESS LEVEL";

export const Hero6040: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-gym-black overflow-hidden flex flex-col md:flex-row pt-[72px] md:pt-0">
      {/* Left Container (60%) */}
      <div className="w-full md:w-[60%] h-1/2 md:h-full bg-gym-black z-10 flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] text-white mb-6">
            SHILPA'S <br/>
            <span className="text-gym-orange">GYM</span>
          </h1>
          <h2 className="text-2xl md:text-4xl text-gray-400 mb-10 max-w-xl">
            IMPROVE YOUR FITNESS LEVEL
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gym-orange text-white px-8 py-4 rounded-sm font-black text-lg tracking-widest transition-colors hover:bg-gym-orangeHover"
            >
              EXPLORE MEMBERSHIPS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border-2 border-white/20 text-white hover:border-gym-orange hover:text-gym-orange px-8 py-4 rounded-sm font-black text-lg tracking-widest transition-colors"
            >
              BOOK A TOUR
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Container (40%) */}
      <div className="w-full md:w-[40%] h-1/2 md:h-full relative">
        <div 
          className="w-full h-full absolute inset-0 md:bg-[linear-gradient(to_right,transparent,black_20%)] z-10"
          style={{ maskImage: "linear-gradient(to right, transparent, black 20%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 20%)" }}
        >
          <img 
            src="/assets/hero-desktop-16x9.jpg" 
            alt="Gym Hero" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
