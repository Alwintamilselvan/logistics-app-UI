import { useNavigate, useParams } from 'react-router';
import { CheckCircle, MapPin, Clock } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { getDeliveryById } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';

export function DeliveryConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const delivery = getDeliveryById(id || '');

  if (!delivery) {
    return (
      <MobileViewport>
        <div className="min-h-screen bg-gray-50">
          <MobileNav title="Confirmation" showBack />
          <div className="px-5 py-6">
            <p className="text-gray-600">Delivery not found</p>
          </div>
        </div>
      </MobileViewport>
    );
  }

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gray-50">
        <MobileNav title="Delivery Confirmed" showBack={false} />

        <div className="px-5 py-6 space-y-6 pb-8">
          {/* Success Message */}
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-5 shadow-lg">
              <CheckCircle className="w-14 h-14 text-[#10b981]" />
            </div>
            <h2 className="text-gray-900 mb-2">Delivery Confirmed!</h2>
            <p className="text-gray-600">
              Package delivered successfully to {delivery.customerName}
            </p>
          </div>

          {/* Delivery Details */}
          <Card className="p-5 space-y-4">
            <h3 className="text-gray-900">Delivery Information</h3>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-600 mb-1">Delivery Time</p>
                <p className="text-gray-900">
                  {new Date().toLocaleDateString()} at {currentTime}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-600 mb-1">Delivery Location</p>
                <p className="text-gray-900">{delivery.address}</p>
                <p className="text-gray-600">{delivery.city}, {delivery.zipCode}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Delivery Location</p>
                <p className="text-gray-500">
                  {delivery.latitude.toFixed(4)}, {delivery.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </Card>

          {/* Package Info */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-3">Package Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Package ID</p>
                <p className="text-gray-900">{delivery.packageId}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Customer</p>
                <p className="text-gray-900">{delivery.customerName}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
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
              onClick={() => navigate('/driver/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </MobileViewport>
  );
}