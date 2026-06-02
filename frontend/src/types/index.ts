export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  dateTime: string;
  location: string;
  bannerImageUrl?: string;
  price: number;
  totalCapacity: number;
  availableTickets: number;
  organizerId: string;
}

export interface Booking {
  id?: number;
  eventId: number;
  userId: string;
  ticketCount: number;
  totalPrice: number;
  bookingDate?: string;
  status?: string;
}
