import React from 'react';
import { ArrowUpRight, MapPin, Clock, Phone, ShieldCheck, Star, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0F3226] via-[#143D2F] to-[#0A2219] text-[#F5F2EA] pt-20 pb-12 overflow-hidden border-t border-white/10">
      {/* Architectural Ambient Lighting & Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#8177FF]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-[#FF6747]/8 blur-[130px] pointer-events-none" />

      {/* Massive Architectural Watermark in Background */}
      <div 
        aria-hidden="true"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[16vw] font-display font-black text-white/[0.025] uppercase tracking-tighter whitespace-nowrap leading-none"
      >
        SHILPA'S
      </div>

      <Container>
        {/* Top Pre-Footer Luxury Card */}
        <div className="relative z-10 bg-white/[0.04] backdrop-blur-xl border border-white/12 rounded-2xl p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6747]/20 border border-[#FF6747]/30 text-xs font-mono font-bold text-[#FF6747] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747] animate-pulse" />
                  Khardaha & Rahara's #1 Rated Destination
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-[#DDE8F8]/80">
                  <span className="text-[#FF6747]">★★★★★</span>
                  <span className="font-bold text-white">4.7</span> (355+ Google Reviews)
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F5F2EA] leading-[1.05]">
                WHERE FITNESS MEETS <span className="text-[#FF6747] italic font-normal">GLAMOUR.</span>
              </h2>

              <p className="text-[#DDE8F8]/85 text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed">
                শিল্পা'জ জিম এন বিউটি সালোঁ — Modern imported workout equipment, certified personal trainers, 
                and a private luxury salon for keratin hair smoothing and bridal makeup. All under one roof.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenInquiry}
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-center justify-center font-bold tracking-wider"
              >
                BOOK FREE VISIT / TRIAL
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:07439761994"
                  className="flex-1 sm:flex-none px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold text-white transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF6747]" />
                  <span>074397 61994</span>
                </a>

                <a
                  href="https://wa.me/917439761994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-xs font-mono font-bold text-[#25D366] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Four Refined Luxury Columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Inclusivity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-md bg-[#FF6747] text-white flex items-center justify-center font-display font-black text-base shadow-md">
                  S
                </div>
                <span className="font-display font-extrabold text-2xl text-[#F5F2EA] tracking-tight uppercase">
                  SHILPA'S
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
              </div>
              <span className="font-mono text-xs text-[#8177FF] uppercase tracking-widest font-bold block">
                GYM & BEAUTY SALON
              </span>
              <span className="text-xs text-[#DDE8F8]/70 font-sans block mt-0.5">
                শিল্পা'জ জিম এন বিউটি সালোঁ • Khardaha, Kolkata
              </span>
            </div>

            <p className="text-sm text-[#DDE8F8]/80 leading-relaxed font-sans font-normal">
              A modern, air-conditioned unisex fitness studio paired with a private beauty salon. 
              Built on community respect, expert guidance, and inclusive care.
            </p>

            {/* Social Trust Badges */}
            <div className="space-y-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs text-white">
                <div className="flex text-[#FF6747] gap-0.5 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="font-bold">4.7 / 5.0</span>
                <span className="text-[#DDE8F8]/60">• 355+ Google Ratings</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#174D3B] text-[#DDE8F8] border border-white/10 font-mono text-[11px]">
                  <Heart className="w-3 h-3 text-[#FF6747]" /> Women-Owned
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#174D3B] text-[#DDE8F8] border border-white/10 font-mono text-[11px]">
                  <ShieldCheck className="w-3 h-3 text-[#8177FF]" /> LGBTQ+ Friendly
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Unisex Fitness & Gym (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider pb-1 border-b border-white/10 flex items-center justify-between">
              <span>UNISEX GYM</span>
              <span className="text-[#FF6747] font-mono text-[10px]">FITNESS</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#DDE8F8]/80">
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF6747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Biomechanical Muscle Machinery</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF6747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Free Weights, Squat & Bench Racks</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF6747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>1-on-1 Personal Trainer Batches</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF6747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Targeted Fat Loss & Cardio Line</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF6747] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Certified Male & Female Coaches</span>
                </a>
              </li>
              <li>
                <a href="#memberships" className="hover:text-[#FF6747] text-white font-medium transition-colors flex items-center gap-2 pt-1">
                  <span>View Membership Plans (From ₹1,199) →</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Beauty Salon & Makeup Studio (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider pb-1 border-b border-white/10 flex items-center justify-between">
              <span>SALON & SPA</span>
              <span className="text-[#8177FF] font-mono text-[10px]">GLAMOUR</span>
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-[#DDE8F8]/80">
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#8177FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Keratin Hair Smoothing</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#8177FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Hair Botox & Protein Spa</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#8177FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>HD Bridal Makeup Artistry</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#8177FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Party & Reception Looks</span>
                </a>
              </li>
              <li>
                <a href="#disciplines" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-[#8177FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Aesthetic Facial & Skin Grooming</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#8177FF] text-white font-medium transition-colors flex items-center gap-2 pt-1">
                  <span>Read Client Reviews →</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Operating Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider pb-1 border-b border-white/10 flex items-center justify-between">
              <span>VISIT US</span>
              <span className="text-[#FF6747] font-mono text-[10px]">OPEN DAILY</span>
            </h4>
            
            <div className="space-y-3.5 text-xs text-[#DDE8F8]/90 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6747] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Shilpa's Gym & Beauty Salon</p>
                  <p className="text-[#DDE8F8]/70 leading-relaxed mt-0.5">
                    Naskarhat Madhya Para, Cooperative Colony, Halder Bagan, Rahara, Khardaha, Kolkata 700118
                  </p>
                  <a
                    href="https://maps.google.com/?q=P9FM%2B6V+Rahara,+Kolkata,+West+Bengal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#FF6747] font-mono text-[11px] font-bold mt-1 hover:underline"
                  >
                    <span>Plus Code: P9FM+6V Rahara</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-white/10">
                <Clock className="w-4 h-4 text-[#8177FF] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Opening Hours</p>
                  <p className="text-[#DDE8F8]/80 mt-0.5">Monday – Sunday: 06:00 AM – 10:00 PM</p>
                  <p className="text-[#DDE8F8]/60 text-[11px] font-mono">Open 7 days a week</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 border-t border-white/10">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <div>
                  <span className="block text-[11px] text-[#DDE8F8]/60 uppercase font-mono">Inquiries & Bookings</span>
                  <a href="tel:07439761994" className="font-bold text-sm text-white hover:text-[#FF6747] transition-colors">
                    074397 61994
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Verification & Back-To-Top */}
        <div className="relative z-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#DDE8F8]/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center md:text-left">
            <span>© {new Date().getFullYear()} Shilpa's Gym & Beauty Salon (শিল্পা'জ জিম এন বিউটি সালোঁ).</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>All Rights Reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Khardaha & Rahara, Kolkata 700118</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-[#FF6747] font-bold hidden lg:inline">
              4.7 ★★★★★ (355+ GOOGLE REVIEWS)
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
              title="Return to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
