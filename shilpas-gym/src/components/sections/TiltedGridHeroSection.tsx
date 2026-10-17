import React, { useState } from 'react';
import { TiltedGridHero } from '../ui/tilted-grid-hero';

interface TiltedGridHeroSectionProps {
  onOpenInquiry?: (plan?: string) => void;
}

const ALL_IMAGES = [
  {
    src: '/assets/showcase/shilpas_gym_strength.jpg',
    alt: "Powerlifter barbell training in Shilpa's Gym studio",
    category: 'gym',
  },
  {
    src: '/assets/showcase/shilpas_salon_glamour.jpg',
    alt: "Luxury bridal makeover in Shilpa's Beauty Salon studio",
    category: 'salon',
  },
  {
    src: '/assets/showcase/shilpas_gym_athlete.jpg',
    alt: 'Athletic training and dumbbell overhead press in Khardaha gym',
    category: 'gym',
  },
  {
    src: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    alt: 'Keratin smoothing hair spa & styling by master aesthetician',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    alt: 'Barbell weight plates and heavy lifting rigs',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    alt: 'Salon styling station with warm lighting',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cross-functional athletic conditioning battle ropes',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Skincare facial and bridal makeup close-up',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dumbbell hypertrophy training',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hair wash and scalp therapy',
    category: 'salon',
  },
];

export const TiltedGridHeroSection: React.FC<TiltedGridHeroSectionProps> = () => {
  const [filter, setFilter] = useState<'all' | 'gym' | 'salon'>('all');

  const filteredImages = React.useMemo(() => {
    if (filter === 'all') return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  return (
    <section id="tilted-showcase" className="relative py-24 bg-[#141613] text-[#F5F2EA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Dual Sanctuary in Motion.
            </h2>
            <p className="text-base text-white/80 max-w-xl font-normal">
              A curated visual perspective across our facility: high-energy physical conditioning and private salon beauty care under one roof in Khardaha.
            </p>
          </div>

          {/* High-End Segmented Filter Pill Dock */}
          <div className="p-1.5 bg-white/10 ring-1 ring-white/15 rounded-full inline-flex items-center gap-1.5 shadow-inner backdrop-blur-md">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 border-2 ${
                filter === 'all'
                  ? 'bg-[#FF6747] text-[#20231F] border-[#FF6747] shadow-lg shadow-[#FF6747]/20'
                  : 'bg-white/5 text-white/80 border-transparent hover:border-white/20 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${filter === 'all' ? 'bg-[#20231F]' : 'bg-white/30'}`} />
              All Spaces
            </button>
            <button
              type="button"
              onClick={() => setFilter('gym')}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 border-2 ${
                filter === 'gym'
                  ? 'bg-[#FF6747] text-[#20231F] border-[#FF6747] shadow-lg shadow-[#FF6747]/20'
                  : 'bg-white/5 text-white/80 border-transparent hover:border-white/20 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${filter === 'gym' ? 'bg-[#20231F]' : 'bg-white/30'}`} />
              Gym Floor
            </button>
            <button
              type="button"
              onClick={() => setFilter('salon')}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2 border-2 ${
                filter === 'salon'
                  ? 'bg-[#FF6747] text-[#20231F] border-[#FF6747] shadow-lg shadow-[#FF6747]/20'
                  : 'bg-white/5 text-white/80 border-transparent hover:border-white/20 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${filter === 'salon' ? 'bg-[#20231F]' : 'bg-white/30'}`} />
              Beauty Studio
            </button>
          </div>
        </div>
      </div>

      {/* 3D Tilted Grid Stream */}
      <div className="w-full">
        <TiltedGridHero
          images={filteredImages}
          className="h-[520px] w-full bg-[#141613]"
        />
      </div>
    </section>
  );
};
