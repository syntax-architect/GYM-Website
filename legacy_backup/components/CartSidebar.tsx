import React from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, removeFromCart } = useStore();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    let msg = `GYM PASS CHECKOUT\n\n`;
    cartItems.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} (₹${item.price})\n`;
    });
    msg += `\nSubtotal: ₹${subtotal}\nTax: ₹${tax.toFixed(2)}\nTOTAL: ₹${total.toFixed(2)}`;
    
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(msg)}`, '_blank');
    closeCart();
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
            className="fixed inset-0 bg-black/80 z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-black border-l border-white/20 z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-white/20 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">YOUR PASSES</h2>
              <button onClick={closeCart} className="text-gray-400 hover:text-gym-orange transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p className="font-black uppercase tracking-widest text-sm">CART IS EMPTY</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center border border-white/10 p-4 bg-[#050505] rounded-sm">
                      <div>
                        <h4 className="font-black uppercase tracking-tighter text-white mb-1">{item.name}</h4>
                        <p className="text-gym-orange font-black tabular-nums">₹{item.price} <span className="text-gray-500 text-xs">x {item.quantity}</span></p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/20 bg-[#050505]">
              <div className="space-y-2 mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span className="text-white">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10 text-lg text-gym-orange">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-gym-orange text-black py-4 font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gym-orangeHover transition-colors rounded-sm"
              >
                CHECKOUT ON WHATSAPP
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
