import api from './axios';

export const serviceApi = {
  getServices: async () => {
    const response = await api.get('/services/');
    return response.data;
  },
  getServiceDetails: async (id) => {
    const response = await api.get(`/services/${id}/`);
    return response.data;
  }
};
