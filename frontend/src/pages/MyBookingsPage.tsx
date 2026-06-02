import { useEffect, useState } from 'react';
import { Ticket, Calendar, MapPin, Download } from 'lucide-react';
import { bookingService } from '../services/bookingService';
import { eventService } from '../services/eventService';
import { useAuth } from '../context/AuthContext';
import type { Booking, Event } from '../types';

const MyBookingsPage = () => {
  const [bookingsWithEvents, setBookingsWithEvents] = useState<{ booking: Booking, event: Event }[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user) {
          const bookings = await bookingService.getUserBookings(user.email);
          const enrichedBookings = await Promise.all(
            bookings.map(async (booking) => {
              const event = await eventService.getEventById(booking.eventId);
              return { booking, event };
            })
          );
          setBookingsWithEvents(enrichedBookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Bookings</h2>
        <p className="text-slate-500">View and manage your event tickets.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-slate-200 animate-pulse h-32 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {bookingsWithEvents.map(({ booking, event }) => (
            <div key={booking.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Ticket size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(event.dateTime).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                    <span className="font-bold text-blue-600">{booking.ticketCount} Tickets</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-slate-500">Total Paid</p>
                  <p className="text-xl font-bold text-slate-900">${booking.totalPrice}</p>
                </div>
                <button className="p-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}

          {bookingsWithEvents.length === 0 && (
            <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
              <Ticket className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">You haven't booked any events yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
