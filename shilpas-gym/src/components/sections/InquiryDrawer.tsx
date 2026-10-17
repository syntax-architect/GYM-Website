import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { CheckCircle2, Phone } from 'lucide-react';

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
    tierOrDiscipline: 'Unisex Gym Access (₹1,499/mo)',
    preferredTime: 'Morning (06:00 – 10:00 AM)',
    leadCoach: 'Coach Rajesh Sen (Head Biomechanics)',
    notes: '',
  });

  const [customPlan, setCustomPlan] = useState<string | null>(null);
  const activePlan = customPlan ?? selectedPlan ?? 'Unisex Gym Access (₹1,499/mo)';

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
      subtitle="Shilpa's Gym & Beauty Salon · Khardaha, Kolkata"
    >
      {submitted ? (
        <div className="py-12 flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#174D3B]/10 flex items-center justify-center text-[#174D3B]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-sm text-[#FF6747] font-bold uppercase">
            Request Received
          </span>
          <h4 className="font-display text-2xl font-bold uppercase text-[#20231F]">
            Appointment Confirmed
          </h4>
          <p className="text-sm text-[#4E534B] max-w-xs font-sans leading-relaxed">
            Our team will call or WhatsApp you at {formData.phone} within 2 hours to confirm your gym trial slot or salon appointment.
          </p>

          <div className="p-5 bg-[#FAF8F4] rounded-xs w-full text-sm text-[#20231F] text-left space-y-1">
            <div className="text-[#FF6747] font-bold mb-1">INTAKE SUMMARY</div>
            <div><span className="font-semibold">Client:</span> {formData.name}</div>
            <div><span className="font-semibold">Service:</span> {activePlan}</div>
            <div><span className="font-semibold">Window:</span> {formData.preferredTime}</div>
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
        <form onSubmit={handleSubmit} data-ui="form" className="space-y-5">
          {/* Studio Hotline Strip as Tactile Pill Actions */}
          <div className="p-2 bg-[#20231F]/5 ring-1 ring-[#20231F]/10 rounded-2xl flex items-center justify-between gap-2 text-xs">
            <a
              href="tel:07439761994"
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#20231F] hover:text-[#F5F2EA] text-[#20231F] border border-[#20231F]/15 flex items-center justify-center gap-1.5 font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6747]" />
              <span className="tabular-nums">074397 61994</span>
            </a>
            <a
              href="https://wa.me/917439761994"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-1.5 font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-xs"
            >
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Service / Tier Selector */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Selected Service / Plan
            </label>
            <select
              value={activePlan}
              onChange={(e) => setCustomPlan(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm font-medium text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all cursor-pointer"
            >
              <option value="Unisex Gym Access (₹1,499/mo)">Unisex Gym Access (₹1,499/mo)</option>
              <option value="PT Transformation (₹3,499/mo)">PT Transformation (₹3,499/mo)</option>
              <option value="VIP Dual Pass: Gym + Salon (₹4,999/mo)">VIP Dual Pass: Gym + Salon (₹4,999/mo)</option>
              <option value="Keratin Smoothing & Hair Spa">Keratin Smoothing & Hair Spa</option>
              <option value="Bridal & Celebration Glamour">Bridal & Celebration Glamour</option>
              <option value="Free Day Pass / Consultation">Free Day Pass / Consultation</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sourav Mukherjee"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Phone Number (WhatsApp Preferred) *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98300 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all tabular-nums"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all"
            />
          </div>

          {/* Preferred Time Window */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Preferred Time Window
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm font-medium text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all cursor-pointer"
            >
              <option value="Morning (06:00 – 10:00 AM)">Morning (06:00 – 10:00 AM)</option>
              <option value="Midday (11:00 AM – 04:00 PM)">Midday (11:00 AM – 04:00 PM)</option>
              <option value="Evening Peak (05:00 – 10:00 PM)">Evening Peak (05:00 – 10:00 PM)</option>
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#20231F] mb-1.5">
              Specific Goals / Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Interested in fat loss personal training, or inquiry about bridal party booking dates..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 bg-[#FAF8F4] border-2 border-[#20231F]/10 rounded-xl text-sm text-[#20231F] focus:bg-white focus:outline-none focus:border-[#FF6747] transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-center justify-center min-h-[52px]"
            >
              CONFIRM APPOINTMENT REQUEST
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  );
};
