import React from 'react';
import { Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-gym-orange flex items-center justify-center">
              <span className="text-black font-black text-xl leading-none">S</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">SHILPA'S GYM</span>
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-sm leading-relaxed">
            Where state-of-the-art equipment meets bespoke personal training in a strictly premium, focused setting.
          </p>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-tighter mb-6 text-lg">LOCATION</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gym-orange shrink-0" />
              <span>123 Elite Athletics Blvd,<br/>Tech District, SV 94016</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-tighter mb-6 text-lg">CONTACT</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
            <li className="flex items-center gap-3 hover:text-gym-orange transition-colors cursor-pointer">
              <Phone className="w-5 h-5 text-gym-orange" />
              <span>+1 (555) 019-8234</span>
            </li>
            <li className="flex items-center gap-3 hover:text-gym-orange transition-colors cursor-pointer">
              <Mail className="w-5 h-5 text-gym-orange" />
              <span>TRAIN@SHILPASGYM.COM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs font-black uppercase tracking-widest">
          &copy; {new Date().getFullYear()} SHILPA'S GYM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-gym-orange transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-gray-600 hover:text-gym-orange transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};
