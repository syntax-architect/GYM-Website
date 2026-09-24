import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface GymState {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;

  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

export const useStore = create<GymState>((set) => ({
  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true }),
  closeBooking: () => set({ isBookingOpen: false }),

  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  cartItems: [],
  addToCart: (item) => set((state) => {
    const existing = state.cartItems.find(i => i.id === item.id);
    if (existing) {
      return { cartItems: state.cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { cartItems: [...state.cartItems, { ...item, quantity: 1 }], isCartOpen: true };
  }),
  updateQuantity: (id, delta) => set((state) => {
    const updated = state.cartItems.map(i => {
      if (i.id === id) {
        return { ...i, quantity: Math.max(0, i.quantity + delta) };
      }
      return i;
    }).filter(i => i.quantity > 0);
    return { cartItems: updated };
  }),
  clearCart: () => set({ cartItems: [] }),
}));
