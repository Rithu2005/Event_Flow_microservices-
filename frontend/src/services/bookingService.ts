import api from './api';
import type { Booking } from '../types';

export const bookingService = {
  bookTicket: async (booking: Booking): Promise<Booking> => {
    const response = await api.post<Booking>('/api/v1/tickets/book', booking);
    return response.data;
  },
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(`/api/v1/tickets/user/${userId}`);
    return response.data;
  }
};
