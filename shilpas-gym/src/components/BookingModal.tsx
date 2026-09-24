import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { X } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    date: '',
    time: '06:00 AM',
    requests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (delta: number) => {
    setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests + delta) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New Trial Booking:\n\nName: ${formData.name}\nGuests: ${formData.guests}\nDate: ${formData.date}\nTime: ${formData.time}\nRequests: ${formData.requests || 'None'}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
    closeBooking();
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-gym-charcoal border border-white/10 rounded-sm z-50 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gym-black">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Book a Trial</h2>
              <button onClick={closeBooking} className="text-gray-400 hover:text-gym-orange transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Full Name</label>
                <input 
                  required 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gym-charcoalLight border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Number of Guests / Friends</label>
                <div className="flex items-center gap-4 bg-gym-charcoalLight border border-white/10 rounded-sm px-4 py-3 w-max">
                  <button type="button" onClick={() => handleGuestChange(-1)} className="text-gym-orange hover:text-white text-xl px-2 font-black">&minus;</button>
                  <span className="text-white w-6 text-center font-black">{formData.guests}</span>
                  <button type="button" onClick={() => handleGuestChange(1)} className="text-gym-orange hover:text-white text-xl px-2 font-black">+</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Date</label>
                  <input 
                    required 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gym-charcoalLight border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Time</label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-gym-charcoalLight border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors"
                  >
                    <option>06:00 AM</option>
                    <option>07:30 AM</option>
                    <option>05:00 PM</option>
                    <option>06:30 PM</option>
                    <option>08:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Fitness Goals / Special Requests (Optional)</label>
                <textarea 
                  rows={3}
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  className="w-full bg-gym-charcoalLight border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors resize-none"
                ></textarea>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gym-orange text-black py-4 rounded-sm font-black text-lg uppercase tracking-widest transition-colors hover:bg-gym-orangeHover mt-4"
              >
                CONFIRM ON WHATSAPP
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
