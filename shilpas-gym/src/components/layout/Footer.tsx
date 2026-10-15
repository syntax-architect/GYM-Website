import React from 'react';
import { ArrowUpRight, Phone, MessageCircle, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer className="relative bg-[#174D3B] text-[#F5F2EA] pt-20 pb-12 overflow-hidden">
      <Container>
        {/* Pre-Footer Conversion Callout */}
        <div className="relative z-10 bg-[#0E3327] rounded-sm p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-sm font-bold text-[#FF6747] block">
                Rated 4.7 across 355+ Google reviews · Rahara & Khardaha
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#F5F2EA] leading-[1.05]">
                Where Fitness Meets Glamour.
              </h2>

              <p className="text-[#DDE8F8] text-base sm:text-lg max-w-2xl font-sans font-normal leading-relaxed">
                শিল্পা'জ জিম এন বিউটি সালোঁ — Imported workout equipment, certified personal trainers, 
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
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xs bg-white/10 hover:bg-white/20 text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF6747]" />
                  <span className="tabular-nums">074397 61994</span>
                </a>

                <a
                  href="https://wa.me/917439761994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xs bg-[#25D366] hover:bg-[#1EBE5D] text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16">
          {/* Column 1: Brand & Community */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#FF6747] text-white flex items-center justify-center font-display font-black text-lg">
                S
              </div>
              <span className="font-display font-extrabold text-2xl text-[#F5F2EA] tracking-tight uppercase">
                SHILPA'S
              </span>
            </div>

            <p className="text-sm text-[#DDE8F8] leading-relaxed font-sans font-normal">
              A modern, air-conditioned unisex fitness floor paired with a private beauty salon wing in Rahara, Khardaha. 
              Women-owned, LGBTQ+ welcoming, and dedicated to progressive training.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#DDE8F8]">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xs">
                <Heart className="w-3.5 h-3.5 text-[#FF6747]" /> Women-Owned
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xs">
                Verified 4.7 Google Rating
              </span>
            </div>
          </div>

          {/* Column 2: Fitness Services */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-display font-bold text-base text-[#FF6747] block">
              Gym & Fitness
            </span>
            <ul className="space-y-2 text-sm text-[#DDE8F8]">
              <li>Unisex Calibrated Strength Floor</li>
              <li>Olympic Barbell & Squat Cages</li>
              <li>1-on-1 Personal Transformation</li>
              <li>Fat Loss & Metabolic Conditioning</li>
              <li>Posture Alignment & Form Correction</li>
            </ul>
          </div>

          {/* Column 3: Beauty & Salon */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-display font-bold text-base text-[#FF6747] block">
              Salon & Spa
            </span>
            <ul className="space-y-2 text-sm text-[#DDE8F8]">
              <li>Formaldehyde-Free Keratin Smoothing</li>
              <li>Deep Protein Hair Botox & Spa</li>
              <li>High-Definition Bridal Makeovers</li>
              <li>Reception & Party Styling</li>
              <li>Unisex Facial Grooming & Skin Care</li>
            </ul>
          </div>

          {/* Column 4: Hours & Location */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-display font-bold text-base text-[#FF6747] block">
              Studio Hours
            </span>
            <div className="space-y-2 text-sm text-[#DDE8F8]">
              <p className="font-semibold text-white">Monday – Sunday</p>
              <p className="tabular-nums">06:00 AM – 10:00 PM</p>
              <p className="text-sm text-[#DDE8F8]/80 pt-2">
                Naskarhat Madhya Para, Rahara, Khardaha, Kolkata 700118
              </p>
            </div>
          </div>
        </div>

        {/* Clean Grounded Baseline */}
        <div className="relative z-10 pt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[#DDE8F8]/80">
          <span>
            © 2026 Shilpa's Gym & Beauty Salon (শিল্পা'জ জিম এন বিউটি সালোঁ). All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="#location" className="hover:text-white transition-colors">Location</a>
            <a href="#memberships" className="hover:text-white transition-colors">Pricing</a>
            <a href="#reviews" className="hover:text-white transition-colors">Google Reviews</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
