import React from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, updateQuantity } = useStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.18; // 18% GST
  const total = subtotal + taxes;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    let message = "Hi, I'd like to purchase the following passes:\n\n";
    cartItems.forEach(item => {
      message += `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });
    message += `\nSubtotal: ₹${subtotal}\nTaxes: ₹${taxes.toFixed(2)}\n*Total: ₹${total.toFixed(2)}*`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gym-charcoal border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gym-black">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Your Passes</h2>
              <button onClick={closeCart} className="text-gray-400 hover:text-gym-orange transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10 font-black uppercase tracking-widest text-sm">Your cart is empty.</div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gym-charcoalLight p-4 rounded-sm border-l-4 border-gym-orange">
                    <div>
                      <h4 className="text-white font-black uppercase tracking-tighter">{item.name}</h4>
                      <p className="text-gym-orange font-bold text-sm">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gym-black rounded-sm px-3 py-1 border border-white/10">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-gym-orange"><Minus className="w-4 h-4"/></button>
                      <span className="text-white font-black text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-gym-orange"><Plus className="w-4 h-4"/></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-gym-black">
              <div className="space-y-3 mb-6 text-sm font-bold uppercase tracking-widest">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Taxes (18%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-xl font-black tracking-tighter pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-gym-orange">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-gym-orange text-black py-4 rounded-sm font-black text-lg uppercase tracking-widest disabled:opacity-50 transition-colors hover:bg-gym-orangeHover"
              >
                CHECKOUT ON WHATSAPP
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
