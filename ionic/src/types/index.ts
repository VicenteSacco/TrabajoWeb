export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  specs: {
    [key: string]: string | number;
  };
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
  discount?: {
    percentage: number;
    endDate: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  wishlist: string[];
  cart: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}