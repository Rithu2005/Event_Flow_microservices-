import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  User, 
  ArrowLeft,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { eventService } from '../services/eventService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import type { Event } from '../types';
import toast from 'react-hot-toast';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [booking, setBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const data = await eventService.getEventById(parseInt(id));
          setEvent(data);
        }
      } catch (error) {
        toast.error('Event not found');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!event || !user) return;
    
    setBooking(true);
    try {
      await bookingService.bookTicket({
        eventId: event.id,
        userId: user.email,
        ticketCount,
        totalPrice: event.price * ticketCount
      });
      toast.success('Tickets booked successfully!');
      navigate('/bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={20} /> Back to events
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-96 relative">
          <img
            src={event.bannerImageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {event.category}
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 flex-1">
              <h1 className="text-4xl font-extrabold text-slate-900">{event.title}</h1>
              
              <div className="flex flex-wrap gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} />
                  <span className="font-medium">{new Date(event.dateTime).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-blue-600" size={20} />
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="text-blue-600" size={20} />
                  <span className="font-medium">Organizer: {event.organizerId || 'Admin'}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">About this event</h3>
                <p className="text-slate-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            <div className="w-full md:w-80 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
              <div>
                <p className="text-slate-500 text-sm mb-1">Price per ticket</p>
                <p className="text-3xl font-bold text-slate-900">${event.price}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Select Tickets</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-8 text-center">{ticketCount}</span>
                  <button 
                    onClick={() => setTicketCount(Math.min(event.availableTickets, ticketCount + 1))}
                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-500">{event.availableTickets} tickets remaining</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${(event.price * ticketCount).toFixed(2)}</span>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={booking || event.availableTickets === 0}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {booking ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle size={20} /> Book Now</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
