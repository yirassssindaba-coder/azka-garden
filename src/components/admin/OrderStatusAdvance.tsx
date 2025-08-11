import React, { useState } from 'react';
import { Loader2, Truck } from 'lucide-react';
import { getNextStatus, type OrderStatus } from '../../constants/orderStatus';

interface Props {
  orderId: string | number;
  currentStatus: OrderStatus;
  onUpdated: (newStatus: OrderStatus) => void;
}

const OrderStatusAdvance: React.FC<Props> = ({ orderId, currentStatus, onUpdated }) => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState('');
  const [showShipModal, setShowShipModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const next = getNextStatus(currentStatus);

  if (!next) {
    return <div className="text-sm text-green-700 font-semibold">Pesanan sudah selesai.</div>;
  }

  const requiresShipping = next === 'SHIPPED';

  const requestUpdate = async (payload: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Gagal memperbarui status');
      }
      onUpdated(payload.newStatus);
      setShowShipModal(false);
      setTrackingNumber('');
      setEstimatedDate('');
      setNote('');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvance = () => {
    if (requiresShipping) {
      setShowShipModal(true);
    } else {
      requestUpdate({ newStatus: next, note: note || undefined });
    }
  };

  const submitShipping = () => {
    if (!trackingNumber) {
      alert('Nomor resi wajib diisi.');
      return;
    }
    requestUpdate({
      newStatus: next,
      note: note || undefined,
      metadata: {
        tracking_number: trackingNumber,
        estimated_delivery_date: estimatedDate || null
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <button
          onClick={handleAdvance}
            disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>Lanjut ke: {next}</span>
        </button>
      </div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Catatan (opsional)"
        rows={2}
        className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-green-500"
      />

      {showShipModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Truck className="h-5 w-5 text-green-600" />
              <span>Detail Pengiriman</span>
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Nomor Resi *</label>
                <input
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={trackingNumber}
                  onChange={e => setTrackingNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estimasi Tiba (opsional)</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={estimatedDate}
                  onChange={e => setEstimatedDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowShipModal(false)}
                  type="button"
                  className="px-4 py-2 rounded-md border"
                >Batal</button>
                <button
                  onClick={submitShipping}
                  type="button"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan & Lanjut'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusAdvance;
