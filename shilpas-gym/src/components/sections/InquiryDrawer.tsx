import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { CheckCircle2, ArrowRight, Phone, ShieldCheck } from 'lucide-react';

export interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tierOrDiscipline: 'Pulse Performance ($265/mo)',
    preferredTime: 'Morning Dawn // 06:00 — 08:30',
    leadCoach: 'Julian Mercer (Lead Biomechanist)',
    notes: '',
  });

  const [customPlan, setCustomPlan] = useState<string | null>(null);
  const activePlan = customPlan ?? selectedPlan ?? 'Pulse Performance ($265/mo)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="BOOK APPOINTMENT / TRIAL"
      subtitle="Shilpa's Gym & Beauty Salon • Khardaha, Kolkata"
    >
      {submitted ? (
        <div className="py-12 flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#174D3B]/10 border border-[#174D3B]/30 flex items-center justify-center text-[#174D3B]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="font-mono text-xs text-[#FF6747] uppercase tracking-widest font-bold">
            REQUEST RECEIVED
          </span>
          <h4 className="font-display text-2xl font-bold uppercase text-[#20231F]">
            APPOINTMENT CONFIRMED
          </h4>
          <p className="text-sm text-[#4C514A] max-w-xs font-sans leading-relaxed">
            Our team will call or WhatsApp you at {formData.phone} within 2 hours to confirm your gym trial slot or salon appointment.
          </p>

          <div className="p-4 bg-[#FAF8F4] border border-[#20231F]/10 rounded-sm w-full font-mono text-xs text-[#20231F]/80 text-left">
            <div className="text-[#FF6747] font-bold mb-1">INTAKE SUMMARY:</div>
            <div>CLIENT: {formData.name}</div>
            <div>SERVICE: {activePlan}</div>
            <div>WINDOW: {formData.preferredTime}</div>
          </div>

          <div className="pt-4 w-full">
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={handleReset}
            >
              CLOSE WINDOW
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Studio Hotline Strip */}
          <div className="p-3 bg-[#FAF8F4] border border-[#20231F]/10 rounded-sm flex items-center justify-between text-xs font-mono">
            <a href="tel:07439761994" className="flex items-center gap-1.5 text-[#20231F] hover:text-[#FF6747] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#FF6747]" />
              <span className="font-bold">074397 61994</span>
            </a>
            <a
              href="https://wa.me/917439761994"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#174D3B] font-bold hover:underline"
            >
              <span className="w-2 h-2 rounded-full bg-[#174D3B]" />
              <span>WHATSAPP CHAT</span>
            </a>
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sourav Mukherjee"
              className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-sm text-[#20231F] placeholder-[#20231F]/30 focus:outline-none focus:border-[#FF6747] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98300 12345"
                className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-sm text-[#20231F] placeholder-[#20231F]/30 focus:outline-none focus:border-[#FF6747] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sourav@gmail.com"
                className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-sm text-[#20231F] placeholder-[#20231F]/30 focus:outline-none focus:border-[#FF6747] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
              Selected Service or Membership
            </label>
            <select
              value={activePlan}
              onChange={(e) => setCustomPlan(e.target.value)}
              className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-xs text-[#20231F] focus:outline-none focus:border-[#FF6747] transition-colors font-mono"
            >
              <option value="Unisex Gym Access (₹1,499/mo)">Tier 01: Unisex Gym Access // ₹1,499/mo</option>
              <option value="PT Transformation (₹3,499/mo)">Tier 02: PT Transformation with Certified Trainer // ₹3,499/mo (Recommended)</option>
              <option value="All-Access: Gym + Salon (₹4,999/mo)">Tier 03: All-Access VIP Dual Pass (Gym + Salon) // ₹4,999/mo</option>
              <option value="Keratin Smoothing Treatment">Salon: Keratin Smoothing & Hair Restoration</option>
              <option value="Hair Spa & Botox Therapy">Salon: Deep Protein Hair Spa & Scalp Detox</option>
              <option value="Bridal & Party HD Makeup">Beauty Studio: Bridal & Party HD Makeup Package</option>
              <option value="Free Gym Walkthrough & Trial">Complimentary Gym Tour & Free Trial Session</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
                Preferred Schedule
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-xs text-[#20231F] focus:outline-none focus:border-[#FF6747] transition-colors font-mono"
              >
                <option value="Morning Dawn // 06:00 — 08:30">Morning Dawn // 06:00 — 08:30</option>
                <option value="Midday Focus // 11:30 — 14:00">Midday Focus // 11:30 — 14:00</option>
                <option value="Evening Peak // 17:30 — 20:30">Evening Peak // 17:30 — 20:30</option>
                <option value="Weekend Intensive">Weekend Intensive // 08:00 — 14:00</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
                Director Preference
              </label>
              <select
                value={formData.leadCoach}
                onChange={(e) => setFormData({ ...formData, leadCoach: e.target.value })}
                className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm px-3.5 py-2.5 text-xs text-[#20231F] focus:outline-none focus:border-[#FF6747] transition-colors font-mono"
              >
                <option value="Julian Mercer (Lead Biomechanist)">Julian Mercer (Lead Biomechanist)</option>
                <option value="Elena Rostova (Movement Director)">Elena Rostova (Movement Director)</option>
                <option value="First Available Senior Director">First Available Senior Director</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#20231F] uppercase tracking-wider mb-1.5 font-bold">
              Athletic Notes or Movement History
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Tell us about your compound lifting background, current joint restrictions, or performance milestones..."
              className="w-full bg-[#FAF8F4] border border-[#20231F]/15 rounded-sm p-3 text-xs text-[#20231F] placeholder-[#20231F]/30 focus:outline-none focus:border-[#FF6747] transition-colors resize-none font-sans"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              TRANSMIT INITIATION REQUEST
            </Button>
            <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] font-mono text-[#20231F]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#174D3B]" />
              <span>DIRECT ATELIER CONFIRMATION WITHIN 4 HOURS</span>
            </div>
          </div>
        </form>
      )}
    </Drawer>
  );
};
