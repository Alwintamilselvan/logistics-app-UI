import { Package, CheckCircle, Truck, Clock, XCircle, Users } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { Card } from '../../components/Card';
import { getDashboardStats } from '../../data/mockData';
import { AIChatbot } from '../../components/AIChatbot';

export function AdminDashboard() {
  const stats = getDashboardStats();

  const statCards = [
    {
      title: 'Total Deliveries',
      value: stats.totalDeliveries,
      icon: Package,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      icon: CheckCircle,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'from-green-100 to-green-200',
      iconColor: 'text-green-600',
    },
    {
      title: 'Out for Delivery',
      value: stats.outForDelivery,
      icon: Truck,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      iconBg: 'from-indigo-100 to-indigo-200',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      iconBg: 'from-orange-100 to-orange-200',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Failed',
      value: stats.failed,
      icon: XCircle,
      color: 'red',
      gradient: 'from-red-500 to-rose-600',
      iconBg: 'from-red-100 to-red-200',
      iconColor: 'text-red-600',
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers,
      icon: Users,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600',
      iconBg: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-slate-900 mb-2">Dashboard Overview</h1>
            <p className="text-slate-600">Friday, March 15, 2026</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg">
            <p className="text-sm text-blue-100">Success Rate</p>
            <p className="text-xl font-semibold">{((stats.delivered / stats.totalDeliveries) * 100).toFixed(1)}%</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6 group hover:scale-[1.02]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-600 mb-2">{stat.title}</p>
                    <h2 className="text-slate-900">{stat.value}</h2>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Delivery Status Chart */}
        <Card className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900">Delivery Status Distribution</h3>
            <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
              Real-time
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 font-medium">Delivered</span>
                <span className="text-slate-900 font-semibold">{stats.delivered} ({((stats.delivered / stats.totalDeliveries) * 100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full shadow-sm transition-all duration-500" 
                  style={{ width: `${(stats.delivered / stats.totalDeliveries) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 font-medium">Out for Delivery</span>
                <span className="text-slate-900 font-semibold">{stats.outForDelivery} ({((stats.outForDelivery / stats.totalDeliveries) * 100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full shadow-sm transition-all duration-500" 
                  style={{ width: `${(stats.outForDelivery / stats.totalDeliveries) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 font-medium">Pending</span>
                <span className="text-slate-900 font-semibold">{stats.pending} ({((stats.pending / stats.totalDeliveries) * 100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full shadow-sm transition-all duration-500" 
                  style={{ width: `${(stats.pending / stats.totalDeliveries) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600 font-medium">Failed</span>
                <span className="text-slate-900 font-semibold">{stats.failed} ({((stats.failed / stats.totalDeliveries) * 100).toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-rose-600 h-3 rounded-full shadow-sm transition-all duration-500" 
                  style={{ width: `${(stats.failed / stats.totalDeliveries) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Chatbot */}
      <AIChatbot 
        context="admin"
        position="bottom-right"
        primaryColor="#6366f1"
      />
    </div>
  );
}