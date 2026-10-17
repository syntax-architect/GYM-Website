import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Sparkles } from 'lucide-react';
import { TestimonialCarousel, type Testimonial } from '@/components/ui/testimonial';

interface GoogleReview {
  name: string;
  role: string;
  rating: string;
  comment: string;
  highlight: string;
}

const FEATURED_REVIEW: GoogleReview = {
  name: 'Shukdeb Ghosh',
  role: 'Local Guide · 68 reviews · 368 photos',
  rating: '5.0 / 5.0',
  comment: 'Exceptional facility available here. They have all latest imported equipment for gym workouts. Trainers are very helpful and experienced. Also they have a separate unisex salon section.',
  highlight: 'Modern facility & separate salon',
};

const SECONDARY_REVIEWS: GoogleReview[] = [
  {
    name: 'Sanket Jaiswal',
    role: 'Local Guide · 5 reviews · 2 photos',
    rating: '5.0 / 5.0',
    comment: 'A great place to workout with good ambience. Trainers are supportive and helpful with lifting form and discipline.',
    highlight: 'Good ambience & supportive trainers',
  },
  {
    name: 'Avramouli S.',
    role: 'Local Guide · 17 reviews · 45 photos',
    rating: '5.0 / 5.0',
    comment: 'Ambience is very nice. Staff behaviour was polite and professional. The salon services I took were top quality. Thank you.',
    highlight: 'Polite staff & quality salon care',
  },
];

const TRAINERS = [
  {
    name: 'Coach Rajesh Sen',
    role: 'Head Biomechanics & Strength',
    avatar: '/assets/showcase/shilpas_gym_strength.jpg',
    experience: '8+ Years Experience',
    specialty: 'Biomechanics & Calibrated Racks',
  },
  {
    name: 'Coach Priya Mukherjee',
    role: "Senior Women's Fitness & Posture",
    avatar: '/assets/showcase/shilpas_gym_athlete.jpg',
    experience: '6+ Years Experience',
    specialty: 'Progressive Overload & Nutrition',
  },
  {
    name: 'Shilpa Roy',
    role: 'Founder & Master Aesthetician',
    avatar: '/assets/showcase/shilpas_salon_glamour.jpg',
    experience: '10+ Years Experience',
    specialty: 'HD Bridal Makeovers & Styling',
  },
  {
    name: 'Tania Roy',
    role: 'Senior Hair Spa & Keratin Specialist',
    avatar: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    experience: '7+ Years Experience',
    specialty: 'Formaldehyde-Free Hair Botox & Spa',
  },
];

const TRAINER_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Coach Rajesh Sen',
    role: 'Head Biomechanics & Strength',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
    description: 'Calibrated form over ego. We guide every member on precision posture, joint safety, and progressive overload.',
  },
  {
    id: 2,
    name: 'Coach Priya Mukherjee',
    role: "Senior Women's Fitness & Posture",
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80',
    description: 'A welcoming, supportive environment where everyone feels confident lifting weights and hitting their target body composition.',
  },
  {
    id: 3,
    name: 'Shilpa Roy',
    role: 'Founder & Master Aesthetician',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    description: 'Strength on the training floor paired with rejuvenating salon care. Total physical wellness and self-confidence under one roof.',
  },
  {
    id: 4,
    name: 'Tania Roy',
    role: 'Senior Hair Spa & Keratin Specialist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    description: 'Premium treatments, hygienic suites, and restorative self-care designed to revitalize you after intense workouts.',
  },
];

