import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import {
  ORDER_STATUS_STEPS,
  ORDER_STATUS_SEQUENCE,
  type OrderStatus
} from '../../constants/orderStatus';

dayjs.locale('id');

export interface OrderStatusHistoryItem {
  id: string | number;
  old_status: OrderStatus | null;
  new_status: OrderStatus;
  created_at: string;
  changed_by_name?: string;
  note?: string | null;
  metadata?: any;
}

interface Props {
  currentStatus: OrderStatus;
  history: OrderStatusHistoryItem[];
  trackingNumber?: string | null;
  estimatedDeliveryDate?: string | null;
}

const OrderTimeline: React.FC<Props> = ({
  currentStatus,
  history,
  trackingNumber,
  estimatedDeliveryDate
}) => {
  const currentIdx = ORDER_STATUS_SEQUENCE.indexOf(currentStatus);
  const historyMap = history.reduce<Record<string, OrderStatusHistoryItem>>((acc, h) => {
    acc[h.new_status] = h;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {(trackingNumber || estimatedDeliveryDate) && (
        <div className="border rounded-md bg-green-50 p-4 text-sm">
          {estimatedDeliveryDate && (
            <div>
              <span className="font-semibold text-green-800">Estimasi Tiba: </span>
              {dayjs(estimatedDeliveryDate).format('dddd, DD MMMM YYYY')}
            </div>
          )}
          {trackingNumber && (
            <div className="mt-1 text-xs text-gray-700">
              Resi: <span className="font-mono">{trackingNumber}</span>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute left-[11px] top-5 bottom-2 w-[2px] bg-gray-200" />
        <ul className="space-y-6">
          {ORDER_STATUS_STEPS.map((step, i) => {
            const done = i <= currentIdx;
            const h = historyMap[step.key];
            return (
              <li key={step.key} className="relative flex items-start">
                <div className="z-10 mt-0.5">
                  {done ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
                <div className="ml-4">
                  <div className={`font-semibold ${done ? 'text-green-700' : 'text-gray-700'}`}>
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-600">{step.description}</div>
                  {h && (
                    <div className="mt-1 text-xs text-gray-500 space-y-0.5">
                      <div>
                        {dayjs(h.created_at).format('DD/MM/YYYY HH:mm')}
                        {h.changed_by_name && <> • {h.changed_by_name}</>}
                      </div>
                      {h.note && <div className="italic">{h.note}</div>}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OrderTimeline;
