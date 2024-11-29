import create from 'zustand';

interface CartItem {
  _id: string; // Cambiar a string
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (_id: string, quantity: number) => void; // Cambiar a string
  removeItem: (_id: string) => void; // Cambiar a string
  updateQuantity: (_id: string, quantity: number) => void; // Cambiar a string
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'), // Cargar desde localStorage
  addItem: (_id, quantity) => set((state) => {
    const existingItem = state.items.find(item => item._id === _id);
    const newItems = existingItem
      ? state.items.map(item =>
          item._id === _id ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [...state.items, { _id, quantity }];
    
    localStorage.setItem('cart', JSON.stringify(newItems)); // Guardar en localStorage
    return { items: newItems };
  }),
  removeItem: (_id) => set((state) => {
    const newItems = state.items.filter(item => item._id !== _id);
    localStorage.setItem('cart', JSON.stringify(newItems)); // Guardar en localStorage
    return { items: newItems };
  }),
  updateQuantity: (_id, quantity) => set((state) => {
    const newItems = state.items.map(item =>
      item._id === _id ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(newItems)); // Guardar en localStorage
    return { items: newItems };
  }),
  clearCart: () => {
    localStorage.removeItem('cart'); // Limpiar localStorage
    set({ items: [] });
  },
}));

export default useCartStore;