import React from 'react';
import { GlobalNavigation } from './components/GlobalNavigation';
import { Hero6040 } from './components/Hero6040';
import { AtmosphereMetrics } from './components/AtmosphereMetrics';
import { ClassSchedule } from './components/ClassSchedule';
import { EliteTrainers } from './components/EliteTrainers';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { BookingModal } from './components/BookingModal';

function App() {
  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen font-sans selection:bg-gold selection:text-[#0a0a0a]">
      <GlobalNavigation />
      
      <main>
        <Hero6040 />
        <AtmosphereMetrics />
        <ClassSchedule />
        <EliteTrainers />
        <Gallery />
      </main>
      
      <Footer />
      
      <CartSidebar />
      <BookingModal />
    </div>
  );
}

export default App;
