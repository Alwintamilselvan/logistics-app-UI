import { useNavigate, useParams } from 'react-router';
import { MapPin, Phone, Package, Navigation } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { getDeliveryById } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';

export function DeliveryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const delivery = getDeliveryById(id || '');

  if (!delivery) {
    return (
      <MobileViewport>
        <div className="min-h-screen bg-gray-50">
          <MobileNav title="Delivery Details" showBack />
          <div className="px-5 py-6">
            <p className="text-gray-600">Delivery not found</p>
          </div>
        </div>
      </MobileViewport>
    );
  }

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gray-50">
        <MobileNav title="Delivery Details" showBack />

        <div className="px-5 py-6 space-y-4">
          {/* Status */}
          <div className="flex justify-center">
            <StatusBadge status={delivery.status} />
          </div>

          {/* Customer Information */}
          <Card className="p-5 space-y-4">
            <h3 className="text-gray-900">Customer Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 mb-1">Name</p>
                <p className="text-gray-900">{delivery.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Contact Number</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-900">{delivery.contactNumber}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Address */}
          <Card className="p-5 space-y-4">
            <h3 className="text-gray-900">Delivery Address</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-900">{delivery.address}</p>
                <p className="text-gray-600">{delivery.city}, {delivery.zipCode}</p>
              </div>
            </div>

            {/* Map Preview */}
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Map Preview</p>
                <p className="text-gray-500">
                  {delivery.latitude.toFixed(4)}, {delivery.longitude.toFixed(4)}
                </p>
              </div>
            </div>

            <Button 
              variant="primary" 
              fullWidth
              onClick={() => window.open(`https://maps.google.com/?q=${delivery.latitude},${delivery.longitude}`, '_blank')}
            >
              <Navigation className="w-5 h-5 inline mr-2" />
              Open in Maps
            </Button>
          </Card>

          {/* Package Details */}
          <Card className="p-5 space-y-3">
            <h3 className="text-gray-900">Package Details</h3>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-600">Package ID</p>
                <p className="text-gray-900">{delivery.packageId}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Delivery Date</p>
              <p className="text-gray-900">{new Date(delivery.deliveryDate).toLocaleDateString()}</p>
            </div>
          </Card>

          {/* Actions */}
          {delivery.status === 'pending' && (
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => navigate(`/driver/delivery/${delivery.id}/action`)}
            >
              Start Delivery
            </Button>
          )}

          {delivery.status === 'out-for-delivery' && (
            <Button 
              variant="success" 
              fullWidth
              onClick={() => navigate(`/driver/delivery/${delivery.id}/proof`)}
            >
              Confirm Delivery
            </Button>
          )}
        </div>
      </div>
    </MobileViewport>
  );
}