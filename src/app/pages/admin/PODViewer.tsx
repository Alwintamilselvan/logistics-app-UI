import { useParams } from 'react-router';
import { MapPin, Clock, User, Phone, Package, FileText, Image as ImageIcon } from 'lucide-react';
import { AdminNav } from '../../components/AdminNav';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { getDeliveryById } from '../../data/mockData';

export function PODViewer() {
  const { id } = useParams();
  const delivery = getDeliveryById(id || '');

  if (!delivery) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="max-w-7xl mx-auto p-6">
          <p className="text-gray-600">Delivery not found</p>
        </div>
      </div>
    );
  }

  if (delivery.status !== 'delivered') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="max-w-7xl mx-auto p-6">
          <Card className="p-6">
            <p className="text-gray-600">Proof of delivery is only available for completed deliveries.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Proof of Delivery</h1>
            <p className="text-gray-600">{delivery.packageId}</p>
          </div>
          <StatusBadge status={delivery.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <Card className="p-6 space-y-4">
              <h3 className="text-gray-900">Delivery Information</h3>
              
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 mb-1">Customer Name</p>
                  <p className="text-gray-900">{delivery.customerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 mb-1">Contact Number</p>
                  <p className="text-gray-900">{delivery.contactNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 mb-1">Delivery Address</p>
                  <p className="text-gray-900">{delivery.address}</p>
                  <p className="text-gray-600">{delivery.city}, {delivery.zipCode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 mb-1">Package ID</p>
                  <p className="text-gray-900">{delivery.packageId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-600 mb-1">Delivered At</p>
                  <p className="text-gray-900">
                    {delivery.deliveredAt 
                      ? new Date(delivery.deliveredAt).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Delivery Notes */}
            {delivery.deliveryNotes && (
              <Card className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <h3 className="text-gray-900">Delivery Notes</h3>
                </div>
                <p className="text-gray-600">{delivery.deliveryNotes}</p>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Delivery Photo */}
            {delivery.photo && (
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <h3 className="text-gray-900">Delivery Photo</h3>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={delivery.photo} 
                    alt="Delivery proof" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </Card>
            )}

            {/* Signature */}
            {delivery.signature && (
              <Card className="p-6 space-y-4">
                <h3 className="text-gray-900">Customer Signature</h3>
                <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                  <div className="h-32 flex items-center justify-center text-gray-400">
                    [Signature]
                  </div>
                </div>
                <p className="text-gray-600">
                  Signed on {delivery.deliveredAt 
                    ? new Date(delivery.deliveredAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </Card>
            )}

            {/* GPS Location */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <h3 className="text-gray-900">GPS Location</h3>
              </div>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Delivery Location</p>
                  <p className="text-gray-500">
                    {delivery.latitude.toFixed(6)}, {delivery.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.open(`https://maps.google.com/?q=${delivery.latitude},${delivery.longitude}`, '_blank')}
                className="w-full px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8]"
              >
                View on Map
              </button>
            </Card>
          </div>
        </div>

        {/* Timestamp */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Delivery Timestamp</p>
              <p className="text-gray-900">
                {delivery.deliveredAt 
                  ? new Date(delivery.deliveredAt).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 mb-1">Driver</p>
              <p className="text-gray-900">{delivery.assignedDriver || 'N/A'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
