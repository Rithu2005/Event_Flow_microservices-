import api from './api';
import type { Event } from '../types';

export const eventService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/api/v1/events');
    return response.data;
  },
  getEventById: async (id: number): Promise<Event> => {
    const response = await api.get<Event>(`/api/v1/events/${id}`);
    return response.data;
  },
  createEvent: async (event: Partial<Event>): Promise<Event> => {
    const response = await api.post<Event>('/api/v1/events', event);
    return response.data;
  }
};
