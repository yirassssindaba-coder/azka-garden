import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, User } from 'lucide-react';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timestamp?: Date;
  location?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderTrackerProps {
  orderId: string;
  orderNumber: string;
  status: string;
  trackingNumber?: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({
  orderId,
  orderNumber,
  status,
  trackingNumber
}) => {
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date | null>(null);

  useEffect(() => {
    generateTrackingSteps();
  }, [status]);

  const generateTrackingSteps = () => {
    const baseSteps: TrackingStep[] = [
      {
        id: 'confirmed',
        title: 'Pesanan Dikonfirmasi',
        description: 'Pesanan Anda telah dikonfirmasi dan sedang dipersiapkan',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        location: 'Azka Garden, Depok',
        isCompleted: true,
        isCurrent: false
      },
      {
        id: 'preparing',
        title: 'Mempersiapkan Tanaman',
        description: 'Tim kami sedang mempersiapkan tanaman dengan packaging khusus',
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        location: 'Azka Garden, Depok',
        isCompleted: status !== 'pending',
        isCurrent: status === 'processing'
      },
      {
        id: 'shipped',
        title: 'Dikirim',
        description: 'Tanaman Anda sudah dikirim dan dalam perjalanan',
        timestamp: status === 'shipped' || status === 'delivered' ? new Date(Date.now() - 21600000) : undefined, // 6 hours ago
        location: 'JNE Hub Jakarta',
        isCompleted: status === 'shipped' || status === 'delivered',
        isCurrent: status === 'shipped'
      },
      {
        id: 'delivered',
        title: 'Sampai Tujuan',
        description: 'Tanaman telah sampai di alamat tujuan',
        timestamp: status === 'delivered' ? new Date() : undefined,
        location: 'Alamat Pengiriman',
        isCompleted: status === 'delivered',
        isCurrent: status === 'delivered'
      }
    ];

    setTrackingSteps(baseSteps);
    
    // Set estimated delivery
    if (status !== 'delivered') {
      setEstimatedDelivery(new Date(Date.now() + 86400000)); // Tomorrow
    }
  };

  const getStepIcon = (step: TrackingStep) => {
    if (step.isCompleted) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    } else if (step.isCurrent) {
      return <Clock className="h-6 w-6 text-blue-600 animate-pulse" />;
    } else {
      return <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="bg-green-50 rounded-xl shadow-lg p-6 border-2 border-black mobile-card mobile-p-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 mobile-text-sm">Lacak Pesanan</h2>
        {trackingNumber && (
          <div className="text-sm text-gray-600 mobile-text-xs">
            Resi: <span className="font-mono font-medium">{trackingNumber}</span>
          </div>
        )}
      </div>

      {/* Estimated Delivery */}
      {estimatedDelivery && (
        <div className="bg-green-100 border-2 border-black rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900 mobile-text-sm">Estimasi Tiba</div>
              <div className="text-gray-700 mobile-text-xs">
                {estimatedDelivery.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Steps */}
      <div className="space-y-6">
        {trackingSteps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              {getStepIcon(step)}
              {index < trackingSteps.length - 1 && (
                <div className={`w-0.5 h-12 mt-2 ${
                  step.isCompleted ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`font-medium mobile-text-sm ${
                step.isCompleted ? 'text-green-600' : 
                step.isCurrent ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
              <div className="text-gray-600 text-sm mt-1 mobile-text-xs">
                {step.description}
              </div>
              {step.timestamp && (
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 mobile-text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {step.timestamp.toLocaleDateString('id-ID')} {step.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {step.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{step.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4 mobile-text-xs">
            Ada pertanyaan tentang pengiriman?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="https://wa.me/6289635086182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mobile-btn border border-black"
            >
              <Phone className="h-4 w-4 mr-2" />
              Hubungi CS
            </a>
            <button className="inline-flex items-center px-4 py-2 border-2 border-black bg-green-50 text-gray-700 rounded-lg hover:bg-green-100 transition-colors mobile-btn">
              <Package className="h-4 w-4 mr-2" />
              Detail Lengkap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;