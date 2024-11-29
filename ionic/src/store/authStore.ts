import create from 'zustand';

interface CartItem {
  _id: string; 
  quantity: number;
}

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  cart: CartItem[];
  wishlist: string[]; 
  login: (token: string, user: any) => void;
  logout: () => void;
  addToCart: (_id: string, quantity: number) => void;
  removeFromCart: (_id: string) => void;
  addToWishlist: (_id: string) => void;
  removeFromWishlist: (_id: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  isAuthenticated: !!localStorage.getItem('token'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  
  login: (token: string, user: any) => {
    localStorage.setItem('token', token);
    const userData = {
      ...user,
      role: user.role || 'user'
    };
    localStorage.setItem('user', JSON.stringify(userData));
    set({ token, user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false, cart: [], wishlist: [] });
  },

  

  addToCart: (_id: string, quantity: number) => set((state) => {
    const existingItem = state.cart.find(item => item._id === _id);
    const newCart = existingItem
      ? state.cart.map(item =>
          item._id === _id ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [...state.cart, { _id, quantity }];
    
    localStorage.setItem('cart', JSON.stringify(newCart)); 
    return { cart: newCart };
  }),

  removeFromCart: (_id: string) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== _id);
    localStorage.setItem('cart', JSON.stringify(newCart)); 
    return { cart: newCart };
  }),
  addToWishlist: (_id: string) => set((state) => {
    if (!state.wishlist.includes(_id)) {
      const newWishlist = [...state.wishlist, _id];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist)); 
      return { wishlist: newWishlist };
    }
    return state; 
  }),
  removeFromWishlist: (_id: string) => set((state) => {
    const newWishlist = state.wishlist.filter(id => id !== _id);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist)); 
    return { wishlist: newWishlist };
  }),
}));

export default useAuthStore;