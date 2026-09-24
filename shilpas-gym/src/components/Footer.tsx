import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gym-charcoal text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="w-16 h-16 rounded-sm bg-gym-orange flex items-center justify-center mx-auto mb-8">
            <span className="text-black font-black text-3xl">S</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">JOIN THE INNER CIRCLE</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest max-w-md mx-auto mb-8 text-sm">
            Subscribe for priority class reservations, exclusive acoustic weekend sessions, and VIP gym events.
          </p>
          
          <div className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-gym-charcoalLight border border-white/10 rounded-l-sm px-6 py-4 w-full focus:outline-none focus:border-gym-orange transition-colors text-white font-bold tracking-widest text-sm"
            />
            <button className="bg-gym-orange text-black font-black uppercase tracking-widest px-8 rounded-r-sm hover:bg-gym-orangeHover transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-gym-orange transition-colors">TERMS</a>
            <a href="#" className="hover:text-gym-orange transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-gym-orange transition-colors">CONTACT</a>
          </div>
          <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SHILPA'S GYM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
