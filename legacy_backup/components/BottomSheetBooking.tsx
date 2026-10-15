import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { X } from 'lucide-react';

export const BottomSheetBooking: React.FC = () => {
  const { isBookingOpen, selectedPlan, closeBooking } = useStore();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time) return;

    const text = `Hi Shilpa's Gym team,\n\nI want to book the *${selectedPlan} Plan*.\nName: ${name}\nDate: ${date}\nTime: ${time}\n\nPlease confirm my slot.`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedText}`;
    
    window.location.href = whatsappUrl;
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
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                closeBooking();
              }
            }}
            className="fixed bottom-0 left-0 w-full bg-gym-charcoal border-t border-gym-charcoalLight rounded-t-3xl z-[70] p-6 pb-12 shadow-2xl flex flex-col items-center max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mb-8" />
            
            <button onClick={closeBooking} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X size={24} />
            </button>

            <div className="w-full max-w-md">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Book Your Pass</h2>
              <p className="text-gym-orange font-bold uppercase tracking-wide mb-8">Selected: {selectedPlan} Plan</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gym-black border border-gray-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gym-black border border-gray-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Time</label>
                    <input 
                      type="time" 
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-gym-black border border-gray-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-gym-orange transition-colors"
                    />
                  </div>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  type="submit"
                  className="w-full bg-gym-orange hover:bg-gym-orangeHover text-white font-black py-4 uppercase tracking-widest mt-8 transition-colors"
                >
                  Confirm on WhatsApp
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
