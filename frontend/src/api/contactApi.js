import api from './axios';

export const contactApi = {
  submitEnquiry: async (enquiryData) => {
    const response = await api.post('/enquiries/', enquiryData);
    return response.data;
  },
  getTestimonials: async () => {
    const response = await api.get('/testimonials/');
    return response.data;
  },
  submitTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials/', testimonialData);
    return response.data;
  },
  getPortfolioItems: async () => {
    const response = await api.get('/portfolio/');
    return response.data;
  }
};
