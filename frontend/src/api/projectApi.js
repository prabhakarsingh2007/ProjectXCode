import api from './axios';

export const projectApi = {
  getProjects: async () => {
    const response = await api.get('/projects/');
    return response.data;
  },
  getProjectDetails: async (id) => {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  },
  createProject: async (projectData) => {
    const response = await api.post('/projects/', projectData);
    return response.data;
  },
  makePayment: async (paymentData) => {
    const response = await api.post('/payments/', paymentData);
    return response.data;
  },
  createCheckoutSession: async (projectId) => {
    const response = await api.post('/payments/create_checkout_session/', { project_request: projectId });
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await api.get('/dashboard/');
    return response.data;
  },
  getNotifications: async () => {
    const response = await api.get('/notifications/');
    return response.data;
  },
  markNotificationsAsRead: async () => {
    const response = await api.post('/notifications/read/');
    return response.data;
  }
};
