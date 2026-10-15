import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';

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

export const CoachingAction: React.FC = () => {
  return (
    <section id="reviews" className="w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA]">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          title="Verified Community Reviews."
          description="Rated 4.7 out of 5 across 355+ verified Google reviews. Members consistently praise our motivating floor atmosphere, calibrated machinery, and private salon suite in Rahara, Khardaha."
        />

        {/* Asymmetric Editorial Reviews Showcase (Bans generic icon-cards pattern) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch">
          {/* Featured Large Testimony */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-sm font-bold text-[#FF6747] uppercase tracking-normal">
                  Featured Review
                </span>
                <span className="text-sm font-semibold text-[#174D3B] bg-[#EDE9DF] px-3 py-1 rounded-xs">
                  {FEATURED_REVIEW.rating} Rating
                </span>
              </div>

              <blockquote className="text-xl sm:text-2xl font-display font-bold text-[#20231F] leading-snug mb-6">
                "{FEATURED_REVIEW.comment}"
              </blockquote>

              <p className="text-base text-[#4E534B] leading-relaxed mb-8">
                Recognized for imported biomechanical machines and dedicated salon privacy in Rahara.
              </p>
            </div>

            <div className="pt-6 bg-[#FAF8F4] -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-6 sm:p-8 rounded-b-sm">
              <span className="block text-base font-bold text-[#20231F]">
                {FEATURED_REVIEW.name}
              </span>
              <span className="block text-sm text-[#4E534B] mt-0.5">
                {FEATURED_REVIEW.role} · Verified Google Review
              </span>
            </div>
          </div>

          {/* Secondary Stacked Reviews */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {SECONDARY_REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="bg-white p-8 rounded-sm flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-sm font-bold text-[#20231F]">
                      "{rev.highlight}"
                    </span>
                    <span className="text-sm font-medium text-[#174D3B] bg-[#EDE9DF] px-2.5 py-1 rounded-xs">
                      {rev.rating} Verified
                    </span>
                  </div>

                  <p className="text-base text-[#4E534B] leading-relaxed mb-6">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 bg-[#FAF8F4] -mx-8 -mb-8 p-5 rounded-b-sm flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-bold text-[#20231F]">
                      {rev.name}
                    </span>
                    <span className="block text-sm text-[#4E534B]">
                      {rev.role}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#FF6747]">
                    Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Instructors & Aestheticians */}
        <div>
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-[#20231F] tracking-tight">
              Floor Coaches & Master Aestheticians
            </h3>
            <p className="mt-2 text-base text-[#4E534B]">
              Direct floor coaching and certified salon care from experienced instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => (
              <div key={trainer.name} className="bg-white rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="aspect-[4/3] w-full bg-[#20231F] overflow-hidden">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm uppercase font-bold text-[#FF6747] block mb-1">
                    {trainer.specialty}
                  </span>
                  <h4 className="text-lg font-display font-bold text-[#20231F]">
                    {trainer.name}
                  </h4>
                  <p className="text-sm text-[#4E534B] mt-1">
                    {trainer.role}
                  </p>
                  <span className="inline-block mt-4 text-sm bg-[#EDE9DF] px-3 py-1 rounded-xs font-medium text-[#20231F]">
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
