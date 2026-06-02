import { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import type { Event } from '../types';

const DashboardPage = () => {
  const [events] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAvailableTickets: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventStats, ticketStats] = await Promise.all([
          dashboardService.getEventStats(),
          dashboardService.getTicketStats()
        ]);
        setStats({
          totalEvents: eventStats.totalEvents,
          totalAvailableTickets: eventStats.totalAvailableTickets,
          totalBookings: ticketStats.totalBookings,
          totalRevenue: ticketStats.totalRevenue
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchData();
  }, [user]);

  const statCards = [
    { label: 'Total Events', value: stats.totalEvents.toString(), icon: Calendar, color: 'blue', up: true },
    { label: 'Total Bookings', value: stats.totalBookings.toString(), icon: Users, color: 'emerald', up: true },
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'purple', up: true },
    { label: 'Tickets Available', value: stats.totalAvailableTickets.toString(), icon: Clock, color: 'orange', up: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h2>
        <p className="text-gray-700">Here's what's happening with your events today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center text-${stat.color}-700`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recommended Events</h3>
            <button className="text-blue-700 text-sm font-bold hover:underline">View all</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {events.length === 0 && (
              <div className="col-span-2 py-20 text-center bg-white rounded-xl border border-dashed border-gray-400">
                <p className="text-gray-700">No events found. Start by creating one!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Clock size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New booking for Tech Conf 2024</p>
                    <p className="text-xs text-gray-700">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 border-t border-gray-200 text-sm font-bold text-gray-800 hover:bg-gray-100 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
