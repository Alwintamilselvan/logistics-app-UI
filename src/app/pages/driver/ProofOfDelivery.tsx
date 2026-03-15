import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Camera, FileText } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { getDeliveryById } from '../../data/mockData';
import { MobileViewport } from '../../components/MobileViewport';

export function ProofOfDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const delivery = getDeliveryById(id || '');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  if (!delivery) {
    return (
      <MobileViewport>
        <div className="min-h-screen bg-gray-50">
          <MobileNav title="Proof of Delivery" showBack />
          <div className="px-5 py-6">
            <p className="text-gray-600">Delivery not found</p>
          </div>
        </div>
      </MobileViewport>
    );
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    // In a real app, this would save the signature, photo, and notes
    navigate(`/driver/delivery/${id}/confirmation`);
  };

  return (
    <MobileViewport>
      <div className="min-h-screen bg-gray-50">
        <MobileNav title="Proof of Delivery" showBack />

        <div className="px-5 py-6 space-y-6 pb-8">
          {/* Delivery Info */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-2">{delivery.customerName}</h3>
            <p className="text-gray-600">{delivery.packageId}</p>
          </Card>

          {/* Signature Capture */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-4">Customer Signature</h3>
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={180}
                  className="w-full bg-white touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <Button variant="secondary" fullWidth onClick={clearSignature}>
                Clear Signature
              </Button>
            </div>
          </Card>

          {/* Photo Upload */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-4">Delivery Photo</h3>
            <div className="space-y-3">
              {photo ? (
                <div className="relative">
                  <img src={photo} alt="Delivery" className="w-full h-48 object-cover rounded-lg" />
                  <button
                    onClick={() => setPhoto(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <Camera className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">Tap to upload photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </Card>

          {/* Delivery Notes */}
          <Card className="p-5">
            <h3 className="text-gray-900 mb-4">Delivery Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the delivery..."
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent min-h-[120px] text-base"
            />
          </Card>

          {/* Confirm Button */}
          <Button variant="success" fullWidth onClick={handleConfirm}>
            Confirm Delivery
          </Button>
        </div>
      </div>
    </MobileViewport>
  );
}