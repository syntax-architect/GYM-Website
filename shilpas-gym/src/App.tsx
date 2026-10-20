import { useState, useEffect, lazy, Suspense } from 'react';
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroMaster } from './components/sections/HeroMaster';
import { KineticTicker } from './components/ui/KineticTicker';
import { KineticCursor } from './components/ui/KineticCursor';
import { MomentumFilm } from './components/sections/MomentumFilm';
import { SignatureScroll } from './components/sections/SignatureScroll';
import { DisciplinesMatrix } from './components/sections/DisciplinesMatrix';
import { useCmsStore, applyThemeToDom } from './store/cmsStore';

// Code-split below-the-fold heavy modules for instant FCP & minimal critical JS bundle
const PlateBiomechanicsCalculator = lazy(() => import('./components/sections/PlateBiomechanicsCalculator'));
const TiltedGridHeroSection = lazy(() => import('./components/sections/TiltedGridHeroSection'));
const TransformationVisualizer = lazy(() => import('./components/sections/TransformationVisualizer'));
const ClassFinder = lazy(() => import('./components/sections/ClassFinder'));
const MembershipTiers = lazy(() => import('./components/sections/MembershipTiers'));
const StudioLiveTelemetry = lazy(() => import('./components/sections/StudioLiveTelemetry'));
const CoachingAction = lazy(() => import('./components/sections/CoachingAction'));
const TimetableBooking = lazy(() => import('./components/sections/TimetableBooking'));
const ClosingPortal = lazy(() => import('./components/sections/ClosingPortal'));
const InquiryDrawer = lazy(() => import('./components/sections/InquiryDrawer'));
const AdminPortalModal = lazy(() => import('./components/admin/AdminPortalModal'));

export function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const brand = useCmsStore((s) => s.brand);
  const loadFromSupabase = useCmsStore((s) => s.loadFromSupabase);

  useEffect(() => {
    // Apply live theme tokens to DOM root variables
    applyThemeToDom(brand);
  }, [brand]);

  useEffect(() => {
    // Attempt hydration from Supabase if connected
    loadFromSupabase();
  }, [loadFromSupabase]);

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

        {/* Global Navigation Header (Eager) */}
        <Header onOpenInquiry={() => handleOpenInquiry()} />

        {/* Main Experience Canvas */}
        <main className="flex-1 w-full">
          {/* Scene 01: Hero Master (Eager for instant FCP & LCP) */}
          <HeroMaster onOpenInquiry={() => handleOpenInquiry()} />

          {/* Kinetic Live Telemetry Ribbon (Eager) */}
          <KineticTicker />

          {/* Scene 02: Momentum Film (Eager) */}
          <div id="momentum">
            <MomentumFilm />
          </div>

          {/* Scene 03: 3D Signature Sequence (Progressive 2-Stage Frame Preloader) */}
          <SignatureScroll />

          {/* Scene 04: Training Modes (Four Editorial Pillars) */}
          <DisciplinesMatrix onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

          {/* Below-the-fold modules lazy-loaded via React.lazy & Suspense */}
          <Suspense fallback={null}>
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
          </Suspense>
        </main>

        {/* Global Architectural Footer */}
        <Footer onOpenInquiry={() => handleOpenInquiry()} />

        {/* Initiation & Booking Drawer + Admin Control Center Modal (Lazy Loaded) */}
        <Suspense fallback={null}>
          <InquiryDrawer
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
            selectedPlan={selectedPlan}
          />
          <AdminPortalModal />
        </Suspense>
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
