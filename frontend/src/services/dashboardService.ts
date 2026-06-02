import api from './api';

export const dashboardService = {
  getEventStats: async () => {
    const response = await api.get('/api/v1/events/stats');
    return response.data;
  },
  getTicketStats: async () => {
    const response = await api.get('/api/v1/tickets/stats');
    return response.data;
  }
};
