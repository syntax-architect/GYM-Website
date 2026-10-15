import React from 'react';
import { ArrowUpRight, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { PULSEFORM_ASSETS } from '../../config/assets';

export interface ClosingPortalProps {
  onOpenInquiry: () => void;
}

export const ClosingPortal: React.FC<ClosingPortalProps> = ({ onOpenInquiry }) => {
  return (
    <section id="location" className="relative w-full py-28 lg:py-36 px-4 sm:px-6 lg:px-12 bg-[#F5F2EA] overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-20">
        {/* Architectural Portal Video Frame */}
        <div className="relative w-full rounded-sm overflow-hidden bg-[#20231F] mb-16">
          <div className="aspect-[16/9] lg:aspect-[2.2/1] w-full overflow-hidden">
            <video
              src={PULSEFORM_ASSETS.V09.src}
              poster={PULSEFORM_ASSETS.I11.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Clean Portal Footnote */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-center bg-black/60 p-4 rounded-xs text-white">
            <span className="text-sm font-bold uppercase tracking-wide">
              Shilpa's Gym & Beauty Salon · Rahara Atelier
            </span>
            <span className="text-sm text-white/80">
              Naskarhat Madhya Para, Khardaha
            </span>
          </div>
        </div>

        {/* Final Conversion CTA & Studio Location Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold uppercase tracking-tight text-[#20231F] leading-[0.98]">
              Visit Shilpa's Studio.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#3C403A] font-normal leading-relaxed max-w-xl">
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
                className="px-7 py-4 rounded-sm bg-white hover:bg-[#174D3B] hover:text-white text-sm font-bold uppercase text-[#20231F] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#FF6747]" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>
            </div>
          </div>

          {/* Physical Location & Hours Card */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-sm">
            <div className="flex items-center justify-between mb-6 pb-4 bg-[#FAF8F4] -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 p-8 sm:p-10 rounded-t-sm">
              <h3 className="font-display font-bold text-lg uppercase text-[#20231F]">
                Studio Location
              </h3>
              <span className="text-sm text-[#174D3B] font-bold">
                Rated 4.7 (355+ Reviews)
              </span>
            </div>

            <div className="space-y-5 text-sm text-[#3C403A]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6747] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#20231F] block">SHILPA'S GYM & BEAUTY SALON</span>
                  <span className="text-sm leading-relaxed">
                    Naskarhat Madhya Para, Cooperative Colony, Halder Bagan, Rahara, Kolkata, Khardaha, West Bengal 700118
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#174D3B] flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#20231F]">Hours:</span> Open Daily 06:00 AM – 10:00 PM
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FF6747] flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#20231F]">Phone:</span>{' '}
                  <a href="tel:07439761994" className="hover:text-[#FF6747] font-semibold tabular-nums">
                    074397 61994
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
