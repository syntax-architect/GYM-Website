import React from 'react';
import { ArrowUpRight, MapPin, Clock, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { PULSEFORM_ASSETS } from '../../config/assets';

export interface ClosingPortalProps {
  onOpenInquiry: () => void;
}

export const ClosingPortal: React.FC<ClosingPortalProps> = ({ onOpenInquiry }) => {
  return (
    <section id="location" className="relative w-full py-28 lg:py-36 px-4 sm:px-6 lg:px-12 bg-mineral-cyclorama overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8177FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-20">
        {/* Architectural Portal Video Frame */}
        <div className="relative w-full rounded-sm overflow-hidden border border-[#20231F]/10 shadow-sculptural bg-[#FAF8F4] mb-16 group">
          <div className="aspect-[16/9] lg:aspect-[2.2/1] w-full overflow-hidden">
            <video
              src={PULSEFORM_ASSETS.V09.src}
              poster={PULSEFORM_ASSETS.I11.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#20231F]/80 via-transparent to-transparent pointer-events-none" />

          {/* Portal Caption */}
          <div className="absolute bottom-6 inset-x-6 sm:inset-x-12 flex justify-between items-end pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm border border-[#20231F]/10 shadow-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
              <span className="font-mono text-xs text-[#20231F] font-bold uppercase tracking-wider">
                SHILPA'S GYM & BEAUTY SALON // RAHARA ATELIER
              </span>
            </div>
            <span className="font-mono text-xs text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xs hidden sm:inline">
              NASKARHAT MADHYA PARA, KHARDAHA
            </span>
          </div>
        </div>

        {/* Final Conversion CTA & Physical Studio Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6747] inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#20231F]/70 font-semibold">
                ONE-STOP FITNESS & GLAMOUR // KHARDAHA
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.95]">
              STEP INTO <br />
              <span className="text-[#FF6747]">SHILPA'S STUDIO.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#4C514A] font-normal leading-relaxed max-w-xl">
              Experience the best workout atmosphere in Khardaha and Rahara. Modern imported machinery, dedicated certified trainers, and full-service salon beauty care.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenInquiry}
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                BOOK GYM / SALON VISIT
              </Button>

              <a
                href="https://maps.google.com/?q=P9FM%2B6V+Rahara,+Kolkata,+West+Bengal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-sm border border-[#20231F]/15 bg-white hover:border-[#174D3B] hover:text-[#174D3B] text-xs font-mono font-bold uppercase tracking-widest text-[#20231F] transition-all flex items-center gap-2 shadow-xs"
              >
                <MapPin className="w-4 h-4 text-[#FF6747]" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Physical Location & Hours Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-sm border border-[#20231F]/10 shadow-xs">
            <h4 className="font-display font-bold text-lg uppercase text-[#20231F] tracking-tight mb-6 pb-3 border-b border-[#20231F]/10 flex items-center justify-between">
              <span>STUDIO LOCATION</span>
              <span className="font-mono text-xs text-[#FF6747] font-bold">★ 4.7 (355+)</span>
            </h4>

            <div className="space-y-4 font-mono text-xs text-[#20231F]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF6747] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#20231F] block">SHILPA'S GYM & BEAUTY SALON</span>
                  <span>Naskarhat Madhya Para, Cooperative Colony, Halder Bagan, Rahara, Kolkata, Khardaha, West Bengal 700118</span>
                  <span className="block text-[11px] text-[#174D3B] font-bold mt-0.5">Plus Code: P9FM+6V Rahara</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#174D3B] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#20231F] block">OPENING HOURS</span>
                  <span>Monday – Sunday: 06:00 AM – 10:00 PM</span>
                  <span className="block text-[#20231F]/60">Open 7 days a week</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF6747] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#20231F] block">DIRECT PHONE / WHATSAPP</span>
                  <a href="tel:07439761994" className="hover:text-[#FF6747] transition-colors font-bold text-sm text-[#20231F]">
                    074397 61994
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#8177FF] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#20231F] block">OFFICIAL DOMAIN</span>
                  <a href="https://shilpasgymandbeautysalon.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6747] transition-colors">
                    shilpasgymandbeautysalon.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
