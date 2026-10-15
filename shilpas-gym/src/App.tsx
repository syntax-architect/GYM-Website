import { useState } from 'react';
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroMaster } from './components/sections/HeroMaster';
import { MomentumFilm } from './components/sections/MomentumFilm';
import { SignatureScroll } from './components/sections/SignatureScroll';
import { DisciplinesMatrix } from './components/sections/DisciplinesMatrix';
import { TiltedGridHeroSection } from './components/sections/TiltedGridHeroSection';
import { ClassFinder } from './components/sections/ClassFinder';
import { MembershipTiers } from './components/sections/MembershipTiers';
import { CoachingAction } from './components/sections/CoachingAction';
import { TimetableBooking } from './components/sections/TimetableBooking';
import { ClosingPortal } from './components/sections/ClosingPortal';
import { InquiryDrawer } from './components/sections/InquiryDrawer';

export function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (plan?: string) => {
    setSelectedPlan(plan);
    setInquiryOpen(true);
  };

  const handleBookClass = (sessionTitle: string, time: string, coach: string) => {
    setSelectedPlan(`${sessionTitle} (${time} with ${coach})`);
    setInquiryOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F5F2EA] text-[#20231F] font-sans selection:bg-[#FF6747] selection:text-white flex flex-col antialiased">
        {/* Global Navigation Header */}
        <Header onOpenInquiry={() => handleOpenInquiry()} />

        {/* Main Experience Canvas */}
        <main className="flex-1 w-full">
          {/* Scene 01: Hero Master */}
          <HeroMaster onOpenInquiry={() => handleOpenInquiry()} />

          {/* Scene 02: Momentum Film */}
          <div id="momentum">
            <MomentumFilm />
          </div>

          {/* Scene 03: 3D Signature Sequence (Pinned 180vh Pure Sticky Canvas) */}
          <SignatureScroll />

          {/* Scene 04: Training Modes (Four Editorial Pillars) */}
          <DisciplinesMatrix onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Perspective Cinema: 3D Tilted Grid Hero (Dual Sanctuary Stream) */}
          <TiltedGridHeroSection onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Scene 05: Class Finder (Interactive 3-Question Decision Engine) */}
          <ClassFinder onSelectClass={(className) => handleOpenInquiry(className)} />

          {/* Scene 06: Membership (Transparent Pricing & Terms) */}
          <MembershipTiers onSelectTier={(tierName) => handleOpenInquiry(tierName)} />

          {/* Scene 07: Coaches & Community */}
          <CoachingAction />

          {/* Scene 08: Timetable & Booking */}
          <TimetableBooking onBookClass={handleBookClass} />

          {/* Scene 09: Final Closing Portal */}
          <ClosingPortal onOpenInquiry={() => handleOpenInquiry()} />
        </main>

        {/* Global Architectural Footer (Botanical Contrast Grounding) */}
        <Footer onOpenInquiry={() => handleOpenInquiry()} />

        {/* Initiation & Booking Drawer */}
        <InquiryDrawer
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          selectedPlan={selectedPlan}
        />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
