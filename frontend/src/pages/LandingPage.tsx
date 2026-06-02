import { Link } from 'react-router-dom';
import { Calendar, Shield, Zap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">EventFlow</h1>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-slate-600 font-semibold hover:text-blue-600">Login</Link>
          <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        <section className="px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Manage Events with <br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Unmatched Efficiency
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            The complete event management platform powered by a cloud-native, 
            event-driven microservices architecture.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
              Start Building <ArrowRight size={20} />
            </Link>
            <Link to="/events" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Browse Events
            </Link>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Event Driven</h3>
                <p className="text-slate-600">
                  Real-time notifications and updates powered by Apache Kafka for high-scale asynchronous processing.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Cloud Native</h3>
                <p className="text-slate-600">
                  Built for the modern cloud with Docker, Kubernetes, and AWS integration for extreme scalability.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-purple-50 border border-purple-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Full Lifecycle</h3>
                <p className="text-slate-600">
                  From creation to booking and notifications, manage the entire event lifecycle in one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
