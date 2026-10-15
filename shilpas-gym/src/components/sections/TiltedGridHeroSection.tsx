import React, { useState } from 'react';
import { TiltedGridHero } from '../ui/tilted-grid-hero';
import { Sparkles, Dumbbell, Sparkle, Compass, ArrowUpRight, Flame } from 'lucide-react';

interface TiltedGridHeroSectionProps {
  onOpenInquiry?: (plan?: string) => void;
}

const ALL_IMAGES = [
  {
    src: '/assets/showcase/shilpas_gym_strength.jpg',
    alt: "Indian powerlifter deadlifting in Shilpa's Gym amber lit studio",
    category: 'gym',
  },
  {
    src: '/assets/showcase/shilpas_salon_glamour.jpg',
    alt: "Luxury Bengali bridal makeover in Shilpa's Beauty Salon studio",
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
    alt: 'Opulent salon styling station with warm ambient lighting',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cross-functional athletic conditioning battle ropes',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Radiant skincare facial and bridal makeup close-up',
    category: 'salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Dumbbell hypertrophy training',
    category: 'gym',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hair wash and botanical scalp massage therapy',
    category: 'salon',
  },
];

export const TiltedGridHeroSection: React.FC<TiltedGridHeroSectionProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState<'all' | 'gym' | 'salon'>('all');
  const [speed, setSpeed] = useState<number>(3.5);

  const filteredImages = React.useMemo(() => {
    if (filter === 'all') return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  return (
    <section id="tilted-showcase" className="relative py-24 bg-[#141613] text-[#F5F2EA] overflow-hidden border-y border-white/10">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6747]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E3E879]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#FF6747]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Perspective Cinema • 3D Curved Cylinder</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              The Dual Sanctuary in Motion
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl font-light">
              Experience the seamless curved corridor connecting intense physical conditioning
              and high-glamour beauty care under one roof in Khardaha, Kolkata.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#FF6747] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              All Realms (10)
            </button>
            <button
              onClick={() => setFilter('gym')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'gym'
                  ? 'bg-[#FF6747] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Iron & Cardio</span>
            </button>
            <button
              onClick={() => setFilter('salon')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'salon'
                  ? 'bg-[#E3E879] text-[#141613] shadow-md font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkle className="w-3.5 h-3.5" />
              <span>Bridal & Hair Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Tilted Grid Hero Component */}
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1400px]">
          <TiltedGridHero
            key={`${filter}-${speed}`}
            images={filteredImages}
            speed={speed}
            tileHeight={28}
            aspectRatio={16 / 9}
            curve={82}
            gap={6}
            fade={14}
            className="h-[540px] sm:h-[620px] w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0d0f0d] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Center Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 px-4 text-center pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs text-white/90">
                <Compass className="w-3.5 h-3.5 text-[#E3E879] animate-spin" style={{ animationDuration: '8s' }} />
                <span>Scroll or watch the 360° cylindrical stream</span>
              </div>

              {/* Central Title */}
              <div className="pointer-events-auto max-w-2xl px-4 py-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/5">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg uppercase font-sans">
                  Raw Strength.{' '}
                  <span className="bg-gradient-to-r from-[#FF6747] via-[#FFB347] to-[#E3E879] bg-clip-text text-transparent">
                    Pure Elegance.
                  </span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                  Every frame flows along the 3D axis. 355+ Google 4.7★ reviews confirm Kolkata's top fitness & salon haven.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => onOpenInquiry?.('Tilted Hero: Fitness Membership')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6747] hover:bg-[#ff512e] text-white text-xs font-semibold tracking-wide transition-transform active:scale-95 shadow-lg shadow-[#FF6747]/25"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Join Shilpa's Gym</span>
                  </button>
                  <button
                    onClick={() => onOpenInquiry?.('Tilted Hero: Salon Bridal Inquiry')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide border border-white/20 transition-transform active:scale-95 backdrop-blur-md"
                  >
                    <span>Book Salon & Makeover</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E3E879]" />
                  </button>
                </div>
              </div>

              {/* Speed Controller footer */}
              <div className="pointer-events-auto flex items-center gap-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-white/70">
                <span>Speed:</span>
                <button
                  onClick={() => setSpeed(5)}
                  className={`px-2.5 py-0.5 rounded-full transition-colors ${
                    speed === 5 ? 'bg-white/20 text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  Chill
                </button>
                <button
                  onClick={() => setSpeed(3.5)}
                  className={`px-2.5 py-0.5 rounded-full transition-colors ${
                    speed === 3.5 ? 'bg-[#FF6747] text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  Balanced
                </button>
                <button
                  onClick={() => setSpeed(2)}
                  className={`px-2.5 py-0.5 rounded-full transition-colors ${
                    speed === 2 ? 'bg-[#FF6747] text-white font-medium' : 'hover:text-white'
                  }`}
                >
                  Hyper
                </button>
              </div>
            </div>
          </TiltedGridHero>
        </div>
      </div>
    </section>
  );
};

export default TiltedGridHeroSection;
