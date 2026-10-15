import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
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
    { label: 'Beauty & Salon', href: '#salon' },
    { label: 'Equipment', href: '#signature' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F2EA]/95 backdrop-blur-md border-b border-[#20231F]/10 py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 rounded-sm bg-[#20231F] text-[#F5F2EA] flex items-center justify-center font-display font-extrabold text-lg group-hover:bg-[#FF6747] transition-colors">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-tight text-[#20231F] uppercase group-hover:text-[#FF6747] transition-colors">
                SHILPA'S
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
            </div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#20231F]/60 -mt-0.5">
              GYM & BEAUTY SALON • KHARDAHA
            </span>
          </div>
        </a>

        {/* Clean Luxury Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-sans font-semibold text-[#20231F]/75 hover:text-[#FF6747] transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Utility Bar: Direct Hotline + Audio + Initiation CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:07439761994"
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#20231F]/10 text-xs font-mono font-bold text-[#20231F] hover:border-[#FF6747] hover:text-[#FF6747] shadow-xs transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#174D3B] animate-pulse" />
            <span>074397 61994</span>
          </a>

          <AudioExperienceController />

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenInquiry}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            BOOK SESSION
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <AudioExperienceController className="scale-90" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#20231F] hover:bg-[#20231F]/5 rounded-sm transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F2EA]/98 backdrop-blur-xl border-b border-[#20231F]/10 px-6 py-8 shadow-sculptural">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-base font-display uppercase tracking-wider text-[#20231F] hover:text-[#FF6747] border-b border-[#20231F]/10"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4">
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
