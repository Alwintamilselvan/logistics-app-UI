import { useNavigate, useParams } from 'react-router';
import { Truck, CheckCircle, XCircle } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { getDeliveryById } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';

export function DeliveryAction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const delivery = getDeliveryById(id || '');

  if (!delivery) {
    return (
      <MobileViewport>
        <div className="min-h-screen bg-gray-50">
          <MobileNav title="Delivery Action" showBack />
          <div className="px-5 py-6">
            <p className="text-gray-600">Delivery not found</p>
          </div>
        </div>
      </MobileViewport>
    );
  }

  const handleOutForDelivery = () => {
    // In a real app, this would update the delivery status
    alert('Delivery marked as out for delivery');
    navigate(`/driver/delivery/${id}`);
  };

  const handleDelivered = () => {
    navigate(`/driver/delivery/${id}/proof`);
  };

  const handleFailed = () => {
    // In a real app, this would show a form to capture failure reason
    alert('Please provide a reason for failed delivery');
    navigate(`/driver/delivery/${id}`);
  };

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gray-50">
        <MobileNav title="Delivery Actions" showBack />

        <div className="px-5 py-6 space-y-6">
          {/* Delivery Info */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-3">Current Delivery</h3>
            <p className="text-gray-600 mb-1">{delivery.customerName}</p>
            <p className="text-gray-900">{delivery.address}</p>
            <p className="text-gray-600">{delivery.packageId}</p>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Update Status</h3>

            <button
              onClick={handleOutForDelivery}
              className="w-full bg-white border-2 border-[#2563eb] rounded-2xl p-5 hover:bg-blue-50 active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-7 h-7 text-[#2563eb]" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-900 mb-1">Out for Delivery</h4>
                  <p className="text-gray-600">Mark as on the way</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleDelivered}
              className="w-full bg-white border-2 border-[#10b981] rounded-2xl p-5 hover:bg-green-50 active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-[#10b981]" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-900 mb-1">Delivered</h4>
                  <p className="text-gray-600">Capture proof of delivery</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleFailed}
              className="w-full bg-white border-2 border-[#ef4444] rounded-2xl p-5 hover:bg-red-50 active:scale-[0.98] transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-7 h-7 text-[#ef4444]" />
                </div>
                <div className="text-left">
                  <h4 className="text-gray-900 mb-1">Failed Delivery</h4>
                  <p className="text-gray-600">Customer not available</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </MobileViewport>
  );
}