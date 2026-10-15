import React, { useState } from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useStore();
  const [formData, setFormData] = useState({ name: '', guests: '1', date: '', time: '', requests: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `TRIAL BOOKING REQUEST\n\nName: ${formData.name}\nGuests: ${formData.guests}\nDate: ${formData.date}\nTime: ${formData.time}\nSpecial Requests: ${formData.requests || 'None'}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
    closeBooking();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-black border-2 border-gym-orange w-full max-w-lg rounded-sm overflow-hidden shadow-glow relative"
            >
              <button onClick={closeBooking} className="absolute top-6 right-6 text-gym-orange hover:text-white transition-colors z-10">
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-6 bg-gym-orange"></div>
                  <span className="text-gym-orange font-black tracking-widest text-[10px] uppercase">VIP Access</span>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">BOOK A TRIAL</h2>
                <p className="text-gray-400 text-sm mb-8 font-bold uppercase tracking-widest">Experience the facility. No obligations.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black tracking-widest text-white uppercase mb-2">FULL NAME</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors font-bold text-sm" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black tracking-widest text-white uppercase mb-2">DATE</label>
                      <input required type="date" name="date" value={formData.date} onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors font-bold text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black tracking-widest text-white uppercase mb-2">TIME</label>
                      <input required type="time" name="time" value={formData.time} onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors font-bold text-sm" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-widest text-white uppercase mb-2">NUMBER OF GUESTS</label>
                    <select name="guests" value={formData.guests} onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors font-bold text-sm appearance-none"
                    >
                      <option value="1" className="bg-black text-white">JUST ME</option>
                      <option value="2" className="bg-black text-white">+1 GUEST</option>
                      <option value="3" className="bg-black text-white">+2 GUESTS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black tracking-widest text-white uppercase mb-2">TRAINING GOALS (OPTIONAL)</label>
                    <textarea name="requests" value={formData.requests} onChange={handleChange} rows={2}
                      className="w-full bg-[#050505] border border-white/20 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors font-bold text-sm resize-none" 
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gym-orange text-black py-4 rounded-sm font-black uppercase tracking-widest hover:bg-gym-orangeHover transition-colors mt-4"
                  >
                    CONFIRM BOOKING
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
