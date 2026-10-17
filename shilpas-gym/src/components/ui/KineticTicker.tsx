import React from 'react';
import { Star, ShieldCheck, Flame, Sparkles, Clock, MapPin } from 'lucide-react';

export const KineticTicker: React.FC = () => {
  const items = [
    { icon: <Star className="w-3.5 h-3.5 fill-[#D9381E] text-[#D9381E]" />, label: '4.7 RATED ACROSS 355+ GOOGLE REVIEWS' },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />, label: 'BIOMECHANICAL TRAINING ATELIER' },
    { icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />, label: 'PRIVATE UNISEX SALON & BRIDAL STUDIO' },
    { icon: <Flame className="w-3.5 h-3.5 text-[#D9381E]" />, label: 'CERTIFIED REHAB & HYPERTROPHY COACHES' },
    { icon: <Clock className="w-3.5 h-3.5 text-[#E6DEC8]" />, label: 'OPEN DAILY 06:00 AM – 10:00 PM' },
    { icon: <MapPin className="w-3.5 h-3.5 text-[#D9381E]" />, label: 'RAHARA & KHARDAHA · KOLKATA 700118' },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0D0D0E] text-[#F5F2EA] py-3.5 border-y border-white/10 group">
      <div className="flex select-none whitespace-nowrap will-change-transform animate-[ticker_14s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 mx-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
            <span className="flex-shrink-0">{item.icon}</span>
            <span>{item.label}</span>
            <span className="ml-6 text-white/20">/</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
