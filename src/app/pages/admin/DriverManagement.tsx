import { Phone, Mail, Truck, CheckCircle, XCircle } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { Card } from '../../components/Card';
import { mockDrivers } from '../../data/mockData';
import { AIChatbot } from '../../components/AIChatbot';

export function DriverManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-slate-900 mb-2">Driver Management</h1>
          <p className="text-slate-600">Manage your delivery drivers</p>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDrivers.map((driver) => (
            <Card key={driver.id} className="p-6 space-y-4 hover:scale-[1.02]">
              {/* Driver Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">{driver.name}</h3>
                  <p className="text-slate-600">{driver.vehicleNumber}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-xl shadow-sm ${
                  driver.status === 'active' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' 
                    : 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-600 border border-slate-200'
                }`}>
                  {driver.status === 'active' ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      <span className="font-medium">Inactive</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{driver.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{driver.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 mb-1">Today</p>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-900 font-semibold">{driver.deliveriesToday}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Completed</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-slate-900 font-semibold">{driver.completedDeliveries}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 border-0 text-white hover:scale-[1.02]">
            <p className="text-blue-100 mb-2">Total Drivers</p>
            <h2 className="text-white">{mockDrivers.length}</h2>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white hover:scale-[1.02]">
            <p className="text-green-100 mb-2">Active Drivers</p>
            <h2 className="text-white">
              {mockDrivers.filter(d => d.status === 'active').length}
            </h2>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-violet-600 border-0 text-white hover:scale-[1.02]">
            <p className="text-purple-100 mb-2">Total Deliveries Today</p>
            <h2 className="text-white">
              {mockDrivers.reduce((sum, d) => sum + d.deliveriesToday, 0)}
            </h2>
          </Card>
        </div>
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