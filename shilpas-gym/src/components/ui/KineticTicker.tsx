import React from 'react';
import { Star, ShieldCheck, Flame, Sparkles, Clock, MapPin } from 'lucide-react';

export const KineticTicker: React.FC = () => {
  const items = [
    { icon: <Star className="w-3.5 h-3.5 fill-[#FF6747] text-[#FF6747]" />, label: '4.7 RATED ACROSS 355+ GOOGLE REVIEWS' },
    { icon: <ShieldCheck className="w-3.5 h-3.5 text-[#174D3B]" />, label: 'BIOMECHANICAL TRAINING ATELIER' },
    { icon: <Sparkles className="w-3.5 h-3.5 text-[#8177FF]" />, label: 'PRIVATE UNISEX SALON & BRIDAL STUDIO' },
    { icon: <Flame className="w-3.5 h-3.5 text-[#FF6747]" />, label: 'CERTIFIED REHAB & HYPERTROPHY COACHES' },
    { icon: <Clock className="w-3.5 h-3.5 text-[#20231F]" />, label: 'OPEN DAILY 06:00 AM – 10:00 PM' },
    { icon: <MapPin className="w-3.5 h-3.5 text-[#174D3B]" />, label: 'RAHARA & KHARDAHA · KOLKATA 700118' },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#20231F] text-[#F5F2EA] py-3.5 border-y border-[#20231F]">
      <div className="flex select-none whitespace-nowrap will-change-transform animate-[ticker_35s_linear_infinite]">
        {[...items, ...items, ...items].map((item, idx) => (
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
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};
