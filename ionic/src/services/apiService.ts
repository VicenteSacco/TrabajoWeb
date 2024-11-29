import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000/', 
});


api.interceptors.request.use((config) =>{
  const token = useAuthStore.getState().token
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getItems = async () => { 
  try {
    const response = await api.get('/products');
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getItemById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const response = await api.post('/wishlist', { productId });
    return response.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

export const updateItemDiscount = async (id: string, data: { price: number, price2: number }) => {
  try {
    const response = await api.put(`/products/${id}/discount`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating discount:', error);
    throw error;
  }
};

export const updateItemStock = async (id: string, unidades: number) => {
  try {
    const response = await api.put(`/products/${id}/stock`, { unidades }); 
    return response.data;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const register = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, data: any) => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const createDiscount = async (data: { productId: string; percentage: number; endDate: string }) => {
  try {
    const response = await api.post('/discounts', data);
    return response.data;
  } catch (error) {
    console.error('Error creating discount:', error);
    throw error;
  }
};


export default api;
