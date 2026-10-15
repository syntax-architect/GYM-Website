import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { ShoppingCart } from 'lucide-react';

export const GlobalNavigation: React.FC = () => {
  const { openBooking, openCart, cartItems } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={`fixed w-full top-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-black border-b border-white/10' : 'bg-transparent'}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-sm bg-gym-orange flex items-center justify-center">
          <span className="text-black font-black text-xl leading-none">S</span>
        </div>
        <span className="text-xl font-black tracking-tighter uppercase text-white hidden sm:block">SHILPA'S GYM</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-gray-400">
        <a href="#about" className="hover:text-gym-orange transition-colors">ABOUT</a>
        <a href="#facilities" className="hover:text-gym-orange transition-colors">FACILITIES</a>
        <a href="#memberships" className="hover:text-gym-orange transition-colors">MEMBERSHIPS</a>
      </nav>

      <div className="flex items-center gap-6">
        <button onClick={openCart} className="relative text-gray-400 hover:text-gym-orange transition-colors">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gym-orange text-black text-[10px] font-black w-5 h-5 rounded-sm flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={openBooking}
          className="border-2 border-gym-orange text-gym-orange hover:bg-gym-orange hover:text-black font-black py-2 px-6 rounded-sm text-sm uppercase tracking-widest transition-colors"
        >
          BOOK TRIAL
        </button>
      </div>
    </header>
  );
};
