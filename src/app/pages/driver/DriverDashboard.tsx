import { useNavigate } from 'react-router';
import { Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { mockDeliveries } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';
import { AIChatbot } from '../../components/AIChatbot';

export function DriverDashboard() {
  const navigate = useNavigate();

  const deliveriesToday = mockDeliveries.length;
  const pending = mockDeliveries.filter(d => d.status === 'pending' || d.status === 'out-for-delivery').length;
  const completed = mockDeliveries.filter(d => d.status === 'delivered').length;

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <MobileNav title="Driver Dashboard" />

        <div className="px-5 py-6 space-y-6">
          {/* Welcome Message */}
          <div className="pt-2">
            <h2 className="text-slate-900 mb-1">Welcome back, John!</h2>
            <p className="text-slate-600">Friday, March 15, 2026</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 mb-1">Deliveries Today</p>
                  <h2 className="text-white">{deliveriesToday}</h2>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 mb-1">Pending Deliveries</p>
                  <h2 className="text-slate-900">{pending}</h2>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#f59e0b]" />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 mb-1">Completed Today</p>
                  <h2 className="text-slate-900">{completed}</h2>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#22c55e]" />
                </div>
              </div>
            </Card>
          </div>

          {/* Progress Card */}
          <Card className="p-5 bg-gradient-to-br from-purple-500 to-indigo-600 border-0 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white mb-2">Daily Progress</p>
                <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-white h-2.5 rounded-full shadow-lg" 
                    style={{ width: `${(completed / deliveriesToday) * 100}%` }}
                  />
                </div>
                <p className="text-purple-100 text-sm">
                  {completed} of {deliveriesToday} deliveries completed
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pb-24">
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => navigate('/driver/deliveries')}
            >
              View All Deliveries
            </Button>
            <Button 
              variant="secondary" 
              fullWidth
              onClick={() => navigate('/')}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* AI Chatbot */}
        <AIChatbot 
          context="driver"
          position="bottom-right"
          primaryColor="#3b82f6"
        />
      </div>
    </MobileViewport>
  );
}