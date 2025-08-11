export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderStatusStep {
  key: OrderStatus;
  title: string;
  description: string;
}

export const ORDER_STATUS_STEPS: OrderStatusStep[] = [
  {
    key: 'CONFIRMED',
    title: 'Pesanan Dikonfirmasi',
    description: 'Pesanan telah dikonfirmasi dan akan diproses.'
  },
  {
    key: 'PREPARING',
    title: 'Mempersiapkan Tanaman',
    description: 'Tim sedang mempersiapkan tanaman dan kemasan.'
  },
  {
    key: 'SHIPPED',
    title: 'Dikirim',
    description: 'Pesanan telah dikirim dan dalam perjalanan.'
  },
  {
    key: 'DELIVERED',
    title: 'Sampai Tujuan',
    description: 'Pesanan telah diterima oleh pelanggan.'
  }
];

export const ORDER_STATUS_SEQUENCE = ORDER_STATUS_STEPS.map(s => s.key);

export function getNextStatus(current: OrderStatus): OrderStatus | null {
  const idx = ORDER_STATUS_SEQUENCE.indexOf(current);
  if (idx === -1 || idx === ORDER_STATUS_SEQUENCE.length - 1) return null;
  return ORDER_STATUS_SEQUENCE[idx + 1];
}
