import { useNavigate } from 'react-router';
import { Package, Truck, Shield } from 'lucide-react';
import { Button } from '../components/Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900">LogiTrack</h2>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Button variant="secondary" onClick={() => navigate('/driver/login')}>
                <span className="hidden sm:inline">Driver</span>
                <span className="sm:hidden">Driver</span>
              </Button>
              <Button variant="primary" onClick={() => navigate('/admin/login')}>
                <span className="hidden sm:inline">Admin</span>
                <span className="sm:hidden">Admin</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-gray-900 mb-4 md:mb-6">
            Proof of Delivery Made Simple
          </h1>
          <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
            A comprehensive logistics application for delivery drivers and administrators. 
            Streamline your delivery process with real-time tracking and proof of delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button variant="primary" onClick={() => navigate('/driver/login')}>
              Start as Driver
            </Button>
            <Button variant="secondary" onClick={() => navigate('/admin/login')}>
              Admin Dashboard
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-[#2563eb]" />
            </div>
            <h3 className="text-gray-900 mb-3">Driver App</h3>
            <p className="text-gray-600">
              Mobile-optimized interface for drivers to manage deliveries, capture signatures, 
              and upload proof of delivery photos.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[#10b981]" />
            </div>
            <h3 className="text-gray-900 mb-3">Shipment Tracking</h3>
            <p className="text-gray-600">
              Track all shipments in real-time with detailed status updates, 
              delivery confirmations, and comprehensive reporting.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Admin Dashboard</h3>
            <p className="text-gray-600">
              Powerful web dashboard for managing shipments, viewing proof of delivery, 
              and monitoring driver performance.
            </p>
          </div>
        </div>

        {/* Status Colors */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h3 className="text-gray-900 mb-6 text-center">Status Indicators</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#2563eb] rounded-full"></div>
              <span className="text-gray-600 text-sm md:text-base">Out for Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded-full"></div>
              <span className="text-gray-600 text-sm md:text-base">Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f59e0b] rounded-full"></div>
              <span className="text-gray-600 text-sm md:text-base">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded-full"></div>
              <span className="text-gray-600 text-sm md:text-base">Failed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}