export const CoachingAction: React.FC = () => {
  return (
    <section id="reviews" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          tag="Verified Member Proof"
          title="Google Verified Community."
          description="Rated 4.7 out of 5 across 355+ Google reviews. Members consistently praise our motivating floor atmosphere, calibrated machinery, and private salon suite in Rahara, Khardaha."
        />

        {/* Asymmetric Editorial Reviews Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch">
          {/* Featured Large Testimony */}
          <div className="lg:col-span-5 p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-3xl shadow-md">
            <div className="bg-white p-7 sm:p-9 rounded-[calc(1.5rem-0.25rem)] flex flex-col justify-between h-full shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6747]/10 text-xs font-bold text-[#FF6747] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
                    <span>Featured Review</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#174D3B] bg-[#EDE9DF] px-3 py-1 rounded-full">
                    {FEATURED_REVIEW.rating} Rating
                  </span>
                </div>

                <blockquote className="text-xl sm:text-2xl font-display font-extrabold text-[#20231F] leading-snug mb-5">
                  "{FEATURED_REVIEW.comment}"
                </blockquote>

                <p className="text-xs sm:text-sm text-[#4E534B] leading-relaxed mb-8">
                  Imported biomechanical lines paired with dedicated salon privacy in Rahara.
                </p>
              </div>

              <div className="pt-5 bg-[#FAF8F4] -mx-7 sm:-mx-9 -mb-7 sm:-mb-9 p-6 sm:p-7 rounded-b-[calc(1.5rem-0.25rem)] border-t border-[#20231F]/5">
                <span className="block text-base font-extrabold text-[#20231F]">
                  {FEATURED_REVIEW.name}
                </span>
                <span className="block text-xs text-[#4E534B] mt-0.5 font-medium">
                  {FEATURED_REVIEW.role} · Verified Google Review
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Reviews */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {SECONDARY_REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="bg-white p-7 sm:p-8 rounded-2xl border-2 border-[#20231F]/10 hover:border-[#FF6747]/40 shadow-xs hover:shadow-md flex-1 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-sm font-extrabold text-[#20231F] uppercase tracking-tight">
                      "{rev.highlight}"
                    </span>
                    <span className="text-xs font-bold text-[#174D3B] bg-[#EDE9DF] px-3 py-1 rounded-full">
                      {rev.rating} Verified
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#4E534B] leading-relaxed mb-6">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#20231F]/5 flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-bold text-[#20231F]">
                      {rev.name}
                    </span>
                    <span className="block text-xs text-[#4E534B]">
                      {rev.role}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#FF6747] uppercase tracking-wider">
                    Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Trainer & Coach Profile Deck */}
        <div className="mb-20 bg-white border-2 border-[#20231F]/10 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
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
                Drag, swipe, or use arrows to discover individual coach specializations, philosophy quotes, and on-floor guidance at Shilpa's Gym & Salon.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#20231F]/70 bg-[#FAF8F4] px-4 py-2 rounded-full border border-[#20231F]/10">
              <span className="w-2 h-2 rounded-full bg-[#174D3B]" />
              <span>Certified Unisex Trainers & Senior Aestheticians</span>
            </div>
          </div>

          <TestimonialCarousel
            testimonials={TRAINER_TESTIMONIALS}
            showArrows={true}
            showDots={true}
            className="py-6"
          />
        </div>

        {/* Lead Instructors & Aestheticians */}
        <div>
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-[#20231F] tracking-tight">
              Floor Coaches & Master Aestheticians
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#4E534B]">
              Direct floor coaching and certified salon care from experienced instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => (
              <div key={trainer.name} className="bg-white rounded-2xl border-2 border-[#20231F]/10 hover:border-[#FF6747]/40 shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300">
                <div className="aspect-[4/3] w-full bg-[#20231F] overflow-hidden">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase font-extrabold text-[#FF6747] tracking-wider block mb-1">
                    {trainer.specialty}
                  </span>
                  <h4 className="text-lg font-display font-extrabold text-[#20231F] uppercase tracking-tight">
                    {trainer.name}
                  </h4>
                  <p className="text-xs text-[#4E534B] mt-1">
                    {trainer.role}
                  </p>
                  <span className="inline-block mt-4 text-xs bg-[#EDE9DF] px-3 py-1 rounded-full font-bold text-[#20231F]">
                    {trainer.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
