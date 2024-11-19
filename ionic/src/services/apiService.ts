import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const getItems = async () => {
  const response = await axios.get(`${baseUrl}/products`);
  return response.data;
};

export const addItems = async (products: { name: string }) => {
  const response = await axios.post(`${baseUrl}/products`, products);
  return response.data;
};