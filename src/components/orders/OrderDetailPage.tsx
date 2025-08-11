import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderTimeline, { OrderStatusHistoryItem } from '../../components/orders/OrderTimeline';
import { type OrderStatus } from '../../constants/orderStatus';

interface Order {
  id: number;
  code: string;
  status: OrderStatus;
  total: number;
  tracking_number?: string | null;
  estimated_delivery_date?: string | null;
}

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<OrderStatusHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const orderRes = await fetch(`/api/orders/${id}`);
      const o = await orderRes.json();
      setOrder(o);

      const histRes = await fetch(`/api/orders/${id}/status-history`);
      const h = await histRes.json();
      setHistory(h);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <div className="p-6">Memuat...</div>;
  if (!order) return <div className="p-6">Pesanan tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Lacak Pesanan #{order.code}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Status saat ini: <span className="font-medium">{order.status}</span>
        </p>
      </div>
      <OrderTimeline
        currentStatus={order.status}
        history={history}
        trackingNumber={order.tracking_number}
        estimatedDeliveryDate={order.estimated_delivery_date}
      />
    </div>
  );
};

export default OrderDetailPage;
