import { useState } from 'react';
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroMaster } from './components/sections/HeroMaster';
import { KineticTicker } from './components/ui/KineticTicker';
import { KineticCursor } from './components/ui/KineticCursor';
import { MomentumFilm } from './components/sections/MomentumFilm';
import { SignatureScroll } from './components/sections/SignatureScroll';
import { DisciplinesMatrix } from './components/sections/DisciplinesMatrix';
import { PlateBiomechanicsCalculator } from './components/sections/PlateBiomechanicsCalculator';
import { TiltedGridHeroSection } from './components/sections/TiltedGridHeroSection';
import { TransformationVisualizer } from './components/sections/TransformationVisualizer';
import { ClassFinder } from './components/sections/ClassFinder';
import { MembershipTiers } from './components/sections/MembershipTiers';
import { StudioLiveTelemetry } from './components/sections/StudioLiveTelemetry';
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
      <div className="min-h-[100svh] bg-[#F5F2EA] text-[#0D0D0E] font-sans selection:bg-[#D9381E] selection:text-white flex flex-col antialiased">
        {/* Kinetic Follower Cursor for Desktop */}
        <KineticCursor />

        {/* Global Navigation Header */}
        <Header onOpenInquiry={() => handleOpenInquiry()} />

        {/* Main Experience Canvas */}
        <main className="flex-1 w-full">
          {/* Scene 01: Hero Master */}
          <HeroMaster onOpenInquiry={() => handleOpenInquiry()} />

          {/* Kinetic Live Telemetry Ribbon */}
          <KineticTicker />

          {/* Scene 02: Momentum Film */}
          <div id="momentum">
            <MomentumFilm />
          </div>

          {/* Scene 03: 3D Signature Sequence (Pinned 180vh Pure Sticky Canvas) */}
          <SignatureScroll />

          {/* Scene 04: Training Modes (Four Editorial Pillars) */}
          <DisciplinesMatrix onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Scene 05: Interactive Barbell Plate & 1RM Biomechanics Lab */}
          <PlateBiomechanicsCalculator onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Perspective Cinema: 3D Tilted Grid Hero (Dual Sanctuary Stream) */}
          <TiltedGridHeroSection onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Scene 06: Interactive Client Transformations (Split-Screen Comparison) */}
          <TransformationVisualizer onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Scene 07: Class Finder (Interactive 3-Question Decision Engine) */}
          <ClassFinder onSelectClass={(className) => handleOpenInquiry(className)} />

          {/* Scene 08: Membership (Transparent Pricing & Terms) */}
          <MembershipTiers onSelectTier={(tierName) => handleOpenInquiry(tierName)} />

          {/* Scene 09: Real-Time Studio Capacity & Hourly Rush Curve */}
          <div id="live-telemetry">
            <StudioLiveTelemetry onOpenInquiry={() => handleOpenInquiry()} />
          </div>

          {/* Scene 10: Coaches & Community */}
          <CoachingAction />

          {/* Scene 11: Timetable & Booking */}
          <TimetableBooking onBookClass={handleBookClass} />

          {/* Scene 12: Final Closing Portal */}
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
