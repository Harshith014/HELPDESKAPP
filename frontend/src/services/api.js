import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTickets = () => api.get('/tickets');
export const getTicketById = (id) => api.get(`/tickets/${id}`);
export const createTicket = (data) => api.post('/tickets', data);
export const addNote = (id, data) => api.post(`/tickets/${id}/notes`, data);
export const updateTicketStatus = (id, status) =>
  api.patch(`/tickets/${id}/status`, { status });
export const getCustomers = () => api.get('/users/customers');
export const getDashboardData = () => api.get('/dashboard');
export const createUser = (data) => api.post('/users', data);
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);