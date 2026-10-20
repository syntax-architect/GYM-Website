import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { AudioExperienceController } from '../ui/AudioExperienceController';
import { useCmsStore } from '../../store/cmsStore';

export interface HeaderProps {
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry }) => {
  const { brand } = useCmsStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastState = window.scrollY > 20;
    setIsScrolled(lastState);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextState = window.scrollY > 20;
          if (nextState !== lastState) {
            lastState = nextState;
            setIsScrolled(nextState);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Gym & Fitness', href: '#disciplines' },
    { label: '3D Equipment', href: '#signature' },
    { label: 'Barbell Lab', href: '#biomechanics-lab' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header className="fixed top-2.5 sm:top-5 left-0 right-0 z-50 px-2 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-[1320px] mx-auto pointer-events-auto rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled
            ? 'bg-[#F4F1EA]/90 backdrop-blur-2xl border border-[#0D0D0E]/12 shadow-[0_12px_40px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] py-2 sm:py-2.5 px-3 sm:px-6'
            : 'bg-[#F4F1EA]/75 backdrop-blur-xl border border-[#0D0D0E]/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-2.5 sm:py-3.5 px-3.5 sm:px-7'
        } flex items-center justify-between gap-2`}
      >
        {/* Brand Lockup */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0" aria-label={`${brand.gymName} Home`}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0D0D0E] text-[#F4F1EA] flex items-center justify-center font-display font-black text-base sm:text-xl group-hover:bg-[#D9381E] transition-all shadow-xs ring-1 ring-white/20">
            {brand.gymName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-lg tracking-tight text-[#0D0D0E] uppercase group-hover:text-[#D9381E] transition-colors leading-none">
                {brand.gymName.split(' ')[0]}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E]" />
            </div>
            <span className="block text-[10px] sm:text-xs text-[#0D0D0E]/70 font-medium leading-none mt-1">
              {brand.locationShort}
            </span>
          </div>
        </a>

        {/* Floating Segmented Desktop Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#0D0D0E]/5 p-1 rounded-full border border-[#0D0D0E]/5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-sans font-bold text-[#0D0D0E]/80 hover:text-[#0D0D0E] hover:bg-white/90 rounded-full px-3.5 py-1.5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Utility Bar: Direct Hotline + Audio + Initiation CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${brand.phone.replace(/[^0-9]/g, '')}`}
            className="group hidden xl:inline-flex items-center gap-2 pl-3.5 pr-4 py-1.5 rounded-full bg-white/70 hover:bg-[#0D0D0E] hover:text-[#F4F1EA] text-[11px] font-extrabold uppercase tracking-wider text-[#0D0D0E] border border-[#0D0D0E]/10 hover:border-[#0D0D0E] shadow-xs hover:shadow-md transition-all duration-300"
          >
            <span className="w-5 h-5 rounded-full bg-[#D9381E]/15 group-hover:bg-[#D9381E] flex items-center justify-center transition-colors">
              <Phone className="w-2.5 h-2.5 text-[#D9381E] group-hover:text-white transition-colors" />
            </span>
            <span className="tabular-nums">{brand.phone}</span>
          </a>

          <AudioExperienceController />

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenInquiry}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            BOOK VISIT
          </Button>
        </div>

        {/* Mobile Fast-Action Pill & Hamburger Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          {/* Quick 1-Tap Booking Pill for Mobile */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="sm:hidden px-3 py-1.5 min-h-[38px] rounded-full bg-[#D9381E] text-white font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>BOOK</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          <AudioExperienceController className="scale-85 sm:scale-90" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#0D0D0E] bg-white/90 border border-[#0D0D0E]/15 rounded-full transition-all cursor-pointer hover:bg-[#0D0D0E] hover:text-white active:scale-95 shadow-xs"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Glass Drawer Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-3 top-16 max-h-[82svh] overflow-y-auto z-50 pointer-events-auto">
          <div className="bg-[#F4F1EA]/95 backdrop-blur-2xl border border-[#0D0D0E]/15 rounded-3xl p-5 sm:p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 min-h-[44px] rounded-2xl text-sm font-display font-extrabold uppercase tracking-wider text-[#0D0D0E] hover:bg-[#0D0D0E]/5 hover:text-[#D9381E] transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-[#0D0D0E]/10 flex flex-col gap-2.5">
                <a
                  href="tel:07439761994"
                  className="flex items-center justify-center gap-2.5 py-3 px-5 min-h-[44px] bg-white border border-[#0D0D0E]/15 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-white transition-all shadow-xs active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#D9381E]" />
                  <span className="tabular-nums">CALL 074397 61994</span>
                </a>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full text-center justify-center min-h-[48px]"
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
        </div>
      )}
    </header>
  );
};

export default Header;
