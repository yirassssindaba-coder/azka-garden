export interface JNEConfig {
  username: string;
  apiKey: string;
  baseUrl: string;
}

export interface JNEOrigin {
  code: string;
  name: string;
  postal_code: string;
}

export interface JNEDestination {
  code: string;
  name: string;
  postal_code: string;
}

export interface JNEService {
  service_code: string;
  service_name: string;
  service_display: string;
  etd: string;
  price: number;
}

export interface JNEShippingRate {
  origin: JNEOrigin;
  destination: JNEDestination;
  weight: number;
  services: JNEService[];
}

export interface JNETrackingInfo {
  cnote_no: string;
  cnote_date: string;
  cnote_origin: string;
  cnote_dest: string;
  cnote_weight: number;
  cnote_goods_descr: string;
  cnote_amount: number;
  cnote_services_code: string;
  pod_status: string;
  pod_date: string;
  pod_receiver: string;
  history: JNETrackingHistory[];
}

export interface JNETrackingHistory {
  date: string;
  desc: string;
  city: string;
}

export class JNEService {
  private config: JNEConfig;

  constructor(config: JNEConfig) {
    this.config = config;
  }

  async getCities(): Promise<any[]> {
    try {
      // Mock JNE cities data
      const mockCities = [
        { code: 'CGK', name: 'Jakarta', postal_code: '10000' },
        { code: 'BDG', name: 'Bandung', postal_code: '40000' },
        { code: 'SBY', name: 'Surabaya', postal_code: '60000' },
        { code: 'MDN', name: 'Medan', postal_code: '20000' },
        { code: 'DPS', name: 'Denpasar', postal_code: '80000' },
        { code: 'YGY', name: 'Yogyakarta', postal_code: '55000' },
        { code: 'SMG', name: 'Semarang', postal_code: '50000' },
        { code: 'PLB', name: 'Palembang', postal_code: '30000' }
      ];

      return mockCities;
    } catch (error) {
      console.error('Failed to get JNE cities:', error);
      throw new Error('Failed to get cities data');
    }
  }

  async getShippingRates(
    origin: string,
    destination: string,
    weight: number
  ): Promise<JNEShippingRate> {
    try {
      console.log('Getting JNE shipping rates:', { origin, destination, weight });

      // Mock shipping rates
      const mockRates: JNEShippingRate = {
        origin: { code: origin, name: 'Jakarta', postal_code: '10000' },
        destination: { code: destination, name: 'Bandung', postal_code: '40000' },
        weight,
        services: [
          {
            service_code: 'REG',
            service_name: 'Regular',
            service_display: 'JNE Regular',
            etd: '2-3 hari',
            price: Math.floor(weight * 8000) // Rp 8,000 per kg
          },
          {
            service_code: 'YES',
            service_name: 'Yakin Esok Sampai',
            service_display: 'JNE YES',
            etd: '1-2 hari',
            price: Math.floor(weight * 15000) // Rp 15,000 per kg
          },
          {
            service_code: 'OKE',
            service_name: 'Ongkos Kirim Ekonomis',
            service_display: 'JNE OKE',
            etd: '3-5 hari',
            price: Math.floor(weight * 6000) // Rp 6,000 per kg
          }
        ]
      };

      return mockRates;
    } catch (error) {
      console.error('Failed to get JNE shipping rates:', error);
      throw new Error('Failed to get shipping rates');
    }
  }

  async trackPackage(trackingNumber: string): Promise<JNETrackingInfo> {
    try {
      console.log('Tracking JNE package:', trackingNumber);

      // Mock tracking data
      const mockTracking: JNETrackingInfo = {
        cnote_no: trackingNumber,
        cnote_date: '2024-01-15',
        cnote_origin: 'JAKARTA',
        cnote_dest: 'BANDUNG',
        cnote_weight: 2,
        cnote_goods_descr: 'Tanaman Hias',
        cnote_amount: 25000,
        cnote_services_code: 'REG',
        pod_status: 'DELIVERED',
        pod_date: '2024-01-17',
        pod_receiver: 'CUSTOMER',
        history: [
          {
            date: '2024-01-15 10:00',
            desc: 'SHIPMENT RECEIVED BY JNE COUNTER OFFICER',
            city: 'JAKARTA'
          },
          {
            date: '2024-01-15 15:30',
            desc: 'SHIPMENT FORWARDED TO DESTINATION',
            city: 'JAKARTA'
          },
          {
            date: '2024-01-16 08:00',
            desc: 'SHIPMENT ARRIVED AT DESTINATION',
            city: 'BANDUNG'
          },
          {
            date: '2024-01-16 14:20',
            desc: 'WITH DELIVERY COURIER',
            city: 'BANDUNG'
          },
          {
            date: '2024-01-17 09:15',
            desc: 'DELIVERED TO [CUSTOMER]',
            city: 'BANDUNG'
          }
        ]
      };

      return mockTracking;
    } catch (error) {
      console.error('Failed to track JNE package:', error);
      throw new Error('Failed to track package');
    }
  }

  async createShipment(shipmentData: any): Promise<any> {
    try {
      console.log('Creating JNE shipment:', shipmentData);

      // Mock shipment creation
      const mockResponse = {
        cnote_no: 'JNE' + Date.now(),
        cnote_date: new Date().toISOString().split('T')[0],
        cnote_origin: shipmentData.origin,
        cnote_dest: shipmentData.destination,
        cnote_weight: shipmentData.weight,
        cnote_services_code: shipmentData.service_code,
        status: 'SUCCESS',
        message: 'Shipment created successfully'
      };

      return mockResponse;
    } catch (error) {
      console.error('Failed to create JNE shipment:', error);
      throw new Error('Failed to create shipment');
    }
  }

  async cancelShipment(trackingNumber: string): Promise<any> {
    try {
      console.log('Cancelling JNE shipment:', trackingNumber);

      const mockResponse = {
        cnote_no: trackingNumber,
        status: 'CANCELLED',
        message: 'Shipment cancelled successfully',
        cancelled_date: new Date().toISOString()
      };

      return mockResponse;
    } catch (error) {
      console.error('Failed to cancel JNE shipment:', error);
      throw new Error('Failed to cancel shipment');
    }
  }

  async getServicePoints(city: string): Promise<any[]> {
    try {
      // Mock service points
      const mockServicePoints = [
        {
          code: 'JNE001',
          name: 'JNE Jakarta Pusat',
          address: 'Jl. Sudirman No. 123, Jakarta Pusat',
          phone: '021-12345678',
          operating_hours: '08:00 - 17:00',
          coordinates: { lat: -6.2088, lng: 106.8456 }
        },
        {
          code: 'JNE002',
          name: 'JNE Jakarta Selatan',
          address: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
          phone: '021-87654321',
          operating_hours: '08:00 - 17:00',
          coordinates: { lat: -6.2297, lng: 106.8253 }
        }
      ];

      return mockServicePoints;
    } catch (error) {
      console.error('Failed to get JNE service points:', error);
      throw new Error('Failed to get service points');
    }
  }
}

// Export configured instance
export const jneService = new JNEService({
  username: process.env.JNE_USERNAME || 'demo-username',
  apiKey: process.env.JNE_API_KEY || 'demo-api-key',
  baseUrl: process.env.JNE_BASE_URL || 'https://apiv2.jne.co.id'
});