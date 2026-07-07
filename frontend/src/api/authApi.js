import api from './axios';

export const authApi = {
  login: async (credentials) => {
    const response = await api.post('/accounts/login/', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/accounts/register/', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/accounts/profile/');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/accounts/profile/', profileData);
    return response.data;
  }
};
