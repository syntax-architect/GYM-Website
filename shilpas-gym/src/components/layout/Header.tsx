import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { AudioExperienceController } from '../ui/AudioExperienceController';

export interface HeaderProps {
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Gym & Fitness', href: '#disciplines' },
    { label: 'Beauty & Salon', href: '#disciplines' },
    { label: '3D Equipment', href: '#signature' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#F5F2EA]/98 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer" aria-label="Shilpa's Gym & Beauty Salon Home">
          <div className="w-10 h-10 rounded-sm bg-[#20231F] text-[#F5F2EA] flex items-center justify-center font-display font-black text-xl group-hover:bg-[#FF6747] transition-colors">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-[#20231F] uppercase group-hover:text-[#FF6747] transition-colors">
                SHILPA'S
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF6747]" />
            </div>
            <span className="block text-sm text-[#20231F]/70 font-medium">
              Gym & Salon · Khardaha, Kolkata
            </span>
          </div>
        </a>

        {/* Clean Luxury Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-sans font-semibold text-[#20231F]/80 hover:text-[#FF6747] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Utility Bar: Direct Hotline + Audio + Initiation CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:07439761994"
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#EDE9DF] text-sm font-bold text-[#20231F] hover:bg-[#FF6747] hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="tabular-nums">074397 61994</span>
          </a>

          <AudioExperienceController />

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenInquiry}
            icon={<ArrowUpRight className="w-4 h-4" />}
          >
            BOOK VISIT
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <AudioExperienceController className="scale-90" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#20231F] bg-[#EDE9DF] rounded-sm transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F2EA] px-6 py-8">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-base font-display font-bold uppercase tracking-wide text-[#20231F] hover:text-[#FF6747] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:07439761994"
                className="flex items-center justify-center gap-2 py-3 bg-[#EDE9DF] rounded-sm text-sm font-bold text-[#20231F]"
              >
                <Phone className="w-4 h-4 text-[#FF6747]" />
                <span className="tabular-nums">CALL 074397 61994</span>
              </a>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                BOOK GYM / SALON VISIT
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
