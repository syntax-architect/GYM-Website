import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { Sparkles, Dumbbell, Scissors, ArrowRight } from "lucide-react";

// Curated high-resolution fitness, strength, and beauty studio imagery
// blending Shilpa's Gym & Salon dual experience
const IMAGES = [
  {
    src: "/assets/showcase/shilpas_gym_strength.jpg",
    alt: "Athletic Indian athlete barbell strength training in warm amber gym studio",
  },
  {
    src: "/assets/showcase/shilpas_salon_glamour.jpg",
    alt: "Luxury bridal makeover and makeup artistry in opulent beauty studio",
  },
  {
    src: "/assets/showcase/shilpas_gym_athlete.jpg",
    alt: "Confident athletic woman conditioning with dumbbells in premium gym",
  },
  {
    src: "/assets/showcase/shilpas_salon_hair_spa.jpg",
    alt: "Professional hair spa, keratin treatment, and styling in aesthetic salon",
  },
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern gym equipment and barbell racks in cinematic lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    alt: "Elegant luxury beauty salon interior with golden mirrors",
  },
  {
    src: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    alt: "Functional fitness battle rope workout",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    alt: "Radiant skincare and professional makeup application",
  },
  {
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
    alt: "Bodybuilder performing dumbbell curls",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    alt: "Aesthetic spa wellness and hair styling treatment",
  },
];

export function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={IMAGES}
      className="h-[580px] w-full rounded-2xl border border-white/10 bg-[#161815] shadow-2xl overflow-hidden"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 px-4 text-center">
        {/* Floating pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium tracking-widest text-[#FF6747] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6747]" />
          <span>Curved Perspective • 3D Cylindrical Hero</span>
        </div>

        {/* Center Headline */}
        <div className="px-6 max-w-3xl">
          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-md">
            Every discipline,
            <br />
            <span className="bg-gradient-to-r from-[#FF6747] via-[#FF8A65] to-[#E3E879] bg-clip-text text-transparent">
              curved into focus.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Streaming visual cylinders merging heavy iron training, functional conditioning,
            and luxury bridal salon artistry in Khardaha, Kolkata.
          </p>
        </div>

        {/* Bottom Details & CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/90">
            <Dumbbell className="w-4 h-4 text-[#FF6747]" />
            <span>Unisex Training Studio</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/90">
            <Scissors className="w-4 h-4 text-[#E3E879]" />
            <span>Luxury Beauty Salon</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6747] hover:bg-[#e05638] text-white text-xs font-medium transition-colors shadow-lg shadow-[#FF6747]/20">
            <span>Explore Experience</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </TiltedGridHero>
  );
}

export default TiltedGridHeroDemo;
