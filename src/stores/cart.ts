import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clear: () => void;

  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);

        if (existing) {
          return set({
            items: get().items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        }

        set({ items: [...get().items, { ...item, quantity: 1 }] });
      },

      removeItem: id =>
        set({ items: get().items.filter(i => i.id !== id) }),

      increase: id =>
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }),

      decrease: id =>
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
          ).filter(i => i.quantity > 0),
        }),

      clear: () => set({ items: [] }),

      total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage', // key trong localStorage
    },
  ),
);
