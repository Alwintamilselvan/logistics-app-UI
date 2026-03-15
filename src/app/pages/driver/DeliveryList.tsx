import { useNavigate } from 'react-router';
import { MapPin, Phone } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { mockDeliveries } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';
import { AIChatbot } from '../../components/AIChatbot';

export function DeliveryList() {
  const navigate = useNavigate();

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <MobileNav title="My Deliveries" showBack />

        <div className="px-5 py-6 pb-24 space-y-4">
          {mockDeliveries.map((delivery) => (
            <Card 
              key={delivery.id}
              className="p-5 space-y-4"
              onClick={() => navigate(`/driver/delivery/${delivery.id}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-slate-900 mb-1">{delivery.customerName}</h3>
                  <p className="text-slate-600">{delivery.packageId}</p>
                </div>
                <StatusBadge status={delivery.status} />
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900">{delivery.address}</p>
                    <p className="text-slate-600">{delivery.city}, {delivery.zipCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <p className="text-slate-600">{delivery.contactNumber}</p>
                </div>
              </div>
            </Card>
          ))}
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