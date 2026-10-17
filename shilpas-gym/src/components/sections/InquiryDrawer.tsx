import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, ArrowUpRight, Check } from 'lucide-react';

export interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const CONTRACT_INTERESTS = [
  'Unisex Gym Access (₹1,499/mo)',
  'PT Transformation (₹3,499/mo)',
  'All-Access: Gym + Salon (₹4,999/mo)',
  'Keratin & Hair Spa Suite',
  'Bridal & HD Makeup Consultation',
  '1-Day Free Trial Pass',
];

const TIME_WINDOWS = [
  'Morning (06:00 – 10:00 AM)',
  'Midday (11:00 AM – 04:00 PM)',
  'Evening Peak (05:00 – 10:00 PM)',
];

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(CONTRACT_INTERESTS[0]);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS[0]);
  const [notes, setNotes] = useState('');
  const [committed, setCommitted] = useState(true);

  useEffect(() => {
    if (selectedPlan) {
      setInterest(selectedPlan);
    }
  }, [selectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `*SHILPA'S GYM & SALON — CONTRACT DOSSIER #2026*`,
      ``,
      `*Member Name:* ${name}`,
      `*Phone / WhatsApp:* ${phone}`,
      email ? `*Email:* ${email}` : null,
      `*Selected Track:* ${interest}`,
      `*Preferred Slot:* ${timeWindow}`,
      notes ? `*Playbook Notes:* ${notes}` : null,
      ``,
      `Please confirm my studio visit at Rahara, Khardaha.`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/917439761994?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-xl h-full bg-[#F5F2EA] text-[#0D0D0E] shadow-2xl border-l-2 border-[#0D0D0E] overflow-y-auto p-6 sm:p-10 flex flex-col justify-between"
      >
        {/* Top Contract Header (Oddball 00:18 + Valmora 00:24 Motif) */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#0D0D0E]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9381E]" />
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0D0D0E]">
                SHILPA&apos;S · ATHLETE & SALON CONTRACT
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#0D0D0E] text-[#F5F2EA] font-mono text-[11px] font-bold">
                NO. 2026
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white border border-[#0D0D0E]/15 text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Booking Contract"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0E] leading-none mb-2">
              THE BALL&apos;S IN{' '}
              <span className="font-serif italic font-normal capitalize text-[#D9381E]">
                Your Court.
              </span>
            </h2>
            <p className="font-sans text-sm text-[#4C514A]">
              Reserve your trial session on the strength floor or book a private consultation in
              our luxury beauty wing in Khardaha.
            </p>
          </div>

          {/* Direct Instant Hotline Bar */}
          <div className="grid grid-cols-2 gap-3 mb-7">
            <a
              href="tel:07439761994"
              className="py-3 px-4 rounded-2xl bg-white border border-[#0D0D0E]/15 font-mono text-xs font-bold text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#D9381E]" />
              <span className="tabular-nums">074397 61994</span>
            </a>
            <a
              href="https://wa.me/917439761994"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] font-mono text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WHATSAPP DIRECT</span>
            </a>
          </div>

          {/* Contract Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Valmora-Style Interest Pill Selector */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-2.5">
                01 · SELECT TRACK / SERVICE
              </label>
              <div className="flex flex-wrap gap-2">
                {CONTRACT_INTERESTS.map((item) => {
                  const isSelected = interest === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setInterest(item)}
                      className={`px-3.5 py-2 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0D0D0E] text-[#F5F2EA] shadow-sm'
                          : 'bg-white text-[#0D0D0E]/75 border border-[#0D0D0E]/15 hover:border-[#0D0D0E]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-1.5">
                  WHO&apos;S SIGNING? (FULL NAME) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sourav Mukherjee"
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#0D0D0E]/20 font-sans text-sm text-[#0D0D0E] focus:outline-none focus:border-[#D9381E]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-1.5">
                  PHONE / WHATSAPP *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98300 00000"
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#0D0D0E]/20 font-mono text-sm text-[#0D0D0E] focus:outline-none focus:border-[#D9381E]"
                />
              </div>
            </div>

            {/* Preferred Window & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-1.5">
                  PREFERRED WINDOW
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#0D0D0E]/20 font-sans text-sm text-[#0D0D0E] focus:outline-none focus:border-[#D9381E]"
                >
                  {TIME_WINDOWS.map((win) => (
                    <option key={win} value={win}>
                      {win}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-1.5">
                  EMAIL (OPTIONAL)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#0D0D0E]/20 font-sans text-sm text-[#0D0D0E] focus:outline-none focus:border-[#D9381E]"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-mono text-[11px] font-bold uppercase tracking-widest text-[#0D0D0E]/65 mb-1.5">
                WHAT&apos;S THE PLAY? (GOALS OR SALON DATES)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us a date that suits, target weight/physique goal, or bridal booking inquiry..."
                className="w-full bg-white px-4 py-3 rounded-xl border border-[#0D0D0E]/20 font-sans text-sm text-[#0D0D0E] focus:outline-none focus:border-[#D9381E] resize-none"
              />
            </div>

            {/* Oddball Contract Signature Line & Submit CTA */}
            <div className="pt-4 border-t border-[#0D0D0E]/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCommitted((prev) => !prev)}
                className="flex items-center gap-2.5 text-left font-mono text-xs text-[#0D0D0E]/75 cursor-pointer"
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    committed
                      ? 'bg-[#141311] border-[#141311] text-white'
                      : 'bg-white border-[#0D0D0E]/30'
                  }`}
                >
                  {committed && <Check className="w-3.5 h-3.5" />}
                </span>
                <span className="border-b border-dashed border-[#0D0D0E]/40 pb-0.5">
                  X _{name ? name.toUpperCase() : '_________'}_ signature
                </span>
              </button>

              <button
                type="submit"
                className="px-7 py-4 rounded-full bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>TAKE THE SHOT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Studio Guarantee */}
        <div className="pt-6 mt-6 border-t border-[#0D0D0E]/10 flex items-center justify-between font-mono text-[11px] text-[#0D0D0E]/55">
          <span>NASKARHAT MADHYA PARA · RAHARA</span>
          <span>ZERO LOCK-IN FEES</span>
        </div>
      </div>
    </div>
  );
};

export default InquiryDrawer;
