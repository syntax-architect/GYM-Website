import React from 'react';
import { Star, MessageSquare, Award, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { TestimonialCarousel, type Testimonial } from '../ui/testimonial';
import { PULSEFORM_ASSETS } from '../../config/assets';

const TRAINERS: Testimonial[] = [
  {
    id: 't1',
    name: 'Coach Rajesh Sen',
    role: 'Head Biomechanics & Strength',
    avatar: '/assets/showcase/shilpas_gym_strength.jpg',
    description: 'True strength is mastering the mechanical bar path. Every repetition should build muscular hypertrophy without compromising joint integrity.',
  },
  {
    id: 't2',
    name: 'Coach Priya Mukherjee',
    role: "Senior Women's Fitness & Posture",
    avatar: '/assets/showcase/shilpas_gym_athlete.jpg',
    description: 'Consistent progressive overload and structured nutrition will transform your confidence and metabolism faster than any crash diet.',
  },
  {
    id: 't3',
    name: 'Coach Amitav Das',
    role: 'Functional Athletics & HIIT',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
    description: 'When the lactic burn hits during battle ropes and sleds, that is where mental resilience and athletic endurance are forged.',
  },
  {
    id: 't4',
    name: 'Shilpa Roy',
    role: 'Founder & Master Aesthetician',
    avatar: '/assets/showcase/shilpas_salon_glamour.jpg',
    description: "Our dual sanctuary lets you conquer high-intensity physical fitness on the gym floor, then rejuvenate with luxury bridal & hair artistry.",
  },
  {
    id: 't5',
    name: 'Tania Roy',
    role: 'Senior Hair Spa & Keratin Specialist',
    avatar: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    description: 'Healthy radiant hair requires deep nourishment and botanical restoration. We deliver salon luxury tailored to Kolkata climate.',
  },
];

interface GoogleReview {
  name: string;
  role: string;
  rating: number;
  timeAgo: string;
  comment: string;
  highlight: string;
}

const REVIEWS: GoogleReview[] = [
  {
    name: 'Shukdeb Ghosh',
    role: 'Local Guide • 68 reviews • 368 photos',
    rating: 5,
    timeAgo: 'Verified Google Review',
    comment: 'World class facility available here. They have all latest equipment for gym. Trainers are very helpful and experienced. Also they have separate unisex salon section.',
    highlight: 'World-class facility & separate salon',
  },
  {
    name: 'Sanket Jaiswal',
    role: 'Local Guide • 5 reviews • 2 photos',
    rating: 5,
    timeAgo: 'Verified Google Review',
    comment: 'A nice place to workout with good ambience. Trainers are also supportive and helpful.',
    highlight: 'Good ambience & supportive trainers',
  },
  {
    name: 'Avramouli S.',
    role: 'Local Guide • 17 reviews • 45 photos',
    rating: 5,
    timeAgo: 'Verified Google Review',
    comment: 'Ambience is very nice. Staff behaviour was pretty good and the services I took were pretty decent. Thank you.',
    highlight: 'Polite staff & quality services',
  },
];

export const CoachingAction: React.FC = () => {
  return (
    <section id="reviews" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA] border-b border-[#20231F]/10">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          index="07"
          tag="COMMUNITY & SOCIAL PROOF"
          title="4.7 ★★★★★ GOOGLE RATED."
          accentTitle="355+ VERIFIED ATHLETES."
          description="Gym-goers and salon clients consistently praise our motivating atmosphere, modern imported machinery, polite staff, and private unisex parlour section in Rahara."
        />

        {/* Real Google Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-white p-7 rounded-sm border border-[#20231F]/10 shadow-xs hover:shadow-sculptural hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-[#FF6747] gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[#174D3B] font-bold bg-[#174D3B]/10 px-2 py-0.5 rounded-full">
                    GOOGLE VERIFIED
                  </span>
                </div>

                <p className="text-xs font-mono text-[#FF6747] font-bold mb-2">
                  "{rev.highlight}"
                </p>

                <p className="text-sm text-[#4C514A] font-normal leading-relaxed mb-6 font-sans">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#20231F]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#20231F]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[#20231F]/60">
                    {rev.role}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F4] border border-[#20231F]/10 flex items-center justify-center text-[#20231F]/40">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Trainer Profile Deck */}
        <div className="mb-20 bg-white border border-[#20231F]/10 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle background ambiance */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#FF6747]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#174D3B]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#20231F]/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6747]/10 text-[#FF6747] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>INTERACTIVE TRAINER & STYLIST STACK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-[#20231F] tracking-tight">
                MEET YOUR ON-FLOOR COACHES & EXPERTS
              </h3>
              <p className="text-xs sm:text-sm text-[#4C514A] max-w-xl mt-1">
                Drag, swipe or use arrows to discover individual coach specializations, philosophy quotes, and on-floor guidance at Shilpa's Gym & Salon.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#20231F]/70 bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#20231F]/10">
              <Award className="w-4 h-4 text-[#FF6747]" />
              <span>Certified Unisex Trainers & Senior Aestheticians</span>
            </div>
          </div>

          <TestimonialCarousel
            testimonials={TRAINERS}
            showArrows={true}
            showDots={true}
            className="py-4"
          />
        </div>

        {/* Coaching In Action & Interactive Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Studio Head Portrait */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm overflow-hidden border border-[#20231F]/10 shadow-sculptural bg-white">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={PULSEFORM_ASSETS.I08.src}
                  alt={PULSEFORM_ASSETS.I08.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-white border-t border-[#20231F]/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-display font-extrabold uppercase text-[#20231F] tracking-tight">
                    CERTIFIED FITNESS TRAINERS
                  </h3>
                  <Badge variant="botanical">MALE & FEMALE</Badge>
                </div>
                <p className="text-xs text-[#4C514A] leading-relaxed mb-4">
                  Friendly, highly supportive, and focused on technique. Our trainers ensure every gym member learns correct biomechanical movement, builds strength, and stays injury-free.
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#20231F]/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#174D3B]" />
                  <span>WEIGHT LOSS • BODYBUILDING • POSTURE CORRECTION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coaching In Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-sm overflow-hidden border border-[#20231F]/10 shadow-sculptural bg-white">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={PULSEFORM_ASSETS.I07.src}
                  alt={PULSEFORM_ASSETS.I07.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 bg-white border-t border-[#20231F]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="persimmon">PERSONAL ATTENTION</Badge>
                  <span className="font-mono text-xs text-[#20231F]/60">
                    // ON-FLOOR GUIDANCE
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-bold uppercase text-[#20231F] tracking-tight mb-2">
                  SUPPORTIVE & WELCOMING COMMUNITY
                </h4>
                <p className="text-sm text-[#4C514A] leading-relaxed">
                  Whether it's your very first day lifting weights or preparing for advanced strength goals, our trainers provide polite, patient, and hands-on cues for squat depth, bench press safety, and cardio pacing.
                </p>
              </div>
            </div>

            {/* Inclusivity Standards */}
            <div className="p-4 rounded-sm bg-[#FAF8F4] border border-[#20231F]/10 font-mono text-[11px] text-[#20231F]/70 flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174D3B]" />
                <span className="text-[#20231F] font-bold">ATMOSPHERE:</span>
                <span>LGBTQ+ Friendly • Women-Owned • Inclusive Unisex Environment</span>
              </span>
              <span className="text-[#FF6747] font-bold">DEDICATED SALON SUITE</span>
            </div>
          </div>
        </div>

        {/* Studio Community Wide Video */}
        <div className="relative w-full rounded-sm overflow-hidden border border-[#20231F]/10 shadow-sculptural bg-[#FAF8F4] group">
          <div className="aspect-[16/9] lg:aspect-[2.4/1] w-full overflow-hidden">
            <video
              src={PULSEFORM_ASSETS.V10.src}
              poster={PULSEFORM_ASSETS.I10.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#20231F]/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pointer-events-none">
            <div className="max-w-md">
              <span className="font-mono text-xs text-[#FF6747] font-bold uppercase tracking-widest block mb-1">
                SHILPA'S GYM ATMOSPHERE // KHARDAHA
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-tight">
                THE BEST MACHINES GIVE THE BEST FEELING.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F5F2EA]/90 font-mono max-w-sm">
              Air-conditioned workout floor, motivating music, friendly members, and pristine hygiene.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
