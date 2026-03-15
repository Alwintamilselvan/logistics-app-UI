import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Eye } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { mockDeliveries } from '../../data/mockData';
import { AIChatbot } from '../../components/AIChatbot';

export function ShipmentsTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch = 
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.packageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-slate-900 mb-2">Shipments</h1>
          <p className="text-slate-600">Manage and track all deliveries</p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by customer, package ID, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </Card>

        {/* Results Count */}
        <p className="text-slate-600 font-medium">
          Showing {filteredDeliveries.length} of {mockDeliveries.length} shipments
        </p>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-slate-900">Package ID</th>
                  <th className="text-left px-6 py-4 text-slate-900">Customer</th>
                  <th className="text-left px-6 py-4 text-slate-900">Address</th>
                  <th className="text-left px-6 py-4 text-slate-900">Driver</th>
                  <th className="text-left px-6 py-4 text-slate-900">Status</th>
                  <th className="text-left px-6 py-4 text-slate-900">Date</th>
                  <th className="text-left px-6 py-4 text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-900 font-medium">{delivery.packageId}</td>
                    <td className="px-6 py-4 text-slate-900">{delivery.customerName}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {delivery.address}, {delivery.city}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {delivery.assignedDriver || 'Not assigned'}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={delivery.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(delivery.deliveryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/pod/${delivery.id}`)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:text-slate-400 disabled:cursor-not-allowed"
                        disabled={delivery.status !== 'delivered'}
                      >
                        <Eye className="w-4 h-4" />
                        <span>
                          View POD
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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