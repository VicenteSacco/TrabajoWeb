import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const getItems = async () => {
  const response = await axios.get(`${baseUrl}/items`);
  return response.data;
};

export const addItem = async (item: { name: string }) => {
  const response = await axios.post(`${baseUrl}/items`, item);
  return response.data;
};