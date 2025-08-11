import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderTimeline, { OrderStatusHistoryItem } from '../../components/orders/OrderTimeline';
import SendToWhatsAppButton from '../../components/orders/SendToWhatsAppButton';
import { type OrderStatus } from '../../constants/orderStatus';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// Ganti dengan nomor admin Anda
const WHATSAPP_ADMIN_NUMBER = '6281234567890';

interface ShippingInfo {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  province?: string;
}

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  id: number;
  code: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingFee: number;
  paymentFee?: number;
  total: number;
  createdAt: string;
  tracking_number?: string | null;
  estimated_delivery_date?: string | null;
  shippingInfo?: ShippingInfo;
  paymentMethodName?: string;
  shippingMethodName?: string;
  shippingMethodEstimate?: string;
  shippingMethodCost?: number;
  items: OrderItem[];
}

const formatRupiah = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<OrderStatusHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    setLoadError(null);
    try {
      const orderRes = await fetch(`/api/orders/${id}`);
      if (!orderRes.ok) throw new Error('Gagal memuat data pesanan');
      const o = await orderRes.json();
      setOrder(o);

      const histRes = await fetch(`/api/orders/${id}/status-history`);
      if (!histRes.ok) throw new Error('Gagal memuat riwayat status');
      const h = await histRes.json();
      setHistory(h);
    } catch (e: any) {
      setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse text-gray-500">Memuat detail pesanan...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <div className="text-red-600 font-medium">Terjadi kesalahan: {loadError}</div>
        <button
          onClick={load}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div>Pesanan tidak ditemukan.</div>
      </div>
    );
  }

  const {
    shippingInfo,
    items,
    code,
    subtotal,
    tax,
    shippingFee,
    paymentFee = 0,
    total
  } = order;

  const addressSummary = shippingInfo
    ? `${shippingInfo.address || ''}, ${shippingInfo.city || ''}`.trim()
    : undefined;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm text-green-600 hover:text-green-700 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
          </button>
          <h1 className="text-2xl font-bold">
            Pesanan #{order.code}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Dibuat: {new Date(order.createdAt).toLocaleString('id-ID')}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <SendToWhatsAppButton
            orderCode={order.code}
            total={order.total}
            elementSelector="#order-detail-card"
            whatsappNumber={WHATSAPP_ADMIN_NUMBER}
            shippingName={shippingInfo?.fullName}
            shippingPhone={shippingInfo?.phone}
            shippingAddressSummary={addressSummary}
          />
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-700 hover:bg-green-50"
          >
            <ShoppingCart className="w-4 h-4" />
            Belanja Lagi
          </Link>
        </div>
      </div>

      {/* Kartu Detail Pesanan (yang akan di-screenshot) */}
      <div
        id="order-detail-card"
        className="bg-white border rounded-lg p-6 shadow-sm space-y-8"
      >
        {/* Item Pesanan */}
        <section>
          <h2 className="font-semibold text-gray-900 mb-4">Item Pesanan</h2>
          <div className="divide-y border rounded-md">
            {items.map(it => (
              <div key={it.id} className="flex items-center gap-4 p-4">
                {it.imageUrl && (
                  <img
                    src={it.imageUrl}
                    alt={it.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{it.name}</div>
                  <div className="text-xs text-gray-500">
                    {formatRupiah(it.price)} x {it.quantity}
                  </div>
                </div>
                <div className="font-semibold text-gray-800">
                  {formatRupiah(it.price * it.quantity)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informasi Pengiriman + Metode Pembayaran + Metode Pengiriman */}
        <section className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Informasi Pengiriman</h3>
            {shippingInfo ? (
              <div className="text-sm text-gray-700 space-y-2">
                <div>
                  <span className="font-medium">{shippingInfo.fullName}</span>
                  {shippingInfo.phone && (
                    <div className="text-xs text-gray-500 mt-0.5">{shippingInfo.phone}</div>
                  )}
                </div>
                <div className="text-xs leading-relaxed">
                  {(shippingInfo.address || '')}<br />
                  {shippingInfo.city && `${shippingInfo.city}, `}
                  {shippingInfo.postalCode && shippingInfo.postalCode}<br />
                  {shippingInfo.province}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Tidak ada data pengiriman.</div>
            )}
          </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Metode Pembayaran</h3>
              <div className="text-sm text-gray-700">
                {order.paymentMethodName || '—'}
              </div>
            </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Metode Pengiriman</h3>
            <div className="text-sm text-gray-700">
              {order.shippingMethodName || '—'}
              {order.shippingMethodEstimate && (
                <div className="text-xs text-gray-500">
                  Estimasi: {order.shippingMethodEstimate}
                </div>
              )}
              {typeof order.shippingMethodCost === 'number' && (
                <div className="text-xs text-gray-500">
                  Biaya: {formatRupiah(order.shippingMethodCost)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ringkasan */}
        <section className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pajak (PPN 11%)</span>
              <span className="text-gray-800">{formatRupiah(tax)}</span>
            </div>
            {shippingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="text-gray-800">{formatRupiah(shippingFee)}</span>
              </div>
            )}
            {paymentFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Pembayaran</span>
                <span className="text-gray-800">{formatRupiah(paymentFee)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Timeline Status */}
      <section>
        <h2 className="font-semibold text-gray-900 mb-4">Status Pengiriman</h2>
        <OrderTimeline
          currentStatus={order.status}
          history={history}
          trackingNumber={order.tracking_number}
          estimatedDeliveryDate={order.estimated_delivery_date}
        />
      </section>
    </div>
  );
};

export default OrderDetailPage;
