import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img
          src={event.bannerImageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
          {event.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Calendar size={16} />
            <span>{new Date(event.dateTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <MapPin size={16} />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Ticket size={16} />
            <span>{event.availableTickets} tickets left</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4 border-slate-100">
          <span className="text-xl font-bold text-blue-600">${event.price}</span>
          <Link
            to={`/events/${event.id}`}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
